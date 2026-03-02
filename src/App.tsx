import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  History as HistoryIcon, 
  BarChart3, 
  Dice5, 
  Brain,
  Menu,
  X
} from 'lucide-react';
import { TabType } from './types';
import { MOCK_HISTORY, getFrequencyStats } from './services/dataService';
import { Dashboard } from './components/Dashboard';
import { History } from './components/History';
import { Stats } from './components/Stats';
import { Simulator } from './components/Simulator';
import { AIInsightsView } from './components/AIInsightsView';
import { cn } from './utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stats = useMemo(() => getFrequencyStats(MOCK_HISTORY), []);
  const latestDraw = MOCK_HISTORY[0];

  const tabs = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'history', label: 'Histórico', icon: HistoryIcon },
    { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
    { id: 'simulator', label: 'Simulador', icon: Dice5 },
    { id: 'ai', label: 'IA Insights', icon: Brain },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard latest={latestDraw} stats={stats} onNavigate={setActiveTab} />;
      case 'history': return <History history={MOCK_HISTORY} />;
      case 'stats': return <Stats stats={stats} />;
      case 'simulator': return <Simulator />;
      case 'ai': return <AIInsightsView history={MOCK_HISTORY} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-euro-blue rounded-lg flex items-center justify-center text-euro-star">
              <Trophy size={20} />
            </div>
            <h1 className="text-xl font-display font-bold text-euro-blue tracking-tight">
              Euro<span className="text-slate-400">Milhões</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  activeTab === tab.id 
                    ? "bg-euro-blue text-white shadow-md shadow-blue-900/10" 
                    : "text-slate-500 hover:bg-slate-100"
                )}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-slate-200 p-4 md:hidden shadow-xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "p-4 rounded-xl text-sm font-medium flex flex-col items-center gap-2 transition-all",
                    activeTab === tab.id 
                      ? "bg-euro-blue text-white" 
                      : "bg-slate-50 text-slate-600"
                  )}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-slate-400 text-xs uppercase tracking-widest font-medium">
            Analisador Estatístico Independente • Não Oficial
          </p>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Joga com responsabilidade. Os dados apresentados são apenas para fins informativos e não garantem prémios.
          </p>
          <div className="flex justify-center gap-6 text-slate-300">
            <span className="text-[10px] font-mono">v1.0.0</span>
            <span className="text-[10px] font-mono">ID: com.eurostats.portugal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Trophy({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
