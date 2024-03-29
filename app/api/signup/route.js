import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import { hashPassword } from "@/lib/hashPass";
import User from "@/lib/database/models/user.model";

export async function POST(req, res) {
  try {
    //checkout req.test() as well for data
    const { username, email, password, role } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" });
    }
    await connectToDatabase();

    const hashedPassword = await hashPassword(password);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 401 }
      );
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return NextResponse.json({ message: "user created", user, status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { message: "Internal server error, please contact admin" },
      { status: 500 }
    );
  }
}