import React, { useState } from 'react';
import SubjectList from '../components/subjects/SubjectList';
import SubjectForm from '../components/subjects/SubjectForm';
import { Subject } from '../types';

export default function SubjectsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | undefined>();

  const handleAddSubject = () => {
    setSelectedSubject(undefined);
    setIsFormOpen(true);
  };

  const handleEditSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: Omit<Subject, 'id'>) => {
    // TODO: Implement actual API call
    console.log('Submit subject data:', data);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">
            {selectedSubject ? 'Edit Subject' : 'Add New Subject'}
          </h2>
          <SubjectForm
            subject={selectedSubject}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      ) : (
        <SubjectList
          onAddSubject={handleAddSubject}
          onEditSubject={handleEditSubject}
        />
      )}
    </div>
  );
}