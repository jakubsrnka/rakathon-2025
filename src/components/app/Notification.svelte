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
    content,
    date
  }: {
    class?: string;
    children?: Snippet;
    link: string;
    title: string;
    content?: string;
    date?: string;
  } = $props();
</script>

<div class={cn('', className)}>
  <a href={link}>
    <Alert.Root class="shadow">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <!-- TODO add more icons -->
          <Bell class="h-4 w-4" />
        </div>
        <div class="ml-4">
          {#if content}
            <Alert.Title class="mb-1">{title}</Alert.Title>
            <Alert.Description>{content}</Alert.Description>
          {:else}
            <Alert.Title>{title}</Alert.Title>
          {/if}
          {#if date}
            <Alert.Description class="italic">{date}</Alert.Description>
          {/if}
        </div>
      </div>
    </Alert.Root>
  </a>
</div>
