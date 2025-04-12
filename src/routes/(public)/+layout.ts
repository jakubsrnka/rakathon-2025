import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { currentUser } from '$lib/pocketbase';

export const load: LayoutLoad = async () => {
  currentUser.subscribe((user) => {
    if (user) {
      if (user.role !== 'admin') throw redirect(302, '/app');
      throw redirect(302, '/admin');
    }
  });
};
