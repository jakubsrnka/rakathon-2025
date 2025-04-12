import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { currentUser, isLoggedIn } from '$lib/pocketbase';
import { get } from 'svelte/store';

export const load: LayoutLoad = async () => {
  if (isLoggedIn()) {
    if (get(currentUser)?.role === 'user') throw redirect(303, '/app');
    throw redirect(303, '/admin');
  }
};
