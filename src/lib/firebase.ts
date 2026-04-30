import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';
import { getEnv } from './env';

const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('VITE_FIREBASE_APP_ID'),
  measurementId: getEnv('VITE_FIREBASE_MEASUREMENT_ID')
};

const app = initializeApp(firebaseConfig);
// MUST use firestoreDatabaseId from the config
const firestoreDbId = getEnv('VITE_FIREBASE_FIRESTORE_DATABASE_ID');
export const db = firestoreDbId && firestoreDbId !== '(default)' 
  ? getFirestore(app, firestoreDbId) 
  : getFirestore(app);
export const auth = getAuth(app);
export let analytics: ReturnType<typeof getAnalytics> | null = null;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

/**
 * Logs a query and its response to Firestore for analytics and improvement.
 * @param prompt User's input prompt
 * @param response Assistant's response
 * @param userId Optional user ID
 */
export async function logQuery(prompt: string, response: string, userId?: string) {
  try {
    await addDoc(collection(db, 'queries'), {
      prompt,
      response,
      userId: userId || null,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Failed to log query to Firestore:", error);
  }
}

/**
 * Logs a custom event to Firebase Analytics if supported and initialized.
 * @param eventName The name of the event
 * @param eventParams Optional event parameters
 */
export function logUserEvent(eventName: string, eventParams?: Record<string, any>) {
  if (analytics) {
    try {
      logEvent(analytics, eventName, eventParams);
    } catch (error) {
      console.error("Failed to log user event:", error);
    }
  }
}
