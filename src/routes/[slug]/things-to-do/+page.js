import { getArticlesByCategory } from '$lib/articles';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { website } = await parent();
  
  // Ambil artikel dari kategori things-to-do
  const articles = await getArticlesByCategory(website.id, 'things-to-do');
  
  return {
    articles
  };
}