import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const updateChatbotSchema = z.object({
  name: z.string().min(1).optional(),
  welcomeMessage: z.string().min(1).optional(),
  primaryColor: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
});

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // The rest of the POST function body would go here, but was not provided in the instruction.
    // For now, returning an empty response or an error to maintain syntactical correctness.
    return new NextResponse("Not Implemented", { status: 501 });
  } catch (error) {
    console.log("[CHATBOT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chatbot = await db.chatbot.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!chatbot) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(chatbot);
  } catch (error) {
    console.log("[CHATBOT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, welcomeMessage, primaryColor, isActive } =
      updateChatbotSchema.parse(body);

    const chatbot = await db.chatbot.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        welcomeMessage,
        primaryColor,
        isActive,
      },
    });

    return NextResponse.json(chatbot);
  } catch (error) {
    console.log("[CHATBOT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chatbot = await db.chatbot.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(chatbot);
  } catch (error) {
    console.log("[CHATBOT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
