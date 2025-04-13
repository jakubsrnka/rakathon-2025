<script lang="ts">
  import { Button } from '$components/ui/button';
  import { Skeleton } from '$components/ui/skeleton';
  import { m } from '$lib/paraglide/messages';
  import { pbClient } from '$lib/pocketbase';
  import type { Slide } from '$types/flyers';
  import type { FlyersResponse } from '$types/pocketbase';
  import { Collections } from '$types/pocketbase';
  import * as Card from '$components/ui/card';
  import { ArrowRight } from '@lucide/svelte';

  const getFlyers = async () => {
    try {
      return pbClient.collection(Collections.Flyers).getFullList<FlyersResponse<Slide[]>>();
    } catch (error) {
      console.error('Error fetching flyers:', error);
      throw error;
    }
  };
</script>

<div class="flex">
  <Button href="/admin/flyers/new" class="ml-auto mr-0 w-fit">
    {m.flyers_new()}
  </Button>
</div>
{#await getFlyers()}
  <Skeleton class="h-8 w-12" />
{:then flyers}
  <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
    {#if flyers.length === 0}
      <p class="text-gray-500">¯\_(ツ)_/¯</p>
    {/if}
    {#each flyers as flyer}
      <a href={`/admin/flyers/${flyer.id}`} class="block h-full">
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
