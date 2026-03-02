import { GoogleGenAI, Type } from "@google/genai";
import { DrawResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const getAIInsights = async (history: DrawResult[]) => {
  const historyStr = history.map(d => `Data: ${d.date}, Números: ${d.numbers.join(',')}, Estrelas: ${d.stars.join(',')}`).join('\n');

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analisa os seguintes resultados recentes do Euromilhões e fornece insights estatísticos e 3 sugestões de chaves baseadas em lógica probabilística (embora saibamos que é um jogo de azar).
    
    Histórico:
    ${historyStr}
    
    Responde em Português de Portugal.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: {
            type: Type.STRING,
            description: "Análise detalhada das tendências e padrões observados.",
          },
          suggestedKeys: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                numbers: {
                  type: Type.ARRAY,
                  items: { type: Type.INTEGER },
                  description: "5 números sugeridos (1-50).",
                },
                stars: {
                  type: Type.ARRAY,
                  items: { type: Type.INTEGER },
                  description: "2 estrelas sugeridas (1-12).",
                },
              },
              required: ["numbers", "stars"],
            },
          },
        },
        required: ["analysis", "suggestedKeys"],
      },
    },
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
};
