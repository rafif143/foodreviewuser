import { getArticlesByCategory } from '$lib/articles';
import { 
  generateCanonicalUrl, 
  generateWebsiteTitle, 
  generateWebsiteDescription,
  generateRobotsMeta
} from '$lib/seo.js';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const { website } = await parent();
  
  // Ambil artikel dari kategori food
  const articles = await getArticlesByCategory(website.id, 'food');
  
  // Generate SEO data untuk halaman kategori
  const canonicalUrl = generateCanonicalUrl(website, 'food');
  const seoData = {
    title: generateWebsiteTitle(website, 'Restoran & Tempat Makan Terbaik'),
    description: `Temukan restoran dan tempat makan terbaik di ${website.name}. Rekomendasi kuliner autentik, review mendalam, dan panduan makan yang akurat.`,
    keywords: `restoran, tempat makan, kuliner, ${website.name.toLowerCase()}, food review, review makanan`,
    canonical: canonicalUrl,
    robots: generateRobotsMeta(true, true)
  };
  
  return {
    articles,
    seo: seoData
  };
}