import React from 'react';
import { Class } from '../../types';

interface ClassSelectorProps {
  selectedClass: string;
  onChange: (classId: string) => void;
}

export default function ClassSelector({ selectedClass, onChange }: ClassSelectorProps) {
  // Mock data - replace with actual data fetching
  const classes: Class[] = [
    { id: '1', name: 'Primary 4A', subjects: [] },
    { id: '2', name: 'Primary 4B', subjects: [] },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Class
      </label>
      <select
        value={selectedClass}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        <option value="">Select a class</option>
        {classes.map(classItem => (
          <option key={classItem.id} value={classItem.id}>
            {classItem.name}
          </option>
        ))}
      </select>
    </div>
  );
}