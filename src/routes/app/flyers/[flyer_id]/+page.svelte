<script lang="ts">
  import { goto } from '$app/navigation';
  import * as Story from '$components/stories';
  import { error } from '@sveltejs/kit';
  import type { PageData } from './$types';
  import { m } from '$lib/paraglide/messages';

  let { data }: { data: PageData } = $props();

  let storyDuration: number = 3; // seconds

  async function load(id: string) {
    // TODO : Replace with real data from pocketbase
    const data = [
      [
        { heading: 'Page 1', content: 'Flyer content page ID 1' },
        { heading: 'Page 2', content: 'Flyer content for ID 1' },
        { heading: 'Page 3', content: 'Flyer content for ID 1' }
      ],
      [
        { heading: 'Page 1', content: 'Flyer content for ID 2' },
        { heading: 'Page 2', content: 'Flyer content for ID 2' },
        { heading: 'Page 3', content: 'Flyer content for ID 2' }
      ],
      [
        { heading: 'Page 1', content: 'Flyer content for ID 3' },
        { heading: 'Page 2', content: 'Flyer content for ID 3' },
        { heading: 'Page 3', content: 'Flyer content for ID 3' }
      ]
    ];
    const flyer = data[parseInt(id) - 1];
    if (!flyer) {
      throw error(404, 'Flyer not found');
    }
    return {
      flyer
    };
  }
</script>

{#await load(data.params.flyer_id)}
  <Story.Wrapper length={100000}>
    <Story.Root class="bg-red-500">
      <div class="flex h-14 min-h-svh flex-col gap-4 border-b p-4 lg:h-[60px] lg:px-6">
        <h1 class="text-lg font-semibold">{m.app_flyers_loading_flyer()}</h1>
      </div>
    </Story.Root>
  </Story.Wrapper>
{:then { flyer }}
  <Story.Wrapper length={flyer.length * storyDuration} onend={() => goto('/app/notifications')}>
    {#each flyer as { heading, content }}
      <Story.Root class="bg-red-500">
        <div class="flex h-14 min-h-svh flex-col gap-4 border-b p-4 lg:h-[60px] lg:px-6">
          <h1 class="text-3xl font-semibold">{heading}</h1>
          <h1 class="text-lg font-semibold">{content}</h1>
        </div>
      </Story.Root>
    {/each}
  </Story.Wrapper>
{/await}
