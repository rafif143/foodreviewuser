-- Update logo_url untuk semua 14 website multi-tenant
-- Ganti URL dengan logo yang sesuai untuk setiap website

-- 1. MakanKelantan (makankelantan.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'kelantan';

-- 2. MakanKedah (makankedah.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'kedah';

-- 3. MakanPenang (makan-penang.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'penang';

-- 4. MakanPerak (makanperak.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'perak';

-- 5. MakanPerlis (makanperlis.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'perlis';

-- 6. MakanTerengganu (makanterengganu.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'terengganu';

-- 7. MakanPahang (makanpahang.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'pahang';

-- 8. MakanKualaLumpur (makankualalumpur.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'kualalumpur';

-- 9. MakanSelangor (makanselangor.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'selangor';

-- 10. MakanJohor (makanjohor.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'johor';

-- 11. MakanMelaka (makanmelaka.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'melaka';

-- 12. MakanNegeriSembilan (makannegerisembilan.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1565299585323-38174c4aab0e?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'negerisembilan';

-- 13. MakanSabah (makansabah.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'sabah';

-- 14. MakanSarawak (makansarawak.com)
UPDATE public.websites 
SET logo_url = 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop&crop=center'
WHERE slug = 'sarawak';

-- Verifikasi update
SELECT id, name, slug, logo_url, created_at 
FROM public.websites 
ORDER BY id;
