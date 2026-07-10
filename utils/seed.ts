import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { join } from 'path';

// Self-contained Type Definition to bypass the import error
export interface FundingOption {
  name: string;
  type: string;
  description: string;
  minRevenue: number;
  minCredit: number;
  minYearsInBusiness: number;
  maxAmount: number;
  seoSlug: string;
}

export const SAMPLE_FUNDING_OPTIONS: FundingOption[] = [
  {
    name: "Traditional Commercial Bank",
    type: "Bank",
    description: "Standard business loans and lines of credit with strict institutional criteria.",
    minRevenue: 250000,
    minCredit: 680,
    minYearsInBusiness: 2,
    maxAmount: 500000,
    seoSlug: "traditional-commercial-bank"
  },
  {
    name: "SBA 7(a) Express Program",
    type: "SBA_Loan",
    description: "Government-backed working capital options featuring capped interest rates.",
    minRevenue: 100000,
    minCredit: 650,
    minYearsInBusiness: 2,
    maxAmount: 350000,
    seoSlug: "sba-express-program"
  },
  {
    name: "Revenue-Based Growth Capital",
    type: "Revenue_Based",
    description: "Flexible financing structures aligned directly with your incoming monthly merchant sales volume.",
    minRevenue: 120000,
    minCredit: 550,
    minYearsInBusiness: 1,
    maxAmount: 250000,
    seoSlug: "revenue-growth-capital"
  },
  {
    name: "Merchant Cash Advance",
    type: "MCA",
    description: "High-speed capital deployment tied directly to credit card transaction history metrics.",
    minRevenue: 80000,
    minCredit: 500,
    minYearsInBusiness: 1,
    maxAmount: 150000,
    seoSlug: "merchant-cash-advance"
  }
];

async function seedDatabase() {
  try {
    console.log('🔄 Starting database seeding process...');
    
    // Initialize Firebase Admin cleanly
    if (!getApps().length) {
      initializeApp({
        credential: cert(JSON.parse(readFileSync(join(process.cwd(), 'serviceAccountKey.json'), 'utf8')))
      });
    }

    const db = getFirestore();
    const lendersCollection = db.collection('lenders');

    for (const option of SAMPLE_FUNDING_OPTIONS) {
      await lendersCollection.doc(option.seoSlug).set(option);
      console.log(`✅ Seeded lender profile document: ${option.name}`);
    }

    console.log('🎉 Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed with unexpected error instance:', error);
    process.exit(1);
  }
}

seedDatabase();