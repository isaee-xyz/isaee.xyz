import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RESUME_CONTEXT } from "../constants";

let aiClient: GoogleGenAI | null = null;

// SECURITY NOTE: this is a fully static site, so any key placed here ships to
// every visitor's browser. Only use a key that is restricted (HTTP referrer
// restriction to isaee.xyz in Google Cloud Console) and quota-capped, or leave
// it unset to run in demo mode. For unrestricted keys, proxy through a backend.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? "";

const getAiClient = () => {
  if (!API_KEY) return null;

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: API_KEY });
  }
  return aiClient;
};

export const sendChatMessage = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const ai = getAiClient();

    // If no API key is present, return a static response to prevent crashes
    if (!ai) {
      return "I'm currently running in demo mode without an active API Key. Please configure the API Key to chat with me! Twinkle is a Product Growth Manager building Howtohelp.in for YC Winter 2026.";
    }

    // We recreate the chat session for each message to simplify state management,
    // but typically you'd keep a persistent Chat object.
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
