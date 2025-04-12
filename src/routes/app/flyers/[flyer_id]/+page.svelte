<script lang="ts">
  import { goto } from '$app/navigation';
  import * as Story from '$components/stories';
  let { data } = $props();

  let storyDuration: number = 3; // seconds
</script>

<Story.Wrapper length={data.flyer.length * storyDuration} onend={() => goto('/app/notifications')} >
  {#each data.flyer as { heading, content }}
    <Story.Root class="bg-red-500">
      <div class="flex h-14 min-h-svh flex-col gap-4 border-b p-4 lg:h-[60px] lg:px-6">
        <h1 class="text-3xl font-semibold">{heading}</h1>
        <h1 class="text-lg font-semibold">{content}</h1>
      </div>
    </Story.Root>
  {/each}
</Story.Wrapper>
