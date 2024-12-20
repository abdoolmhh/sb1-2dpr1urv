import React, { useState } from 'react';
import Button from '../common/Button';
import ClassSelector from '../classes/ClassSelector';
import { Users } from 'lucide-react';

interface AttendanceFormProps {
  onSubmit: (data: { 
    studentIds: string[],
    date: Date,
    status: 'present' | 'absent'
  }) => void;
  selectedDate: Date;
}

export default function AttendanceForm({ onSubmit, selectedDate }: AttendanceFormProps) {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  // Mock data - replace with actual data fetching
  const students = [
    { id: '1', name: 'John Doe', classId: 'class1', admissionNumber: 'A001' },
    { id: '2', name: 'Jane Smith', classId: 'class1', admissionNumber: 'A002' },
  ];

  const handleSubmit = (status: 'present' | 'absent') => {
    onSubmit({
      studentIds: selectedStudents,
      date: selectedDate,
      status
    });
    // Reset selections after submission
    setSelectedStudents([]);
  };

  return (
    <div className="space-y-6 bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
        <Users size={24} />
        <h2>Mark Attendance</h2>
      </div>

      <ClassSelector
        selectedClass={selectedClass}
        onChange={setSelectedClass}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Select Students
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {students
            .filter(student => !selectedClass || student.classId === selectedClass)
            .map(student => (
              <label key={student.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={(e) => {
                    setSelectedStudents(
                      e.target.checked
                        ? [...selectedStudents, student.id]
                        : selectedStudents.filter(id => id !== student.id)
                    );
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {student.name} ({student.admissionNumber})
                </span>
              </label>
            ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          variant="danger"
          onClick={() => handleSubmit('absent')}
          disabled={selectedStudents.length === 0}
        >
          Mark Absent
        </Button>
        <Button
          onClick={() => handleSubmit('present')}
          disabled={selectedStudents.length === 0}
        >
          Mark Present
        </Button>
      </div>
    </div>
  );
}