<script lang="ts">
  import { ArticleManager } from '$lib/states/article.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';

  // ロジックをインスタンス化
  const manager = new ArticleManager();

  let searchQuery = $state('');
</script>

<header class="mb-8 flex flex-col items-center justify-center gap-5">
  <h1 class="relative text-5xl font-extrabold tracking-tight text-slate-600/60">pikka</h1>
  <p class="mt-2 text-sm font-medium text-slate-600">知りたいニュースを、知りたいときに。</p>

  <div class="mb-8 flex items-center gap-4">
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
      class="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm transition-opacity hover:opacity-80"
    >
      <div
        class="bg-liner-to-br flex h-full w-full items-center justify-center from-blue-500 to-teal-400 text-xs font-bold text-white"
      >
        U
      </div>
    </button>
  </div>
</header>

<div class="mb-6 flex justify-center">
  <div class="flex rounded-full bg-white p-1 shadow-sm">
    {#each manager.tabs as tab}
      <button
        onclick={() => (manager.activeTab = tab)}
        class="rounded-full px-6 py-2 text-sm font-bold transition-colors {manager.activeTab === tab
          ? 'bg-slate-200 text-slate-800'
          : 'text-slate-400 hover:text-slate-600'}"
      >
        {tab}
      </button>
    {/each}
  </div>
</div>

<div class="flex flex-col gap-4 pb-24">
  {#each manager.articles as article (article.id)}
    <ArticleCard {article} onToggleBookmark={(id) => manager.toggleBookmark(id)} />
  {/each}
</div>

<div class="absolute right-4 bottom-8 md:right-8">
  <a
    href="/settings"
    class="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-md transition-transform hover:scale-105"
  >
    詳細設定へ
    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
    </svg>
  </a>
</div>
