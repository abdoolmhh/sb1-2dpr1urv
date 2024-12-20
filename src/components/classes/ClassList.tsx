import React, { useState } from 'react';
import Table from '../common/Table';
import Button from '../common/Button';
import Input from '../common/Input';
import { Class } from '../../types';
import { Plus, Search } from 'lucide-react';

interface ClassListProps {
  onAddClass: () => void;
  onEditClass: (classItem: Class) => void;
}

export default function ClassList({ onAddClass, onEditClass }: ClassListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with actual data fetching
  const classes: Class[] = [
    { id: '1', name: 'Primary 4A', subjects: ['MATH', 'ENG'] },
    { id: '2', name: 'Primary 4B', subjects: ['MATH', 'ENG'] },
  ];

  const columns = [
    { header: 'Class Name', accessor: 'name' },
    { 
      header: 'Subjects', 
      accessor: (classItem: Class) => classItem.subjects.join(', ') 
    },
    {
      header: 'Actions',
      accessor: (classItem: Class) => (
        <Button
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onEditClass(classItem);
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
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
        <Button onClick={onAddClass}>
          <Plus size={16} className="mr-2" />
          Add Class
        </Button>
      </div>
      <Table
        data={classes.filter(classItem =>
          classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        columns={columns}
        onRowClick={onEditClass}
      />
    </div>
  );
}