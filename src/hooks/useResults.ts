import { useState } from 'react';
import { Score } from '../types';
import { calculateTotalScore, calculateGrade } from '../utils/results';

export function useResults() {
  // Mock initial data - replace with API calls
  const [results, setResults] = useState<Score[]>([
    {
      studentId: '1',
      subjectId: 'MATH',
      term: 1,
      coursework: 85,
      homework: 90,
      continuousAssessment: 88,
      project: 92,
      affective: 95,
      psychomotor: 90,
      exam: 87,
    },
  ]);

  const addResult = (data: Omit<Score, 'studentId'>) => {
    const newResult: Score = {
      ...data,
      studentId: '1', // This should come from selected student
    };
    setResults([...results, newResult]);
  };

  const getResultSummary = (result: Score) => {
    const totalScore = calculateTotalScore(result);
    const grade = calculateGrade(totalScore);
    
    return {
      totalScore,
      grade,
      position: 1, // This should be calculated based on class ranking
      classAverage: totalScore, // This should be calculated from all class results
      highestScore: totalScore, // This should be calculated from all class results
      lowestScore: totalScore, // This should be calculated from all class results
    };
  };

  return {
    results,
    addResult,
    getResultSummary,
  };
}