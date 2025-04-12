<script lang="ts">
  import CustomNotification from '$components/app/Notification.svelte';
  import Wrapper from '$components/Wrapper.svelte';
</script>

<Wrapper class="flex flex-col gap-4">
  <CustomNotification
    title="Mudr. Petr Novák Vám poslal zprávu"
    content="posílám vám informace k Vaší léčbě"
    link="/app/home"
    date="Před 1 dnem"
  />
  <CustomNotification title="Go to login page" content="" link="/login" />
  <CustomNotification title="View flyer 1" content="" link="/app/flyers/1" />
  <CustomNotification title="View flyer 2" content="" link="/app/flyers/2" />
  <CustomNotification title="View flyer 3" content="" link="/app/flyers/3" />
</Wrapper>
