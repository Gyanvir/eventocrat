import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Background glow/starfield effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800/20 via-transparent to-transparent blur-3xl opacity-40" />
      </div>

      {/* Navbar */}
      <header className="z-10 relative flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold">Eventocrat</h1>
        <div className="space-x-4 text-sm">
          <button onClick={() => navigate("/login")} className="hover:underline">
            Log in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-gray-900 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 z-10 relative flex flex-col justify-center items-center text-center px-4 py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Bridging Campus Events <br /> & Sponsorships
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10">
          Discover sponsors for your college events or find tech-savvy student communities to support.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/signup?role=student")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md transition"
          >
            🎓 I'm a Student / Society
          </button>
          <button
            onClick={() => navigate("/signup?role=company")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-md transition"
          >
            🏢 I'm a Company / Sponsor
          </button>
        </div>

        <div className="mt-8 space-x-6 text-sm">
          <button
            onClick={() => navigate("/companies")}
            className="underline text-blue-400 hover:text-white transition"
          >
            View Sponsoring Companies
          </button>
          <button
            onClick={() => navigate("/events")}
            className="underline text-green-400 hover:text-white transition"
          >
            View Listed Events
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 text-center p-6 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Eventocrat. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
