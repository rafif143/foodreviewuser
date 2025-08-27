import { getWebsiteBySlug } from '$lib/tenant';
import { supabase } from '$lib/supabase.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutLoad} */
export async function load({ params }) {
  const website = await getWebsiteBySlug(params.slug);
  
  if (!website) {
    throw error(404, 'Website not found');
  }

  // Fetch contact data for social media links
  let contactData = null;
  try {
    const { data, error: contactError } = await supabase
      .from('contact')
      .select('social_media')
      .eq('website_id', website.id)
      .single();

    if (!contactError && data) {
      contactData = data;
    }
  } catch (err) {
    console.warn('Could not fetch contact data:', err);
    // Use default social media data if contact data is not available
    contactData = {
      social_media: {
        title: "Ikuti Kami",
        description: "Ikuti kami di media sosial untuk mendapatkan update terbaru",
        platforms: [
          {
            url: "https://twitter.com/Kelantanfood",
            icon_name: "x",
            is_active: true
          },
          {
            url: "https://instagram.com/Kelantanfood",
            icon_name: "instagram",
            is_active: true
          },
          {
            url: "https://youtube.com/Kelantanfood",
            icon_name: "youtube",
            is_active: true
          },
          {
            url: "https://facebook.com/Kelantanfood",
            icon_name: "facebook",
            is_active: true
          }
        ]
      }
    };
  }

  return {
    website,
    contactData
  };
}
