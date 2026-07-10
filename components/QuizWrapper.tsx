'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useQuiz } from './QuizContext';
import { DollarSign, Calendar, Briefcase, CreditCard, ChevronRight, ChevronLeft, CheckCircle2, ShieldCheck, Mail, Phone, Building } from 'lucide-react';

export default function QuizWrapper() {
  const pathname = usePathname();
  const { quizState, updateQuizState, clearQuizState } = useQuiz();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // LOGIC: If path is NOT '/', it's an SEO page ([seoSlug])
  const isSeoPage = pathname !== '/';

  const steps = [
    { key: 'fundingAmount', label: 'Desired Funding Amount', icon: <DollarSign size={20} className="text-blue-600" /> },
    { key: 'timeInBusiness', label: 'Time in Business', icon: <Calendar size={20} className="text-blue-600" /> },
    { key: 'monthlyRevenue', label: 'Gross Monthly Revenue', icon: <Briefcase size={20} className="text-blue-600" /> },
    { key: 'creditScore', label: 'Estimated Credit Profile', icon: <CreditCard size={20} className="text-blue-600" /> },
    { key: 'leadInfo', label: 'Final Underwriting Security Connection', icon: <ShieldCheck size={20} className="text-blue-600" /> }
  ];

  const currentStep = quizState.currentStep || 0;

  const handleSelectOption = (key: string, value: string) => updateQuizState({ [key]: value, currentStep: currentStep + 1 });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => updateQuizState({ [e.target.name]: e.target.value });
  const handleNext = () => currentStep < steps.length - 1 && updateQuizState({ currentStep: currentStep + 1 });
  const handleBack = () => currentStep > 0 && updateQuizState({ currentStep: currentStep - 1 });

  const handleSubmitFinalLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setIsSubmitted(true); clearQuizState(); }, 1500);
  };

  // --- START-UP FORM RENDER (For SEO Pages) ---
  if (isSeoPage) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl max-w-xl mx-auto my-8">
        <h2 className="text-2xl font-black text-slate-900 mb-6">Start-Up Funding Application</h2>
        <p className="text-slate-500 mb-6">Designed specifically for new businesses. Get matched with startup-friendly capital.</p>
      </div>
    );
  }

  // --- 10-STEP FORM RENDER (For Homepage) ---
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl border-2 border-green-500/20 p-8 text-center shadow-xl max-w-xl mx-auto my-8">
        <CheckCircle2 size={48} className="text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-black text-slate-900">Pre-Qualification Complete!</h3>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-w-xl mx-auto my-8">
      <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {steps[currentStep].icon}
          <span className="text-xs font-black tracking-wider uppercase text-slate-400">Step {currentStep + 1} of 5</span>
        </div>
      </div>
      
      <div className="p-8">
        <h2 className="text-xl font-black text-slate-900 mb-6">{steps[currentStep].label}</h2>

        {currentStep === 0 && (
          <div className="grid grid-cols-1 gap-3">
            {['$5,000 - $25,000', '$25,000 - $100,000', '$100,000 - $250,000', '$250,000+'].map((opt) => (
              <button key={opt} onClick={() => handleSelectOption('fundingAmount', opt)} className={`w-full text-left p-4 rounded-xl border font-bold text-sm transition tracking-tight flex justify-between items-center ${quizState.fundingAmount === opt ? 'border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'}`}>
                {opt} <ChevronRight size={16} className="text-slate-400" />
              </button>
            ))}
          </div>
        )}

        {currentStep === 1 && (
          <div className="grid grid-cols-1 gap-3">
            {['0 - 6 Months (Startup)', '6 - 12 Months', '1 - 3 Years', '3+ Years'].map((opt) => (
              <button key={opt} onClick={() => handleSelectOption('timeInBusiness', opt)} className={`w-full text-left p-4 rounded-xl border font-bold text-sm transition tracking-tight flex justify-between items-center ${quizState.timeInBusiness === opt ? 'border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'}`}>
                {opt} <ChevronRight size={16} className="text-slate-400" />
              </button>
            ))}
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid grid-cols-1 gap-3">
            {['Under $10,000', '$10,000 - $30,000', '$30,000 - $75,000', '$75,000+'].map((opt) => (
              <button key={opt} onClick={() => handleSelectOption('monthlyRevenue', opt)} className={`w-full text-left p-4 rounded-xl border font-bold text-sm transition tracking-tight flex justify-between items-center ${quizState.monthlyRevenue === opt ? 'border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'}`}>
                {opt} <ChevronRight size={16} className="text-slate-400" />
              </button>
            ))}
          </div>
        )}

        {currentStep === 3 && (
          <div className="grid grid-cols-1 gap-3">
            {['Excellent (720+)', 'Good (650 - 719)', 'Fair (600 - 649)', 'Poor (Under 600)'].map((opt) => (
              <button key={opt} onClick={() => handleSelectOption('creditScore', opt)} className={`w-full text-left p-4 rounded-xl border font-bold text-sm transition tracking-tight flex justify-between items-center ${quizState.creditScore === opt ? 'border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'}`}>
                {opt} <ChevronRight size={16} className="text-slate-400" />
              </button>
            ))}
          </div>
        )}

        {currentStep === 4 && (
          <form id="leadCaptureForm" onSubmit={handleSubmitFinalLead} className="space-y-4">
            <div className="relative">
              <Building className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input required type="text" name="businessName" placeholder="Legal Business Name" value={quizState.businessName || ''} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-600 bg-slate-50/50" />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input required type="email" name="email" placeholder="Corporate Email Address" value={quizState.email || ''} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-600 bg-slate-50/50" />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input required type="tel" name="phone" placeholder="Direct Contact Number" value={quizState.phone || ''} onChange={handleInputChange} className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-600 bg-slate-50/50" />
            </div>
          </form>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4 px-8 pb-8">
        <button onClick={handleBack} disabled={currentStep === 0 || loading} className="flex items-center gap-1 text-xs font-extrabold text-slate-400 hover:text-slate-600 disabled:opacity-0 transition uppercase tracking-wider">
          <ChevronLeft size={16} /> Back
        </button>
        {currentStep === steps.length - 1 ? (
          <button type="submit" form="leadCaptureForm" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-6 py-3 rounded-full shadow-md transition uppercase tracking-wider flex items-center gap-2">
            {loading ? 'Routing...' : 'Secure Match'} <ChevronRight size={14} />
          </button>
        ) : (
          <button onClick={handleNext} className="flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700 transition uppercase tracking-wider">
            Next <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}