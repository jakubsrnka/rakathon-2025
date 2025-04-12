<script lang="ts">
  import { Progress } from '$components/ui/progress';
  import { cn } from '$lib/utils';
  import { getContext, onMount, type Snippet } from 'svelte';

  let progress = $state(0);

  // Interval in milliseconds (refresh rate)
  const INTERVAL = 100;

  const onbegin = getContext<() => void>('onbegin');
  const onend = getContext<() => void>('onend');
  const active = getContext<() => number>('active');
  const count = getContext<() => number>('count');
  const lengthFromParent = getContext<() => number>('length');

  let {
    length = $bindable(20),
    time = $bindable(0),
    stopped = $bindable(false),
    class: className = $bindable(''),
    hideProgress = $bindable(getContext<boolean>('hideProgress') ?? false),
    position = $bindable(0),
    children
  }: {
    length?: number;
    time?: number;
    stopped?: boolean;
    class?: string;
    hideProgress?: boolean;
    position?: number;
    children: Snippet;
  } = $props();

  onMount(() => {
    if (count) position = count();
    if (lengthFromParent) length = lengthFromParent();
    let firstTime = true;
    const interval = setInterval(() => {
      if (stopped) {
        return;
      }
      if (active() !== position) {
        return;
      }
      if (firstTime) {
        firstTime = false;
        if (onbegin) onbegin();
      }
      if (time <= length) {
        progress = (time / length) * 100;
        time += INTERVAL / 1000;
        return;
      } else {
        if (onend) onend();
        clearInterval(interval);
      }
    }, INTERVAL);
  });
</script>

{#if position === undefined || active() === position}
  <div
    class={cn(
      'mx-auto flex h-svh max-w-screen-sm flex-col gap-4 overflow-y-scroll p-4  lg:px-6',
      className
    )}
  >
    <div class="min-h-1">
      {#if !hideProgress}
        <Progress value={progress} class="min-h-1 bg-neutral-300" />
      {/if}
    </div>
    <div>
      {@render children()}
    </div>
  </div>
{/if}
