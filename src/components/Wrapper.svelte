<script lang="ts">
  import { cn } from '$lib/utils';
  import type { Snippet } from 'svelte';
  let { class: className = '', children }: { class?: string; children: Snippet } = $props();
</script>

<div class={cn('container mx-auto p-6 mb-10', className)}>
  {@render children()}
</div>
