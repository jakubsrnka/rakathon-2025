import type { UsersRecord } from '$types/pocketbase';

export type UsersDemo = {
  birth_number: string;
  email: string;
  name: string;
  surname: string;
  title_after?: string;
  title_before?: string;
};

export type UsersCreate = Omit<
  UsersRecord,
  'verified' | 'emailVisibility' | 'id' | 'tokenKey' | 'created' | 'updated'
> & {
  passwordConfirm: string;
};
