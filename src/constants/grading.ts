export const SCORE_WEIGHTS = {
  coursework: 0.10,
  homework: 0.10,
  continuousAssessment: 0.20,
  project: 0.10,
  affective: 0.05,
  psychomotor: 0.05,
  exam: 0.40,
} as const;

export const GRADE_SCALE = [
  { min: 96, grade: 'A+' },
  { min: 91, grade: 'A' },
  { min: 86, grade: 'A-' },
  { min: 81, grade: 'B+' },
  { min: 76, grade: 'B' },
  { min: 71, grade: 'B-' },
  { min: 66, grade: 'C+' },
  { min: 61, grade: 'C' },
  { min: 56, grade: 'C-' },
  { min: 51, grade: 'D+' },
  { min: 46, grade: 'D' },
  { min: 0, grade: 'F' },
] as const;