import type { UsersRoleOptions } from './pocketbase';

export type DemoUser = {
  birth_number: string;
  email: string;
  name: string;
  surname: string;
  title_after?: string;
  title_before?: string;
  password?: string;
  role?: UsersRoleOptions;
};
