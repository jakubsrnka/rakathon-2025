<script lang="ts">
  import CustomNotification from '$components/app/Notification.svelte';
  import Wrapper from '$components/Wrapper.svelte';
</script>

<Wrapper class="flex flex-col gap-4">
  <CustomNotification title="Mudr. Petr Novák Vám poslal zprávu" content="posílám vám informace k Vaší léčbě" link="/app/home" />
  <CustomNotification title="Go to login page" content="" link="/login" />
</Wrapper>
