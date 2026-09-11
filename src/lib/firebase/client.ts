import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyABhZHIqpAkue2243Z0KoIhbmcGbTpxF5I',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'localrank-ai-31e78.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'localrank-ai-31e78',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'localrank-ai-31e78.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '201955554395',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:201955554395:web:b23de3335e9654aeb33b7e'
};

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

export function getFirebaseApp(): { app: FirebaseApp; db: Firestore; auth: Auth; isConfigured: boolean } {
  const isConfigured = Boolean(firebaseConfig.projectId && firebaseConfig.apiKey !== 'demo-api-key');

  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  db = getFirestore(app);
  auth = getAuth(app);

  return { app, db, auth, isConfigured };
}

export { app, db, auth };
