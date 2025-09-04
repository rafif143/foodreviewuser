<script>
  export let websiteSlug = '';
  export let variant = 'horizontal';
  
  // Data iklan yang boleh disesuaikan
  let adData = {
    title: "Promosi Spesial",
    subtitle: "Dapatkan diskon hingga 50%",
    description: "Temui restoran dan kafe terbaik di Kelantan dengan harga istimewa",
    ctaText: "Lihat Promosi",
    ctaUrl: `/${websiteSlug}/advertise`,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=600&fit=crop"
  };
</script>

{#if variant === 'horizontal'}
  <!-- Ad Banner Section - Horizontal Version -->
  <section class="py-2 md:py-4 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Ad Banner -->
        <div class="relative overflow-hidden rounded-lg md:rounded-xl border border-gray-200 bg-white shadow-sm">
          <!-- Background Image with Overlay -->
          <div class="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=300&fit=crop"
              alt="Promo Banner"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          </div>
          
          <!-- Content -->
          <div class="relative z-10 p-3 md:p-6">
            <div class="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <!-- Text Content -->
              <div class="flex-1 space-y-1 md:space-y-2">
                <!-- Badge -->
                <div class="inline-flex items-center bg-yellow-400 px-2 md:px-3 py-1 rounded-full">
                  <span class="text-black text-xs font-medium">PROMOSI</span>
                </div>
                
                <!-- Title -->
                <h2 class="text-lg md:text-2xl font-bold text-white">
                  {adData.title}
                </h2>
                
                <!-- Subtitle -->
                <h3 class="text-xs md:text-lg text-yellow-200 font-medium">
                  {adData.subtitle}
                </h3>
                
                <!-- Description -->
                <p class="text-white/90 text-xs md:text-sm max-w-md">
                  {adData.description}
                </p>
              </div>
              
              <!-- CTA Button -->
              <div class="flex-shrink-0">
                <a 
                  href={adData.ctaUrl}
                  class="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-xs md:text-sm rounded-lg transition-colors duration-200"
                >
                  {adData.ctaText}
                  <svg class="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Bottom Border -->
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
        </div>
        
        <!-- Ad Disclaimer -->
        <div class="text-center mt-2">
          <p class="text-gray-500 text-xs">
            <span class="inline-flex items-center">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Iklan
            </span>
            • Kandungan promosi dari rakan kongsi kami
          </p>
        </div>
      </div>
    </div>
  </section>
{:else}
  <!-- Ad Banner Section - Vertical Version (Sidebar) -->
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-xs mx-auto">
    <!-- Background Image with Overlay -->
    <div class="relative h-80">
      <img 
        src={adData.image}
        alt="Promo Banner"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
      
      <!-- Badge -->
      <div class="absolute top-3 left-3">
        <div class="inline-flex items-center bg-yellow-400 px-2 py-1 rounded-full">
          <span class="text-black text-xs font-medium">PROMOSI</span>
        </div>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-4 space-y-3">
      <!-- Title -->
      <h3 class="text-lg font-bold text-gray-800 leading-tight">
        {adData.title}
      </h3>
      
      <!-- Subtitle -->
      <p class="text-orange-600 font-medium text-sm">
        {adData.subtitle}
      </p>
      
      <!-- Description -->
      <p class="text-gray-600 text-sm leading-relaxed">
        {adData.description}
      </p>
      
      <!-- CTA Button -->
      <a 
        href={adData.ctaUrl}
        class="block w-full text-center bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
      >
        {adData.ctaText}
      </a>
      
      <!-- Ad Disclaimer -->
      <div class="text-center pt-2 border-t border-gray-100">
        <p class="text-gray-400 text-xs">
          <span class="inline-flex items-center">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Iklan
          </span>
        </p>
      </div>
    </div>
  </div>
{/if}
