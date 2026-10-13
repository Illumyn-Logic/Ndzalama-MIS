import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      province,
      townCity,
      address,
      idOrPassportNumber,
      postalCode,
    } = body;

    if (!email || !password || !firstName || !idOrPassportNumber || !postalCode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: "PROSPECTIVE_LEARNER", // Default role for public registrations
        profile: {
          create: {
            firstName,
            lastName: lastName || "",
            phone: phone || "",
            province: province || "",
            suburbCity: townCity || "",
            streetAddress: address || "",
            idOrPassportNumber,
            postalCode,
            dateOfBirth: new Date("2000-01-01"), // Placeholder, update via profile settings later
            gender: "PREFER_NOT_TO_SAY",
            equity: "OTHER",
            citizenStatus: "SA_CITIZEN",
            homeLanguage: "English",
            socioEconomicStatus: "EMPLOYED",
            disability: "NONE",
          },
        },
      },
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}