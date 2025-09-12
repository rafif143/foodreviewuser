-- Insert sample articles untuk testing
-- Artikel akan ditambahkan untuk website ID 1 (MakanKelantan) sebagai default

INSERT INTO public.articles (
    website_id, 
    title, 
    slug, 
    author, 
    minute_read, 
    category, 
    thumbnail_image, 
    main_image, 
    summary, 
    content, 
    is_published, 
    published_at, 
    tags, 
    labels
) VALUES

-- Artikel 1: Nasi Kerabu Kelantan
(
    1, -- website_id (MakanKelantan)
    'Nasi Kerabu Kelantan: Resep Tradisional yang Menggugah Selera',
    'nasi-kerabu-kelantan-resep-tradisional',
    'Chef Kelantan',
    8,
    'Recipe',
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=500&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&h=800&fit=crop&crop=center',
    'Nasi Kerabu adalah hidangan tradisional Kelantan yang terkenal dengan warna biru dari bunga telang. Mari kita pelajari cara membuat nasi kerabu yang autentik dan lezat.',
    '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Nasi Kerabu adalah salah satu hidangan tradisional Kelantan yang paling terkenal. Hidangan ini memiliki ciri khas warna biru dari bunga telang yang memberikan rasa dan aroma yang unik."}]}]}',
    true,
    NOW() - INTERVAL '1 day',
    ARRAY['nasi kerabu', 'resep tradisional', 'makanan kelantan', 'bunga telang'],
    ARRAY['resep', 'tradisional', 'kelantan']
),

-- Artikel 2: Ayam Percik
(
    1, -- website_id (MakanKelantan)
    'Ayam Percik Kelantan: Resep Daging Ayam Panggang dengan Bumbu Kelapa',
    'ayam-percik-kelantan-resep-daging-ayam-panggang',
    'Chef Kelantan',
    10,
    'Recipe',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=500&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=800&fit=crop&crop=center',
    'Ayam Percik adalah hidangan ayam panggang khas Kelantan dengan bumbu kelapa yang kaya. Rasanya gurih dan pedas yang menggugah selera.',
    '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Ayam Percik adalah hidangan tradisional Kelantan yang terbuat dari daging ayam yang dipanggang dengan bumbu kelapa yang kaya rasa. Hidangan ini sangat populer di kalangan masyarakat Kelantan dan sering disajikan dalam acara-acara khusus."}]}]}',
    true,
    NOW() - INTERVAL '2 days',
    ARRAY['ayam percik', 'resep ayam', 'makanan kelantan', 'bumbu kelapa'],
    ARRAY['resep', 'ayam', 'kelantan']
),

-- Artikel 3: Laksa Kelantan
(
    1, -- website_id (MakanKelantan)
    'Laksa Kelantan: Mi Kuah Pedas Khas Pantai Timur',
    'laksa-kelantan-mi-kuah-pedas-pantai-timur',
    'Food Blogger Kelantan',
    7,
    'Food',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=500&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&h=800&fit=crop&crop=center',
    'Laksa Kelantan adalah mi kuah pedas yang menjadi ikon kuliner Pantai Timur. Rasanya yang segar dan pedas sangat cocok untuk cuaca tropis.',
    '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Laksa Kelantan adalah salah satu hidangan mi kuah yang paling terkenal di Malaysia. Hidangan ini memiliki kuah yang pedas dan segar dengan tambahan sayuran dan protein yang melengkapi rasa."}]}]}',
    true,
    NOW() - INTERVAL '3 days',
    ARRAY['laksa kelantan', 'mi kuah', 'makanan pedas', 'pantai timur'],
    ARRAY['laksa', 'pedas', 'kelantan']
),

-- Artikel 4: Restoran Terbaik di Kota Bharu
(
    1, -- website_id (MakanKelantan)
    '10 Restoran Terbaik di Kota Bharu untuk Mencicipi Makanan Tradisional',
    '10-restoran-terbaik-kota-bharu-makanan-tradisional',
    'Food Explorer',
    12,
    'Restaurant',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=500&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&h=800&fit=crop&crop=center',
    'Kota Bharu menawarkan berbagai restoran dengan makanan tradisional Kelantan yang autentik. Berikut adalah 10 restoran terbaik yang wajib dikunjungi.',
    '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Kota Bharu sebagai ibu kota Kelantan memiliki banyak restoran yang menyajikan makanan tradisional yang autentik. Dari warung kecil hingga restoran besar, semuanya menawarkan pengalaman kuliner yang tak terlupakan."}]}]}',
    true,
    NOW() - INTERVAL '4 days',
    ARRAY['restoran kota bharu', 'makanan tradisional', 'wisata kuliner', 'kelantan'],
    ARRAY['restoran', 'kota bharu', 'wisata']
),

-- Artikel 5: Resep Kuih Tradisional
(
    1, -- website_id (MakanKelantan)
    'Kuih Tradisional Kelantan: Resep Kue Tradisional yang Lezat',
    'kuih-tradisional-kelantan-resep-kue-lezat',
    'Chef Traditional',
    9,
    'Recipe',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=500&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=800&fit=crop&crop=center',
    'Kuih tradisional Kelantan memiliki rasa yang unik dan tekstur yang berbeda. Mari kita pelajari cara membuat beberapa kuih tradisional yang populer.',
    '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Kuih tradisional Kelantan adalah bagian penting dari budaya kuliner setempat. Setiap kuih memiliki cerita dan tradisi tersendiri yang diturunkan dari generasi ke generasi."}]}]}',
    true,
    NOW() - INTERVAL '5 days',
    ARRAY['kuih tradisional', 'resep kue', 'makanan tradisional', 'kelantan'],
    ARRAY['kuih', 'tradisional', 'resep']
);

-- Verifikasi artikel yang sudah diinsert
SELECT 
    id,
    website_id,
    title,
    slug,
    author,
    category,
    is_published,
    published_at,
    visit_count,
    array_length(tags, 1) as tag_count,
    array_length(labels, 1) as label_count
FROM public.articles 
WHERE website_id = 1
ORDER BY published_at DESC;

-- Cek total artikel per website
SELECT 
    w.name as website_name,
    COUNT(a.id) as total_articles,
    COUNT(CASE WHEN a.is_published = true THEN 1 END) as published_articles
FROM public.websites w
LEFT JOIN public.articles a ON w.id = a.website_id
GROUP BY w.id, w.name
ORDER BY w.id;
