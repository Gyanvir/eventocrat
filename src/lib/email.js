export const sendEmail = async ({ to, subject, text, fromName, replyTo }) => {
  const res = await fetch('https://eventocrat-backend.onrender.com/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, text, fromName, replyTo }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Email send failed");
  return data;
};
