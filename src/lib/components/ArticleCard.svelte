<script lang="ts">
  import type { Article } from '$lib/states/article.svelte';

  let {
    article,
    onToggleBookmark
  }: {
    article: Article;
    onToggleBookmark: (id: string) => void;
  } = $props();
</script>

<article
  class="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
>
  <div class="bg-liner-to-br h-16 w-24 shrink-0 rounded-xl from-blue-600 to-teal-300"></div>

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
      onclick={() => onToggleBookmark(article.id)}
      class="flex h-10 w-10 items-center justify-center rounded-full transition-colors {article.isBookmarked
        ? 'bg-yellow-100 text-yellow-500'
        : 'bg-slate-100 text-slate-300 hover:bg-slate-200'}"
      aria-label="button"
    >
      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>

    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      class="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700"
      aria-label="card"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  </div>
</article>
