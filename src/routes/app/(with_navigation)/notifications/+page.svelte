<script lang="ts">
  import * as Alert from '$components/ui/alert/index.js';
  import Wrapper from '$components/Wrapper.svelte';
  import { Bell } from '@lucide/svelte';
</script>

<Wrapper class="flex flex-col gap-3">
  <a href="/app/notifications">
    <Alert.Root>
      <Bell class="h-4 w-4" />
      <Alert.Title>Example notification</Alert.Title>
      <Alert.Description>Here is some info</Alert.Description>
    </Alert.Root>
  </a>
  <a href="/app/notifications">
    <Alert.Root>
      <Bell class="h-4 w-4" />
      <Alert.Title>Example notification</Alert.Title>
      <Alert.Description>Here is some info</Alert.Description>
    </Alert.Root>
  </a>
  <a href="/app/notifications">
    <Alert.Root>
      <Bell class="h-4 w-4" />
      <Alert.Title>Example notification</Alert.Title>
      <Alert.Description>Here is some info</Alert.Description>
    </Alert.Root>
  </a>
  <a href="/app/notifications">
    <Alert.Root>
      <Bell class="h-4 w-4" />
      <Alert.Title>Example notification</Alert.Title>
      <Alert.Description>Here is some info</Alert.Description>
    </Alert.Root>
  </a>
  <a href="/app/notifications">
    <Alert.Root>
      <Bell class="h-4 w-4" />
      <Alert.Title>Example notification</Alert.Title>
      <Alert.Description>Here is some info</Alert.Description>
    </Alert.Root>
  </a>
</Wrapper>
