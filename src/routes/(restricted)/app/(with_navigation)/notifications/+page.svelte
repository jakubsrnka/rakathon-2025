<script lang="ts">
  import CustomNotification from '$components/app/Notification.svelte';
  import PageHeading from '$components/app/PageHeading.svelte';
  import Skeleton from '$components/ui/skeleton/skeleton.svelte';
  import Wrapper from '$components/Wrapper.svelte';
  import { m } from '$lib/paraglide/messages';

  export async function load() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulates a 1-second wait
  }
</script>

<Wrapper class="flex flex-col gap-4">
  <PageHeading>{m.app_notifications_heading()}</PageHeading>
  {#await load()}
    {#each Array(6) as _}
      <Skeleton class="h-6 w-32 rounded-lg p-3" />
      <Skeleton class="h-12 w-full rounded-lg p-3" />
    {/each}
  {:then}
    <CustomNotification title="View flyer 3" content="" link="/app/flyers/3" date="2023-06-20" />
    <CustomNotification title="View flyer 2" content="" link="/app/flyers/2" date="2023-05-15" />
    <CustomNotification title="View flyer 1" content="" link="/app/flyers/1" date="2023-04-08" />
    <CustomNotification title="Go to login page" content="" link="/login" date="2023-03-12" />
    <CustomNotification
      title="Mudr. Petr Novák Vám poslal zprávu"
      content="posílám vám informace k Vaší léčbě"
      link="/app/home"
      date="2023-02-25"
    />
  {/await}
</Wrapper>
