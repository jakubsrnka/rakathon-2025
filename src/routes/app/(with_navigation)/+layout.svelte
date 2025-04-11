<script>
  import { Bell, Home } from '@lucide/svelte';
  import { page } from '$app/state';

  let { children } = $props();

  let currentPathSegments = $derived(page.url.pathname.split('/').filter(Boolean));
</script>

<div class="max-w-screen-sm mx-auto">
  {@render children()}
  <div
    class="fixed inset-x-0 bottom-0 flex h-12 items-center justify-between bg-white px-4 shadow-md border-t border-gray-200"
    class:shadow={currentPathSegments[1] !== 'home'}>
    <div class="flex w-full h-full max-w-screen-sm items-center justify-between mx-auto">
      <a href="/app/home" class="flex h-full w-full items-center justify-center">
        <Home color={currentPathSegments[1] === 'home' ? 'black' : 'grey'} />
      </a>
      <a href="/app/notifications" class="flex h-full w-full items-center justify-center">
        <Bell color={currentPathSegments[1] === 'notifications' ? 'black' : 'grey'} />
      </a>
    </div>
  </div>
</div>
