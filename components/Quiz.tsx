"use client";
import { useState } from 'react';

export default function Quiz() {
  const [isFinalSubmitted, setIsFinalSubmitted] = useState(false);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFinalSubmitted(true);
  };

  if (isFinalSubmitted) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Thank You for Submitting!</h2>
      </div>
    );
  }

  return (
    <form onSubmit={handleFinalSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Business Fund Match Quiz</h2>
      <button 
        type="submit" 
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Submit Application
      </button>
    </form>
  );
}