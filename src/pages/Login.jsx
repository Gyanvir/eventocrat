import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const role = docSnap.data()?.role;

    if (role === "student") navigate("/student-dashboard");
    else if (role === "company") navigate("/company-dashboard");
    else navigate("/");

  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};

  return (
    <><Navbar />
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded dark:bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded dark:bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
    </>
  );
};

export default Login;
