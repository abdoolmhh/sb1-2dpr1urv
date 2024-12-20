export const PAGES = {
  STUDENTS: 'students',
  CLASSES: 'classes',
  SUBJECTS: 'subjects',
  ATTENDANCE: 'attendance',
  RESULTS: 'results',
  REPORTS: 'reports',
} as const;

export type PageType = typeof PAGES[keyof typeof PAGES];