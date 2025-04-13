<script lang="ts">
  import { CircleUser, HeartPulse, ChartLine, Menu, Search, Users } from '@lucide/svelte';

  import { Button } from '$components/ui/button/index.js';
  import * as DropdownMenu from '$components/ui/dropdown-menu/index.js';
  import { Input } from '$components/ui/input/index.js';
  import * as Sheet from '$components/ui/sheet/index.js';
  import { currentUser, pbClient } from '$lib/pocketbase/';

  import { page } from '$app/state';
  import { goto } from '$app/navigation';

  let { children } = $props();

  let currentPathSegments = $derived(page.url.pathname.split('/').filter(Boolean));

  function handleLogout() {
    pbClient.authStore.clear();
    currentUser.set(null);
    goto('/login');
  }
</script>

<div class="grid min-h-screen w-svw max-w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a href="/" class="flex items-center gap-2 font-semibold">
          <HeartPulse class="h-6 w-6" />
          <span class="">
            {$currentUser?.name}&nbsp;{$currentUser?.surname}
          </span>
        </a>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <a
            href="/admin/patients"
            class={currentPathSegments[1] === 'patients'
              ? 'flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary'
              : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'}
          >
            <Users class="h-4 w-4" />
            Patients
          </a>
          <a
            href="/admin/flyers"
            class={currentPathSegments[1] === 'flyers'
              ? 'flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary'
              : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'}
          >
            <ChartLine class="h-4 w-4" />
            Flyers
          </a>
        </nav>
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet.Root>
        <Sheet.Trigger asChild let:builder>
          <Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left" class="flex flex-col">
          <nav class="grid gap-2 text-lg font-medium">
            <Sheet.Close asChild let:builder>
              <Button
                variant="ghost"
                class={currentPathSegments[1] === 'patients'
                  ? 'mx-[-0.65rem] flex items-center justify-start gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'
                  : 'mx-[-0.65rem] flex items-center justify-start gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'}
                href="/admin/patients"
                builders={[builder]}
              >
                <Users class="h-5 w-5" />
                Patients
              </Button>
              <Button
                variant="ghost"
                class={currentPathSegments[1] === 'flyers'
                  ? 'mx-[-0.65rem] flex items-center justify-start gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'
                  : 'mx-[-0.65rem] flex items-center justify-start gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'}
                href="/admin/flyers"
                builders={[builder]}
              >
                <ChartLine class="h-5 w-5" />
                Flyers
              </Button>
            </Sheet.Close>
          </nav>
        </Sheet.Content>
      </Sheet.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder class="">
          <Button
            builders={[builder]}
            variant="secondary"
            size="icon"
            class="ml-auto mr-0 rounded-full"
          >
            <CircleUser class="h-5 w-5" />
            <span class="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Item href="/app">Switch to user</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onclick={handleLogout}>Logout</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </header>
    <main class="max-w-svw flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {@render children()}
    </main>
  </div>
</div>
