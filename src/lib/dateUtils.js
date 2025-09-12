/**
 * Utility functions untuk format tanggal dalam bahasa Melayu
 */

// Mapping bulan dari bahasa Inggris ke bahasa Melayu
const monthNames = {
  'January': 'Januari',
  'February': 'Februari', 
  'March': 'Mac',
  'April': 'April',
  'May': 'Mei',
  'June': 'Jun',
  'July': 'Julai',
  'August': 'Ogos',
  'September': 'September',
  'October': 'Oktober',
  'November': 'November',
  'December': 'Disember'
};

/**
 * Format tanggal dari ISO string ke format bahasa Melayu
 * @param {string} isoString - ISO date string
 * @returns {string} Formatted date in Malay
 */
export function formatDateMalay(isoString) {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  const day = date.getDate();
  const month = monthNames[date.toLocaleString('en-US', { month: 'long' })];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

/**
 * Format tanggal dari ISO string ke format bahasa Melayu dengan hari
 * @param {string} isoString - ISO date string
 * @returns {string} Formatted date with day in Malay
 */
export function formatDateMalayWithDay(isoString) {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  const dayNames = {
    'Sunday': 'Ahad',
    'Monday': 'Isnin',
    'Tuesday': 'Selasa',
    'Wednesday': 'Rabu',
    'Thursday': 'Khamis',
    'Friday': 'Jumaat',
    'Saturday': 'Sabtu'
  };
  
  const dayName = dayNames[date.toLocaleString('en-US', { weekday: 'long' })];
  const day = date.getDate();
  const month = monthNames[date.toLocaleString('en-US', { month: 'long' })];
  const year = date.getFullYear();
  
  return `${dayName}, ${day} ${month} ${year}`;
}

/**
 * Format tanggal singkat dalam bahasa Melayu
 * @param {string} isoString - ISO date string
 * @returns {string} Short formatted date in Malay
 */
export function formatDateMalayShort(isoString) {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  const day = date.getDate();
  const month = monthNames[date.toLocaleString('en-US', { month: 'long' })];
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

/**
 * Format tanggal untuk display di artikel (format yang lebih formal)
 * @param {string} isoString - ISO date string
 * @returns {string} Formatted date for articles in Malay
 */
export function formatDateForArticle(isoString) {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  const day = date.getDate();
  const month = monthNames[date.toLocaleString('en-US', { month: 'long' })];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}
