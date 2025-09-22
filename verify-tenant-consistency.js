#!/usr/bin/env node

/**
 * Script untuk verify tenant consistency antara tenant.js dan app.html
 */

import fs from 'fs';

console.log('🔍 VERIFYING TENANT CONSISTENCY...\n');

// Read tenant.js
const tenantContent = fs.readFileSync('./src/lib/tenant.js', 'utf8');

// Read app.html
const appHtmlContent = fs.readFileSync('./src/app.html', 'utf8');

// Extract tenant IDs from TENANT_CONFIG
const tenantConfigMatch = tenantContent.match(/export const TENANT_CONFIG = \{([\s\S]*?)\};/);
if (!tenantConfigMatch) {
  console.error('❌ Could not find TENANT_CONFIG in tenant.js');
  process.exit(1);
}

const configContent = tenantConfigMatch[1];
const tenantIds = [...configContent.matchAll(/(\d+): \{/g)].map(match => parseInt(match[1]));

console.log('📋 TENANT IDs FOUND IN TENANT_CONFIG:');
tenantIds.sort((a, b) => a - b).forEach(id => {
  console.log(`  ✅ ID ${id}`);
});

// Extract tenant IDs from app.html configs
const appConfigMatch = appHtmlContent.match(/const configs = \{([\s\S]*?)\};/);
if (!appConfigMatch) {
  console.error('❌ Could not find configs in app.html');
  process.exit(1);
}

const appConfigContent = appConfigMatch[1];
const appTenantIds = [...appConfigContent.matchAll(/(\d+): \{/g)].map(match => parseInt(match[1]));

console.log('\n📋 TENANT IDs FOUND IN APP.HTML:');
appTenantIds.sort((a, b) => a - b).forEach(id => {
  console.log(`  ✅ ID ${id}`);
});

// Compare
const missingInApp = tenantIds.filter(id => !appTenantIds.includes(id));
const missingInTenant = appTenantIds.filter(id => !tenantIds.includes(id));

console.log('\n🔍 CONSISTENCY CHECK:');

if (missingInApp.length > 0) {
  console.log('❌ Missing in app.html:', missingInApp);
}

if (missingInTenant.length > 0) {
  console.log('❌ Missing in tenant.js:', missingInTenant);
}

if (missingInApp.length === 0 && missingInTenant.length === 0) {
  console.log('✅ PERFECT CONSISTENCY!');
  console.log(`📊 Total tenants: ${tenantIds.length}`);
  console.log('🎯 All tenant configs are synchronized between tenant.js and app.html');
} else {
  console.log('⚠️  INCONSISTENCY DETECTED!');
  console.log('Please sync the configurations manually.');
}

console.log('\n📈 TENANT SUMMARY:');
const expectedRange = Array.from({length: 14}, (_, i) => i + 1);
const missing = expectedRange.filter(id => !tenantIds.includes(id));

if (missing.length === 0) {
  console.log('✅ All tenants 1-14 are present');
} else {
  console.log('⚠️  Missing tenant IDs:', missing);
}

console.log('\n🎉 VERIFICATION COMPLETE!');
