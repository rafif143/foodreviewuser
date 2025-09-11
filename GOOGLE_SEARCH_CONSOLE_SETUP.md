# 🔍 Google Search Console Setup Guide

## 📋 **Overview**
Panduan lengkap untuk setup Google Search Console untuk 14 website multi-tenant Food Review.

## 🌐 **Daftar Domain yang Perlu Diverifikasi**

### **14 Website Multi-Tenant:**
1. **MakanKelantan** - `makankelantan.com`
2. **MakanKedah** - `makankedah.com`
3. **MakanPenang** - `makan-penang.com`
4. **MakanPerak** - `makanperak.com`
5. **MakanPerlis** - `makanperlis.com`
6. **MakanTerengganu** - `makanterengganu.com`
7. **MakanPahang** - `makanpahang.com`
8. **MakanKualaLumpur** - `makankualalumpur.com`
9. **MakanSelangor** - `makanselangor.com`
10. **MakanJohor** - `makanjohor.com`
11. **MakanMelaka** - `makanmelaka.com`
12. **MakanNegeriSembilan** - `makannegerisembilan.com`
13. **MakanSabah** - `makansabah.com`
14. **MakanSarawak** - `makansarawak.com`

## 📁 **File HTML Verification**

### **Lokasi File:**
- **Template**: `/static/google-verification-template.html`
- **Generic**: `/static/google-site-verification.html`

### **Cara Menggunakan:**

#### **Metode 1: HTML File Upload (Recommended)**
1. Login ke [Google Search Console](https://search.google.com/search-console/)
2. Pilih "Add Property" → "URL prefix"
3. Masukkan domain (contoh: `https://makankelantan.com`)
4. Pilih "HTML file" sebagai metode verifikasi
5. Download file HTML yang diberikan Google
6. Upload file tersebut ke root directory domain

#### **Metode 2: Meta Tag (Alternative)**
1. Dapatkan meta tag dari Google Search Console
2. Tambahkan ke `<head>` section di `src/app.html`

## 🚀 **Setup Step-by-Step**

### **Step 1: Siapkan File Verification**
```bash
# Untuk setiap domain, buat file verification
# Contoh untuk makankelantan.com:
google1234567890abcdef.html

# Upload ke:
https://makankelantan.com/google1234567890abcdef.html
```

### **Step 2: Verifikasi di Google Search Console**
1. **Login** ke Google Search Console
2. **Add Property** untuk setiap domain
3. **Pilih metode** HTML file upload
4. **Upload file** verification ke root domain
5. **Klik Verify** di Google Search Console

### **Step 3: Submit Sitemap**
Setelah verifikasi berhasil, submit sitemap untuk setiap domain:

```
# Sitemap URLs untuk setiap domain:
https://makankelantan.com/sitemap.xml
https://makankedah.com/sitemap.xml
https://makan-penang.com/sitemap.xml
https://makanperak.com/sitemap.xml
https://makanperlis.com/sitemap.xml
https://makanterengganu.com/sitemap.xml
https://makanpahang.com/sitemap.xml
https://makankualalumpur.com/sitemap.xml
https://makanselangor.com/sitemap.xml
https://makanjohor.com/sitemap.xml
https://makanmelaka.com/sitemap.xml
https://makannegerisembilan.com/sitemap.xml
https://makansabah.com/sitemap.xml
https://makansarawak.com/sitemap.xml
```

## 📊 **Monitoring & Analytics**

### **Key Metrics to Monitor:**
- **Coverage**: Halaman yang berhasil di-index
- **Performance**: CTR, Impressions, Position
- **Core Web Vitals**: LCP, FID, CLS
- **Mobile Usability**: Mobile-friendly issues

### **Recommended Actions:**
1. **Submit sitemap** untuk setiap domain
2. **Monitor indexing** status
3. **Check Core Web Vitals**
4. **Fix crawl errors** jika ada
5. **Monitor search performance**

## 🔧 **Technical Implementation**

### **Sitemap Generation:**
Sitemap sudah otomatis generate di:
- **Individual sitemaps**: `/{slug}/sitemap.xml`
- **Master sitemap**: `/sitemap.xml`

### **Robots.txt:**
Robots.txt sudah otomatis generate di:
- **Individual robots**: `/{slug}/robots.txt`
- **Global robots**: `/robots.txt`

### **SEO Meta Tags:**
Semua meta tags SEO sudah otomatis generate untuk:
- **Article pages**: Dynamic meta dari database
- **Category pages**: Dynamic meta berdasarkan kategori
- **Tag pages**: Dynamic meta berdasarkan tag
- **Homepage**: Dynamic meta berdasarkan website

## 📝 **Checklist Verifikasi**

### **Untuk Setiap Domain:**
- [ ] Domain ditambahkan ke Google Search Console
- [ ] File verification HTML diupload ke root domain
- [ ] Verifikasi berhasil di Google Search Console
- [ ] Sitemap disubmit ke Google Search Console
- [ ] Robots.txt accessible
- [ ] Meta tags SEO ter-generate dengan benar
- [ ] Core Web Vitals dalam batas normal

### **Total Checklist:**
- [ ] **14 domains** ditambahkan ke Google Search Console
- [ ] **14 verification files** diupload
- [ ] **14 sitemaps** disubmit
- [ ] **14 robots.txt** accessible

## 🎯 **Expected Results**

### **Setelah Setup:**
- **Indexing**: Google akan mulai crawl dan index semua halaman
- **Performance**: Data performance akan muncul dalam 1-2 hari
- **Coverage**: Report coverage akan menunjukkan status indexing
- **Search Console**: Full access ke semua fitur Google Search Console

### **Timeline:**
- **Verification**: Immediate (setelah upload file)
- **Initial indexing**: 1-7 days
- **Performance data**: 1-2 days
- **Full indexing**: 1-4 weeks

## 🚨 **Troubleshooting**

### **Common Issues:**
1. **File not found**: Pastikan file verification di root domain
2. **Verification failed**: Cek nama file dan path yang benar
3. **Sitemap not accessible**: Pastikan sitemap URL dapat diakses
4. **Slow indexing**: Normal untuk website baru, bisa sampai 4 minggu

### **Support:**
- **Google Search Console Help**: https://support.google.com/webmasters
- **Sitemap Testing**: Gunakan Google Search Console sitemap tester
- **URL Inspection**: Gunakan URL Inspection tool untuk test individual pages

---

## 📞 **Next Steps**

1. **Setup Google Search Console** untuk semua 14 domain
2. **Upload verification files** ke masing-masing domain
3. **Submit sitemaps** untuk setiap domain
4. **Monitor indexing progress** melalui Google Search Console
5. **Track performance metrics** dan optimize berdasarkan data

**Total waktu setup**: 2-3 jam untuk semua 14 domain
**Expected indexing time**: 1-4 minggu untuk full indexing
