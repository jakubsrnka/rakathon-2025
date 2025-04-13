import { pbClient } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const flyersResponse = await pbClient.collection('flyers').getFullList({ fetch });
    return { flyersResponse };
  } catch (error) {
    console.error('Error fetching flyers:', error);
    return { flyersResponse: [] };
  }
};
