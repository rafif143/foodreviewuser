<!-- Lazy Loading Component untuk performance optimization -->
<script>
  import { onMount } from 'svelte';
  
  export let component;
  export let props = {};
  export let fallback = null;
  export let threshold = 0.1;
  export let rootMargin = '50px';
  
  let element;
  let loaded = false;
  let loading = false;
  let error = null;
  
  let Component;
  
  onMount(() => {
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loaded && !loading) {
            loadComponent();
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
  
  async function loadComponent() {
    loading = true;
    try {
      Component = await component();
      loaded = true;
    } catch (err) {
      error = err;
      console.error('Failed to load component:', err);
    } finally {
      loading = false;
    }
  }
</script>

<div bind:this={element} class="lazy-component">
  {#if loaded && Component}
    <svelte:component this={Component} {...props} />
  {:else if loading}
    <div class="loading-placeholder">
      {#if fallback}
        {@render fallback()}
      {:else}
        <div class="animate-pulse bg-gray-200 rounded-lg h-32 w-full"></div>
      {/if}
    </div>
  {:else if error}
    <div class="error-placeholder bg-red-100 border border-red-300 rounded-lg p-4">
      <p class="text-red-700">Failed to load component</p>
    </div>
  {:else}
    <div class="placeholder">
      {#if fallback}
        {@render fallback()}
      {:else}
        <div class="animate-pulse bg-gray-200 rounded-lg h-32 w-full"></div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .lazy-component {
    min-height: 100px;
  }
  
  .loading-placeholder,
  .placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
