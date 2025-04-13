<script lang="ts">
  import { goto } from '$app/navigation';
  import * as Story from '$components/stories';
  import type { PageData } from './$types';
  import Skeleton from '$components/ui/skeleton/skeleton.svelte';
  import { pbClient } from '$lib/pocketbase';
  import { Collections, type FlyersResponse } from '$types/pocketbase';
  import type { Slide } from '$types/flyers';

  let { data }: { data: PageData } = $props();

  let storyDuration: number = 4; // seconds

  let isStopped = $state(false);

  const getFlyer = async (id: string): Promise<FlyersResponse<Slide[]>> => {
    try {
      const response = await pbClient
        .collection(Collections.Flyers)
        .getOne<FlyersResponse<Slide[]>>(id);
      return response;
    } catch (error) {
      history.back();
      throw error;
    }
  };
</script>

{#await getFlyer(data.params.flyer_id)}
  <Story.Wrapper length={100000}>
    <Story.Root>
      <div class="flex h-full flex-col gap-4 p-4">
        <Skeleton class="h-6 w-32 rounded-lg p-3" />
        <Skeleton class="h-12 w-full rounded-lg p-3" />
        <Skeleton class="h-12 w-full rounded-lg p-3" />
        <Skeleton class="h-12 w-full rounded-lg p-3" />
      </div>
    </Story.Root>
  </Story.Wrapper>
{:then flyer}
  <Story.Wrapper
    length={(flyer.contents?.length || 0) * storyDuration}
    bind:stopped={isStopped}
    onend={() => goto('/app/notifications')}
  >
    {#if flyer.contents}
      {#each flyer.contents as slide, index (index)}
        <Story.Root bind:stopped={isStopped}>
          <div class="flex flex-col gap-4 p-4">
            {#if !isStopped}
              <h1 class="text-3xl font-semibold">{slide.title}</h1>
              {#each slide.content as text, index (index)}
                <p>{text}</p>
              {/each}
            {:else}
              <div class="mb-24 flex flex-col gap-4">
                {#each flyer.contents as slide, index (index)}
                  <h1 class="text-3xl font-semibold">{slide.title}</h1>
                  {#each slide.content as text, index (index)}
                    <p>{text}</p>
                  {/each}
                {/each}
              </div>
            {/if}
          </div>
        </Story.Root>
      {/each}
    {/if}
  </Story.Wrapper>
{/await}
