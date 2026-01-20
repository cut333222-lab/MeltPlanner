
import React, { useState, useEffect } from 'react';
import { generateMarketingCopy } from '../services/geminiService';
import { MarketingAction } from '../types';

interface GeminiAssistantProps {
  selectedAction: MarketingAction | null;
  weekTheme: string;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ selectedAction, weekTheme }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  // Clear suggestion when changing action
  useEffect(() => {
    setSuggestion(null);
  }, [selectedAction]);

  const handleGenerate = async () => {
    if (!selectedAction) return;
    setLoading(true);
    const result = await generateMarketingCopy(
      selectedAction.description,
      weekTheme,
      selectedAction.stage
    );
    setSuggestion(result || null);
    setLoading(false);
  };

  if (!selectedAction) {
    return (
      <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 min-h-[200px] lg:h-full flex flex-col items-center justify-center text-center text-zinc-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 opacity-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <p className="text-xs font-bold uppercase tracking-widest">Selecciona una tarea</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 p-5 md:p-6 rounded-xl border border-zinc-800 flex flex-col overflow-hidden max-h-[500px] lg:max-h-full lg:h-full shadow-2xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-indigo-500/10 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z" />
          </svg>
        </div>
        <div>
          <h3 className="font-black text-white uppercase tracking-widest text-[10px]">IA Assistant</h3>
          <p className="text-[9px] text-zinc-500 font-bold uppercase">{selectedAction.title}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
        <div className="bg-zinc-800/30 p-3 rounded-lg border border-zinc-800">
          <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest">Brief</span>
          <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed">{selectedAction.description}</p>
        </div>

        {suggestion ? (
          <div className="bg-zinc-950 p-4 rounded-lg border border-indigo-500/20 whitespace-pre-wrap text-[12px] text-zinc-200 leading-relaxed font-light">
            {suggestion}
          </div>
        ) : (
          <div className="py-12 border border-dashed border-zinc-800 rounded-lg text-center">
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">¿Listo para el copy?</p>
          </div>
        )}
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full mt-5 py-4 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black rounded-lg transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/10 active:scale-95"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-3 w-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </span>
        ) : (
          "Generar Estrategia de Copy"
        )}
      </button>
    </div>
  );
};

export default GeminiAssistant;
