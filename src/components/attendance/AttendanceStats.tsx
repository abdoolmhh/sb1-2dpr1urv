import React from 'react';
import { BarChart3, Users, UserCheck, UserX } from 'lucide-react';

interface AttendanceStatsProps {
  totalDays: number;
  daysPresent: number;
  daysAbsent: number;
}

export default function AttendanceStats({
  totalDays,
  daysPresent,
  daysAbsent,
}: AttendanceStatsProps) {
  const attendancePercentage = totalDays > 0
    ? Math.round((daysPresent / totalDays) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total School Days</p>
            <p className="text-2xl font-semibold">{totalDays}</p>
          </div>
          <Users className="text-blue-500" size={24} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Days Present</p>
            <p className="text-2xl font-semibold">{daysPresent}</p>
          </div>
          <UserCheck className="text-green-500" size={24} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Days Absent</p>
            <p className="text-2xl font-semibold">{daysAbsent}</p>
          </div>
          <UserX className="text-red-500" size={24} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Attendance Rate</p>
            <p className="text-2xl font-semibold">{attendancePercentage}%</p>
          </div>
          <BarChart3 className="text-purple-500" size={24} />
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 rounded-full"
            style={{ width: `${attendancePercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}