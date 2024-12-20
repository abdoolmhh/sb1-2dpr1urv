import { auth, db, collections } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

export async function seedDatabase() {
  try {
    // Create admin user
    const adminCredential = await createUserWithEmailAndPassword(
      auth,
      'admin@noblepaths.com',
      'admin@123'
    );

    // Set admin user data
    await setDoc(doc(db, collections.users, adminCredential.user.uid), {
      email: 'admin@noblepaths.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    // Create sample teacher
    const teacherCredential = await createUserWithEmailAndPassword(
      auth,
      'teacher@noblepaths.com',
      'teacher@123'
    );

    // Set teacher data
    await setDoc(doc(db, collections.users, teacherCredential.user.uid), {
      email: 'teacher@noblepaths.com',
      name: 'John Teacher',
      role: 'teacher',
      employeeId: 'T001',
      phone: '+1234567890',
      subjects: ['MATH', 'PHY'],
      classes: ['1A', '1B'],
      status: 'active',
      dateOfBirth: Timestamp.fromDate(new Date('1980-01-01')),
      gender: 'male',
      address: '123 School St',
      qualifications: ['B.Ed', 'M.Ed'],
      joinDate: Timestamp.fromDate(new Date('2020-01-01')),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    console.log('Database seeded successfully');
    
    return {
      adminEmail: 'admin@noblepaths.com',
      adminPassword: 'admin@123',
      teacherEmail: 'teacher@noblepaths.com',
      teacherPassword: 'teacher@123'
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}