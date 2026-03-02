import React from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Info } from 'lucide-react';

interface StatsProps {
  stats: any;
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-display font-bold text-euro-blue">Frequência de Números</h2>
          <div className="group relative">
            <Info size={16} className="text-slate-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              Número de vezes que cada bola foi sorteada no histórico recente.
            </div>
          </div>
        </div>

        <div className="glass-card p-6 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.allNumbers.slice(0, 15)}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="value" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {stats.allNumbers.slice(0, 15).map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={index < 5 ? '#1E3A8A' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 className="text-xl font-display font-bold text-euro-blue mb-4">Números "Frios"</h3>
          <div className="glass-card p-6">
            <p className="text-slate-500 text-sm mb-4">Números que não saem há mais tempo ou com menor frequência.</p>
            <div className="flex flex-wrap gap-2">
              {stats.coldNumbers.map((n: any) => (
                <div key={n.value} className="flex flex-col items-center gap-1">
                  <div className="ball ball-number w-9 h-9 text-base bg-slate-50 border-slate-200 text-slate-400">{n.value}</div>
                  <span className="text-[10px] text-slate-400 font-mono">{n.count}x</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-display font-bold text-euro-blue mb-4">Frequência de Estrelas</h3>
          <div className="glass-card p-6 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.allStars}>
                <XAxis dataKey="value" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="count" fill="#FFD700" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
};
