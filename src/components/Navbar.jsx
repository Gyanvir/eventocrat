import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        setRole(docSnap.data()?.role || null);
      }
    };
    fetchRole();
  }, [currentUser]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow">
      <Link to="/" className="text-xl font-bold text-blue-600 dark:text-white">Eventocrat</Link>

      <div className="space-x-4 text-sm text-gray-800 dark:text-gray-200">
        <Link to="/events" className="hover:text-blue-500">Events</Link>
        <Link to="/companies" className="hover:text-blue-500">Companies</Link>

        {currentUser ? (
          <>
            {role === 'student' && (
              <Link to="/student-dashboard" className="hover:text-blue-500">Dashboard</Link>
            )}
            {role === 'company' && (
              <Link to="/company-dashboard" className="hover:text-blue-500">Dashboard</Link>
            )}
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-500">Login</Link>
            <Link to="/signup" className="hover:text-blue-500">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
