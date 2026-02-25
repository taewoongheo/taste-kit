import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'expo-store-review';

const STORAGE_KEY = 'review_tracker';
const MIN_LAUNCHES = 5;
const MIN_DAYS = 14;

interface TrackerData {
  launchCount: number;
  firstLaunchDate: string;
}

async function getTracker(): Promise<TrackerData> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  return { launchCount: 0, firstLaunchDate: new Date().toISOString() };
}

async function saveTracker(data: TrackerData): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Call on app launch to increment counter */
export async function trackLaunch(): Promise<void> {
  const tracker = await getTracker();
  tracker.launchCount += 1;
  await saveTracker(tracker);
}

/** Request review if conditions are met (5 launches + 14 days) */
export async function requestIfReady(): Promise<boolean> {
  const tracker = await getTracker();
  const daysSinceFirst =
    (Date.now() - new Date(tracker.firstLaunchDate).getTime()) / (1000 * 60 * 60 * 24);

  if (tracker.launchCount >= MIN_LAUNCHES && daysSinceFirst >= MIN_DAYS) {
    if (await StoreReview.hasAction()) {
      await StoreReview.requestReview();
      return true;
    }
  }
  return false;
}

/** Force review request (for demo/testing) */
export async function forceRequest(): Promise<void> {
  if (await StoreReview.hasAction()) {
    await StoreReview.requestReview();
  }
}

/** Reset tracker data (for demo/testing) */
export async function resetTracker(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

/** Get current tracker state (for demo display) */
export async function getTrackerState(): Promise<TrackerData & { daysSinceFirst: number }> {
  const tracker = await getTracker();
  const daysSinceFirst =
    (Date.now() - new Date(tracker.firstLaunchDate).getTime()) / (1000 * 60 * 60 * 24);
  return { ...tracker, daysSinceFirst };
}
