<script>
  import { onMount } from 'svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import AdBanner from '$lib/components/AdBanner.svelte';
  import { supabase } from '$lib/supabase.js';

  /** @type {import('./$types').PageData} */
  export let data;

  let advertiseData = {};
  let loading = true;

  onMount(async () => {
    // Fetch Advertise page content
    const { data: advertiseContent, error } = await supabase
      .from('advertise')
      .select('*')
      .eq('website_id', data.website.id)
      .single();
    
    if (error) {
      console.error('Error fetching advertise content:', error);
      // Use default data if no data in database
      advertiseData = {
        page_title: "Iklan & Promosi",
        page_description: "Promosikan bisnis kuliner Anda dengan jangkauan luas di Kelantan",
        introduction: {
          title: "Mengapa Memilih Kami?",
          content: "Dengan jutaan reach di Facebook dan ratusan ribu followers di Instagram, kami adalah partner terpercaya untuk mempromosikan bisnis kuliner Anda ke audiens yang tepat di Kelantan dan seluruh Malaysia."
        },
        packages: [
          {
            name: "Pakej 1",
            label: null,
            price: "RM90",
            platforms: [
              { name: "TikTok", icon_name: "tiktok" },
              { name: "Facebook", icon_name: "facebook" },
              { name: "Instagram", icon_name: "instagram" }
            ],
            order_index: 1
          },
          {
            name: "Pakej 2",
            label: "POPULAR",
            price: "RM150",
            platforms: [
              { name: "TikTok", icon_name: "tiktok" },
              { name: "Facebook", icon_name: "facebook" },
              { name: "Instagram", icon_name: "instagram" }
            ],
            order_index: 2
          },
          {
            name: "Pakej 3",
            label: "PREMIUM",
            price: "RM200",
            platforms: [
              { name: "TikTok", icon_name: "tiktok" },
              { name: "Facebook", icon_name: "facebook" },
              { name: "Instagram", icon_name: "instagram" },
              { name: "X (Twitter)", icon_name: "twitter" },
              { name: "Threads", icon_name: "threads" }
            ],
            order_index: 3
          }
        ],
        contact_info: {
          title: "Hubungi Kami",
          description: "Siap untuk mempromosikan bisnis kuliner Anda? Hubungi kami sekarang untuk konsultasi gratis dan mulai kampanye promosi Anda!",
          form: {
            title: "Kirim Pesan"
          },
          items: [
            {
              type: "Telepon",
              value: "+60 12-345 6789",
              icon_name: "phone"
            },
            {
              type: "Email",
              value: "advertise@kelantanfoodie.com",
              icon_name: "email"
            },
            {
              type: "Lokasi",
              value: "Kota Bharu, Kelantan, Malaysia",
              icon_name: "location"
            }
          ]
        }
      };
    } else {
      advertiseData = advertiseContent || {};
    }
    
    loading = false;
  });

  // Map icon names to SVG paths
  const iconSvgs = {
    'tiktok': '<path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>',
    'facebook': '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
    'instagram': '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>',
    'twitter': '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    'threads': '<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>',
    'phone': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>',
    'email': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
    'location': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>'
  };
</script>

<svelte:head>
  <title>{advertiseData.page_title || 'Advertise'} - {data.website.name}</title>
  <meta
    name="description"
    content={advertiseData.page_description || 'Promosikan bisnis kuliner Anda dengan paket video promosi di berbagai platform sosial media.'}
  />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
</svelte:head>

<main class="bg-gradient-to-br from-gray-50 via-white to-red-50">
  {#if loading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  {:else}
    <!-- Ad Banner Section -->
    <div class="py-4 bg-gray-50">
      <div class="container mx-auto px-4">
        <AdBanner websiteSlug={data.website.slug} />
      </div>
    </div>

    <!-- Page Header -->
    {#if advertiseData.page_title}
      <PageHeader 
        title={advertiseData.page_title}
        description={advertiseData.page_description}
      />
    {/if}

    <!-- Main Content -->
    <section class="py-16 bg-gradient-to-br from-red-50 to-orange-50">
      <div class="container mx-auto px-4">
        <!-- Introduction -->
        {#if advertiseData.introduction}
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent mb-4">
              {advertiseData.introduction.title}
            </h2>
            <div class="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full mb-6"></div>
            <p class="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              {advertiseData.introduction.content}
            </p>
          </div>
        {/if}

        <!-- Pricing Packages -->
        {#if advertiseData.packages}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {#each (advertiseData.packages || []).sort((a, b) => a.order_index - b.order_index) as pkg}
              <div class="bg-gradient-to-br from-white to-{pkg.order_index % 2 === 0 ? 'red-50' : 'orange-50'} p-8 rounded-2xl shadow-xl border border-{pkg.order_index % 2 === 0 ? 'red-100' : 'orange-100'} transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-{pkg.order_index % 2 === 0 ? 'red-600/10' : 'orange-600/10'} to-{pkg.order_index % 2 === 0 ? 'orange-500/10' : 'red-500/10'} rounded-full -translate-y-16 translate-x-16"></div>
                {#if pkg.label}
                  <div class="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white z-20">
                    {pkg.label}
                  </div>
                {/if}
                <div class="relative z-10">
                  <div class="text-center mb-8">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4 drop-shadow-sm">{pkg.name}</h3>
                    <div class="w-16 h-1 bg-gradient-to-r from-{pkg.order_index % 2 === 0 ? 'red-600' : 'orange-500'} to-{pkg.order_index % 2 === 0 ? 'orange-500' : 'red-600'} mx-auto rounded-full mb-6"></div>
                    <div class="mb-6">
                      <span class="text-4xl font-black bg-gradient-to-r from-{pkg.order_index % 2 === 0 ? 'red-600' : 'orange-600'} to-{pkg.order_index % 2 === 0 ? 'red-700' : 'red-600'} bg-clip-text text-transparent drop-shadow-sm">{pkg.price}</span>
                    </div>
                  </div>
                  <div class="space-y-4 mb-8">
                    <h4 class="font-bold text-gray-900 mb-4 text-lg">Video promosi di:</h4>
                    <div class="space-y-3">
                      {#each pkg.platforms || [] as platform}
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-gradient-to-br from-black to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                            {#if platform.icon_name === 'threads'}
                              <i class="bi bi-threads text-white text-xl leading-none"></i>
                            {:else}
                              <svg class="w-5 h-5 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                                {@html iconSvgs[platform.icon_name]}
                              </svg>
                            {/if}
                          </div>
                          <span class="text-gray-800 font-semibold text-sm">{platform.name}</span>
                        </div>
                      {/each}
                    </div>
                  </div>
                  <button class="w-full bg-gradient-to-r from-{pkg.order_index % 2 === 0 ? 'red-600' : 'orange-600'} to-{pkg.order_index % 2 === 0 ? 'red-700' : 'red-600'} text-white font-bold py-4 px-6 rounded-xl hover:from-{pkg.order_index % 2 === 0 ? 'red-700' : 'orange-700'} hover:to-{pkg.order_index % 2 === 0 ? 'red-800' : 'red-700'} transform hover:scale-105 transition-all duration-300 shadow-xl text-lg">
                    Pilih Pakej
                  </button>
                </div>
              </div>
            {/each}
          </div>
        {/if}

        <!-- Contact Section -->
        {#if advertiseData.contact_info}
          <div class="bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl shadow-2xl border border-gray-100 mb-20">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold bg-gradient-to-r from-gray-800 to-red-600 bg-clip-text text-transparent mb-4">
                {advertiseData.contact_info.title}
              </h2>
              <div class="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full mb-6"></div>
              <p class="text-gray-600 max-w-2xl mx-auto text-lg">
                {advertiseData.contact_info.description}
              </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-6">
                {#each (advertiseData.contact_info.items || []) as item}
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-{item.icon_name === 'email' ? 'orange-600' : 'red-600'} to-{item.icon_name === 'email' ? 'red-600' : 'red-700'} rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {@html iconSvgs[item.icon_name]}
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-bold text-gray-800">{item.type}</h3>
                      <p class="text-gray-600">{item.value}</p>
                    </div>
                  </div>
                {/each}
              </div>
              <div class="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100">
                <h3 class="text-2xl font-bold text-gray-800 mb-6">{advertiseData.contact_info.form.title}</h3>
                <form class="space-y-4">
                  <div>
                    <label class="block text-gray-700 font-medium mb-2">Nama</label>
                    <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Masukkan nama Anda">
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium mb-2">Email</label>
                    <input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Masukkan email Anda">
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium mb-2">Pesan</label>
                    <textarea rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Tulis pesan Anda di sini..."></textarea>
                  </div>
                  <button type="submit" class="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-xl hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg">
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </section>
  {/if}
</main>