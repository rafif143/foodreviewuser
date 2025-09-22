#!/usr/bin/env node

/**
 * Debug script untuk tenant switching
 */

import { DEFAULT_WEBSITE_ID, getCurrentTenantConfig, TENANT_CONFIG } from './src/lib/tenant.js';

console.log('🔍 TENANT DEBUG SCRIPT\n');

console.log('📊 CURRENT CONFIG:');
console.log(`DEFAULT_WEBSITE_ID: ${DEFAULT_WEBSITE_ID}`);

const currentConfig = getCurrentTenantConfig();
console.log('\n🎯 CURRENT TENANT:');
console.log(`ID: ${currentConfig.id}`);
console.log(`Name: ${currentConfig.name}`);
console.log(`Slug: ${currentConfig.slug}`);
console.log(`Domain: ${currentConfig.domain}`);

console.log('\n📋 AVAILABLE TENANTS:');
Object.values(TENANT_CONFIG).forEach(config => {
  const marker = config.id === DEFAULT_WEBSITE_ID ? ' ← CURRENT' : '';
  console.log(`  ID ${config.id}: ${config.name} (${config.slug})${marker}`);
});

console.log('\n🌐 CORRECT URLS TO TEST:');
console.log(`Homepage: http://localhost:5173/${currentConfig.slug}`);
console.log(`Food: http://localhost:5173/${currentConfig.slug}/food`);
console.log(`Article: http://localhost:5173/${currentConfig.slug}/article/test`);

console.log('\n⚠️  WRONG URLS (akan redirect/fallback):');
Object.values(TENANT_CONFIG).forEach(config => {
  if (config.id !== DEFAULT_WEBSITE_ID) {
    console.log(`  http://localhost:5173/${config.slug}/food → Will fallback to current tenant`);
  }
});

console.log('\n🧪 TESTING STEPS:');
console.log('1. npm run dev');
console.log(`2. Buka: http://localhost:5173/${currentConfig.slug}/food`);
console.log('3. Check browser console untuk "🎯 Current Tenant"');
console.log('4. Check document.title harus berisi "' + currentConfig.name + '"');
console.log('5. Test URL yang salah untuk lihat fallback');

console.log('\n💡 JIKA MASIH SALAH:');
console.log('- Clear browser cache dan cookies');
console.log('- Check Network tab di DevTools');
console.log('- Pastikan mengakses URL dengan slug yang benar');
console.log('- Check console untuk error messages');
