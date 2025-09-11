import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase.js';
import { 
  generateArticleStructuredData, 
  generateCanonicalUrl 
} from '$lib/seo.js';
import { generateWebsiteStructuredData } from '$lib/website-seo-data.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, params }) {
  const websiteSlug = params.slug;
  const type = url.searchParams.get('type');
  const articleSlug = url.searchParams.get('article');
  
  try {
    // Ambil data website dari database
    const { data: website, error: websiteError } = await supabase
      .from('websites')
      .select('*')
      .eq('slug', websiteSlug)
      .single();

    if (websiteError || !website) {
      return json({ error: 'Website not found' }, { status: 404 });
    }

    let result = {};

    switch (type) {
      case 'website':
        result = generateWebsiteStructuredData(website);
        break;
        
      case 'article':
        if (!articleSlug) {
          return json({ error: 'Article slug required' }, { status: 400 });
        }
        
        // Ambil data artikel
        const { data: article, error: articleError } = await supabase
          .from('articles')
          .select('*')
          .eq('website_id', website.id)
          .eq('slug', articleSlug)
          .eq('is_published', true)
          .single();

        if (articleError || !article) {
          return json({ error: 'Article not found' }, { status: 404 });
        }

        const canonicalUrl = generateCanonicalUrl(website, `article/${article.slug}`);
        result = generateArticleStructuredData(article, website, canonicalUrl);
        break;
        
      case 'breadcrumb':
        const breadcrumbs = [
          { name: 'Home', url: generateCanonicalUrl(website) },
          { name: 'Food', url: generateCanonicalUrl(website, 'food') }
        ];
        
        if (articleSlug) {
          const { data: article } = await supabase
            .from('articles')
            .select('title, category')
            .eq('website_id', website.id)
            .eq('slug', articleSlug)
            .single();
            
          if (article) {
            breadcrumbs.push(
              { name: article.category, url: generateCanonicalUrl(website, article.category) },
              { name: article.title, url: generateCanonicalUrl(website, `article/${articleSlug}`) }
            );
          }
        }
        
        result = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url
          }))
        };
        break;
        
      default:
        return json({ error: 'Invalid type' }, { status: 400 });
    }

    return json(result);

  } catch (error) {
    console.error('Error in SEO helper:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}
