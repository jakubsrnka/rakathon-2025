import { Collections } from '$types/pocketbase';
import { pbClient } from '$lib/pocketbase';
import type { PatientNotification } from '$types/notification';

export const createNotification = async (notificatio: PatientNotification) => {
  try {
    const response = await pbClient.collection(Collections.Notifications).create(notificatio);
    return response;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};
