#!/usr/bin/env node

/**
 * Script untuk sync tenant ID dari tenant.js ke app.html
 * Jalankan setelah ganti DEFAULT_WEBSITE_ID
 */

import fs from 'fs';

console.log('🔄 SYNCING TENANT ID...\n');

// Baca DEFAULT_WEBSITE_ID dari tenant.js
const tenantPath = './src/lib/tenant.js';
const tenantContent = fs.readFileSync(tenantPath, 'utf8');
const tenantIdMatch = tenantContent.match(/export const DEFAULT_WEBSITE_ID = (\d+);/);

if (!tenantIdMatch) {
  console.error('❌ Could not find DEFAULT_WEBSITE_ID in tenant.js');
  process.exit(1);
}

const tenantId = parseInt(tenantIdMatch[1]);
console.log(`📋 Found DEFAULT_WEBSITE_ID: ${tenantId}`);

// Update app.html
const appHtmlPath = './src/app.html';
let appHtmlContent = fs.readFileSync(appHtmlPath, 'utf8');

// Replace window.tenantId di app.html
const oldPattern = /window\.tenantId = \d+; \/\/ HARUS SAMA DENGAN DEFAULT_WEBSITE_ID di tenant\.js/;
const newReplacement = `window.tenantId = ${tenantId}; // HARUS SAMA DENGAN DEFAULT_WEBSITE_ID di tenant.js`;

if (oldPattern.test(appHtmlContent)) {
  appHtmlContent = appHtmlContent.replace(oldPattern, newReplacement);
  fs.writeFileSync(appHtmlPath, appHtmlContent);
  console.log(`✅ Updated app.html with tenant ID: ${tenantId}`);
} else {
  console.warn('⚠️  Could not find window.tenantId pattern in app.html');
}

// Tampilkan info tenant
const tenantNames = {
  1: 'MakanKelantan',
  2: 'MakanKedah', 
  3: 'MakanPenang',
  4: 'MakanPerak',
  5: 'MakanPerlis',
  6: 'MakanTerengganu',
  7: 'MakanPahang',
  8: 'MakanKualaLumpur',
  9: 'MakanSelangor',
  10: 'MakanJohor',
  11: 'MakanMelaka',
  12: 'MakanNegeriSembilan',
  13: 'MakanSabah',
  14: 'MakanSarawak'
};

const tenantName = tenantNames[tenantId] || `Tenant ${tenantId}`;
console.log(`🎯 Current Tenant: ${tenantName} (ID: ${tenantId})`);

console.log('\n✅ SYNC COMPLETE!');
console.log('Now restart dev server: npm run dev');
