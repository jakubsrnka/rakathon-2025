import { pbClient } from '$lib/pocketbase';
import type { UsersDemo } from '$types/user';
import { Collections, type UsersResponse } from '$types/pocketbase';
import type { PageLoad } from './$types';
import { demoApi } from '$lib/demoAPI';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const flyersResponse = await pbClient.collection('flyers').getFullList({ fetch });

    const usersResponse = await pbClient
      .collection(Collections.Users)
      .getFullList<UsersResponse>({ fetch });
    const users: UsersDemo[] = usersResponse.map(
      (user) =>
        ({
          databaseId: user.id,
          birth_number: user.birth_number,
          email: user.email,
          name: user.name,
          surname: user.surname,
          title_before: user.title_before,
          title_after: user.title_after
        }) as UsersDemo
    );

    users.forEach((user) => {
      const existingUser = demoApi.find((demo) => demo.birth_number === user.birth_number);
      if (!existingUser) {
        demoApi.push(user);
      } else {
        demoApi[demoApi.indexOf(existingUser)].databaseId = user.databaseId;
      }
    });

    return { usersResponse, flyersResponse, demoApi };
  } catch {
    console.log('Error fetching users');
    return { usersResponse: [], flyersResponse: [], demoApi: [] };
  }
};
