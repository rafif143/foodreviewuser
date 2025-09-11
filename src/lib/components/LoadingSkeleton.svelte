<!-- Loading Skeleton Component untuk better UX -->
<script>
  export let type = 'article'; // article, card, list, text
  export let width = '100%';
  export let height = '200px';
  
  const skeletons = {
    article: {
      lines: 4,
      structure: ['title', 'text', 'text', 'image']
    },
    card: {
      lines: 3,
      structure: ['image', 'title', 'text']
    },
    list: {
      lines: 5,
      structure: ['item', 'item', 'item', 'item', 'item']
    },
    text: {
      lines: 3,
      structure: ['text', 'text', 'text']
    }
  };
  
  $: skeletonConfig = skeletons[type] || skeletons.text;
</script>

<div class="skeleton-container" style="width: {width}; height: {height};">
  {#if type === 'article'}
    <!-- Article skeleton -->
    <div class="space-y-4">
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line skeleton-text"></div>
      <div class="skeleton-line skeleton-text skeleton-short"></div>
      <div class="skeleton-image"></div>
    </div>
  {:else if type === 'card'}
    <!-- Card skeleton -->
    <div class="space-y-3">
      <div class="skeleton-image skeleton-card-image"></div>
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line skeleton-text"></div>
    </div>
  {:else if type === 'list'}
    <!-- List skeleton -->
    <div class="space-y-3">
      {#each Array(skeletonConfig.lines) as _}
        <div class="skeleton-list-item">
          <div class="skeleton-avatar"></div>
          <div class="flex-1 space-y-2">
            <div class="skeleton-line skeleton-text"></div>
            <div class="skeleton-line skeleton-text skeleton-short"></div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <!-- Text skeleton -->
    <div class="space-y-3">
      {#each Array(skeletonConfig.lines) as _}
        <div class="skeleton-line skeleton-text"></div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .skeleton-container {
    padding: 1rem;
  }
  
  .skeleton-line {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    height: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .skeleton-title {
    height: 1.5rem;
    width: 70%;
  }
  
  .skeleton-text {
    height: 1rem;
    width: 100%;
  }
  
  .skeleton-text.skeleton-short {
    width: 60%;
  }
  
  .skeleton-image {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 8px;
    height: 200px;
    width: 100%;
  }
  
  .skeleton-card-image {
    height: 150px;
  }
  
  .skeleton-list-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.5rem 0;
  }
  
  .skeleton-avatar {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
  }
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .skeleton-line,
    .skeleton-image,
    .skeleton-avatar {
      background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
      background-size: 200% 100%;
    }
  }
</style>
