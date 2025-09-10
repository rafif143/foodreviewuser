import { DEFAULT_WEBSITE_ID } from '$lib/tenant';

/** @type {import('./$types').PageLoad} */
export async function load() {
  // Fallback data untuk sementara
  const website = {
    id: DEFAULT_WEBSITE_ID,
    name: "Kelantan Food Review",
    slug: "kelantan",
    description: "Panduan kuliner terbaik di Kelantan",
    logo_url: null
  };
  
  return {
    website
  };
}
