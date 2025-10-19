
import { GoogleGenAI } from "@google/genai";

// Per guidelines, API_KEY is assumed to be available in the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const suggestRoute = async (startPoint: string): Promise<string> => {
  try {
    const prompt = `I am a rideshare driver in Baku, Azerbaijan starting my trip from "${startPoint}". 
    Suggest a single, popular, and potentially profitable destination for a ride during evening rush hour, considering traffic and potential passenger demand.
    Give me just the destination name, nothing else. For example: Ganjlik Mall`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error suggesting route with Gemini:", error);
    return "Error: Could not get suggestion.";
  }
};