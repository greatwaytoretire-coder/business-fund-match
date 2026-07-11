import React from 'react';
import QuizWrapper from '../components/QuizWrapper';

// ... later in your JSX
<QuizWrapper />
import { HeaderNav, TrustSection, TeamSection, ComplianceFooterCTA } from '../components/TrustAndHeader';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans selection:bg-blue-500/20">
      
      <HeaderNav />
      
      {/* Hero Content (Rendered on the server for lightning-fast SEO paint speeds) */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-8 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            <ShieldCheck size={14} /> Zero Impact on Your Credit Score
          </span>
          
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 leading-none">
            Match with the Perfect Lender for Your Business Growth
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Take our 90-second Funding Pre-Qualification Form to instantly unlock programmatic underwriting profiles.
          </p>
        </div>
      </section>

      {/* Main Interactive Interface Block */}
      <main className="flex-grow px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <Quiz />
        </div>
      </main>

      <TrustSection />
      <TeamSection />
      <ComplianceFooterCTA />

    </div>
  );
}