<script lang="ts">
  // 検索ワードの状態管理
  let searchQuery = $state('');
</script>

<header class="mb-8 flex flex-col items-center justify-center">
  <h1 class="relative text-5xl font-extrabold tracking-tight text-slate-600/60">
    pikka
  </h1>
  <p class="mt-2 text-sm font-medium text-slate-600">知りたいニュースを、知りたいときに。</p>
</header>

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
      class="flex h-full w-full items-center justify-center bg-linear-50 from-blue-500 to-teal-400 text-xs font-bold text-white"
    >
      U
    </div>
  </button>
</div>
