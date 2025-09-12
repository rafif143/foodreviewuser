-- Update logo_url untuk semua 14 website multi-tenant
-- Logo URLs sudah ada di database, script ini untuk referensi saja

-- 1. MakanKelantan (makankelantan.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/kelantan-logo.png'
-- WHERE slug = 'kelantan';

-- 2. MakanKedah (makankedah.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/kedah-logo.png'
-- WHERE slug = 'kedah';

-- 3. MakanPenang (makan-penang.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/penang-logo.png'
-- WHERE slug = 'penang';

-- 4. MakanPerak (makanperak.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/perak-logo.png'
-- WHERE slug = 'perak';

-- 5. MakanPerlis (makanperlis.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/perlis-logo.png'
-- WHERE slug = 'perlis';

-- 6. MakanTerengganu (makanterengganu.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/terengganu-logo.png'
-- WHERE slug = 'terengganu';

-- 7. MakanPahang (makanpahang.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/pahang-logo.png'
-- WHERE slug = 'pahang';

-- 8. MakanKualaLumpur (makankualalumpur.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/kl-logo.png'
-- WHERE slug = 'kualalumpur';

-- 9. MakanSelangor (makanselangor.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/selangor-logo.png'
-- WHERE slug = 'selangor';

-- 10. MakanJohor (makanjohor.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/johor-logo.png'
-- WHERE slug = 'johor';

-- 11. MakanMelaka (makanmelaka.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/melaka-logo.png'
-- WHERE slug = 'melaka';

-- 12. MakanNegeriSembilan (makannegerisembilan.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/negerisembilan-logo.png'
-- WHERE slug = 'negerisembilan';

-- 13. MakanSabah (makansabah.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/sabah-logo.png'
-- WHERE slug = 'sabah';

-- 14. MakanSarawak (makansarawak.com)
-- UPDATE public.websites 
-- SET logo_url = 'https://your-logo-url-here.com/sarawak-logo.png'
-- WHERE slug = 'sarawak';

-- Verifikasi update
SELECT id, name, slug, logo_url, created_at 
FROM public.websites 
ORDER BY id;
