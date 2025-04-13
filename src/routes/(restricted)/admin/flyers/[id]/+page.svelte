<script lang="ts">
  import { Button } from '$components/ui/button';
  import Separator from '$components/ui/separator/separator.svelte';
  import { Skeleton } from '$components/ui/skeleton';
  import { m } from '$lib/paraglide/messages';
  import { pbClient } from '$lib/pocketbase';
  import type { Slide } from '$types/flyers';
  import { Collections, type FlyersResponse } from '$types/pocketbase';
  import { ChevronLeft } from '@lucide/svelte';
  import type { PageData } from './$types';

  import * as Card from '$components/ui/card';

  let { data }: { data: PageData } = $props();

  let loaded = $state(false);

  const getFlyer = async (id: string): Promise<FlyersResponse<Slide[]>> => {
    try {
      const response = await pbClient
        .collection(Collections.Flyers)
        .getOne<FlyersResponse<Slide[]>>(id);
      loaded = true;
      return response;
    } catch (error) {
      console.error('Error fetching flyer:', error);
      throw error;
    }
  };
</script>

<div class="flex">
  <Button href="/admin/flyers" class="ml-0 mr-auto flex w-fit gap-2">
    <ChevronLeft />
    {m.back()}
  </Button>
  {#if loaded}
    <Button class="ml-auto mr-0 w-fit">
      {m.admin_flyers_id_sendToPatient()}
    </Button>
  {/if}
</div>
<div class="mx-auto w-full max-w-[max(50%,512px)]">
  {#await getFlyer(data.params.id)}
    <div class="flex flex-col gap-2">
      <Skeleton class="h-9 w-full" />
      <Skeleton class="h-9 w-1/3" />
      <Skeleton class="h-9 w-1/2" />
      <Skeleton class="h-9 w-3/4" />
      <Skeleton class="h-9 w-2/5" />
      <Separator class="my-2" />
      <Skeleton class="h-9 w-full" />
      <Skeleton class="h-9 w-2/3" />
      <Skeleton class="h-9 w-4/5" />
      <Skeleton class="h-9 w-1/5" />
      <Separator class="my-2" />
      <div class="flex gap-2">
        <Skeleton class="h-5 w-12" />
        <Skeleton class="h-5 w-20" />
        <Skeleton class="h-5 w-9" />
        <Skeleton class="w-15 h-5" />
      </div>
    </div>
  {:then flyer}
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold">{flyer.title}</h1>
      {#if flyer.contents}
        {#each flyer.contents as contents}
          <h2 class="mt-2 text-lg font-medium">{contents.title}</h2>
          <ul>
            {#each contents.content as content}
              <li class="flex items-center gap-2 before:content-['-']">{content}</li>
            {/each}
          </ul>
        {/each}
      {/if}
    </div>
  {:catch}
    <div class="flex items-center justify-center">
      <Card.Root class="w-[90%] max-w-80">
        <Card.Header class="space-y-1">
          <Card.Title class="text-2xl">{m.error_error()} 404</Card.Title>
        </Card.Header>
        <Card.Content class="grid gap-4">
          <Card.Description class="text-sm text-gray-500">
            <pre class="mb-2">¯\_(ツ)_/¯</pre>
            Nic jsme nenašli, ale můžeme se podívat na jinou stránku.
          </Card.Description>
        </Card.Content>
        <Card.Footer>
          <Button class="flex w-full gap-2" href="/admin/flyers">
            <ChevronLeft />
            {m.back()}
          </Button>
        </Card.Footer>
      </Card.Root>
    </div>
  {/await}
</div>
