<script>
  import { onMount } from 'svelte';
  import { getAboutSection } from '$lib/aboutSections';
  import { DEFAULT_WEBSITE_ID } from '$lib/tenant';
  
  export let category = 'food'; // food, cafe, events, recipe, things-to-do
  export let content = null; // Jika ada content dari parent component
  export let websiteId = null; // Website ID untuk multi-tenant
  
  let aboutContent = null;
  let loading = true;
  
  // Menggunakan content dari prop jika tersedia, jika tidak ambil dari database
  $: {
    if (content) {
      aboutContent = content;
      loading = false;
    }
  }
  
  // Fungsi untuk mendapatkan konten dari database
  async function fetchAboutContent() {
    try {
      loading = true;
      // Gunakan websiteId yang diberikan atau fallback ke DEFAULT_WEBSITE_ID
      const currentWebsiteId = websiteId || DEFAULT_WEBSITE_ID;
      const data = await getAboutSection(currentWebsiteId, category);
      
      if (data) {
        aboutContent = data;
      } else {
        // Biarkan kosong jika tidak ada data di database
        aboutContent = null;
      }
    } catch (error) {
      console.error('Ralat mengambil kandungan tentang:', error);
      // Biarkan kosong jika error
      aboutContent = null;
    } finally {
      loading = false;
    }
  }
  
  onMount(() => {
    // Jika tidak ada content dari prop, ambil dari database
    if (!content) {
      fetchAboutContent();
    }
  });
</script>

{#if loading}
  <div class="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl shadow-xl border border-orange-100 animate-pulse">
    <div class="space-y-4">
      <div class="h-8 bg-gray-200 rounded-lg w-3/4"></div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 rounded w-full"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        <div class="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div class="h-6 bg-gray-200 rounded-lg w-1/2"></div>
      <div class="h-4 bg-gray-200 rounded w-4/5"></div>
    </div>
  </div>
{:else if aboutContent}
  <div class="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl shadow-xl border border-orange-100 transform hover:scale-105 transition-all duration-300">
    <!-- Title -->
    <h2 class="text-xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-orange-600 bg-clip-text text-transparent mb-6">
      {aboutContent.title}
    </h2>
    
    <!-- Description -->
    <div class="text-gray-700 leading-relaxed text-sm md:text-lg mb-8 whitespace-pre-line">
      {aboutContent.description}
    </div>
    
    <!-- Tips Section -->
    <div class="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-orange-200">
      <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
        {aboutContent.tips_title}
      </h3>
      <p class="text-gray-700 leading-relaxed">
        {aboutContent.tips_description}
      </p>
    </div>
  </div>
{:else}
  <!-- Fallback jika tidak ada konten -->
  <div class="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl shadow-xl border border-orange-100">
    <div class="text-center py-12">
      <div class="text-gray-400 text-4xl md:text-6xl mb-4">🍽️</div>
      <p class="text-gray-500 text-sm md:text-lg">Kandungan tidak tersedia</p>
    </div>
  </div>
{/if}
