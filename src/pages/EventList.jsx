// src/pages/EventList.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { generatePitch } from '../lib/gemini';
import { sendEmail } from '../lib/email';

function EventList() {
  const [events, setEvents] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loadingPitch, setLoadingPitch] = useState(false);
  const [generatedPitches, setGeneratedPitches] = useState({});
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, 'events'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(data);
    };

    const checkCompany = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.data()?.role;
        setUserRole(role);

        if (role === "company") {
          const snap = await getDocs(collection(db, 'companies'));
          const match = snap.docs.map(doc => doc.data()).find(c => c.email === user.email);
          setCompanyInfo(match);
        }
      }
    };

    fetchEvents();
    checkCompany();
  }, []);

  const handleSendProposal = async (event) => {
    if (!companyInfo || !auth.currentUser) {
      alert("Login as a company to send proposals.");
      return;
    }

    setLoadingPitch(true);
    const pitch = await generatePitch(event, companyInfo, "company");
    setGeneratedPitches((prev) => ({ ...prev, [event.id]: pitch }));
    setLoadingPitch(false);

    try {
      await sendEmail({
        to: event.contactEmail || event.email,
        subject: `Sponsorship Offer: ${companyInfo.name} x ${event.title}`,
        text: pitch,
        fromName: companyInfo.name,
        replyTo: companyInfo.email,
      });
      alert("Proposal email sent!");
    } catch (err) {
      console.error("Email error:", err);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Listed Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-green-700">{event.title}</h3>
            <p className="text-sm text-gray-600 mt-1 mb-2">{event.description}</p>
            <p className="text-sm font-medium mb-3">
              Expected Sponsorship: ₹{event.expectedSponsorshipAmount?.toLocaleString()}
            </p>

            {userRole === 'company' && (
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
                onClick={() => handleSendProposal(event)}
              >
                📩 Send Proposal to Event
              </button>
            )}

            {loadingPitch ? (
              <p className="text-sm italic mt-2">Generating pitch...</p>
            ) : (
              generatedPitches[event.id] && (
                <div className="bg-gray-100 p-3 text-sm mt-2 rounded border text-gray-800 whitespace-pre-wrap">
                  <strong>Generated Proposal:</strong><br />
                  {generatedPitches[event.id]}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
