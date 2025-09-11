<!-- Simple Ads Placement untuk User-Side Only -->
<script>
  import AdsComponent from './AdsComponent.svelte';
  
  export let websiteId;
  export let placement; // 'header', 'sidebar', 'content', 'footer', 'in-article'
  export let pageData = {};
  export let articleData = null; // Untuk in-article ads
  
  // Mapping placement ke ad type
  $: adType = {
    'header': 'banner',
    'sidebar': 'banner', 
    'content': 'banner',
    'footer': 'banner',
    'in-article': 'in-article'
  }[placement] || 'banner';
  
  // Custom styling berdasarkan placement
  $: placementStyle = {
    'header': 'margin-bottom: 1rem;',
    'sidebar': 'margin: 1rem 0;',
    'content': 'margin: 2rem 0; text-align: center;',
    'footer': 'margin-top: 2rem;',
    'in-article': 'margin: 1.5rem 0; text-align: center;'
  }[placement] || '';
  
  // Custom class berdasarkan placement
  $: placementClass = {
    'header': 'ads-header',
    'sidebar': 'ads-sidebar',
    'content': 'ads-content',
    'footer': 'ads-footer',
    'in-article': 'ads-in-article'
  }[placement] || 'ads-default';
</script>

<AdsComponent 
  {websiteId}
  {adType}
  {placement}
  {pageData}
  className={placementClass}
  style={placementStyle}
/>
