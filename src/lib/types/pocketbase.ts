/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
  Authorigins = '_authOrigins',
  Externalauths = '_externalAuths',
  Mfas = '_mfas',
  Otps = '_otps',
  Superusers = '_superusers',
  Flyers = 'flyers',
  Notifications = 'notifications',
  Users = 'users',
  UsersInfo = 'usersInfo'
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AuthoriginsRecord = {
  collectionRef: string;
  created?: IsoDateString;
  fingerprint: string;
  id: string;
  recordRef: string;
  updated?: IsoDateString;
};

export type ExternalauthsRecord = {
  collectionRef: string;
  created?: IsoDateString;
  id: string;
  provider: string;
  providerId: string;
  recordRef: string;
  updated?: IsoDateString;
};

export type MfasRecord = {
  collectionRef: string;
  created?: IsoDateString;
  id: string;
  method: string;
  recordRef: string;
  updated?: IsoDateString;
};

export type OtpsRecord = {
  collectionRef: string;
  created?: IsoDateString;
  id: string;
  password: string;
  recordRef: string;
  sentTo?: string;
  updated?: IsoDateString;
};

export type SuperusersRecord = {
  created?: IsoDateString;
  email: string;
  emailVisibility?: boolean;
  id: string;
  password: string;
  tokenKey: string;
  updated?: IsoDateString;
  verified?: boolean;
};

export type FlyersRecord<Tcontents = unknown> = {
  contents: null | Tcontents;
  created?: IsoDateString;
  id: string;
  tags?: string;
  title: string;
  updated?: IsoDateString;
};

export enum NotificationsTagsOptions {
  'tag1' = 'tag1',
  'tag2' = 'tag2',
  'tag3' = 'tag3',
  'tag4' = 'tag4'
}
export type NotificationsRecord = {
  admin?: RecordIdString;
  created?: IsoDateString;
  flyer?: string;
  id: string;
  last_seen?: IsoDateString;
  tags?: NotificationsTagsOptions[];
  text?: string;
  time_send: IsoDateString;
  updated?: IsoDateString;
  user?: RecordIdString;
};

export enum UsersRoleOptions {
  'user' = 'user',
  'admin' = 'admin'
}
export type UsersRecord = {
  avatar?: string;
  birth_number?: string;
  created?: IsoDateString;
  email: string;
  emailVisibility?: boolean;
  hash_ident?: string;
  id: string;
  name: string;
  password: string;
  role: UsersRoleOptions;
  surname: string;
  title_after?: string;
  title_before?: string;
  tokenKey: string;
  updated?: IsoDateString;
  verified?: boolean;
};

export enum UsersInfoTypeOptions {
  'phone' = 'phone',
  'insurance' = 'insurance'
}
export type UsersInfoRecord = {
  created?: IsoDateString;
  id: string;
  time_from: IsoDateString;
  time_to?: IsoDateString;
  type?: UsersInfoTypeOptions;
  updated?: IsoDateString;
  user?: RecordIdString;
  value: string;
};

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> &
  BaseSystemFields<Texpand>;
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> &
  BaseSystemFields<Texpand>;
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>;
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>;
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> &
  AuthSystemFields<Texpand>;
export type FlyersResponse<Tcontents = unknown, Texpand = unknown> = Required<
  FlyersRecord<Tcontents>
> &
  BaseSystemFields<Texpand>;
export type NotificationsResponse<Texpand = unknown> = Required<NotificationsRecord> &
  BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>;
export type UsersInfoResponse<Texpand = unknown> = Required<UsersInfoRecord> &
  BaseSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  _authOrigins: AuthoriginsRecord;
  _externalAuths: ExternalauthsRecord;
  _mfas: MfasRecord;
  _otps: OtpsRecord;
  _superusers: SuperusersRecord;
  flyers: FlyersRecord;
  notifications: NotificationsRecord;
  users: UsersRecord;
  usersInfo: UsersInfoRecord;
};

export type CollectionResponses = {
  _authOrigins: AuthoriginsResponse;
  _externalAuths: ExternalauthsResponse;
  _mfas: MfasResponse;
  _otps: OtpsResponse;
  _superusers: SuperusersResponse;
  flyers: FlyersResponse;
  notifications: NotificationsResponse;
  users: UsersResponse;
  usersInfo: UsersInfoResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>;
  collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>;
  collection(idOrName: '_mfas'): RecordService<MfasResponse>;
  collection(idOrName: '_otps'): RecordService<OtpsResponse>;
  collection(idOrName: '_superusers'): RecordService<SuperusersResponse>;
  collection(idOrName: 'flyers'): RecordService<FlyersResponse>;
  collection(idOrName: 'notifications'): RecordService<NotificationsResponse>;
  collection(idOrName: 'users'): RecordService<UsersResponse>;
  collection(idOrName: 'usersInfo'): RecordService<UsersInfoResponse>;
};
