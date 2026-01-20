
import { GoogleGenAI } from "@google/genai";

export const generateMarketingCopy = async (task: string, theme: string, stage: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Actúa como un experto en marketing musical para un sello underground de vinilos llamado "Melt Label". 
  El concepto es "táctil", "contacto", "fisicalidad" y "made from artists to artists".
  
  Tarea: ${task}
  Tema de la semana: ${theme}
  Etapa del funnel: ${stage}
  
  Genera 3 opciones de copy (una para Instagram, una corta para X y una para un correo o DM personalizado). 
  El tono debe ser auténtico, crudo, profesional pero cercano a la comunidad clubbing. Usa español.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating copy:", error);
    return "Lo siento, no pude generar el contenido en este momento. Inténtalo de nuevo.";
  }
};
