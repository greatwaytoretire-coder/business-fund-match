import HeaderNav, { TrustSection, TeamSection, ComplianceFooterCTA } from '../components/TrustAndHeader';
import Quiz from '../components/Quiz';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      <HeaderNav />
      
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-8 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            <ShieldCheck size={14} /> Zero Impact on Your Credit Score
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 leading-none">
            Match with the Perfect Lender for Your Business Growth
          </h1>
        </div>
      </section>

      <div className="flex-grow px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Using the onComplete prop to log data as requested in the alternative branch */}
          <Quiz />
        </div>
      </div>

      <TrustSection />
      <TeamSection />
      <ComplianceFooterCTA />
    </main>
  );
}