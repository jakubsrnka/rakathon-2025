import { PUBLIC_PB_URL } from '$env/static/public';
import { PB_SUPERUSER_EMAIL, PB_SUPERUSER_PASSWORD } from '$env/static/private';

import PocketBase from 'pocketbase';

// ADMIN
const createAdminPocketBase = (url: string) => {
  const pb = new PocketBase(url);
  pb.autoCancellation(false);
  return pb;
};

export const pbSuperuser = createAdminPocketBase(PUBLIC_PB_URL);

await pbSuperuser.admins.authWithPassword(PB_SUPERUSER_EMAIL, PB_SUPERUSER_PASSWORD, {
  autoRefreshThreshold: 30 * 60
});
