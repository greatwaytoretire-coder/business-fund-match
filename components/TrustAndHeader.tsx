"use client";

import React from 'react';
import Image from 'next/image';
import { Star, Phone, ArrowRight } from 'lucide-react';

export default function HeaderNav() {
  const handleScrollToQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const quizElement = document.getElementById('quiz-funnel-section');
    
    if (quizElement) {
      // If the quiz is found, scroll to it
      quizElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // If the quiz is NOT found, just log it so we don't 404 redirect
      console.error("Quiz section not found on page.");
    }
  };
   

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* 🏢 LOGO BRANDING */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer select-none group" 
          onClick={() => window.location.href = '/'}
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-950 to-blue-800 shadow-sm group-hover:from-blue-900 group-hover:to-blue-700 transition-all">
            <span className="text-lg font-black tracking-tighter text-white font-sans pr-0.5">B</span>
            <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 border-2 border-white shadow-sm">
              <svg className="h-1.5 w-1.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wider text-slate-900 uppercase leading-none">
              Business <span className="text-emerald-600 font-extrabold">Fund</span>
            </span>
            <span className="text-[10px] font-black tracking-[0.25em] text-slate-400 uppercase leading-tight mt-0.5">
              Match
            </span>
          </div>
        </div>

        {/* ⚡ MARKETING ACTIONS TIER */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a 
  href="tel:15176848279" 
  className="group flex items-center gap-2 rounded-full px-2.5 py-1.5 transition hover:bg-slate-50"
>
  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
    <Phone size={13} className="fill-blue-600/10" />
  </div>
  <div className="hidden flex-col text-left sm:flex">
    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 leading-none">Speak to a Specialist</span>
    {/* The phone number <span> has been removed */}
  </div>
</a>

          <button 
            onClick={handleScrollToQuiz}
            className="flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow active:scale-95"
          >
            Pre-Qualify Now
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </header>
  );
}

export function TrustSection() {
  const reviews = [
    {
      id: 1,
      days: "2 days ago",
      title: "Fastest pre-qual matching out there",
      body: "I was looking for working capital for my retail store and within minutes I knew exactly which lending programs matched my profile. The transparency is amazing.",
      author: "Marcus T."
    },
    {
      id: 2,
      days: "5 days ago",
      title: "Highly recommend for small business owners",
      body: "They didn't waste my time with options I didn't qualify for. The system mapped my credit and revenue perfectly to an express track option.",
      author: "Sarah L."
    },
    {
      id: 3,
      days: "6 days ago",
      title: "Straightforward and secure",
      body: "Excellent platform. Saved me hours of calling banks manually. Got a matching offer that fit our cash flow cycle perfectly.",
      author: "David K."
    }
  ];

  return (
    <section className="w-full bg-slate-50 py-16 px-6 md:px-12 text-slate-900 border-t border-b border-slate-200">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* 📊 By The Numbers Matrix Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
          <div className="space-y-1">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">+50,000</h3>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Small Businesses Matched</p>
          </div>
          <div className="space-y-1 border-y md:border-y-0 md:border-x border-slate-100 py-6 md:py-0">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">+$450M</h3>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">In Funding Provided</p>
          </div>
          <div className="space-y-2 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-800 tracking-tight">Trustpilot Rating</span>
            <div className="flex gap-1 text-emerald-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">4.8 / 5.0 Core Score</p>
          </div>
        </div>

        {/* ⭐ Trustpilot-Style Review Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-0.5 text-white bg-emerald-500 p-1 rounded">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{rev.days}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{rev.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">"{rev.body}"</p>
              </div>
              <div className="text-xs font-bold text-slate-400 tracking-wide uppercase border-t border-slate-50 pt-3">
                — {rev.author}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function TeamSection() {
  const team = [
    {
      name: "Marcus",
      role: "Funding Technology Specialist",
      stat: "350+ Businesses Helped",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Imani",
      role: "Customer Success Representative",
      stat: "600+ Businesses Helped",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Karen",
      role: "Business Transactions Specialist",
      stat: "275+ Businesses Helped",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400"
    }
  ];

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 text-slate-900">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            We've got your back for whatever business you run.
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Ours is to ensure businesses of all kinds are connected to the best funding solutions for their needs. Whether you prefer to apply online on your time, or over the phone with one of our funding specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {team.map((member, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-4 group">
              
              <div className="relative flex flex-col items-center">
                {/* 🛡️ Explicit fixed boundaries matching Next.js size parameters */}
                <div className="w-[176px] h-[176px] rounded-full overflow-hidden shadow-md border-4 border-slate-50 transform group-hover:scale-105 transition duration-300">
                  <Image 
                    src={member.imageUrl} 
                    alt={member.name} 
                    width={176} 
                    height={176}
                    priority={true}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="absolute -bottom-2 bg-slate-900 text-white font-bold text-[11px] px-3 py-1 rounded-full whitespace-nowrap shadow-sm border border-slate-800 z-10">
                  {member.stat}
                </div>
              </div>

              <div className="pt-2 space-y-0.5">
                <h4 className="font-extrabold text-lg text-slate-900">{member.name}</h4>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-4">{member.role}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function ComplianceFooterCTA() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900">
      
      <div className="max-w-4xl mx-auto text-center py-16 px-6 space-y-6">
        <h3 className="text-3xl font-black text-white tracking-tight">
          Ready to grow your business?
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          We connect businesses to funding. So you can spend less time worrying about working capital and more time taking on the world.
        </p>
        <div className="pt-2">
          <button
            onClick={handleScrollToTop}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black text-base px-8 py-4 rounded-full transition transform hover:scale-105 shadow-lg tracking-wide inline-flex items-center justify-center min-w-[220px]"
          >
            Start Application
          </button>
        </div>
      </div>

      <div className="w-full border-t border-slate-900/60 py-8 px-6 text-center text-xs space-y-4">
        
        <div className="text-white font-black text-sm tracking-tight opacity-40 uppercase">
          Your Funding Match Platform
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[11px] font-medium text-slate-500">
          <a href="#privacy" className="hover:text-slate-300 transition">Privacy Policy</a>
          <span className="text-slate-800">|</span>
          <a href="#terms" className="hover:text-slate-300 transition">Terms and Conditions</a>
          <span className="text-slate-800">|</span>
          <a href="#accessibility" className="hover:text-slate-300 transition">Accessibility</a>
          <span className="text-slate-800">|</span>
          <a href="#legal" className="hover:text-slate-300 transition">Legal</a>
          <span className="text-slate-800">|</span>
          <a href="#info" className="hover:text-slate-300 transition">Important Information</a>
        </div>

        <p className="text-[10px] text-slate-600 max-w-2xl mx-auto leading-normal pt-2">
          © {new Date().getFullYear()} All rights reserved. Estimates based on programmatic routing matrices. Prequalification calculations are subject to additional lender verification files.
        </p>
      </div>

    </footer>
  );
}