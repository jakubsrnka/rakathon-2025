<script lang="ts">
  import PageHeading from '$components/app/PageHeading.svelte';
  import { Skeleton } from '$components/ui/skeleton';
  import Wrapper from '$components/Wrapper.svelte';
  import { m } from '$lib/paraglide/messages';
  import * as Card from '$components/ui/card';
  import { ArrowRight } from '@lucide/svelte';
  import { pbClient } from '$lib/pocketbase';
  import { Collections, type FlyersResponse } from '$types/pocketbase';
  import type { Slide } from '$types/flyers';

  const FAQ: string[] = [
    '98neu1qu1e2rj98',
    '371zig36c7o9k1a',
    'q6366o596ed07x8',
    '3wu3vh0xg722s6p',
    '3ca9c6u7wi5v74o'
  ];

  const getFlyers = async () => {
    try {
      return pbClient.collection(Collections.Flyers).getFullList<FlyersResponse<Slide[]>>();
    } catch (error) {
      console.error('Error fetching flyers:', error);
      throw error;
    }
  };
</script>

<Wrapper>
  <header class="mb-8 text-center">
    <PageHeading>{m.app_faq_heading()}</PageHeading>
    <p class="mt-2 text-muted-foreground">{m.app_faq_subheading()}</p>
  </header>

  {#await getFlyers()}
    <Skeleton class="h-8 w-12" />
  {:then flyers}
    {@const flyersFiltered = flyers
      .filter((flyer) => FAQ.includes(flyer.id))
      .sort((a, b) => {
        const aIndex = FAQ.indexOf(a.id);
        const bIndex = FAQ.indexOf(b.id);
        return aIndex - bIndex;
      })}
    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {#if flyersFiltered.length === 0}
        <p class="text-gray-500">¯\_(ツ)_/¯</p>
      {/if}
      {#each flyersFiltered as flyer}
        <a href={`/app/flyers/${flyer.id}`} class="block h-full">
          <Card.Root class="group relative h-full p-4 transition-all hover:border-muted-foreground">
            <div class="flex items-center justify-between p-4">
              <div>
                <h2 class="text-lg font-bold">{flyer.title}</h2>
              </div>
            </div>
            <ArrowRight
              class="absolute right-4 top-1/2 translate-y-[-50%] text-muted-foreground transition-all group-hover:right-3 group-hover:h-7 group-hover:w-7 group-hover:text-foreground"
            />
          </Card.Root>
        </a>
      {/each}
    </div>
  {:catch error}
    <p class="text-red-500">Error loading flyers: {error.message}</p>
  {/await}
</Wrapper>
