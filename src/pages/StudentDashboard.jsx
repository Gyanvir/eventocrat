// src/pages/StudentDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyList from './CompanyList';
import Navbar from '../components/Navbar'; // ✅ include navbar here

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar /> {/* ✅ Put Navbar at top */}
      <div className="min-h-screen p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-6">🎓 Student Dashboard</h1>

        <div className="mb-4 space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate('/list-event')}
          >
            List New Event
          </button>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">Interested Companies</h2>
        <CompanyList showSendProposal={true} userRole="student" />
      </div>
    </>
  );
};

export default StudentDashboard;
