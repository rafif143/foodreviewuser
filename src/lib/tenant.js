import { supabase, isSupabaseConfigured } from './supabase';

// ID laman web lalai - TUKAR NOMBOR INI UNTUK UBAH SEMUA KONFIGURASI
export const DEFAULT_WEBSITE_ID = 9; // Tukar nombor ini untuk tukar tenant

// NO CACHE - Always fetch fresh data

// Konfigurasi lengkap untuk setiap laman web/tenant
export const TENANT_CONFIG = {
  1: {
    // Maklumat Asas
    id: 1,
    name: "MakanKelantan",
    slug: "kelantan",
    description: "Panduan makanan terbaik di Kelantan - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Kelantan",
    logo_url: null,
    
    // Konfigurasi SEO
    seo: {
      title: "MakanKelantan - Panduan Makanan Terbaik di Kelantan",
      keywords: "makan kelantan, restoran kelantan, makanan tradisional kelantan, nasi lemak, satay, laksa, makanan kelantan, tempat makan kelantan, makankelantan, ulasan makanan kelantan, tempat makan sedap kelantan",
      author: "Pasukan MakanKelantan",
      themeColor: "#dc2626",
      twitterSite: "@MakanKelantan",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    
    // Konfigurasi Lokasi
    location: {
      region: "MY-03",
      placename: "Kelantan",
      coordinates: "6.1254;102.2386",
      icbm: "6.1254, 102.2386"
    },
    
    // Konfigurasi Domain
    domain: "https://makankelantan.com"
  },
  
  2: {
    id: 2,
    name: "MakanKedah",
    slug: "kedah",
    description: "Panduan makanan terbaik di Kedah - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Kedah",
    logo_url: null,
    seo: {
      title: "MakanKedah - Panduan Makanan Terbaik di Kedah",
      keywords: "makan kedah, restoran kedah, makanan tradisional kedah, makanan kedah, tempat makan kedah",
      author: "Pasukan MakanKedah",
      themeColor: "#dc2626",
      twitterSite: "@MakanKedah",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-02",
      placename: "Kedah",
      coordinates: "6.1184;100.3685",
      icbm: "6.1184, 100.3685"
    },
    domain: "https://makankedah.com"
  },
  
  3: {
    id: 3,
    name: "MakanPenang",
    slug: "penang",
    description: "Panduan makanan terbaik di Penang - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Penang",
    logo_url: null,
    seo: {
      title: "MakanPenang - Panduan Makanan Terbaik di Penang",
      keywords: "makan penang, restoran penang, makanan tradisional penang, char kway teow, assam laksa, makanan penang, tempat makan penang",
      author: "Pasukan MakanPenang",
      themeColor: "#dc2626",
      twitterSite: "@MakanPenang",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-07",
      placename: "Penang",
      coordinates: "5.4164;100.3327",
      icbm: "5.4164, 100.3327"
    },
    domain: "https://makan-penang.com"
  },
  
  4: {
    id: 4,
    name: "MakanPerak",
    slug: "perak",
    description: "Panduan makanan terbaik di Perak - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Perak",
    logo_url: null,
    seo: {
      title: "MakanPerak - Panduan Makanan Terbaik di Perak",
      keywords: "makan perak, restoran perak, makanan tradisional perak, makanan perak, tempat makan perak",
      author: "Pasukan MakanPerak",
      themeColor: "#dc2626",
      twitterSite: "@MakanPerak",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-08",
      placename: "Perak",
      coordinates: "4.5921;101.0901",
      icbm: "4.5921, 101.0901"
    },
    domain: "https://makanperak.com"
  },
  
  5: {
    id: 5,
    name: "MakanPerlis",
    slug: "perlis",
    description: "Panduan makanan terbaik di Perlis - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Perlis",
    logo_url: null,
    seo: {
      title: "MakanPerlis - Panduan Makanan Terbaik di Perlis",
      keywords: "makan perlis, restoran perlis, makanan tradisional perlis, makanan perlis, tempat makan perlis",
      author: "Pasukan MakanPerlis",
      themeColor: "#dc2626",
      twitterSite: "@MakanPerlis",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-09",
      placename: "Perlis",
      coordinates: "6.4414;100.1986",
      icbm: "6.4414, 100.1986"
    },
    domain: "https://makanperlis.com"
  },
  
  6: {
    id: 6,
    name: "MakanTerengganu",
    slug: "terengganu",
    description: "Panduan makanan terbaik di Terengganu - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Terengganu",
    logo_url: null,
    seo: {
      title: "MakanTerengganu - Panduan Makanan Terbaik di Terengganu",
      keywords: "makan terengganu, restoran terengganu, makanan tradisional terengganu, keropok lekor, makanan terengganu, tempat makan terengganu",
      author: "Pasukan MakanTerengganu",
      themeColor: "#dc2626",
      twitterSite: "@MakanTerengganu",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-11",
      placename: "Terengganu",
      coordinates: "5.3117;103.1324",
      icbm: "5.3117, 103.1324"
    },
    domain: "https://makanterengganu.com"
  },
  
  7: {
    id: 7,
    name: "MakanPahang",
    slug: "pahang",
    description: "Panduan makanan terbaik di Pahang - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Pahang",
    logo_url: null,
    seo: {
      title: "MakanPahang - Panduan Makanan Terbaik di Pahang",
      keywords: "makan pahang, restoran pahang, makanan tradisional pahang, makanan pahang, tempat makan pahang",
      author: "Pasukan MakanPahang",
      themeColor: "#dc2626",
      twitterSite: "@MakanPahang",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-06",
      placename: "Pahang",
      coordinates: "3.8126;103.3256",
      icbm: "3.8126, 103.3256"
    },
    domain: "https://makanpahang.com"
  },
  
  8: {
    id: 8,
    name: "MakanKualaLumpur",
    slug: "kualalumpur",
    description: "Panduan makanan terbaik di Kuala Lumpur - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Kuala Lumpur",
    logo_url: null,
    seo: {
      title: "MakanKualaLumpur - Panduan Makanan Terbaik di Kuala Lumpur",
      keywords: "makan kuala lumpur, restoran kl, makanan tradisional kuala lumpur, makanan kl, tempat makan kuala lumpur",
      author: "Pasukan MakanKualaLumpur",
      themeColor: "#dc2626",
      twitterSite: "@MakanKL",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-14",
      placename: "Kuala Lumpur",
      coordinates: "3.1390;101.6869",
      icbm: "3.1390, 101.6869"
    },
    domain: "https://makankualalumpur.com"
  },
  
  9: {
    id: 9,
    name: "MakanSelangor",
    slug: "selangor",
    description: "Panduan makanan terbaik di Selangor - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Selangor",
    logo_url: null,
    seo: {
      title: "MakanSelangor - Panduan Makanan Terbaik di Selangor",
      keywords: "makan selangor, restoran selangor, makanan tradisional selangor, makanan selangor, tempat makan selangor",
      author: "Pasukan MakanSelangor",
      themeColor: "#dc2626",
      twitterSite: "@MakanSelangor",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-10",
      placename: "Selangor",
      coordinates: "3.0738;101.5183",
      icbm: "3.0738, 101.5183"
    },
    domain: "https://makanselangor.com"
  },
  
  10: {
    id: 10,
    name: "MakanJohor",
    slug: "johor",
    description: "Panduan makanan terbaik di Johor - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Johor",
    logo_url: null,
    seo: {
      title: "MakanJohor - Panduan Makanan Terbaik di Johor",
      keywords: "makan johor, restoran johor, makanan tradisional johor, laksa johor, makanan johor, tempat makan johor",
      author: "Pasukan MakanJohor",
      themeColor: "#dc2626",
      twitterSite: "@MakanJohor",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-01",
      placename: "Johor",
      coordinates: "1.4927;103.7414",
      icbm: "1.4927, 103.7414"
    },
    domain: "https://makanjohor.com"
  },
  
  11: {
    id: 11,
    name: "MakanMelaka",
    slug: "melaka",
    description: "Panduan makanan terbaik di Melaka - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Melaka",
    logo_url: null,
    seo: {
      title: "MakanMelaka - Panduan Makanan Terbaik di Melaka",
      keywords: "makan melaka, restoran melaka, makanan tradisional melaka, chicken rice ball, makanan melaka, tempat makan melaka",
      author: "Pasukan MakanMelaka",
      themeColor: "#dc2626",
      twitterSite: "@MakanMelaka",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-04",
      placename: "Melaka",
      coordinates: "2.1896;102.2501",
      icbm: "2.1896, 102.2501"
    },
    domain: "https://makanmelaka.com"
  },
  
  12: {
    id: 12,
    name: "MakanNegeriSembilan",
    slug: "negerisembilan",
    description: "Panduan makanan terbaik di Negeri Sembilan - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Negeri Sembilan",
    logo_url: null,
    seo: {
      title: "MakanNegeriSembilan - Panduan Makanan Terbaik di Negeri Sembilan",
      keywords: "makan negeri sembilan, restoran negeri sembilan, makanan tradisional negeri sembilan, makanan negeri sembilan, tempat makan negeri sembilan",
      author: "Pasukan MakanNegeriSembilan",
      themeColor: "#dc2626",
      twitterSite: "@MakanNS",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-05",
      placename: "Negeri Sembilan",
      coordinates: "2.7297;101.9381",
      icbm: "2.7297, 101.9381"
    },
    domain: "https://makannegerisembilan.com"
  },
  
  13: {
    id: 13,
    name: "MakanSabah",
    slug: "sabah",
    description: "Panduan makanan terbaik di Sabah - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Sabah",
    logo_url: null,
    seo: {
      title: "MakanSabah - Panduan Makanan Terbaik di Sabah",
      keywords: "makan sabah, restoran sabah, makanan tradisional sabah, hinava, makanan sabah, tempat makan sabah",
      author: "Pasukan MakanSabah",
      themeColor: "#dc2626",
      twitterSite: "@MakanSabah",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-12",
      placename: "Sabah",
      coordinates: "5.9788;116.0753",
      icbm: "5.9788, 116.0753"
    },
    domain: "https://makansabah.com"
  },
  
  14: {
    id: 14,
    name: "MakanSarawak",
    slug: "sarawak",
    description: "Panduan makanan terbaik di Sarawak - Cari tempat makan terbaik, resipi tradisional, dan ulasan restoran di Sarawak",
    logo_url: null,
    seo: {
      title: "MakanSarawak - Panduan Makanan Terbaik di Sarawak",
      keywords: "makan sarawak, restoran sarawak, makanan tradisional sarawak, nasi lemak, satay, laksa, makanan sarawak, tempat makan sarawak, makansarawak, ulasan makanan sarawak, tempat makan sedap sarawak",
      author: "Pasukan MakanSarawak",
      themeColor: "#dc2626",
      twitterSite: "@MakanSarawak",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    location: {
      region: "MY-13",
      placename: "Sarawak",
      coordinates: "1.5533;110.3593",
      icbm: "1.5533, 110.3593"
    },
    domain: "https://makansarawak.com"
  }
};

// Helper untuk dapatkan konfigurasi tenant semasa
export function getCurrentTenantConfig() {
  // Set window.tenantId untuk app.html
  if (typeof window !== 'undefined') {
    window.tenantId = DEFAULT_WEBSITE_ID;
  }
  return TENANT_CONFIG[DEFAULT_WEBSITE_ID] || TENANT_CONFIG[1];
}

/**
 * Dapatkan data laman web dari database berdasarkan ID
 * @param {number} id - ID laman web
 * @returns {Promise<Object>} - Data laman web dari database
 */
export async function getWebsiteById(id = DEFAULT_WEBSITE_ID) {
  // NO CACHE - Always fetch fresh data

  // Gunakan konfigurasi terpusat sebagai fallback
  const fallbackData = Object.fromEntries(
    Object.entries(TENANT_CONFIG).map(([id, config]) => [
      id,
      {
        id: config.id,
        name: config.name,
        slug: config.slug,
        description: config.description,
        logo_url: config.logo_url
      }
    ])
  );

  // Sekarang semua guna TENANT_CONFIG yang konsisten

  // Jika Supabase tak dikonfigurasi, guna data fallback
  if (!isSupabaseConfigured) {
    console.warn('Supabase tak dikonfigurasi, guna data fallback');
    const fallback = fallbackData[id] || {
      id: id,
      name: `Website ${id}`,
      slug: `website-${id}`,
      description: `Panduan kuliner terbaik di Website ${id}`,
      logo_url: null
    };
    // NO CACHE
    return fallback;
  }

  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('id', id);

    if (error) {
      console.warn(`Database error fetching website by ID ${id}:`, error.message);
      // Gunakan fallback data
      const fallback = fallbackData[id] || {
        id: id,
        name: `Website ${id}`,
        slug: `website-${id}`,
        description: `Panduan kuliner terbaik di Website ${id}`,
        logo_url: null
      };
      // NO CACHE
      return fallback;
    }

    // Jika tidak ada data ditemukan
    if (!data || data.length === 0) {
      console.warn(`No website found with ID ${id}, using fallback data`);
      const fallback = fallbackData[id] || {
        id: id,
        name: `Website ${id}`,
        slug: `website-${id}`,
        description: null,
        logo_url: null
      };
      // NO CACHE
      return fallback;
    }

    // Ambil data pertama
    const website = data[0];
    
    // Simpan ke cache
      // NO CACHE
    return website;
  } catch (error) {
    console.warn(`Unexpected error fetching website by ID ${id}:`, error.message);
    // Gunakan fallback data
    const fallback = fallbackData[id] || {
      id: id,
      name: `Website ${id}`,
      slug: `website-${id}`,
      description: null,
      logo_url: null
    };
    // NO CACHE
    return fallback;
  }
}

/**
 * Mendapatkan data website dari database berdasarkan slug
 * @param {string} slug - Slug website
 * @returns {Promise<Object>} - Data website dari database
 */
export async function getWebsiteBySlug(slug) {
  // Validasi input
  if (!slug || typeof slug !== 'string') {
    console.warn('Invalid slug provided to getWebsiteBySlug:', slug);
    return await getWebsiteById(DEFAULT_WEBSITE_ID);
  }

  // Jika Supabase tidak dikonfigurasi, gunakan konfigurasi terpusat
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured, using tenant config for slug:', slug);
    
    // Buat mapping dari slug ke config
    const slugToConfig = Object.fromEntries(
      Object.values(TENANT_CONFIG).map(config => [config.slug, {
        id: config.id,
        name: config.name,
        slug: config.slug,
        description: config.description,
        logo_url: config.logo_url
      }])
    );
    
    const website = slugToConfig[slug] || getCurrentTenantConfig();
    // NO CACHE
    return website;
  }

  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('slug', slug);

    // Handle error atau data kosong
    if (error) {
      console.warn(`Database error fetching website by slug "${slug}":`, error.message);
      return await getWebsiteById(DEFAULT_WEBSITE_ID);
    }

    // Jika tidak ada data ditemukan
    if (!data || data.length === 0) {
      // Hanya log jika bukan favicon request
      if (!slug.includes('favicon')) {
        console.warn(`No website found with slug "${slug}", using tenant config fallback`);
      }
      // Gunakan konfigurasi tenant saat ini sebagai fallback
      return getCurrentTenantConfig();
    }

    // Ambil data pertama jika ada multiple results
    const website = data[0];
    
    // Simpan ke cache
    // NO CACHE
    return website;
  } catch (error) {
    console.warn(`Unexpected error fetching website by slug "${slug}":`, error.message);
    // Fallback ke konfigurasi tenant saat ini
    return getCurrentTenantConfig();
  }
}

/**
 * Mendapatkan semua website dari database
 * @returns {Promise<Array>} - Array berisi semua website
 */
export async function getAllWebsites() {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching all websites:', error);
      return [];
    }

    // Simpan ke cache
    data.forEach(website => {
      // NO CACHE
    });

    return data || [];
  } catch (error) {
    console.error('Error fetching all websites:', error);
    return [];
  }
}

// Tenant object untuk user side
export const tenant = {
  getWebsiteId: () => DEFAULT_WEBSITE_ID,
  getWebsite: async () => await getWebsiteById(DEFAULT_WEBSITE_ID),
  getWebsiteBySlug: async (slug) => await getWebsiteBySlug(slug),
  getWebsiteById: async (id) => await getWebsiteById(id)
};


/**
 * Mendapatkan context website dari path URL
 * @param {string} path - Full path URL (e.g., "/kelantan-food-review/about")
 * @returns {Promise<Object>} - Website context dan clean path
 */
export async function getWebsiteContext(path) {
  // Hapus leading slash jika ada
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Split path untuk mendapatkan slug website
  const pathParts = cleanPath.split('/');
  const websiteSlug = pathParts[0];

  // Ambil data website dari database berdasarkan slug
  const website = await getWebsiteBySlug(websiteSlug);

  // Path bersih tanpa slug website
  const cleanRoutePath = pathParts.slice(1).join('/');

  return {
    website,
    path: cleanRoutePath
  };
}

/**
 * Helper untuk membuat URL dengan slug website
 * @param {Object} website - Informasi website
 * @param {string} path - Path yang akan ditambahkan
 * @returns {string} - URL lengkap dengan slug website
 */
export function createWebsiteUrl(website, path = '') {
  if (!website || !website.slug) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `/${website.slug}/${cleanPath}`;
}

/**
 * Validasi apakah sebuah path valid untuk website tertentu
 * @param {string} path - Path yang akan divalidasi
 * @param {Object} website - Informasi website
 * @returns {boolean} - True jika path valid untuk website tersebut
 */
export function isValidWebsitePath(path, website) {
  if (!website || !website.slug) {
    return false;
  }
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const pathParts = cleanPath.split('/');
  return pathParts[0] === website.slug;
}