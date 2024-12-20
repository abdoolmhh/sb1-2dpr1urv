import React, { useState, useEffect } from 'react';
import { User } from '../../types/auth';
import { 
  BookOpen, ClipboardCheck, FileSpreadsheet, 
  Calendar, Bell, Users, CheckCircle2, AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getTeacherClasses, getClassSubjects, getStudentsByClass } from '../../lib/db/queries';
import Button from '../common/Button';

interface TeacherDashboardProps {
  user: User;
}

export default function TeacherDashboard({ user }: TeacherDashboardProps) {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [students, setStudents] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeacherData = async () => {
      try {
        const teacherClasses = await getTeacherClasses(user.id);
        setClasses(teacherClasses);
        
        if (teacherClasses.length > 0) {
          setSelectedClass(teacherClasses[0].id);
          const classStudents = await getStudentsByClass(teacherClasses[0].id);
          const classSubjects = await getClassSubjects(teacherClasses[0].id);
          setStudents(classStudents);
          setSubjects(classSubjects);
        }
      } catch (error) {
        console.error('Error loading teacher data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeacherData();
  }, [user.id]);

  // Mock data for visualization
  const attendanceData = [
    { date: 'Mon', present: 25, absent: 2 },
    { date: 'Tue', present: 24, absent: 3 },
    { date: 'Wed', present: 26, absent: 1 },
    { date: 'Thu', present: 23, absent: 4 },
    { date: 'Fri', present: 25, absent: 2 },
  ];

  const tasks = [
    { id: 1, title: 'Mark Mathematics Test Papers', due: '2024-02-20', status: 'pending' },
    { id: 2, title: 'Submit Weekly Lesson Plan', due: '2024-02-21', status: 'completed' },
    { id: 3, title: 'Parent-Teacher Meeting', due: '2024-02-22', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          You have {classes.length} classes and {subjects.length} subjects assigned.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <QuickStatCard
          title="Total Students"
          value={students.length.toString()}
          icon={<Users className="text-blue-500" size={24} />}
          trend="+2 new this week"
        />
        <QuickStatCard
          title="Classes Today"
          value={classes.length.toString()}
          icon={<BookOpen className="text-green-500" size={24} />}
          trend="All scheduled"
        />
        <QuickStatCard
          title="Pending Tasks"
          value={tasks.filter(t => t.status === 'pending').length.toString()}
          icon={<ClipboardCheck className="text-purple-500" size={24} />}
          trend="2 due today"
        />
        <QuickStatCard
          title="Upcoming Tests"
          value="3"
          icon={<FileSpreadsheet className="text-orange-500" size={24} />}
          trend="Next: Mathematics"
        />
      </div>

      {/* Class Selection and Weekly Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Weekly Attendance Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#4F46E5" name="Present" />
                <Bar dataKey="absent" fill="#EF4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="text-green-500" size={20} />
                  ) : (
                    <AlertCircle className="text-orange-500" size={20} />
                  )}
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">Due: {task.due}</p>
                  </div>
                </div>
                <Button
                  variant={task.status === 'completed' ? 'secondary' : 'primary'}
                  className="text-sm"
                >
                  {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell size={20} />
          Recent Activities
        </h2>
        <div className="space-y-4">
          <ActivityItem
            icon={<FileSpreadsheet size={16} />}
            title="Test Results Updated"
            description="Mathematics Class 1A test results have been uploaded"
            time="2 hours ago"
          />
          <ActivityItem
            icon={<ClipboardCheck size={16} />}
            title="Attendance Marked"
            description="Class 1B attendance has been marked for today"
            time="3 hours ago"
          />
          <ActivityItem
            icon={<Calendar size={16} />}
            title="Parent Meeting Scheduled"
            description="Meeting with John Doe's parents scheduled for tomorrow"
            time="5 hours ago"
          />
        </div>
      </div>
    </div>
  );
}

function QuickStatCard({ title, value, icon, trend }: {
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

function ActivityItem({ icon, title, description, time }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
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