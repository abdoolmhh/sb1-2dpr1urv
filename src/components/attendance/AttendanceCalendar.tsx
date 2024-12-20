import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Attendance } from '../../types';

interface AttendanceCalendarProps {
  selectedDate: Date;
  attendanceData: Record<string, Attendance>;
  onDateSelect: (date: Date) => void;
}

export default function AttendanceCalendar({ 
  selectedDate, 
  attendanceData, 
  onDateSelect 
}: AttendanceCalendarProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 flex items-center justify-between border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Calendar size={20} />
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}
        {days.map((day, dayIdx) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const attendance = attendanceData[dateStr];
          const isWeekDay = !isWeekend(day);

          return (
            <button
              key={day.toString()}
              onClick={() => isWeekDay && onDateSelect(day)}
              disabled={!isWeekDay}
              className={`
                h-24 p-2 hover:bg-gray-50 relative bg-white
                ${isWeekDay ? 'cursor-pointer' : 'bg-gray-50 cursor-not-allowed'}
                ${attendance ? 'ring-2 ring-blue-500' : ''}
              `}
            >
              <time dateTime={dateStr} className={`
                text-sm ${isWeekDay ? 'text-gray-900' : 'text-gray-400'}
              `}>
                {format(day, 'd')}
              </time>
              {attendance && (
                <div className="mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                    {attendance.daysPresent} present
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}