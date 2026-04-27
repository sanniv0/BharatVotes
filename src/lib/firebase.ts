import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, collection, addDoc, serverTimestamp } from 'firebase/firestore';
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
export const db = getFirestore(app, getEnv('VITE_FIREBASE_FIRESTORE_DATABASE_ID'));
export const auth = getAuth(app);

// Connectivity check
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connection established.");
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or network.");
    }
  }
}
testConnection();

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
