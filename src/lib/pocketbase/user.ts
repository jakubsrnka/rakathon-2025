import type { DemoUser } from '$types/demoUser';
import { Collections, UsersRoleOptions, type UsersRecord } from '$types/pocketbase';
import { pbClient } from '$lib/pocketbase';

export const createUser = async (user: DemoUser) => {
  const data = {
    password: '12345678',
    passwordConfirm: '12345678',
    email: 'test@example.com',
    emailVisibility: true,
    verified: true,
    birth_number: 'test',
    name: 'test',
    surname: 'test',
    title_after: 'test',
    title_before: 'test',
    hash_ident: 'test',
    role: 'user'
  };
  try {
    const response = await pbClient.collection(Collections.Users).create(data);
    console.log('Created user:', response);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
