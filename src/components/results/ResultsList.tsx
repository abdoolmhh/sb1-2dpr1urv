import React, { useState } from 'react';
import Table from '../common/Table';
import Button from '../common/Button';
import Input from '../common/Input';
import { Score } from '../../types';
import { Plus, Search, FileSpreadsheet } from 'lucide-react';
import { calculateTotalScore, calculateGrade } from '../../utils/results';

interface ResultsListProps {
  onAddResult: () => void;
  onEditResult: (result: Score) => void;
}

export default function ResultsList({ onAddResult, onEditResult }: ResultsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with actual data fetching
  const results: Score[] = [
    {
      studentId: '1',
      subjectId: 'MATH',
      term: 1,
      coursework: 85,
      homework: 90,
      continuousAssessment: 88,
      project: 92,
      affective: 95,
      psychomotor: 90,
      exam: 87,
    },
  ];

  const columns = [
    { header: 'Student', accessor: 'studentId' },
    { header: 'Subject', accessor: 'subjectId' },
    { 
      header: 'Total Score', 
      accessor: (result: Score) => calculateTotalScore(result).toFixed(1)
    },
    { 
      header: 'Grade', 
      accessor: (result: Score) => calculateGrade(calculateTotalScore(result))
    },
    {
      header: 'Actions',
      accessor: (result: Score) => (
        <Button
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onEditResult(result);
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
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Input
              placeholder="Search results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
          <Button variant="secondary">
            <FileSpreadsheet size={16} className="mr-2" />
            Export
          </Button>
        </div>
        <Button onClick={onAddResult}>
          <Plus size={16} className="mr-2" />
          Add Result
        </Button>
      </div>
      <Table
        data={results}
        columns={columns}
        onRowClick={onEditResult}
      />
    </div>
  );
}