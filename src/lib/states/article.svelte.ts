import { supabase } from '$lib/supabaseClient';

// 実際のRSSデータに合わせた型定義
export type Article = {
  id: string; // 記事のユニークID（URLなどを流用）
  title: string; // 記事タイトル
  url: string; // 記事のリンク
  siteName: string; // 取得元のサイト名
  publishedAt: number; // 公開日時（ソート用に数値化）
  isBookmarked: boolean;
};

export class ArticleManager {
  activeTab = $state('新着'); // デフォルトを新着に
  tabs = ['新着', 'おすすめ', 'ストック'];

  articles = $state<Article[]>([]);
  isLoading = $state(true); // 読み込み中の状態を追加

  // データベースとAPIから記事をかき集めるメイン関数
  async loadArticles() {
    this.isLoading = true;
    try {
      // 1. Supabaseから、ユーザーが登録したフィード一覧を取得
      const { data: feeds, error } = await supabase.from('feeds').select('*');
      if (error) throw error;

      if (!feeds || feeds.length === 0) {
        this.articles = [];
        return; // 登録ゼロならここで終了
      }

      // 2. 各フィードのURLに対してAPIを叩き、記事を取得（Promise.allで高速並列処理）
      const fetchPromises = feeds.map(async (feed) => {
        try {
          const res = await fetch(`/api/rss?url=${encodeURIComponent(feed.url)}`);
          if (!res.ok) return [];
          const data = await res.json();

          // 取得した生のアイテムを、pikkaの Article 型に変換
          return (data.items || []).map((item: any) => ({
            id: item.guid || item.link || Math.random().toString(),
            title: item.title || '無題',
            url: item.link || '',
            siteName: feed.title, // Supabaseに登録されているサイト名
            publishedAt: new Date(item.pubDate || item.isoDate || Date.now()).getTime(),
            isBookmarked: false
          }));
        } catch (e) {
          console.error(`${feed.url} の取得に失敗しました`, e);
          return []; // エラーが起きてもアプリを止めない
        }
      });

      // 3. 全てのサイトからの取得結果を待って、一つのリストに合体させる
      const results = await Promise.all(fetchPromises);
      const allArticles = results.flat();

      // 4. 新しい順（降順）に並び替えて画面に反映
      this.articles = allArticles.sort((a, b) => b.publishedAt - a.publishedAt);
    } catch (err) {
      console.error('記事の読み込みに失敗しました:', err);
    } finally {
      this.isLoading = false;
    }
  }

  // しおりを切り替える関数（IDが文字列になったので型を修正）
  toggleBookmark(id: string) {
    this.articles = this.articles.map((article) =>
      article.id === id ? { ...article, isBookmarked: !article.isBookmarked } : article
    );
  }
}
