# Implementasi SEO Multi-tenant Food Blog

## Overview
Sistem SEO yang dinamis dan komprehensif untuk blog food multi-tenant yang dapat diindeks Google dengan optimal.

## Fitur SEO yang Diimplementasikan

### 1. Meta Tags Dinamis
- **Title Tags**: Generate otomatis berdasarkan data artikel dan website dari database
- **Meta Description**: Extract dari summary artikel atau content, dengan fallback ke title
- **Meta Keywords**: Generate dari kategori, tags, labels, dan title artikel
- **Canonical URLs**: Mencegah duplicate content dengan URL canonical yang unik
- **Robots Meta**: Kontrol indexing berdasarkan status publish artikel

### 2. Open Graph & Twitter Cards
- **Open Graph**: Optimized untuk social media sharing
- **Twitter Cards**: Support untuk Twitter sharing dengan large image
- **Dynamic Images**: Menggunakan main_image atau thumbnail_image dari database

### 3. Structured Data (JSON-LD)
- **Article Schema**: Schema.org Article dengan semua metadata
- **Organization Schema**: Data publisher dan website
- **Breadcrumb Schema**: Navigasi breadcrumb untuk artikel
- **Website Schema**: Data website dengan search action

### 4. Sitemap XML Dinamis
- **Individual Sitemaps**: Setiap website memiliki sitemap sendiri
- **Sitemap Index**: Master sitemap untuk semua website
- **Auto-update**: Sitemap update otomatis berdasarkan artikel baru
- **Proper Priority**: Priority dan changefreq yang optimal

### 5. Robots.txt Dinamis
- **Per Website**: Setiap website memiliki robots.txt sendiri
- **Global Robots**: Master robots.txt dengan semua sitemap
- **Crawl Optimization**: Disallow admin areas, allow important pages

### 6. Multi-tenant Domain Mapping
- **14 Website Domains**: Mapping untuk setiap website
- **SEO Data**: Data SEO spesifik untuk setiap website
- **Location-based**: Keywords dan description berdasarkan lokasi

## Struktur File SEO

```
src/lib/
├── seo.js                    # Core SEO utilities
├── seo-utils.js             # SEO helper functions
├── website-seo-data.js      # Website-specific SEO data
└── components/
    └── SEOHead.svelte       # SEO component

src/routes/
├── [slug]/
│   ├── article/[articleSlug]/
│   │   └── +layout.svelte   # Article SEO layout
│   ├── food/
│   │   └── +layout.svelte   # Category SEO layout
│   ├── sitemap.xml/
│   │   └── +server.js       # Individual sitemap
│   ├── robots.txt/
│   │   └── +server.js       # Individual robots.txt
│   └── api/
│       └── seo-helper/
│           └── +server.js   # SEO API endpoints
├── sitemap.xml/
│   └── +server.js           # Master sitemap
└── robots.txt/
    └── +server.js           # Master robots.txt
```

## Website Domains

| Website | Domain | Focus |
|---------|--------|-------|
| Kelantan | makankelantan.com | Nasi Kerabu, Ayam Percik |
| Kedah | makankedah.com | Nasi Kandar, Laksa Kedah |
| Penang | makan-penang.com | Street Food, Char Kway Teow |
| Perak | makanperak.com | Nasi Kandar, Tauhu Bakar |
| Perlis | makanperlis.com | Traditional Malay |
| Terengganu | makanterengganu.com | Nasi Dagang, Keropok Lekor |
| Pahang | makanpahang.com | Traditional Malay |
| Kuala Lumpur | makankualalumpur.com | International, Street Food |
| Selangor | makanselangor.com | Bak Kut Teh, Satay |
| Johor | makanjohor.com | Laksa Johor, Nasi Beriani |
| Melaka | makanmelaka.com | Nyonya, Chicken Rice Ball |
| Negeri Sembilan | makannegerisembilan.com | Rendang, Lemang |
| Sabah | makansabah.com | Tuaran Mee, Hinava |
| Sarawak | makansarawak.com | Laksa Sarawak, Kek Lapis |

## SEO Features per Halaman

### Halaman Artikel
- Dynamic title: `{Article Title} | {Website Name}`
- Meta description dari summary atau content
- Keywords dari kategori, tags, labels
- Canonical URL dengan domain yang benar
- Open Graph dengan image dari database
- Twitter Cards dengan large image
- Structured data Article schema
- Breadcrumb navigation

### Halaman Kategori
- Title: `{Category Name} | {Website Name}`
- Description dengan keyword location-specific
- Canonical URL untuk kategori
- Sitemap inclusion dengan priority 0.8

### Halaman Website
- Title: `{Website Name} - {Description}`
- Description dengan location dan cuisine focus
- Canonical URL homepage
- Website structured data
- Social media links

## API Endpoints SEO

### GET /{slug}/api/seo-helper
Query parameters:
- `type=website` - Website structured data
- `type=article&article={slug}` - Article structured data
- `type=breadcrumb&article={slug}` - Breadcrumb structured data

## Database Integration

### Articles Table
```sql
- title: Meta title generation
- summary: Meta description fallback
- content: Text extraction for description
- category: Keywords dan breadcrumb
- tags/labels: Additional keywords
- published_at: Article schema date
- thumbnail_image/main_image: Open Graph image
- is_published: Robots meta control
```

### Websites Table
```sql
- name: Website title
- slug: Domain mapping
- description: Meta description
- logo_url: Organization schema
```

## Performance Optimizations

1. **Caching**: Sitemap dan robots.txt di-cache 1-24 jam
2. **Database Queries**: Optimized queries dengan proper indexing
3. **Static Generation**: SEO data generated on build/deploy
4. **Image Optimization**: Proper image URLs untuk social sharing

## Google Indexing Strategy

1. **Sitemap Submission**: Submit semua sitemap ke Google Search Console
2. **Robots.txt**: Proper crawling directives
3. **Canonical URLs**: Prevent duplicate content issues
4. **Structured Data**: Rich snippets untuk better SERP appearance
5. **Mobile Optimization**: Responsive meta viewport
6. **Page Speed**: Optimized loading dengan proper meta tags

## Monitoring & Analytics

1. **Google Search Console**: Monitor indexing status
2. **Structured Data Testing**: Validate schema markup
3. **PageSpeed Insights**: Monitor performance
4. **Social Media Debuggers**: Test Open Graph dan Twitter Cards

## Maintenance

1. **Regular Sitemap Updates**: Otomatis berdasarkan artikel baru
2. **SEO Data Updates**: Update website-seo-data.js untuk perubahan
3. **Performance Monitoring**: Regular check untuk SEO metrics
4. **Content Optimization**: Monitor keyword performance

## Best Practices Implemented

1. **Unique Titles**: Setiap halaman memiliki title unik
2. **Descriptive URLs**: SEO-friendly URL structure
3. **Image Alt Tags**: Proper alt text untuk accessibility
4. **Internal Linking**: Related articles dan breadcrumbs
5. **Mobile-First**: Responsive design dengan proper meta tags
6. **Schema Markup**: Comprehensive structured data
7. **Social Optimization**: Open Graph dan Twitter Cards
8. **Local SEO**: Location-based keywords dan descriptions
