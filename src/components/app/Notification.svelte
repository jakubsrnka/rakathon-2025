<script lang="ts">
  import * as Alert from '$components/ui/alert';
  import { cn } from '$lib/utils';
  import { Bell } from '@lucide/svelte';
  import type { Snippet } from 'svelte';
  let {
    class: className = '',
    children,
    link,
    title,
    content
  }: { class?: string; children?: Snippet; link: string; title: string; content: string } = $props();
</script>

<div class={cn('', className)}>
  <a href={link}>
    <Alert.Root class="shadow">
      <Bell class="h-4 w-4" />
      <Alert.Title>{title}</Alert.Title>
      <Alert.Description>{content}</Alert.Description>
    </Alert.Root>
  </a>
</div>
