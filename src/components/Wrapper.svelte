<script lang="ts">
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';
  let { class: className = '', children }: { class?: string; children: Snippet } = $props();
</script>

<div class={cn('container mx-auto mb-10 p-6', className)}>
  {@render children()}
</div>
