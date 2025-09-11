import { supabase } from './supabase';

// Default website ID - hardcode saja
export const DEFAULT_WEBSITE_ID = 1;

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

  // Fallback data untuk ID 1 (Kelantan)
  const fallbackData = {
    1: {
      id: 1,
      name: "Kelantan Food Review",
      slug: "kelantan",
      description: "Panduan kuliner terbaik di Kelantan",
      logo_url: null
    }
  };

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
        description: null,
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
      console.warn(`No website found with slug "${slug}", using default website`);
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