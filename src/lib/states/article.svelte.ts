import { supabase } from '$lib/supabaseClient';

// 実際のRSSデータに合わせた型定義
export type Article = {
  id: string; // 記事のユニークID（URLなどを流用）
  title: string; // 記事タイトル
  url: string; // 記事のリンク
  siteName: string; // 取得元のサイト名
  publishedAt: number; // 公開日時（ソート用に数値化）
  isBookmarked: boolean; // ストックされたかどうか
  thumbnailUrl: string; // サムネURL
};

export class ArticleManager {
  activeTab = $state('新着'); // デフォルトを新着に
  tabs = ['新着', 'おすすめ', 'ストック'];

  articles = $state<Article[]>([]);
  isLoading = $state(true); // 読み込み中の状態を追加

  // 追加：現在選択されているタブに合わせて、表示する記事を絞り込むゲッター
  get filteredArticles() {
    if (this.activeTab === 'ストック') {
      // ストックタブの時は、しおりがついている記事だけを返す
      return this.articles.filter((article) => article.isBookmarked);
    }
    // おすすめタブのロジックは今後の拡張用に一旦そのまま返す
    if (this.activeTab === 'おすすめ') {
      return this.articles;
    }
    // デフォルト（新着タブ）の時はすべて返す
    return this.articles;
  }

  async loadArticles() {
    this.isLoading = true;
    try {
      // 1. フィード一覧と、保存済みのしおり一覧を同時に取得（高速化）
      const [feedsRes, bookmarksRes] = await Promise.all([
        supabase.from('feeds').select('*'),
        supabase.from('bookmarks').select('article_id')
      ]);

      if (feedsRes.error) throw feedsRes.error;
      const feeds = feedsRes.data;

      // 保存されているしおりのIDリスト（検索を速くするためにSetを使う）
      const bookmarkedIds = new Set(bookmarksRes.data?.map((b) => b.article_id) || []);

      if (!feeds || feeds.length === 0) {
        this.articles = [];
        return;
      }

      const fetchPromises = feeds.map(async (feed) => {
        try {
          const res = await fetch(`/api/rss?url=${encodeURIComponent(feed.url)}`);
          if (!res.ok) return [];
          const data = await res.json();

          return (data.items || []).map((item: any) => {
            const articleId = item.guid || item.link || Math.random().toString();
            return {
              id: articleId,
              title: item.title || '無題',
              url: item.link || '',
              siteName: feed.title,
              publishedAt: new Date(item.pubDate || item.isoDate || Date.now()).getTime(),
              // 取得した記事IDが、DBのしおりリストに含まれていれば true にする
              isBookmarked: bookmarkedIds.has(articleId),
              thumbnailUrl: item.thumbnailUrl || ''
            };
          });
        } catch (e) {
          console.error(`${feed.url} の取得失敗`, e);
          return [];
        }
      });

      const results = await Promise.all(fetchPromises);
      this.articles = results.flat().sort((a, b) => b.publishedAt - a.publishedAt);
    } catch (err) {
      console.error('読み込み失敗:', err);
    } finally {
      this.isLoading = false;
    }
  }

  //  既存の toggleBookmark() を以下に丸ごと差し替えます

  async toggleBookmark(id: string) {
    // 対象の記事を探す
    const article = this.articles.find((a) => a.id === id);
    if (!article) return;

    const isCurrentlyBookmarked = article.isBookmarked;

    // UX向上: 通信を待たずに、画面の見た目を先にサクッと切り替える（Optimistic UI）
    this.articles = this.articles.map((a) =>
      a.id === id ? { ...a, isBookmarked: !isCurrentlyBookmarked } : a
    );

    try {
      if (!isCurrentlyBookmarked) {
        // しおりを付ける（DBに保存）
        const { error } = await supabase.from('bookmarks').insert([
          {
            article_id: article.id,
            title: article.title,
            url: article.url,
            site_name: article.siteName
          }
        ]);
        if (error) throw error;
      } else {
        // しおりを外す（DBから削除）
        const { error } = await supabase.from('bookmarks').delete().eq('article_id', article.id);
        if (error) throw error;
      }
    } catch (err) {
      console.error('しおりの保存に失敗しました:', err);

      // 失敗した場合は、見た目を元に戻す
      this.articles = this.articles.map((a) =>
        a.id === id ? { ...a, isBookmarked: isCurrentlyBookmarked } : a
      );
    }
  }
}
