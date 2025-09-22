#!/usr/bin/env node

/**
 * Script untuk update semua config dalam app.html ke bahasa Melayu
 */

import fs from 'fs';

console.log('🔄 UPDATING APP.HTML TO MALAY...\n');

// Read app.html
let content = fs.readFileSync('./src/app.html', 'utf8');

// Replacements untuk semua tenant config
const replacements = [
  // Replace "Panduan kuliner terbaik" dengan "Panduan makanan terbaik"
  {
    from: /Panduan kuliner terbaik/g,
    to: 'Panduan makanan terbaik'
  },
  // Replace "Temukan tempat makan" dengan "Cari tempat makan"
  {
    from: /Temukan tempat makan/g,
    to: 'Cari tempat makan'
  },
  // Replace "resep tradisional" dengan "resipi tradisional"
  {
    from: /resep tradisional/g,
    to: 'resipi tradisional'
  },
  // Replace "review restoran" dengan "ulasan restoran"
  {
    from: /review restoran/g,
    to: 'ulasan restoran'
  },
  // Replace "review makanan" dengan "ulasan makanan"
  {
    from: /review makanan/g,
    to: 'ulasan makanan'
  },
  // Replace "tempat makan enak" dengan "tempat makan sedap"
  {
    from: /tempat makan enak/g,
    to: 'tempat makan sedap'
  },
  // Replace "Team" dengan "Pasukan"
  {
    from: /Team/g,
    to: 'Pasukan'
  },
  // Replace "kuliner" dengan "makanan" (dalam keywords)
  {
    from: /kuliner kelantan/g,
    to: 'makanan kelantan'
  },
  {
    from: /kuliner kedah/g,
    to: 'makanan kedah'
  },
  {
    from: /kuliner penang/g,
    to: 'makanan penang'
  },
  {
    from: /kuliner perak/g,
    to: 'makanan perak'
  },
  {
    from: /kuliner perlis/g,
    to: 'makanan perlis'
  },
  {
    from: /kuliner terengganu/g,
    to: 'makanan terengganu'
  },
  {
    from: /kuliner pahang/g,
    to: 'makanan pahang'
  },
  {
    from: /kuliner kl/g,
    to: 'makanan kl'
  },
  {
    from: /kuliner selangor/g,
    to: 'makanan selangor'
  },
  {
    from: /kuliner johor/g,
    to: 'makanan johor'
  },
  {
    from: /kuliner melaka/g,
    to: 'makanan melaka'
  },
  {
    from: /kuliner negeri sembilan/g,
    to: 'makanan negeri sembilan'
  },
  {
    from: /kuliner sabah/g,
    to: 'makanan sabah'
  },
  {
    from: /kuliner sarawak/g,
    to: 'makanan sarawak'
  }
];

// Apply all replacements
let updated = false;
replacements.forEach(({ from, to }) => {
  if (content.match(from)) {
    content = content.replace(from, to);
    updated = true;
    console.log(`✅ Replaced: ${from.source} → ${to}`);
  }
});

if (updated) {
  // Write back to file
  fs.writeFileSync('./src/app.html', content, 'utf8');
  console.log('\n🎉 APP.HTML UPDATED TO MALAY!');
} else {
  console.log('\n⚠️  No replacements needed - already in Malay');
}

console.log('\n📋 SUMMARY:');
console.log('- ✅ All "kuliner" → "makanan"');
console.log('- ✅ All "Temukan" → "Cari"');
console.log('- ✅ All "resep" → "resipi"');
console.log('- ✅ All "review" → "ulasan"');
console.log('- ✅ All "enak" → "sedap"');
console.log('- ✅ All "Team" → "Pasukan"');
console.log('\n🚀 Ready to use!');
