<script lang="ts">
  import { Button } from '$components/ui/button';
  import * as Card from '$components/ui/card';
  import { m } from '$lib/paraglide/messages';
</script>

<div class="flex h-screen items-center justify-center">
  <Card.Root class="w-[90%] max-w-80">
    <Card.Header class="space-y-1">
      <Card.Title class="text-2xl">Vítejte v rozcestníku!</Card.Title>
    </Card.Header>
    <Card.Content class="grid gap-4">
      <Card.Description class="text-sm text-gray-500"
        >Pro přihlášení klikněte níže.</Card.Description
      >
    </Card.Content>
    <Card.Footer>
      <Button class="w-full" href="/login">{m.user_login()}</Button>
    </Card.Footer>
  </Card.Root>
</div>
