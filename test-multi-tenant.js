#!/usr/bin/env node

/**
 * Script untuk test multi-tenant functionality
 * Memastikan setiap website_id menampilkan konten yang berbeda
 */

import { supabase } from './src/lib/supabase.js';

console.log('🧪 Testing Multi-tenant Functionality...\n');

// Test function untuk check konten berdasarkan website_id
async function testWebsiteContent(websiteId, websiteName) {
  console.log(`📊 Testing ${websiteName} (ID: ${websiteId})`);
  console.log('─'.repeat(50));
  
  try {
    // Test Articles
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('id, title, category, website_id')
      .eq('website_id', websiteId)
      .limit(5);
    
    if (articlesError) {
      console.log(`❌ Articles Error: ${articlesError.message}`);
    } else {
      console.log(`📝 Articles (${articles?.length || 0}):`);
      articles?.forEach(article => {
        console.log(`   - ${article.title} (${article.category})`);
      });
    }
    
    // Test Videos
    const { data: videos, error: videosError } = await supabase
      .from('videos')
      .select('id, title, video_type, website_id')
      .eq('website_id', websiteId)
      .limit(3);
    
    if (videosError) {
      console.log(`❌ Videos Error: ${videosError.message}`);
    } else {
      console.log(`🎥 Videos (${videos?.length || 0}):`);
      videos?.forEach(video => {
        console.log(`   - ${video.title} (${video.video_type})`);
      });
    }
    
    // Test Categories
    const categories = ['food', 'cafe', 'events', 'recipe', 'things-to-do'];
    console.log(`📂 Categories:`);
    
    for (const category of categories) {
      const { data: categoryArticles, error: categoryError } = await supabase
        .from('articles')
        .select('id, title')
        .eq('website_id', websiteId)
        .eq('category', category)
        .limit(2);
      
      if (!categoryError) {
        console.log(`   - ${category}: ${categoryArticles?.length || 0} articles`);
        categoryArticles?.forEach(article => {
          console.log(`     * ${article.title}`);
        });
      }
    }
    
  } catch (error) {
    console.log(`❌ Error testing ${websiteName}: ${error.message}`);
  }
  
  console.log('');
}

// Test multiple websites
async function runTests() {
  try {
    // Test website ID 1 (Kelantan)
    await testWebsiteContent(1, 'Kelantan Food Review');
    
    // Test website ID 2 (jika ada)
    await testWebsiteContent(2, 'Website 2');
    
    // Test website ID 3 (jika ada)
    await testWebsiteContent(3, 'Website 3');
    
    console.log('✅ Multi-tenant test completed!');
    console.log('\n📋 Summary:');
    console.log('- Each website_id should show different content');
    console.log('- Articles, videos, and categories should be filtered by website_id');
    console.log('- If you see the same content for different website_id, there is a problem');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run tests
runTests();
