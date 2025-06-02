import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  // Check if the last message is asking about the name
  const lastMessage = messages[messages.length - 1];
  const nameQuestions = [
    "what is your name",
    "who are you",
    "what should i call you",
    "what's your name"
  ];
  
  if (lastMessage && nameQuestions.some(q => lastMessage.content.toLowerCase().includes(q))) {
    return new Response(
      JSON.stringify({
        text: "I am Indica Chat, developed by Paras Gupta and powered by Gminia Google."
      }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages,
  });
  return result.toDataStreamResponse();
}
