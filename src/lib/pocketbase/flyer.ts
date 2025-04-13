import { Collections } from '$types/pocketbase';
import { pbClient } from '$lib/pocketbase';
import type { Flyer } from '$types/flyers';

export const createFlyer = async (flyer: Flyer) => {
  const flyerData = {
    title: flyer.heading,
    contents: flyer.slides,
    tags: flyer.tags.join(', ')
  };
  try {
    const response = await pbClient.collection(Collections.Flyers).create(flyerData);
    return response;
  } catch (error) {
    console.error('Error creating flyer:', error);
  }
};
