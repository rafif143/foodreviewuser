<script>
  import { onMount } from 'svelte';
  
  export let websiteId = 1; // Default website ID
  
  let allVideos = [];
  let activeTab = 'youtube';
  let currentPage = 1;
  const itemsPerPage = 4;
  let loading = true;
  
  // Muat semua video dari pangkalan data
  async function loadAllVideos() {
    try {
      loading = true;
      
      // Query terus ke Supabase (sesuaikan dengan setup anda)
      const response = await fetch(`/api/videos?website_id=${websiteId}`);
      const data = await response.json();
      
      allVideos = data.videos || [];
      
    } catch (error) {
      allVideos = [];
    } finally {
      loading = false;
    }
  }
  
  // Pisahkan video berdasarkan jenis
  $: youtubeVideos = allVideos.filter(video => 
    video.video_type === 'youtube'
  );
  
  $: tiktokVideos = allVideos.filter(video => 
    video.video_type === 'tiktok'
  );
  
  // Video yang dipaparkan berdasarkan tab aktif
  $: displayVideos = activeTab === 'youtube' ? youtubeVideos : tiktokVideos;
  
  // Pagination
  $: totalPages = Math.ceil(displayVideos.length / itemsPerPage);
  $: startIndex = (currentPage - 1) * itemsPerPage;
  $: currentVideos = displayVideos.slice(startIndex, startIndex + itemsPerPage);
  
  // Reset halaman semasa tukar tab
  function switchTab(tab) {
    activeTab = tab;
    currentPage = 1;
  }
  
  function nextPage() {
    if (currentPage < totalPages) currentPage++;
  }
  
  function prevPage() {
    if (currentPage > 1) currentPage--;
  }
  
  // Extract YouTube ID
  function getYouTubeId(url) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  }
  
  // Extract TikTok video ID
  function getTikTokId(url) {
    // Handle both direct URLs and embed codes
    if (url.includes('data-video-id=')) {
      const match = url.match(/data-video-id="([^"]+)"/);
      return match ? match[1] : null;
    } else if (url.includes('tiktok.com')) {
      const match = url.match(/tiktok\.com\/@[^\/]+\/video\/(\d+)/);
      return match ? match[1] : null;
    }
    return null;
  }
  
  // Get embed URL
  function getEmbedUrl(video) {
    if (video.video_type === 'youtube') {
      const videoId = getYouTubeId(video.url);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } else if (video.video_type === 'tiktok') {
      const videoId = getTikTokId(video.url);
      return videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : null;
    }
    return null;
  }
  
  onMount(() => {
    loadAllVideos();
  });
</script>


<div class="w-full max-w-6xl mx-auto p-4">
  
  <!-- Loading State -->
  {#if loading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      <span class="ml-2">Memuatkan video...</span>
    </div>
  {:else}
    
    <!-- Tab Navigation -->
    <div class="flex justify-center mb-8">
      <div class="bg-gray-100 rounded-2xl p-2 flex gap-2">
        <button
          class="px-6 py-3 rounded-xl font-semibold transition-all duration-300 {activeTab === 'youtube' ? 'bg-white text-red-600 shadow-lg' : 'text-gray-600 hover:text-gray-800'}"
          on:click={() => switchTab('youtube')}
        >
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube ({youtubeVideos.length})
          </div>
        </button>
        
        <button
          class="px-6 py-3 rounded-xl font-semibold transition-all duration-300 {activeTab === 'tiktok' ? 'bg-white text-pink-600 shadow-lg' : 'text-gray-600 hover:text-gray-800'}"
          on:click={() => switchTab('tiktok')}
        >
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
            TikTok ({tiktokVideos.length})
          </div>
        </button>
      </div>
    </div>

    <!-- Video Grid -->
    {#if currentVideos.length > 0}
             <!-- YouTube Videos - With Cards in Grid -->
       {#if activeTab === 'youtube'}
         <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
           {#each currentVideos as video (video.id)}
             <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
               <!-- Video Content -->
               <div class="relative">
                 <div class="w-full h-40 bg-gray-100">
                  {#if getEmbedUrl(video)}
                    <iframe
                      src="{getEmbedUrl(video)}"
                      title={video.title}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      class="w-full h-full"
                    ></iframe>
                  {:else}
                    <div class="w-full h-full bg-red-50 flex items-center justify-center">
                      <div class="text-center">
                        <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </div>
                        <p class="text-red-600 text-sm font-medium">YouTube Video</p>
                        <p class="text-red-400 text-xs">URL tidak sah</p>
                      </div>
                    </div>
                  {/if}
                </div>
              </div>
              
                             <!-- Video Info -->
               <div class="p-4">
                 <h3 class="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                   {video.title}
                 </h3>
                 
                 {#if video.description}
                   <p class="text-gray-600 text-xs mb-3 line-clamp-2">
                     {video.description}
                   </p>
                 {/if}
                 
                 <div class="flex items-center justify-between">
                   <span class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                     YouTube
                   </span>
                   
                   <a 
                     href={video.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     class="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1"
                   >
                     Buka Video
                     <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                     </svg>
                   </a>
                 </div>
               </div>
            </div>
          {/each}
        </div>
      {/if}
      
                           <!-- TikTok Videos - Free Layout in 2 Columns -->
        {#if activeTab === 'tiktok'}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {#each currentVideos as video (video.id)}
              <div class="w-full">
                {#if getEmbedUrl(video)}
                  <iframe
                    src="{getEmbedUrl(video)}"
                    title="TikTok Video"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    class="w-full"
                                         style="min-height: 800px; max-width: 100%;"
                  ></iframe>
                {:else}
                  <div class="w-full bg-pink-50 flex items-center justify-center p-6">
                    <div class="text-center">
                      <div class="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </div>
                      <p class="text-pink-600 text-sm font-medium">TikTok Video</p>
                      <p class="text-pink-400 text-xs">URL tidak sah</p>
                    </div>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      
      <!-- Pagination -->
      {#if totalPages > 1}
        <div class="flex justify-center items-center gap-4">
          <button 
            on:click={prevPage}
            disabled={currentPage === 1}
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Sebelumnya
          </button>
          
          <span class="text-sm text-gray-600">
            Halaman {currentPage} daripada {totalPages}
          </span>
          
          <button 
            on:click={nextPage}
            disabled={currentPage === totalPages}
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Seterusnya →
          </button>
        </div>
      {/if}
      
    {:else}
      <!-- Empty State -->
      <div class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">
          Belum ada video {activeTab === 'youtube' ? 'YouTube' : 'TikTok'}
        </h3>
        <p class="text-gray-500">
          Video akan dipaparkan di sini selepas ditambah
        </p>
      </div>
    {/if}
    
  {/if}
</div>