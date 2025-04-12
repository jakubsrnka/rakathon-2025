import { currentUser, pbClient } from '$lib/pocketbase/';
import { toast } from 'svelte-sonner';
import { goto } from '$app/navigation';
import { Collections } from '$types/pocketbase';
import type { AuthRecord } from 'pocketbase';

export const login = async () => {
  const email = 'tonda@rakathon.cz';
  const password = '12345678';

  try {
    const { record } = await pbClient
      .collection(Collections.Users)
      .authWithPassword(email, password);
    if (record) {
      currentUser.set(record as AuthRecord);
      toast.success('Login successful');
      if (record.role === 'admin') {
        goto('/admin');
      } else {
        goto('/app');
      }
    }
  } catch {
    toast.error('Invalid credentials');
  }
};
