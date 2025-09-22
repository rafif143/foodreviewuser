import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		// Optimize bundle size
		chunkSizeWarningLimit: 1000,
		minify: 'esbuild',
		// esbuild options (faster than terser)
		esbuild: {
			drop: ['console', 'debugger']
		},
		// Fix chunk naming for production
		rollupOptions: {
			output: {
				chunkFileNames: 'assets/[name]-[hash].js',
				entryFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash].[ext]'
			}
		}
	},
	server: {
		// Enable HTTP/2 for better performance
		http2: true,
		// Optimize file serving
		fs: {
			strict: false
		},
		// Handle SPA routing for development
		historyApiFallback: {
			disableDotRule: true,
			index: '/index.html'
		}
	},
	optimizeDeps: {
		// Pre-bundle dependencies for faster dev startup
		include: ['@supabase/supabase-js']
	}
});
