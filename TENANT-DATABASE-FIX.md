# 🔧 Tenant Database Integration Fix

## ✅ Masalah yang Diperbaiki

**Masalah:** `DEFAULT_WEBSITE` hardcode dan undefined, perlu ambil data detail dari database tabel `websites`.

**Solusi:** Tetap hardcode ID website di `tenant.js` tapi ambil data detail (nama, slug, dll) dari database.

## ✅ Perubahan yang Diterapkan

### **1. Update tenant.js**

**SEBELUM:**
```javascript
export const DEFAULT_WEBSITE = {
  id: 1
};
```

**SESUDAH:**
```javascript
export const DEFAULT_WEBSITE_ID = 1;

// Fungsi untuk ambil data dari database
export async function getWebsiteById(id = DEFAULT_WEBSITE_ID) {
  // Query ke tabel websites
  const { data, error } = await supabase
    .from('websites')
    .select('*')
    .eq('id', id)
    .single();
  
  return data;
}
```

### **2. Database Schema**

```sql
create table public.websites (
  id bigint generated always as identity not null,
  name character varying(255) not null,
  slug character varying(255) not null,
  description text null,
  logo_url character varying(500) null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint websites_pkey primary key (id),
  constraint websites_name_key unique (name),
  constraint websites_slug_key unique (slug)
);
```

### **3. Fungsi-fungsi Baru**

- ✅ `getWebsiteById(id)` - Ambil data website berdasarkan ID
- ✅ `getWebsiteBySlug(slug)` - Ambil data website berdasarkan slug
- ✅ `getAllWebsites()` - Ambil semua website
- ✅ Cache system untuk performa optimal

### **4. Update File yang Menggunakan DEFAULT_WEBSITE**

- ✅ `src/routes/+page.svelte` - Menggunakan `DEFAULT_WEBSITE_ID`
- ✅ `src/routes/+page.js` - Menggunakan `getWebsiteById()`
- ✅ `src/lib/components/AboutKelantanCard.svelte` - Menggunakan `DEFAULT_WEBSITE_ID`

## 🎯 Konsep Multi-Tenant

### **Hardcode ID Website:**
```javascript
// Di tenant.js - tetap hardcode
export const DEFAULT_WEBSITE_ID = 1; // Kelantan
// export const DEFAULT_WEBSITE_ID = 2; // Johor
// export const DEFAULT_WEBSITE_ID = 3; // Selangor
```

### **Data Detail dari Database:**
```javascript
// Data diambil dari tabel websites
{
  id: 1,
  name: "Kelantan Food Review",
  slug: "kelantan",
  description: "Panduan kuliner terbaik di Kelantan",
  logo_url: "https://example.com/logo.png"
}
```

## 🚀 Cara Menggunakan

### **1. Setup Database:**
```sql
-- Insert data website
INSERT INTO websites (name, slug, description) VALUES 
('Kelantan Food Review', 'kelantan', 'Panduan kuliner terbaik di Kelantan'),
('Johor Food Guide', 'johor', 'Panduan kuliner terbaik di Johor'),
('Selangor Food Hub', 'selangor', 'Panduan kuliner terbaik di Selangor');
```

### **2. Ganti Website ID:**
```javascript
// Di tenant.js - ganti ID untuk website yang berbeda
export const DEFAULT_WEBSITE_ID = 2; // Untuk Johor
```

### **3. Data Otomatis Ter-update:**
- Nama website: Dari database
- Slug URL: Dari database  
- Description: Dari database
- Logo: Dari database

## 📊 Status Perbaikan

- ✅ **tenant.js:** Sudah terintegrasi dengan database
- ✅ **Cache system:** Untuk performa optimal
- ✅ **Fallback:** Jika database error, gunakan data default
- ✅ **Multi-tenant:** Siap untuk multiple website
- ✅ **Backward compatible:** Tidak merusak kode yang ada

## 🎯 Hasil yang Diharapkan

**Website ID 1 (Kelantan):**
- URL: `/kelantan/...`
- Nama: "Kelantan Food Review"
- Description: Dari database

**Website ID 2 (Johor):**
- URL: `/johor/...`
- Nama: "Johor Food Guide"  
- Description: Dari database

**Website ID 3 (Selangor):**
- URL: `/selangor/...`
- Nama: "Selangor Food Hub"
- Description: Dari database

**Status:** ✅ **COMPLETED** - Tenant system sudah terintegrasi dengan database!
