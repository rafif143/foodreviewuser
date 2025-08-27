<!-- src/routes/[slug]/+layout.svelte -->
<script>
  import { page } from '$app/stores';
  import NavigationMenu from '$lib/components/NavigationMenu.svelte';
  import Footer from '$lib/components/Footer.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="min-h-screen flex flex-col">
  <NavigationMenu website={data.website} contactData={data.contactData} />
  <main class="flex-grow">
    <slot />
  </main>
  <Footer website={data.website} />
</div>