import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AITABLE_TABLE_USERS, JWT_SECRET } = process.env;
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AITABLE_TABLE_USERS}`;

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 🔥 Maintenant on CHERCHE l'utilisateur au lieu de créer
    const res = await fetch(`${AIRTABLE_API_URL}?filterByFormula=({email}="${email}")`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data = await res.json();
    const record = data.records[0];

    if (!record) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = record.fields;

    // 🔥 Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // 🔥 Générer un JWT
    const token = jwt.sign(
      { id: record.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
