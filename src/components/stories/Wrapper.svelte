<script lang="ts">
  import Progress from '$components/ui/progress/progress.svelte';
  import { onMount, setContext, type Snippet } from 'svelte';

  let {
    length = $bindable(20),
    time = $bindable(0),
    onend: onParentEnd = $bindable(() => {}),
    onbegin: onParentBegin = $bindable(() => {}),
    children
  }: {
    length?: number;
    time?: number;
    onend?: () => void;
    onbegin?: () => void;
    children: Snippet;
  } = $props();

  let count = $state(0);
  let active = $state(0);

  const onbegin = () => {};
  const onend = () => {
    active += 1;
  };

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
      if (time <= finalTime) {
        console.log('active', active);
        time += INTERVAL / 1000;
        return;
      } else {
        if (onParentEnd) onParentEnd();
        clearInterval(interval);
      }
    }, INTERVAL);
  });
</script>

<div class="absolute left-8 right-8 top-8 z-50 flex h-1 gap-4">
  {#each Array(count) as _, i}
    <Progress
      value={active === i ? ((time - active * length) / length) * 100 : active > i ? 100 : 0}
      class="h-1 min-h-1 w-full bg-neutral-300"
    />
  {/each}
</div>
{@render children()}
