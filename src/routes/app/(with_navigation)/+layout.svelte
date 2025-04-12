<script>
  import { Home, MessageSquare } from '@lucide/svelte';
  import { page } from '$app/state';

  let { children } = $props();

  let currentPathSegments = $derived(page.url.pathname.split('/').filter(Boolean));
</script>

<div class="mx-auto max-w-screen-sm">
  {@render children()}
  <div
    class="fixed inset-x-0 bottom-0 flex h-12 items-center justify-between border-t border-gray-200 bg-white px-4 shadow-md"
    class:shadow={currentPathSegments[1] !== 'home'}
  >
    <div class="mx-auto flex h-full w-full max-w-screen-sm items-center justify-between">
      <a href="/app/home" class="flex h-full w-full items-center justify-center">
        <Home color={currentPathSegments[1] === 'home' ? 'black' : 'grey'} />
      </a>
      <a href="/app/notifications" class="flex h-full w-full items-center justify-center">
        <MessageSquare color={currentPathSegments[1] === 'notifications' ? 'black' : 'grey'} />
      </a>
    </div>
  </div>
</div>
