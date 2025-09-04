import { supabase } from './supabase.js';

/**
 * Mendapatkan video rawak untuk dipaparkan di halaman utama
 * @param {number} websiteId - ID website
 * @param {number} count - Jumlah video yang akan diambil (default: 6)
 * @returns {Promise<Array>} - Array berisi video rawak
 */
export async function getRandomVideos(websiteId, count = 6) {
  try {
    
    
    // Ambil lebih banyak lalu rawak di sisi klien agar campuran YouTube & TikTok
    const { data: videosRaw, error } = await supabase
      .from('videos')
      .select('id, title, url, description, video_type, created_at')
      .eq('website_id', websiteId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(count * 4);

    if (error) {
      console.error('Ralat mengambil video:', error);
      return [];
    }

    // Normalisasi tipe untuk konsistensi (tanpa mengubah data di DB)
    const normalized = (videosRaw || []).map(v => ({
      ...v,
      video_type: typeof v.video_type === 'string' ? v.video_type.toLowerCase().trim() : v.video_type
    }));

    // Rawak hasil agar tidak hanya yang terbaru saja, lalu ambil sejumlah 'count'
    const shuffled = normalized.sort(() => Math.random() - 0.5).slice(0, count);

    // Pastikan campuran minimal jika memungkinkan
    const hasYoutube = shuffled.some(v => v.video_type && v.video_type.includes('youtube'));
    const hasTiktok = shuffled.some(v => v.video_type && v.video_type.includes('tiktok'));

    if (!hasYoutube || !hasTiktok) {
      const youtubePool = normalized.filter(v => v.video_type && v.video_type.includes('youtube'));
      const tiktokPool = normalized.filter(v => v.video_type && v.video_type.includes('tiktok'));
      const result = [];
      const targetEach = Math.max(1, Math.floor(count / 2));

      // Ambil separuh dari masing-masing jika tersedia
      while (result.length < targetEach && youtubePool.length) {
        const idx = Math.floor(Math.random() * youtubePool.length);
        result.push(youtubePool.splice(idx, 1)[0]);
      }
      while (result.length < targetEach * 2 && tiktokPool.length && result.length < count) {
        const idx = Math.floor(Math.random() * tiktokPool.length);
        result.push(tiktokPool.splice(idx, 1)[0]);
      }
      // Lengkapi jika masih kurang
      const remainingPool = normalized.filter(v => !result.find(r => r.id === v.id));
      while (result.length < count && remainingPool.length) {
        const idx = Math.floor(Math.random() * remainingPool.length);
        result.push(remainingPool.splice(idx, 1)[0]);
      }
      return result;
    }

    return shuffled;
  } catch (error) {
    console.error('Ralat dalam getRandomVideos:', error);
    return [];
  }
}

/**
 * Mendapatkan semua video untuk website tertentu
 * @param {number} websiteId - ID website
 * @returns {Promise<Array>} - Array berisi semua video
 */
export async function getAllVideos(websiteId) {
  try {
    
    
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .eq('website_id', websiteId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Ralat mengambil semua video:', error);
      return [];
    }

    return videos || [];
  } catch (error) {
    console.error('Ralat dalam getAllVideos:', error);
    return [];
  }
}

/**
 * Menambahkan video baru
 * @param {number} websiteId - ID website
 * @param {string} title - Judul video
 * @param {string} url - URL video
 * @param {string} description - Deskripsi video
 * @param {string} videoType - Tipe video (youtube/tiktok)
 * @returns {Promise<Object|null>} - Data video yang baru ditambahkan
 */
export async function addVideo(websiteId, title, url, description, videoType = 'youtube') {
  try {
    
    
    const { data: video, error } = await supabase
      .from('videos')
      .insert({
        website_id: websiteId,
        title,
        url,
        description,
        video_type: videoType
      })
      .select()
      .single();

    if (error) {
      console.error('Ralat menambah video:', error);
      return null;
    }

    return video;
  } catch (error) {
    console.error('Ralat dalam addVideo:', error);
    return null;
  }
}

/**
 * Mengemas kini video yang sudah ada
 * @param {number} videoId - ID video
 * @param {Object} updates - Data yang akan dikemas kini
 * @returns {Promise<Object|null>} - Data video yang sudah dikemas kini
 */
export async function updateVideo(videoId, updates) {
  try {
    
    
    const { data: video, error } = await supabase
      .from('videos')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', videoId)
      .select()
      .single();

    if (error) {
      console.error('Ralat mengemas kini video:', error);
      return null;
    }

    return video;
  } catch (error) {
    console.error('Ralat dalam updateVideo:', error);
    return null;
  }
}

/**
 * Memadam video (soft delete)
 * @param {number} videoId - ID video
 * @returns {Promise<boolean>} - Status berhasil atau tidak
 */
export async function deleteVideo(videoId) {
  try {
    
    
    const { error } = await supabase
      .from('videos')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', videoId);

    if (error) {
      console.error('Ralat memadam video:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Ralat dalam deleteVideo:', error);
    return false;
  }
}

/**
 * Mendapatkan video berdasarkan tipe
 * @param {number} websiteId - ID website
 * @param {string} videoType - Tipe video (youtube/tiktok)
 * @returns {Promise<Array>} - Array berisi video dengan tipe tertentu
 */
export async function getVideosByType(websiteId, videoType) {
  try {
    
    
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .eq('website_id', websiteId)
      .eq('video_type', videoType)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Ralat mengambil video mengikut jenis:', error);
      return [];
    }

    return videos || [];
  } catch (error) {
    console.error('Ralat dalam getVideosByType:', error);
    return [];
  }
}