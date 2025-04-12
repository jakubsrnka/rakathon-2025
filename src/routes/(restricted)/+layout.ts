import type { LayoutLoad } from './$types';
import { isLoggedIn, pbClient } from '$lib/pocketbase/';
import { Collections } from '$types/pocketbase';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ fetch }) => {
  if (!isLoggedIn()) throw redirect(303, '/login');

  if (pbClient.authStore.isValid) {
    try {
      pbClient.collection(Collections.Users).authRefresh({ fetch });
    } catch (e) {
      pbClient.authStore.clear();
      console.log('User not authenticated, redirecting to login', e);
    }
  }
};
