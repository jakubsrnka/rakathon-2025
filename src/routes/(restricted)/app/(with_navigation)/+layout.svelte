<script>
  import { Home, MessageSquare, Settings } from '@lucide/svelte';
  import { page } from '$app/state';

  let { children } = $props();

  let currentPathSegments = $derived(page.url.pathname.split('/').filter(Boolean));
</script>

<div class="mx-auto max-w-screen-sm">
  {@render children()}
  <div
    class="fixed inset-x-0 bottom-0 flex h-12 items-center justify-between border-t border-border bg-background px-4 shadow-md"
  >
    <div class="mx-auto flex h-full w-full max-w-screen-sm items-center justify-between">
      <a href="/app" class="flex h-full w-full items-center justify-center">
        <Home
          class={currentPathSegments[currentPathSegments.length - 1] === 'app'
            ? 'text-primary'
            : 'text-muted-foreground'}
        />
      </a>
      <a href="/app/notifications" class="flex h-full w-full items-center justify-center">
        <MessageSquare
          class={currentPathSegments[currentPathSegments.length - 1] === 'notifications'
            ? 'text-primary'
            : 'text-muted-foreground'}
        />
      </a>
      <a href="/app/settings" class="flex h-full w-full items-center justify-center">
        <Settings
          class={currentPathSegments[currentPathSegments.length - 1] === 'settings'
            ? 'text-primary'
            : 'text-muted-foreground'}
        />
      </a>
    </div>
  </div>
</div>
