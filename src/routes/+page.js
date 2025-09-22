import { DEFAULT_WEBSITE_ID, getCurrentTenantConfig } from '$lib/tenant';

/** @type {import('./$types').PageLoad} */
export async function load() {
  // Gunakan konfigurasi terpusat dari tenant
  const tenantConfig = getCurrentTenantConfig();
  
  const website = {
    id: tenantConfig.id,
    name: tenantConfig.name,
    slug: tenantConfig.slug,
    description: tenantConfig.description,
    logo_url: tenantConfig.logo_url
  };
  
  return {
    website,
    tenantConfig // Sertakan config lengkap untuk kebutuhan lain
  };
}