import type { LayoutLoad } from './$types';
import { currentUser, isLoggedIn, pbClient } from '$lib/pocketbase/';
import { Collections } from '$types/pocketbase';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const load: LayoutLoad = async ({ fetch }) => {
  console.log(get(currentUser)?.role);
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
