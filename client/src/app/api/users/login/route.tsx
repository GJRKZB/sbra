import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/app/lib/session";
import bcrypt from "bcrypt";
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    if (user && validPassword) {
      await createSession(user.username);
      const response = NextResponse.json(
        { message: "Login successful", success: true },
        { status: 200, headers: { "content-type": "application/json" } }
      );
      return response;
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
