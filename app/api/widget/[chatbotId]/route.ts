import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  props: { params: Promise<{ chatbotId: string }> }
) {
  const params = await props.params;
  try {
    const chatbot = await db.chatbot.findUnique({
      where: {
        id: params.chatbotId,
      },
      select: {
        id: true,
        name: true,
        welcomeMessage: true,
        primaryColor: true,
        position: true,
        isActive: true,
      },
    });

    if (!chatbot) {
      return new NextResponse("Chatbot not found", { status: 404 });
    }

    if (!chatbot.isActive) {
      return new NextResponse("Chatbot is inactive", { status: 403 });
    }

    // Add CORS headers
    return NextResponse.json(chatbot, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error) {
    console.log("[WIDGET_CONFIG_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
