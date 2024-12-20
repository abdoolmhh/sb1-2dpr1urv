import React, { useState } from 'react';
import { format } from 'date-fns';
import AttendanceCalendar from '../components/attendance/AttendanceCalendar';
import AttendanceForm from '../components/attendance/AttendanceForm';
import AttendanceStats from '../components/attendance/AttendanceStats';
import TermSelector from '../components/common/TermSelector';
import { useAttendance } from '../hooks/useAttendance';
import { calculateAttendanceStats } from '../utils/attendance';

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTerm, setSelectedTerm] = useState(1);
  const { attendanceData, markAttendance } = useAttendance();

  const handleAttendanceSubmit = (data: {
    studentIds: string[];
    date: Date;
    status: 'present' | 'absent';
  }) => {
    markAttendance(data);
  };

  // Calculate attendance stats for the current month
  const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const stats = calculateAttendanceStats(startDate, endDate, attendanceData);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
        <div className="w-48">
          <TermSelector
            selectedTerm={selectedTerm}
            onChange={setSelectedTerm}
          />
        </div>
      </div>

      <AttendanceStats {...stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceCalendar
            selectedDate={selectedDate}
            attendanceData={attendanceData}
            onDateSelect={setSelectedDate}
          />
        </div>
        <div>
          <AttendanceForm
            selectedDate={selectedDate}
            onSubmit={handleAttendanceSubmit}
          />
        </div>
      </div>
    </div>
  );
}