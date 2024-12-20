import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc,
  doc,
  deleteDoc,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db, collections } from '../firebase';

// Teacher queries
export const createTeacher = async (teacherData: any) => {
  const teachersRef = collection(db, collections.teachers);
  const now = Timestamp.now();
  
  const data = {
    ...teacherData,
    createdAt: now,
    updatedAt: now,
    status: 'active',
  };
  
  return await addDoc(teachersRef, data);
};

export const getTeachers = async () => {
  const teachersRef = collection(db, collections.teachers);
  const q = query(teachersRef, where('status', '==', 'active'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Student queries
export const createStudent = async (studentData: any) => {
  const studentsRef = collection(db, collections.students);
  const now = Timestamp.now();
  
  const data = {
    ...studentData,
    createdAt: now,
    updatedAt: now,
  };
  
  return await addDoc(studentsRef, data);
};

export const getStudentsByClass = async (classId: string) => {
  const studentsRef = collection(db, collections.students);
  const q = query(studentsRef, where('classId', '==', classId), orderBy('name'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Attendance queries
export const markAttendance = async (attendanceData: any) => {
  const attendanceRef = collection(db, collections.attendance);
  const now = Timestamp.now();
  
  const data = {
    ...attendanceData,
    date: Timestamp.fromDate(new Date(attendanceData.date)),
    createdAt: now,
    updatedAt: now,
  };
  
  return await addDoc(attendanceRef, data);
};

export const getAttendanceByClass = async (classId: string, startDate: Date, endDate: Date) => {
  const attendanceRef = collection(db, collections.attendance);
  const q = query(
    attendanceRef,
    where('classId', '==', classId),
    where('date', '>=', Timestamp.fromDate(startDate)),
    where('date', '<=', Timestamp.fromDate(endDate)),
    orderBy('date', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Results queries
export const submitResult = async (resultData: any) => {
  const resultsRef = collection(db, collections.results);
  const now = Timestamp.now();
  
  const data = {
    ...resultData,
    createdAt: now,
    updatedAt: now,
  };
  
  return await addDoc(resultsRef, data);
};

export const getStudentResults = async (studentId: string, term: number, academicYear: string) => {
  const resultsRef = collection(db, collections.results);
  const q = query(
    resultsRef,
    where('studentId', '==', studentId),
    where('term', '==', term),
    where('academicYear', '==', academicYear)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Class queries
export const createClass = async (classData: any) => {
  const classesRef = collection(db, collections.classes);
  const now = Timestamp.now();
  
  const data = {
    ...classData,
    createdAt: now,
    updatedAt: now,
  };
  
  return await addDoc(classesRef, data);
};

export const getTeacherClasses = async (teacherId: string) => {
  const classesRef = collection(db, collections.classes);
  const q = query(classesRef, where('teacherId', '==', teacherId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Subject queries
export const createSubject = async (subjectData: any) => {
  const subjectsRef = collection(db, collections.subjects);
  const now = Timestamp.now();
  
  const data = {
    ...subjectData,
    createdAt: now,
    updatedAt: now,
  };
  
  return await addDoc(subjectsRef, data);
};

export const getClassSubjects = async (classId: string) => {
  const subjectsRef = collection(db, collections.subjects);
  const q = query(subjectsRef, where('classId', '==', classId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};