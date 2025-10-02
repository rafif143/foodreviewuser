<script>
  import { onDestroy, onMount, tick } from 'svelte';
  import { page } from '$app/stores';
  import { DEFAULT_WEBSITE_ID } from '$lib/tenant';
  import ArticleLabels from './ArticleLabels.svelte';
  
  /** @type {import('./$types').PageData} */
  export let articles = [];
  export let websiteSlug = '';
  
  // Menggunakan data dari prop jika tersedia, jika tidak gunakan data dari halaman
  $: baseArticles = articles && articles.length > 0 ? 
    mapArticleData(articles) : 
    ($page.data.randomArticles ? mapArticleData($page.data.randomArticles) : []);
  
  // Fungsi untuk memformat data artikel
  function mapArticleData(articles) {
    if (!articles || articles.length === 0) return [];
    
    return articles.map((article) => {
      return {
        id: article.id,
        slug: article.slug,
        image: article.thumbnail_image || 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop',
        category: article.category.toUpperCase(),
        title: article.title,
        author: article.author ? `OLEH ${article.author.toUpperCase()}` : 'OLEH PASUKAN KELANTAN FOOD REVIEW',
        excerpt: article.summary,
        labels: article.labels || []
      };
    });
  }
  
  // Data statis telah dihapus dan diganti dengan data dinamis dari database
  let scroller;
  let track;
  let groupSize = 0;
  let groupWidth = 0;
  let secondStart = 0;
  let thirdStart = 0;
  let timer;
  let scrollSpeed = 1; // Kecepatan scroll (px per frame)
  let isUserInteracting = false; // Flag untuk mendeteksi interaksi user

  // Data artikel yang akan ditampilkan (akan di-duplicate untuk infinite loop)
  let displayArticles = [];

  function startAutoScroll() {
    if (isUserInteracting || !scroller || groupWidth === 0) return;
    
    stopAutoScroll();
    timer = setInterval(() => {
      if (!scroller || isUserInteracting) return;
      
      // Scroll terus menerus seperti kereta
      scroller.scrollLeft += scrollSpeed;
      
      // Reset scroll position untuk infinite loop
      if (scroller.scrollLeft >= thirdStart - 100) {
        scroller.scrollTo({ left: secondStart, behavior: 'auto' });
      }
    }, 16); // 60fps untuk scroll yang smooth
  }

  function stopAutoScroll() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function next() {
    if (!scroller || groupWidth === 0) return;
    
    // Set flag user interaction
    isUserInteracting = true;
    stopAutoScroll();
    
    const step = Math.max(320, Math.floor(scroller.clientWidth * 0.6));
    const currentScroll = scroller.scrollLeft;
    
    // Check if we need to loop to the beginning
    if (currentScroll >= thirdStart - 200) {
      scroller.scrollTo({ left: secondStart, behavior: 'smooth' });
    } else {
      scroller.scrollBy({ left: step, behavior: 'smooth' });
    }
    
    // Resume auto scroll setelah delay
    setTimeout(() => {
      isUserInteracting = false;
      startAutoScroll();
    }, 800);
  }

  function prev() {
    if (!scroller || groupWidth === 0) return;
    
    // Set flag user interaction
    isUserInteracting = true;
    stopAutoScroll();
    
    const step = Math.max(320, Math.floor(scroller.clientWidth * 0.6));
    const currentScroll = scroller.scrollLeft;
    
    // Check if we need to loop to the end
    if (currentScroll <= secondStart - groupWidth + 200) {
      scroller.scrollTo({ left: thirdStart - groupWidth, behavior: 'smooth' });
    } else {
      scroller.scrollBy({ left: -step, behavior: 'smooth' });
    }
    
    // Resume auto scroll setelah delay
    setTimeout(() => {
      isUserInteracting = false;
      startAutoScroll();
    }, 800);
  }

  function handleScroll() {
    if (!scroller || groupWidth === 0) return;
    
    // Loop ke kanan (ke awal) - ketika scroll ke ujung kanan
    if (scroller.scrollLeft >= thirdStart - 100) {
      scroller.scrollTo({ left: secondStart, behavior: 'auto' });
    }
    // Loop ke kiri (ke akhir) - ketika scroll ke ujung kiri
    else if (scroller.scrollLeft <= secondStart - groupWidth + 100) {
      scroller.scrollTo({ left: thirdStart - groupWidth, behavior: 'auto' });
    }
  }

  // Handle mouse events untuk pause auto scroll saat hover
  function handleMouseEnter() {
    isUserInteracting = true;
    stopAutoScroll();
  }

  function handleMouseLeave() {
    setTimeout(() => {
      isUserInteracting = false;
      startAutoScroll();
    }, 1000); // 1 detik delay setelah mouse leave
  }

  onMount(async () => {
    // Pastikan ada artikel yang tersedia
    if (!baseArticles || baseArticles.length === 0) {
      
      return;
    }
    
    
    
    // Set group size berdasarkan jumlah artikel yang tersedia
    groupSize = baseArticles.length;
    
    // Duplicate artikel untuk infinite loop (awal, tengah, akhir)
    displayArticles = [...baseArticles, ...baseArticles, ...baseArticles];
    
    
    
    // Tunggu DOM update
    await tick();
    
    // Hitung posisi untuk infinite loop
    if (track && track.children && track.children.length > 0) {
      const firstStart = track.children[0].offsetLeft;
      secondStart = track.children[groupSize].offsetLeft;
      thirdStart = track.children[groupSize * 2].offsetLeft;
      groupWidth = secondStart - firstStart;
      
      
      
      // Set scroll position ke tengah (grup kedua)
      if (scroller && Number.isFinite(secondStart)) {
        scroller.scrollLeft = secondStart;
      }
    }
    
    // Tambahkan event listener untuk scroll
    if (scroller) {
      scroller.addEventListener('scroll', handleScroll);
    }
    
    // Start auto scroll setelah delay singkat
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
    aria-label="Carousel artikel rawak"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
         <div class="flex gap-6 py-2" bind:this={track}>
       {#each displayArticles as article, i}
        <article class="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
          <div class="relative">
            <img 
              src={article.image} 
              alt={article.title}
              class="w-full h-48 object-cover"
            />
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                {article.category}
              </span>
            </div>
            <!-- Labels di thumbnail -->
            <ArticleLabels labels={article.labels || []} />
          </div>
          <div class="p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {article.title}
            </h3>
            {#if article.excerpt}
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                {article.excerpt}
              </p>
            {/if}
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500 font-medium">
                  {article.author}
                </span>
              </div>
              <a 
                href="/{websiteSlug || 'kelantan'}/article/{article.slug || article.id}" 
                class="text-red-600 text-sm font-semibold hover:text-red-700 transition-colors"
              >
                Baca Selengkapnya
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
      aria-label="Artikel sebelumnya"
    >
      ← Sebelumnya
    </button>
    <button 
      class="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" 
      on:click={next}
      aria-label="Artikel seterusnya"
    >
      Seterusnya →
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