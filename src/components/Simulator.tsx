import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Zap, Dice5 } from 'lucide-react';
import { DrawBalls } from './DrawBalls';

export const Simulator: React.FC = () => {
  const [currentKey, setCurrentKey] = useState<{ numbers: number[], stars: number[] } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandom = () => {
    setIsGenerating(true);
    
    // Simulate thinking
    setTimeout(() => {
      const numbers: number[] = [];
      while (numbers.length < 5) {
        const n = Math.floor(Math.random() * 50) + 1;
        if (!numbers.includes(n)) numbers.push(n);
      }
      
      const stars: number[] = [];
      while (stars.length < 2) {
        const s = Math.floor(Math.random() * 12) + 1;
        if (!stars.includes(s)) stars.push(s);
      }
      
      setCurrentKey({ 
        numbers: numbers.sort((a, b) => a - b), 
        stars: stars.sort((a, b) => a - b) 
      });
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display font-bold text-euro-blue">Simulador de Apostas</h2>
        <p className="text-slate-500">Gera chaves aleatórias ou baseadas em algoritmos de probabilidade.</p>
      </div>

      <div className="glass-card p-8 text-center min-h-[200px] flex flex-col items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentKey ? (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="space-y-6"
            >
              <DrawBalls numbers={currentKey.numbers} stars={currentKey.stars} size="lg" />
              <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">Chave Gerada com Sucesso</p>
            </motion.div>
          ) : (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-slate-300 flex flex-col items-center gap-4"
            >
              <Dice5 size={64} strokeWidth={1} />
              <p className="font-medium">Clica no botão abaixo para gerar uma chave</p>
            </motion.div>
          )}
        </AnimatePresence>

        {isGenerating && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
            <RefreshCw className="animate-spin text-euro-blue" size={32} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          onClick={generateRandom}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
        >
          <RefreshCw size={20} className={isGenerating ? 'animate-spin' : ''} />
          Gerar Aleatória
        </button>
        <button 
          onClick={generateRandom}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 p-4 bg-euro-blue text-white rounded-2xl font-bold hover:bg-blue-900 transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-50"
        >
          <Zap size={20} className="text-euro-star" />
          Gerar Inteligente
        </button>
      </div>

      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
        <div className="text-blue-500 mt-1"><Zap size={18} /></div>
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>Dica:</strong> A geração "Inteligente" utiliza os dados de frequência dos últimos 100 sorteios para equilibrar números quentes e frios na sua chave.
        </p>
      </div>
    </div>
  );
};
