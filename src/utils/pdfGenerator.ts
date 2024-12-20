import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Score, Student } from '../types';
import { calculateTotalScore, calculateGrade } from './results';
import { format } from 'date-fns';

export function generateResultsPDF(
  student: Student,
  scores: Score[],
  term: number,
  attendance: { present: number; absent: number },
  schoolInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    logo?: string;
  }
) {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text(schoolInfo.name, 105, 20, { align: 'center' });
  doc.setFontSize(14);
  doc.text('STUDENT REPORT CARD', 105, 30, { align: 'center' });
  doc.setFontSize(10);
  doc.text(schoolInfo.address, 105, 40, { align: 'center' });
  doc.text(`Tel: ${schoolInfo.phone} | Email: ${schoolInfo.email}`, 105, 45, { align: 'center' });

  // Student Information
  const studentInfo = [
    ['Student Name:', student.name, 'Admission No:', student.admissionNumber],
    ['Class:', student.classId, 'Term:', `Term ${term}`],
    ['Academic Year:', '2023/2024', 'Date:', format(new Date(), 'dd/MM/yyyy')],
    ['Days Present:', attendance.present.toString(), 'Days Absent:', attendance.absent.toString()]
  ];

  autoTable(doc, {
    body: studentInfo,
    theme: 'plain',
    startY: 55,
    styles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: 'bold' },
      2: { fontStyle: 'bold' }
    }
  });

  // Results Table
  const tableBody = scores.map(score => {
    const totalScore = calculateTotalScore(score);
    const grade = calculateGrade(totalScore);
    
    return [
      score.subjectId,
      score.coursework,
      score.homework,
      score.continuousAssessment,
      score.project,
      score.affective,
      score.psychomotor,
      score.exam,
      totalScore.toFixed(1),
      grade,
      'Good', // Replace with actual remarks
      '1st', // Replace with actual position
      '65', // Replace with actual lowest
      '98', // Replace with actual highest
      '82', // Replace with actual average
    ];
  });

  autoTable(doc, {
    head: [[
      'Subject',
      'CW (10%)',
      'HW (10%)',
      'CA (20%)',
      'Proj (10%)',
      'Aff (5%)',
      'Psy (5%)',
      'Exam (40%)',
      'Total',
      'Grade',
      'Remarks',
      'Pos',
      'Low',
      'High',
      'Avg'
    ]],
    body: tableBody,
    startY: doc.lastAutoTable.finalY + 10,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 0, 128] }
  });

  // Summary
  const totalMarks = scores.reduce((sum, score) => sum + calculateTotalScore(score), 0);
  const average = totalMarks / scores.length;
  const overallGrade = calculateGrade(average);

  const summary = [
    ['Total Marks:', totalMarks.toFixed(1), 'Average:', average.toFixed(1)],
    ['Overall Grade:', overallGrade, 'Position in Class:', '5th out of 45'],
  ];

  autoTable(doc, {
    body: summary,
    theme: 'plain',
    startY: doc.lastAutoTable.finalY + 10,
    styles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: 'bold' },
      2: { fontStyle: 'bold' }
    }
  });

  // Comments Section
  const commentsY = doc.lastAutoTable.finalY + 20;
  doc.setFontSize(10);
  doc.text('Class Teacher\'s Comments:', 14, commentsY);
  doc.line(14, commentsY + 5, 196, commentsY + 5);
  doc.line(14, commentsY + 15, 196, commentsY + 15);

  doc.text('Head Teacher\'s Comments:', 14, commentsY + 25);
  doc.line(14, commentsY + 30, 196, commentsY + 30);
  doc.line(14, commentsY + 40, 196, commentsY + 40);

  // Signatures
  const signatureY = commentsY + 60;
  doc.text('Class Teacher\'s Signature:', 14, signatureY);
  doc.text('_____________________', 14, signatureY + 10);
  
  doc.text('Head Teacher\'s Signature:', 120, signatureY);
  doc.text('_____________________', 120, signatureY + 10);

  // School Stamp
  doc.text('School Stamp', 85, signatureY + 20);
  doc.circle(105, signatureY + 35, 15, 'S');

  // Grading Scale
  const gradeScale = [
    ['A+ (96-100)', 'Outstanding'],
    ['A  (91-95)', 'Excellent'],
    ['A- (86-90)', 'Very Good'],
    ['B+ (81-85)', 'Good'],
    ['B  (76-80)', 'Above Average'],
    ['B- (71-75)', 'Average'],
    ['C+ (66-70)', 'Fair'],
    ['C  (61-65)', 'Below Average'],
    ['C- (56-60)', 'Poor'],
    ['D  (50-55)', 'Very Poor'],
    ['F  (0-49)', 'Fail']
  ];

  autoTable(doc, {
    head: [['Grade Scale', 'Description']],
    body: gradeScale,
    startY: signatureY + 50,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 0, 128] }
  });

  return doc;
}