import React, { useState } from 'react';
import Table from '../common/Table';
import Button from '../common/Button';
import Input from '../common/Input';
import { Student } from '../../types';
import { Plus, Search } from 'lucide-react';

interface StudentListProps {
  onAddStudent: () => void;
  onEditStudent: (student: Student) => void;
}

export default function StudentList({ onAddStudent, onEditStudent }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with actual data fetching
  const students: Student[] = [
    { id: '1', name: 'John Doe', classId: 'class1', admissionNumber: 'A001' },
    { id: '2', name: 'Jane Smith', classId: 'class1', admissionNumber: 'A002' },
  ];

  const columns = [
    { header: 'Admission No.', accessor: 'admissionNumber' },
    { header: 'Name', accessor: 'name' },
    { header: 'Class', accessor: 'classId' },
    {
      header: 'Actions',
      accessor: (student: Student) => (
        <Button
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onEditStudent(student);
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
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search
            className="absolute left-3 top-2.5 text-gray-400"
            size={16}
          />
        </div>
        <Button onClick={onAddStudent}>
          <Plus size={16} className="mr-2" />
          Add Student
        </Button>
      </div>
      <Table
        data={students.filter(student =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        columns={columns}
        onRowClick={onEditStudent}
      />
    </div>
  );
}