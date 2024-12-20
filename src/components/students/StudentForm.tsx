import React from 'react';
import { Student } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';

interface StudentFormProps {
  student?: Student;
  onSubmit: (data: Omit<Student, 'id'>) => void;
  onCancel: () => void;
}

export default function StudentForm({ student, onSubmit, onCancel }: StudentFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      admissionNumber: formData.get('admissionNumber') as string,
      classId: formData.get('classId') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        name="name"
        defaultValue={student?.name}
        required
        placeholder="Enter student's full name"
      />
      <Input
        label="Admission Number"
        name="admissionNumber"
        defaultValue={student?.admissionNumber}
        required
        placeholder="Enter admission number"
      />
      <Input
        label="Class"
        name="classId"
        defaultValue={student?.classId}
        required
        placeholder="Select class"
      />
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {student ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
}