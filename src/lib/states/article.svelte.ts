import { supabase } from '$lib/supabaseClient';
import { authManager } from '$lib/states/auth.svelte';

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
    // おすすめタブの時は、ソート済みの記事をそのまま返す
    if (this.activeTab === 'おすすめ') {
      return this.articles;
    }
    return this.articles;
  }

  // ==========================================
  // 1. 新着記事の読み込み ＆ AIへの送信
  // ==========================================
  async loadArticles() {
    this.isLoading = true;
    try {
      const [feedsRes, bookmarksRes] = await Promise.all([
        supabase.from('feeds').select('*'),
        supabase.from('bookmarks').select('url')
      ]);

      if (feedsRes.error) throw feedsRes.error;
      const feeds = feedsRes.data;

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

      // ==========================================
      // AIへ裏側で送信（最新30件を、10件ずつ安全に分割して送る）
      // ==========================================
      console.log('🚀 AIへの送信準備を開始...');
      const latestArticles = this.articles.slice(0, 30);
      const rawArticles = JSON.parse(JSON.stringify(latestArticles));

      if (rawArticles.length === 0) {
        console.log('⚠️ 送信する記事がないため、AI処理をスキップします');
      } else {
        // 10件ずつのグループ（チャンク）に分割してAIに送信
        const chunkSize = 10;
        for (let i = 0; i < rawArticles.length; i += chunkSize) {
          const chunk = rawArticles.slice(i, i + chunkSize);
          console.log(`📦 ${i + 1}〜${i + chunk.length}件目をAIへ送信中...`);

          // 非同期でどんどん送る（画面のカクつきを防ぐため await はしない）
          supabase.functions
            .invoke('embed-articles', {
              body: { articles: chunk }
            })
            .then(({ data, error }) => {
              if (error) {
                console.error(`❌ ${i + 1}〜${i + chunk.length}件目のベクトル化エラー:`, error);
              } else {
                console.log(`✅ ${i + 1}〜${i + chunk.length}件目のDB保存が完了:`, data);
              }
            })
            .catch((err) => {
              console.error('AI送信中の予期せぬエラー:', err);
            });
        }
      }
    } catch (err) {
      console.error('読み込み失敗:', err);
    } finally {
      this.isLoading = false;
    }
  }

  // ==========================================
  // 2. おすすめ記事の読み込み (AIレコメンド)
  // ==========================================
  async loadRecommendedArticles() {
    this.isLoading = true;
    try {
      if (!authManager.user?.id) return;

      const { data, error } = await supabase.rpc('get_recommended_articles', {
        p_user_id: authManager.user.id,
        p_limit: 30
      });

      if (error) throw error;

      const { data: bookmarksData } = await supabase.from('bookmarks').select('url');
      const bookmarkedUrls = new Set(bookmarksData?.map((b) => b.url) || []);

      if (data) {
        this.articles = data.map((b: any) => ({
          id: b.url,
          title: b.title,
          url: b.url,
          siteName: b.site_name,
          publishedAt: new Date(b.published_at).getTime(),
          isBookmarked: bookmarkedUrls.has(b.url),
          thumbnailUrl: b.thumbnail_url || ''
        }));
      }
    } catch (err) {
      console.error('おすすめ記事の取得に失敗:', err);
    } finally {
      this.isLoading = false;
    }
  }

  // ==========================================
  // 3. 記事クリック時のAI学習機能 (EMA計算)
  // ==========================================
  async trackArticleClick(url: string) {
    if (!authManager.user?.id) return;

    try {
      const { data: articleData, error: articleErr } = await supabase
        .from('articles')
        .select('embedding')
        .eq('url', url)
        .maybeSingle();
      if (articleErr) throw articleErr;

      if (!articleData?.embedding) {
        console.log('🤖 この記事はまだAI処理中のため、学習をスキップします');
        return;
      }

      const articleVec =
        typeof articleData.embedding === 'string'
          ? JSON.parse(articleData.embedding)
          : articleData.embedding;

      const { data: userData, error: userErr } = await supabase
        .from('user_profiles')
        .select('interest_embedding')
        .eq('user_id', authManager.user.id)
        .maybeSingle();
      if (userErr && userErr.code !== 'PGRST116') throw userErr; // (データ無しエラー以外はスロー)

      let newVec: number[];

      if (userData?.interest_embedding) {
        const currentVec =
          typeof userData.interest_embedding === 'string'
            ? JSON.parse(userData.interest_embedding)
            : userData.interest_embedding;
        const ALPHA = 0.2;
        newVec = currentVec.map(
          (val: number, i: number) => val * (1 - ALPHA) + articleVec[i] * ALPHA
        );
      } else {
        newVec = articleVec;
      }

      const { error: upsertErr } = await supabase.from('user_profiles').upsert({
        user_id: authManager.user.id,
        interest_embedding: newVec,
        updated_at: new Date().toISOString()
      });
      if (upsertErr) throw upsertErr;

      console.log('✅ AIがあなたの興味を学習しました！(DB保存成功)');
    } catch (err: any) {
      console.error('❌ 興味ベクトルの更新エラー:', err.message || err);
    }
  }

  // ==========================================
  // 4. ストック画面用の直接読み込み
  // ==========================================
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
          id: b.url,
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

  // ==========================================
  // 5. ブックマークの保存・削除
  // ==========================================
  async toggleBookmark(id: string) {
    const article = this.articles.find((a) => a.id === id);
    if (!article) return;

    const isCurrentlyBookmarked = article.isBookmarked;

    this.articles = this.articles.map((a) =>
      a.id === id ? { ...a, isBookmarked: !isCurrentlyBookmarked } : a
    );

    try {
      if (!isCurrentlyBookmarked) {
        const { error } = await supabase.from('bookmarks').insert([
          {
            user_id: authManager.user?.id,
            url: article.url,
            title: article.title,
            site_name: article.siteName,
            thumbnail_url: article.thumbnailUrl
          }
        ]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('bookmarks').delete().eq('url', article.url);
        if (error) throw error;
      }
    } catch (err) {
      console.error('しおりの保存に失敗しました:', err);
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
