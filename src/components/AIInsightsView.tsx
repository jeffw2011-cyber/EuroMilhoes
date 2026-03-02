import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { getAIInsights } from '../services/aiService';
import { DrawResult, AIInsight } from '../types';
import { DrawBalls } from './DrawBalls';
import Markdown from 'react-markdown';

interface AIInsightsViewProps {
  history: DrawResult[];
}

export const AIInsightsView: React.FC<AIInsightsViewProps> = ({ history }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAIInsights(history);
      if (data) {
        setInsight(data);
      } else {
        throw new Error("Não foi possível obter insights da IA.");
      }
    } catch (err) {
      setError("Erro ao consultar a Gemini API. Verifica a tua ligação ou chave de API.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-euro-blue rounded-2xl text-white shadow-lg mb-2">
          <Brain size={32} />
        </div>
        <h2 className="text-3xl font-display font-bold text-euro-blue">Insights de IA (Gemini)</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Utilizamos inteligência artificial avançada para analisar padrões históricos e fornecer sugestões baseadas em lógica probabilística.
        </p>
      </div>

      {!insight && !isLoading && (
        <div className="glass-card p-12 text-center">
          <Sparkles className="mx-auto text-euro-star mb-4" size={48} />
          <h3 className="text-xl font-bold mb-4">Pronto para a análise?</h3>
          <p className="text-slate-500 mb-8">A IA irá processar os últimos sorteios para identificar tendências ocultas.</p>
          <button 
            onClick={fetchInsights}
            className="bg-euro-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-900 transition-all shadow-lg flex items-center gap-2 mx-auto"
          >
            Começar Análise <RefreshCw size={18} />
          </button>
        </div>
      )}

      {isLoading && (
        <div className="glass-card p-12 text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-euro-blue border-t-transparent rounded-full animate-spin" />
            <Brain className="absolute inset-0 m-auto text-euro-blue animate-pulse" size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-euro-blue">A Gemini está a pensar...</h3>
            <p className="text-slate-400 text-sm animate-pulse">Analisando milhares de combinações possíveis e padrões históricos.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <AnimatePresence>
        {insight && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <section className="glass-card p-8">
              <h3 className="text-xl font-display font-bold text-euro-blue mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-euro-star" />
                Análise de Tendências
              </h3>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <Markdown>{insight.analysis}</Markdown>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-display font-bold text-euro-blue">Chaves Sugeridas pela IA</h3>
              <div className="grid grid-cols-1 gap-4">
                {insight.suggestedKeys.map((key, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-purple-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <span className="font-medium text-slate-700">Sugestão Probabilística</span>
                    </div>
                    <DrawBalls numbers={key.numbers} stars={key.stars} />
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="text-center">
              <button 
                onClick={fetchInsights}
                className="text-slate-400 text-sm hover:text-euro-blue transition-colors flex items-center gap-2 mx-auto"
              >
                <RefreshCw size={14} /> Atualizar Análise
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
