import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, GraduationCap, ClipboardCheck, 
  FileSpreadsheet, TrendingUp, Bell, UserPlus, Settings
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../common/Button';
import { getTeachers } from '../../lib/db/queries';

export default function AdminDashboard() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const teachersList = await getTeachers();
        setTeachers(teachersList);
      } catch (error) {
        console.error('Error loading teachers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  }, []);

  const mockAttendanceData = [
    { name: 'Class 1A', attendance: 95 },
    { name: 'Class 1B', attendance: 88 },
    { name: 'Class 2A', attendance: 92 },
    { name: 'Class 2B', attendance: 85 },
  ];

  const mockPerformanceData = [
    { name: 'Mathematics', average: 78 },
    { name: 'English', average: 82 },
    { name: 'Science', average: 75 },
    { name: 'Social Studies', average: 85 },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <UserPlus size={20} />
          Add New Teacher
        </Button>
        <Button variant="secondary" className="flex items-center gap-2">
          <Settings size={20} />
          System Settings
        </Button>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Teachers"
          value={teachers.length.toString()}
          icon={<Users className="text-blue-500" size={24} />}
          trend="+2 this month"
        />
        <StatCard
          title="Total Classes"
          value="12"
          icon={<BookOpen className="text-green-500" size={24} />}
          trend="2 new classes"
        />
        <StatCard
          title="Average Attendance"
          value="92%"
          icon={<ClipboardCheck className="text-purple-500" size={24} />}
          trend="+5% this week"
        />
        <StatCard
          title="Overall Performance"
          value="B+"
          icon={<GraduationCap className="text-orange-500" size={24} />}
          trend="Improved from B"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Class Attendance Overview"
          data={mockAttendanceData}
          dataKey="attendance"
          color="#4F46E5"
        />
        <ChartCard
          title="Subject Performance Overview"
          data={mockPerformanceData}
          dataKey="average"
          color="#10B981"
        />
      </div>

      {/* Teacher List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users size={20} />
          Active Teachers
        </h2>
        <div className="space-y-4">
          {teachers.map((teacher, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {teacher.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{teacher.name}</h3>
                  <p className="text-sm text-gray-500">
                    {teacher.subjects.join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" className="text-sm">
                  View Details
                </Button>
                <Button variant="secondary" className="text-sm">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell size={20} />
          System Activities
        </h2>
        <div className="space-y-4">
          <ActivityItem
            title="New Teacher Added"
            description="John Smith has been added as Mathematics teacher"
            time="2 hours ago"
            icon={<UserPlus size={16} />}
          />
          <ActivityItem
            title="Class Assignment Updated"
            description="Physics class reassigned to Sarah Johnson"
            time="3 hours ago"
            icon={<BookOpen size={16} />}
          />
          <ActivityItem
            title="System Update"
            description="Attendance module has been updated"
            time="5 hours ago"
            icon={<Settings size={16} />}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        {icon}
      </div>
      <p className="text-sm text-gray-500 mt-2">{trend}</p>
    </div>
  );
}

function ChartCard({ title, data, dataKey, color }: {
  title: string;
  data: any[];
  dataKey: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ActivityItem({ title, description, time, icon }: {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="p-2 bg-gray-100 rounded-full">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}