import React from "react";

export const HeroPage = () => {
  return (
    <div className="bg-gradient-to-br from-[#c2e9fb] via-[#f9f7f7] to-[#e0c3fc] via-white to-purple-100 h-screen flex items-center justify-center px-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to LegalAI
        </h1>
        <p className="text-lg text-gray-600 mb-8">
        Transform legal workflows with AI-driven solutions that access the digital document repository, it also provides legal services that replaces the need for legal professional for simple legal tasks.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};
