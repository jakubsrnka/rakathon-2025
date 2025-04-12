import type { UsersDemo } from '$types/user';
import { Collections } from '$types/pocketbase';
import { pbClient } from '$lib/pocketbase';

export const createUser = async (user: UsersDemo) => {
  try {
    const response = await pbClient.collection(Collections.Users).create(user);
    console.log('Created user:', response);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
