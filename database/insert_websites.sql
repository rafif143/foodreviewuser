-- Insert 14 websites untuk multi-tenant food blog
-- Sesuai dengan konfigurasi yang sudah dibuat di aplikasi

INSERT INTO public.websites (id, name, slug, description, logo_url) VALUES
-- 1. MakanKelantan (Production Default)
(1, 'MakanKelantan', 'kelantan', 'Panduan kuliner terbaik di Kelantan - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Kelantan. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap.', NULL),

-- 2. MakanKedah
(2, 'MakanKedah', 'kedah', 'Panduan kuliner terbaik di Kedah - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Kedah. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Kedah.', NULL),

-- 3. MakanPenang
(3, 'MakanPenang', 'penang', 'Panduan kuliner terbaik di Penang - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Penang. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Penang.', NULL),

-- 4. MakanPerak
(4, 'MakanPerak', 'perak', 'Panduan kuliner terbaik di Perak - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Perak. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Perak.', NULL),

-- 5. MakanPerlis
(5, 'MakanPerlis', 'perlis', 'Panduan kuliner terbaik di Perlis - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Perlis. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Perlis.', NULL),

-- 6. MakanTerengganu
(6, 'MakanTerengganu', 'terengganu', 'Panduan kuliner terbaik di Terengganu - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Terengganu. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Terengganu.', NULL),

-- 7. MakanPahang
(7, 'MakanPahang', 'pahang', 'Panduan kuliner terbaik di Pahang - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Pahang. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Pahang.', NULL),

-- 8. MakanKualaLumpur
(8, 'MakanKualaLumpur', 'kualalumpur', 'Panduan kuliner terbaik di Kuala Lumpur - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Kuala Lumpur. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Kuala Lumpur.', NULL),

-- 9. MakanSelangor
(9, 'MakanSelangor', 'selangor', 'Panduan kuliner terbaik di Selangor - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Selangor. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Selangor.', NULL),

-- 10. MakanJohor
(10, 'MakanJohor', 'johor', 'Panduan kuliner terbaik di Johor - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Johor. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Johor.', NULL),

-- 11. MakanMelaka
(11, 'MakanMelaka', 'melaka', 'Panduan kuliner terbaik di Melaka - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Melaka. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Melaka.', NULL),

-- 12. MakanNegeriSembilan
(12, 'MakanNegeriSembilan', 'negerisembilan', 'Panduan kuliner terbaik di Negeri Sembilan - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Negeri Sembilan. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Negeri Sembilan.', NULL),

-- 13. MakanSabah
(13, 'MakanSabah', 'sabah', 'Panduan kuliner terbaik di Sabah - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Sabah. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Sabah.', NULL),

-- 14. MakanSarawak
(14, 'MakanSarawak', 'sarawak', 'Panduan kuliner terbaik di Sarawak - Temukan tempat makan terbaik, resep tradisional, dan review restoran di Sarawak. Review restoran, resep masakan tradisional, dan panduan kuliner terlengkap di Sarawak.', NULL);

-- Verifikasi data yang sudah diinsert
SELECT 
    id,
    name,
    slug,
    LEFT(description, 50) || '...' as description_preview,
    logo_url,
    created_at
FROM public.websites 
ORDER BY id;

-- Cek jumlah website yang sudah diinsert
SELECT COUNT(*) as total_websites FROM public.websites;

-- Cek website tanpa logo (untuk update logo nanti)
SELECT id, name, slug 
FROM public.websites 
WHERE logo_url IS NULL
ORDER BY id;
