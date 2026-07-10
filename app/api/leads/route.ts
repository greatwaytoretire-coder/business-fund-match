import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// 🔒 Initialize Firebase Admin using secure Environment Variables
let currentApp;

if (!getApps().length) {
  const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT;
  
  if (!serviceAccountVar) {
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT environment variable.");
  }

  const serviceAccount = JSON.parse(serviceAccountVar);

  currentApp = initializeApp({
    credential: cert(serviceAccount),
    projectId: "business-fund-match"
  });
} else {
  currentApp = getApps()[0];
}

const db = getFirestore(currentApp, "default");

// 📥 1. GET HANDLER: Pulls database records
export async function GET() {
  try {
    const snapshot = await db.collection("leads").get();
    
    if (snapshot.empty) {
      return NextResponse.json([]);
    }

    const leads = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const sortedLeads = leads.sort((a: any, b: any) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    return NextResponse.json(sortedLeads);
  } catch (error: any) {
    console.error("Database read error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 📤 2. POST HANDLER: Catches new submissions
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.id && body.adminNotes !== undefined) {
      await db.collection("leads").doc(body.id).update({
        adminNotes: body.adminNotes
      });
      return NextResponse.json({ success: true, message: "Notes updated" });
    }

    const leadPayload = {
      businessName: body.businessName || body.fullName || 'General Enterprise',
      fullName: body.fullName || '',
      email: body.email || '',
      phone: body.phone || '',
      monthlyRevenue: body.monthlyRevenue || body.monthlyRev || '—',
      creditScore: body.creditScore || body.credit || '—',
      timeInBusiness: body.timeInBusiness || body.timeInBiz || '—',
      matchedSlug: body.matchedSlug || 'unassigned',
      adminNotes: body.adminNotes || '',
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection("leads").add(leadPayload);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error("Database write error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🗑️ 3. DELETE HANDLER: Removes record
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing lead identification ID" }, { status: 400 });
    }

    await db.collection("leads").doc(id).delete();

    return NextResponse.json({ success: true, message: "Lead permanently removed" });
  } catch (error: any) {
    console.error("Database delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}