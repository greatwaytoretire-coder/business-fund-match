import { NextResponse } from "next/server";
import fs from "fs";

const { initializeApp, getApps, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

function getDb() {
  const serviceAccountPath = "C:\\Users\\Gregory\\business-fund-match\\serviceAccountKey.json";
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(`Credential key file missing at: ${serviceAccountPath}`);
  }
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
  const activeApps = getApps();
  const currentApp = activeApps.length === 0 
    ? initializeApp({ credential: cert(serviceAccount), projectId: "business-fund-match" })
    : activeApps[0];
  return getFirestore(currentApp, "default");
}

// FETCH ALL LENDERS
export async function GET() {
  try {
    const db = getDb();
    const snapshot = await db.collection("lenders").get();
    const lenders = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(lenders);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch lenders", details: error.message }, { status: 500 });
  }
}

// ADD NEW LENDER
export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const docRef = await db.collection("lenders").add({
      ...body,
      createdAt: new Date().toISOString()
    });
    return NextResponse.json({ id: docRef.id, message: "Lender added successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to add lender", details: error.message }, { status: 500 });
  }
}

// EDIT LENDER
export async function PUT(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { id, ...updateData } = body;
    if (!id) throw new Error("Lender ID is required for updating.");
    await db.collection("lenders").doc(id).update(updateData);
    return NextResponse.json({ message: "Lender updated successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update lender", details: error.message }, { status: 500 });
  }
}

// DELETE LENDER
export async function DELETE(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("Lender ID is required for deletion.");
    await db.collection("lenders").doc(id).delete();
    return NextResponse.json({ message: "Lender deleted successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete lender", details: error.message }, { status: 500 });
  }
}