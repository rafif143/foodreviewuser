-- Update logo URLs untuk semua 14 website
-- Jalankan script ini setelah logo sudah tersedia di CDN/storage

-- Template untuk update logo URLs
-- Ganti URL dengan logo yang sesuai untuk setiap website

-- 1. MakanKelantan (makankelantan.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/kelantan-logo.png'
WHERE slug = 'kelantan';

-- 2. MakanKedah (makankedah.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/kedah-logo.png'
WHERE slug = 'kedah';

-- 3. MakanPenang (makan-penang.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/penang-logo.png'
WHERE slug = 'penang';

-- 4. MakanPerak (makanperak.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/perak-logo.png'
WHERE slug = 'perak';

-- 5. MakanPerlis (makanperlis.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/perlis-logo.png'
WHERE slug = 'perlis';

-- 6. MakanTerengganu (makanterengganu.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/terengganu-logo.png'
WHERE slug = 'terengganu';

-- 7. MakanPahang (makanpahang.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/pahang-logo.png'
WHERE slug = 'pahang';

-- 8. MakanKualaLumpur (makankualalumpur.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/kl-logo.png'
WHERE slug = 'kualalumpur';

-- 9. MakanSelangor (makanselangor.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/selangor-logo.png'
WHERE slug = 'selangor';

-- 10. MakanJohor (makanjohor.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/johor-logo.png'
WHERE slug = 'johor';

-- 11. MakanMelaka (makanmelaka.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/melaka-logo.png'
WHERE slug = 'melaka';

-- 12. MakanNegeriSembilan (makannegerisembilan.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/negerisembilan-logo.png'
WHERE slug = 'negerisembilan';

-- 13. MakanSabah (makansabah.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/sabah-logo.png'
WHERE slug = 'sabah';

-- 14. MakanSarawak (makansarawak.com)
UPDATE public.websites 
SET logo_url = 'https://your-cdn.com/logos/sarawak-logo.png'
WHERE slug = 'sarawak';

-- Verifikasi update
SELECT id, name, slug, logo_url, updated_at 
FROM public.websites 
WHERE logo_url IS NOT NULL
ORDER BY id;

-- Cek website yang masih belum ada logo
SELECT id, name, slug 
FROM public.websites 
WHERE logo_url IS NULL
ORDER BY id;
