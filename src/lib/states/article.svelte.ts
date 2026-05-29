import { supabase } from '$lib/supabaseClient';
import { authManager } from '$lib/states/auth.svelte'; // 👈 ユーザーIDを取得するために追加

export type Article = {
  id: string;
  title: string;
  url: string;
  siteName: string;
  publishedAt: number;
  isBookmarked: boolean;
  thumbnailUrl: string;
};

export class ArticleManager {
  activeTab = $state('新着');
  tabs = ['新着', 'おすすめ', 'ストック'];

  articles = $state<Article[]>([]);
  isLoading = $state(true);

  get filteredArticles() {
    if (this.activeTab === 'ストック') {
      return this.articles.filter((article) => article.isBookmarked);
    }
    if (this.activeTab === 'おすすめ') {
      return this.articles;
    }
    return this.articles;
  }

  // トップページ用のRSS読み込み機能
  async loadArticles() {
    this.isLoading = true;
    try {
      const [feedsRes, bookmarksRes] = await Promise.all([
        supabase.from('feeds').select('*'),
        // article_id ではなく url を取得する
        supabase.from('bookmarks').select('url')
      ]);

      if (feedsRes.error) throw feedsRes.error;
      const feeds = feedsRes.data;

      // しおりがついているかの判定を url ベースに変更
      const bookmarkedUrls = new Set(bookmarksRes.data?.map((b) => b.url) || []);

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
            const articleUrl = item.link || '';
            const articleId = item.guid || articleUrl || Math.random().toString();
            return {
              id: articleId,
              title: item.title || '無題',
              url: articleUrl,
              siteName: feed.title,
              publishedAt: new Date(item.pubDate || item.isoDate || Date.now()).getTime(),
              // 💡 修正: urlを使ってしおりの有無を判定
              isBookmarked: bookmarkedUrls.has(articleUrl),
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

  // マイページ（ストック一覧）専用の直接読み込みメソッド（リンク切れ対策）
  async loadBookmarkedArticles() {
    this.isLoading = true;
    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        this.articles = data.map((b) => ({
          id: b.url, // マイページではURLをIDとして扱う
          title: b.title,
          url: b.url,
          siteName: b.site_name,
          publishedAt: Date.now(),
          isBookmarked: true,
          thumbnailUrl: b.thumbnail_url || ''
        }));
      } else {
        this.articles = [];
      }
    } catch (err) {
      console.error('ストック記事の直接読み込みに失敗:', err);
    } finally {
      this.isLoading = false;
    }
  }

  // ブックマーク（しおり）の切り替え処理
  async toggleBookmark(id: string) {
    const article = this.articles.find((a) => a.id === id);
    if (!article) return;

    const isCurrentlyBookmarked = article.isBookmarked;

    // UX向上: 通信を待たずに、画面の見た目を先にサクッと切り替える
    this.articles = this.articles.map((a) =>
      a.id === id ? { ...a, isBookmarked: !isCurrentlyBookmarked } : a
    );

    try {
      if (!isCurrentlyBookmarked) {
        // 修正: DBの構造に合わせて、url を主軸にして保存する
        const { error } = await supabase.from('bookmarks').insert([
          {
            user_id: authManager.user?.id, // 必須：誰のストックか
            url: article.url, // 必須：article_id ではなく url
            title: article.title,
            site_name: article.siteName,
            thumbnail_url: article.thumbnailUrl
          }
        ]);
        if (error) throw error;
      } else {
        // 削除時も url を条件にする
        const { error } = await supabase.from('bookmarks').delete().eq('url', article.url);
        if (error) throw error;
      }
    } catch (err) {
      console.error('しおりの保存に失敗しました:', err);

      // 失敗した場合は、見た目を元に戻す
      this.articles = this.articles.map((a) =>
        a.id === id ? { ...a, isBookmarked: isCurrentlyBookmarked } : a
      );
    }

    const targetArticle = this.articles.find((a) => a.id === id);
    if (targetArticle && targetArticle.isBookmarked) {
      fetch('/api/archive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetArticle.url })
      }).catch((err) => {
        console.error('アーカイブ依頼エラー:', err);
      });
    }
  }
}
