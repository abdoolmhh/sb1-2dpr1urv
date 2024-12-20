import { z } from 'zod';

// Base schemas for validation
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['admin', 'teacher']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const teacherSchema = userSchema.extend({
  employeeId: z.string(),
  phone: z.string(),
  subjects: z.array(z.string()),
  classes: z.array(z.string()),
  status: z.enum(['active', 'inactive']),
  dateOfBirth: z.date(),
  gender: z.enum(['male', 'female', 'other']),
  address: z.string(),
  qualifications: z.array(z.string()),
  joinDate: z.date(),
});

export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  admissionNumber: z.string(),
  classId: z.string(),
  dateOfBirth: z.date(),
  gender: z.enum(['male', 'female', 'other']),
  guardianName: z.string(),
  guardianPhone: z.string(),
  address: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const classSchema = z.object({
  id: z.string(),
  name: z.string(),
  subjects: z.array(z.string()),
  teacherId: z.string(),
  academicYear: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const subjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  classId: z.string(),
  teacherId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const attendanceSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  classId: z.string(),
  date: z.date(),
  status: z.enum(['present', 'absent', 'late']),
  term: z.number(),
  academicYear: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const resultSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  subjectId: z.string(),
  classId: z.string(),
  term: z.number(),
  academicYear: z.string(),
  scores: z.object({
    coursework: z.number().min(0).max(100),
    homework: z.number().min(0).max(100),
    continuousAssessment: z.number().min(0).max(100),
    project: z.number().min(0).max(100),
    affective: z.number().min(0).max(100),
    psychomotor: z.number().min(0).max(100),
    exam: z.number().min(0).max(100),
  }),
  totalScore: z.number(),
  grade: z.string(),
  teacherComment: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});