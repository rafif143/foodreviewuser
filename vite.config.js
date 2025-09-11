import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// Vendor chunks for better caching
					vendor: ['svelte', '@sveltejs/kit'],
					// Separate chunk for large components
					components: ['$lib/components']
				}
			}
		},
		// Optimize bundle size
		chunkSizeWarningLimit: 1000,
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		}
	},
	server: {
		// Enable HTTP/2 for better performance
		http2: true,
		// Optimize file serving
		fs: {
			strict: false
		}
	},
	optimizeDeps: {
		// Pre-bundle dependencies for faster dev startup
		include: ['@supabase/supabase-js']
	}
});
