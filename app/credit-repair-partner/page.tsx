"use client";

import Link from 'next/link';

export default function CreditRepairPartnerPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center space-y-6">
        
        {/* Shield Icon */}
        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Let's Build Your Credit Profile</h1>
          <p className="text-gray-500 font-medium max-w-md mx-auto">
            Based on your pre-qualification details, your current credit score falls below our lenders' current minimum funding thresholds.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-left">
          <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-1">Affiliate Partner Match</h4>
          <p className="text-sm text-blue-800 leading-relaxed">
            We have matched your profile with our tier-one credit optimization network. Fast-tracking your optimization now helps establish the exact requirements needed to unlock capital channels in as little as 30 to 60 days.
          </p>
        </div>

        <div className="pt-2">
          <a
            href="https://www.your-credit-repair-affiliate-link.com" // 🔗 Replace with your real affiliate link
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition text-center block shadow-sm shadow-blue-200"
          >
            Connect to Credit Repair Specialist →
          </a>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Link href="/" className="text-sm font-medium text-gray-400 hover:text-gray-600 transition">
            ← Return to Matching Portal
          </Link>
        </div>
      </div>
    </div>
  );
}