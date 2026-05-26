<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';

  // 状態管理（型を定義して安全にします）
  type Feed = { id: number; title: string; url: string };

  let rssFeeds = $state<Feed[]>([]);
  let newFeedUrl = $state('');
  let isLoading = $state(true);

  // 画面が開かれた時に Supabase からデータを取得する
  onMount(async () => {
    const { data, error } = await supabase
      .from('feeds')
      .select('*')
      .order('created_at', { ascending: false }); // 新しい順

    if (error) {
      console.error('取得エラー:', error.message);
    } else {
      rssFeeds = data || [];
    }
    isLoading = false;
  });

  // Supabase へフィードを追加する関数
  async function addFeed(event: Event) {
    event.preventDefault();
    if (!newFeedUrl.trim()) return;

    // 💡 後でRSSの中身を解析して本物のサイト名を取得する処理を追加しますが、今は仮のタイトルを入れます
    const tempTitle = '新規フィード (タイトル未取得)';

    const { data, error } = await supabase
      .from('feeds')
      .insert([{ url: newFeedUrl, title: tempTitle }])
      .select();

    if (error) {
      console.error('追加エラー:', error.message);
      alert('エラーが発生しました（すでに登録されているURLかもしれません）');
    } else if (data) {
      // 成功したら、リストの先頭に新しいデータを追加して入力欄を空にする
      rssFeeds = [data[0], ...rssFeeds];
      newFeedUrl = '';
    }
  }

  // Supabase からフィードを削除する関数
  async function removeFeed(id: number) {
    // 画面上のリストから即座に消す（UX向上のため、通信を待たずにUIを更新）
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

<div class="mx-auto max-w-2xl">
  <header class="mb-10 flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-700">詳細設定</h1>
      <p class="mt-1 text-sm font-medium text-slate-500">フィードの管理とカスタマイズ</p>
    </div>
    <a
      href="/"
      class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
      aria-label="link"
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

    <form onsubmit={addFeed} class="mb-6 flex gap-3">
      <input
        type="url"
        bind:value={newFeedUrl}
        placeholder="https://zenn.dev/topics/svelte/feed"
        class="h-12 flex-1 rounded-xl border-none bg-white px-4 font-medium text-slate-700 shadow-sm transition-shadow outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-teal-400/50"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        class="flex h-12 items-center gap-2 rounded-xl bg-slate-800 px-6 font-bold text-white shadow-sm transition-colors hover:bg-slate-700 disabled:opacity-50"
      >
        追加する
      </button>
    </form>

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
