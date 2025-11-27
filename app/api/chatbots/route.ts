import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const createChatbotSchema = z.object({
  name: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = createChatbotSchema.parse(body);

    // Get user's organization (assuming single org for MVP)
    const orgMember = await db.organizationMember.findFirst({
      where: {
        userId: session.user?.id,
      },
    });

    if (!orgMember) {
      return new NextResponse("Organization not found", { status: 404 });
    }

    const chatbot = await db.chatbot.create({
      data: {
        name,
        organizationId: orgMember.organizationId,
      },
    });

    return NextResponse.json(chatbot);
  } catch (error) {
    console.log("[CHATBOTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const orgMember = await db.organizationMember.findFirst({
      where: {
        userId: session.user?.id,
      },
    });

    if (!orgMember) {
      return new NextResponse("Organization not found", { status: 404 });
    }

    const chatbots = await db.chatbot.findMany({
      where: {
        organizationId: orgMember.organizationId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(chatbots);
  } catch (error) {
    console.log("[CHATBOTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
