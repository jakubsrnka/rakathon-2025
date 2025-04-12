<script lang="ts">
  import { Button } from '$components/ui/button';
  import Wrapper from '$components/Wrapper.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<Wrapper>
  <header class="mb-8 text-center">
    <h1 class="text-4xl font-bold text-gray-800">{m.app_home_welcomeHeading()}</h1>
    <p class="mt-2 text-gray-600">{m.app_home_welcomeText()}</p>
  </header>

  <section class="flex flex-col gap-6">
    <div class="rounded-lg bg-white p-6 shadow">
      <h2 class="text-xl font-semibold text-gray-800">{m.app_home_selfEducationHeading()}</h2>
      <p class="mt-2 text-gray-600">{m.app_home_selfEducationText()}</p>
      <Button class="mt-4">{m.app_home_selfEducationButton()}</Button>
    </div>
    <div class="rounded-lg bg-white p-6 shadow">
      <h2 class="text-xl font-semibold text-gray-800">{m.app_home_treatmentHeading()}</h2>
      <p class="mt-2 text-gray-600">{m.app_home_treatmentText()}</p>
      <Button class="mt-4">{m.app_home_treatmentButton()}</Button>
    </div>

    <Button class="mt-[400px] bg-red-500 text-white hover:bg-red-600" href="/admin"
      >Změnit na admina</Button
    >
  </section>
</Wrapper>
