<script>
  import { Home, MessageSquare, Settings } from '@lucide/svelte';
  import { page } from '$app/state';

  let { children } = $props();

  let currentPathSegments = $derived(page.url.pathname.split('/').filter(Boolean));
</script>

<div class="mx-auto max-w-screen-sm">
  {@render children()}
  <div
    class="fixed inset-x-0 bottom-0 flex h-12 items-center justify-between border-t border-border px-4 shadow-md"
    class:shadow={currentPathSegments[1] !== 'home'}
  >
    <div class="mx-auto flex h-full w-full max-w-screen-sm items-center justify-between">
      <a href="/app/home" class="flex h-full w-full items-center justify-center">
        <Home
          class={currentPathSegments[1] === 'home' ? 'text-primary' : 'text-muted-foreground'}
        />
      </a>
      <a href="/app/notifications" class="flex h-full w-full items-center justify-center">
        <MessageSquare
          class={currentPathSegments[1] === 'notifications'
            ? 'text-primary'
            : 'text-muted-foreground'}
        />
      </a>
      <a href="/app/settings" class="flex h-full w-full items-center justify-center">
        <Settings
          class={currentPathSegments[1] === 'settings' ? 'text-primary' : 'text-muted-foreground'}
        />
      </a>
    </div>
  </div>
</div>
