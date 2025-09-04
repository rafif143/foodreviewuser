// SEO Configuration untuk 14 Negara Bagian Malaysia
// Multi-tenant SEO system untuk website Makan[Lokasi]

export const seoConfigs = {
  1: { // Kelantan
    id: 1,
    slug: 'kelantan-food',
    name: 'Makan Kelantan',
    location: 'Kelantan',
    capital: 'Kota Bharu',
    domain: 'makan-kelantan.com',
    primaryKeywords: ['makanan Kelantan', 'restoran Kota Bharu', 'nasi kerabu Kelantan', 'kuliner Kelantan'],
    longTailKeywords: ['restoran halal terbaik Kota Bharu', 'warung makan tradisional Kelantan', 'kuliner Kelantan yang wajib dicoba', 'tempat makan murah di Kelantan'],
    signatureDish: 'Nasi Kerabu',
    localCuisine: ['Nasi Kerabu', 'Ayam Percik', 'Laksa Kelantan', 'Nasi Dagang'],
    searchVolume: {
      primary: 2900,
      secondary: 1600,
      tertiary: 1200
    },
    h1Templates: {
      homepage: 'Makan Kelantan - Panduan Kuliner Terbaik di Kelantan',
      restaurants: 'Restoran Terbaik di Kota Bharu',
      traditional: 'Nasi Kerabu dan Makanan Tradisional Kelantan',
      halal: 'Restoran Halal Terbaik di Kelantan'
    },
    h2Templates: {
      popular: 'Restoran Populer di Kelantan',
      traditional: 'Makanan Tradisional Kelantan',
      halal: 'Tempat Makan Halal di Kota Bharu',
      budget: 'Tempat Makan Murah di Kelantan'
    },
    metaTemplates: {
      title: 'Makan Kelantan - Panduan Kuliner Terbaik di Kelantan',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Kelantan. Panduan lengkap untuk makanan halal dan tempat makan enak di Kota Bharu.',
      keywords: 'makanan Kelantan, restoran Kota Bharu, nasi kerabu, kuliner Kelantan, tempat makan halal, warung makan tradisional'
    }
  },
  2: { // Perlis
    id: 2,
    slug: 'perlis-food',
    name: 'Makan Perlis',
    location: 'Perlis',
    capital: 'Kangar',
    domain: 'makan-perlis.com',
    primaryKeywords: ['makanan Perlis', 'restoran Kangar', 'kuliner Perlis', 'tempat makan Perlis'],
    longTailKeywords: ['restoran halal Kangar', 'makanan tradisional Perlis', 'warung makan enak Perlis', 'kuliner khas Perlis'],
    signatureDish: 'Laksa Perlis',
    localCuisine: ['Laksa Perlis', 'Nasi Ulam', 'Kerabu Perlis', 'Gulai Ikan'],
    searchVolume: {
      primary: 480,
      secondary: 320,
      tertiary: 260
    },
    h1Templates: {
      homepage: 'Makan Perlis - Panduan Kuliner Terbaik di Perlis',
      restaurants: 'Restoran Terbaik di Kangar',
      traditional: 'Makanan Tradisional Perlis',
      halal: 'Restoran Halal Terbaik di Perlis'
    },
    h2Templates: {
      popular: 'Restoran Populer di Perlis',
      traditional: 'Makanan Khas Perlis',
      halal: 'Tempat Makan di Kangar',
      budget: 'Warung Makan Murah di Perlis'
    },
    metaTemplates: {
      title: 'Makan Perlis - Panduan Kuliner Terbaik di Perlis',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Perlis. Panduan lengkap untuk makanan halal dan tempat makan enak di Kangar.',
      keywords: 'makanan Perlis, restoran Kangar, laksa Perlis, kuliner Perlis, tempat makan halal, warung makan tradisional'
    }
  },
  3: { // Kedah
    id: 3,
    slug: 'kedah-food',
    name: 'Makan Kedah',
    location: 'Kedah',
    capital: 'Alor Setar',
    domain: 'makan-kedah.com',
    primaryKeywords: ['makanan Kedah', 'restoran Alor Setar', 'laksa Kedah', 'kuliner Kedah'],
    longTailKeywords: ['restoran halal Alor Setar', 'makanan tradisional Kedah', 'tempat makan enak Kedah', 'warung makan Kedah'],
    signatureDish: 'Laksa Kedah',
    localCuisine: ['Laksa Kedah', 'Nasi Ulam', 'Gulai Ikan', 'Kerabu Kedah'],
    searchVolume: {
      primary: 1900,
      secondary: 1200,
      tertiary: 880
    },
    h1Templates: {
      homepage: 'Makan Kedah - Panduan Kuliner Terbaik di Kedah',
      restaurants: 'Restoran Terbaik di Alor Setar',
      traditional: 'Laksa dan Makanan Tradisional Kedah',
      halal: 'Restoran Halal Terbaik di Kedah'
    },
    h2Templates: {
      popular: 'Restoran Populer di Kedah',
      traditional: 'Makanan Tradisional Kedah',
      halal: 'Tempat Makan Halal di Alor Setar',
      budget: 'Warung Makan Murah di Kedah'
    },
    metaTemplates: {
      title: 'Makan Kedah - Panduan Kuliner Terbaik di Kedah',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Kedah. Panduan lengkap untuk makanan halal dan tempat makan enak di Alor Setar.',
      keywords: 'makanan Kedah, restoran Alor Setar, laksa Kedah, kuliner Kedah, tempat makan halal, warung makan tradisional'
    }
  },
  4: { // Penang
    id: 4,
    slug: 'penang-food',
    name: 'Makan Penang',
    location: 'Penang',
    capital: 'Georgetown',
    domain: 'makan-penang.com',
    primaryKeywords: ['makanan Penang', 'restoran Georgetown', 'char kway teow Penang', 'kuliner Penang'],
    longTailKeywords: ['restoran halal Georgetown', 'makanan street food Penang', 'tempat makan enak Penang', 'warung makan Penang'],
    signatureDish: 'Char Kway Teow',
    localCuisine: ['Char Kway Teow', 'Laksa Penang', 'Nasi Kandar', 'Roti Canai'],
    searchVolume: {
      primary: 8100,
      secondary: 4400,
      tertiary: 2900
    },
    h1Templates: {
      homepage: 'Makan Penang - Panduan Kuliner Terbaik di Penang',
      restaurants: 'Restoran Terbaik di Georgetown',
      traditional: 'Char Kway Teow dan Street Food Penang',
      halal: 'Restoran Halal Terbaik di Penang'
    },
    h2Templates: {
      popular: 'Restoran Populer di Penang',
      traditional: 'Street Food Penang',
      halal: 'Tempat Makan Halal di Georgetown',
      budget: 'Warung Makan Murah di Penang'
    },
    metaTemplates: {
      title: 'Makan Penang - Panduan Kuliner Terbaik di Penang',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Penang. Panduan lengkap untuk makanan halal dan street food enak di Georgetown.',
      keywords: 'makanan Penang, restoran Georgetown, char kway teow, kuliner Penang, tempat makan halal, street food Penang'
    }
  },
  5: { // Perak
    id: 5,
    slug: 'perak-food',
    name: 'Makan Perak',
    location: 'Perak',
    capital: 'Ipoh',
    domain: 'makan-perak.com',
    primaryKeywords: ['makanan Perak', 'restoran Ipoh', 'nasi kandar Perak', 'kuliner Perak'],
    longTailKeywords: ['restoran halal Ipoh', 'makanan tradisional Perak', 'tempat makan enak Perak', 'warung makan Perak'],
    signatureDish: 'Nasi Kandar',
    localCuisine: ['Nasi Kandar', 'Ipoh White Coffee', 'Kaya Puff', 'Chee Cheong Fun'],
    searchVolume: {
      primary: 2100,
      secondary: 1600,
      tertiary: 1200
    },
    h1Templates: {
      homepage: 'Makan Perak - Panduan Kuliner Terbaik di Perak',
      restaurants: 'Restoran Terbaik di Ipoh',
      traditional: 'Nasi Kandar dan Makanan Tradisional Perak',
      halal: 'Restoran Halal Terbaik di Perak'
    },
    h2Templates: {
      popular: 'Restoran Populer di Perak',
      traditional: 'Makanan Tradisional Perak',
      halal: 'Tempat Makan Halal di Ipoh',
      budget: 'Warung Makan Murah di Perak'
    },
    metaTemplates: {
      title: 'Makan Perak - Panduan Kuliner Terbaik di Perak',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Perak. Panduan lengkap untuk makanan halal dan tempat makan enak di Ipoh.',
      keywords: 'makanan Perak, restoran Ipoh, nasi kandar, kuliner Perak, tempat makan halal, warung makan tradisional'
    }
  },
  6: { // Terengganu
    id: 6,
    slug: 'terengganu-food',
    name: 'Makan Terengganu',
    location: 'Terengganu',
    capital: 'Kuala Terengganu',
    domain: 'makan-terengganu.com',
    primaryKeywords: ['makanan Terengganu', 'restoran Kuala Terengganu', 'nasi dagang Terengganu', 'kuliner Terengganu'],
    longTailKeywords: ['restoran halal Kuala Terengganu', 'makanan tradisional Terengganu', 'tempat makan enak Terengganu', 'warung makan Terengganu'],
    signatureDish: 'Nasi Dagang',
    localCuisine: ['Nasi Dagang', 'Keropok Lekor', 'Laksa Terengganu', 'Ayam Percik'],
    searchVolume: {
      primary: 1300,
      secondary: 880,
      tertiary: 720
    },
    h1Templates: {
      homepage: 'Makan Terengganu - Panduan Kuliner Terbaik di Terengganu',
      restaurants: 'Restoran Terbaik di Kuala Terengganu',
      traditional: 'Nasi Dagang dan Makanan Tradisional Terengganu',
      halal: 'Restoran Halal Terbaik di Terengganu'
    },
    h2Templates: {
      popular: 'Restoran Populer di Terengganu',
      traditional: 'Makanan Tradisional Terengganu',
      halal: 'Tempat Makan Halal di Kuala Terengganu',
      budget: 'Warung Makan Murah di Terengganu'
    },
    metaTemplates: {
      title: 'Makan Terengganu - Panduan Kuliner Terbaik di Terengganu',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Terengganu. Panduan lengkap untuk makanan halal dan tempat makan enak di Kuala Terengganu.',
      keywords: 'makanan Terengganu, restoran Kuala Terengganu, nasi dagang, kuliner Terengganu, tempat makan halal, warung makan tradisional'
    }
  },
  7: { // Pahang
    id: 7,
    slug: 'pahang-food',
    name: 'Makan Pahang',
    location: 'Pahang',
    capital: 'Kuantan',
    domain: 'makan-pahang.com',
    primaryKeywords: ['makanan Pahang', 'restoran Kuantan', 'kuliner Pahang', 'tempat makan Pahang'],
    longTailKeywords: ['restoran halal Kuantan', 'makanan tradisional Pahang', 'tempat makan enak Pahang', 'warung makan Pahang'],
    signatureDish: 'Gulai Tempoyak',
    localCuisine: ['Gulai Tempoyak', 'Ikan Patin', 'Laksa Pahang', 'Nasi Ulam'],
    searchVolume: {
      primary: 1600,
      secondary: 1200,
      tertiary: 880
    },
    h1Templates: {
      homepage: 'Makan Pahang - Panduan Kuliner Terbaik di Pahang',
      restaurants: 'Restoran Terbaik di Kuantan',
      traditional: 'Makanan Tradisional Pahang',
      halal: 'Restoran Halal Terbaik di Pahang'
    },
    h2Templates: {
      popular: 'Restoran Populer di Pahang',
      traditional: 'Makanan Tradisional Pahang',
      halal: 'Tempat Makan Halal di Kuantan',
      budget: 'Warung Makan Murah di Pahang'
    },
    metaTemplates: {
      title: 'Makan Pahang - Panduan Kuliner Terbaik di Pahang',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Pahang. Panduan lengkap untuk makanan halal dan tempat makan enak di Kuantan.',
      keywords: 'makanan Pahang, restoran Kuantan, kuliner Pahang, tempat makan halal, warung makan tradisional'
    }
  },
  8: { // Kuala Lumpur
    id: 8,
    slug: 'kuala-lumpur-food',
    name: 'Makan Kuala Lumpur',
    location: 'Kuala Lumpur',
    capital: 'Kuala Lumpur',
    domain: 'makan-kuala-lumpur.com',
    primaryKeywords: ['makanan Kuala Lumpur', 'restoran KL', 'kuliner Kuala Lumpur', 'tempat makan KL'],
    longTailKeywords: ['restoran halal Kuala Lumpur', 'makanan street food KL', 'tempat makan enak KL', 'warung makan KL'],
    signatureDish: 'Nasi Lemak',
    localCuisine: ['Nasi Lemak', 'Satay', 'Roti Canai', 'Laksa'],
    searchVolume: {
      primary: 12100,
      secondary: 8100,
      tertiary: 4400
    },
    h1Templates: {
      homepage: 'Makan Kuala Lumpur - Panduan Kuliner Terbaik di KL',
      restaurants: 'Restoran Terbaik di Kuala Lumpur',
      traditional: 'Street Food dan Kuliner KL',
      halal: 'Restoran Halal Terbaik di KL'
    },
    h2Templates: {
      popular: 'Restoran Populer di Kuala Lumpur',
      traditional: 'Street Food KL',
      halal: 'Tempat Makan Halal di KL',
      budget: 'Warung Makan Murah di KL'
    },
    metaTemplates: {
      title: 'Makan Kuala Lumpur - Panduan Kuliner Terbaik di KL',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Kuala Lumpur. Panduan lengkap untuk makanan halal dan street food enak di KL.',
      keywords: 'makanan Kuala Lumpur, restoran KL, kuliner KL, tempat makan halal, street food KL'
    }
  },
  9: { // Selangor
    id: 9,
    slug: 'selangor-food',
    name: 'Makan Selangor',
    location: 'Selangor',
    capital: 'Shah Alam',
    domain: 'makan-selangor.com',
    primaryKeywords: ['makanan Selangor', 'restoran Shah Alam', 'kuliner Selangor', 'tempat makan Selangor'],
    longTailKeywords: ['restoran halal Shah Alam', 'makanan tradisional Selangor', 'tempat makan enak Selangor', 'warung makan Selangor'],
    signatureDish: 'Laksa Selangor',
    localCuisine: ['Laksa Selangor', 'Nasi Lemak', 'Satay', 'Roti Canai'],
    searchVolume: {
      primary: 3600,
      secondary: 2400,
      tertiary: 1900
    },
    h1Templates: {
      homepage: 'Makan Selangor - Panduan Kuliner Terbaik di Selangor',
      restaurants: 'Restoran Terbaik di Shah Alam',
      traditional: 'Makanan Tradisional Selangor',
      halal: 'Restoran Halal Terbaik di Selangor'
    },
    h2Templates: {
      popular: 'Restoran Populer di Selangor',
      traditional: 'Makanan Tradisional Selangor',
      halal: 'Tempat Makan Halal di Shah Alam',
      budget: 'Warung Makan Murah di Selangor'
    },
    metaTemplates: {
      title: 'Makan Selangor - Panduan Kuliner Terbaik di Selangor',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Selangor. Panduan lengkap untuk makanan halal dan tempat makan enak di Shah Alam.',
      keywords: 'makanan Selangor, restoran Shah Alam, kuliner Selangor, tempat makan halal, warung makan tradisional'
    }
  },
  10: { // Johor
    id: 10,
    slug: 'johor-food',
    name: 'Makan Johor',
    location: 'Johor',
    capital: 'Johor Bahru',
    domain: 'makan-johor.com',
    primaryKeywords: ['makanan Johor', 'restoran Johor Bahru', 'laksa Johor', 'kuliner Johor'],
    longTailKeywords: ['restoran halal Johor Bahru', 'makanan tradisional Johor', 'tempat makan enak Johor', 'warung makan Johor'],
    signatureDish: 'Laksa Johor',
    localCuisine: ['Laksa Johor', 'Nasi Lemak', 'Satay', 'Roti Canai'],
    searchVolume: {
      primary: 2900,
      secondary: 2100,
      tertiary: 1600
    },
    h1Templates: {
      homepage: 'Makan Johor - Panduan Kuliner Terbaik di Johor',
      restaurants: 'Restoran Terbaik di Johor Bahru',
      traditional: 'Laksa Johor dan Makanan Tradisional',
      halal: 'Restoran Halal Terbaik di Johor'
    },
    h2Templates: {
      popular: 'Restoran Populer di Johor',
      traditional: 'Makanan Tradisional Johor',
      halal: 'Tempat Makan Halal di Johor Bahru',
      budget: 'Warung Makan Murah di Johor'
    },
    metaTemplates: {
      title: 'Makan Johor - Panduan Kuliner Terbaik di Johor',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Johor. Panduan lengkap untuk makanan halal dan tempat makan enak di Johor Bahru.',
      keywords: 'makanan Johor, restoran Johor Bahru, laksa Johor, kuliner Johor, tempat makan halal, warung makan tradisional'
    }
  },
  11: { // Melaka
    id: 11,
    slug: 'melaka-food',
    name: 'Makan Melaka',
    location: 'Melaka',
    capital: 'Melaka',
    domain: 'makan-melaka.com',
    primaryKeywords: ['makanan Melaka', 'restoran Melaka', 'nyonya food Melaka', 'kuliner Melaka'],
    longTailKeywords: ['restoran halal Melaka', 'makanan tradisional Melaka', 'tempat makan enak Melaka', 'warung makan Melaka'],
    signatureDish: 'Nyonya Laksa',
    localCuisine: ['Nyonya Laksa', 'Chicken Rice Ball', 'Satay Celup', 'Cendol'],
    searchVolume: {
      primary: 2400,
      secondary: 1900,
      tertiary: 1600
    },
    h1Templates: {
      homepage: 'Makan Melaka - Panduan Kuliner Terbaik di Melaka',
      restaurants: 'Restoran Terbaik di Melaka',
      traditional: 'Nyonya Food dan Makanan Tradisional Melaka',
      halal: 'Restoran Halal Terbaik di Melaka'
    },
    h2Templates: {
      popular: 'Restoran Populer di Melaka',
      traditional: 'Makanan Tradisional Melaka',
      halal: 'Tempat Makan Halal di Melaka',
      budget: 'Warung Makan Murah di Melaka'
    },
    metaTemplates: {
      title: 'Makan Melaka - Panduan Kuliner Terbaik di Melaka',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Melaka. Panduan lengkap untuk makanan halal dan nyonya food enak di Melaka.',
      keywords: 'makanan Melaka, restoran Melaka, nyonya food, kuliner Melaka, tempat makan halal, warung makan tradisional'
    }
  },
  12: { // Negeri Sembilan
    id: 12,
    slug: 'negeri-sembilan-food',
    name: 'Makan Negeri Sembilan',
    location: 'Negeri Sembilan',
    capital: 'Seremban',
    domain: 'makan-negeri-sembilan.com',
    primaryKeywords: ['makanan Negeri Sembilan', 'restoran Seremban', 'kuliner Negeri Sembilan', 'tempat makan NS'],
    longTailKeywords: ['restoran halal Seremban', 'makanan tradisional Negeri Sembilan', 'tempat makan enak NS', 'warung makan Negeri Sembilan'],
    signatureDish: 'Laksa Negeri Sembilan',
    localCuisine: ['Laksa Negeri Sembilan', 'Nasi Lemak', 'Satay', 'Roti Canai'],
    searchVolume: {
      primary: 880,
      secondary: 720,
      tertiary: 590
    },
    h1Templates: {
      homepage: 'Makan Negeri Sembilan - Panduan Kuliner Terbaik di NS',
      restaurants: 'Restoran Terbaik di Seremban',
      traditional: 'Makanan Tradisional Negeri Sembilan',
      halal: 'Restoran Halal Terbaik di NS'
    },
    h2Templates: {
      popular: 'Restoran Populer di Negeri Sembilan',
      traditional: 'Makanan Tradisional NS',
      halal: 'Tempat Makan Halal di Seremban',
      budget: 'Warung Makan Murah di NS'
    },
    metaTemplates: {
      title: 'Makan Negeri Sembilan - Panduan Kuliner Terbaik di NS',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Negeri Sembilan. Panduan lengkap untuk makanan halal dan tempat makan enak di Seremban.',
      keywords: 'makanan Negeri Sembilan, restoran Seremban, kuliner NS, tempat makan halal, warung makan tradisional'
    }
  },
  13: { // Sabah
    id: 13,
    slug: 'sabah-food',
    name: 'Makan Sabah',
    location: 'Sabah',
    capital: 'Kota Kinabalu',
    domain: 'makan-sabah.com',
    primaryKeywords: ['makanan Sabah', 'restoran Kota Kinabalu', 'kuliner Sabah', 'tempat makan Sabah'],
    longTailKeywords: ['restoran halal Kota Kinabalu', 'makanan tradisional Sabah', 'tempat makan enak Sabah', 'warung makan Sabah'],
    signatureDish: 'Hinava',
    localCuisine: ['Hinava', 'Ambuyat', 'Laksa Sabah', 'Nasi Lemak'],
    searchVolume: {
      primary: 2100,
      secondary: 1600,
      tertiary: 1300
    },
    h1Templates: {
      homepage: 'Makan Sabah - Panduan Kuliner Terbaik di Sabah',
      restaurants: 'Restoran Terbaik di Kota Kinabalu',
      traditional: 'Makanan Tradisional Sabah',
      halal: 'Restoran Halal Terbaik di Sabah'
    },
    h2Templates: {
      popular: 'Restoran Populer di Sabah',
      traditional: 'Makanan Tradisional Sabah',
      halal: 'Tempat Makan Halal di Kota Kinabalu',
      budget: 'Warung Makan Murah di Sabah'
    },
    metaTemplates: {
      title: 'Makan Sabah - Panduan Kuliner Terbaik di Sabah',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Sabah. Panduan lengkap untuk makanan halal dan tempat makan enak di Kota Kinabalu.',
      keywords: 'makanan Sabah, restoran Kota Kinabalu, kuliner Sabah, tempat makan halal, warung makan tradisional'
    }
  },
  14: { // Sarawak
    id: 14,
    slug: 'sarawak-food',
    name: 'Makan Sarawak',
    location: 'Sarawak',
    capital: 'Kuching',
    domain: 'makan-sarawak.com',
    primaryKeywords: ['makanan Sarawak', 'restoran Kuching', 'laksa Sarawak', 'kuliner Sarawak'],
    longTailKeywords: ['restoran halal Kuching', 'makanan tradisional Sarawak', 'tempat makan enak Sarawak', 'warung makan Sarawak'],
    signatureDish: 'Laksa Sarawak',
    localCuisine: ['Laksa Sarawak', 'Kolo Mee', 'Ambuyat', 'Nasi Lemak'],
    searchVolume: {
      primary: 1900,
      secondary: 1600,
      tertiary: 1200
    },
    h1Templates: {
      homepage: 'Makan Sarawak - Panduan Kuliner Terbaik di Sarawak',
      restaurants: 'Restoran Terbaik di Kuching',
      traditional: 'Laksa Sarawak dan Makanan Tradisional',
      halal: 'Restoran Halal Terbaik di Sarawak'
    },
    h2Templates: {
      popular: 'Restoran Populer di Sarawak',
      traditional: 'Makanan Tradisional Sarawak',
      halal: 'Tempat Makan Halal di Kuching',
      budget: 'Warung Makan Murah di Sarawak'
    },
    metaTemplates: {
      title: 'Makan Sarawak - Panduan Kuliner Terbaik di Sarawak',
      description: 'Temukan restoran terbaik, resepi tradisional, dan acara kuliner di Sarawak. Panduan lengkap untuk makanan halal dan tempat makan enak di Kuching.',
      keywords: 'makanan Sarawak, restoran Kuching, laksa Sarawak, kuliner Sarawak, tempat makan halal, warung makan tradisional'
    }
  }
};

// Helper functions untuk SEO
export function getSEOConfig(websiteId) {
  return seoConfigs[websiteId] || seoConfigs[1]; // Default ke Kelantan
}

export function generatePageTitle(websiteId, pageType, customTitle = '') {
  const config = getSEOConfig(websiteId);
  if (customTitle) return `${customTitle} - ${config.name}`;
  return config.h1Templates[pageType] || config.metaTemplates.title;
}

export function generateMetaDescription(websiteId, pageType, customDescription = '') {
  const config = getSEOConfig(websiteId);
  if (customDescription) return customDescription;
  return config.metaTemplates.description;
}

export function generateKeywords(websiteId, customKeywords = []) {
  const config = getSEOConfig(websiteId);
  const allKeywords = [...config.primaryKeywords, ...config.longTailKeywords, ...customKeywords];
  return allKeywords.join(', ');
}

export function generateH1(websiteId, pageType, customH1 = '') {
  const config = getSEOConfig(websiteId);
  if (customH1) return customH1;
  return config.h1Templates[pageType] || config.h1Templates.homepage;
}

export function generateH2(websiteId, pageType, customH2 = '') {
  const config = getSEOConfig(websiteId);
  if (customH2) return customH2;
  return config.h2Templates[pageType] || config.h2Templates.popular;
}

// Schema markup generator
export function generateSchemaMarkup(websiteId, pageType, content = {}) {
  const config = getSEOConfig(websiteId);
  
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": config.name,
    "url": `https://${config.domain}`,
    "description": config.metaTemplates.description,
    "publisher": {
      "@type": "Organization",
      "name": config.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": config.capital,
        "addressRegion": config.location,
        "addressCountry": "Malaysia"
      }
    }
  };

  if (pageType === 'restaurant') {
    return {
      ...baseSchema,
      "@type": "Restaurant",
      "name": content.name || `Restoran di ${config.capital}`,
      "description": content.description || `Restoran terbaik di ${config.capital}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": config.capital,
        "addressRegion": config.location,
        "addressCountry": "Malaysia"
      },
      "servesCuisine": config.localCuisine,
      "priceRange": content.priceRange || "$$"
    };
  }

  if (pageType === 'article') {
    return {
      ...baseSchema,
      "@type": "Article",
      "headline": content.title || config.h1Templates.homepage,
      "description": content.description || config.metaTemplates.description,
      "author": {
        "@type": "Organization",
        "name": config.name
      },
      "publisher": {
        "@type": "Organization",
        "name": config.name,
        "logo": {
          "@type": "ImageObject",
          "url": `https://${config.domain}/logo.png`
        }
      },
      "datePublished": content.publishedDate || new Date().toISOString(),
      "dateModified": content.modifiedDate || new Date().toISOString()
    };
  }

  return baseSchema;
}
