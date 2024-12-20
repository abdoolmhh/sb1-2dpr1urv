import { useState } from 'react';
import { format } from 'date-fns';
import { Attendance } from '../types';

export function useAttendance() {
  // Mock initial data - replace with API calls
  const [attendanceData, setAttendanceData] = useState<Record<string, Attendance>>({
    [format(new Date(), 'yyyy-MM-dd')]: {
      studentId: '1',
      classId: 'class1',
      term: 1,
      daysPresent: 1,
      daysAbsent: 0,
    },
  });

  const markAttendance = (data: {
    studentIds: string[];
    date: Date;
    status: 'present' | 'absent';
  }) => {
    const dateStr = format(data.date, 'yyyy-MM-dd');
    const newAttendance = { ...attendanceData };

    data.studentIds.forEach(studentId => {
      newAttendance[dateStr] = {
        studentId,
        classId: 'class1', // This should come from selected class
        term: 1, // This should come from selected term
        daysPresent: data.status === 'present' ? 1 : 0,
        daysAbsent: data.status === 'absent' ? 1 : 0,
      };
    });

    setAttendanceData(newAttendance);
  };

  return {
    attendanceData,
    markAttendance,
  };
}