<script lang="ts">
  import { onMount } from 'svelte';
  import { authManager } from '$lib/states/auth.svelte'; // 💡 追加
  import '../app.css';

  let { children } = $props();

  onMount(() => {
    authManager.init(); // 💡 アプリが開かれた瞬間にログイン状態をチェック
  });
</script>

<div class="min-h-screen bg-gray-50 font-sans text-slate-800 selection:bg-gray-50">
  <div
    class="relative mx-auto flex min-h-screen max-w-2xl flex-col bg-white/10 px-4 py-8 shadow-sm md:px-8"
  >
    {@render children()}
  </div>
</div>
