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
  import { UsersRoleOptions } from '$types/pocketbase';
  import type { UsersCreate } from '$types/user';
  import Badge from '$components/ui/badge/badge.svelte';
  import { m } from '$lib/paraglide/messages';

  let { data }: { data: PageData } = $props();

  let open = $state(false);
  let value = $state('');
  let selectedValue = $state('');
  let selectedPatientBirthNumber = $state('');

  $effect(() => {
    const selectedPatient = data.demoApi.find((f) => f.birth_number === value);
    selectedValue = selectedPatient
      ? `${selectedPatient.title_before ?? ''} ${selectedPatient.name} ${selectedPatient.surname} ${selectedPatient.title_after ?? ''}`
      : m.admin_patients_selectAPatient();
    selectedPatientBirthNumber = selectedPatient?.birth_number ?? '';
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
        console.log('patientData', patientData);

        if (!patientData) {
          throw new Error('Patient not found');
        }
        const password = window.crypto.getRandomValues(new BigUint64Array(1))[0].toString(36);
        const user: UsersCreate = {
          email: patientData.email,
          name: patientData.name,
          password: password,
          passwordConfirm: password,
          role: UsersRoleOptions.user,
          birth_number: patientData.birth_number,
          surname: patientData.surname,
          title_before: patientData.title_before,
          title_after: patientData.title_after
        };
        await createUser(user);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>

<form onsubmit={handleSubmit} class="mx-auto flex w-full max-w-[max(50%,512px)] flex-col gap-4">
  <Popover.Root bind:open let:ids>
    <Popover.Trigger asChild let:builder>
      <Button
        builders={[builder]}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        class="w-full justify-between"
      >
        {selectedValue}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-full max-w-[min(512px,90vw)] p-0">
      <Command.Root>
        <Command.Input placeholder="Search by birth number" />
        <Command.Empty>No patient.</Command.Empty>
        <Command.Group>
          {#each data.demoApi as person, index (index)}
            <Command.Item
              value={person.birth_number}
              onSelect={(currentValue: string) => {
                value = currentValue;
                closeAndFocusTrigger(ids.trigger);
              }}
              class="align flex items-center"
            >
              <Check
                class={cn('mr-2 h-4 w-4', value !== person.birth_number && 'text-transparent')}
              />
              {person.title_before}
              {person.name}
              {person.surname}
              {person.title_after}

              <Badge class="ml-auto mr-2">
                {person.birth_number}
              </Badge>
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
  <input type="hidden" name="patient" bind:value={selectedPatientBirthNumber} />
  <Textarea
    id="textarea"
    name="textarea"
    placeholder="Type your message here..."
    class="w-full"
    rows={4}
  />
  <Button type="submit">Send notification</Button>
</form>
