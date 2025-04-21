/**
 * Firebase Service Configuration
 * This file initializes Firebase services used throughout the application
 * - Authentication: User authentication (login/register)
 * - Firestore: Database for user data and wishlists
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase configuration object
 * Values are loaded from environment variables for security
 */
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase app with configuration
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 