import { supabase, isSupabaseConfigured } from './supabase';

// Default website ID - UBAH ANGKA INI UNTUK GANTI SEMUA KONFIGURASI
export const DEFAULT_WEBSITE_ID = 1; // Ganti angka ini untuk switch tenant

// Cache untuk menyimpan data website
let websiteCache = new Map();

// Konfigurasi lengkap untuk setiap website/tenant
export const TENANT_CONFIG = {
  1: {
    // Basic Info
    id: 1,
    name: "MakanKelantan",
    slug: "kelantan",
    description: "Panduan kuliner terbaik di Kelantan - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Kelantan",
    logo_url: null,
    
    // SEO Config
    seo: {
      title: "MakanKelantan - Panduan Kuliner Terbaik di Kelantan",
      keywords: "makan kelantan, restoran kelantan, makanan tradisional kelantan, nasi lemak, satay, laksa, kuliner kelantan, tempat makan kelantan, makankelantan, review makanan kelantan, tempat makan enak kelantan",
      author: "MakanKelantan Team",
      themeColor: "#dc2626",
      twitterSite: "@MakanKelantan",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    
    // Location Config
    location: {
      region: "MY-03",
      placename: "Kelantan",
      coordinates: "6.1254;102.2386",
      icbm: "6.1254, 102.2386"
    },
    
    // Domain Config
    domain: "https://makankelantan.com"
  },
  
  14: {
    // Basic Info
    id: 14,
    name: "MakanSarawak",
    slug: "sarawak",
    description: "Panduan kuliner terbaik di Sarawak - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Sarawak",
    logo_url: null,
    
    // SEO Config
    seo: {
      title: "MakanSarawak - Panduan Kuliner Terbaik di Sarawak",
      keywords: "makan sarawak, restoran sarawak, makanan tradisional sarawak, nasi lemak, satay, laksa, kuliner sarawak, tempat makan sarawak, makansarawak, review makanan sarawak, tempat makan enak sarawak",
      author: "MakanSarawak Team",
      themeColor: "#dc2626",
      twitterSite: "@MakanSarawak",
      ogImage: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=630&fit=crop&crop=center"
    },
    
    // Location Config
    location: {
      region: "MY-13",
      placename: "Sarawak",
      coordinates: "1.5533;110.3593",
      icbm: "1.5533, 110.3593"
    },
    
    // Domain Config
    domain: "https://makansarawak.com"
  },
  
  // Tambah config lain sesuai kebutuhan
  2: {
    id: 2,
    name: "MakanKedah",
    slug: "kedah",
    description: "Panduan kuliner terbaik di Kedah - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Kedah",
    logo_url: null,
    seo: {
      title: "MakanKedah - Panduan Kuliner Terbaik di Kedah",
      keywords: "makan kedah, restoran kedah, makanan tradisional kedah, kuliner kedah, tempat makan kedah",
      author: "MakanKedah Team",
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
  }
};

// Helper untuk mendapatkan konfigurasi tenant saat ini
export function getCurrentTenantConfig() {
  return TENANT_CONFIG[DEFAULT_WEBSITE_ID] || TENANT_CONFIG[1];
}

/**
 * Mendapatkan data website dari database berdasarkan ID
 * @param {number} id - ID website
 * @returns {Promise<Object>} - Data website dari database
 */
export async function getWebsiteById(id = DEFAULT_WEBSITE_ID) {
  // Cek cache dulu
  if (websiteCache.has(id)) {
    return websiteCache.get(id);
  }

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

  // Fallback data lama untuk kompatibilitas
  const legacyFallbackData = {
    1: {
      id: 1,
      name: "MakanKelantan",
      slug: "kelantan",
      description: "Panduan kuliner terbaik di Kelantan - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Kelantan",
      logo_url: null
    },
    2: {
      id: 2,
      name: "MakanKedah",
      slug: "kedah",
      description: "Panduan kuliner terbaik di Kedah - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Kedah",
      logo_url: null
    },
    3: {
      id: 3,
      name: "Penang Food Review",
      slug: "penang",
      description: "Panduan kuliner terbaik di Penang",
      logo_url: null
    },
    4: {
      id: 4,
      name: "Perak Food Review",
      slug: "perak",
      description: "Panduan kuliner terbaik di Perak",
      logo_url: null
    },
    5: {
      id: 5,
      name: "Perlis Food Review",
      slug: "perlis",
      description: "Panduan kuliner terbaik di Perlis",
      logo_url: null
    },
    6: {
      id: 6,
      name: "Terengganu Food Review",
      slug: "terengganu",
      description: "Panduan kuliner terbaik di Terengganu",
      logo_url: null
    },
    7: {
      id: 7,
      name: "Pahang Food Review",
      slug: "pahang",
      description: "Panduan kuliner terbaik di Pahang",
      logo_url: null
    },
    8: {
      id: 8,
      name: "Kuala Lumpur Food Review",
      slug: "kualalumpur",
      description: "Panduan kuliner terbaik di Kuala Lumpur",
      logo_url: null
    },
    9: {
      id: 9,
      name: "Selangor Food Review",
      slug: "selangor",
      description: "Panduan kuliner terbaik di Selangor",
      logo_url: null
    },
    10: {
      id: 10,
      name: "Johor Food Review",
      slug: "johor",
      description: "Panduan kuliner terbaik di Johor",
      logo_url: null
    },
    11: {
      id: 11,
      name: "Melaka Food Review",
      slug: "melaka",
      description: "Panduan kuliner terbaik di Melaka",
      logo_url: null
    },
    12: {
      id: 12,
      name: "Negeri Sembilan Food Review",
      slug: "negerisembilan",
      description: "Panduan kuliner terbaik di Negeri Sembilan",
      logo_url: null
    },
    13: {
      id: 13,
      name: "Sabah Food Review",
      slug: "sabah",
      description: "Panduan kuliner terbaik di Sabah",
      logo_url: null
    },
    14: {
      id: 14,
      name: "Sarawak Food Review",
      slug: "sarawak",
      description: "Panduan kuliner terbaik di Sarawak",
      logo_url: null
    }
  };

  // Jika Supabase tidak dikonfigurasi, gunakan fallback data
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured, using fallback data');
    const fallback = fallbackData[id] || {
      id: id,
      name: `Website ${id}`,
      slug: `website-${id}`,
      description: `Panduan kuliner terbaik di Website ${id}`,
      logo_url: null
    };
    websiteCache.set(id, fallback);
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
      websiteCache.set(id, fallback);
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
      websiteCache.set(id, fallback);
      return fallback;
    }

    // Ambil data pertama
    const website = data[0];
    
    // Simpan ke cache
    websiteCache.set(id, website);
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
    websiteCache.set(id, fallback);
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
    websiteCache.set(website.id, website);
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
    websiteCache.set(website.id, website);
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
      websiteCache.set(website.id, website);
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