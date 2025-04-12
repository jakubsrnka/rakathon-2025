<script>
  import { goto } from '$app/navigation';
  import * as Story from '$components/stories';
</script>

<Story.Wrapper length={2} onend={() => goto('/app')}>
  <Story.Root class="bg-red-500">
    <div class="flex h-14 min-h-svh flex-col gap-4 border-b p-4 lg:h-[60px] lg:px-6">
      <h1 class="text-lg font-semibold">Tuto je Story 1</h1>
      <h1 class="text-3xl font-semibold">1</h1>
      <p>Lorem ipsum dolor sit</p>
    </div>
  </Story.Root>
  <Story.Root class="bg-red-100">
    <div class="flex h-14 min-h-svh flex-col gap-4 border-b p-4 lg:h-[60px] lg:px-6">
      <h1 class="text-lg font-semibold">Tuto je Story 2</h1>
      <h1 class="text-3xl font-semibold">2</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores velit exercitationem
        optio, fugiat nemo necessitatibus, deserunt, magnam tempore minus doloremque assumenda
        beatae. Rerum quia tempore vero facilis reiciendis molestias eaque.
      </p>
    </div>
  </Story.Root>
</Story.Wrapper>
