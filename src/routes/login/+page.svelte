<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = $state('');
  let password = $state('');
  let isLoading = $state(false);
  let errorMessage = $state('');

  // 新規登録の処理
  async function signUp(e: Event) {
    e.preventDefault();
    isLoading = true;
    errorMessage = '';

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) errorMessage = error.message;
    else goto('/'); // 成功したらトップページへ移動

    isLoading = false;
  }

  // ログインの処理
  async function signIn(e: Event) {
    e.preventDefault();
    isLoading = true;
    errorMessage = '';

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) errorMessage = error.message;
    else goto('/'); // 成功したらトップページへ移動

    isLoading = false;
  }
</script>

<div class="flex min-h-[80vh] items-center justify-center">
  <div class="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
    <h1 class="mb-8 text-center text-3xl font-extrabold text-slate-600/60">pikka</h1>

    {#if errorMessage}
      <div class="mb-6 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-500">
        {errorMessage}
      </div>
    {/if}

    <form class="flex flex-col gap-5">
      <div>
        <label class="mb-2 block text-sm font-bold text-slate-500" for="email">メールアドレス</label
        >
        <input
          type="email"
          id="email"
          bind:value={email}
          class="h-12 w-full rounded-xl bg-slate-50 px-4 font-medium text-slate-700 transition-shadow outline-none focus:ring-2 focus:ring-teal-400/50"
          required
        />
      </div>

      <div>
        <label class="mb-2 block text-sm font-bold text-slate-500" for="password">パスワード</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          class="h-12 w-full rounded-xl bg-slate-50 px-4 font-medium text-slate-700 transition-shadow outline-none focus:ring-2 focus:ring-teal-400/50"
          required
        />
      </div>

      <div class="mt-4 flex flex-col gap-3">
        <button
          onclick={signIn}
          disabled={isLoading}
          class="h-12 rounded-xl bg-slate-800 font-bold text-white shadow-sm transition-colors hover:bg-slate-700 disabled:opacity-50"
        >
          ログイン
        </button>
        <button
          onclick={signUp}
          disabled={isLoading}
          class="h-12 rounded-xl bg-teal-500 font-bold text-white shadow-sm transition-colors hover:bg-teal-400 disabled:opacity-50"
        >
          新規登録
        </button>
      </div>
    </form>
  </div>
</div>
