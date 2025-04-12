import { pbClient } from '$lib/pocketbase';
import type { UsersDemo } from '$types/user';
import { Collections, type UsersResponse } from '$types/pocketbase';
import type { PageLoad } from './$types';
import { demoApi } from '$lib/demoAPI';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const usersResponse = await pbClient
      .collection(Collections.Users)
      .getFullList<UsersResponse>({ fetch });
    const users: UsersDemo[] = usersResponse.map(
      (user) =>
        ({
          id: user.id,
          email: user.email,
          name: user.name,
          surname: user.surname,
          birth_number: user.birth_number,
          title_before: user.title_before,
          title_after: user.title_after
        }) as UsersDemo
    );

    users.forEach((user) => {
      const existingUser = demoApi.find((demo) => demo.birth_number === user.birth_number);
      if (!existingUser) {
        demoApi.push(user);
      }
    });

    return { usersResponse, demoApi };
  } catch {
    console.log('Error fetching users');
    return { usersResponse: [], demoApi: [] };
  }
};
