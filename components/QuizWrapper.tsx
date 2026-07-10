'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

// --- 1. Interfaces ---
interface QuizResponse {
  fundingAmount: string;
  timeInBusiness: string;
  monthlyRevenue: string;
  creditScore: string;
  hasBusinessBankAccount: string;
  hasExistingLoans: string;
  fundingPurpose: string;
  businessStructure: string;
  businessState: string;
  fullName?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export default function QuizWrapper() {
  const pathname = usePathname();
  const isSeoPage = pathname !== '/';

  // --- 2. SEO Page Render ---
  if (isSeoPage) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Start-Up Funding Application</h2>
        <p className="text-gray-600 mb-6">
           Specialized capital matching for new business ventures.
        </p>
      </div>
    );
  }

  // --- 3. Main 10-Step Form Logic (Copied from your Quiz.tsx) ---
  const [step, setStep] = useState<number>(1);
  const [isFinalSubmitted, setIsFinalSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<QuizResponse>({
    fundingAmount: '',
    timeInBusiness: '',
    monthlyRevenue: '',
    creditScore: '',
    hasBusinessBankAccount: '',
    hasExistingLoans: '',
    fundingPurpose: '',
    businessStructure: '',
    businessState: '',
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleNext = (field: keyof QuizResponse, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));

  const renderButtons = (field: keyof QuizResponse, options: string[]) => (
    <div className="grid grid-cols-1 gap-3 mt-4">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => handleNext(field, option)}
          className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition font-medium text-gray-700"
        >
          {option}
        </button>
      ))}
    </div>
  );

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFinalSubmitted(true);
    console.log("Form Submitted:", formData);
  };

  if (isFinalSubmitted) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
        <p className="text-gray-600">Your application has been received.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Step {step > 9 ? 10 : step} of 10</span>
        {step > 1 && (
          <button type="button" onClick={handleBack} className="text-sm font-medium text-blue-600">← Back</button>
        )}
      </div>

      {step === 1 && (<div><h2 className="text-2xl font-bold text-gray-900 mb-2">How much funding do you need?</h2>{renderButtons('fundingAmount', ['Under $10,000', '$10,000-$50,000', '$50,000-$250,000', '$250,000+'])}</div>)}
      {step === 2 && (<div><h2 className="text-2xl font-bold text-gray-900 mb-2">Time In Business?</h2>{renderButtons('timeInBusiness', ['Less than 3 months', '3-6 months', '6-12 months', '1+ years', '2+ years'])}</div>)}
      {step === 3 && (<div><h2 className="text-2xl font-bold text-gray-900 mb-2">What is your gross monthly revenue?</h2>{renderButtons('monthlyRevenue', ['Under $5,000', '$5,000-$10,000', '$10,000-$50,000', '$50,000+'])}</div>)}
      {step === 4 && (<div><h2 className="text-2xl font-bold text-gray-900 mb-2">What is your personal credit score?</h2>{renderButtons('creditScore', ['Excellent (720+)', 'Good (680-719)', 'Fair (620-679)', 'Poor (Under 620)'])}</div>)}
      {step === 5 && (<div><h2 className="text-2xl font-bold text-gray-900 mb-2">Do you have a business bank account?</h2>{renderButtons('hasBusinessBankAccount', ['Yes', 'No'])}</div>)}
      {step === 6 && (<div><h2 className="text-2xl font-bold text-gray-900 mb-2">Do you have any existing business loans?</h2>{renderButtons('hasExistingLoans', ['Yes', 'No'])}</div>)}
      {step === 7 && (<div><h2 className="text-2xl font-bold text-gray-900 mb-2">What is the primary purpose of funding?</h2>{renderButtons('fundingPurpose', ['Working Capital', 'Equipment', 'Inventory', 'Expansion', 'Other'])}</div>)}
      {step === 8 && (<div><h2 className="text-2xl font-bold text-gray-900 mb-2">Business Entity Type?</h2>{renderButtons('businessStructure', ['LLC', 'Corporation', 'Sole Proprietorship', 'Partnership'])}</div>)}
      {step === 9 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What state is your business registered in?</h2>
          <select value={formData.businessState} onChange={(e) => handleNext('businessState', e.target.value)} className="w-full p-4 rounded-xl border border-gray-200">
             <option value="" disabled>Select your state...</option>
             {['Alabama', 'Alaska', 'Arizona', 'California', 'Texas', 'Florida', 'New York'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}
      {step >= 10 && (
        <form onSubmit={handleFinalSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Apply for Your Offer</h2>
          <input type="text" required placeholder="Full Name" onChange={(e) => setFormData(p => ({...p, fullName: e.target.value}))} className="w-full p-3 border rounded-lg" />
          <input type="email" required placeholder="Email" onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} className="w-full p-3 border rounded-lg" />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Submit</button>
        </form>
      )}
    </div>
  );
}