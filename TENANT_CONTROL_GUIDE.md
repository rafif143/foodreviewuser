# 🎯 Tenant Control System - Panduan Lengkap

## 🚀 Cara Menggunakan

### **UBAH TENANT CUKUP GANTI 1 ANGKA!**

Di file `src/lib/tenant.js`, ubah angka ini:

```javascript
// UBAH ANGKA INI UNTUK GANTI SEMUA KONFIGURASI
export const DEFAULT_WEBSITE_ID = 14; // ← GANTI ANGKA INI
```

**Contoh:**
- `= 1` → MakanKelantan 
- `= 14` → MakanSarawak
- `= 2` → MakanKedah

## ✨ Yang Otomatis Berubah

Ketika ganti angka tenant, **SEMUA INI OTOMATIS GANTI**:

### 📱 **App.html (Meta Tags)**
- Title: "MakanSarawak - Panduan Kuliner Terbaik di Sarawak"
- Description, Keywords, Author
- Open Graph tags (Facebook sharing)
- Twitter Card tags
- Geo location (region, coordinates)
- Theme color

### 🏠 **Homepage (+page.js)**
- Website name, slug, description
- SEO data lengkap

### 🗄️ **Database Fallback**
- Website data untuk semua routing
- Error handling dengan nama yang benar

### 📍 **Routing**
- Slug website otomatis sesuai tenant
- Error page dengan nama website yang benar

## 🛠️ Konfigurasi Tenant

### **Struktur Konfigurasi:**

```javascript
TENANT_CONFIG = {
  1: {
    // Basic Info
    id: 1,
    name: "MakanKelantan", 
    slug: "kelantan",
    description: "Panduan kuliner terbaik di Kelantan...",
    
    // SEO Config
    seo: {
      title: "MakanKelantan - Panduan Kuliner Terbaik di Kelantan",
      keywords: "makan kelantan, restoran kelantan...",
      author: "MakanKelantan Team",
      themeColor: "#dc2626",
      twitterSite: "@MakanKelantan",
      ogImage: "https://images.unsplash.com/..."
    },
    
    // Location Config  
    location: {
      region: "MY-03",
      placename: "Kelantan", 
      coordinates: "6.1254;102.2386",
      icbm: "6.1254, 102.2386"
    },
    
    // Domain Config
    domain: "https://makankelantan.com"
  }
}
```

## 🎮 Testing

### **1. Test Ganti Tenant:**
```bash
# 1. Edit src/lib/tenant.js
# 2. Ganti DEFAULT_WEBSITE_ID = 1 (untuk Kelantan)
# 3. Jalankan: npm run dev
# 4. Buka browser console, lihat: "🎯 Current Tenant: ..."
# 5. Check page title, meta tags berubah otomatis
```

### **2. Test Routing:**
```bash
# Dengan tenant = 1 (Kelantan):
http://localhost:5173/kelantan/food
http://localhost:5173/kelantan/article/test

# Dengan tenant = 14 (Sarawak):  
http://localhost:5173/sarawak/food
http://localhost:5173/sarawak/article/test
```

### **3. Test Meta Tags:**
```javascript
// Buka browser console:
console.log(document.title); // Harus sesuai tenant
console.log(document.querySelector('meta[name="description"]').content);
```

## 📁 File yang Terpengaruh

### **Core Files:**
- `src/lib/tenant.js` - **KONFIGURASI UTAMA**
- `src/lib/app-config.js` - Dynamic meta tags
- `src/app.html` - Template HTML utama
- `src/routes/+page.js` - Homepage loader

### **Auto-Updated:**
- Semua routing `[slug]/*`
- Error pages
- SEO components
- Database fallback

## 🚨 Troubleshooting

### **Meta Tags Tidak Update:**
```bash
# Check browser console untuk error
# Pastikan app-config.js ter-import dengan benar
# Clear browser cache
```

### **Routing Error:**
```bash
# Pastikan slug di TENANT_CONFIG sesuai dengan URL
# Check fallback data di getWebsiteBySlug()
```

### **Database Error:**
```bash
# Fallback config akan otomatis aktif
# Check console untuk "using fallback data"
```

## 💡 Menambah Tenant Baru

1. **Tambah di TENANT_CONFIG:**
```javascript
3: {
  id: 3,
  name: "MakanPenang",
  slug: "penang", 
  // ... config lengkap
}
```

2. **Set sebagai default:**
```javascript
export const DEFAULT_WEBSITE_ID = 3;
```

3. **Test dan deploy!**

---

## 🎉 Keuntungan System Ini:

✅ **Satu file kontrol semua** - Ganti 1 angka, semua berubah  
✅ **SEO otomatis** - Meta tags, Open Graph, Twitter Card  
✅ **Routing dinamis** - Slug dan error handling otomatis  
✅ **Fallback robust** - Tidak crash jika database error  
✅ **Easy maintenance** - Semua config terpusat  
✅ **Development friendly** - Console log untuk debugging  

**🚀 READY TO USE! Ganti angka di DEFAULT_WEBSITE_ID dan semua otomatis!**
