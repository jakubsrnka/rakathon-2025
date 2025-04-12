<script lang="ts">
  import Input from '$components/ui/input/input.svelte';
  import * as Card from '$components/ui/card';
  import { Button } from '$components/ui/button';
  import { Label } from '$components/ui/label';
  import { m } from '$lib/paraglide/messages';
  import { currentUser, pbClient } from '$lib/pocketbase';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import { Collections } from '$types/pocketbase';

  const handleLogin = async (event: SubmitEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const email = target.email.value;
    const password = target.password.value;

    try {
      const { record } = await pbClient
        .collection(Collections.Users)
        .authWithPassword(email, password);
      if (record) {
        currentUser.set(record);
        toast.success('Login successful');
        if (record.role === 'admin') {
          goto('/admin/patients');
        } else if (record.role === 'user') {
          goto('/user');
        }
      }
    } catch {
      toast.error('Invalid credentials');
    }
  };
</script>

<div class="flex h-screen items-center justify-center">
  <Card.Root class="w-[90%] max-w-80">
    <Card.Header class="space-y-1">
      <Card.Title class="text-2xl">{m.login_login_via()}</Card.Title>
      <Card.Description>{m.login_enter_email()}</Card.Description>
    </Card.Header>
    <form class="flex flex-col gap-4" onsubmit={handleLogin}>
      <Card.Content class="grid gap-4">
        <div class="grid grid-cols-1 gap-6">
          <Button variant="outline" class="h-16" href="/user">
            <img
              src="/assets/indentita-obcana-logo.png"
              alt="Indentita Obcana Logo"
              class="h-8 w-auto"
            />
            {m.login_citizen_portal()}
          </Button>
        </div>
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t"></span>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-card px-2 text-muted-foreground">{m.login_or_continue_with()}</span>
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="email">{m.login_email()}</Label>
          <Input id="email" name="email" type="email" placeholder={m.login_example_email()} />
        </div>
        <div class="grid gap-2">
          <Label for="password">{m.login_password()}</Label>
          <Input id="password" name="password" type="password" />
        </div>
      </Card.Content>
      <Card.Footer>
        <Button class="w-full" type="submit">{m.login_create_account_button()}</Button>
      </Card.Footer>
    </form>
  </Card.Root>
</div>
