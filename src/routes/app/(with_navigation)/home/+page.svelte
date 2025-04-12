<script lang="ts">
  import { Button } from '$components/ui/button';
  import Wrapper from '$components/Wrapper.svelte';
</script>

<Wrapper>
  <header class="mb-8 text-center">
    <h1 class="text-4xl font-bold text-gray-800">Welcome to Your Homepage</h1>
    <p class="mt-2 text-gray-600">This is your personalized space. Explore and enjoy!</p>
  </header>

  <section class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-lg bg-white p-6 shadow">
      <h2 class="text-xl font-semibold text-gray-800">Feature 1</h2>
      <p class="mt-2 text-gray-600">Description of the first feature.</p>
      <Button class="mt-4">Learn More</Button>
    </div>
    <div class="rounded-lg bg-white p-6 shadow">
      <h2 class="text-xl font-semibold text-gray-800">Feature 2</h2>
      <p class="mt-2 text-gray-600">Description of the second feature.</p>
      <Button class="mt-4">Learn More</Button>
    </div>
    <div class="rounded-lg bg-white p-6 shadow">
      <h2 class="text-xl font-semibold text-gray-800">Feature 3</h2>
      <p class="mt-2 text-gray-600">Description of the third feature.</p>
      <Button class="mt-4">Learn More</Button>
    </div>
  </section>

  <footer class="mt-12 text-center">
    <p class="text-gray-500">© 2025 Your App. All rights reserved.</p>
  </footer>
</Wrapper>
