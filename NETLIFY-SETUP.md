# 🚀 Netlify Setup Guide

## 📋 Overview
Setup Netlify untuk deploy website Kelantan Food Review dengan sitemap otomatis.

## 🔧 Configuration

### **1. `netlify.toml` (Sudah di-update)**
```toml
[build]
  command = "npm run build-with-sitemap"
  publish = "build"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--legacy-peer-deps"
  # Supabase environment variables (set these in Netlify dashboard)
  # VITE_SUPABASE_URL = "your-supabase-url"
  # VITE_SUPABASE_ANON_KEY = "your-supabase-anon-key"
```

### **2. Build Command**
- ✅ **Changed** dari `npm run build` ke `npm run build-with-sitemap`
- ✅ **Generate sitemap** dari database sebelum build
- ✅ **Include sitemap terbaru** di build

## 🌐 Environment Variables

### **A. Set di Netlify Dashboard:**
1. ✅ **Login** ke Netlify Dashboard
2. ✅ **Go to** Site Settings → Environment Variables
3. ✅ **Add variables:**

```bash
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key-here
```

### **B. Supabase Setup:**
```bash
# 1. Go to Supabase Dashboard
# 2. Copy Project URL
# 3. Copy Anon Key
# 4. Add to Netlify Environment Variables
```

## 🚀 Deploy Process

### **A. Automatic Deploy:**
```bash
# 1. Push ke GitHub
git add .
git commit -m "Update sitemap configuration"
git push origin main

# 2. Netlify auto-deploy dengan:
npm run build-with-sitemap
```

### **B. Manual Deploy:**
```bash
# 1. Build locally
npm run build-with-sitemap

# 2. Deploy to Netlify
# (atau drag & drop build folder)
```

## 📊 Build Output

### **Expected Build Log:**
```bash
🚀 Generating sitemap for Kelantan Food Review
📝 Adding 15 articles to sitemap
🍽️ Adding 8 restaurants to sitemap
🏷️ Adding 12 tag pages to sitemap
✅ Sitemap generated successfully!
📁 Saved to: /path/to/static/sitemap.xml
🌐 URL: https://foodreviewuser.netlify.app/sitemap.xml
📊 Total URLs: 35

> vite build
✓ 45 modules transformed.
✓ built in 2.3s
✓ Generated build/ directory
```

## 🔍 Verification

### **A. Check Sitemap:**
```bash
# After deploy, check:
https://foodreviewuser.netlify.app/sitemap.xml
```

### **B. Check Robots.txt:**
```bash
# After deploy, check:
https://foodreviewuser.netlify.app/robots.txt
```

### **C. Check Build Log:**
```bash
# In Netlify Dashboard → Deploys → Build Log
# Should show sitemap generation
```

## ⚠️ Troubleshooting

### **A. Build Fails:**
```bash
# Check environment variables
# Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set

# Check Supabase connection
# Make sure database is accessible
```

### **B. Sitemap Not Generated:**
```bash
# Check database connection
# Make sure articles table exists
# Check website_id in database
```

### **C. Environment Variables:**
```bash
# Make sure variables are set in Netlify Dashboard
# Not in netlify.toml (commented out)
# Use Netlify UI for security
```

## 📈 SEO Benefits

### **A. Automatic Updates:**
- ✅ **Sitemap updated** setiap deploy
- ✅ **New articles** otomatis masuk sitemap
- ✅ **Fresh content** untuk search engines

### **B. Search Engine Optimization:**
- ✅ **Faster indexing** dengan sitemap
- ✅ **Better crawling** efficiency
- ✅ **Priority guidance** untuk Google

## 🎯 Next Steps

### **1. Deploy:**
```bash
# Push changes to trigger deploy
git add .
git commit -m "Setup Netlify with sitemap generation"
git push origin main
```

### **2. Verify:**
```bash
# Check sitemap after deploy
https://foodreviewuser.netlify.app/sitemap.xml

# Check robots.txt
https://foodreviewuser.netlify.app/robots.txt
```

### **3. Submit to Google:**
```bash
# 1. Go to Google Search Console
# 2. Add property: foodreviewuser.netlify.app
# 3. Submit sitemap: /sitemap.xml
```

## 🔄 Maintenance

### **A. Regular Updates:**
```bash
# Every time you add new articles:
# 1. Add to database
# 2. Push to GitHub
# 3. Netlify auto-deploy with fresh sitemap
```

### **B. Monitor:**
```bash
# Check Netlify build logs
# Monitor sitemap generation
# Verify SEO performance
```

---

**Netlify sudah siap untuk deploy dengan sitemap otomatis! 🚀**

**Build Command: `npm run build-with-sitemap`**
