import { DEFAULT_WEBSITE } from '$lib/tenant';

/** @type {import('./$types').PageLoad} */
export async function load() {
  return {
    website: DEFAULT_WEBSITE
  };
}
