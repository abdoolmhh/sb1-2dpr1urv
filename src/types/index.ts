export interface Student {
  id: string;
  name: string;
  classId: string;
  admissionNumber: string;
}

export interface Class {
  id: string;
  name: string;
  subjects: string[];
}

export interface Subject {
  id: string;
  name: string;
  classId: string;
}

export interface Score {
  studentId: string;
  subjectId: string;
  term: number;
  coursework: number;
  homework: number;
  continuousAssessment: number;
  project: number;
  affective: number;
  psychomotor: number;
  exam: number;
}

export interface Attendance {
  studentId: string;
  classId: string;
  term: number;
  daysPresent: number;
  daysAbsent: number;
}

export interface ResultSummary {
  totalScore: number;
  grade: string;
  position: number;
  classAverage: number;
  highestScore: number;
  lowestScore: number;
}