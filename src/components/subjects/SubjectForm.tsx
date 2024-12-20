import React from 'react';
import { Subject } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';
import ClassSelector from '../classes/ClassSelector';

interface SubjectFormProps {
  subject?: Subject;
  onSubmit: (data: Omit<Subject, 'id'>) => void;
  onCancel: () => void;
}

export default function SubjectForm({ subject, onSubmit, onCancel }: SubjectFormProps) {
  const [selectedClass, setSelectedClass] = React.useState<string>(
    subject?.classId || ''
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      classId: selectedClass,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Subject Name"
        name="name"
        defaultValue={subject?.name}
        required
        placeholder="Enter subject name"
      />
      <ClassSelector
        selectedClass={selectedClass}
        onChange={setSelectedClass}
      />
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {subject ? 'Update Subject' : 'Add Subject'}
        </Button>
      </div>
    </form>
  );
}