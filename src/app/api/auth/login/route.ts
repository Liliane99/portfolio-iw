import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; 

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AITABLE_TABLE_USERS, JWT_SECRET } = process.env;
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AITABLE_TABLE_USERS}`;

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    
    const res = await fetch(`${AIRTABLE_API_URL}?filterByFormula=({email}="${email}")`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data = await res.json();
    const record = data.records[0];

    if (!record) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = record.fields;

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    
    const token = jwt.sign({ id: record.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });

    
    cookies().set("token", token, {
      path: "/", 
      maxAge: 60 * 60 * 24, 
    });
    

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
