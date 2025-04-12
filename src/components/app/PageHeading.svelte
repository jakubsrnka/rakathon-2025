<script lang="ts">
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';
  let { class: className = '', children }: { class?: string; children: Snippet } = $props();
</script>

<h1 class={cn('p-4 text-center text-3xl font-bold', className)}>
  {@render children()}
</h1>
