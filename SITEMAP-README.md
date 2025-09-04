# 🗺️ Sitemap Generation Guide

## 📋 Overview
Sistem sitemap otomatis untuk website Kelantan Food Review dengan domain `https://foodreviewuser.netlify.app/`

## 📁 Files yang Dibuat

### 1. `static/sitemap.xml`
- ✅ **Static sitemap** dengan URL yang sudah di-hardcode
- ✅ **SEO optimized** dengan priority dan changefreq
- ✅ **Ready to deploy** ke Netlify

### 2. `static/robots.txt`
- ✅ **Updated** dengan domain yang benar
- ✅ **Sitemap reference** ke sitemap.xml
- ✅ **Crawl directives** untuk SEO

### 3. `scripts/generate-sitemap.js`
- ✅ **Dynamic sitemap generator** dari database
- ✅ **Supabase integration** untuk fetch data
- ✅ **Automatic updates** berdasarkan content

## 🚀 Cara Menggunakan

### **A. Static Sitemap (Sudah Siap)**
```bash
# Sitemap sudah tersedia di:
https://foodreviewuser.netlify.app/sitemap.xml

# Robots.txt sudah tersedia di:
https://foodreviewuser.netlify.app/robots.txt
```

### **B. Dynamic Sitemap Generation**
```bash
# Generate sitemap dari database
npm run generate-sitemap

# Build dengan sitemap terbaru
npm run build-with-sitemap
```

## 📊 Sitemap Content

### **Static Pages (Priority 0.6-1.0)**
- ✅ **Homepage** (`/`) - Priority 1.0, Daily
- ✅ **About** (`/about`) - Priority 0.8, Monthly
- ✅ **Contact** (`/contact`) - Priority 0.8, Monthly
- ✅ **Advertise** (`/advertise`) - Priority 0.7, Monthly

### **Category Pages (Priority 0.8-0.9)**
- ✅ **Food** (`/food`) - Priority 0.9, Weekly
- ✅ **Cafe** (`/cafe`) - Priority 0.9, Weekly
- ✅ **Events** (`/events`) - Priority 0.8, Weekly
- ✅ **Recipe** (`/recipe`) - Priority 0.8, Weekly
- ✅ **Things to Do** (`/things-to-do`) - Priority 0.8, Weekly

### **Article Pages (Priority 0.8)**
- ✅ **Nasi Kerabu Kelantan** (`/article/nasi-kerabu-kelantan`)
- ✅ **Ayam Percik Kelantan** (`/article/ayam-percik-kelantan`)
- ✅ **Laksa Kelantan** (`/article/laksa-kelantan`)
- ✅ **Nasi Dagang Kelantan** (`/article/nasi-dagang-kelantan`)
- ✅ **Restoran Terbaik Kota Bharu** (`/article/restoran-terbaik-kota-bharu`)
- ✅ **Warung Makan Tradisional Kelantan** (`/article/warung-makan-tradisional-kelantan`)
- ✅ **Makanan Halal Kelantan** (`/article/makanan-halal-kelantan`)
- ✅ **Kuliner Kelantan Wajib Coba** (`/article/kuliner-kelantan-wajib-coba`)
- ✅ **Tempat Makan Murah Kelantan** (`/article/tempat-makan-murah-kelantan`)
- ✅ **Acara Kuliner Kelantan 2025** (`/article/acara-kuliner-kelantan-2025`)

### **Tag Pages (Priority 0.7)**
- ✅ **Nasi Kerabu** (`/tag/nasi-kerabu`)
- ✅ **Ayam Percik** (`/tag/ayam-percik`)
- ✅ **Laksa Kelantan** (`/tag/laksa-kelantan`)
- ✅ **Restoran Halal** (`/tag/restoran-halal`)
- ✅ **Makanan Tradisional** (`/tag/makanan-tradisional`)
- ✅ **Kota Bharu** (`/tag/kota-bharu`)
- ✅ **Kelantan** (`/tag/kelantan`)
- ✅ **Kuliner** (`/tag/kuliner`)
- ✅ **Warung Makan** (`/tag/warung-makan`)
- ✅ **Makanan Halal** (`/tag/makanan-halal`)

## 🔧 Configuration

### **Website Config**
```javascript
const WEBSITE_CONFIG = {
  domain: 'https://foodreviewuser.netlify.app',
  websiteId: 1, // Kelantan
  name: 'Kelantan Food Review'
};
```

### **Supabase Integration**
```javascript
// Environment variables needed:
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
```

## 📈 SEO Benefits

### **1. Search Engine Indexing**
- ✅ **Faster discovery** of new content
- ✅ **Better crawling** efficiency
- ✅ **Priority guidance** for search engines

### **2. Content Organization**
- ✅ **Structured URLs** for better SEO
- ✅ **Category hierarchy** for navigation
- ✅ **Tag system** for content discovery

### **3. Performance**
- ✅ **Optimized changefreq** for different content types
- ✅ **Lastmod timestamps** for freshness
- ✅ **Priority weighting** for important pages

## 🚀 Deployment

### **A. Netlify Deployment**
```bash
# Deploy dengan sitemap
npm run build-with-sitemap

# Sitemap akan tersedia di:
https://foodreviewuser.netlify.app/sitemap.xml
```

### **B. Google Search Console**
1. ✅ **Submit sitemap** ke Google Search Console
2. ✅ **Monitor indexing** status
3. ✅ **Check for errors** dan fix

### **C. Other Search Engines**
```bash
# Bing Webmaster Tools
https://www.bing.com/webmasters/

# Yandex Webmaster
https://webmaster.yandex.com/
```

## 🔄 Maintenance

### **A. Regular Updates**
```bash
# Update sitemap setiap minggu
npm run generate-sitemap

# Deploy dengan sitemap terbaru
npm run build-with-sitemap
```

### **B. Content Monitoring**
- ✅ **Check new articles** di database
- ✅ **Update lastmod** timestamps
- ✅ **Add new categories** jika ada

### **C. Performance Monitoring**
- ✅ **Monitor sitemap size** (max 50MB)
- ✅ **Check URL count** (max 50,000 URLs)
- ✅ **Validate XML** format

## 📊 Analytics

### **A. Sitemap Statistics**
```bash
# Total URLs: 35+
# Articles: 10
# Tags: 10
# Categories: 5
# Static Pages: 4
```

### **B. SEO Impact**
- ✅ **Improved indexing** speed
- ✅ **Better search rankings** untuk local keywords
- ✅ **Enhanced crawl efficiency**

## 🎯 Next Steps

### **1. Immediate Actions**
- ✅ **Deploy sitemap** ke production
- ✅ **Submit ke Google** Search Console
- ✅ **Monitor indexing** status

### **2. Future Enhancements**
- 🔄 **Image sitemap** untuk better image SEO
- 🔄 **News sitemap** untuk artikel terbaru
- 🔄 **Video sitemap** untuk konten video

### **3. Scaling**
- 🔄 **Multi-tenant sitemap** untuk website lain
- 🔄 **Automated generation** dengan cron jobs
- 🔄 **Real-time updates** dengan webhooks

---

**Sitemap sudah siap untuk deployment! 🚀**

**URL Sitemap: https://foodreviewuser.netlify.app/sitemap.xml**
