import { Collections } from '$types/pocketbase';
import { pbClient } from '$lib/pocketbase';

export const createNotification = async (notificatio: Notification) => {
  try {
    const response = await pbClient.collection(Collections.Notifications).create(notificatio);
    console.log('Created notification:', response);
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};
