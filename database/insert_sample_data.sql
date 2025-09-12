-- Insert sample data untuk tabel pendukung
-- Data untuk website ID 1 (MakanKelantan) sebagai default

-- Insert data contact untuk website Kelantan
INSERT INTO public.contact (
    website_id,
    contact_info,
    social_media,
    faq,
    map,
    email
) VALUES (
    1, -- website_id (MakanKelantan)
    '{"title": "Hubungi Kami", "description": "Hubungi kami untuk pertanyaan atau kerjasama", "phone": "+60123456789", "address": "Kota Bharu, Kelantan, Malaysia", "hours": "Senin - Jumat: 09:00 - 18:00"}',
    '{"title": "Ikuti Kami", "description": "Ikuti kami di media sosial untuk mendapatkan update terbaru", "platforms": [{"name": "Facebook", "url": "https://facebook.com/MakanKelantan", "icon": "facebook", "is_active": true}, {"name": "Instagram", "url": "https://instagram.com/makankelantan", "icon": "instagram", "is_active": true}, {"name": "Twitter", "url": "https://twitter.com/MakanKelantan", "icon": "twitter", "is_active": true}, {"name": "YouTube", "url": "https://youtube.com/MakanKelantan", "icon": "youtube", "is_active": true}]}',
    '{"title": "Pertanyaan yang Sering Diajukan", "questions": [{"question": "Bagaimana cara mendapatkan resep tradisional Kelantan?", "answer": "Anda dapat menemukan resep tradisional Kelantan di halaman resep website kami."}, {"question": "Apakah semua restoran yang direview halal?", "answer": "Ya, semua restoran yang kami review sudah diverifikasi halal."}]}',
    '{"title": "Lokasi Kami", "description": "Kami berlokasi di Kota Bharu, Kelantan", "latitude": 6.1254, "longitude": 102.2431}',
    'info@makankelantan.com'
);

-- Insert data about_us untuk website Kelantan
INSERT INTO public.about_us (
    website_id,
    name,
    description,
    profile_image,
    twitter_url,
    pinterest_url,
    telegram_url,
    instagram_url
) VALUES (
    1, -- website_id (MakanKelantan)
    'MakanKelantan Team',
    'Tim MakanKelantan terdiri dari para pecinta kuliner yang berdedikasi untuk mempromosikan makanan tradisional Kelantan. Kami berkomitmen untuk memberikan informasi terbaik tentang tempat makan, resep, dan budaya kuliner Kelantan.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
    'https://twitter.com/MakanKelantan',
    'https://pinterest.com/MakanKelantan',
    'https://t.me/MakanKelantan',
    'https://instagram.com/makankelantan'
);

-- Insert data advertise untuk website Kelantan
INSERT INTO public.advertise (
    website_id,
    banner_data,
    sidebar_data,
    popup_data,
    contact_info
) VALUES (
    1, -- website_id (MakanKelantan)
    '{"title": "Iklan Banner", "description": "Tempat iklan banner di header website", "is_active": true, "ads": [{"title": "Promo Spesial", "image": "https://images.unsplash.com/photo-1565299585323-38174c4aab0e?w=800&h=200&fit=crop", "url": "#", "is_active": true}]}',
    '{"title": "Iklan Sidebar", "description": "Tempat iklan di sidebar kanan", "is_active": true, "ads": [{"title": "Rekomendasi Restoran", "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=250&fit=crop", "url": "#", "is_active": true}]}',
    '{"title": "Iklan Popup", "description": "Iklan popup yang muncul secara berkala", "is_active": false, "ads": []}',
    '{"title": "Informasi Iklan", "description": "Hubungi kami untuk informasi iklan", "platforms": [{"type": "Email", "value": "ads@makankelantan.com", "icon_name": "email"}, {"type": "WhatsApp", "value": "+60123456789", "icon_name": "whatsapp"}, {"type": "Telepon", "value": "+60123456789", "icon_name": "phone"}, {"type": "Lokasi", "value": "Kota Bharu, Kelantan, Malaysia", "icon_name": "location"}]}'
);

-- Verifikasi data yang sudah diinsert
SELECT 'Contact Data' as table_name, website_id, 
       jsonb_extract_path_text(contact_info, 'title') as title
FROM public.contact 
WHERE website_id = 1

UNION ALL

SELECT 'About Us Data' as table_name, website_id, name as title
FROM public.about_us 
WHERE website_id = 1

UNION ALL

SELECT 'Advertise Data' as table_name, website_id, 
       jsonb_extract_path_text(banner_data, 'title') as title
FROM public.advertise 
WHERE website_id = 1;

-- Cek total data per website
SELECT 
    w.name as website_name,
    COUNT(DISTINCT c.id) as contact_count,
    COUNT(DISTINCT a.id) as about_count,
    COUNT(DISTINCT ad.id) as advertise_count
FROM public.websites w
LEFT JOIN public.contact c ON w.id = c.website_id
LEFT JOIN public.about_us a ON w.id = a.website_id
LEFT JOIN public.advertise ad ON w.id = ad.website_id
GROUP BY w.id, w.name
ORDER BY w.id;
