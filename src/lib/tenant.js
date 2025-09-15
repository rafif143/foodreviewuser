import { supabase, isSupabaseConfigured } from './supabase';

// Default website ID - hardcode saja
export const DEFAULT_WEBSITE_ID = 10;

// Cache untuk menyimpan data website
let websiteCache = new Map();

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

  // Fallback data untuk semua website
  const fallbackData = {
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

  // Jika Supabase tidak dikonfigurasi, gunakan fallback data berdasarkan slug
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured, using fallback data for slug:', slug);
    const fallbackData = {
      'kelantan': { id: 1, name: "MakanKelantan", slug: "kelantan", description: "Panduan kuliner terbaik di Kelantan - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Kelantan", logo_url: null },
      'kedah': { id: 2, name: "MakanKedah", slug: "kedah", description: "Panduan kuliner terbaik di Kedah - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Kedah", logo_url: null },
      'penang': { id: 3, name: "Penang Food Review", slug: "penang", description: "Panduan kuliner terbaik di Penang", logo_url: null },
      'perak': { id: 4, name: "Perak Food Review", slug: "perak", description: "Panduan kuliner terbaik di Perak", logo_url: null },
      'perlis': { id: 5, name: "Perlis Food Review", slug: "perlis", description: "Panduan kuliner terbaik di Perlis", logo_url: null },
      'terengganu': { id: 6, name: "Terengganu Food Review", slug: "terengganu", description: "Panduan kuliner terbaik di Terengganu", logo_url: null },
      'pahang': { id: 7, name: "Pahang Food Review", slug: "pahang", description: "Panduan kuliner terbaik di Pahang", logo_url: null },
      'kualalumpur': { id: 8, name: "Kuala Lumpur Food Review", slug: "kualalumpur", description: "Panduan kuliner terbaik di Kuala Lumpur", logo_url: null },
      'selangor': { id: 9, name: "Selangor Food Review", slug: "selangor", description: "Panduan kuliner terbaik di Selangor", logo_url: null },
      'johor': { id: 10, name: "Johor Food Review", slug: "johor", description: "Panduan kuliner terbaik di Johor", logo_url: null },
      'melaka': { id: 11, name: "Melaka Food Review", slug: "melaka", description: "Panduan kuliner terbaik di Melaka", logo_url: null },
      'negerisembilan': { id: 12, name: "Negeri Sembilan Food Review", slug: "negerisembilan", description: "Panduan kuliner terbaik di Negeri Sembilan", logo_url: null },
      'sabah': { id: 13, name: "Sabah Food Review", slug: "sabah", description: "Panduan kuliner terbaik di Sabah", logo_url: null },
      'sarawak': { id: 14, name: "Sarawak Food Review", slug: "sarawak", description: "Panduan kuliner terbaik di Sarawak", logo_url: null }
    };
    
    const website = fallbackData[slug] || fallbackData['kelantan'];
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
        console.warn(`No website found with slug "${slug}", using default website`);
      }
      return await getWebsiteById(DEFAULT_WEBSITE_ID);
    }

    // Ambil data pertama jika ada multiple results
    const website = data[0];
    
    // Simpan ke cache
    websiteCache.set(website.id, website);
    return website;
  } catch (error) {
    console.warn(`Unexpected error fetching website by slug "${slug}":`, error.message);
    // Fallback ke website default
    return await getWebsiteById(DEFAULT_WEBSITE_ID);
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