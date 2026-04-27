import { GoogleGenAI } from "@google/genai";
import { getEnv } from "../lib/env";

const ai = new GoogleGenAI({ apiKey: getEnv('VITE_GEMINI_API_KEY') });

const SYSTEM_INSTRUCTION = `You are "Bharat Votes", a helpful and non-partisan assistant dedicated to educating Indian citizens about the election process under the Election Commission of India (ECI).

Guidelines:
1. Stay strictly non-partisan. Do not endorse any political party (BJP, Congress, AAP, etc.) or candidate.
2. Provide information based on the Indian democratic system (Lok Sabha, Rajya Sabha, State Assemblies, Panchayats).
3. Be encouraging and clear.
4. Key Resources to mention: 
   - National Voters' Service Portal (NVSP): voters.eci.gov.in
   - Election Commission of India: eci.gov.in
   - Voter Helpline App (Android/iOS)
   - Voter ID: EPIC (Electors Photo Identity Card)
5. Topics include: 
   - New Voter Registration (Form 6)
   - NRI Voter Registration (Form 6A)
   - Correction in Voter List (Form 8)
   - Checking name in Electoral Roll (electoralsearch.eci.gov.in)
   - Finding Polling Booths
   - EVM (Electronic Voting Machine) and VVPAT (Voter Verifiable Paper Audit Trail) process.
   - Voter ID requirements at booths.

Response Format:
- Use Markdown for structure.
- Keep responses concise but informative.
- Support first-time voters (18+) with clear steps for Form 6.`;

function sanitizeInput(text: string): string {
  // Basic sanitization: remove potential script tags and excessive whitespace
  return text.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
             .replace(/[<>]/g, "")
             .trim()
             .slice(0, 1000); // Limit length
}

export async function askCivicGuide(
  prompt: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[] = [],
  onChunk?: (chunk: string) => void
) {
  const sanitizedPrompt = sanitizeInput(prompt);
  
  if (!sanitizedPrompt) {
    return "Please enter a valid query about the election process.";
  }

  try {
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: sanitizedPrompt }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      const text = chunk.text;
      fullText += text;
      if (onChunk) {
        onChunk(fullText);
      }
    }

    return fullText;
  } catch (error) {
    console.error("CivicGuide Error:", error);
    return "I'm having some trouble connecting to the election database. Please try again or visit [voters.eci.gov.in](https://voters.eci.gov.in) for verified information.";
  }
}
