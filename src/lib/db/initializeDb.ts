import { seedDatabase } from './seed';
import { db, collections, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export async function initializeDatabase() {
  // Wait for authentication state to be ready
  await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

  try {
    // Check if database is empty
    const usersRef = collection(db, collections.users);
    const snapshot = await getDocs(usersRef);
    
    if (snapshot.empty) {
      console.log('Database is empty, seeding initial data...');
      await seedDatabase();
      console.log('Database seeded successfully');
    } else {
      console.log('Database already contains data');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}