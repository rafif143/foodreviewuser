<!-- Admin Dashboard -->
<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  
  let stats = {
    websites: 0,
    articles: 0,
    adsConfigs: 0,
    adsContent: 0
  };
  
  onMount(async () => {
    try {
      // Get websites count
      const { count: websitesCount } = await supabase
        .from('websites')
        .select('*', { count: 'exact', head: true });
      
      // Get articles count
      const { count: articlesCount } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true });
      
      // Get ads configs count
      const { count: adsConfigsCount } = await supabase
        .from('website_ads_config')
        .select('*', { count: 'exact', head: true });
      
      // Get ads content count
      const { count: adsContentCount } = await supabase
        .from('ads_content')
        .select('*', { count: 'exact', head: true });
      
      stats = {
        websites: websitesCount || 0,
        articles: articlesCount || 0,
        adsConfigs: adsConfigsCount || 0,
        adsContent: adsContentCount || 0
      };
      
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  });
</script>

<div class="space-y-6">
  <!-- Welcome -->
  <div class="bg-white shadow rounded-lg p-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-2">Welcome to Admin Panel</h1>
    <p class="text-gray-600">Manage your multi-tenant food review websites and ads.</p>
  </div>
  
  <!-- Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white shadow rounded-lg p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-500">Websites</p>
          <p class="text-2xl font-semibold text-gray-900">{stats.websites}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white shadow rounded-lg p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-500">Articles</p>
          <p class="text-2xl font-semibold text-gray-900">{stats.articles}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white shadow rounded-lg p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-500">Ads Configs</p>
          <p class="text-2xl font-semibold text-gray-900">{stats.adsConfigs}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-white shadow rounded-lg p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h10"></path>
            </svg>
          </div>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-500">Ads Content</p>
          <p class="text-2xl font-semibold text-gray-900">{stats.adsContent}</p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Quick Actions -->
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <a 
        href="/admin/ads" 
        class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div>
          <h3 class="font-medium text-gray-900">Manage Ads</h3>
          <p class="text-sm text-gray-500">Configure ads for all websites</p>
        </div>
      </a>
      
      <a 
        href="/admin/websites" 
        class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <div>
          <h3 class="font-medium text-gray-900">Manage Websites</h3>
          <p class="text-sm text-gray-500">View and edit website settings</p>
        </div>
      </a>
      
      <a 
        href="/admin/articles" 
        class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
          <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div>
          <h3 class="font-medium text-gray-900">Manage Articles</h3>
          <p class="text-sm text-gray-500">View and edit articles</p>
        </div>
      </a>
    </div>
  </div>
</div>
