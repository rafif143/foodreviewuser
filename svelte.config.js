import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = { 
  kit: { 
    adapter: adapter({
      // Netlify adapter options for better production performance
      edge: false,
      split: false
    }),
    // Optimize for production
    prerender: {
      handleHttpError: 'warn'
    }
  } 
};

export default config;
