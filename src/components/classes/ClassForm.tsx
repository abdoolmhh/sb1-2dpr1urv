import React from 'react';
import { Class } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';
import SubjectSelector from '../subjects/SubjectSelector';

interface ClassFormProps {
  classItem?: Class;
  onSubmit: (data: Omit<Class, 'id'>) => void;
  onCancel: () => void;
}

export default function ClassForm({ classItem, onSubmit, onCancel }: ClassFormProps) {
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>(
    classItem?.subjects || []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      subjects: selectedSubjects,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Class Name"
        name="name"
        defaultValue={classItem?.name}
        required
        placeholder="Enter class name"
      />
      <SubjectSelector
        selectedSubjects={selectedSubjects}
        onChange={setSelectedSubjects}
      />
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {classItem ? 'Update Class' : 'Add Class'}
        </Button>
      </div>
    </form>
  );
}