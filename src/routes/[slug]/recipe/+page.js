import { getArticlesByCategory } from '$lib/articles';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { website } = await parent();
  
  // Ambil artikel dari kategori recipe
  const articles = await getArticlesByCategory(website.id, 'recipe');
  
  return {
    articles
  };
}