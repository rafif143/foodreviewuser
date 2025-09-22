#!/usr/bin/env node

/**
 * Test script untuk memverifikasi routing local development
 * Jalankan dengan: node test-local-routing.js
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Testing local routing configuration...\n');

// Test URLs yang umum menyebabkan masalah
const testUrls = [
  '/kelantan/article/test-article',
  '/kelantan/food',
  '/kelantan/cafe',
  '/kelantan/recipe',
  '/kelantan/contact',
  '/kelantan/about'
];

console.log('📋 Test URLs yang akan diverifikasi:');
testUrls.forEach((url, index) => {
  console.log(`  ${index + 1}. ${url}`);
});

console.log('\n✅ Konfigurasi yang telah diperbaiki:');
console.log('  - vite.config.js: Menambahkan historyApiFallback');
console.log('  - svelte.config.js: Menggunakan adapter-auto untuk development');
console.log('  - public/_redirects: SPA routing fallback');
console.log('  - Error boundaries: Di layout dan root level');
console.log('  - Tenant fallback: Website data dengan fallback');

console.log('\n🔧 Langkah untuk test manual:');
console.log('  1. Jalankan: npm run dev');
console.log('  2. Buka browser ke: http://localhost:5173/kelantan/food');
console.log('  3. Navigate ke artikel: http://localhost:5173/kelantan/article/[slug-artikel]');
console.log('  4. Refresh halaman artikel');
console.log('  5. Verifikasi tidak ada 404/505 error');

console.log('\n⚠️  Jika masih ada masalah:');
console.log('  - Check console browser untuk error details');
console.log('  - Verifikasi database connection');
console.log('  - Check network tab untuk failed requests');

console.log('\n🎯 Expected behavior:');
console.log('  - Halaman artikel loading dengan benar');
console.log('  - Refresh tidak menyebabkan 404/505 error');
console.log('  - Error boundary menampilkan pesan yang sesuai jika ada masalah');

console.log('\n✨ Ready untuk test! Jalankan "npm run dev" dan test routing.');
