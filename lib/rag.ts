import { Pinecone } from "@pinecone-database/pinecone";

export const getPineconeClient = () => {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

export interface DocumentMetadata {
  chatbotId: string;
  text: string;
  documentId: string;
  [key: string]: any;
}

export async function embedDocument(
  documentId: string,
  embeddings: number[],
  metadata: DocumentMetadata
) {
  try {
    const client = getPineconeClient();
    const index = client.Index(process.env.PINECONE_INDEX || "chatassist");
    
    // Namespace by chatbot ID or organization ID for isolation
    // We'll use the chatbot ID passed in metadata
    const namespace = index.namespace(metadata.chatbotId);

    await namespace.upsert([
      {
        id: documentId,
        values: embeddings,
        metadata: {
          text: metadata.text,
          documentId: metadata.documentId,
        },
      },
    ]);
  } catch (error) {
    console.log("Error embedding document:", error);
    throw error;
  }
}

export async function getContext(query: string, chatbotId: string) {
  try {
    const client = getPineconeClient();
    const index = client.Index(process.env.PINECONE_INDEX || "chatassist");
    const namespace = index.namespace(chatbotId);

    // Generate embedding for the query
    // We need to import getEmbeddings here or pass it in. 
    // To avoid circular dependency if getEmbeddings uses something from here (it doesn't), 
    // but let's import it dynamically or move getEmbeddings to a separate file (it is in lib/embeddings.ts).
    const { getEmbeddings } = await import("@/lib/embeddings");
    const queryEmbedding = await getEmbeddings(query);

    const queryResponse = await namespace.query({
      vector: queryEmbedding,
      topK: 5,
      includeMetadata: true,
    });

    const context = queryResponse.matches
      .map((match) => match.metadata?.text)
      .filter((text) => text !== undefined)
      .join("\n\n---\n\n");

    return context;
  } catch (error) {
    console.log("Error getting context:", error);
    return "";
  }
}
