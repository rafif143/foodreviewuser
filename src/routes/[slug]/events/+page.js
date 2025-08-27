import { getArticlesByCategory } from '$lib/articles';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { website } = await parent();
  
  // Ambil artikel dari kategori events
  const articles = await getArticlesByCategory(website.id, 'events');
  
  return {
    articles
  };
}