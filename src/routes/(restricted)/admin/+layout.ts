import type { LayoutLoad } from './$types';
import { currentUser } from '$lib/pocketbase/';
import { UsersRoleOptions } from '$types/pocketbase';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const load: LayoutLoad = async ({ fetch }) => {
  if (get(currentUser)?.role !== UsersRoleOptions.admin) throw redirect(303, '/app');
};
