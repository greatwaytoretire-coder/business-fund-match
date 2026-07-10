import { NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
console.log("🚨 PROJECT ID IN ROUTE IS:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
// 🌐 Safe Server-Side Singleton Pattern
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

console.log("DEBUG 1: Checking Firestore singleton...");
if (!global.firestoreDb) {
  try {
    console.log("DEBUG 2: Attempting initializeFirestore with long polling...");
    global.firestoreDb = initializeFirestore(app, { experimentalForceLongPolling: true });
    console.log("DEBUG 3: initializeFirestore successful!");
  } catch (e) {
    console.log("DEBUG 3 ALT: initializeFirestore failed, falling back to getFirestore...", e);
    global.firestoreDb = getFirestore(app);
  }
}
const db = global.firestoreDb;

// Dataset containing your target lender profiles
const initialLenders = [
  {
    id: "lender_traditional_bank",
    name: "Traditional Commercial Bank",
    type: "Bank",
    description: "Standard business loans and lines of credit with strict institutional criteria.",
    minCreditScore: 680,
    minYearsInBusiness: 2
  },
  {
    id: "lender_sba_partner",
    name: "SBA Preferred Partner",
    type: "SBA",
    description: "Government-backed options offering lower down payments and extended terms.",
    minCreditScore: 650,
    minYearsInBusiness: 2
  },
  {
    id: "lender_fintech_speed",
    name: "FinTech Capital Group",
    type: "Alternative",
    description: "Fast online funding structured around modern revenue performance metrics.",
    minCreditScore: 600,
    minYearsInBusiness: 1
  }
];

export async function GET() {
  console.log("🚀 SEED ROUTE: Initiating database write operation...");
  const writeLogs = [];

  try {
    // Force sequential execution so we can catch breaks instantly
    for (const lender of initialLenders) {
      console.log(`⏳ Writing document references for: ${lender.id}`);
      await setDoc(doc(db, "lenders", lender.id), lender);
      writeLogs.push(`Successfully wrote: ${lender.id}`);
    }

    console.log("✅ SEED ROUTE: All operations completed without errors.");
    return NextResponse.json({ 
      success: true, 
      message: "Database seeded successfully!", 
      history: writeLogs 
    });

  } catch (error) {
    console.error("🚨 CRITICAL SEEDING EXCEPTION:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}