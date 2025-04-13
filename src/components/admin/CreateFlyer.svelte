<script lang="ts">
  import { Skeleton } from '$components/ui/skeleton';
  import Badge from '$components/ui/badge/badge.svelte';
  import { Button } from '$components/ui/button';
  import * as Card from '$components/ui/card';
  import { Input } from '$components/ui/input';
  import * as Select from '$components/ui/select';
  import Separator from '$components/ui/separator/separator.svelte';
  import { m } from '$lib/paraglide/messages';
  import type { Flyer } from '$types/flyers';
  import { createFlyer } from '$lib/pocketbase/flyer';
  import { Minus, Plus, WandSparkles, X } from '@lucide/svelte';
  import { goto } from '$app/navigation';

  let { exportFlyer = $bindable(), variant = 1 }: { exportFlyer?: Flyer; variant?: 1 | 2 } =
    $props();

  let prompt: string | undefined = $state(undefined);
  let language: {
    value: string;
    label: string;
  } = $state({ value: 'Czech', label: 'Čeština' });

  let submitted = $state(false);
  let flyer = $state<Flyer>({
    heading: 'Letáček',
    slides: [
      {
        title: 'Nadpis',
        content: ['Obsah 1. řádku', 'Obsah 2. řádku']
      }
    ],
    tags: []
  });

  const languages = [
    { value: 'Czech', label: 'Čeština' },
    { value: 'English', label: 'Angličtina' },
    { value: 'German', label: 'Němčina' },
    { value: 'Italian', label: 'Italština' },
    { value: 'Klingon', label: 'Klingonština' }
  ];

  const getFlyer = async (): Promise<void> => {
    submitted = true;
    const params = new URLSearchParams();
    params.append('prompt', prompt || '');
    params.append('lang', language.value);
    try {
      const response = await fetch(`/api/flyers/new?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch flyer');
      }
      flyer = await response.json();
    } catch (error) {
      console.error('Error fetching flyer:', error);
      throw error;
    }
    submitted = false;
  };

  async function handleClick() {
    try {
      await createFlyer(flyer);
      exportFlyer = flyer;
      goto('/admin/flyers');
    } catch (error) {
      console.error('Error creating flyer:', error);
    }
  }

  $effect(() => {
    if (submitted) {
      getFlyer();
    }
  });

  function adjustWidth(node: HTMLInputElement) {
    $effect(() => {
      // Function to calculate and set width based on content
      const calculateWidth = () => {
        const tempEl = document.createElement('span');
        const inputStyles = window.getComputedStyle(node);
        tempEl.style.font = inputStyles.font;
        tempEl.style.fontSize = inputStyles.fontSize;
        tempEl.style.fontFamily = inputStyles.fontFamily;
        tempEl.style.fontWeight = inputStyles.fontWeight;
        tempEl.style.letterSpacing = inputStyles.letterSpacing;
        tempEl.style.whiteSpace = 'nowrap';
        tempEl.style.position = 'absolute';
        tempEl.style.visibility = 'hidden';

        tempEl.textContent = node.value || '';
        document.body.appendChild(tempEl);

        const textWidth = tempEl.getBoundingClientRect().width;
        node.style.width = `${textWidth + 24}px`;

        document.body.removeChild(tempEl);
      };

      // Run immediately on mount
      calculateWidth();

      // Set up event listeners
      const focusInHandler = () => {
        node.style.width = '128px';
      };

      const focusOutHandler = () => {
        calculateWidth();
      };

      // Add event listeners
      node.addEventListener('focusin', focusInHandler);
      node.addEventListener('focusout', focusOutHandler);

      return () => {
        node.removeEventListener('focusin', focusInHandler);
        node.removeEventListener('focusout', focusOutHandler);
      };
    });
  }
</script>

<div class="mx-auto w-full max-w-[max(50%,512px)]">
  <Card.Root class="p-4">
    <form
      onsubmit={(e) => {
        e.preventDefault();
        submitted = true;
      }}
      class="flex flex-col gap-2"
    >
      <Select.Root bind:selected={language} name="lang">
        <Select.Trigger class="w-[180px]">
          <Select.Value placeholder={m.flyer_new_language()} />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>{m.flyer_new_language()}</Select.Label>
            {#each languages as language}
              <Select.Item value={language.value} label={language.label}
                >{language.label}</Select.Item
              >
            {/each}
          </Select.Group>
        </Select.Content>
        <Select.Input name="lang" />
      </Select.Root>
      <Input name="prompt" bind:value={prompt} required placeholder={m.flyer_new_prompt()} />
      <Button type="submit" class="flex gap-2" disabled={submitted}
        >{m.flyer_new_submit()} <WandSparkles size={16} /></Button
      >
    </form>
  </Card.Root>
  <Separator class="my-4" />
  {#if submitted}
    <div class="flex flex-col gap-2">
      <Skeleton class="h-9 w-full" />
      <Skeleton class="h-9 w-1/3" />
      <Skeleton class="h-9 w-1/2" />
      <Skeleton class="h-9 w-3/4" />
      <Skeleton class="h-9 w-2/5" />
      <Separator class="my-2" />
      <Skeleton class="h-9 w-full" />
      <Skeleton class="h-9 w-2/3" />
      <Skeleton class="h-9 w-4/5" />
      <Skeleton class="h-9 w-1/5" />
      <Separator class="my-2" />
      <div class="flex gap-2">
        <Skeleton class="h-5 w-12" />
        <Skeleton class="h-5 w-20" />
        <Skeleton class="h-5 w-9" />
        <Skeleton class="w-15 h-5" />
      </div>
    </div>
  {:else}
    <div class="flex flex-col gap-2">
      <Input
        bind:value={flyer.heading}
        type="text"
        class="border-none text-2xl font-bold shadow-none"
      />
      {#each flyer.slides as slide, index (index)}
        <li class="flex items-center gap-2">
          <Input
            bind:value={slide.title}
            type="text"
            class="bold border-none text-lg shadow-none"
            placeholder={m.flyer_new_placeholderHeading()}
          />
          <Button variant="outline" class="w-9 p-2" onclick={() => flyer.slides.splice(index, 1)}>
            <X />
          </Button>
        </li>
        <ul class="flex flex-col gap-1">
          {#each slide.content as _, jindex (jindex)}
            <li class="flex items-center gap-2 before:content-['-']">
              <Input
                bind:value={slide.content[jindex]}
                type="text"
                class="inline border-none pl-1 shadow-none"
                placeholder={m.flyer_new_placeholderContent()}
              />
              <Button
                variant="outline"
                class="w-9 p-2"
                onclick={() => slide.content.splice(jindex, 1)}
              >
                <Minus />
              </Button>
            </li>
          {/each}
          <Button
            onclick={() => flyer?.slides[index].content.push('')}
            class="w-full"
            variant="outline"
          >
            <Plus class="mr-2" />
          </Button>
        </ul>
        <Separator class="my-2" />
      {/each}
      <Button
        onclick={() =>
          flyer?.slides.push({
            title: '',
            content: ['']
          })}
        class="w-full"
        variant="outline"
      >
        <Plus class="mr-2" />
      </Button>
      <Separator class="my-2" />
      <div class="flex flex-wrap gap-2">
        {#each flyer.tags as _, index (index)}
          <Input
            bind:value={flyer.tags[index]}
            type="text"
            class="inline h-auto min-h-0 w-32 border-none bg-primary text-xs leading-none text-secondary shadow-none"
            use={adjustWidth}
          />
        {/each}
        <Badge onclick={() => flyer.tags.push('')}>
          <Plus class="mr-2" size={12} />
          {m.flyer_new_tag()}
        </Badge>
      </div>
      {#if variant === 1}
        <Button onclick={handleClick} class="flex w-full gap-2">
          {m.flyer_new_save()}
        </Button>
      {/if}
    </div>
  {/if}
</div>
{#if variant === 2}
  <Button onclick={handleClick} class="fixed bottom-4 right-4 max-w-96">
    {m.flyer_new_save()}
  </Button>
{/if}
