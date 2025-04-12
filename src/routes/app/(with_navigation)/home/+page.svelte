<script lang="ts">
  import { Button } from '$components/ui/button';
  import Wrapper from '$components/Wrapper.svelte';
</script>

<Wrapper>
  <header class="mb-8 text-center">
    <h1 class="text-4xl font-bold text-gray-800">Vítej v OnkoApp</h1>
    <p class="mt-2 text-gray-600">This is your personalized space. Explore and enjoy!</p>
  </header>

  <section class="flex flex-col gap-6">
    <div class="rounded-lg bg-white p-6 shadow">
      <h2 class="text-xl font-semibold text-gray-800">Sebevzdělávání</h2>
      <p class="mt-2 text-gray-600">Máte zájem si doplnit informace ohledně léčby</p>
      <Button class="mt-4">Chci se dozvědět více</Button>
    </div>
    <div class="rounded-lg bg-white p-6 shadow">
      <h2 class="text-xl font-semibold text-gray-800">Moje léčba</h2>
      <p class="mt-2 text-gray-600">Informace o průběhu léčby</p>
      <Button class="mt-4">Zobrazit léčbu</Button>
    </div>

    <Button class="mt-4 bg-red-500 text-white hover:bg-red-600" href="/admin">Změnit na admina</Button>
  </section>
</Wrapper>
