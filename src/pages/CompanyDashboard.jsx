// src/pages/CompanyDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EventList from './EventList';

const CompanyDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-6 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Dashboard Header */}
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            🏢 Company Dashboard
          </h1>

          {/* Button to list company sponsorship interest */}
          <button
            className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
            onClick={() => navigate('/list-company')}
          >
            List Sponsorship Interest
          </button>

          {/* Section for available events */}
          <h2 className="text-2xl font-semibold mt-6 mb-3">
            📬 Available Events to Sponsor ( Please List Sponsorship Interest before trying to send Proposal)
          </h2>

          {/* Event list component (filtered for company role) */}
          <EventList showSendProposal={true} userRole="company" />
        </div>
      </div>
    </>
  );
};

export default CompanyDashboard;
