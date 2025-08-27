<script>
  import { page } from '$app/stores';
  import NavigationMenu from '$lib/components/NavigationMenu.svelte';
  import TrendingSidebar from '$lib/components/Sidebar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ArticleTags from '$lib/components/ArticleTags.svelte';

  import { addComment, getCommentsByArticle } from '$lib/comments';

  /** @type {import('./$types').PageData} */
  export let data;
  
  // Artikel yang sedang ditampilkan
  const article = data.article;
  // Artikel terkait
  const relatedArticles = data.relatedArticles;
  // Komentar awal dari load
  let comments = data.comments || [];
  let commenterName = '';
  let commentContent = '';
  let isSubmitting = false;
  let submitError = '';
  let submitSuccess = '';
  
  // Format tanggal dari ISO string ke format yang diinginkan
  function formatDate(isoString) {
    const date = new Date(isoString);
    const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  
  // Kategori yang diformat untuk tampilan
  function formatCategory(category) {
    return category.toUpperCase();
  }

  // Ambil slug dari URL
  $: websiteSlug = $page.params.slug || 'food';

  // Fungsi untuk memvalidasi URL gambar
  const validateImageUrl = (url) => {
    return url && typeof url === 'string' && url.startsWith('https://') 
      ? url 
      : 'https://via.placeholder.com/800x500'; // Fallback image
  };
  
  // Fungsi untuk merender konten dari database dengan support untuk format TipTap HTML dan JSON blocks
  function renderContent(content) {
    // Jika content adalah string, coba parse sebagai JSON terlebih dahulu
    if (typeof content === 'string') {
      try {
        // Coba parse sebagai JSON
        const parsedContent = JSON.parse(content);
        
        // Jika berhasil di-parse dan merupakan array, render sebagai JSON blocks
        if (Array.isArray(parsedContent)) {
          // Cek apakah ini format baru (dengan id, type, content, order, config)
          if (parsedContent.length > 0 && parsedContent[0].hasOwnProperty('type') && parsedContent[0].hasOwnProperty('order')) {
            return renderNewJsonBlocks(parsedContent);
          } else {
            // Format lama (tanpa id, order, config)
            return renderLegacyJsonBlocks(parsedContent);
          }
        }
      } catch (e) {
        // Jika bukan JSON, anggap sebagai HTML string dan format dengan TipTap
        return formatTipTapHtml(content);
      }
    }
    
    // Jika content langsung berupa array (format JSON blocks), gunakan logic yang sesuai
    if (Array.isArray(content)) {
      // Cek apakah ini format baru (dengan id, type, content, order, config)
      if (content.length > 0 && content[0].hasOwnProperty('type') && content[0].hasOwnProperty('order')) {
        return renderNewJsonBlocks(content);
      } else {
        // Format lama (tanpa id, order, config)
        return renderLegacyJsonBlocks(content);
      }
    }
    
    return '';
  }
  
  // Fungsi untuk memformat HTML dari TipTap dengan styling yang sesuai
  function formatTipTapHtml(htmlString) {
    if (!htmlString) return '';
    
    // Tambahkan styling CSS untuk elemen HTML dari TipTap
    let formattedHtml = htmlString
      // Styling untuk paragraf
      .replace(/<p>/g, '<p class="mb-6 leading-relaxed text-gray-700">')
      .replace(/<p style="text-align: left;">/g, '<p class="mb-6 leading-relaxed text-gray-700 text-left">')
      .replace(/<p style="text-align: center;">/g, '<p class="mb-6 leading-relaxed text-gray-700 text-center">')
      .replace(/<p style="text-align: right;">/g, '<p class="mb-6 leading-relaxed text-gray-700 text-right">')
      .replace(/<p style="text-align: justify;">/g, '<p class="mb-6 leading-relaxed text-gray-700 text-justify">')
      
      // Styling untuk heading
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8">')
      .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-gray-800 mb-6 mt-8">')
      .replace(/<h3>/g, '<h3 class="text-xl font-bold text-gray-800 mb-4 mt-6">')
      .replace(/<h4>/g, '<h4 class="text-lg font-bold text-gray-800 mb-3 mt-5">')
      .replace(/<h5>/g, '<h5 class="text-base font-bold text-gray-800 mb-2 mt-4">')
      .replace(/<h6>/g, '<h6 class="text-sm font-bold text-gray-800 mb-2 mt-3">')
      
      // Styling untuk strong/bold
      .replace(/<strong>/g, '<strong class="font-bold text-gray-900">')
      
      // Styling untuk em/italic
      .replace(/<em>/g, '<em class="italic text-gray-800">')
      
      // Styling untuk underline
      .replace(/<u>/g, '<u class="underline text-gray-800">')
      
      // Styling untuk mark/highlight
      .replace(/<mark>/g, '<mark class="bg-yellow-200 px-1 rounded text-gray-900">')
      
      // Styling untuk list
      .replace(/<ul>/g, '<ul class="mb-6 ml-6 space-y-2">')
      .replace(/<ol>/g, '<ol class="mb-6 ml-6 space-y-2">')
      .replace(/<li>/g, '<li class="text-gray-700">')
      
      // Styling untuk blockquote
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-red-500 pl-6 py-2 my-6 bg-red-50 italic text-gray-700">')
      
      // Styling untuk code
      .replace(/<code>/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">')
      
      // Styling untuk pre
      .replace(/<pre>/g, '<pre class="bg-gray-100 p-4 rounded-lg my-6 overflow-x-auto">')
      
      // Styling untuk link
      .replace(/<a>/g, '<a class="text-red-600 hover:text-red-700 underline">')
      
      // Styling untuk table
      .replace(/<table>/g, '<table class="w-full border-collapse border border-gray-300 my-6">')
      .replace(/<th>/g, '<th class="border border-gray-300 px-4 py-2 bg-gray-100 font-bold text-gray-800">')
      .replace(/<td>/g, '<td class="border border-gray-300 px-4 py-2 text-gray-700">');
    
    return formattedHtml;
  }
  
  // Fungsi untuk merender JSON blocks format baru (dengan id, type, content, order, config)
  function renderNewJsonBlocks(contentArray) {
    if (!contentArray || !Array.isArray(contentArray)) return '';
    
    // Urutkan berdasarkan order jika ada
    const sortedBlocks = [...contentArray].sort((a, b) => (a.order || 0) - (b.order || 0));
    
    return sortedBlocks.map((block, index) => {
      let html = '';
      
      switch (block.type) {
        case 'rich_text':
          // Rich text content dengan HTML support
          if (block.content) {
            // Apply styling untuk HTML content
            const formattedContent = block.content
              .replace(/<p>/g, '<p class="mb-6 leading-relaxed text-gray-700">')
              .replace(/<p style="text-align: left;">/g, '<p class="mb-6 leading-relaxed text-gray-700 text-left">')
              .replace(/<p style="text-align: center;">/g, '<p class="mb-6 leading-relaxed text-gray-700 text-center">')
              .replace(/<p style="text-align: right;">/g, '<p class="mb-6 leading-relaxed text-gray-700 text-right">')
              .replace(/<p style="text-align: justify;">/g, '<p class="mb-6 leading-relaxed text-gray-700 text-justify">')
              .replace(/<strong>/g, '<strong class="font-bold text-gray-900">')
              .replace(/<em>/g, '<em class="italic text-gray-800">')
              .replace(/<u>/g, '<u class="underline text-gray-800">')
              .replace(/<mark>/g, '<mark class="bg-yellow-200 px-1 rounded text-gray-900">')
              .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8">')
              .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-gray-800 mb-6 mt-8">')
              .replace(/<h3>/g, '<h3 class="text-xl font-bold text-gray-800 mb-4 mt-6">')
              .replace(/<h4>/g, '<h4 class="text-lg font-bold text-gray-800 mb-3 mt-5">')
              .replace(/<h5>/g, '<h5 class="text-base font-bold text-gray-800 mb-2 mt-4">')
              .replace(/<h6>/g, '<h6 class="text-sm font-bold text-gray-800 mb-2 mt-3">')
              .replace(/<ul>/g, '<ul class="mb-6 ml-6 space-y-2">')
              .replace(/<ol>/g, '<ol class="mb-6 ml-6 space-y-2">')
              .replace(/<li>/g, '<li class="text-gray-700">')
              .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-red-500 pl-6 py-2 my-6 bg-red-50 italic text-gray-700">')
              .replace(/<code>/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">')
              .replace(/<pre>/g, '<pre class="bg-gray-100 p-4 rounded-lg my-6 overflow-x-auto">')
              .replace(/<a>/g, '<a class="text-red-600 hover:text-red-700 underline">')
              .replace(/<table>/g, '<table class="w-full border-collapse border border-gray-300 my-6">')
              .replace(/<th>/g, '<th class="border border-gray-300 px-4 py-2 bg-gray-100 font-bold text-gray-800">')
              .replace(/<td>/g, '<td class="border border-gray-300 px-4 py-2 text-gray-700">');
            
            // Jika konten sudah berupa elemen block (p, h1-h6, ul, ol, blockquote, pre, table), 
            // tidak perlu dibungkus dengan div lagi
            if (formattedContent.trim().match(/^<(p|h[1-6]|ul|ol|blockquote|pre|table)/i)) {
              html = formattedContent;
            } else {
              html = `<div class="mb-6 leading-relaxed text-gray-700">${formattedContent}</div>`;
            }
          }
          break;
          
        case 'image':
          // Image content
          if (block.content) {
            const config = block.config || {};
            const alt = config.alt || '';
            const caption = config.caption || '';
            
            html = `
              <figure class="my-8">
                <img src="${validateImageUrl(block.content)}" alt="${alt}" class="w-full rounded-lg shadow-md">
                ${caption ? `<figcaption class="text-sm text-gray-600 mt-2 text-center">${caption}</figcaption>` : ''}
              </figure>
            `;
          }
          break;
          
        case 'subtitle':
          // Sub judul dengan margin bottom yang besar agar ada jarak dengan konten berikutnya
          html = `<h2 class="text-2xl font-bold text-gray-800 mb-6 mt-8">${block.content}</h2>`;
          break;
          
        case 'text':
          // Teks dengan margin bottom yang cukup dan support HTML formatting
          const formattedContent = block.content
            .replace(/\n/g, '<br>')
            .replace(/<strong>/g, '<strong class="font-bold text-gray-900">')
            .replace(/<em>/g, '<em class="italic text-gray-800">')
            .replace(/<mark>/g, '<mark class="bg-yellow-200 px-1 rounded text-gray-900">');
          
          html = `<div class="mb-6 leading-relaxed text-gray-700">${formattedContent}</div>`;
          break;
          
        case 'subpoint':
          // Sub point dengan margin yang sesuai
          html = `<div class="mb-6 ml-4">• ${block.content}</div>`;
          break;
          
        default:
          // Fallback untuk tipe konten lain
          html = `<div class="mb-4">${block.content || ''}</div>`;
      }
      
      // Tambahkan extra spacing jika ini adalah block terakhir atau jika block berikutnya adalah subtitle
      const nextBlock = sortedBlocks[index + 1];
      if (nextBlock && nextBlock.type === 'subtitle') {
        html += '<div class="mb-8"></div>'; // Extra spacing sebelum subtitle
      }
      
      return html;
    }).join('');
  }
  
  // Fungsi untuk merender JSON blocks format lama
  function renderLegacyJsonBlocks(contentArray) {
    if (!contentArray || !Array.isArray(contentArray)) return '';
    
    return contentArray.map((block, index) => {
      let html = '';
      
      switch (block.type) {
        case 'subtitle':
          // Sub judul dengan margin bottom yang besar agar ada jarak dengan konten berikutnya
          html = `<h2 class="text-2xl font-bold text-gray-800 mb-6 mt-8">${block.content}</h2>`;
          break;
          
        case 'text':
          // Teks dengan margin bottom yang cukup dan support HTML formatting
          // Convert line breaks to <br> tags dan render HTML content
          const formattedContent = block.content
            .replace(/\n/g, '<br>')
            .replace(/<strong>/g, '<strong class="font-bold text-gray-900">')
            .replace(/<em>/g, '<em class="italic text-gray-800">')
            .replace(/<mark>/g, '<mark class="bg-yellow-200 px-1 rounded text-gray-900">');
          
          html = `<div class="mb-6 leading-relaxed text-gray-700">${formattedContent}</div>`;
          break;
          
        case 'image':
          // Gambar dengan margin yang seimbang
          if (block.image_url) {
            html = `
              <figure class="my-8">
                <img src="${validateImageUrl(block.image_url)}" alt="${block.image_alt || ''}" class="w-full rounded-lg shadow-md">
                ${block.image_alt ? `<figcaption class="text-sm text-gray-600 mt-2 text-center">${block.image_alt}</figcaption>` : ''}
              </figure>
            `;
          }
          break;
          
        case 'subpoint':
          // Sub point dengan margin yang sesuai
          html = `<div class="mb-6 ml-4">• ${block.content}</div>`;
          break;
          
        default:
          // Fallback untuk tipe konten lain
          html = `<div class="mb-4">${block.content || ''}</div>`;
      }
      
      // Tambahkan extra spacing jika ini adalah block terakhir atau jika block berikutnya adalah subtitle
      const nextBlock = contentArray[index + 1];
      if (nextBlock && nextBlock.type === 'subtitle') {
        html += '<div class="mb-8"></div>'; // Extra spacing sebelum subtitle
      }
      
      return html;
    }).join('');
  }

  async function refreshComments() {
    comments = await getCommentsByArticle(article.id);
  }

  async function handleSubmitComment(event) {
    event.preventDefault();
    submitError = '';
    submitSuccess = '';

    const name = commenterName?.trim();
    const content = commentContent?.trim();
    if (!name || !content) {
      submitError = 'Nama dan komentar wajib diisi.';
      return;
    }
    if (content.length > 1000) {
      submitError = 'Komentar terlalu panjang (maksimal 1000 karakter).';
      return;
    }

    isSubmitting = true;
    const ok = await addComment(article.id, name, content);
    isSubmitting = false;

    if (!ok) {
      submitError = 'Gagal mengirim komentar. Coba lagi.';
      return;
    }

    commenterName = '';
    commentContent = '';
    submitSuccess = 'Komentar terkirim!';
    await refreshComments();
  }
</script>

<svelte:head>
  <title>{article?.title || 'Article Not Found'} - {websiteSlug.charAt(0).toUpperCase() + websiteSlug.slice(1)}</title>
  <meta name="description" content="{article?.summary || `Read the full article: ${article?.title || 'Article Not Found'}`}" />
</svelte:head>


<main class="bg-gray-50 min-h-screen">
  {#if article}
    <div class="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <!-- Breadcrumb -->
      <nav class="mb-6">
        <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-600">
          <li><a href="/" class="hover:text-primary-500 transition-colors">Home</a></li>
          <li class="text-gray-400">/</li>
          <li>
            <a href="/{websiteSlug}" class="hover:text-primary-500 transition-colors">
              {formatCategory(article.category)}
            </a>
          </li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-800 font-medium">{article.title}</li>
        </ol>
      </nav>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <article class="bg-white rounded-none shadow-none p-4 sm:rounded-lg sm:shadow-sm sm:p-6 lg:p-8">
            <!-- Article Header -->
            <header class="mb-8">
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                {article.title}
              </h1>
              
              <!-- Social Share Icons -->
              <div class="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
                <button 
                  class="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button 
                  class="w-9 h-9 sm:w-10 sm:h-10 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="Share on Pinterest"
                >
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </button>
                <button 
                  class="w-9 h-9 sm:w-10 sm:h-10 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
                  aria-label="Share on Telegram"
                >
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                </button>
                <button 
                  class="w-9 h-9 sm:w-10 sm:h-10 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
                  aria-label="Share on Instagram"
                >
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>
              </div>
              
              <!-- Article Meta -->
              <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-gray-600">
                <span class="font-medium">BY {article.author}</span>
                <span class="text-gray-400 hidden sm:inline">•</span>
                <span>{formatDate(article.published_at)}</span>
                <span class="text-gray-400 hidden sm:inline">•</span>
                <span class="tag">{formatCategory(article.category)}</span>
                <span class="text-gray-400 hidden sm:inline">•</span>
                <span>{article.minute_read} min read</span>
              </div>
              

            </header>

            <!-- Main Image -->
            <div class="mb-6 sm:mb-8">
              <img 
                src={validateImageUrl(article.main_image)}
                alt={article.title}
                class="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg shadow-md"
                on:error={(e) => e.target.src = 'https://via.placeholder.com/800x500'}
              />
            </div>

            <!-- Article Content -->
            <div class="prose prose-base sm:prose-lg max-w-none">
              {@html renderContent(article.content)}
            </div>

            <!-- Article Tags -->
            {#if article.tags && article.tags.length > 0}
              <div class="mt-8 pt-6 border-t border-gray-200">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Tags:</h3>
                <ArticleTags tags={article.tags} />
              </div>
            {/if}

            <!-- Back to Articles Button -->
            <div class="mt-12 pt-8 border-t border-gray-200">
              <a 
                href="/{websiteSlug}" 
                class="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Back to Articles</span>
              </a>
            </div>
          </article>
          
          <!-- Comments Section -->
          <section class="mt-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Komentar</h2>
            <!-- Comment List -->
            {#if comments && comments.length > 0}
              <ul class="space-y-4 mb-8">
                {#each comments as c}
                  <li class="bg-white rounded-lg shadow-sm p-4">
                    <div class="flex items-center justify-between mb-2">
                      <span class="font-semibold text-gray-800">{c.author_name}</span>
                      <span class="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</span>
                    </div>
                    <p class="text-gray-700 whitespace-pre-line">{c.content}</p>
                  </li>
                {/each}
              </ul>
            {:else}
              <p class="text-gray-600 mb-8">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
            {/if}

            <!-- Comment Form -->
            <form class="bg-white rounded-lg shadow-sm p-6" on:submit|preventDefault={handleSubmitComment}>
              {#if submitError}
                <div class="mb-4 text-red-600 text-sm">{submitError}</div>
              {/if}
              {#if submitSuccess}
                <div class="mb-4 text-green-600 text-sm">{submitSuccess}</div>
              {/if}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="commenter-name" class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                  <input
                    type="text"
                    id="commenter-name"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Nama Anda"
                    bind:value={commenterName}
                    maxlength="100"
                    required
                  />
                </div>
              </div>
              <div class="mb-4">
                <label for="comment-content" class="block text-sm font-medium text-gray-700 mb-1">Komentar</label>
                <textarea
                  id="comment-content"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows="4"
                  placeholder="Tulis komentar Anda di sini..."
                  bind:value={commentContent}
                  maxlength="1000"
                  required
                ></textarea>
              </div>
              <button
                class="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-60"
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {#if isSubmitting}
                  <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Mengirim...
                {:else}
                  Kirim Komentar
                {/if}
              </button>
            </form>
          </section>
          
          <!-- Related Articles -->
          <section class="mt-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Artikel Terkait</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {#each relatedArticles as relatedArticle}
                <a href="/{websiteSlug}/article/{relatedArticle.slug || relatedArticle.id}" class="group">
                  <article class="bg-white rounded-lg shadow-sm overflow-hidden transition-transform transform hover:scale-105">
                    <div class="relative h-48">
                      <img src="{validateImageUrl(relatedArticle.thumbnail_image)}" alt="{relatedArticle.title}" class="w-full h-full object-cover">
                      <div class="absolute top-0 left-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 m-2 rounded">
                        {formatCategory(relatedArticle.category)}
                      </div>
                    </div>
                    
                    <div class="p-4">
                      <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-500 transition-colors">
                        {relatedArticle.title}
                      </h3>
                      
                      <div class="flex items-center text-xs text-gray-500 mb-2">
                        <span>{relatedArticle.author}</span>
                        <span class="mx-2">•</span>
                        <span>{formatDate(relatedArticle.published_at)}</span>
                        <span class="mx-2">•</span>
                        <span>{relatedArticle.minute_read} min read</span>
                      </div>
                    </div>
                  </article>
                </a>
              {/each}
            </div>
          </section>
        </div>
        
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <TrendingSidebar articles={data.trendingArticles} />
        </div>
      </div>
    </div>
  {:else}
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-sm p-8 text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
        <p class="text-gray-600 mb-6">Sorry, the article you're looking for doesn't exist.</p>
        <a 
          href="/{websiteSlug}" 
          class="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Back to Articles</span>
        </a>
      </div>
    </div>
  {/if}
</main>



<style>
  .tag {
    background-color: rgb(254 242 242);
    color: rgb(220 38 38);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .prose {
    color: rgb(55 65 81);
  }

</style>
