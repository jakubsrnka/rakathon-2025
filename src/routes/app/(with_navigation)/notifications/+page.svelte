<script lang="ts">
  import CustomNotification from '$components/app/Notification.svelte';
  import Wrapper from '$components/Wrapper.svelte';
</script>

<Wrapper class="flex flex-col gap-4">
  <h1 class="p-4 text-center text-3xl font-bold">Zprávy</h1>
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
</Wrapper>
