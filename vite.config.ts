import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'; // 💡 追加

export default defineConfig({
	plugins: [
		tailwindcss(), // sveltekit() より前に配置
		sveltekit()
	]
});