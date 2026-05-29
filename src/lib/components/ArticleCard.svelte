<script lang="ts">
  import type { Article } from '$lib/states/article.svelte';

  let {
    article,
    onToggleBookmark,
    onArticleClick
  }: {
    article: Article;
    onToggleBookmark: (id: string) => void;
    onArticleClick: (url: string) => void;
  } = $props();
</script>

<div class="flex flex-col gap-1 rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="button to article"
    class="flex items-center gap-4 p-3"
    onclick={() => onArticleClick(article.url)}
  >
    {#if article.thumbnailUrl}
      <img
        src={article.thumbnailUrl}
        alt={article.title}
        class="h-16 w-24 shrink-0 rounded-xl bg-slate-100 object-cover shadow-sm"
        loading="lazy"
      />
    {:else}
      <div
        class="bg-liner-to-br flex h-16 w-24 shrink-0 items-center justify-center rounded-xl from-teal-500/20 to-blue-500/20 text-xs font-bold text-teal-600/40"
      >
        No Image
      </div>
    {/if}

    <div class="flex-1 overflow-hidden">
      <p class="mb-1 truncate text-xs font-bold text-teal-600/80">
        {article.siteName}
      </p>
      <h2 class="line-clamp-2 text-sm leading-relaxed font-bold text-slate-700">
        {article.title}
      </h2>
    </div>

    <div class="flex shrink-0 items-center gap-2 pr-2">
      <button
        onclick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleBookmark(article.id);
        }}
        class="flex h-10 w-10 items-center justify-center rounded-full transition-colors {article.isBookmarked
          ? 'bg-yellow-100 text-yellow-500'
          : 'bg-slate-100 text-slate-300 hover:bg-slate-200'}"
        aria-label="bookmark button"
      >
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
      <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </div>
  </a>

  <div class="flex justify-end pr-4 pb-3">
    <a
      href={`https://web.archive.org/web/*/${article.url}`}
      target="_blank"
      rel="noopener noreferrer"
      class="text-[10px] font-medium text-slate-400 underline transition-colors hover:text-slate-600"
      onclick={(e) => e.stopPropagation()}
    >
      🔗 リンク切れの場合はアーカイブを確認
    </a>
  </div>
</div>
