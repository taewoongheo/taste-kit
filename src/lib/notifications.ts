import * as Notifications from 'expo-notifications';
import type { NotificationRequest } from 'expo-notifications';

// Set default handler so notifications show when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/** Request notification permission */
export async function requestPermission(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

/** Schedule a one-time notification after N seconds */
export async function scheduleAfter(title: string, body: string, seconds: number): Promise<string> {
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds },
  });
}

/** Schedule a daily repeating notification at hour:minute */
export async function scheduleDaily(
  title: string,
  body: string,
  hour: number,
  minute: number,
): Promise<string> {
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

/** Cancel a single scheduled notification */
export async function cancel(id: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(id);
}

/** Cancel all scheduled notifications */
export async function cancelAll(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/** Get all pending scheduled notifications */
export async function getPending(): Promise<NotificationRequest[]> {
  return Notifications.getAllScheduledNotificationsAsync();
}
