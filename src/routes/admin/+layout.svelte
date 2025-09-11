<!-- Admin Layout -->
<script>
  import { page } from '$app/stores';
  
  let currentPath = $page.url.pathname;
</script>

<div class="min-h-screen bg-gray-100">
  <!-- Admin Header -->
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <div class="flex items-center space-x-4">
          <a href="/" class="text-gray-600 hover:text-gray-900">View Site</a>
        </div>
      </div>
    </div>
  </header>
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex">
      <!-- Sidebar -->
      <div class="w-64 bg-white shadow rounded-lg mr-6">
        <nav class="p-4">
          <ul class="space-y-2">
            <li>
              <a 
                href="/admin/ads" 
                class="block px-4 py-2 rounded-md text-sm font-medium {currentPath === '/admin/ads' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}"
              >
                Ads Management
              </a>
            </li>
            <li>
              <a 
                href="/admin/websites" 
                class="block px-4 py-2 rounded-md text-sm font-medium {currentPath === '/admin/websites' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}"
              >
                Websites
              </a>
            </li>
            <li>
              <a 
                href="/admin/articles" 
                class="block px-4 py-2 rounded-md text-sm font-medium {currentPath === '/admin/articles' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}"
              >
                Articles
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      <!-- Main Content -->
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</div>
