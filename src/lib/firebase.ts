import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAwJN4oicLvEG_JMYOmMq6EUOx0DbzMvUU",
  authDomain: "noblepath-1818c.firebaseapp.com",
  projectId: "noblepath-1818c",
  storageBucket: "noblepath-1818c.firebasestorage.app",
  messagingSenderId: "911568565614",
  appId: "1:911568565614:web:1e977ac6bfb751e1ba7d7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Collection references with proper typing
export const collections = {
  users: 'users',
  teachers: 'teachers',
  students: 'students',
  classes: 'classes',
  subjects: 'subjects',
  attendance: 'attendance',
  results: 'results',
  terms: 'terms',
  lessonPlans: 'lessonPlans',
  notifications: 'notifications',
  activities: 'activities'
} as const;
