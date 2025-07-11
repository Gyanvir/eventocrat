import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Navbar from '../components/Navbar';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // default

  const [error, setError] = useState('');
  const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       navigate('/');
//     } catch (err) {
//       setError(err.message);
//     }
//   };
    const handleSignup = async (e) => {
      e.preventDefault();
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log("Signed up:", user.uid, role);
    
    // Store role in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role,
    });

    console.log("User role stored in Firestore.");
    navigate("/"); // or /dashboard
  } catch (err) {
    console.error(err);
    alert("Signup failed: " + err.message);
  }
};

  return (
    <>
    <Navbar />
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
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
        <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded p-2 w-full mt-2"
        >
            <option value="student">Student / Society</option>
            <option value="company">Company</option>
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
      </form>
    </div>
    </>
  );
};

export default Signup;
