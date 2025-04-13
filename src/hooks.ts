import { deLocalizeUrl } from '$lib/paraglide/runtime';

export const reroute = (request) => {
  if (request.url.pathname === '/') return '/login';
  return deLocalizeUrl(request.url).pathname;
};
