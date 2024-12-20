import React, { useState } from 'react';
import { Score } from '../../types';
import Button from '../common/Button';
import ClassSelector from '../classes/ClassSelector';
import SubjectSelector from '../subjects/SubjectSelector';
import ScoreInput from './ScoreInput';
import { calculateTotalScore, calculateGrade } from '../../utils/results';
import { GraduationCap } from 'lucide-react';

interface ResultFormProps {
  score?: Score;
  onSubmit: (data: Omit<Score, 'studentId'>) => void;
  onCancel: () => void;
}

export default function ResultForm({ score, onSubmit, onCancel }: ResultFormProps) {
  const [selectedClass, setSelectedClass] = useState(score?.classId || '');
  const [selectedSubject, setSelectedSubject] = useState(score?.subjectId || '');
  const [scores, setScores] = useState({
    coursework: score?.coursework || 0,
    homework: score?.homework || 0,
    continuousAssessment: score?.continuousAssessment || 0,
    project: score?.project || 0,
    affective: score?.affective || 0,
    psychomotor: score?.psychomotor || 0,
    exam: score?.exam || 0,
  });

  const totalScore = calculateTotalScore(scores);
  const grade = calculateGrade(totalScore);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...scores,
      subjectId: selectedSubject,
      term: 1, // TODO: Make this dynamic
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
        <GraduationCap size={24} />
        <h2>Enter Student Scores</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClassSelector
          selectedClass={selectedClass}
          onChange={setSelectedClass}
        />
        <SubjectSelector
          selectedSubjects={[selectedSubject]}
          onChange={(subjects) => setSelectedSubject(subjects[0])}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreInput
          label="Coursework"
          value={scores.coursework}
          maxScore={100}
          weight={10}
          onChange={(value) => setScores({ ...scores, coursework: value })}
        />
        <ScoreInput
          label="Homework"
          value={scores.homework}
          maxScore={100}
          weight={10}
          onChange={(value) => setScores({ ...scores, homework: value })}
        />
        <ScoreInput
          label="Continuous Assessment"
          value={scores.continuousAssessment}
          maxScore={100}
          weight={20}
          onChange={(value) => setScores({ ...scores, continuousAssessment: value })}
        />
        <ScoreInput
          label="Project"
          value={scores.project}
          maxScore={100}
          weight={10}
          onChange={(value) => setScores({ ...scores, project: value })}
        />
        <ScoreInput
          label="Affective"
          value={scores.affective}
          maxScore={100}
          weight={5}
          onChange={(value) => setScores({ ...scores, affective: value })}
        />
        <ScoreInput
          label="Psychomotor"
          value={scores.psychomotor}
          maxScore={100}
          weight={5}
          onChange={(value) => setScores({ ...scores, psychomotor: value })}
        />
        <ScoreInput
          label="Exam"
          value={scores.exam}
          maxScore={100}
          weight={40}
          onChange={(value) => setScores({ ...scores, exam: value })}
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Score</p>
            <p className="text-3xl font-bold text-gray-900">{totalScore.toFixed(1)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">Grade</p>
            <p className="text-3xl font-bold text-gray-900">{grade}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Results
        </Button>
      </div>
    </form>
  );
}