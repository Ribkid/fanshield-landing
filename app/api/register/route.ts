import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = registerSchema.parse(body);

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        name,
        passwordHash: hashedPassword,
        organizations: {
          create: {
            organization: {
              create: {
                name: `${name}'s Org`,
                slug: name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.random().toString(36).substr(2, 4),
              },
            },
            role: "OWNER",
          },
        },
      },
    });

    return NextResponse.json(
      { user: { email: user.email, name: user.name } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
