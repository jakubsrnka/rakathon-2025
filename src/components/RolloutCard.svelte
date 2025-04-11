<script lang="ts">
  import * as Card from '$components/ui/card';
  import type { Snippet } from 'svelte';
  import * as Collapsible from '$components/ui/collapsible';

  type Props = {
    title: string;
    children: Snippet;
  };

  let { title, children }: Props = $props();
</script>

<Card.Root>
  <Card.Content class="p-0">
    <Collapsible.Root>
      <Collapsible.Trigger class="h-14 w-full font-bold hover:bg-slate-100">
        {title}
      </Collapsible.Trigger>
      <Collapsible.Content class="p-5">
        {@render children()}
      </Collapsible.Content>
    </Collapsible.Root>
  </Card.Content>
</Card.Root>
