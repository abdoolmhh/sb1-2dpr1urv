import { Score } from '../types';
import { SCORE_WEIGHTS, GRADE_SCALE } from '../constants/grading';

export function calculateTotalScore(scores: Partial<Score>): number {
  return Object.entries(SCORE_WEIGHTS).reduce((total, [key, weight]) => {
    const score = scores[key as keyof typeof SCORE_WEIGHTS] || 0;
    return total + (score * weight);
  }, 0);
}

export function calculateGrade(totalScore: number): string {
  const gradeEntry = GRADE_SCALE.find(({ min }) => totalScore >= min);
  return gradeEntry?.grade || 'F';
}

export function calculateClassRanking(
  scores: Score[],
  classId: string
): { studentId: string; position: number }[] {
  return scores
    .filter(score => score.classId === classId)
    .map(score => ({
      studentId: score.studentId,
      totalScore: calculateTotalScore(score),
    }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((result, index) => ({
      studentId: result.studentId,
      position: index + 1,
    }));
}