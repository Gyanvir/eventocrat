// src/pages/CompanyList.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import Navbar from '../components/Navbar';
import { sendEmail } from '../lib/email';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [pitchMap, setPitchMap] = useState({});
  const [userRole, setUserRole] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const snapshot = await getDocs(collection(db, 'companies'));
      const companyList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompanies(companyList);
    };

    const fetchFirstEvent = async () => {
      const snapshot = await getDocs(collection(db, 'events'));
      const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(events);
      setSelectedEvent(events[0]); // Use first event
    };

    const checkUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setUserRole(userDoc.data()?.role);
      }
    };

    fetchCompanies();
    fetchFirstEvent();
    checkUserRole();
  }, []);

  const handleSendProposal = async (company) => {
    if (!selectedEvent || !auth.currentUser) {
      alert("Login and create an event first.");
      return;
    }
    const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));;
    const userDetails = docSnap.data();
    console.log('hello')
    console.log(company)


    try {
      const res = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: selectedEvent,
          company,
          senderType: "student",
          userDetails: {
            name: userDetails?.name,
            title: userDetails?.title,
            organization: userDetails?.organization
          }
        }),
      });
      console.log(res.json())
      const data = await res.json();
      const pitch = data.pitch || "Error generating pitch.";
      setPitchMap((prev) => ({ ...prev, [company.id]: pitch }));

      await sendEmail({
        to: company.contactEmail,
        subject: `Sponsorship Opportunity: ${selectedEvent.title}`,
        text: pitch,
        fromName: auth.currentUser.email,
        replyTo: auth.currentUser.email,
      });

      alert("Proposal sent via email!");
    } catch (err) {
      console.error(err);
      alert("Failed to send proposal.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sponsor Companies</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {companies.map(company => (
          <div key={company.id} className="border rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold">{company.name}</h3>
            <p><strong>Industry:</strong> {company.industry}</p>
            <p><strong>Budget:</strong> ₹{company.budgetRange.min} - ₹{company.budgetRange.max}</p>

            {userRole === 'student' && (
              <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => handleSendProposal(company)}
              >
                📩 Send Proposal
              </button>
            )}

            {pitchMap[company.id] && (
              <div className="mt-4 p-3 border-t text-sm text-gray-800 whitespace-pre-wrap">
                <strong>Result:</strong><br />
                {pitchMap[company.id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
