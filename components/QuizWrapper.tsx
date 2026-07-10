'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Quiz from './Quiz'; // This imports your original 10-step form

export default function QuizWrapper() {
  const pathname = usePathname();
  
  // If the path is NOT '/', we know it is an SEO page
  const isSeoPage = pathname !== '/';

  // 1. RENDER: START-UP FORM (For SEO Pages)
  if (isSeoPage) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl max-w-xl mx-auto my-8">
        <h2 className="text-2xl font-black text-slate-900 mb-6">Start-Up Funding Application</h2>
        <p className="text-slate-500 mb-6">Designed specifically for new businesses. Get matched with startup-friendly capital.</p>
        {/* If you have a specific StartUp form component, import it here */}
      </div>
    );
  }

  // 2. RENDER: ORIGINAL FORM (For Homepage)
  // This just uses the Quiz.tsx file you already had!
  return <Quiz />;
}