import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// @ts-ignore
import stdLibBrowser from 'vite-plugin-node-stdlib-browser';

export default defineConfig({
	plugins: [react(), stdLibBrowser()],
	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'react-text-admin',
			formats: ['es', 'cjs'],
			fileName: format => `index.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
	resolve: {
		alias: {
			path: 'node-stdlib-browser/path',
		},
	},
});
