import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProtectedRoute = ({ children, role: requiredRole }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);
      const userRole = docSnap.data()?.role;

      setHasAccess(requiredRole ? userRole === requiredRole : true);
      setLoading(false);
    };

    checkRole();
  }, [currentUser, requiredRole]);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (loading) return <div className="p-6">🔐 Checking access...</div>;
  if (!hasAccess) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
