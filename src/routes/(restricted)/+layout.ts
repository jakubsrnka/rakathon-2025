import type { LayoutLoad } from './$types';
import { pbClient } from '$lib/pocketbase/';
import { Collections } from '$types/pocketbase';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ fetch }) => {
  if (pbClient.authStore.isValid) {
    try {
      pbClient.collection(Collections.Users).authRefresh({ fetch });
    } catch {
      pbClient.authStore.clear();
    }
  } else {
    redirect(307, '/login');
  }
};
