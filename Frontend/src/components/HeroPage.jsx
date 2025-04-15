import React from "react";

export const HeroPage = () => {
  return (
    <div className="bg-gradient-to-br from-[#c2e9fb] via-[#f9f7f7] to-[#e0c3fc] via-white to-purple-100 h-screen flex items-center justify-center px-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to LegalAI
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Empowering legal document analysis with AI-powered summarization and classification.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};
