<script lang="ts">
  import CustomNotification from '$components/app/Notification.svelte';
  import PageHeading from '$components/app/PageHeading.svelte';
  import Skeleton from '$components/ui/skeleton/skeleton.svelte';
  import Wrapper from '$components/Wrapper.svelte';
  import { m } from '$lib/paraglide/messages';
  import { currentUser, pbClient } from '$lib/pocketbase';
  import { Collections, type FlyersResponse, type NotificationsResponse } from '$types/pocketbase';
  import { onDestroy, onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const notifications = writable<NotificationsResponse<{ flyer: FlyersResponse }>[]>([]);
  const loading = writable(true);

  const loadNotifications = async () => {
    try {
      if (!currentUser) {
        throw new Error('User not logged in');
      }

      const result = await pbClient
        .collection(Collections.Notifications)
        .getFullList<NotificationsResponse<{ flyer: FlyersResponse }>>({
          expand: 'flyer'
        });

      notifications.set(result);
      loading.set(false);
      console.log('Notifications loaded:', result);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  };
  
  let interval: NodeJS.Timeout;
  onMount(() => {
    loadNotifications();
    interval = setInterval(() => {
      loadNotifications();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<Wrapper class="flex flex-col gap-4">
  <PageHeading>{m.app_notifications_heading()}</PageHeading>
  {#if $loading}
    {#each Array(6) as _}
      <Skeleton class="h-6 w-32 rounded-lg p-3" />
      <Skeleton class="h-12 w-full rounded-lg p-3" />
    {/each}
  {:else}
    {#each $notifications as notification}
      <CustomNotification
        title={notification.text}
        content={notification.expand?.flyer?.title ?? ''}
        link={notification.expand?.flyer ? `/app/flyers/${notification.expand.flyer.id}` : ''}
        date={notification.time_to_send}
      />
    {/each}
  {/if}
</Wrapper>
