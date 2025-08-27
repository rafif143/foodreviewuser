import { getArticlesByCategory } from '$lib/articles';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { website } = await parent();
  
  // Ambil artikel dari kategori cafe
  const articles = await getArticlesByCategory(website.id, 'cafe');
  
  return {
    articles
  };
}