<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase.js';
  import { page } from '$app/stores';

  let contactData = null;
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const slug = $page.params.slug;
      
      // Get website ID from slug
      const { data: website, error: websiteError } = await supabase
        .from('websites')
        .select('id')
        .eq('slug', slug)
        .single();

      if (websiteError) {
        console.error('Error fetching website:', websiteError);
        error = 'Website tidak ditemukan';
        loading = false;
        return;
      }

      // Get contact data
      const { data, error: contactError } = await supabase
        .from('contact')
        .select('*')
        .eq('website_id', website.id)
        .single();

      if (contactError) {
        if (contactError.code === 'PGRST116') { // No rows returned
          // Use default data
          contactData = {
            page_title: "Hubungi Kami",
            page_description: "Kami siap membantu Anda. Hubungi kami untuk pertanyaan, saran, atau kolaborasi.",
            email: "info@kelantanfood.com",
            form: {
              subject_options: [
                { label: "Pilih subjek", value: "" },
                { label: "Pertanyaan Umum", value: "general" },
                { label: "Saran Review", value: "review" },
                { label: "Kolaborasi", value: "collaboration" },
                { label: "Iklan", value: "advertising" },
                { label: "Masalah Teknis", value: "technical" },
                { label: "Lainnya", value: "other" }
              ]
            },
            contact_info: {
              title: "Informasi Kontak",
              items: [
                {
                  type: "Alamat",
                  value: ["Jalan Kelantan, Georgetown", "Kelantan, Malaysia 10000"],
                  icon_name: "location"
                },
                {
                  type: "Telepon",
                  value: ["+60 4-123 4567", "+60 12-345 6789"],
                  icon_name: "phone"
                },
                {
                  type: "Email",
                  value: ["info@kelantanfood.com", "hello@kelantanfood.com"],
                  icon_name: "email"
                },
                {
                  type: "Jam Kerja",
                  value: ["Senin - Jumat: 9:00 AM - 6:00 PM", "Sabtu: 10:00 AM - 4:00 PM", "Minggu: Tutup"],
                  icon_name: "clock"
                }
              ]
            },
                         social_media: {
               title: "Ikuti Kami",
               description: "Ikuti kami di media sosial untuk mendapatkan update terbaru tentang review makanan, resep, dan acara kuliner.",
               platforms: [
                 {
                   url: "#",
                   icon_name: "facebook",
                   is_active: true
                 },
                 {
                   url: "#",
                   icon_name: "x",
                   is_active: true
                 },
                 {
                   url: "#",
                   icon_name: "instagram",
                   is_active: true
                 },
                 {
                   url: "#",
                   icon_name: "youtube",
                   is_active: true
                 },
                 {
                   url: "#",
                   icon_name: "whatsapp",
                   is_active: false
                 },
                 {
                   url: "#",
                   icon_name: "pinterest",
                   is_active: false
                 },
                 {
                   url: "#",
                   icon_name: "tiktok",
                   is_active: false
                 }
               ]
             },
            faq: {
              title: "Pertanyaan Umum",
              description: "Jawaban untuk pertanyaan yang sering diajukan oleh pengunjung kami",
              items: [
                {
                  question: "Bagaimana cara submit review restoran?",
                  answer: "Anda dapat mengirimkan review melalui form kontak di atas atau email kami langsung. Tim kami akan menghubungi Anda untuk langkah selanjutnya.",
                  gradient: { from: "red-600", to: "red-700" },
                  icon_name: "question"
                },
                {
                  question: "Apakah Anda menerima kolaborasi?",
                  answer: "Ya, kami terbuka untuk berbagai jenis kolaborasi. Silakan hubungi kami untuk membicarakan detail lebih lanjut.",
                  gradient: { from: "orange-600", to: "red-600" },
                  icon_name: "collaboration"
                },
                {
                  question: "Berapa lama waktu respons email?",
                  answer: "Kami biasanya merespons dalam 24-48 jam kerja. Untuk pertanyaan mendesak, silakan hubungi kami via telepon.",
                  gradient: { from: "red-600", to: "orange-600" },
                  icon_name: "clock"
                }
              ]
            },
            map: {
              title: "Lokasi Kami",
              description: "Kunjungi kantor kami di Georgetown, Kelantan untuk bertemu langsung dengan tim kami",
              iframe_src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8199999999997!2d100.3354!3d5.4164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac3c49ce76e31%3A0xfccd80681e2ab7d0!2sGeorgetown%2C%20Kelantan%2C%20Malaysia!5e0!3m2!1sen!2sid!4v1234567890"
            }
          };
        } else {
          console.error('Error fetching contact data:', contactError);
          error = 'Gagal memuat data kontak';
        }
      } else {
        contactData = data;
      }
      
      loading = false;
    } catch (err) {
      console.error('Error:', err);
      error = 'Terjadi kesalahan saat memuat halaman';
      loading = false;
    }
  });

  // Icon SVGs
  const iconSvgs = {
    location: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>',
    phone: '<path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>',
    email: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
    clock: '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>',
    question: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>',
    collaboration: '<path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-3.7 3.7c-.39.39-1.02.39-1.41 0L6.01 9C5.54 8.37 4.8 8 4 8H1.46c-.8 0-1.54.37-2.01 1L-3 16.5V22h2.5l2.54-7.63A1.5 1.5 0 0 1 5.46 14H7v8h2v-8h1.5l2.54 7.63A1.5 1.5 0 0 0 14.54 22H16v-8h1.5l2.54 7.63A1.5 1.5 0 0 0 21.54 22H24v-8h-4z"/>',
    facebook: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
    x: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    instagram: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>',
    linkedin: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
    youtube: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
    whatsapp: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>',
    pinterest: '<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-7.83 9.781c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>',
    tiktok: '<path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>'
  };

     function getIconSvg(iconName) {
     return iconSvgs[iconName] || iconSvgs.question;
   }

   function getPlatformDisplayName(iconName) {
     const platformNames = {
       'facebook': 'Facebook',
       'x': 'X',
       'instagram': 'Instagram',
       'youtube': 'YouTube',
       'whatsapp': 'WhatsApp',
       'pinterest': 'Pinterest',
       'tiktok': 'TikTok',
       'linkedin': 'LinkedIn',
       'globe': 'Website'
     };
     return platformNames[iconName] || iconName;
   }
</script>

{#if loading}
  <div class="flex justify-center items-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
{:else if error}
  <div class="text-center py-12">
    <p class="text-red-600">{error}</p>
  </div>
{:else if contactData}
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">{contactData.page_title}</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">{contactData.page_description}</p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
          <form class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                {#each contactData.form.subject_options || [] as option}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
              <textarea rows="5" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>
            
            <button type="submit" class="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors">
              Kirim Pesan
            </button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="space-y-8">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">{contactData.contact_info.title}</h2>
            <div class="space-y-6">
              {#each contactData.contact_info.items || [] as item}
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      {@html getIconSvg(item.icon_name)}
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">{item.type}</h3>
                    <div class="mt-1 space-y-1">
                      {#each item.value || [] as value}
                        <p class="text-gray-600">{value}</p>
                      {/each}
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>

                     <!-- Social Media -->
           <div class="bg-white rounded-lg shadow-lg p-8">
             <h2 class="text-2xl font-bold text-gray-900 mb-2">{contactData.social_media.title}</h2>
             <p class="text-gray-600 mb-6">{contactData.social_media.description}</p>
             <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
               {#each contactData.social_media.platforms || [] as platform}
                 {#if platform.is_active}
                   <a href={platform.url} target="_blank" rel="noopener noreferrer" 
                      class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                     <div class="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-2">
                       <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                         {@html getIconSvg(platform.icon_name)}
                       </svg>
                     </div>
                     <span class="text-sm font-medium text-gray-900">{getPlatformDisplayName(platform.icon_name)}</span>
                   </a>
                 {/if}
               {/each}
             </div>
           </div>
        </div>
      </div>

      <!-- FAQ Section -->
      {#if contactData.faq && contactData.faq.items && contactData.faq.items.length > 0}
        <div class="mt-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">{contactData.faq.title}</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">{contactData.faq.description}</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each contactData.faq.items as item}
              <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-{item.gradient.from} to-{item.gradient.to} rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {@html getIconSvg(item.icon_name)}
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p class="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Map Section -->
      {#if contactData.map && contactData.map.iframe_src}
        <div class="mt-16">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">{contactData.map.title}</h2>
            <p class="text-xl text-gray-600">{contactData.map.description}</p>
          </div>
          
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe 
              src={contactData.map.iframe_src}
              width="100%" 
              height="450" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}