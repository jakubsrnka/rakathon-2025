<script lang="ts">
  import { Progress as ProgressPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils.js';

  type $$Props = ProgressPrimitive.Props;

  let className: $$Props['class'] = undefined;
  export let max: $$Props['max'] = 100;
  export let value: $$Props['value'] = undefined;
  export { className as class };
</script>

<ProgressPrimitive.Root
  class={cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className)}
  {...$$restProps}
>
  <div
    class="linear h-full w-full flex-1 bg-primary transition-all duration-[100ms]"
    style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
  ></div>
</ProgressPrimitive.Root>
