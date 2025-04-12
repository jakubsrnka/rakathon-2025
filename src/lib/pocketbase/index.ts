import PocketBase, { type AuthRecord } from 'pocketbase';
import { writable } from 'svelte/store';
import { PUBLIC_PB_URL } from '$env/static/public';
import { type TypedPocketBase } from '$types/pocketbase';

// USER
export const createPocketBase = (url: string) => {
  const pb = new PocketBase(url) as TypedPocketBase;
  return pb;
};

export const pbClient = createPocketBase(PUBLIC_PB_URL);

export const currentUser = writable<AuthRecord>(pbClient.authStore.record);

pbClient.authStore.onChange((_, record) => {
  currentUser.set(record);
});
