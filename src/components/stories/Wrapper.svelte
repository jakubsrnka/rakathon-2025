<script lang="ts">
  import { Button } from '$components/ui/button';
  import Progress from '$components/ui/progress/progress.svelte';
  import { Text, GalleryHorizontal } from '@lucide/svelte';
  import { onMount, setContext, type Snippet } from 'svelte';

  let {
    length = $bindable(20),
    time = $bindable(0),
    stopped = $bindable(false),
    onend: onParentEnd = $bindable(() => {}),
    onbegin: onParentBegin = $bindable(() => {}),
    children
  }: {
    stopped?: boolean;
    length?: number;
    time?: number;
    onend?: () => void;
    onbegin?: () => void;
    children: Snippet;
  } = $props();

  let count = $state(0);
  let active = $state(0);
  let viewState = $state(0);

  const onbegin = () => {};
  const onend = () => {
    active += 1;
  };

  const skip = () => {
    if (active < count - 1) {
      active += 1;
      time = active * length; // fast forward time
    } else {
      time = (active + 1) * length; // go to end
    }
  };

  const back = () => {
    if (active === 0) {
      time = 0;
      active = 0;
    } else if (active > 0) {
      active -= 1;
      time = active * length;
    }
  };

  setContext<() => void>('back', back);
  setContext<() => void>('skip', skip);
  setContext<() => void>('onbegin', onbegin);
  setContext<() => void>('onend', onend);
  setContext<boolean>('hideProgress', true);
  setContext<() => number>('count', () => count++);
  setContext<() => number>('active', () => active);
  setContext<() => number>('length', () => length);

  const INTERVAL = 100;

  onMount(() => {
    if (onParentBegin) onParentBegin();
    const finalTime = length * count;
    const interval = setInterval(() => {
      if (stopped) {
        return;
      }
      if (time <= finalTime) {
        time += INTERVAL / 1000;

        return;
      } else {
        if (onParentEnd) onParentEnd();
        clearInterval(interval);
      }
    }, INTERVAL);
  });
</script>

<div class="absolute left-8 right-8 top-8 z-50 flex gap-4">
  {#if viewState === 0}
    {#each Array(count) as _, i (i)}
      <Progress
        value={active === i ? ((time - active * length) / length) * 100 : active > i ? 100 : 0}
        class="h-1 min-h-1 w-full bg-neutral-300"
      />
    {/each}
  {/if}
</div>
{@render children()}
{#if viewState === 0}
  <div class="absolute left-0 right-0 top-0 z-50 flex h-1 justify-between gap-4">
    <Button variant="ghost" class="h-lvh w-1/2 hover:bg-transparent" onclick={back} />
    <Button variant="ghost" class="h-lvh w-1/2 hover:bg-transparent" onclick={skip} />
  </div>
{/if}
<div class="absolute bottom-20 left-8 right-8 z-50 flex h-1 justify-between gap-4">
  {#if viewState === 0}
    <Button class="w-20" onclick={back}>Back</Button>
    <Button
      class="w-20"
      onclick={() => {
        viewState = 1;
        stopped = !stopped;
      }}
    >
      <Text />
    </Button>
    <Button class="w-20" onclick={skip}>
      {#if active !== count - 1}
        Next
      {:else}
        Skip
      {/if}
    </Button>
  {:else}
    <div class="flex w-full justify-center">
      <Button
        class="w-20"
        onclick={() => {
          viewState = 0;
          stopped = !stopped;
        }}
      >
        <GalleryHorizontal />
      </Button>
    </div>
  {/if}
</div>
