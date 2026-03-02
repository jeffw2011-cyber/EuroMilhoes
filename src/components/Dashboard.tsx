import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Calendar, Trophy, ArrowRight } from 'lucide-react';
import { DrawResult } from '../types';
import { DrawBalls } from './DrawBalls';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

interface DashboardProps {
  latest: DrawResult;
  stats: any;
  onNavigate: (tab: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ latest, stats, onNavigate }) => {
  return (
    <div className="space-y-6">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 bg-gradient-to-br from-euro-blue to-blue-900 text-white border-none overflow-hidden relative"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <Calendar size={18} />
            <span className="text-sm font-medium uppercase tracking-wider">
              Último Sorteio • {format(new Date(latest.date), "d 'de' MMMM", { locale: pt })}
            </span>
          </div>
          
          <h2 className="text-3xl font-display font-bold mb-6">Resultados Oficiais</h2>
          
          <DrawBalls numbers={latest.numbers} stars={latest.stars} size="lg" className="mb-8" />
          
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div>
              <p className="text-blue-200 text-xs uppercase tracking-widest mb-1">Próximo Jackpot Estimado</p>
              <p className="text-2xl font-display font-bold text-euro-star">€42.000.000</p>
            </div>
            <button 
              onClick={() => onNavigate('simulator')}
              className="bg-euro-star text-euro-blue px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Simular Aposta <ArrowRight size={16} />
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-euro-star/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-euro-blue">
            <TrendingUp size={20} />
            <h3 className="font-display font-bold text-lg">Números Quentes</h3>
          </div>
          <p className="text-slate-500 text-sm mb-4">Números que saíram com maior frequência nos últimos sorteios.</p>
          <div className="flex flex-wrap gap-2">
            {stats.hotNumbers.map((n: any) => (
              <div key={n.value} className="flex flex-col items-center gap-1">
                <div className="ball ball-number w-9 h-9 text-base">{n.value}</div>
                <span className="text-[10px] text-slate-400 font-mono">{n.count}x</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-4 text-euro-blue">
            <Trophy size={20} />
            <h3 className="font-display font-bold text-lg">Estrelas em Destaque</h3>
          </div>
          <p className="text-slate-500 text-sm mb-4">As estrelas que mais têm brilhado nos resultados recentes.</p>
          <div className="flex flex-wrap gap-2">
            {stats.hotStars.map((s: any) => (
              <div key={s.value} className="flex flex-col items-center gap-1">
                <div className="ball ball-star w-9 h-9 text-base">{s.value}</div>
                <span className="text-[10px] text-slate-400 font-mono">{s.count}x</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
