import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RESUME_CONTEXT } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return aiClient;
};

export const sendChatMessage = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // We recreate the chat session for each message to simplify state management in this demo,
    // but typically you'd keep a persistent Chat object.
    // Here we construct the full history + system instruction.
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: RESUME_CONTEXT,
      },
      history: history,
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I'm brainstorming... try asking again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! My AI brain hit a snag. Please try again later.";
  }
};
