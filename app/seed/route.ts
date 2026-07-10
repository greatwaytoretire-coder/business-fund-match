import { NextResponse } from 'next/server';
import { initializeApp, cert, getApps, deleteApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const SAMPLE_FUNDING_OPTIONS = [
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
  }
];

export async function GET() {
  try {
    const keyPath = join(process.cwd(), 'serviceAccountKey.json');
    
    if (!existsSync(keyPath)) {
      return NextResponse.json({ 
        success: false, 
        error: "Missing serviceAccountKey.json file!" 
      }, { status: 400 });
    }

    const credentialJson = JSON.parse(readFileSync(keyPath, 'utf8'));
    
    // Nuke existing connections to bypass Next.js background context caching
    const existingApps = getApps();
    for (const app of existingApps) {
      try {
        await deleteApp(app);
      } catch (e) {}
    }

    // Force pass parameters explicitly to bind directly to the active cluster
    const app = initializeApp({
      credential: cert(credentialJson),
      projectId: "business-fund-match"
    });

    // Initialize firestore targeting the exact configuration explicitly
    const db = getFirestore(app, 'default');
    const lendersCollection = db.collection('lenders');

    for (const option of SAMPLE_FUNDING_OPTIONS) {
      await lendersCollection.doc(option.seoSlug).set(option);
    }

    return NextResponse.json({ success: true, message: "Database seeded perfectly!" });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message
    }, { status: 500 });
  }
}