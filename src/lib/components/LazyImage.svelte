<!-- Lazy Loading Image Component untuk performance optimization -->
<script>
  import { onMount } from 'svelte';
  
  export let src;
  export let alt = '';
  export let width;
  export let height;
  export let className = '';
  export let placeholder = 'https://via.placeholder.com/800x400?text=Loading...';
  export let threshold = 0.1;
  export let rootMargin = '50px';
  export let loading = 'lazy';
  export let decoding = 'async';
  
  let element;
  let loaded = false;
  let error = false;
  let currentSrc = placeholder;
  
  onMount(() => {
    if (!element) return;
    
    // Jika loading = 'eager', load langsung
    if (loading === 'eager') {
      loadImage();
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loaded) {
            loadImage();
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  });
  
  function loadImage() {
    const img = new Image();
    img.onload = () => {
      currentSrc = src;
      loaded = true;
    };
    img.onerror = () => {
      error = true;
      currentSrc = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
    };
    img.src = src;
  }
  
  function handleError() {
    error = true;
    currentSrc = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
  }
</script>

<img
  bind:this={element}
  src={currentSrc}
  alt={alt}
  width={width}
  height={height}
  class={className}
  loading={loading}
  decoding={decoding}
  on:error={handleError}
  style:opacity={loaded ? 1 : 0.7}
  style:transition="opacity 0.3s ease-in-out"
/>

<style>
  img {
    transition: opacity 0.3s ease-in-out;
  }
</style>
