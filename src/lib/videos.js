import { supabase } from './supabase.js';

/**
 * Mendapatkan video random untuk ditampilkan di homepage
 * @param {number} websiteId - ID website
 * @param {number} count - Jumlah video yang akan diambil (default: 6)
 * @returns {Promise<Array>} - Array berisi video random
 */
export async function getRandomVideos(websiteId, count = 6) {
  try {
    const { data: videos, error } = await supabase
      .from('videos')
      .select('id, title, url, description, created_at')
      .eq('website_id', websiteId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(count);

    if (error) {
      console.error('Error fetching videos:', error);
      return [];
    }

    return videos || [];
  } catch (error) {
    console.error('Error in getRandomVideos:', error);
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
      console.error('Error fetching all videos:', error);
      return [];
    }

    return videos || [];
  } catch (error) {
    console.error('Error in getAllVideos:', error);
    return [];
  }
}

/**
 * Menambahkan video baru
 * @param {number} websiteId - ID website
 * @param {string} title - Judul video
 * @param {string} url - URL YouTube video
 * @param {string} description - Deskripsi video
 * @returns {Promise<Object|null>} - Data video yang baru ditambahkan
 */
export async function addVideo(websiteId, title, url, description) {
  try {
    const { data: video, error } = await supabase
      .from('videos')
      .insert({
        website_id: websiteId,
        title,
        url,
        description
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding video:', error);
      return null;
    }

    return video;
  } catch (error) {
    console.error('Error in addVideo:', error);
    return null;
  }
}