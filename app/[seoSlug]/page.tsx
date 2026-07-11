import React from 'react';
import { notFound } from 'next/navigation';
import QuizWrapper from '../components/QuizWrapper';

// ... later in your JSX
<QuizWrapper />
import { HeaderNav, TrustSection, TeamSection, ComplianceFooterCTA } from '../../components/TrustAndHeader';
import { HelpCircle, BookOpen, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

// 📊 1. Content Mapping Matrix
const seoPageData: Record<string, {
  title: string;
  description: string;
  badge: string;
  guideTitle: string;
  guideContent: string[];
  faqs: { q: string; a: string }[];
}> = {
  "business-loans": {
    title: "Secured & Unsecured Business Loans",
    description: "Access flexible business term loans with predictable monthly payments to scale operations or acquire physical corporate assets.",
    badge: "Core Business Capital",
    guideTitle: "Understanding Fixed-Term Business Financing",
    guideContent: [
      "Fixed or variable interest configurations tailored to monthly cash flow cycles.",
      "Repayment schedules scaling from 12 to 72 months depending on underwriting profiles.",
      "Preserves liquid operational revenue while funding major structural additions."
    ],
    faqs: [
      { q: "What parameters dictate traditional business loan interest tiers?", a: "Underwriting systems evaluate time-in-business metrics, verifiable gross annual revenue trajectories, and macro credit profiles." },
      { q: "Can these terms be paid off early without penalty metrics?", a: "Our premium matching matrix filters for lenders offering flexible early payoff incentives with zero prepayment penalties." }
    ]
  },
  "startup-business-loans": {
    title: "Early-Stage Startup Business Funding Solutions",
    description: "Launch your runway with custom financing models optimized for early-stage operational expenses and foundational capital infrastructure.",
    badge: "Startup Engine Program",
    guideTitle: "The Founder's Guide to Capital Acquisition",
    guideContent: [
      "Leverages projection metrics and personal credit stability instead of trailing historical revenue data.",
      "Excellent option for software deployment, foundational inventory, and human capital acquisition.",
      "Establishes initial corporate credit lines to secure expanded financing infrastructure downstream."
    ],
    faqs: [
      { q: "What is the baseline operational history requirement?", a: "Startup classifications support businesses operating from 0 to 12 months using specialized credit parameters." },
      { q: "Is collateral equity required to lock in capital lines?", a: "Both collateralized and signature-backed unsecured tracks are programmatically evaluated during screening." }
    ]
  },
  "working-capital-loans": {
    title: "Express Working Capital Loans for Operational Fluidity",
    description: "Bridge short-term cash flow gaps, manage structural inventory acquisition, or absorb seasonal variance hurdles cleanly.",
    badge: "Liquid Cash Flow Optimization",
    guideTitle: "Maximizing Your Business Working Capital Ratio",
    guideContent: [
      "Accelerated underwriting tracks built for instant deployment scenarios.",
      "Direct capital injection designed for payroll management, daily operational bills, or immediate inventory buyouts.",
      "Flexible payment matrices that flex directly with your standard business volumes."
    ],
    faqs: [
      { q: "How quickly can working capital injections settle?", a: "Approved matching profiles typically receive automated clearing house settlements within 24 to 48 hours." },
      { q: "Does a working capital facility restrict generic usage parameters?", a: "No. Capital can be allocated flexibly across any operational, payroll, or business-critical bucket." }
    ]
  },
  "bad-credit-business-loans": {
    title: "Bad Credit Business Loans & Capital Alternatives",
    description: "Secure the working capital your business needs based on your consistent operational revenue trends, not historic credit events.",
    badge: "Revenue-Driven Approvals",
    guideTitle: "Navigating Financing Options with Imperfect Credit",
    guideContent: [
      "Prioritizes current banking statements and monthly cash velocity over arbitrary trailing FICO metrics.",
      "Structured to help business entities rebuild corporate leverage through stable payment performance.",
      "Prevents automatic rejection loops from traditional institutional banking pipelines."
    ],
    faqs: [
      { q: "What is the minimum credit baseline score required?", a: "Our dynamic platform screens revenue metrics for accounts down to a 500 FICO baseline, focusing primarily on cash flow strength." },
      { q: "Will checking my options degrade my existing score markers?", a: "No. Initial matching mechanics utilize soft credit inquiries, creating absolutely zero structural impact on your credit files." }
    ]
  },
  "revenue-based-funding": {
    title: "Programmatic Revenue-Based Funding Facilities",
    description: "Access capital linked directly to your future card sales or gross deposit balances. Pay cleanly as your business grows.",
    badge: "Non-Dilutive Cash Infusions",
    guideTitle: "The Mechanics of Variable Revenue Matching",
    guideContent: [
      "Zero structural compounding interest metrics; structures utilize a fixed, predictable factor file system.",
      "Daily or weekly payment schedules that scale up or down automatically alongside your processing volumes.",
      "Non-dilutive setup allows founders to secure funding without releasing equity percentages."
    ],
    faqs: [
      { q: "How do flexible payments protect low-volume cycles?", a: "Because calculations utilize a fixed remittance percentage, if your revenue dips in a given cycle, the payment scales down proportionally." },
      { q: "What deposit volumes optimize this underwriting path?", a: "Consistently showing $10,000+ in predictable monthly merchant deposits opens up prime tier paths." }
    ]
  },
  "equipment-financing": {
    title: "Industrial Equipment Financing & Asset Leases",
    description: "Acquire specialized hardware, commercial vehicle fleets, technology stacks, or heavy machinery using the equipment itself as baseline security.",
    badge: "Asset-Backed Infrastructure",
    guideTitle: "Structuring Low-Risk Equipment Allocations",
    guideContent: [
      "Secures financing up to 100% of verified asset values to eliminate steep out-of-pocket expenses.",
      "The underlying asset acts as collateral, shielding core liquid cash reserves from exposure risk.",
      "Provides significant tax deduction avenues under modern capital asset depreciation rules."
    ],
    faqs: [
      { q: "Can I finance used software or specialized industrial equipment lines?", a: "Yes. Program platforms accept vendor invoices across new and certified used machinery classes." },
      { q: "What happens when the term reaches its logical conclusion?", a: "Options range from formal title transfer for a nominal dollar amount to simple operational upgrades." }
    ]
  },
  "mca-alternatives": {
    title: "High-Performance Merchant Cash Advance Alternatives",
    description: "Ditch predatory merchant agreements for modern, highly structured unsecured alternative business cash flow models.",
    badge: "Transparent Alternative Capital",
    guideTitle: "Evaluating Modern Cash Advance Alternatives",
    guideContent: [
      "Eliminates aggressive automated collection practices via balanced banking verification loops.",
      "Clear, up-front fee schedules that show you the exact total cost of capital before execution.",
      "Ensures business owners hold steady cash reserves to support sustained company health."
    ],
    faqs: [
      { q: "How do alternative tracks differ from classic MCAs?", a: "Alternative tracks favor predictable bank account deposit volume over strict card-swipe terminal tracking, offering cleaner operational structures." },
      { q: "Are personal guarantees required for alternative capital structures?", a: "Many paths offer minimized exposure levels based heavily on corporate performance histories." }
    ]
  },
  "small-business-funding": {
    title: "Omni-Channel Small Business Funding Matrix",
    description: "The complete automated matching pipeline connecting small businesses to SBA, line of credit, and express term products instantly.",
    badge: "The Universal Business Engine",
    guideTitle: "Deploying the Perfect Capital Mix for Long-Term Growth",
    guideContent: [
      "Scans over 75 custom lending parameter rules to output the absolute highest probability match.",
      "Perfect for comprehensive scaling maneuvers, inventory bulk buying, or multi-location expansion.",
      "Combines multi-product versatility into a singular, cohesive 90-second entry framework."
    ],
    faqs: [
      { q: "How long does the primary matching mechanism take?", a: "The processing architecture sorts and verifies matched profiles in under 90 seconds from complete submission." }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(seoPageData).map((slug) => ({
    seoSlug: slug,
  }));
}

// 🎯 ITEM 3: Dynamic Metadata Generation for Search Engine Snippets
export async function generateMetadata({ params }: { params: Promise<{ seoSlug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const pageContent = seoPageData[resolvedParams.seoSlug];
  
  if (!pageContent) return {};

  return {
    title: `${pageContent.title} | BusinessFundMatch`,
    description: pageContent.description,
    openGraph: {
      title: `${pageContent.title} | BusinessFundMatch`,
      description: pageContent.description,
      type: 'website',
    }
  };
}

export default async function GenericSEORoute({ params }: { params: Promise<{ seoSlug: string }> }) {
  const resolvedParams = await params;
  const pageContent = seoPageData[resolvedParams.seoSlug];

  if (!pageContent) {
    notFound();
  }

  // 🎯 ITEM 4: Structured JSON-LD Schema Object
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": `${pageContent.title} | BusinessFundMatch`,
    "description": pageContent.description,
    "url": `https://businessfundmatch.com/${resolvedParams.seoSlug}`,
    "category": "Business Financing Solutions",
    "provider": {
      "@type": "Organization",
      "name": "BusinessFundMatch",
      "url": "https://businessfundmatch.com"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans selection:bg-blue-500/20">
      
      {/* 🛡️ Injecting the structured data directly into the server head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <HeaderNav />

      {/* Dynamic Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-8 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            {pageContent.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 leading-none">
            {pageContent.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            {pageContent.description}
          </p>
        </div>
      </section>

      {/* Isolated Client Quiz Layer */}
      <main className="px-4 pb-12">
        <div id="quiz-funnel-section" className="scroll-mt-20">
  <Quiz />
</div>
      </main>

      {/* Programmatic Funding Guides */}
      <section className="w-full bg-white py-16 px-6 md:px-12 border-t border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <BookOpen className="text-blue-600" size={28} />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{pageContent.guideTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageContent.guideContent.map((point, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-200/60 space-y-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  0{idx + 1}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium lod-fixed-text">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      {/* Dynamic FAQ List */}
      <section className="w-full bg-white py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
              <HelpCircle size={16} /> Have Questions?
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {pageContent.faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-6 shadow-sm bg-slate-50/50">
                <h4 className="font-extrabold text-slate-900 text-base mb-2 flex gap-2 items-start">
                  <span className="text-blue-600 font-black">Q:</span> {faq.q}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium pl-5 border-l-2 border-slate-200">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TeamSection />

      {/* Programmatic Middle Lead Capture CTA */}
      <section className="w-full bg-blue-50 py-12 px-6 text-center border-t border-b border-blue-100">
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Not sure if you fit this specific financial profile?</h3>
          <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
            Our routing filters check all dynamic program matrices simultaneously. Find your alignment parameters in 90 seconds.
          </p>
          <div className="pt-2">
            <a href="#top" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-6 py-3.5 rounded-full transition transform hover:scale-105 shadow-md tracking-wider uppercase">
              Run Free Assessment <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <ComplianceFooterCTA />
    </div>
  );
}