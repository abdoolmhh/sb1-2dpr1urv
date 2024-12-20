import { format, isWeekend, differenceInDays } from 'date-fns';
import { Attendance } from '../types';

export function calculateAttendanceStats(
  startDate: Date,
  endDate: Date,
  attendanceData: Record<string, Attendance>
) {
  const totalDays = differenceInDays(endDate, startDate) + 1;
  let schoolDays = 0;
  let daysPresent = 0;

  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    if (!isWeekend(currentDate)) {
      schoolDays++;
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      if (attendanceData[dateStr]?.daysPresent > 0) {
        daysPresent++;
      }
    }
  }

  const daysAbsent = schoolDays - daysPresent;
  const attendancePercentage = schoolDays > 0
    ? (daysPresent / schoolDays) * 100
    : 0;

  return {
    totalDays: schoolDays,
    daysPresent,
    daysAbsent,
    attendancePercentage,
  };
}