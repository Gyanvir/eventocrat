import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EventForm from './pages/EventForm';
import CompanyForm from './pages/CompanyForm';
import CompanyList from './pages/CompanyList';
import EventList from './pages/EventList';
import ProtectedRoute from './components/ProtectedRoute';

// Example placeholders — create these if not yet created
import StudentDashboard from './pages/StudentDashboard';
import CompanyDashboard from './pages/CompanyDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/list-event"
            element={
              <ProtectedRoute role="student">
                <EventForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-company"
            element={
              <ProtectedRoute role="company">
                <CompanyForm />
              </ProtectedRoute>
            }
          />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/events" element={<EventList />} />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-dashboard"
            element={
              <ProtectedRoute role="company">
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
