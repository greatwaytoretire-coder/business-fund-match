"use client";

import { useState } from 'react';

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

// Delete or comment out these lines:
// interface QuizProps {
//   onComplete: (data: any) => void;
// }

export default function Quiz() {
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

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const renderButtons = (field: keyof QuizResponse, options: string[]) => {
    return (
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
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 🌟 1. Instantly flip to the final Thank You state right here on the screen!
    setIsFinalSubmitted(true);

    let finalSlug = 'merchant-cash-advance';
    const monthlyRev = formData.monthlyRevenue;
    const timeInBiz = formData.timeInBusiness;
    const credit = formData.creditScore;

    if (credit === 'Poor (Under 620)') {
      finalSlug = 'credit-repair-partner';
    } else {
      if (monthlyRev === '$50,000+' && (timeInBiz === '1+ years' || timeInBiz === '2+ years')) {
        finalSlug = 'traditional-commercial-bank';
      } else if (timeInBiz === '2+ years' && (monthlyRev === '$10,000-$50,000' || monthlyRev === '$50,000+')) {
        finalSlug = 'sba-express-program';
      } else if (timeInBiz === '1+ years' || monthlyRev === '$10,000-$50,000') {
        finalSlug = 'revenue-growth-capital';
      }
    }

    // 🌟 2. Pass data quietly to the background tracking engine without breaking this view
   
  };

  // 🌟 THIS IS THE ABSOLUTE LAST SCREEN OF THE FUNNEL NOW
  if (isFinalSubmitted) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center space-y-6 animate-scaleIn">
        <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Thank You for Submitting!</h2>
          <p className="text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
            Your Pre-Qualification Application has been securely compiled and sent to our underwriting review queue.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-left max-w-md mx-auto">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">What happens next?</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            An account specialist will manually cross-reference your profile metrics against our active lender matrices. We will reach out to you directly via phone or email within 24 business hours to finalize your formal portal submission.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Step {step > 9 ? 10 : step} of 10</span>
        {step > 1 && (
          <button type="button" onClick={handleBack} className="text-sm font-medium text-blue-600">
            ← Back
          </button>
        )}
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How much funding do you need?</h2>
          {renderButtons('fundingAmount', ['Under $10,000', '$10,000-$50,000', '$50,000-$250,000', '$250,000+'])}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Time In Business?</h2>
          {renderButtons('timeInBusiness', ['Less than 3 months', '3-6 months', '6-12 months', '1+ years', '2+ years'])}
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What is your gross monthly revenue?</h2>
          {renderButtons('monthlyRevenue', ['Under $5,000', '$5,000-$10,000', '$10,000-$50,000', '$50,000+'])}
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What is your personal credit score?</h2>
          {renderButtons('creditScore', ['Excellent (720+)', 'Good (680-719)', 'Fair (620-679)', 'Poor (Under 620)'])}
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Do you have a business bank account?</h2>
          {renderButtons('hasBusinessBankAccount', ['Yes', 'No'])}
        </div>
      )}

      {step === 6 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Do you have any existing business loans?</h2>
          {renderButtons('hasExistingLoans', ['Yes', 'No'])}
        </div>
      )}

      {step === 7 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What is the primary purpose of funding?</h2>
          {renderButtons('fundingPurpose', ['Working Capital', 'Equipment', 'Inventory', 'Expansion', 'Other'])}
        </div>
      )}

      {step === 8 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Entity Type?</h2>
          {renderButtons('businessStructure', ['LLC', 'Corporation', 'Sole Proprietorship', 'Partnership'])}
        </div>
      )}

      {step === 9 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What state is your business registered in?</h2>
          <div className="space-y-4">
            <div className="relative">
              <select
                value={formData.businessState}
                onChange={(e) => handleNext('businessState', e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition font-medium text-gray-700 outline-none appearance-none cursor-pointer"
              >
                <option value="" disabled>Select your state...</option>
                {[
                  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
                  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
                  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
                  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
                  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
                  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
                  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
                  'Wisconsin', 'Wyoming'
                ].map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center italic">
              Selecting your state automatically matches localized state underwriting criteria.
            </p>
          </div>
        </div>
      )}

      {step >= 10 && (
        <form onSubmit={handleFinalSubmit} className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Apply for Your Offer</h2>
            <p className="text-sm text-gray-500 mb-4">Complete your contact details below to finalize your pre-qualification form submission.</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Business Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                placeholder="name@business.com"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Direct Phone Number</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                placeholder="(555) 555-5555"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 h-20 resize-none"
                placeholder="Brief description of use of funds..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition text-center block shadow-sm mt-4"
          >
            Submit Official Application
          </button>
        </form>
      )}
    </div>
  );
}