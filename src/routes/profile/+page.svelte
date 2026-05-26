<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authManager } from '$lib/states/auth.svelte';
  import { supabase } from '$lib/supabaseClient';
  import { ArticleManager } from '$lib/states/article.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';

  const manager = new ArticleManager();

  // ユーザーネーム編集用の状態
  let isEditing = $state(false);
  let username = $state('');

  onMount(() => {
    // 未ログインならログイン画面へリダイレクト
    if (!authManager.user) {
      goto('/login');
      return;
    }

    // ログインユーザー専用の初期設定
    // メールアドレスの @ より前を暫定のユーザーネームにする
    username = authManager.user.email?.split('@')[0] || 'ユーザー';

    // 記事（ストック表示用）のロード
    manager.loadArticles();
    // マイページを開いたときはデフォルトで「ストック」タブ状態にする
    manager.activeTab = 'ストック';
  });

  // ログアウト処理
  async function signOut() {
    await supabase.auth.signOut();
    goto('/login');
  }

  // ユーザーネームの保存（拡張用：今回はフロントの状態変更のみ、今後DB連携可能）
  function saveUsername() {
    isEditing = false;
  }
</script>

<div class="mx-auto max-w-4xl px-4 py-8">
  <div class="mb-6">
    <a
      href="/"
      class="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-800"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      タイムラインに戻る
    </a>
  </div>

  <div class="mb-10 rounded-3xl bg-white p-8 shadow-sm">
    <div class="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <div class="flex flex-col items-center gap-5 sm:flex-row">
        <div
          class="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-red-200 text-3xl font-bold text-white shadow-md"
        >
          {authManager.user?.email?.[0].toUpperCase() || 'U'}
        </div>

        <div class="text-center sm:text-left">
          {#if isEditing}
            <div class="flex items-center gap-2">
              <input
                type="text"
                bind:value={username}
                class="h-9 rounded-lg border-none bg-slate-100 px-3 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-400/50"
              />
              <button
                onclick={saveUsername}
                class="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-700"
              >
                保存
              </button>
            </div>
          {:else}
            <div class="flex items-center justify-center gap-2 sm:justify-start">
              <h2 class="text-2xl font-extrabold text-slate-700">{username}</h2>
              <button
                onclick={() => (isEditing = true)}
                class="text-slate-400 hover:text-slate-600"
                aria-label="edit-username"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
          {/if}
          <p class="mt-1 text-sm font-medium text-slate-400">{authManager.user?.email}</p>
        </div>
      </div>

      <button
        onclick={signOut}
        class="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
      >
        ログアウト
      </button>
    </div>
  </div>

  <div class="mb-6">
    <h3 class="mb-4 flex items-center gap-2 text-xl font-extrabold text-slate-600/80">
      <svg class="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
      </svg>
      ストックした記事 ({manager.filteredArticles.length})
    </h3>

    <div class="flex flex-col gap-4 pb-24">
      {#if manager.isLoading}
        <div class="animate-pulse py-10 text-center font-bold text-slate-400">
          ストックを読み込んでいます...
        </div>
      {:else if manager.filteredArticles.length === 0}
        <div class="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p class="mb-2 font-bold text-slate-500">ストックした記事がありません</p>
          <p class="text-sm font-medium text-slate-400">
            タイムラインで気になった記事にしおりを挟みましょう。
          </p>
        </div>
      {:else}
        {#each manager.filteredArticles as article (article.id)}
          <ArticleCard {article} onToggleBookmark={(id) => manager.toggleBookmark(id)} />
        {/each}
      {/if}
    </div>
  </div>
</div>
