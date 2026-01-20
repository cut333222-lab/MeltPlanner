
import React, { useState, useMemo } from 'react';
import { INITIAL_PLAN, FUNNEL_COLORS } from './constants';
import { MarketingAction, WeekPlan, FunnelStage } from './types';
import TaskCard from './components/TaskCard';
import GeminiAssistant from './components/GeminiAssistant';

const App: React.FC = () => {
  const [plan, setPlan] = useState<WeekPlan[]>(INITIAL_PLAN);
  const [selectedAction, setSelectedAction] = useState<MarketingAction | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const currentWeekTheme = useMemo(() => {
    if (!selectedAction) return "";
    const week = plan.find(w => w.actions.some(a => a.id === selectedAction.id));
    return week?.mainTheme || "";
  }, [selectedAction, plan]);

  const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1);

  const getActionForDay = (day: number) => {
    return plan.flatMap(w => w.actions).find(a => a.day === day);
  };

  const usdcAddress = "0xA323E16FB9F82B873ada0814A23B5289Ef0Be485";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(usdcAddress);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-[#0a0a0a] px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-50">
        <div className="text-center md:text-left">
          <h1 className="text-xl md:text-3xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            MELT LABEL <span className="text-indigo-500">/</span> PLANNER
          </h1>
          <p className="text-zinc-500 text-[9px] md:text-xs mt-1 font-medium tracking-[0.2em] uppercase">Vinyl Launch Campaign</p>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 max-w-full no-scrollbar">
          {Object.values(FunnelStage).map((stage) => (
            <div key={stage} className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">
              <div className={`w-1.5 h-1.5 rounded-full ${FUNNEL_COLORS[stage].split(' ')[0]}`} />
              <span className="text-[8px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{stage}</span>
            </div>
          ))}
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row p-4 md:p-8 gap-6 md:gap-8 overflow-hidden">
        {/* Calendar Grid Section */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-zinc-800 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
              <div key={day} className="hidden lg:block bg-zinc-900 py-3 text-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
                {day}
              </div>
            ))}
            
            {daysInMonth.map((day) => {
              const action = getActionForDay(day);
              const weekNum = Math.ceil(day / 7);
              const isFirstInWeek = day % 7 === 1;

              return (
                <div 
                  key={day} 
                  className={`min-h-[120px] md:min-h-[140px] bg-zinc-900/40 p-2 relative group transition-colors hover:bg-zinc-900/60 flex flex-col ${isFirstInWeek && 'lg:border-l lg:border-zinc-800'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-[10px] font-bold ${action ? 'text-white' : 'text-zinc-700'}`}>
                      Día {day.toString().padStart(2, '0')}
                    </span>
                    {isFirstInWeek && (
                      <span className="text-[9px] font-black text-indigo-500 uppercase opacity-40">W{weekNum}</span>
                    )}
                  </div>
                  
                  {action ? (
                    <TaskCard action={action} onClick={setSelectedAction} />
                  ) : (
                    <div className="flex-1 rounded-lg border border-dashed border-zinc-800/30 flex items-center justify-center opacity-40 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] text-zinc-800 uppercase font-bold lg:hidden">Idle</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex lg:grid lg:grid-cols-4 gap-4 mt-8 overflow-x-auto pb-4 no-scrollbar">
            {plan.map((week) => (
              <div key={week.weekNumber} className="flex-shrink-0 w-64 lg:w-auto bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase">S{week.weekNumber}</span>
                  <div className="h-1 w-8 bg-zinc-800 rounded-full" />
                </div>
                <h3 className="font-bold text-xs text-zinc-100 mb-1 truncate">{week.mainTheme}</h3>
                <p className="text-[10px] text-zinc-500 font-medium italic line-clamp-2">{week.objective}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Assistant & Detail Section */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="flex-1 lg:overflow-hidden lg:h-[400px]">
             <GeminiAssistant 
              selectedAction={selectedAction} 
              weekTheme={currentWeekTheme} 
            />
          </div>
          
          {/* Concept Section */}
          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Concepto</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-1 h-auto bg-indigo-500 rounded-full flex-shrink-0" />
                <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                  "Contacto / Tacto / Táctil / Fisicalidad. El punto de encuentro físico en un mundo digital. Made from artists to artists."
                </p>
              </div>
            </div>
          </div>

          {/* USDC Section */}
          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 mb-4 lg:mb-0">
            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Support & Payments</h3>
            <div className="space-y-4">
              <p className="text-[11px] text-zinc-300">Esta es mi dirección USDC:</p>
              
              <div className="relative group">
                <div className="bg-black/50 p-3 rounded border border-zinc-800 text-[10px] font-mono break-all text-zinc-400 select-all">
                  {usdcAddress}
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="mt-2 w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-[9px] font-bold uppercase tracking-widest rounded transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {copySuccess ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Copiado
                    </span>
                  ) : (
                    "Copiar Dirección"
                  )}
                </button>
              </div>

              <div className="p-3 bg-red-900/10 border border-red-900/30 rounded-lg">
                <p className="text-[10px] text-red-400 font-medium leading-relaxed">
                  🚨 Recuerda que para depositar USDC en mi billetera, debes hacerlo a través de la red <span className="font-black underline">BASE</span>, que es la que soporta a Lemon. De lo contrario, los fondos se perderán.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center border-t border-zinc-900 text-[9px] md:text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em] bg-[#050505]">
        © 2026 Melt Label • Tacto • Fisicalidad • Comunidad
      </footer>
    </div>
  );
};

export default App;
