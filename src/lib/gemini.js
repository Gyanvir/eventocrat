export const generatePitch = async (event, company, senderType = "student") => {
  const response = await fetch("https://eventocrat-backend.onrender.com/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event, company, senderType }),
  });

  const data = await response.json();
  return data.pitch || "Could not generate pitch.";
};
