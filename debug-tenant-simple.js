#!/usr/bin/env node

/**
 * Simple debug script untuk tenant switching
 */

console.log('🔍 TENANT DEBUG - SIMPLE VERSION\n');

console.log('📊 EXPECTED BEHAVIOR:');
console.log('DEFAULT_WEBSITE_ID = 2 (MakanKedah)\n');

console.log('🎯 YANG HARUS TERJADI:');
console.log('✅ Title: "MakanKedah - Panduan Kuliner Terbaik di Kedah"');
console.log('✅ Meta description: "...Kedah..."');
console.log('✅ Console log: "🎯 Current Tenant: { id: 2, name: MakanKedah, slug: kedah }"');
console.log('✅ URL routing: /kedah/food, /kedah/article/test\n');

console.log('🧪 TESTING STEPS:');
console.log('1. npm run dev');
console.log('2. Buka: http://localhost:5173/kedah/food');
console.log('3. F12 → Console → Lihat "🎯 Current Tenant"');
console.log('4. Console → ketik: document.title');
console.log('5. Console → ketik: document.querySelector(\'meta[name="description"]\').content\n');

console.log('⚠️  JIKA MASIH SALAH:');
console.log('- Coba akses: http://localhost:5173/kedah (bukan /sarawak)');
console.log('- Clear browser cache (Ctrl+Shift+R)');
console.log('- Check apakah masih ada cache dari tenant sebelumnya');
console.log('- Restart dev server (Ctrl+C → npm run dev)\n');

console.log('🔧 DEBUG DI BROWSER:');
console.log('Console commands untuk debug:');
console.log('- document.title');
console.log('- document.querySelector(\'meta[name="description"]\').content');
console.log('- window.location.href');
console.log('- localStorage.clear() // clear cache\n');

console.log('🚨 KEMUNGKINAN MASALAH:');
console.log('1. Masih mengakses URL /sarawak instead of /kedah');
console.log('2. Browser cache masih menyimpan data lama');
console.log('3. Dev server perlu restart');
console.log('4. Import path error di app-config.js\n');

console.log('💡 SOLUSI CEPAT:');
console.log('1. Restart: Ctrl+C → npm run dev');
console.log('2. Clear cache: Ctrl+Shift+R');
console.log('3. Akses: http://localhost:5173/kedah/food');
console.log('4. Check console log');
