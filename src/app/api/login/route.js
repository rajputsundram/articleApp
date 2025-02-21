import Users from "../../../../lib/models/Users";
import { connectDB } from "../../../../lib/config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        const user = await Users.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ success: false, msg: "Invalid email or password." }, { status: 401 });
        }

        // ✅ Generate JWT
        const payload = { user: { id: user._id, email: user.email } };
        const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        // ✅ Set the cookie correctly
        const response = NextResponse.json({ success: true, msg: "Login successful" });
        response.headers.set("Set-Cookie", `token=${authToken}; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=Lax`);

        return response;

    } catch (error) {
        return NextResponse.json({ success: false, msg: "Login failed", error: error.message }, { status: 500 });
    }
}
