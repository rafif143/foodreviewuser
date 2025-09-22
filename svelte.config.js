import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = { 
  kit: { 
    adapter: adapter(),
    // Development configuration
    prerender: {
      handleHttpError: 'warn'
    },
    // Handle trailing slashes consistently
   
  } 
};

export default config;
