import React, { useState } from 'react';
import ClassList from '../components/classes/ClassList';
import ClassForm from '../components/classes/ClassForm';
import { Class } from '../types';

export default function ClassesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | undefined>();

  const handleAddClass = () => {
    setSelectedClass(undefined);
    setIsFormOpen(true);
  };

  const handleEditClass = (classItem: Class) => {
    setSelectedClass(classItem);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: Omit<Class, 'id'>) => {
    // TODO: Implement actual API call
    console.log('Submit class data:', data);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">
            {selectedClass ? 'Edit Class' : 'Add New Class'}
          </h2>
          <ClassForm
            classItem={selectedClass}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      ) : (
        <ClassList
          onAddClass={handleAddClass}
          onEditClass={handleEditClass}
        />
      )}
    </div>
  );
}