import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess'; // Import preprocess from svelte-preprocess

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: preprocess({
		scss: {
			prependData: `@import './src/styles.scss';`, // Import global SCSS variables
		},
	}),
};

export default config;
