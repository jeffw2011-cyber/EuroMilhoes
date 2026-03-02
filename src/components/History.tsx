import React from 'react';
import { motion } from 'motion/react';
import { DrawResult } from '../types';
import { DrawBalls } from './DrawBalls';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Search } from 'lucide-react';

interface HistoryProps {
  history: DrawResult[];
}

export const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-euro-blue">Histórico de Sorteios</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Procurar sorteio..." 
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-euro-blue/20"
          />
        </div>
      </div>

      <div className="space-y-3">
        {history.map((draw, index) => (
          <motion.div 
            key={draw.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-euro-blue/30 transition-colors"
          >
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">{draw.id}</p>
              <p className="font-bold text-slate-700">
                {format(new Date(draw.date), "EEEE, d 'de' MMMM", { locale: pt })}
              </p>
            </div>
            
            <DrawBalls numbers={draw.numbers} stars={draw.stars} size="sm" />
            
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Jackpot</p>
              <p className="font-display font-bold text-euro-blue">{draw.jackpot || 'N/A'}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
