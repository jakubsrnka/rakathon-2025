<script lang="ts">
  import type { PageData } from './$types';
  import { Check, Database, Plus, CalendarIcon } from '@lucide/svelte';
  import { ChevronsUpDown } from '@lucide/svelte';
  import { currentUser } from '$lib/pocketbase';
  import { toast } from 'svelte-sonner';
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
  import * as Tabs from '$components/ui/tabs';
  import CreateFlyer from '$components/admin/CreateFlyer.svelte';
  import { createNotification } from '$lib/pocketbase/notifications';
  import type { PatientNotification } from '$types/notification';
  import { DateFormatter, type DateValue, getLocalTimeZone, today } from '@internationalized/date';
  import { Calendar } from '$components/ui/calendar/index.js';
  import type { Flyer } from '$types/flyers';
  import { createFlyer } from '$lib/pocketbase/flyer';
  import { goto } from '$app/navigation';

  let { data }: { data: PageData } = $props();

  let open1 = $state(false);
  let open2 = $state(false);
  let value1 = $state('');
  let value2 = $state('');
  let selectedTimeSend: DateValue = $state(today(getLocalTimeZone()));
  let selectedPatientValue = $state('');
  let selectedPatientBirthNumber = $state('');
  let selectedFlyerValue = $state('');
  let selectedFlyerId = $state('');
  let flyerVersion: 'create' | 'import' = $state('create');
  let exportedFlyer = $state<Flyer>({
    heading: 'Letáček',
    slides: [
      {
        title: 'Nadpis',
        content: ['Obsah 1. řádku', 'Obsah 2. řádku']
      }
    ],
    tags: []
  });

  $effect(() => {
    const selectedPatient = data.demoApi.find((f) => f.birth_number === value1);
    selectedPatientValue = selectedPatient
      ? `${selectedPatient.title_before ?? ''} ${selectedPatient.name} ${selectedPatient.surname} ${selectedPatient.title_after ?? ''}`
      : m.admin_patients_selectAPatient();
    selectedPatientBirthNumber = selectedPatient?.birth_number ?? '';
    selectedFlyerValue =
      data.flyersResponse.find((f) => f.title === value2)?.title ?? m.admin_patients_selectAFlyer();
    selectedFlyerId = data.flyersResponse.find((f) => f.title === value2)?.id ?? '';
  });

  function closeAndFocusTrigger(triggerId: string, setClosed: (val: boolean) => void) {
    setClosed(false);
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }

  const df = new DateFormatter('en-US', {
    dateStyle: 'long'
  });

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const textarea = formData.get('textarea')?.toString();

    try {
      if (!data.usersResponse.find((f) => f.birth_number === selectedPatientBirthNumber)) {
        const patientData = data.demoApi.find((f) => f.birth_number === selectedPatientBirthNumber);
        const password = window.crypto.getRandomValues(new BigUint64Array(1))[0].toString(36);
        if (patientData) {
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
        } else {
          toast.error('Patient not found');
          return;
        }
      }
      let flyerId = '';
      if (flyerVersion === 'create') {
        const newFlyer = await createFlyer(exportedFlyer);
        flyerId = newFlyer?.id ?? '';
      } else {
        flyerId = selectedFlyerId;
      }
      const adminId = $currentUser?.id;
      const userId = data.usersResponse.find(
        (f) => f.birth_number === selectedPatientBirthNumber
      )?.id;
      const timeToSend = selectedTimeSend?.toDate(getLocalTimeZone());
      const notification: PatientNotification = {
        user: userId ?? '',
        flyer: flyerId ?? '',
        text: textarea ?? '',
        time_to_send: timeToSend,
        admin: adminId ?? ''
      };
      await createNotification(notification);
      toast.success('Notification sent successfully');
      goto('/admin');
    } catch (error) {
      toast.error('Error sending notification');
    }
  }
</script>

<form onsubmit={handleSubmit} class="mx-auto flex w-full max-w-[max(50%,512px)] flex-col gap-4">
  <Popover.Root bind:open={open1} let:ids>
    <Popover.Trigger asChild let:builder>
      <Button
        builders={[builder]}
        variant="outline"
        role="combobox"
        aria-expanded={open1}
        class="w-full justify-between"
      >
        {selectedPatientValue}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-full max-w-[min(512px,90vw)] p-0">
      <Command.Root>
        <Command.Input placeholder={m.admin_patients_searchPatient()} />
        <Command.Empty>{m.admin_patients_noPatients()}</Command.Empty>
        <Command.Group>
          {#each data.demoApi as person, index (index)}
            <Command.Item
              value={person.birth_number}
              onSelect={(currentValue: string) => {
                value1 = currentValue;
                closeAndFocusTrigger(ids.trigger, (val) => (open1 = val));
              }}
              class="align flex items-center"
            >
              <Check
                class={cn('mr-2 h-4 w-4', value1 !== person.birth_number && 'text-transparent')}
              />
              {#if person.databaseId}
                <Database class="mr-4 h-4 w-4 text-muted-foreground" />
              {:else}
                <Plus class="mr-4 h-4 w-4 text-muted-foreground" />
              {/if}
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
  <Tabs.Root value="create" class="w-full">
    <Tabs.List class="w-full">
      <Tabs.Trigger class="w-1/2" value="create" onclick={() => (flyerVersion = 'create')}>
        {m.admin_patients_tabCreate()}
      </Tabs.Trigger>
      <Tabs.Trigger class="w-1/2" value="import" onclick={() => (flyerVersion = 'import')}
        >{m.admin_patients_tabImport()}</Tabs.Trigger
      >
    </Tabs.List>
    <Tabs.Content value="create">
      <CreateFlyer bind:flyer={exportedFlyer} />
    </Tabs.Content>
    <Tabs.Content value="import">
      <Popover.Root bind:open={open2} let:ids>
        <Popover.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            variant="outline"
            role="combobox"
            aria-expanded={open2}
            class="w-full justify-between"
          >
            {selectedFlyerValue}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Popover.Trigger>
        <Popover.Content class="w-full max-w-[min(512px,90vw)] p-0">
          <Command.Root>
            <Command.Input placeholder={m.admin_patients_searchFlyer()} />
            <Command.Empty>{m.admin_patients_noFlyers()}</Command.Empty>
            <Command.Group>
              {#each data.flyersResponse as flyer, index (index)}
                <Command.Item
                  value={flyer.title}
                  onSelect={(currentValue: string) => {
                    value2 = currentValue;
                    closeAndFocusTrigger(ids.trigger, (val) => (open2 = val));
                  }}
                  class="align flex items-center"
                >
                  <Check class={cn('mr-2 h-4 w-4', value2 !== flyer.title && 'text-transparent')} />
                  {flyer.title}
                </Command.Item>
              {/each}
            </Command.Group>
          </Command.Root>
        </Popover.Content>
      </Popover.Root>
    </Tabs.Content>
  </Tabs.Root>
  <Popover.Root>
    <Popover.Trigger asChild let:builder>
      <Button
        variant="outline"
        class={cn(
          'w-full justify-start text-left font-normal',
          !selectedTimeSend && 'text-muted-foreground'
        )}
        builders={[builder]}
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {selectedTimeSend ? df.format(selectedTimeSend.toDate(getLocalTimeZone())) : 'Pick a date'}
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-auto p-0">
      <Calendar bind:value={selectedTimeSend} initialFocus />
    </Popover.Content>
  </Popover.Root>
  <Textarea
    id="textarea"
    name="textarea"
    placeholder={m.admin_patients_textarea()}
    class="w-full"
    rows={4}
  />
  <Button type="submit">
    {m.admin_patients_sendNotification()}
  </Button>
</form>
