# 🎨 Dynamic Favicon System

Sistem favicon dinamis untuk multi-tenant food review websites yang menggunakan `logo_url` dari database.

## 📋 **Overview**

Setiap website dalam network akan memiliki favicon yang unik berdasarkan `logo_url` yang disimpan di tabel `websites`.

## 🏗️ **Architecture**

### **Database Schema**
```sql
CREATE TABLE public.websites (
  id bigint generated always as identity not null,
  name character varying(255) not null,
  slug character varying(255) not null,
  description text null,
  logo_url character varying(500) null,  -- ← Favicon source
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint websites_pkey primary key (id),
  constraint websites_name_key unique (name),
  constraint websites_slug_key unique (slug)
);
```

### **File Structure**
```
src/routes/[slug]/
├── favicon.ico/+server.js          # Dynamic favicon endpoint
├── apple-touch-icon.png/+server.js # Apple touch icon endpoint
└── +layout.svelte                  # Favicon management
```

## 🔄 **How It Works**

### **1. Dynamic Favicon Endpoints**
- **URL**: `/{slug}/favicon.ico`
- **Function**: Serve favicon berdasarkan `logo_url` dari database
- **Fallback**: Default favicon jika tidak ada `logo_url`

### **2. Apple Touch Icon**
- **URL**: `/{slug}/apple-touch-icon.png`
- **Function**: Same as favicon, untuk iOS devices
- **Fallback**: Default favicon

### **3. Client-Side Updates**
- Update favicon link di `<head>` saat page load
- Update Open Graph image jika ada logo
- Update Twitter Card image

## 📱 **URL Examples**

### **Favicon URLs**
```
https://makankelantan.com/kelantan/favicon.ico
https://makankedah.com/kedah/favicon.ico
https://makan-penang.com/penang/favicon.ico
```

### **Apple Touch Icon URLs**
```
https://makankelantan.com/kelantan/apple-touch-icon.png
https://makankedah.com/kedah/apple-touch-icon.png
https://makan-penang.com/penang/apple-touch-icon.png
```

## 🎯 **Implementation Details**

### **Server-Side (Endpoints)**
```javascript
// src/routes/[slug]/favicon.ico/+server.js
export async function GET({ params }) {
  const website = await getWebsiteBySlug(params.slug);
  
  if (website.logo_url) {
    // Redirect ke logo_url
    return new Response(null, {
      status: 302,
      headers: { 'Location': website.logo_url }
    });
  }
  
  // Fallback ke default favicon
  return new Response(null, {
    status: 302,
    headers: { 'Location': '/favicon.svg' }
  });
}
```

### **Client-Side (Layout)**
```javascript
// src/routes/[slug]/+layout.svelte
function updateFavicon() {
  const faviconLink = document.querySelector('link[rel="icon"]');
  faviconLink.href = `/${website.slug}/favicon.ico`;
  
  const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
  appleTouchIcon.href = `/${website.slug}/apple-touch-icon.png`;
}
```

## 🗄️ **Database Setup**

### **1. Update Logo URLs**
```sql
-- Jalankan script database/update_website_logos.sql
UPDATE public.websites 
SET logo_url = 'https://example.com/logo-kelantan.png'
WHERE slug = 'kelantan';
```

### **2. Verifikasi Data**
```sql
SELECT id, name, slug, logo_url 
FROM public.websites 
WHERE logo_url IS NOT NULL
ORDER BY id;
```

## 🔧 **Configuration**

### **Logo URL Requirements**
- **Format**: URL yang valid (https://)
- **Size**: Recommended 200x200px atau lebih
- **Format**: PNG, JPG, SVG
- **Accessibility**: Public accessible

### **Fallback Behavior**
- Jika `logo_url` NULL → Default favicon
- Jika `logo_url` invalid → Default favicon
- Jika database error → Default favicon

## 📊 **Benefits**

### **1. Brand Identity**
- ✅ Setiap website punya favicon unik
- ✅ Consistent dengan brand masing-masing
- ✅ Professional appearance

### **2. SEO Benefits**
- ✅ Favicon di search results
- ✅ Apple touch icon untuk mobile
- ✅ Open Graph image integration

### **3. User Experience**
- ✅ Visual branding di browser tabs
- ✅ Bookmark recognition
- ✅ Mobile home screen icons

## 🚀 **Deployment**

### **1. Database Setup**
```bash
# Jalankan SQL script
psql -d your_database -f database/update_website_logos.sql
```

### **2. Test Favicons**
```bash
# Test setiap website
curl -I https://makankelantan.com/kelantan/favicon.ico
curl -I https://makankedah.com/kedah/favicon.ico
```

### **3. Browser Testing**
- Open setiap website di browser
- Check favicon di tab
- Test bookmark functionality
- Test mobile home screen icon

## 🎨 **Customization**

### **Adding New Website**
```sql
INSERT INTO public.websites (name, slug, description, logo_url)
VALUES ('New Website', 'newwebsite', 'Description', 'https://example.com/logo.png');
```

### **Updating Logo**
```sql
UPDATE public.websites 
SET logo_url = 'https://new-logo-url.com/logo.png'
WHERE slug = 'website-slug';
```

## 🔍 **Troubleshooting**

### **Common Issues**
1. **Favicon not showing**: Check `logo_url` accessibility
2. **404 error**: Verify website slug exists
3. **Caching issues**: Clear browser cache
4. **Slow loading**: Optimize logo image size

### **Debug Commands**
```bash
# Check favicon endpoint
curl -v https://makankelantan.com/kelantan/favicon.ico

# Check database data
SELECT slug, logo_url FROM websites WHERE slug = 'kelantan';
```

## 📈 **Performance**

### **Caching Strategy**
- **Server**: 24 hour cache untuk favicon
- **Browser**: Respects cache headers
- **CDN**: Logo URLs bisa di-cache di CDN

### **Optimization Tips**
- Use optimized logo images (200x200px)
- Consider using WebP format
- Implement proper cache headers
- Use CDN for logo hosting

**Sistem favicon dinamis sudah siap dan akan memberikan brand identity yang unik untuk setiap website!** 🎉
