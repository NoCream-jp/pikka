<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50 font-sans text-slate-800 selection:bg-gray-50">
  <div
    class="relative mx-auto flex min-h-screen max-w-2xl flex-col bg-white/10 px-4 py-8 shadow-sm md:px-8"
  >
    {@render children()}
  </div>
</div>
