import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            School Management System
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings size={20} />
            </button>
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}