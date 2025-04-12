<script lang="ts">
  import * as Alert from '$components/ui/alert';
  import { cn } from '$lib/utils';
  import { Bell } from '@lucide/svelte';
  import { m } from '$lib/paraglide/messages';
  let {
    class: className = '',
    link,
    title,
    content,
    date
  }: {
    class?: string;
    link: string;
    title: string;
    content?: string;
    date?: string;
  } = $props();
</script>

<div class={cn('', className)}>
  {#if date}
    <h1 class="p-1 text-xl font-bold">
      {new Date(date).toLocaleDateString(m.localeDateString(), {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })}
    </h1>
  {/if}
  <a href={link}>
    <Alert.Root class=" flex  min-h-14 shadow">
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
        </div>
      </div>
    </Alert.Root>
  </a>
</div>
