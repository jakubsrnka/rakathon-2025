import { pbClient } from '$lib/pocketbase';
import type { DemoUser } from '$types/demoUser';
import { Collections } from '$types/pocketbase';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const usersResponse = await pbClient.collection(Collections.Users).getFullList({ fetch });
    const users = usersResponse.map(
      (user) =>
        ({
          id: user.id,
          email: user.email,
          name: user.name,
          surname: user.surname,
          birth_number: user.birth_number,
          title_before: user.title_before,
          title_after: user.title_after
        }) as DemoUser
    );
    let demoApi: DemoUser[] = [
      {
        birth_number: '840305/1234',
        email: 'jana.novakova@example.com',
        name: 'Jana',
        surname: 'Nováková',
        title_before: 'Bc.',
        title_after: 'MBA'
      },
      {
        birth_number: '750921/5678',
        email: 'petr.kral@example.com',
        name: 'Petr',
        surname: 'Král'
      },
      {
        birth_number: '930112/2345',
        email: 'eva.svobodova@example.com',
        name: 'Eva',
        surname: 'Svobodová',
        title_before: 'Mgr.'
      },
      {
        birth_number: '681223/7890',
        email: 'tomas.cerny@example.com',
        name: 'Tomáš',
        surname: 'Černý',
        title_after: 'PhD.'
      },
      {
        birth_number: '720415/3456',
        email: 'lucie.prochazkova@example.com',
        name: 'Lucie',
        surname: 'Procházková'
      },
      {
        birth_number: '891106/4567',
        email: 'marek.horak@example.com',
        name: 'Marek',
        surname: 'Horák',
        title_before: 'Ing.'
      },
      {
        birth_number: '770318/6789',
        email: 'barbora.benesova@example.com',
        name: 'Barbora',
        surname: 'Benešová'
      }
    ];

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
