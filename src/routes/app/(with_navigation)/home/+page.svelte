<script lang="ts">
  import PageHeading from '$components/app/PageHeading.svelte';
  import { Button } from '$components/ui/button';
  import Wrapper from '$components/Wrapper.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<Wrapper>
  <header class="mb-8 text-center">
    <PageHeading>{m.app_home_welcomeHeading()}</PageHeading>
    <p class="mt-2 text-muted-foreground">{m.app_home_welcomeText()}</p>
  </header>

  <section class="flex flex-col gap-6">
    <div class="rounded-lg border border-border p-6 shadow-sm">
      <h2 class="text-xl font-semibold text-foreground">{m.app_home_selfEducationHeading()}</h2>
      <p class="mt-2 text-muted-foreground">{m.app_home_selfEducationText()}</p>
      <Button class="mt-4" variant="outline">{m.app_home_selfEducationButton()}</Button>
    </div>
    <div class="rounded-lg border border-border p-6 shadow-sm">
      <h2 class="text-xl font-semibold text-foreground">{m.app_home_treatmentHeading()}</h2>
      <p class="mt-2 text-muted-foreground">{m.app_home_treatmentText()}</p>
      <Button class="mt-4" variant="outline">{m.app_home_treatmentButton()}</Button>
    </div>

    <Button
      class="hover:bg-destructive-hover mt-[400px] bg-destructive text-destructive-foreground"
      href="/admin">Změnit na admina</Button
    >
  </section>
</Wrapper>
