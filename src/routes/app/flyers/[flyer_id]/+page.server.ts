import { error } from '@sveltejs/kit';

export function load({ params }) {
  // TODO : Replace with real data from pocketbase
  const data = [
    [
      { heading: 'Page 1', content: 'Flyer content page ID 1' },
      { heading: 'Page 2', content: 'Flyer content for ID 1' },
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

  let flyer_id = 1; // Default flyer ID, remove this later
  if (params.flyer_id) {
    flyer_id = parseInt(params.flyer_id);
  }

  const flyer = data[flyer_id - 1];
  if (!flyer) {
    throw error(404, 'Flyer not found');
  }
  return {
    flyer_id,
    flyer
  };
}
