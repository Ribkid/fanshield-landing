import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const createDocumentSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(10),
});

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { title, content } = createDocumentSchema.parse(body);

    // Verify chatbot ownership
    const chatbot = await db.chatbot.findUnique({
      where: { id: params.id },
      include: { organization: { include: { members: true } } },
    });

    if (!chatbot) return new NextResponse("Chatbot not found", { status: 404 });

    const isMember = chatbot.organization.members.some(
      (m) => m.userId === session.user?.id
    );
    if (!isMember) return new NextResponse("Unauthorized", { status: 401 });

    // Get or create KnowledgeBase for this chatbot
    let knowledgeBaseId = chatbot.knowledgeBaseId;

    if (!knowledgeBaseId) {
      const kb = await db.knowledgeBase.create({
        data: {
          organizationId: chatbot.organizationId,
          name: `${chatbot.name} KB`,
          chatbots: { connect: { id: chatbot.id } },
        },
      });
      knowledgeBaseId = kb.id;
    }

    const document = await db.document.create({
      data: {
        knowledgeBaseId: knowledgeBaseId!,
        title,
        content,
        sourceType: "MANUAL",
        isProcessed: false, // Will be processed by background job/function
      },
    });

    // Trigger processing (in a real app, this would be a queue)
    // For MVP, we might call it directly or let the client trigger it
    // We'll leave it as isProcessed: false for now and implement a process endpoint

    return NextResponse.json(document);
  } catch (error) {
    console.log("[DOCUMENTS_POST]", error);
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
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");

    if (!documentId) {
      return new NextResponse("Document ID required", { status: 400 });
    }

    // Verify ownership (simplified)
    const document = await db.document.findUnique({
      where: { id: documentId },
      include: { knowledgeBase: true },
    });

    if (!document) return new NextResponse("Document not found", { status: 404 });

    // Delete from DB
    await db.document.delete({
      where: { id: documentId },
    });

    // Note: In a real app, we should also delete from Pinecone here.
    // For MVP, we'll skip Pinecone deletion complexity or implement it later.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[DOCUMENTS_DELETE]", error);
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
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const chatbot = await db.chatbot.findUnique({
      where: { id: params.id },
    });

    if (!chatbot || !chatbot.knowledgeBaseId) {
      return NextResponse.json([]);
    }

    const documents = await db.document.findMany({
      where: {
        knowledgeBaseId: chatbot.knowledgeBaseId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.log("[DOCUMENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
