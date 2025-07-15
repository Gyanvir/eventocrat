import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { generatePitch } from '../lib/gemini';
import { sendEmail } from '../lib/email';

function EventList() {
  const [events, setEvents] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loadingPitchId, setLoadingPitchId] = useState(null);
  const [generatedPitches, setGeneratedPitches] = useState({});
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all events
        const eventSnapshot = await getDocs(collection(db, 'events'));
        const eventsData = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsData);

        const user = auth.currentUser;
        if (!user) {
          console.warn("No authenticated user found.");
          setLoading(false);
          return;
        }

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        const role = userData?.role || 'company';
        setUserRole(role);

        if (role === 'company') {
          const companiesSnap = await getDocs(collection(db, 'companies'));
          const matchedCompany = companiesSnap.docs
            .map(doc => doc.data())
            .find(c => c.contactEmail === user.email);

          if (matchedCompany) {
            setCompanyInfo(matchedCompany);
          } else {
            console.warn("No matching company found for user email.");
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendProposal = async (event) => {
    if (!companyInfo) {
      alert("Company info not loaded yet. Please wait.");
      return;
    }

    setLoadingPitchId(event.id);
    try {
      const pitch = await generatePitch(event, companyInfo, "company");
      setGeneratedPitches((prev) => ({ ...prev, [event.id]: pitch }));

      await sendEmail({
        to: event.contactEmail || event.email,
        subject: `Sponsorship Offer: ${companyInfo.name} x ${event.title}`,
        text: pitch,
        fromName: companyInfo.name,
        replyTo: companyInfo.contactEmail,
      });

      alert("Proposal email sent!");
    } catch (err) {
      console.error("Email send error:", err);
      alert("Failed to send email.");
    } finally {
      setLoadingPitchId(null);
    }
  };

  const isButtonDisabled = () => {
    return userRole !== 'company' || !companyInfo || loading;
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
                disabled={isButtonDisabled()}
                className={`mt-2 px-4 py-2 w-full rounded text-white transition ${
                  isButtonDisabled()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={() => handleSendProposal(event)}
              >
                📩 Send Proposal to Event
              </button>
            )}

            {loadingPitchId === event.id && (
              <p className="text-sm italic mt-2 text-gray-500">Generating pitch...</p>
            )}

            {generatedPitches[event.id] && (
              <div className="bg-gray-100 p-3 text-sm mt-2 rounded border text-gray-800 whitespace-pre-wrap">
                <strong>Generated Proposal:</strong><br />
                {generatedPitches[event.id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
