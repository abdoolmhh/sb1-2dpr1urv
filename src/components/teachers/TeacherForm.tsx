import React from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import ClassSelector from '../classes/ClassSelector';
import SubjectSelector from '../subjects/SubjectSelector';

interface TeacherFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export default function TeacherForm({ onSubmit, onCancel, initialData }: TeacherFormProps) {
  const [selectedClasses, setSelectedClasses] = React.useState<string[]>(
    initialData?.classes || []
  );
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>(
    initialData?.subjects || []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      employeeId: formData.get('employeeId'),
      classes: selectedClasses,
      subjects: selectedSubjects,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          defaultValue={initialData?.name}
          required
          placeholder="Enter teacher's full name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={initialData?.email}
          required
          placeholder="Enter email address"
        />
        <Input
          label="Phone"
          name="phone"
          defaultValue={initialData?.phone}
          required
          placeholder="Enter phone number"
        />
        <Input
          label="Employee ID"
          name="employeeId"
          defaultValue={initialData?.employeeId}
          required
          placeholder="Enter employee ID"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClassSelector
          selectedClass=""
          onChange={() => {}}
        />
        <SubjectSelector
          selectedSubjects={selectedSubjects}
          onChange={setSelectedSubjects}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Teacher' : 'Add Teacher'}
        </Button>
      </div>
    </form>
  );
}