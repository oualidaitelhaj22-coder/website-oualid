
import { GoogleGenAI, Type } from "@google/genai";
import type { AppraisalResult } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // This is a fallback for development; in a real environment, the key should be set.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    estimatedValue: {
      type: Type.NUMBER,
      description: "The estimated monetary value of the domain in USD. No commas or currency symbols. Example: 1500",
    },
    valueRange: {
      type: Type.STRING,
      description: "A plausible value range. Example: '$1,200 - $1,800'",
    },
    explanation: {
      type: Type.STRING,
      description: "A detailed paragraph explaining the valuation based on various factors.",
    },
    keyFactors: {
      type: Type.ARRAY,
      description: "An analysis of key valuation factors.",
      items: {
        type: Type.OBJECT,
        properties: {
          factor: { type: Type.STRING, description: "The name of the factor (e.g., 'Keyword Strength', 'Length', 'Brandability', 'TLD')." },
          score: { type: Type.NUMBER, description: "A score from 1 to 10 for this factor." },
          analysis: { type: Type.STRING, description: "A brief one-sentence analysis of this factor." },
        },
        required: ["factor", "score", "analysis"],
      },
    },
    comparableSales: {
      type: Type.ARRAY,
      description: "A list of 3-5 similar domain names that have been sold, with their sale prices.",
      items: {
        type: Type.OBJECT,
        properties: {
          domain: { type: Type.STRING, description: "The comparable domain name sold." },
          price: { type: Type.NUMBER, description: "The sale price in USD." },
        },
        required: ["domain", "price"],
      },
    },
    similarAvailableDomains: {
        type: Type.ARRAY,
        description: "A list of 3-5 similar domain names that are likely available for registration.",
        items: {
            type: Type.STRING,
        }
    }
  },
  required: ["estimatedValue", "valueRange", "explanation", "keyFactors", "comparableSales", "similarAvailableDomains"],
};


export const appraiseDomain = async (domainName: string): Promise<AppraisalResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `Please provide a detailed appraisal for the domain name: "${domainName}"`,
      config: {
        systemInstruction: "You are an expert domain name appraiser. Your task is to provide a comprehensive and realistic valuation for a given domain name. Your analysis must be based on established industry criteria such as keyword relevance, length, TLD extension (.com is highest value), brandability, memorability, and commercial potential. Provide your response in the requested JSON format.",
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText) as AppraisalResult;

    // Basic validation
    if (typeof parsedResult.estimatedValue !== 'number' || !Array.isArray(parsedResult.keyFactors)) {
      throw new Error('Invalid JSON structure received from API.');
    }
    
    return parsedResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get appraisal from AI model.");
  }
};
