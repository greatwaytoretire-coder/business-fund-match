import { notFound } from 'next/navigation';
import Quiz from '../../components/Quiz';
import HeaderNav, { TrustSection, TeamSection, ComplianceFooterCTA } from '../../components/TrustAndHeader';

// 📊 1. Content Mapping Matrix
const seoPageData: Record<string, {
  title: string;
  description: string;
  badge: string;
}> = {
  "business-loans": { title: "Secured & Unsecured Business Loans", description: "Access flexible business term loans.", badge: "Core Business Capital" },
  "startup-business-loans": { title: "Early-Stage Startup Business Funding", description: "Launch your runway with custom financing.", badge: "Startup Engine Program" },
  // ... add your other slugs here exactly as you had them before
};

export default function GenericSEORoute({ params }: { params: { seoSlug: string } }) {
  const pageContent = seoPageData[params.seoSlug];

  if (!pageContent) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <HeaderNav />
      
      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">{pageContent.badge}</span>
        <h1 className="text-5xl font-black text-slate-900 mt-2 mb-6">{pageContent.title}</h1>
        <p className="text-lg text-slate-600 mb-12">{pageContent.description}</p>
        
        <div id="quiz-funnel-section">
          <Quiz />
        </div>
      </div>

      <TrustSection />
      <TeamSection />
      <ComplianceFooterCTA />
    </main>
  );
}