export const dynamic = "force-dynamic"; // Ensure dynamic execution

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // ✅ Import `cookies`

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET() {
    console.log("SECRET_KEY:", SECRET_KEY ? "Loaded" : "Not Found");

    if (!SECRET_KEY) {
        return NextResponse.json({ error: "Missing SECRET_KEY in environment variables" }, { status: 500 });
    }

    try {
        // ✅ Correct way to access cookies in Next.js App Router
        const token = (await cookies()).get("token")?.value; // 👈 Fix: Await `cookies()`
        
        if (!token) {
            return NextResponse.json({ isAuthenticated: false, error: "No token found" }, { status: 401 });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        
        return NextResponse.json({ 
            isAuthenticated: true, 
            user: decoded // ✅ Send decoded user info 
        });
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return NextResponse.json({ isAuthenticated: false, error: "Invalid or expired token" }, { status: 401 });
    }
}
