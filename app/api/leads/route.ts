import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let currentApp;
if (!getApps().length) {
  const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountVar) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT.");
  const serviceAccount = JSON.parse(serviceAccountVar);
  currentApp = initializeApp({ credential: cert(serviceAccount), projectId: "business-fund-match" });
} else {
  currentApp = getApps()[0];
}
const db = getFirestore(currentApp, "default");

export async function GET() {
  try {
    const snapshot = await db.collection("leads").get();
    const leads = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(leads.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0)));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const leadPayload = { ...body, createdAt: new Date().toISOString() };
    const docRef = await db.collection("leads").add(leadPayload);

    fetch("https://hook.us2.make.com/iesf1ja6ttktdth0kz1kxloiuhauvmmn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...leadPayload, id: docRef.id }),
    }).catch((err) => console.error("Webhook background task failed:", err));

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    await db.collection("leads").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}