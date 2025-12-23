
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, GroundingSource } from "../types";

/**
 * Searches for real-world media information using Gemini 3 Flash and Google Search tool.
 */
export const searchWithGrounding = async (query: string): Promise<AnalysisResult> => {
  // Fixed: Initialize GoogleGenAI with process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find up-to-date information about: ${query}. Provide a concise summary and key highlights.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter((chunk: any) => chunk.web)
      ?.map((chunk: any) => ({
        title: chunk.web.title || 'Source',
        uri: chunk.web.uri
      })) || [];

    return {
      summary: response.text || "No information found.",
      details: "",
      sources
    };
  } catch (error) {
    console.error("Gemini Grounding Search Error:", error);
    throw error;
  }
};

/**
 * Performs complex media reasoning using Gemini 3 Pro with deep thinking enabled.
 */
export const deepReasoningAnalysis = async (query: string): Promise<string> => {
  // Fixed: Initialize GoogleGenAI with process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Provide a comprehensive, deep architectural and creative analysis of the following media topic: ${query}. Think through the cultural impact, technical execution, and artistic significance.`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      },
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini Deep Reasoning Error:", error);
    throw error;
  }
};

/**
 * Quick analysis for content features.
 */
export const analyzeContent = async (text: string): Promise<string> => {
  // Fixed: Initialize GoogleGenAI with process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this content and give me 5 interesting facts: ${text}`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Quick Analysis Error:", error);
    throw error;
  }
};
