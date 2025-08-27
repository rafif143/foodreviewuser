import { getLatestArticles, getArticlesByCategory, getRandomArticles } from '$lib/articles';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { website } = await parent();
  
  // Ambil artikel terbaru untuk semua kategori berdasarkan created_at
  const latestArticles = await getLatestArticles(website.id, 6);
  
  // Ambil artikel populer dari berbagai kategori berdasarkan visit_count
  const popularArticles = await getArticlesByCategory(website.id, null, 30, 0, true);
  
  // Ambil 10 artikel random yang berbeda setiap hari
  const randomArticles = await getRandomArticles(website.id, 10);
  
  // Ambil artikel trending berdasarkan visit_count (tanpa filter kategori dengan offset berbeda)
  const trendingArticles = await getArticlesByCategory(website.id, null, 5, 6, true);
  
  return {
    latestArticles,
    popularArticles,
    randomArticles,
    trendingArticles
  };
}