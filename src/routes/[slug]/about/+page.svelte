<script>
  import { onMount } from 'svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { supabase } from '$lib/supabase.js';

  /** @type {import('./$types').PageData} */
  export let data;

  let aboutData = {};

  onMount(async () => {
    // Ambil kandungan halaman About
    const { data: aboutContent, error } = await supabase
      .from('about')
      .select('*')
      .eq('website_id', data.website.id)
      .single();
    if (error) console.error('Ralat mengambil kandungan about:', error);
    else aboutData = aboutContent || {};
  });

  // Peta nama ikon kepada laluan SVG
  const iconSvgs = {
    'check-circle': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
    'eye': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>',
    'heart': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>',
    'shield-check': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>',
    'users': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>',
    'facebook': '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
    'youtube': '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
    'instagram': '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>',
    'globe': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>',
    'twitter': '<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>',
    'tiktok': '<path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>'
  };
</script>

<svelte:head>
  <title>{aboutData.tentang_kami?.title || 'Tentang Kami'} - {data.website.name}</title>
  <meta
    name="description"
    content={aboutData.tentang_kami?.description || 'Tentang Kami'}
  />
</svelte:head>

<main class="bg-gradient-to-br from-gray-50 via-white to-red-50">
  
  <!-- Tajuk Halaman -->
  {#if aboutData.tentang_kami}
    <PageHeader 
      title={aboutData.tentang_kami.title}
      description={aboutData.tentang_kami.description}
    />
  {/if}

  <!-- Kandungan Utama -->
  <section class="py-8 md:py-16 bg-gradient-to-br from-red-50 to-orange-50">
    <div class="container mx-auto px-4">
      <!-- Bahagian Cerita -->
      {#if aboutData.cerita_kami && aboutData.image}
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-lg md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent mb-3 md:mb-4">
            Cerita Kami
          </h2>
          <div class="w-16 md:w-20 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full mb-4 md:mb-6"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20">
          <div class="space-y-4 md:space-y-8">
            <div class="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300">
              <h3 class="text-base md:text-xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent mb-3 md:mb-4 text-center">
                {aboutData.cerita_kami.title}
              </h3>
              <div class="w-16 md:w-20 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mb-4 md:mb-6 mx-auto"></div>
              <div class="space-y-3 md:space-y-4">
                {#each (aboutData.cerita_kami.content || '').split('\n\n') as paragraph}
                  <p class="text-sm md:text-base text-gray-600 leading-relaxed text-center">{paragraph}</p>
                {/each}
              </div>
            </div>
          </div>
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-500/20 rounded-xl md:rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
            <img
              src={aboutData.image.url}
              alt={aboutData.image.title}
              class="w-full h-64 md:h-96 object-cover rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl md:rounded-2xl"></div>
            <div class="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
              <h3 class="text-lg md:text-xl font-bold mb-1 md:mb-2">{aboutData.image.title}</h3>
              <p class="text-xs md:text-sm opacity-90">{aboutData.image.subtitle}</p>
            </div>
          </div>
        </div>
      {/if}

      <!-- Misi & Visi -->
      {#if aboutData.misi || aboutData.visi}
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-lg md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent mb-3 md:mb-4">
            Visi & Misi Kami
          </h2>
          <div class="w-16 md:w-20 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full mb-4 md:mb-6"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20">
          {#if aboutData.misi}
            <div class="bg-gradient-to-br from-white to-red-50 p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-red-100 transform hover:scale-105 transition-all duration-300">
              {#if aboutData.misi.icon_name}
                <div class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg mx-auto">
                  <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {@html iconSvgs[aboutData.misi.icon_name]}
                  </svg>
                </div>
              {/if}
              <h3 class="text-sm md:text-lg font-bold text-gray-800 mb-2 md:mb-3 text-center">{aboutData.misi.title}</h3>
              <div class="w-12 md:w-16 h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mb-4 md:mb-6 mx-auto"></div>
              <p class="text-sm md:text-base text-gray-600 leading-relaxed text-center">{aboutData.misi.content}</p>
            </div>
          {/if}
          {#if aboutData.visi}
            <div class="bg-gradient-to-br from-white to-orange-50 p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-orange-100 transform hover:scale-105 transition-all duration-300">
              {#if aboutData.visi.icon_name}
                <div class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg mx-auto">
                  <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {@html iconSvgs[aboutData.visi.icon_name]}
                  </svg>
                </div>
              {/if}
              <h3 class="text-sm md:text-lg font-bold text-gray-800 mb-2 md:mb-3 text-center">{aboutData.visi.title}</h3>
              <div class="w-12 md:w-16 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4 md:mb-6 mx-auto"></div>
              <p class="text-sm md:text-base text-gray-600 leading-relaxed text-center">{aboutData.visi.content}</p>
            </div>
          {/if}
        </div>
      {/if}

      <!-- Nilai-nilai -->
      {#if aboutData.nilai_nilai}
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-lg md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent mb-3 md:mb-4">
            {aboutData.nilai_nilai.title}
          </h2>
          <div class="w-16 md:w-20 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full mb-4 md:mb-6"></div>
          <p class="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">{aboutData.nilai_nilai.description}</p>
        </div>
        <div class="grid grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20 max-w-4xl mx-auto">
          {#each (aboutData.nilai_nilai.items || []).sort((a, b) => a.order_index - b.order_index) as value}
            <div class="text-center group bg-gradient-to-br from-white to-gray-50 p-3 md:p-6 rounded-lg md:rounded-2xl shadow-md md:shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300">
              {#if value.icon_name}
                <div class="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-{value.order_index % 2 === 0 ? 'red-600' : 'orange-600'} to-{value.order_index % 2 === 0 ? 'red-700' : 'red-600'} rounded-lg md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {@html iconSvgs[value.icon_name]}
                  </svg>
                </div>
              {/if}
              <h3 class="text-xs md:text-lg font-bold text-gray-800 mb-2 md:mb-3">{value.title}</h3>
              <p class="text-[10px] md:text-base text-gray-600 leading-tight md:leading-relaxed">{value.description}</p>
            </div>
          {/each}
        </div>
      {/if}

      <!-- Pasukan -->
      {#if aboutData.tim}
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-lg md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent mb-3 md:mb-4">
            {aboutData.tim.title}
          </h2>
          <div class="w-16 md:w-20 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full mb-4 md:mb-6"></div>
          <p class="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {aboutData.tim.description}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20 max-w-4xl mx-auto">
          {#each (aboutData.tim.members || []).sort((a, b) => a.order_index - b.order_index) as member}
            <div class="text-center group bg-gradient-to-br from-white to-gray-50 p-3 md:p-6 rounded-lg md:rounded-2xl shadow-md md:shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300">
              {#if member.image_url}
                <div class="relative mb-3 md:mb-6">
                  <div class="absolute inset-0 bg-gradient-to-br from-{member.order_index % 2 === 0 ? 'red-600' : 'orange-500'}/20 to-{member.order_index % 2 === 0 ? 'orange-500' : 'red-600'}/20 rounded-full transform {member.order_index % 2 === 0 ? 'rotate-3' : '-rotate-3'} group-hover:{member.order_index % 2 === 0 ? 'rotate-6' : '-rotate-6'} transition-transform duration-300"></div>
                  <img
                    src={member.image_url}
                    alt={member.name}
                    class="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto object-cover shadow-lg md:shadow-xl transform {member.order_index % 2 === 0 ? '-rotate-3' : 'rotate-3'} group-hover:{member.order_index % 2 === 0 ? '-rotate-6' : 'rotate-6'} transition-transform duration-300"
                  />
                </div>
              {/if}
              <h3 class="text-xs md:text-lg font-bold text-gray-800 mb-2 md:mb-2">{member.name}</h3>
              <p class="text-[10px] md:text-base text-gray-600 font-medium">{member.position}</p>
            </div>
          {/each}
        </div>
      {/if}

      <!-- Statistik Utama -->
      {#if aboutData.key_stats}
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-lg md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent mb-3 md:mb-4">
            {aboutData.key_stats.title}
          </h2>
          <div class="w-16 md:w-20 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full mb-4 md:mb-6"></div>
          <p class="text-sm md:text-base text-gray-600">{aboutData.key_stats.description}</p>
        </div>
        <div class="grid grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-16 max-w-4xl mx-auto">
          {#each (aboutData.key_stats.items || []).sort((a, b) => a.order_index - b.order_index) as stat}
            <div class="bg-gradient-to-br from-white to-{stat.order_index % 2 === 0 ? 'red-50' : 'orange-50'} p-3 md:p-6 rounded-lg md:rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-md md:shadow-xl border border-{stat.order_index % 2 === 0 ? 'red-100' : 'orange-100'}">
              {#if stat.icon_name}
                <div class="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-{stat.order_index % 2 === 0 ? 'red-600' : 'orange-600'} to-{stat.order_index % 2 === 0 ? 'red-700' : 'red-600'} rounded-lg md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 shadow-lg">
                  <svg class="w-6 h-6 md:w-10 md:h-10 text-white" fill={['facebook', 'youtube', 'instagram', 'twitter', 'tiktok'].includes(stat.icon_name) ? 'currentColor' : 'none'} stroke={['facebook', 'youtube', 'instagram', 'twitter', 'tiktok'].includes(stat.icon_name) ? 'none' : 'currentColor'} viewBox={['facebook', 'youtube', 'instagram', 'twitter', 'tiktok'].includes(stat.icon_name) ? '0 0 24 24' : '0 0 24 24'}>
                    {@html iconSvgs[stat.icon_name]}
                  </svg>
                </div>
              {/if}
              <h3 class="text-xs md:text-base font-bold text-gray-800 mb-2 md:mb-3">{stat.title}</h3>
              <p class="text-sm md:text-2xl font-black bg-gradient-to-r from-{stat.order_index % 2 === 0 ? 'red-600' : 'orange-600'} to-{stat.order_index % 2 === 0 ? 'red-700' : 'red-600'} bg-clip-text text-transparent mb-1 md:mb-2">{stat.value}</p>
              <p class="text-[8px] md:text-xs text-gray-500 font-medium">{stat.unit}</p>
            </div>
          {/each}
        </div>
        {#if aboutData.last_updated}
          <div class="text-center mt-8 md:mt-12">
            <div class="inline-flex items-center bg-gradient-to-r from-red-100 to-orange-100 px-4 md:px-8 py-3 md:py-4 rounded-full border-2 border-red-300 shadow-lg md:shadow-xl">
              <div class="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mr-3 md:mr-4 animate-pulse shadow-sm"></div>
              <p class="text-red-800 text-sm md:text-lg font-bold">Kemas kini terakhir pada {aboutData.last_updated}</p>
            </div>
          </div>
        {/if}
      {/if}
    </div>
  </section>
</main>