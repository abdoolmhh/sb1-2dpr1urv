import React, { useState } from 'react';
import StudentList from '../components/students/StudentList';
import StudentForm from '../components/students/StudentForm';
import { Student } from '../types';

export default function StudentsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();

  const handleAddStudent = () => {
    setSelectedStudent(undefined);
    setIsFormOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: Omit<Student, 'id'>) => {
    // TODO: Implement actual API call
    console.log('Submit student data:', data);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">
            {selectedStudent ? 'Edit Student' : 'Add New Student'}
          </h2>
          <StudentForm
            student={selectedStudent}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      ) : (
        <StudentList
          onAddStudent={handleAddStudent}
          onEditStudent={handleEditStudent}
        />
      )}
    </div>
  );
}