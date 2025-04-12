<script lang="ts">
  import type { PageData } from './$types';
  import { Check, FileDown } from '@lucide/svelte';
  import { ChevronsUpDown } from '@lucide/svelte';
  import { tick } from 'svelte';
  import * as Command from '$components/ui/command/index.js';
  import * as Popover from '$components/ui/popover/index.js';
  import { Button } from '$components/ui/button/index.js';
  import { cn } from '$lib/utils.js';
  import { Textarea } from '$components/ui/textarea';
  import { createUser } from '$lib/pocketbase/user';
  import { UsersRoleOptions, type UsersRecord } from '$types/pocketbase';
  import type { DemoUser } from '$types/demoUser';

  let { data }: { data: PageData } = $props();

  let open = $state(false);
  let value = $state('');
  let selectedValue = $state('');

  $effect(() => {
    selectedValue =
      data.demoApi.find((f) => f.birth_number === value)?.birth_number ?? 'Select patient';
  });

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const patient = formData.get('patient');
    const textarea = formData.get('textarea');

    try {
      if (!data.usersResponse.find((f) => f.birth_number === patient)) {
        const patientData = data.demoApi.find((f) => f.birth_number === patient);
        const user: DemoUser = {
          email: patientData?.email ?? '',
          name: patientData?.name ?? '',
          password: '12345678',
          role: UsersRoleOptions.user,
          birth_number: patientData?.birth_number ?? '',
          surname: patientData?.surname ?? ''
        };
        await createUser(user);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>

<form onsubmit={handleSubmit}>
  <Popover.Root bind:open let:ids>
    <Popover.Trigger asChild let:builder>
      <Button
        builders={[builder]}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        class="w-[400px] justify-between"
      >
        {selectedValue}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-[400px] p-0">
      <Command.Root>
        <Command.Input placeholder="Search by birth number" />
        <Command.Empty>No patient.</Command.Empty>
        <Command.Group>
          {#each data.demoApi as person}
            <Command.Item
              value={person.birth_number}
              onSelect={(currentValue: string) => {
                value = currentValue;
                closeAndFocusTrigger(ids.trigger);
              }}
            >
              <Check
                class={cn('mr-2 h-4 w-4', value !== person.birth_number && 'text-transparent')}
              />
              {person.birth_number}
              {person.name}
              {person.surname}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
  <input type="hidden" name="patient" bind:value={selectedValue} />
  <Textarea
    id="textarea"
    name="textarea"
    placeholder="Type your message here..."
    class="w-full"
    rows={4}
  />
  <Button type="submit">Send notification</Button>
</form>
