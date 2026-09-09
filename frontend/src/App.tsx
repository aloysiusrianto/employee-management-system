import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeList from './EmployeeList';
import DetailModal from './DetailModal';
import ApiDocumentation from './ApiDocumentation';
import type { Employee } from './types';

export default function App() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 bg-primary-500 rounded-lg p-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                  <path d="M12 2C8.13 2 5 5.13 5 9v14c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7zm0 14c-2.67 0-4.75-1.76-6-4h12c-1.25 2.24-3.33 4-6 4z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  EMS Maspion
                </h1>
                <p className="text-xs text-gray-500 leading-tight">
                  Employee Management System
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center -space-x-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <Users className="w-4 h-4" />
                Employee List
              </NavLink>
              <NavLink
                to="/api-documentation"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <FileText className="w-4 h-4" />
                API Docs
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <EmployeeList
                onCreate={() => {}}
                onUpdate={() => {}}
                onDelete={() => {}}
                onView={(emp) => setSelectedEmployee(emp)}
              />
            }
          />
          <Route path="/api-documentation" element={<ApiDocumentation />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2026 Maspion Group. Employee Management System.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <RefreshCw className="w-4 h-4" />
            <span>Rock-solid &mdash; TypeScript + React + Tailwind</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedEmployee && (
        <DetailModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}

import { Users, FileText, RefreshCw } from 'lucide-react';
import { NavLink } from 'react-router-dom';
