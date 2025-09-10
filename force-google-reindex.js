#!/usr/bin/env node

/**
 * Script untuk Force Google Re-index
 * Menjalankan beberapa langkah untuk memaksa Google meng-update cache
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 Starting Google Re-index Process...\n');

// 1. Generate sitemap baru
console.log('📝 Step 1: Generating new sitemap...');
try {
  execSync('node scripts/generate-sitemap.js', { stdio: 'inherit' });
  console.log('✅ Sitemap generated successfully!\n');
} catch (error) {
  console.log('⚠️ Sitemap generation failed, using existing sitemap\n');
}

// 2. Check if sitemap is accessible
console.log('🔍 Step 2: Checking sitemap accessibility...');
const sitemapUrl = 'https://foodreviewuser.netlify.app/sitemap.xml';
const robotsUrl = 'https://foodreviewuser.netlify.app/robots.txt';

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`✅ ${url} - Status: ${res.statusCode}`);
      resolve(res.statusCode === 200);
    }).on('error', (err) => {
      console.log(`❌ ${url} - Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function checkUrls() {
  const sitemapOk = await checkUrl(sitemapUrl);
  const robotsOk = await checkUrl(robotsUrl);
  
  if (sitemapOk && robotsOk) {
    console.log('\n✅ All URLs are accessible!\n');
  } else {
    console.log('\n⚠️ Some URLs are not accessible. Please check deployment.\n');
  }
}

// 3. Generate Google Search Console URLs
console.log('🔗 Step 3: Google Search Console URLs to submit:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('1. Submit sitemap:');
console.log(`   ${sitemapUrl}`);
console.log('\n2. Request indexing for these URLs:');
console.log('   https://foodreviewuser.netlify.app/');
console.log('   https://foodreviewuser.netlify.app/kelantan');
console.log('   https://foodreviewuser.netlify.app/google-reindex.html');
console.log('\n3. Check robots.txt:');
console.log(`   ${robotsUrl}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// 4. Instructions
console.log('📋 Step 4: Manual actions required:');
console.log('1. Go to Google Search Console: https://search.google.com/search-console');
console.log('2. Select your property (foodreviewuser.netlify.app)');
console.log('3. Go to Sitemaps section and submit the sitemap URL');
console.log('4. Go to URL Inspection tool and request indexing for:');
console.log('   - https://foodreviewuser.netlify.app/');
console.log('   - https://foodreviewuser.netlify.app/kelantan');
console.log('5. Wait 24-48 hours for Google to re-crawl');
console.log('\n🎯 Expected result: Google will show the new content instead of "Redirecting..."\n');

// Run checks
checkUrls();
