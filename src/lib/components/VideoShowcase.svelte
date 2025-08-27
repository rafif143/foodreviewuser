<script>
  import { onDestroy, onMount, tick } from 'svelte';
  import { page } from '$app/stores';
  
  /** @type {import('./$types').PageData} */
  export let videos = [];
  export let websiteSlug = '';
  
  // Menggunakan data dari prop jika tersedia, jika tidak gunakan data dari halaman
  $: baseVideos = videos && videos.length > 0 ? 
    mapVideoData(videos) : 
    ($page.data.randomVideos ? mapVideoData($page.data.randomVideos) : []);
  
  // Fungsi untuk memformat data video
  function mapVideoData(videos) {
    if (!videos || videos.length === 0) return [];
    
    return videos.map((video) => {
      // Extract YouTube video ID from URL
      const videoId = extractYouTubeId(video.url);
      return {
        id: video.id,
        title: video.title,
        description: video.description,
        url: video.url,
        videoId: videoId,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      };
    });
  }
  
  // Fungsi untuk extract YouTube video ID dari URL
  function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
  
  let scroller;
  let track;
  let groupSize = 0;
  let groupWidth = 0;
  let secondStart = 0;
  let thirdStart = 0;
  let timer;
  let displayVideos = [];
  const scrollSpeed = 1;
  
  function startAutoScroll() {
    if (!scroller || groupWidth === 0) return;
    
    stopAutoScroll();
    timer = setInterval(() => {
      if (!scroller) return;
      
      scroller.scrollLeft += scrollSpeed;
      
      if (scroller.scrollLeft >= thirdStart - 100) {
        scroller.scrollTo({ left: secondStart, behavior: 'auto' });
      }
    }, 16);
  }
  
  function stopAutoScroll() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  
  function next() {
    if (!scroller || groupWidth === 0) return;
    
    const step = Math.max(320, Math.floor(scroller.clientWidth * 0.6));
    const currentScroll = scroller.scrollLeft;
    
    if (currentScroll >= thirdStart - 200) {
      scroller.scrollTo({ left: secondStart, behavior: 'smooth' });
    } else {
      scroller.scrollBy({ left: step, behavior: 'smooth' });
    }
  }
  
  function prev() {
    if (!scroller || groupWidth === 0) return;
    
    const step = Math.max(320, Math.floor(scroller.clientWidth * 0.6));
    const currentScroll = scroller.scrollLeft;
    
    
    if (currentScroll <= secondStart - groupWidth + 200) {
      scroller.scrollTo({ left: thirdStart - groupWidth, behavior: 'smooth' });
    } else {
      scroller.scrollBy({ left: -step, behavior: 'smooth' });
    }
  }
  
  function handleScroll() {
    if (!scroller || groupWidth === 0) return;
    
    if (scroller.scrollLeft >= thirdStart - 100) {
      scroller.scrollTo({ left: secondStart, behavior: 'auto' });
    }
    else if (scroller.scrollLeft <= secondStart - groupWidth + 100) {
      scroller.scrollTo({ left: thirdStart - groupWidth, behavior: 'auto' });
    }
  }
  
  function handleMouseEnter() {
    isUserInteracting = true;
  }
  
  function handleMouseLeave() {
    setTimeout(() => {
      isUserInteracting = false;
      startAutoScroll();
    }, 1000);
  }
  
  onMount(async () => {
    if (!baseVideos || baseVideos.length === 0) {
      console.log('No videos available');
      return;
    }
    
    console.log(`Random videos loaded: ${baseVideos.length} videos`);
    
    groupSize = baseVideos.length;
    displayVideos = [...baseVideos, ...baseVideos, ...baseVideos];
    
    await tick();
    
    if (track && track.children && track.children.length > 0) {
      const firstStart = track.children[0].offsetLeft;
      secondStart = track.children[groupSize].offsetLeft;
      thirdStart = track.children[groupSize * 2].offsetLeft;
      groupWidth = secondStart - firstStart;
      
      if (scroller && Number.isFinite(secondStart)) {
        scroller.scrollLeft = secondStart;
      }
    }
    
    if (scroller) {
      scroller.addEventListener('scroll', handleScroll);
    }
    
    setTimeout(() => {
      startAutoScroll();
    }, 1000);
  });
  
  onDestroy(() => {
    stopAutoScroll();
    if (scroller) {
      scroller.removeEventListener('scroll', handleScroll);
    }
  });
</script>

<div class="relative">
  <div class="pointer-events-none absolute -left-6 top-0 h-full w-24 bg-gradient-to-r from-orange-50 to-transparent z-10"></div>
  <div class="pointer-events-none absolute -right-6 top-0 h-full w-24 bg-gradient-to-l from-orange-50 to-transparent z-10"></div>

  <div
    class="overflow-x-hidden"
    bind:this={scroller}
    role="region"
    aria-label="Carousel video YouTube"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    <div class="flex gap-6 py-2" bind:this={track}>
      {#each displayVideos as video, i}
        <article class="flex-none w-80 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div class="relative">
            <!-- YouTube Embed -->
            <div class="relative w-full h-48">
              <iframe
                src="https://www.youtube.com/embed/{video.videoId}"
                title={video.title}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-full rounded-t-2xl"
                loading="lazy"
              ></iframe>
            </div>
            
            <!-- Play button overlay (optional) -->
            <div class="absolute top-4 right-4">
              <div class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                <svg class="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {video.title}
            </h3>
            {#if video.description}
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                {video.description}
              </p>
            {/if}
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500 font-medium">
                  YouTube Video
                </span>
              </div>
              <a 
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-red-600 text-sm font-semibold hover:text-red-700 transition-colors duration-300 flex items-center gap-1"
              >
                Tonton di YouTube
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>

  <div class="mt-6 flex items-center justify-center gap-4">
    <button 
      class="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" 
      on:click={prev}
      aria-label="Video sebelumnya"
    >
      ← Sebelumnya
    </button>
    <button 
      class="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" 
      on:click={next}
      aria-label="Video berikutnya"
    >
      Berikutnya →
    </button>
  </div>
</div>

<style>
  .line-clamp-2 {
    line-clamp: 2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>