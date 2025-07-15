import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Navbar from '../components/Navbar';

function EventForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [contactEmail, setContactEmail] = useState(''); // New state
  const [estimatedAttendees, setEstimatedAttendees] = useState('');
  const [contactDate, setContactDate] = useState('');
  const [contactLocation, setContactLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !amount ||
      !contactPersonName ||
      !contactEmail || // Validate email
      !estimatedAttendees ||
      !contactDate ||
      !contactLocation
    ) {
      alert('Please fill all fields');
      return;
    }

    try {
      await addDoc(collection(db, 'events'), {
        title,
        description,
        expectedSponsorshipAmount: Number(amount),
        contactPersonName,
        contactEmail, // Add email to Firestore
        estimatedAttendees: Number(estimatedAttendees),
        contactDate,
        contactLocation,
        datePosted: Timestamp.now(),
      });

      alert('Event submitted!');
      // Reset all fields
      setTitle('');
      setDescription('');
      setAmount('');
      setContactPersonName('');
      setContactEmail('');
      setEstimatedAttendees('');
      setContactDate('');
      setContactLocation('');
    } catch (err) {
      console.error('Error adding event:', err);
      alert('Submission failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Post a New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Event Description"
            className="w-full p-2 border rounded"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Expected Sponsorship Amount (INR)"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Contact Person Name"
            className="w-full p-2 border rounded"
            value={contactPersonName}
            onChange={(e) => setContactPersonName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Contact Email"
            className="w-full p-2 border rounded"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Estimated Attendees"
            className="w-full p-2 border rounded"
            value={estimatedAttendees}
            onChange={(e) => setEstimatedAttendees(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={contactDate}
            onChange={(e) => setContactDate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full p-2 border rounded"
            value={contactLocation}
            onChange={(e) => setContactLocation(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default EventForm;
