<script lang="ts">
  import { Button } from '$components/ui/button';
  import { setLocale, getLocale } from '$lib/paraglide/runtime';
  import { m } from '$lib/paraglide/messages';
  import Label from '$components/ui/label/label.svelte';
  import Wrapper from '$components/Wrapper.svelte';
  import Sun from '@lucide/svelte/icons/sun';
  import Moon from '@lucide/svelte/icons/moon';

  import { toggleMode, resetMode } from 'mode-watcher';
  import PageHeading from '$components/app/PageHeading.svelte';
  import Separator from '$components/ui/separator/separator.svelte';
  import { SunMoon } from '@lucide/svelte';
  import { currentUser, pbClient } from '$lib/pocketbase';
  import { UsersRoleOptions } from '$types/pocketbase';
  import { goto } from '$app/navigation';

  function handleLogout() {
    pbClient.authStore.clear();
    currentUser.set(null);
    goto('/login');
  }
</script>

<Wrapper class="flex flex-col gap-4">
  <PageHeading>{m.app_settings_heading()}</PageHeading>

  <div class="flex items-center justify-between">
    <Label class="text-md flex items-center">{m.app_settings_darkMode()}</Label>
    <div class="flex items-center gap-2">
      <Button on:click={toggleMode} variant="outline" size="icon">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">{m.app_settings_darkModeHint()}</span>
      </Button>
      <Button
        on:click={resetMode}
        variant="outline"
        size="icon"
        title={m.app_settings_systemDefaultHint()}
      >
        <SunMoon class="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <span class="sr-only">{m.app_settings_systemDefaultHint()}</span>
    </div>
  </div>
  <Separator />
  <div class="flex items-center justify-between">
    <Label class="text-md flex items-center">{m.app_settings_language()}</Label>
    <Button
      variant="outline"
      on:click={() => {
        getLocale() === 'cs' ? setLocale('en') : setLocale('cs');
      }}>{getLocale() === 'cs' ? 'Čeština' : 'English'}</Button
    >
  </div>
  <Separator />
  <div class="flex flex-row-reverse items-center gap-4">
    <Button onclick={handleLogout} variant="destructive">{m.app_settings_signOut()}</Button>
    {#if $currentUser?.role === UsersRoleOptions.admin}
      <Button href="/admin" variant="secondary">{m.app_settings_changeToAdminButton()}</Button>
    {/if}
  </div>
</Wrapper>
