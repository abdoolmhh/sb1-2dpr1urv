import React, { useState } from 'react';
import Table from '../common/Table';
import Button from '../common/Button';
import Input from '../common/Input';
import { Subject } from '../../types';
import { Plus, Search } from 'lucide-react';

interface SubjectListProps {
  onAddSubject: () => void;
  onEditSubject: (subject: Subject) => void;
}

export default function SubjectList({ onAddSubject, onEditSubject }: SubjectListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with actual data fetching
  const subjects: Subject[] = [
    { id: '1', name: 'Mathematics', classId: 'class1' },
    { id: '2', name: 'English', classId: 'class1' },
  ];

  const columns = [
    { header: 'Subject Name', accessor: 'name' },
    { header: 'Class', accessor: 'classId' },
    {
      header: 'Actions',
      accessor: (subject: Subject) => (
        <Button
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onEditSubject(subject);
          }}
        >
          Edit
        </Button>
      ),
      width: '100px',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Input
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
        <Button onClick={onAddSubject}>
          <Plus size={16} className="mr-2" />
          Add Subject
        </Button>
      </div>
      <Table
        data={subjects.filter(subject =>
          subject.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        columns={columns}
        onRowClick={onEditSubject}
      />
    </div>
  );
}