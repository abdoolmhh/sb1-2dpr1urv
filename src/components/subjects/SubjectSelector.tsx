import React from 'react';
import { Subject } from '../../types';

interface SubjectSelectorProps {
  selectedSubjects: string[];
  onChange: (subjects: string[]) => void;
}

export default function SubjectSelector({ selectedSubjects, onChange }: SubjectSelectorProps) {
  // Mock data - replace with actual data fetching
  const subjects: Subject[] = [
    { id: '1', name: 'Mathematics', classId: 'class1' },
    { id: '2', name: 'English', classId: 'class1' },
    { id: '3', name: 'Science', classId: 'class1' },
  ];

  const handleChange = (subjectId: string) => {
    const newSelection = selectedSubjects.includes(subjectId)
      ? selectedSubjects.filter(id => id !== subjectId)
      : [...selectedSubjects, subjectId];
    onChange(newSelection);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Subjects
      </label>
      <div className="space-y-2">
        {subjects.map(subject => (
          <label key={subject.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedSubjects.includes(subject.id)}
              onChange={() => handleChange(subject.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{subject.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}