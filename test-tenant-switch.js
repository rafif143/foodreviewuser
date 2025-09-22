#!/usr/bin/env node

/**
 * Test Script untuk Tenant Switching System
 * Jalankan dengan: node test-tenant-switch.js
 */

console.log('🎯 TENANT CONTROL SYSTEM - TEST SCRIPT\n');

console.log('📋 CARA MENGGUNAKAN:');
console.log('1. Edit file: src/lib/tenant.js');
console.log('2. Ganti: export const DEFAULT_WEBSITE_ID = [ANGKA]');
console.log('3. Jalankan: npm run dev');
console.log('4. Semua konfigurasi otomatis berubah!\n');

console.log('🎮 TENANT TERSEDIA:');
console.log('  ID 1  → MakanKelantan (kelantan)');
console.log('  ID 14 → MakanSarawak (sarawak)  ← CURRENT DEFAULT');
console.log('  ID 2  → MakanKedah (kedah)');
console.log('  ID 3  → MakanPenang (penang) - Perlu ditambah config\n');

console.log('✨ YANG OTOMATIS BERUBAH:');
console.log('  ✅ App.html meta tags (title, description, keywords)');
console.log('  ✅ Open Graph tags (Facebook sharing)');
console.log('  ✅ Twitter Card tags');
console.log('  ✅ Geo location tags');
console.log('  ✅ Homepage data (+page.js)');
console.log('  ✅ Database fallback');
console.log('  ✅ Error pages');
console.log('  ✅ Routing slug\n');

console.log('🧪 TEST STEPS:');
console.log('1. npm run dev');
console.log('2. Buka browser console');
console.log('3. Lihat log: "🎯 Current Tenant: ..."');
console.log('4. Check document.title di console');
console.log('5. Test routing: /[slug]/food, /[slug]/article/test');
console.log('6. Ganti DEFAULT_WEBSITE_ID ke angka lain');
console.log('7. Refresh browser, semua berubah otomatis!\n');

console.log('🔧 DEBUGGING:');
console.log('- Browser console: Lihat "🎯 Current Tenant"');
console.log('- Network tab: Check meta tags di HTML source');
console.log('- Test routing dengan slug yang berbeda');
console.log('- Check error pages dengan URL yang salah\n');

console.log('📁 FILE PENTING:');
console.log('- src/lib/tenant.js ← KONFIGURASI UTAMA');
console.log('- src/lib/app-config.js ← Dynamic meta tags');
console.log('- src/app.html ← Template HTML');
console.log('- src/routes/+page.js ← Homepage loader\n');

console.log('🚨 TROUBLESHOOTING:');
console.log('- Meta tags tidak update → Clear browser cache');
console.log('- Routing error → Check slug di TENANT_CONFIG');
console.log('- Import error → Check file path di app.html\n');

console.log('🎉 READY! Ganti angka di DEFAULT_WEBSITE_ID dan test!');
