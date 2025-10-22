
import { GoogleGenAI, Type } from "@google/genai";
import type { AppraisalResult, GeneratedDomain, ExtractedDomains } from '../types';

// IMPORTANT: The API key must be available as an environment variable.
// Do not hardcode the API key in the code.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully, maybe show a message in the UI.
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Appraises a domain name using the Gemini API.
 * @param domain - The domain name to appraise.
 * @returns A promise that resolves to an AppraisalResult object.
 */
export const appraiseDomain = async (domain: string): Promise<AppraisalResult> => {
  const prompt = `You are a world-class domain name valuation expert. Analyze the domain '${domain}' based on factors like length, memorability, keyword strength, TLD quality, and commercial potential. Provide an estimated value, a realistic resale range, brandability and SEO scores from 1-100, a TLD quality assessment ('Premium', 'High-Quality', 'Standard', 'Low-Quality'), and a list of 5 recent, comparable domain sales with their prices (these can be realistic estimations). Respond ONLY with a valid JSON object matching the provided schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            domainName: { type: Type.STRING },
            estimatedValue: { type: Type.NUMBER },
            resaleRange: { type: Type.STRING },
            brandabilityScore: { type: Type.INTEGER },
            seoScore: { type: Type.INTEGER },
            tldQuality: { type: Type.STRING },
            comparableSales: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  domain: { type: Type.STRING },
                  price: { type: Type.NUMBER },
                },
                required: ['domain', 'price'],
              },
            },
          },
          required: ['domainName', 'estimatedValue', 'resaleRange', 'brandabilityScore', 'seoScore', 'tldQuality', 'comparableSales'],
        },
      },
    });

    const jsonText = response.text.trim();
    // In a real application, you might want more robust validation here.
    return JSON.parse(jsonText) as AppraisalResult;

  } catch (error) {
    console.error("Error in appraiseDomain:", error);
    throw new Error("Failed to get appraisal from AI model.");
  }
};

/**
 * Generates domain name suggestions using the Gemini API.
 * @param keyword - The keyword or niche to base suggestions on.
 * @param tlds - An array of TLDs to use for suggestions.
 * @param length - The desired length of the domain names.
 * @returns A promise that resolves to an array of GeneratedDomain objects.
 */
export const generateDomainNames = async (keyword: string, tlds: string[], length: string): Promise<GeneratedDomain[]> => {
  let lengthInstruction = '';
  if (length !== 'any') {
    if (length === 'short') {
      lengthInstruction = 'The domain name length should be short (4-6 characters).';
    } else if (length === 'medium') {
      lengthInstruction = 'The domain name length should be medium (7-12 characters).';
    } else if (length === 'long') {
      lengthInstruction = 'The domain name length should be long (13 characters or more).';
    }
  }

  const prompt = `You are an AI domain name expert. Generate a list of 10-15 creative, brandable, and catchy domain name ideas based on the keyword '${keyword}'.
  ${lengthInstruction}
  Only use the following Top-Level Domains (TLDs): ${tlds.join(', ')}.
  For each domain name, estimate its availability and provide a status. The status must be one of the following three options: 'Likely Available', 'Maybe Taken', or 'Likely Taken'. Base your estimation on factors like keyword popularity, length, and common naming patterns.
  Do not suggest domains that are obviously premium or taken by major brands. Focus on creative and available options.
  Respond ONLY with a valid JSON array of objects matching the provided schema.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              status: { type: Type.STRING },
            },
            required: ['name', 'status'],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as GeneratedDomain[];

  } catch (error) {
    console.error("Error in generateDomainNames:", error);
    throw new Error("Failed to generate domain names from AI model.");
  }
};

/**
 * Extracts domains containing a keyword using the Gemini API.
 * @param keyword - The keyword to search for in domains.
 * @returns A promise that resolves to an ExtractedDomains object.
 */
export const extractDomains = async (keyword: string): Promise<ExtractedDomains> => {
  const prompt = `You are a domain research tool. Based on the keyword '${keyword}', extract and list all plausible domain names that contain this keyword. Group them by their Top-Level Domain (TLD), including .com, .net, .org, .io, and .ai. For each TLD, provide at least 5-10 examples if possible. Respond ONLY with a valid JSON object matching the provided schema, where keys are the TLDs (e.g., '.com') and values are arrays of domain name strings.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ".com": { type: Type.ARRAY, items: { type: Type.STRING } },
            ".net": { type: Type.ARRAY, items: { type: Type.STRING } },
            ".org": { type: Type.ARRAY, items: { type: Type.STRING } },
            ".io": { type: Type.ARRAY, items: { type: Type.STRING } },
            ".ai": { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as ExtractedDomains;

  } catch (error) {
    console.error("Error in extractDomains:", error);
    throw new Error("Failed to extract domains from AI model.");
  }
};
