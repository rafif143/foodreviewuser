# Setup Guide - Food Review Multi-tenant Blog

## Error yang Terjadi
Error `TypeError: fetch failed` terjadi karena:
1. **Supabase tidak dikonfigurasi** - Environment variables tidak ada
2. **Database belum dibuat** - Tabel websites dan articles belum ada
3. **Koneksi database gagal** - URL atau API key salah

## Solusi Cepat (Development Mode)

### 1. Buat File .env
Buat file `.env` di root project dengan isi:
```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Atau Gunakan Mode Offline
Aplikasi sudah dikonfigurasi untuk berjalan tanpa database dengan fallback data. Aplikasi akan:
- Menggunakan sample data untuk artikel
- Menggunakan fallback data untuk website
- Tetap menjalankan semua fitur SEO

## Setup Supabase (Recommended)

### 1. Buat Project Supabase
1. Kunjungi [supabase.com](https://supabase.com)
2. Buat project baru
3. Ambil URL dan API Key dari Settings > API

### 2. Setup Database Tables

#### Table: websites
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
) TABLESPACE pg_default;

create index IF not exists idx_websites_name on public.websites using btree (name) TABLESPACE pg_default;
create index IF not exists idx_websites_slug on public.websites using btree (slug) TABLESPACE pg_default;

create trigger update_websites_updated_at BEFORE
update on websites for EACH row
execute FUNCTION update_updated_at_column ();
```

#### Table: articles
```sql
create table public.articles (
  id uuid not null default extensions.uuid_generate_v4 (),
  website_id integer not null,
  title character varying(255) not null,
  slug character varying(255) not null,
  author character varying(100) not null,
  minute_read integer not null default 5,
  category character varying(50) not null,
  thumbnail_image character varying(500) not null,
  main_image character varying(500) null,
  summary text null,
  content jsonb not null,
  is_published boolean null default false,
  published_at timestamp with time zone null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  visit_count bigint null,
  tags text[] null default '{}'::text[],
  labels text[] null default '{}'::text[],
  constraint articles_pkey primary key (id),
  constraint articles_website_id_slug_key unique (website_id, slug),
  constraint articles_website_id_fkey foreign KEY (website_id) references websites (id)
) TABLESPACE pg_default;

create index IF not exists idx_articles_tags on public.articles using gin (tags) TABLESPACE pg_default;
create index IF not exists idx_articles_labels on public.articles using gin (labels) TABLESPACE pg_default;
```

#### Table: contact (optional)
```sql
create table public.contact (
  id bigint generated always as identity not null,
  website_id integer not null,
  social_media jsonb null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint contact_pkey primary key (id),
  constraint contact_website_id_fkey foreign KEY (website_id) references websites (id)
) TABLESPACE pg_default;
```

### 3. Insert Sample Data

#### Insert Websites
```sql
INSERT INTO websites (name, slug, description) VALUES
('Kelantan Food Review', 'kelantan', 'Panduan kuliner terbaik di Kelantan'),
('Kedah Food Review', 'kedah', 'Panduan kuliner terbaik di Kedah'),
('Penang Food Review', 'penang', 'Panduan kuliner terbaik di Penang'),
('Perak Food Review', 'perak', 'Panduan kuliner terbaik di Perak'),
('Perlis Food Review', 'perlis', 'Panduan kuliner terbaik di Perlis'),
('Terengganu Food Review', 'terengganu', 'Panduan kuliner terbaik di Terengganu'),
('Pahang Food Review', 'pahang', 'Panduan kuliner terbaik di Pahang'),
('Kuala Lumpur Food Review', 'kualalumpur', 'Panduan kuliner terbaik di Kuala Lumpur'),
('Selangor Food Review', 'selangor', 'Panduan kuliner terbaik di Selangor'),
('Johor Food Review', 'johor', 'Panduan kuliner terbaik di Johor'),
('Melaka Food Review', 'melaka', 'Panduan kuliner terbaik di Melaka'),
('Negeri Sembilan Food Review', 'negerisembilan', 'Panduan kuliner terbaik di Negeri Sembilan'),
('Sabah Food Review', 'sabah', 'Panduan kuliner terbaik di Sabah'),
('Sarawak Food Review', 'sarawak', 'Panduan kuliner terbaik di Sarawak');
```

#### Insert Sample Articles
```sql
INSERT INTO articles (website_id, title, slug, author, category, thumbnail_image, summary, content, is_published, published_at) VALUES
(1, 'Nasi Kerabu Terbaik di Kota Bharu', 'nasi-kerabu-terbaik-kota-bharu', 'Ahmad Rahman', 'food', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=500&fit=crop', 'Temukan nasi kerabu terbaik di Kota Bharu dengan rasa autentik dan harga terjangkau.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Nasi kerabu adalah makanan tradisional Kelantan yang sangat populer."}]}]}', true, now()),
(1, 'Ayam Percik Kelantan', 'ayam-percik-kelantan', 'Siti Aminah', 'food', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=500&fit=crop', 'Resep ayam percik Kelantan yang autentik dan lezat.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Ayam percik adalah hidangan khas Kelantan yang wajib dicoba."}]}]}', true, now());
```

## Testing

### 1. Jalankan Aplikasi
```bash
npm run dev
```

### 2. Test SEO Features

#### Option A: Test di Browser (Recommended)
- Akses: `http://localhost:5173/test-seo`
- Interactive test page dengan hasil real-time

#### Option B: Test dengan Node.js
```bash
node test-seo-node.js
```

#### Option C: Test dengan SvelteKit (jika ada error)
```bash
npm run dev
# Kemudian akses test page di browser
```

### 3. Akses Halaman
- **Homepage**: `http://localhost:5173/kelantan`
- **Artikel**: `http://localhost:5173/kelantan/article/nasi-kerabu-terbaik-kota-bharu`
- **Sitemap**: `http://localhost:5173/kelantan/sitemap.xml`
- **Robots**: `http://localhost:5173/kelantan/robots.txt`
- **SEO Test**: `http://localhost:5173/test-seo`

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Pastikan file `.env` ada di root project
- Cek apakah `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` sudah benar

### Error: "Database error fetching website"
- Cek koneksi internet
- Verifikasi URL Supabase
- Pastikan API key valid
- Cek apakah tabel sudah dibuat

### Error: "No website found with slug"
- Pastikan data website sudah di-insert ke database
- Atau aplikasi akan menggunakan fallback data

### Aplikasi Tidak Load
- Restart development server: `npm run dev`
- Clear browser cache
- Check console untuk error messages

## Production Deployment

### 1. Environment Variables
Set di hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 2. Build Project
```bash
npm run build
```

### 3. Deploy
Upload folder `build/` ke hosting platform

## Features yang Tersedia

✅ **SEO Complete**
- Dynamic meta tags
- Open Graph & Twitter Cards
- Structured data (JSON-LD)
- Sitemap XML
- Robots.txt
- Canonical URLs

✅ **Multi-tenant Ready**
- 14 website domains
- Per-website SEO data
- Individual sitemaps
- Fallback data system

✅ **Database Integration**
- Supabase integration
- Fallback mode (no database needed)
- Sample data for testing

✅ **Performance Optimized**
- Caching system
- Optimized queries
- Error handling
