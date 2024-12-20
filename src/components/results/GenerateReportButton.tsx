import React from 'react';
import { Button } from '../common/Button';
import { FileDown } from 'lucide-react';
import { generateResultsPDF } from '../../utils/pdfGenerator';
import { Student, Score } from '../../types';

interface GenerateReportButtonProps {
  student: Student;
  scores: Score[];
  term: number;
  attendance: { present: number; absent: number };
}

export default function GenerateReportButton({
  student,
  scores,
  term,
  attendance
}: GenerateReportButtonProps) {
  const handleGenerateReport = () => {
    const schoolInfo = {
      name: 'NOBLE PATHS ACADEMY',
      address: 'No. 15 Palace Way Jalingo, Taraba State',
      phone: '08167423277',
      email: 'Noblepathsacademy@gmail.com'
    };

    const doc = generateResultsPDF(student, scores, term, attendance, schoolInfo);
    doc.save(`${student.name}_Term${term}_Report.pdf`);
  };

  return (
    <Button
      onClick={handleGenerateReport}
      className="flex items-center gap-2"
    >
      <FileDown size={16} />
      Generate Report
    </Button>
  );
}