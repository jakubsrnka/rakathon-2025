<script lang="ts">
  import { goto } from '$app/navigation';
  import * as Story from '$components/stories';
  import { error } from '@sveltejs/kit';
  import type { PageData } from './$types';
  import { m } from '$lib/paraglide/messages';

  let { data }: { data: PageData } = $props();

  let storyDuration: number = 3; // seconds

  async function load(id: string) {
    // TODO : Replace with real data from pocketbase
    const data = [
      [
        {
          heading: 'Co je Imatinib?',
          content:
            'Imatinib (Glivec) je cílená biologická léčba určená pro pacienty s gastrointestinálními stromálními nádory (GIST). Patří mezi tzv. inhibitory tyrosinkinázy a pomáhá zpomalit nebo zastavit růst nádorových buněk.'
        },
        {
          heading: 'Jak Imatinib užívat?',
          content: `- Užívejte přesně podle pokynů lékaře.

        - Obvyklá dávka je 400 mg denně, ale může být upravena dle potřeb.

        - Tabletu spolkněte celou s jídlem a dostatečným množstvím vody.

        - Snažte se užívat lék každý den ve stejnou dobu.`
        },
        { heading: 'Page 3', content: 'Flyer content for ID 1' }
      ],
      [
        { heading: 'Page 1', content: 'Flyer content for ID 2' },
        { heading: 'Page 2', content: 'Flyer content for ID 2' },
        { heading: 'Page 3', content: 'Flyer content for ID 2' }
      ],
      [
        { heading: 'Page 1', content: 'Flyer content for ID 3' },
        { heading: 'Page 2', content: 'Flyer content for ID 3' },
        { heading: 'Page 3', content: 'Flyer content for ID 3' }
      ]
    ];
    const flyer = data[parseInt(id) - 1];
    if (!flyer) {
      throw error(404, 'Flyer not found');
    }
    return {
      flyer
    };
  }
</script>

{#await load(data.params.flyer_id)}
  <Story.Wrapper length={10000}>
    <Story.Root class="bg-red-500">
      {m.app_flyers_loading_flyer()}
    </Story.Root>
  </Story.Wrapper>
{:then { flyer }}
  <Story.Wrapper length={flyer.length * storyDuration} onend={() => goto('/app/notifications')}>
    {#each flyer as { heading, content }}
      <Story.Root class="bg-red-500">
        <div class="flex flex-col gap-4 p-4 lg:h-[60px] lg:px-6">
          <h1 class="text-3xl font-semibold">{heading}</h1>
          <h1 class="text-lg font-semibold">{content}</h1>
        </div>
      </Story.Root>
    {/each}
  </Story.Wrapper>
{/await}
