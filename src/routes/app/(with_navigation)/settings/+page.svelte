<script lang="ts">
  import { Button } from '$components/ui/button';
  import { setLocale, getLocale } from '$lib/paraglide/runtime';
  import { m } from '$lib/paraglide/messages';
</script>

<div class="align-center flex h-full justify-center">
  <Button
    on:click={() => {
      getLocale() === 'cs' ? setLocale('en') : setLocale('cs');
    }}>{getLocale() === 'cs' ? 'Switch to English' : 'Přepnout na češtinu'}</Button
  >
</div>
