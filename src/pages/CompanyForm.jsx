import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Navbar from '../components/Navbar';

function CompanyForm() {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !industry || !minBudget || !maxBudget || !email) {
      return alert('Please fill all fields');
    }

    try {
      await addDoc(collection(db, 'companies'), {
        name,
        industry,
        budgetRange: {
          min: Number(minBudget),
          max: Number(maxBudget),
        },
        contactEmail: email,
        createdAt: Timestamp.now(),
      });
      alert('Company profile submitted!');
      setName('');
      setIndustry('');
      setMinBudget('');
      setMaxBudget('');
      setEmail('');
    } catch (err) {
      console.error('Error adding company:', err);
      alert('Submission failed');
    }
  };

  return (
    <>
    <Navbar />
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Submit Your Company Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Company Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Industry"
          className="w-full p-2 border rounded"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum Budget (INR)"
          className="w-full p-2 border rounded"
          value={minBudget}
          onChange={(e) => setMinBudget(e.target.value)}
        />
        <input
          type="number"
          placeholder="Maximum Budget (INR)"
          className="w-full p-2 border rounded"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
        />
        <input
          type="email"
          placeholder="Contact Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
    </>
  );
}

export default CompanyForm;
