# Deployment ke Netlify

Proyek ini sudah dikonfigurasi untuk deployment ke Netlify menggunakan `@sveltejs/adapter-netlify`.

## File Konfigurasi

### 1. `svelte.config.js`
```javascript
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;
```

### 2. `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"
```

### 3. `_redirects` (di root project)
```
/*    /index.html   200
```

## Langkah Deployment

1. **Push ke Git Repository**
   ```bash
   git add .
   git commit -m "Configure for Netlify deployment"
   git push origin main
   ```

2. **Deploy ke Netlify**
   - Buka [netlify.com](https://netlify.com)
   - Login atau daftar akun
   - Klik "New site from Git"
   - Pilih repository Anda
   - Konfigurasi build:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Klik "Deploy site"

## Environment Variables

Jika aplikasi menggunakan environment variables, tambahkan di Netlify:
1. Buka site settings di Netlify
2. Pilih "Environment variables"
3. Tambahkan variable yang diperlukan

## Build Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Troubleshooting

Jika ada masalah dengan deployment:

1. **Periksa build logs** di Netlify dashboard
2. **Test build lokal**: `npm run build`
3. **Periksa file konfigurasi** (`netlify.toml`, `_redirects`)
4. **Pastikan Node.js version** sesuai (18.x)

## Catatan

- File `_redirects` harus berada di root project, bukan di folder `static`
- Redirects tidak didukung di `netlify.toml`, gunakan file `_redirects` sebagai gantinya
- Build output akan berada di folder `build/`
