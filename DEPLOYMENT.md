# Deployment ke Netlify

Proyek ini sudah dikonfigurasi untuk deployment ke Netlify menggunakan `@sveltejs/adapter-netlify`.

## File Konfigurasi

### 1. `svelte.config.js`
```javascript
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			edge: false,
			split: false
		})
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
  NODE_VERSION = "20"
```

### 3. `_redirects` (di root project)
```
/*    /.netlify/functions/entry    200
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
4. **Pastikan Node.js version** sesuai (20.x)

### Error Node.js Version

Jika Anda mendapatkan error seperti:
```
npm error engine Unsupported engine
npm error engine Not compatible with your version of node/npm: @sveltejs/vite-plugin-svelte@6.1.1
npm error notsup Required: {"node":"^20.19 || ^22.12 || >=24"}
npm error notsup Actual:   {"npm":"10.8.2","node":"v18.20.8"}
```

**Solusi**: Pastikan `netlify.toml` menggunakan Node.js versi 20:
```toml
[build.environment]
  NODE_VERSION = "20"
```

### Error "Page not found"

Jika Anda mendapatkan error "Page not found" setelah deployment:

**Solusi**: Pastikan file `_redirects` menggunakan format yang benar untuk SvelteKit:
```
/*    /.netlify/functions/entry    200
```

Dan konfigurasi adapter di `svelte.config.js`:
```javascript
adapter: adapter({
  edge: false,
  split: false
})
```

## Catatan

- File `_redirects` harus berada di root project, bukan di folder `static`
- Redirects tidak didukung di `netlify.toml`, gunakan file `_redirects` sebagai gantinya
- Build output akan berada di folder `build/`
