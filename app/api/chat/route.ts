import { OpenAI } from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getContext } from "@/lib/rag";
import { db } from "@/lib/db";

// export const runtime = "edge"; // Disabled for Prisma compatibility

import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const { success } = rateLimit(ip);

    if (!success) {
      return new Response("Too Many Requests", { status: 429 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-build",
    });

    const { messages, chatbotId, sessionId } = await req.json();
    const lastMessage = messages[messages.length - 1];

    // 1. Get Context from Knowledge Base
    const context = await getContext(lastMessage.content, chatbotId);

    // 2. Build System Prompt
    const systemPrompt = `You are a helpful customer service assistant.
    
    CONTEXT FROM KNOWLEDGE BASE:
    ${context}
    
    INSTRUCTIONS:
    - Answer questions using ONLY the information provided in the context above.
    - If the answer is not in the context, say "I don't have that information, but I can connect you with someone who can help."
    - Be friendly, professional, and concise.
    - Keep responses under 3 sentences unless more detail is needed.
    `;

    // 3. Call OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      temperature: 0.7,
    });

    // 4. Stream Response
    const stream = OpenAIStream(response as any, {
      onCompletion: async (completion) => {
        // Log conversation to DB (fire and forget)
        // We need to use a non-edge compatible DB client or call an internal API
        // For now, we'll skip DB logging in edge runtime or use a fetch call to a standard API route
        // await saveMessage(chatbotId, sessionId, "user", lastMessage.content);
        // await saveMessage(chatbotId, sessionId, "assistant", completion);
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("[CHAT_POST]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
