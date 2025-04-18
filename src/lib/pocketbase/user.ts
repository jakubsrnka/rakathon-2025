import type { UsersCreate } from '$types/user';
import { Collections } from '$types/pocketbase';
import { pbClient } from '$lib/pocketbase';

export const createUser = async (user: UsersCreate) => {
  try {
    const response = await pbClient.collection(Collections.Users).create(user);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
