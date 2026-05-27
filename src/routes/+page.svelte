<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authManager } from '$lib/states/auth.svelte';
  import { supabase } from '$lib/supabaseClient';
  import { ArticleManager } from '$lib/states/article.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';

  const manager = new ArticleManager();
  let searchQuery = $state('');

  // データのロードだけは、状態が揃った時に実行されるように残します
  $effect(() => {
    if (authManager.isInitialized && authManager.user) {
      if (manager.articles.length === 0 && !manager.isLoading) {
        manager.loadArticles();
      }
    }
  });

  // 代わりに onMount で、Supabaseのストレージ読み込み完了を確実に待ちます
  onMount(async () => {
    // getSession() は、ローカルの鍵を確実に読み込むまで待機(await)してくれます
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
      // 完全に読み込み終わって、それでもセッションが無い場合のみ弾く
      goto('/login');
    } else {
      // セッションが存在すれば、authManagerの状態を確実に同期させる
      if (!authManager.user) {
        authManager.user = session.user;
      }
      authManager.isInitialized = true;
    }
  });

  // 詳細設定ページ
  async function goToSettings() {
    goto('/settings');
  }

  // マイページ
  async function goToProfile() {
    goto('/profile');
  }
</script>

<header class="mb-8 flex flex-col items-center justify-center gap-5">
  <img src="/logo_title.svg" alt="pikka" class="h-10 w-auto" />
  <p class="mt-2 text-sm font-medium text-slate-600">知りたいニュースを、知りたいときに。</p>

  <div class="flex items-center gap-4">
    <button
      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-colors hover:text-slate-800"
      aria-label="button"
    >
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    </button>
    <div class="relative flex-1">
      <div class="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        bind:value={searchQuery}
        class="h-12 w-full rounded-xl border-none bg-white pr-4 pl-12 font-medium text-slate-700 placeholder-slate-400 shadow-sm transition-shadow outline-none focus:ring-2 focus:ring-teal-400/50"
      />
    </div>
    <button
      onclick={goToProfile}
      class="bg-liner-to-br h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white bg-red-200 shadow-sm transition-transform hover:scale-105"
      title="マイページへ"
      aria-label="logout"
    >
      <div class="flex h-full w-full items-center justify-center text-lg font-bold text-white">
        {authManager.user?.email?.[0].toUpperCase() || 'U'}
      </div>
    </button>
  </div>

  <div class=" flex justify-center">
    <div class="flex rounded-full bg-white p-1 shadow-sm">
      {#each manager.tabs as tab}
        <button
          onclick={() => (manager.activeTab = tab)}
          class="rounded-full px-6 py-2 text-sm font-bold transition-colors {manager.activeTab ===
          tab
            ? 'bg-slate-200 text-slate-800'
            : 'text-slate-400 hover:text-slate-600'}"
        >
          {tab}
        </button>
      {/each}
    </div>
  </div>
  <div class="mb-6 md:right-8">
    <a
      href="/settings"
      class="flex flex-col items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm transition-transform hover:scale-105"
    >
      <button class="flex items-center gap-5" aria-label="詳細設定ページへ" onclick={goToSettings}>
        詳細設定へ
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </a>
  </div>
</header>

<div class="flex flex-col gap-4 pb-24">
  {#if manager.isLoading}
    <div class="animate-pulse py-10 text-center font-bold text-slate-400">
      最新のニュースを拾い集めています...
    </div>
  {:else if manager.filteredArticles.length === 0}
    <div class="rounded-2xl bg-white p-8 text-center shadow-sm">
      {#if manager.activeTab === 'ストック'}
        <p class="mb-2 font-bold text-slate-500">ストックした記事がありません</p>
        <p class="text-sm font-medium text-slate-400">
          気になった記事のしおりアイコンを押して保存しましょう。
        </p>
      {:else}
        <p class="mb-4 font-bold text-slate-500">まだニュースがありません。</p>
        <a
          href="/settings"
          class="inline-block rounded-xl bg-slate-800 px-6 py-3 font-bold text-white transition-colors hover:bg-slate-700"
        >
          設定からRSSを追加する
        </a>
      {/if}
    </div>
  {:else}
    {#each manager.filteredArticles as article (article.id)}
      <ArticleCard {article} onToggleBookmark={(id) => manager.toggleBookmark(id)} />
    {/each}
  {/if}
</div>
