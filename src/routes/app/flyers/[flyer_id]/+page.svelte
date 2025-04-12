<script lang="ts">
  import { goto } from '$app/navigation';
  import * as Story from '$components/stories';
  import { error } from '@sveltejs/kit';
  import type { PageData } from './$types';
  import { m } from '$lib/paraglide/messages';
  import { demoFlyers } from '$lib/demoFlyers';

  let { data }: { data: PageData } = $props();

  let storyDuration: number = 3; // seconds

  let isStopped = $state(false);

  async function load(id: string) {
    const flyerId = parseInt(id) - 1;
    const flyer = demoFlyers[flyerId];
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
    <Story.Root>
      <div class="flex h-full flex-col gap-4 p-4">
        <h1 class="text-lg font-semibold">{m.app_flyers_loading_flyer()}</h1>
      </div>
    </Story.Root>
  </Story.Wrapper>
{:then { flyer }}
  <Story.Wrapper
    length={flyer.slides.length * storyDuration}
    bind:stopped={isStopped}
    onend={() => goto('/app/notifications')}
  >
    {#each flyer.slides as slide}
      <Story.Root bind:stopped={isStopped}>
        <div class="flex flex-col gap-4 p-4">
          {#if !isStopped}
            <h1 class="text-3xl font-semibold">{slide.title}</h1>
            {#each slide.content as text}
              <p>{text}</p>
            {/each}
          {:else}
            <div class="mb-24 flex flex-col gap-4">
              {#each flyer.slides as slide}
                <h1 class="text-3xl font-semibold">{slide.title}</h1>
                {#each slide.content as text}
                  <p>{text}</p>
                {/each}
              {/each}
            </div>
          {/if}
        </div>
      </Story.Root>
    {/each}
  </Story.Wrapper>
{/await}
