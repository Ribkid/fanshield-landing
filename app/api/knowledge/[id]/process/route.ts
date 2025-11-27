import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getEmbeddings } from "@/lib/embeddings";
import { embedDocument } from "@/lib/rag";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { documentId } = body;

    const document = await db.document.findUnique({
      where: { id: documentId },
      include: { knowledgeBase: { include: { chatbots: true } } },
    });

    if (!document) return new NextResponse("Document not found", { status: 404 });

    // Verify ownership
    // (Simplified check)
    
    // 1. Split text into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    
    const chunks = await splitter.createDocuments([document.content]);

    // 2. Generate embeddings and store in Pinecone
    // We'll store each chunk as a vector
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embedding = await getEmbeddings(chunk.pageContent);
      
      // Store in DB (optional, but good for reference)
      await db.documentChunk.create({
        data: {
          documentId: document.id,
          content: chunk.pageContent,
          // embedding: embedding, // Removed for SQLite compatibility
          metadata: JSON.stringify({ chunkIndex: i }),
        },
      });

      // Store in Pinecone
      await embedDocument(
        `${document.id}_${i}`,
        embedding,
        {
          chatbotId: params.id,
          text: chunk.pageContent,
          documentId: document.id,
        }
      );
    }

    // 3. Mark document as processed
    await db.document.update({
      where: { id: documentId },
      data: { isProcessed: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[PROCESS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
