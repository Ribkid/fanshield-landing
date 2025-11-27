import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const orgMember = await db.organizationMember.findFirst({
      where: { userId: session.user?.id },
    });

    if (!orgMember) return new NextResponse("Org not found", { status: 404 });

    const leads = await db.lead.findMany({
      where: {
        chatbot: {
          organizationId: orgMember.organizationId,
        },
      },
      include: {
        chatbot: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.log("[LEADS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
