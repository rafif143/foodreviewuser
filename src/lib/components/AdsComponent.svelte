<!-- Simple Ads Component untuk User-Side Only -->
<script>
  import { onMount } from 'svelte';
  import { getAdsConfig, getAdsContent, generateAdSenseScript, generateAdSenseAd, shouldDisplayAd } from '$lib/ads-config';
  
  export let websiteId;
  export let adType = 'banner'; // 'banner', 'sidebar', 'in-article', 'popup'
  export let position = 'content'; // 'header', 'footer', 'sidebar', 'content'
  export let pageData = {}; // Data halaman untuk conditional display
  export let className = ''; // Custom CSS class
  export let style = ''; // Custom inline style
  
  let adsConfig = null;
  let adsContent = [];
  let isLoading = true;
  let shouldShow = false;
  
  // Load ads configuration
  onMount(async () => {
    try {
      // Load ads config
      adsConfig = await getAdsConfig(websiteId);
      
      // Check if ads are enabled
      if (!adsConfig.ads_enabled) {
        isLoading = false;
        return;
      }
      
      // Load ads content
      adsContent = await getAdsContent(websiteId, adType, position);
      
      // Filter ads based on display conditions
      adsContent = adsContent.filter(ad => shouldDisplayAd(ad, pageData));
      
      // Check if we should show ads
      shouldShow = adsContent.length > 0;
      
    } catch (error) {
      console.warn('Error loading ads:', error);
    } finally {
      isLoading = false;
    }
  });
  
  // Generate AdSense script if needed
  $: adSenseScript = adsConfig?.google_adsense_client_id ? 
    generateAdSenseScript(adsConfig.google_adsense_client_id) : '';
  
  // Generate AdSense ad if needed
  $: adSenseAd = adsConfig?.google_adsense_client_id && adsConfig?.google_adsense_slot_id ? 
    generateAdSenseAd(
      adsConfig.google_adsense_client_id, 
      adsConfig.google_adsense_slot_id,
      'auto',
      'display:block; width:100%;'
    ) : '';
</script>

{#if !isLoading && shouldShow}
  <div class="ads-container {className}" style={style}>
    <!-- AdSense Script -->
    {#if adSenseScript}
      {@html adSenseScript}
    {/if}
    
    <!-- AdSense Ad -->
    {#if adSenseAd}
      <div class="adsense-ad">
        {@html adSenseAd}
      </div>
    {/if}
    
    <!-- Custom Ads Content -->
    {#each adsContent as ad}
      {#if ad.ad_code}
        <div class="custom-ad" data-ad-id={ad.id}>
          {@html ad.ad_code}
        </div>
      {/if}
    {/each}
  </div>
{/if}

<style>
  .ads-container {
    margin: 1rem 0;
    text-align: center;
  }
  
  .adsense-ad {
    margin: 0.5rem 0;
  }
  
  .custom-ad {
    margin: 0.5rem 0;
  }
  
  /* Responsive ads */
  @media (max-width: 768px) {
    .ads-container {
      margin: 0.5rem 0;
    }
  }
  
  /* Hide ads on print */
  @media print {
    .ads-container {
      display: none !important;
    }
  }
</style>
