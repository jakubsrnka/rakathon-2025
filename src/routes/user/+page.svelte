<script lang="ts">
  import * as Card from '$components/ui/card';
  import { Button } from '$components/ui/button';
  import { m } from '$lib/paraglide/messages';
</script>

<div class="flex h-screen items-center justify-center">
  <Card.Root class="w-[90%] max-w-80">
    <Card.Content class="grid gap-4">
      <Button class="w-full" href="/login">{m.user_login()}</Button>
    </Card.Content>
  </Card.Root>
</div>
