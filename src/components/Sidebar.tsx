import React from 'react';
import { 
  Users, BookOpen, GraduationCap, ClipboardCheck, 
  FileSpreadsheet, FileText, Menu 
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: <Users size={20} />, label: 'Students', value: 'students' },
    { icon: <BookOpen size={20} />, label: 'Classes', value: 'classes' },
    { icon: <GraduationCap size={20} />, label: 'Subjects', value: 'subjects' },
    { icon: <ClipboardCheck size={20} />, label: 'Attendance', value: 'attendance' },
    { icon: <FileSpreadsheet size={20} />, label: 'Results', value: 'results' },
    { icon: <FileText size={20} />, label: 'Reports', value: 'reports' },
  ];

  return (
    <div className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && <h2 className="text-xl font-bold">Admin Panel</h2>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-700 rounded"
        >
          <Menu size={20} />
        </button>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onNavigate(item.value)}
            className={`w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-colors ${
              currentPage === item.value ? 'bg-gray-700' : ''
            }`}
          >
            {item.icon}
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}