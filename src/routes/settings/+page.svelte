<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authManager } from '$lib/states/auth.svelte';
  import { popularFeeds } from '$lib/data/popularFeeds'; // ハードコーディングした辞書

  // 状態管理（型を定義して安全にします）
  type Feed = { id: number; title: string; url: string };

  let rssFeeds = $state<Feed[]>([]);
  let inputFeedUrl = $state('');
  let isLoading = $state(true);
  let isAuthenticated = $state(true);
  let isSearching = $state(false);

  // Svelteのサジェスト候補機能に頼る
  let suggestions = $derived.by(() => {
    const query = inputFeedUrl.trim().toLowerCase();
    if (!query || query.startsWith('http')) return [];

    return popularFeeds.filter(
      (feed) =>
        feed.name.toLowerCase().includes(query) || feed.keywords.some((k) => k.includes(query))
    );
  });

  // 画面が開かれた時に Supabase からデータを取得する
  onMount(async () => {
    // Supabaseのストレージ読み込み完了を確実に待つ
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
      goto('/login');
      return;
    }

    // ユーザー状態の同期
    if (!authManager.user) {
      authManager.user = session.user;
    }
    authManager.isInitialized = true;
    isAuthenticated = false; // 認証完了

    // 認証が通った後で、フィードデータを取得する
    const { data, error } = await supabase
      .from('feeds')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('取得エラー:', error.message);
    } else {
      rssFeeds = data || [];
    }
    isLoading = false;
  });

  // Supabase へフィードを追加する関数
  // フォーム送信時の処理（オートディスカバリー対応）
  async function addFeed(event: Event | null, directUrl: string = '') {
    if (event) event.preventDefault();

    // サジェストをクリックした場合は directUrl を使い、普通に入力した場合は inputFeedUrl を使う
    let targetUrl = directUrl || inputFeedUrl.trim();
    if (!targetUrl) return;

    isLoading = true;
    isSearching = true;

    try {
      // もし入力されたのが http から始まる「普通のURL」で、/feed 等で終わっていなければ、APIで探しに行く
      if (
        targetUrl.startsWith('http') &&
        !targetUrl.includes('.xml') &&
        !targetUrl.includes('feed') &&
        !targetUrl.includes('rss')
      ) {
        const discoverRes = await fetch(`/api/discover?url=${encodeURIComponent(targetUrl)}`);
        if (discoverRes.ok) {
          const data = await discoverRes.json();
          if (data.feedUrl) {
            targetUrl = data.feedUrl; // 本物のRSS URLにすり替える
          }
        }
      }

      // あとは既存の処理と同じ（/api/rss を叩いてタイトルを取得し、Supabaseへ保存）
      const response = await fetch(`/api/rss?url=${encodeURIComponent(targetUrl)}`);
      if (!response.ok) throw new Error('RSSの取得に失敗しました');

      const feedData = await response.json();
      const realTitle = feedData.title || 'タイトルなし';

      const { data, error } = await supabase
        .from('feeds')
        .insert([{ url: targetUrl, title: realTitle }])
        .select();

      if (error) throw error;

      if (data) {
        rssFeeds = [data[0], ...rssFeeds];
        inputFeedUrl = ''; // 追加に成功したら入力欄を空にする
      }
    } catch (err) {
      console.error(err);
      alert('エラー: 有効なRSSフィードが見つからないか、既に登録されています。');
    } finally {
      isLoading = false;
      isSearching = false;
    }
  }

  // Supabase からフィードを削除する関数
  async function removeFeed(id: number) {
    const previousFeeds = [...rssFeeds];
    rssFeeds = rssFeeds.filter((feed) => feed.id !== id);

    // バックグラウンドでデータベースから削除
    const { error } = await supabase.from('feeds').delete().eq('id', id);

    if (error) {
      console.error('削除エラー:', error.message);
      alert('削除に失敗しました。');
      rssFeeds = previousFeeds; // 失敗したら元に戻す
    }
  }
</script>

<div class="max-w-2xl px-4 py-8">
  <header class="mb-10 flex items-center gap-6">
    <a
      href="/"
      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
      aria-label="戻る"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </a>
    <div>
      <h1 class="text-2xl font-extrabold tracking-tight text-slate-700 sm:text-3xl">詳細設定</h1>
      <p class="mt-1 text-xs font-medium text-slate-500 sm:text-sm">フィードの管理とカスタマイズ</p>
    </div>
  </header>

  <section class="mb-12">
    <h2 class="mb-4 flex items-center gap-2 text-lg font-bold text-slate-700">
      <svg class="h-5 w-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
      登録中のRSSフィード
    </h2>

    <div class="relative mb-6">
      <form onsubmit={(e) => addFeed(e)} class="flex gap-3">
        <input
          type="text"
          bind:value={inputFeedUrl}
          placeholder="サイト名（例: Zenn）または URL"
          class="h-12 flex-1 rounded-xl border-none bg-white px-4 font-medium text-slate-700 shadow-sm transition-shadow outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-teal-400/50"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          class="flex h-12 items-center gap-2 rounded-xl bg-slate-800 px-6 font-bold text-white shadow-sm transition-colors hover:bg-slate-700 disabled:opacity-50"
        >
          {isSearching ? '検索中...' : '追加'}
        </button>
      </form>

      {#if suggestions.length > 0}
        <div
          class="absolute top-14 left-0 z-10 w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg"
        >
          <p
            class="border-b border-slate-100 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-400"
          >
            おすすめのメディア
          </p>

          {#each suggestions as feed}
            <button
              type="button"
              onclick={() => addFeed(null, feed.url)}
              class="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-teal-50"
            >
              <span class="font-bold text-slate-700">{feed.name}</span>
              <span class="rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-600"
                >追加する</span
              >
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- ローディング中の処理と空だった場合の -->
    <div class="flex flex-col gap-3">
      {#if isLoading}
        <div
          class="animate-pulse rounded-2xl bg-white p-6 text-center text-sm font-medium text-slate-400 shadow-sm"
        >
          読み込み中...
        </div>
      {:else if rssFeeds.length === 0}
        <div
          class="rounded-2xl bg-white p-6 text-center text-sm font-medium text-slate-400 shadow-sm"
        >
          フィードが登録されていません。
        </div>
      {/if}

      {#each rssFeeds as feed (feed.id)}
        <div
          class="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div class="flex-1 overflow-hidden">
            <p class="truncate font-bold text-slate-700">{feed.title}</p>
            <p class="mt-0.5 truncate text-xs font-medium text-slate-400">{feed.url}</p>
          </div>
          <button
            onclick={() => removeFeed(feed.id)}
            class="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
            aria-label="削除"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      {/each}
    </div>
  </section>
</div>
