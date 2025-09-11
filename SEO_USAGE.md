# Panduan Penggunaan SEO Multi-tenant Food Blog

## Quick Start

### 1. Menjalankan Test SEO
```bash
node test-seo.js
```

### 2. Mengakses Sitemap
- **Master Sitemap**: `https://yourdomain.com/sitemap.xml`
- **Individual Sitemap**: `https://yourdomain.com/{website-slug}/sitemap.xml`

### 3. Mengakses Robots.txt
- **Master Robots**: `https://yourdomain.com/robots.txt`
- **Individual Robots**: `https://yourdomain.com/{website-slug}/robots.txt`

## Implementasi SEO di Halaman

### Halaman Artikel
```svelte
<!-- +page.js -->
import { 
  generateCanonicalUrl, 
  generateArticleTitle, 
  generateArticleDescription,
  generateArticleKeywords,
  generateArticleOpenGraph,
  generateArticleTwitterCard,
  generateArticleStructuredData,
  generateRobotsMeta
} from '$lib/seo.js';

export async function load({ params, parent }) {
  const { website } = await parent();
  const article = await getArticle(params.articleSlug, website.id);
  
  const canonicalUrl = generateCanonicalUrl(website, `article/${article.slug}`);
  const seoData = {
    title: generateArticleTitle(article, website),
    description: generateArticleDescription(article, website),
    keywords: generateArticleKeywords(article, website),
    canonical: canonicalUrl,
    robots: generateRobotsMeta(article.is_published, true),
    openGraph: generateArticleOpenGraph(article, website, canonicalUrl),
    twitterCard: generateArticleTwitterCard(article, website, canonicalUrl),
    structuredData: generateArticleStructuredData(article, website, canonicalUrl)
  };

  return { article, seo: seoData };
}
```

```svelte
<!-- +page.svelte -->
<script>
  import SEOHead from '$lib/components/SEOHead.svelte';
  export let data;
</script>

<SEOHead seoData={data.seo} />
<!-- Konten halaman -->
```

### Halaman Kategori
```svelte
<!-- +page.js -->
import { 
  generateCanonicalUrl, 
  generateWebsiteTitle,
  generateRobotsMeta
} from '$lib/seo.js';

export async function load({ parent }) {
  const { website } = await parent();
  
  const canonicalUrl = generateCanonicalUrl(website, 'food');
  const seoData = {
    title: generateWebsiteTitle(website, 'Restoran & Tempat Makan Terbaik'),
    description: `Temukan restoran dan tempat makan terbaik di ${website.name}.`,
    canonical: canonicalUrl,
    robots: generateRobotsMeta(true, true)
  };
  
  return { seo: seoData };
}
```

## Menambahkan Website Baru

### 1. Update Domain Mapping
```javascript
// src/lib/website-seo-data.js
export const WEBSITE_SEO_DATA = {
  'website-baru': {
    name: 'MakanWebsiteBaru',
    domain: 'makanwebsitebaru.com',
    description: 'Panduan kuliner terbaik di Website Baru.',
    keywords: 'website baru food, makanan website baru',
    location: 'Website Baru, Malaysia',
    cuisine: 'Traditional Malay',
    socialMedia: {
      facebook: 'https://facebook.com/MakanWebsiteBaru',
      instagram: 'https://instagram.com/makanwebsitebaru'
    }
  }
};
```

### 2. Tambahkan ke Database
```sql
INSERT INTO websites (name, slug, description) 
VALUES ('Website Baru Food Review', 'website-baru', 'Panduan kuliner terbaik di Website Baru');
```

## Customisasi SEO

### Mengubah Meta Description
```javascript
// Di +page.js
const seoData = {
  title: generateArticleTitle(article, website),
  description: "Custom description untuk halaman ini",
  // ... lainnya
};
```

### Menambahkan Structured Data Kustom
```javascript
// Di +page.js
const customStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Recipe',
  name: article.title,
  description: article.summary,
  // ... properti lainnya
};

const seoData = {
  // ... data SEO lainnya
  structuredData: customStructuredData
};
```

### Mengubah Keywords
```javascript
// Di +page.js
const seoData = {
  // ... data SEO lainnya
  keywords: "keyword custom, keyword tambahan, " + generateArticleKeywords(article, website)
};
```

## Validasi SEO

### 1. Google Rich Results Test
```
https://search.google.com/test/rich-results
```

### 2. Facebook Sharing Debugger
```
https://developers.facebook.com/tools/debug/
```

### 3. Twitter Card Validator
```
https://cards-dev.twitter.com/validator
```

### 4. Google Search Console
- Submit sitemap: `https://yourdomain.com/sitemap.xml`
- Monitor indexing status
- Check for errors

## Troubleshooting

### Meta Tags Tidak Muncul
1. Pastikan `SEOHead` component digunakan
2. Cek apakah `seoData` berisi data yang benar
3. Pastikan tidak ada error di console

### Sitemap Tidak Update
1. Cek cache settings di server
2. Pastikan artikel sudah `is_published = true`
3. Cek database connection

### Structured Data Error
1. Validasi dengan Google Rich Results Test
2. Pastikan semua required fields ada
3. Cek format JSON-LD

### Canonical URL Salah
1. Pastikan domain mapping benar di `website-seo-data.js`
2. Cek parameter `website` object
3. Pastikan path parameter benar

## Performance Tips

### 1. Caching
- Sitemap di-cache 1 jam
- Robots.txt di-cache 24 jam
- SEO data di-cache di browser

### 2. Database Optimization
- Pastikan index pada `website_id`, `slug`, `is_published`
- Gunakan query yang efisien
- Limit hasil query sesuai kebutuhan

### 3. Image Optimization
- Gunakan proper image URLs untuk Open Graph
- Pastikan image accessible
- Optimize image size untuk social sharing

## Monitoring

### 1. Google Search Console
- Monitor sitemap submission
- Check indexing status
- Monitor search performance

### 2. Analytics
- Track organic traffic
- Monitor keyword rankings
- Analyze user behavior

### 3. Social Media
- Monitor sharing metrics
- Check Open Graph appearance
- Validate Twitter Cards

## Best Practices

1. **Unique Content**: Pastikan setiap artikel memiliki title dan description unik
2. **Keyword Research**: Gunakan keyword yang relevan dengan konten
3. **Internal Linking**: Link ke artikel terkait
4. **Image Alt Text**: Tambahkan alt text untuk accessibility
5. **Mobile Optimization**: Pastikan responsive design
6. **Page Speed**: Optimize loading time
7. **Regular Updates**: Update sitemap secara berkala
8. **Monitor Performance**: Track SEO metrics secara rutin
