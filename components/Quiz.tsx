"use client";

import { useState } from 'react';

export default function Quiz() {
  const [step, setStep] = useState<number>(1);
  const [isFinalSubmitted, setIsFinalSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    fundingAmount: '', timeInBusiness: '', monthlyRevenue: '',
    creditScore: '', hasBusinessBankAccount: '', hasExistingLoans: '',
    fundingPurpose: '', businessStructure: '', businessState: '',
    fullName: '', email: '', phone: '', notes: ''
  });

  const handleNext = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    setStep((prev) => prev + 1);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsFinalSubmitted(true);
      } else {
        alert("Submission error. Please check the console.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const renderButtons = (field: string, options: string[]) => (
    <div className="grid grid-cols-1 gap-3 mt-4">
      {options.map((option) => (
        <button key={option} type="button" onClick={() => handleNext(field, option)} 
          className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition font-medium text-gray-700">
          {option}
        </button>
      ))}
    </div>
  );

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
      <p className="text-sm font-semibold text-gray-400 uppercase mb-4">Step {step > 10 ? 10 : step} of 10</p>
      
      {step === 1 && <div><h2 className="text-2xl font-bold mb-2">How much funding do you need?</h2>{renderButtons('fundingAmount', ['Under $10,000', '$10,000-$50,000', '$50,000-$250,000', '$250,000+'])}</div>}
      {step === 2 && <div><h2 className="text-2xl font-bold mb-2">Time In Business?</h2>{renderButtons('timeInBusiness', ['Less than 3 months', '3-6 months', '6-12 months', '1+ years', '2+ years'])}</div>}
      {step === 3 && <div><h2 className="text-2xl font-bold mb-2">Gross monthly revenue?</h2>{renderButtons('monthlyRevenue', ['Under $5,000', '$5,000-$10,000', '$10,000-$50,000', '$50,000+'])}</div>}
      {step === 4 && <div><h2 className="text-2xl font-bold mb-2">Personal credit score?</h2>{renderButtons('creditScore', ['Excellent (720+)', 'Good (680-719)', 'Fair (620-679)', 'Poor (Under 620)'])}</div>}
      {step === 5 && <div><h2 className="text-2xl font-bold mb-2">Business bank account?</h2>{renderButtons('hasBusinessBankAccount', ['Yes', 'No'])}</div>}
      {step === 6 && <div><h2 className="text-2xl font-bold mb-2">Any existing business loans?</h2>{renderButtons('hasExistingLoans', ['Yes', 'No'])}</div>}
      {step === 7 && <div><h2 className="text-2xl font-bold mb-2">Primary purpose of funding?</h2>{renderButtons('fundingPurpose', ['Working Capital', 'Equipment', 'Inventory', 'Expansion', 'Other'])}</div>}
      {step === 8 && <div><h2 className="text-2xl font-bold mb-2">Business entity type?</h2>{renderButtons('businessStructure', ['LLC', 'Corporation', 'Sole Proprietorship', 'Partnership'])}</div>}
      {step === 9 && <div><h2 className="text-2xl font-bold mb-4">Business state?</h2>
        <select onChange={(e) => handleNext('businessState', e.target.value)} className="w-full p-4 border rounded-xl">
          <option value="">Select your state...</option>
          {['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>}

      {step >= 10 && (
        <form onSubmit={handleFinalSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Apply for Your Offer</h2>
          <input required placeholder="Full Name" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, fullName: e.target.value})} />
          <input required type="email" placeholder="Email" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input required type="tel" placeholder="Phone" className="w-full p-3 border rounded-lg" onChange={e => setFormData({...formData, phone: e.target.value})} />
          <textarea placeholder="Additional Notes" className="w-full p-3 border rounded-lg h-24" onChange={e => setFormData({...formData, notes: e.target.value})} />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition">Submit Pre-Qualification Application</button>
        </form>
      )}
    </div>
  );
}