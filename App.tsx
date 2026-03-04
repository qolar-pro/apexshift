import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Activity, 
  Clock, 
  Zap, 
  Ghost, 
  Download, 
  Settings, 
  TrendingUp,
  ChevronRight,
  AlertCircle,
  Calculator,
  Calendar,
  DollarSign,
  X,
  Plus,
  Minus,
  Divide,
  X as Multiply,
  Trash2,
  Sun,
  Moon,
  History,
  Edit2
} from 'lucide-react';
import { cn, formatCurrency, parseMath, getBiMonthlyPeriod, getDaysInPeriod } from './utils';

// --- Types ---
interface ShiftLog {
  id: string;
  date: Date;
  duration: number; // hours
  earnings: number;
}

interface ScheduledShift {
  day: number;
  startTime: string;
  endTime: string;
}

// --- Components ---
const BentoCard = ({ children, className, title, icon: Icon, showHud = true }: any) => (
  <div className={cn("liquid-glass p-6 flex flex-col gap-4 relative overflow-hidden group", className)}>
    <div className="hud-corner hud-corner-tl" />
    <div className="hud-corner hud-corner-tr" />
    <div className="hud-corner hud-corner-bl" />
    <div className="hud-corner hud-corner-br" />
    
    {/* Technical Background Pattern */}
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none font-mono text-[6px] leading-none select-none overflow-hidden p-2">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="whitespace-nowrap">
          {Math.random().toString(16).repeat(10)}
        </div>
      ))}
    </div>

    {showHud && (
      <>
        {/* HUD Rings Decoration */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 pointer-events-none opacity-[0.03]">
          <div className="w-full h-full hud-ring absolute" />
          <div className="w-24 h-24 hud-ring absolute top-4 left-4" style={{ animationDirection: 'reverse' }} />
        </div>
        
        {/* Scanning Line Decoration */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-[var(--apex-accent)] opacity-[0.05] z-0 pointer-events-none"
        />
      </>
    )}

    {/* Animated Glow Line */}
    <div className="glow-line top-0 opacity-0 group-hover:opacity-100 transition-opacity" />
    
    {title && (
      <div className="flex items-center justify-between z-10">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 flex items-center gap-2">
          {Icon && <Icon size={12} className="text-[var(--apex-accent)]" />}
          {title}
        </h3>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-[var(--apex-accent)] animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-[var(--apex-accent)] opacity-20" />
        </div>
      </div>
    )}
    <div className="z-10 flex-1">{children}</div>
  </div>
);

const GlobalStatusBar = () => {
  return (
    <div className="w-full h-6 bg-black/40 border-b border-white/5 flex items-center overflow-hidden z-[100] relative">
      <div className="flex whitespace-nowrap animate-marquee">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-8 px-4">
            <span className="text-[8px] font-mono text-[var(--apex-accent)] opacity-60 uppercase tracking-tighter">
              SYSTEM_STATUS: OPTIMAL // CORE_TEMP: 32°C // UPLINK: STABLE // ENCRYPTION: AES-512_ACTIVE
            </span>
            <span className="text-[8px] font-mono text-white opacity-20 uppercase tracking-tighter">
              SESSION_ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </span>
            <span className="text-[8px] font-mono text-[var(--apex-accent)] opacity-40 uppercase tracking-tighter">
              [ APEX_SHIFT_OS_v4.2.0 ]
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

const FloatingParticles = () => {
  const particles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: '110%' }}
          animate={{ 
            opacity: [0, 0.4, 0.4, 0],
            y: '-10%',
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`]
          }}
          transition={{ 
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: 'var(--apex-accent)',
            borderRadius: '50%',
            filter: 'blur(1px)',
            boxShadow: '0 0 10px var(--apex-accent)'
          }}
        />
      ))}
    </div>
  );
};

const CalculatorView = () => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);

  const handleKey = (key: string) => {
    if (key === 'C') {
      setDisplay('0');
    } else if (key === '=') {
      const result = parseMath(display);
      if (result !== null) {
        setHistory(prev => [`${display} = ${result.toFixed(2)}`, ...prev].slice(0, 5));
        setDisplay(result.toFixed(2));
      }
    } else {
      setDisplay(prev => prev === '0' ? key : prev + key);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="liquid-glass p-8 text-right">
        <div className="opacity-20 text-[10px] font-mono mb-2 uppercase tracking-widest">Terminal_Input</div>
        <div className="text-5xl font-black tracking-tighter tabular-nums truncate">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {['C', '/', '*', '-'].map(k => (
          <button key={k} onClick={() => handleKey(k)} className="h-20 rounded-3xl bg-white/5 font-bold text-xl hover:bg-white/10 transition-colors">{k}</button>
        ))}
        {[7, 8, 9, '+'].map(k => (
          <button key={k} onClick={() => handleKey(k.toString())} className="h-20 rounded-3xl bg-white/5 font-bold text-xl hover:bg-white/10 transition-colors">{k}</button>
        ))}
        {[4, 5, 6, '='].map(k => (
          <button key={k} onClick={() => handleKey(k.toString())} className={cn("h-20 rounded-3xl font-bold text-xl", k === '=' ? "bg-[var(--apex-accent)] text-black" : "bg-white/5 hover:bg-white/10 transition-colors")}>{k}</button>
        ))}
        {[1, 2, 3, 0].map(k => (
          <button key={k} onClick={() => handleKey(k.toString())} className="h-20 rounded-3xl bg-white/5 font-bold text-xl hover:bg-white/10 transition-colors">{k}</button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <h3 className="text-[10px] font-bold opacity-20 uppercase tracking-widest">History_Buffer</h3>
        {history.map((h, i) => (
          <div key={i} className="text-sm font-mono opacity-40">{h}</div>
        ))}
        {history.length === 0 && <div className="text-xs font-mono opacity-10 italic">Buffer empty...</div>}
      </div>
    </div>
  );
};

const ConfigOverlay = ({ isOpen, onClose, hue, setHue, rate, setRate, tax, setTax, ghostMode, setGhostMode }: any) => {
  return (
    <AnimatePresence>
      {isOpen && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed inset-0 z-50 bg-[var(--bg-color)]/95 backdrop-blur-3xl p-8 flex flex-col overflow-hidden"
          >
            {/* Background HUD decorations for Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
              <div className="grid-overlay" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] hud-ring" />
            </div>

            <div className="flex justify-between items-center mb-12 z-10">
              <h2 className="text-xl font-black uppercase tracking-tighter italic glitch-text">Terminal_Config</h2>
              <button onClick={onClose} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"><X size={20} /></button>
            </div>

            <div className="space-y-10 overflow-y-auto scrollbar-hide pb-20 z-10">
              <section>
                <label className="text-[10px] font-bold opacity-20 uppercase tracking-widest block mb-4">UI Spectrum</label>
                <BentoCard className="p-8" showHud={false}>
                  <input 
                    type="range" min="0" max="360" value={hue} 
                    onChange={(e) => setHue(parseInt(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none bg-gradient-to-r from-red-500 via-green-500 to-blue-500 cursor-pointer"
                  />
                </BentoCard>
              </section>

              <section className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold opacity-20 uppercase tracking-widest block mb-4">Base Rate ($)</label>
                  <BentoCard className="p-8" showHud={false}>
                    <input 
                      type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))}
                      className="w-full bg-transparent text-3xl font-black focus:outline-none"
                    />
                  </BentoCard>
                </div>
                <div>
                  <label className="text-[10px] font-bold opacity-20 uppercase tracking-widest block mb-4">Tax Provision (%)</label>
                  <BentoCard className="p-8" showHud={false}>
                    <input 
                      type="number" value={tax} onChange={(e) => setTax(parseFloat(e.target.value))}
                      className="w-full bg-transparent text-3xl font-black focus:outline-none"
                    />
                  </BentoCard>
                </div>
              </section>

              <section>
                <label className="text-[10px] font-bold opacity-20 uppercase tracking-widest block mb-4">Geofence / Ghost</label>
                <BentoCard className="p-8 flex flex-col gap-6" showHud={false}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-40 font-mono">WORK_LOCKED: [41.091, 23.548]</span>
                    <div className={cn("w-2 h-2 rounded-full", ghostMode ? "bg-[var(--apex-accent)] shadow-[0_0_12px_var(--apex-accent)]" : "bg-white/10")} />
                  </div>
                  <button className="w-full py-4 rounded-2xl bg-white/5 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Set Current as Work</button>
                  <button 
                    onClick={() => setGhostMode(!ghostMode)}
                    className={cn("w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors", ghostMode ? "bg-[var(--apex-accent)] text-black" : "bg-white/5")}
                  >
                    Ghost Mode: {ghostMode ? "ON" : "OFF"}
                  </button>
                </BentoCard>
              </section>
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
};

const LogHistoryOverlay = ({ isOpen, onClose, logs }: { isOpen: boolean; onClose: () => void; logs: ShiftLog[] }) => {
  const total = logs.reduce((acc, log) => acc + log.earnings, 0);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="fixed inset-0 z-50 bg-[var(--bg-color)]/95 backdrop-blur-3xl p-8 flex flex-col overflow-hidden"
        >
          {/* Background HUD decorations for Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="grid-overlay" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] hud-ring" />
          </div>

          <div className="flex justify-between items-center mb-12 z-10">
            <h2 className="text-xl font-black uppercase tracking-tighter italic glitch-text">Log_History</h2>
            <button onClick={onClose} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-6 pb-20 z-10">
            {logs.map(log => (
              <BentoCard key={log.id} className="p-8 flex justify-between items-center" showHud={false}>
                <div>
                  <div className="text-[10px] font-bold opacity-20 uppercase tracking-widest mb-1">
                    {log.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="text-sm font-mono opacity-60">{log.duration.toFixed(2)}H TOTAL</div>
                </div>
                <div className="text-2xl font-black italic text-[var(--apex-accent)]">
                  ${log.earnings.toFixed(2)}
                </div>
              </BentoCard>
            ))}
            {logs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 opacity-10">
                <History size={64} strokeWidth={1} />
                <p className="mt-4 text-xs uppercase tracking-widest">No logs found</p>
              </div>
            )}
          </div>

          <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center z-10">
            <div>
              <div className="text-[10px] font-bold opacity-20 uppercase tracking-widest">Total Period</div>
              <div className="text-3xl font-black italic">${total.toFixed(2)}</div>
            </div>
            <button className="px-8 py-4 rounded-2xl bg-[var(--apex-accent-soft)] text-[var(--apex-accent)] text-[10px] font-bold uppercase tracking-widest border border-[var(--apex-accent)]/20 hover:bg-[var(--apex-accent-soft)]/80 transition-all">Export CSV</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ShiftInputOverlay = ({ isOpen, onClose, day, initialHours, onSave }: { isOpen: boolean; onClose: () => void; day: number; initialHours: number; onSave: (hours: number) => void }) => {
  const [hours, setHours] = useState(initialHours.toString());
  
  useEffect(() => {
    if (isOpen) {
      setHours(initialHours.toString());
    }
  }, [isOpen, initialHours]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-8"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="liquid-glass p-10 w-full max-w-xs flex flex-col gap-8"
          >
            <div className="text-center">
              <h3 className="text-[10px] font-bold opacity-20 uppercase tracking-widest mb-2">Input Hours</h3>
              <div className="text-2xl font-black italic">MAR {day}</div>
            </div>

            <div className="relative">
              <input 
                type="number" 
                step="0.25"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-4xl font-black text-center focus:outline-none focus:border-[var(--apex-accent)] transition-colors"
                autoFocus
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 font-bold">H</div>
            </div>

            <div className="flex gap-4">
              <button onClick={onClose} className="flex-1 py-4 rounded-2xl bg-white/5 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={() => { onSave(parseFloat(hours)); onClose(); }} className="flex-1 py-4 rounded-2xl bg-[var(--apex-accent)] text-black font-bold text-xs uppercase tracking-widest transition-all accent-glow hover:scale-[1.02]">Save</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  // --- State ---
  const [activeTab, setActiveTab] = useState('EARNINGS');
  const [hue, setHue] = useState(142);
  const [rate, setRate] = useState(5.000);
  const [tax, setTax] = useState(20);
  const [ghostMode, setGhostMode] = useState(true);
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [activePeriod, setActivePeriod] = useState(1);
  const [viewMode, setViewMode] = useState<'BI_MONTHLY' | 'WEEKLY' | 'MONTHLY'>('BI_MONTHLY');
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isShiftInputOpen, setIsShiftInputOpen] = useState(false);
  const [logs, setLogs] = useState<ShiftLog[]>([]);
  const [liveEarnings, setLiveEarnings] = useState(0);
  const [liveDuration, setLiveDuration] = useState(0); // seconds
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scheduledShifts, setScheduledShifts] = useState<ScheduledShift[]>([]);

  const lastUpdateRef = useRef(Date.now());

  // --- Constants ---
  const NET_RATE_PER_SECOND = (rate * (1 - (tax / 100))) / 3600;
  const days = useMemo(() => getDaysInPeriod(2026, 2, activePeriod, viewMode), [activePeriod, viewMode]);

  // --- Effects ---
  useEffect(() => {
    document.documentElement.style.setProperty('--apex-accent-hue', hue.toString());
    document.documentElement.style.setProperty('--apex-accent', `hsl(${hue}, 100%, 60%)`);
    document.documentElement.style.setProperty('--apex-accent-glow', `hsla(${hue}, 100%, 60%, 0.3)`);
  }, [hue]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    let timer: any;
    if (isShiftActive) {
      timer = setInterval(() => {
        const now = Date.now();
        const delta = (now - lastUpdateRef.current) / 1000;
        setLiveEarnings(prev => prev + (delta * NET_RATE_PER_SECOND));
        setLiveDuration(prev => prev + delta);
        lastUpdateRef.current = now;
      }, 100);
    } else {
      lastUpdateRef.current = Date.now();
    }
    return () => clearInterval(timer);
  }, [isShiftActive, NET_RATE_PER_SECOND]);

  const handleShiftToggle = () => {
    if (isShiftActive) {
      const newLog: ShiftLog = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date(),
        duration: liveDuration / 3600,
        earnings: liveEarnings
      };
      setLogs(prev => [newLog, ...prev]);
      setLiveEarnings(0);
      setLiveDuration(0);
    }
    setIsShiftActive(!isShiftActive);
  };

  const totalPeriodHours = useMemo(() => {
    const dayNumbers = days.map(d => d.day);
    return logs.filter(log => {
      const d = new Date(log.date);
      return d.getMonth() === 2 && d.getFullYear() === 2026 && dayNumbers.includes(d.getDate());
    }).reduce((acc, log) => acc + log.duration, 0);
  }, [logs, days]);

  const totalPeriodEarnings = useMemo(() => {
    const dayNumbers = days.map(d => d.day);
    return logs.filter(log => {
      const d = new Date(log.date);
      return d.getMonth() === 2 && d.getFullYear() === 2026 && dayNumbers.includes(d.getDate());
    }).reduce((acc, log) => acc + log.earnings, 0);
  }, [logs, days]);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setIsShiftInputOpen(true);
  };

  const handleSaveShift = (hours: number) => {
    setLogs(prev => {
      // Filter out any existing log for this specific day
      const filtered = prev.filter(log => {
        const logDate = new Date(log.date);
        return !(logDate.getDate() === selectedDay && logDate.getMonth() === 2 && logDate.getFullYear() === 2026);
      });

      if (hours <= 0) return filtered;

      const newLog: ShiftLog = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date(2026, 2, selectedDay),
        duration: hours,
        earnings: hours * rate * (1 - (tax / 100))
      };
      return [newLog, ...filtered];
    });
  };

  const [editingShiftDay, setEditingShiftDay] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEditScheduledShift = (day: number) => {
    setEditingShiftDay(day);
  };

  const saveScheduledShift = (day: number, start: string, end: string) => {
    setScheduledShifts(prev => {
      const filtered = prev.filter(s => s.day !== day);
      return [...filtered, { day, startTime: start, endTime: end }];
    });
    setEditingShiftDay(null);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-hidden">
      <GlobalStatusBar />
      
      {/* Background Layers */}
      <div className="starfield" />
      <FloatingParticles />
      
      {/* Technical Blueprint Layer */}
      <div className="fixed inset-0 z-[-2] opacity-[0.03] pointer-events-none">
        <img 
          src="https://picsum.photos/seed/tech/1920/1080?blur=10" 
          alt="" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Liquid Background */}
      <motion.div 
        style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
        className="liquid-bg"
      >
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
        <div className="liquid-blob" />
      </motion.div>
      
      <motion.div 
        style={{ x: mousePosition.x * 0.2, y: mousePosition.y * 0.2 }}
        className="grid-overlay" 
      />
      
      <div className="scanline" />
      
      {/* Data Streams */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-5">
        <div className="absolute top-[10%] left-[-10%] rotate-90 data-stream">
          010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
        </div>
        <div className="absolute bottom-[20%] right-[-10%] -rotate-90 data-stream">
          APEX_SHIFT_SYSTEM_CORE_LOAD_BALANCER_ACTIVE_TELEMETRY_STREAM_CONNECTED_ENCRYPTED_SESSION_ESTABLISHED
        </div>
      </div>

      {/* Header */}
      <header className="p-8 flex justify-between items-start z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none">ApexShift</h1>
            <div className="w-8 h-8 rounded-lg bg-[var(--apex-accent)] flex items-center justify-center shadow-[0_0_15px_var(--apex-accent-glow)]">
              <Zap size={16} className="text-black" fill="currentColor" />
            </div>
          </div>
          <div className="text-[10px] font-mono opacity-20 uppercase tracking-[0.3em] flex items-center gap-2">
            MAR 2026 // GHOST:
            <button 
              onClick={() => setGhostMode(!ghostMode)}
              className={cn("font-bold transition-colors", ghostMode ? "text-[var(--apex-accent)]" : "opacity-40")}
            >
              {ghostMode ? "ON" : "OFF"}
            </button>
          </div>
        </div>
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} className="opacity-40" /> : <Moon size={20} className="opacity-40" />}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 pb-32 overflow-y-auto scrollbar-hide z-10">
        {activeTab === 'EARNINGS' && (
          <div className="space-y-8">
            {/* View Mode Switcher */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/5">
              {(['BI_MONTHLY', 'WEEKLY', 'MONTHLY'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => {
                    setViewMode(mode);
                    setActivePeriod(1);
                  }}
                  className={cn(
                    "flex-1 py-2 rounded-xl text-[8px] font-bold uppercase tracking-widest transition-all",
                    viewMode === mode ? "bg-[var(--apex-accent)] text-black shadow-[0_0_15px_var(--apex-accent-glow)]" : "opacity-20 hover:opacity-40"
                  )}
                >
                  {mode.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Period Selection */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 justify-center">
              {Array.from({ 
                length: viewMode === 'BI_MONTHLY' ? 2 : viewMode === 'WEEKLY' ? 4 : 1 
              }).map((_, i) => {
                const p = i + 1;
                return (
                  <button 
                    key={p}
                    onClick={() => setActivePeriod(p)}
                    className={cn(
                      "flex-shrink-0 px-6 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all",
                      activePeriod === p ? "bg-white/10 text-white shadow-xl" : "bg-white/5 opacity-20 hover:opacity-40"
                    )}
                  >
                    {viewMode === 'MONTHLY' ? 'Full Month' : viewMode === 'WEEKLY' ? `Week ${p}` : `Period ${p}`}
                  </button>
                );
              })}
            </div>

            {/* Day Selector */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 flex-nowrap">
              {days.map(d => (
                <button 
                  key={d.day}
                  onClick={() => handleDayClick(d.day)}
                  className={cn(
                    "flex-shrink-0 w-20 h-28 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all",
                    selectedDay === d.day ? "bg-[var(--apex-accent)] text-black shadow-[0_0_20px_var(--apex-accent-glow)]" : "bg-white/5 opacity-20 hover:opacity-40"
                  )}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest">{d.weekday}</span>
                  <span className="text-3xl font-black italic leading-none">{d.day}</span>
                  {(() => {
                    const log = logs.find(l => {
                      const date = new Date(l.date);
                      return date.getDate() === d.day && date.getMonth() === 2 && date.getFullYear() === 2026;
                    });
                    if (log) {
                      return (
                        <div className={cn(
                          "px-2 py-0.5 rounded-full text-[9px] font-mono font-bold mt-1",
                          selectedDay === d.day ? "bg-black/20" : "bg-[var(--apex-accent)] text-black"
                        )}>
                          {log.duration.toFixed(1)}H
                        </div>
                      );
                    }
                    return d.day === new Date().getDate() ? (
                      <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">Today</span>
                    ) : null;
                  })()}
                </button>
              ))}
            </div>

            {/* Revenue Display */}
            <BentoCard className="py-12 flex flex-col items-center justify-center">
              <div className="text-[10px] font-bold opacity-20 uppercase tracking-[0.4em] mb-4 text-center">Telemetry_Stream</div>
              
              {/* Main Live Counter - Shows Total Period Earnings */}
              <div className="text-7xl font-black tracking-tighter tabular-nums mb-4 text-center text-[var(--apex-accent)] accent-glow">
                <span className="text-2xl align-top mt-4 inline-block opacity-40 mr-1">$</span>
                {(totalPeriodEarnings + liveEarnings).toFixed(3)}
              </div>

              {/* Unified Stats Block */}
              <div className="w-full pt-6 border-t border-white/5 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold opacity-20 uppercase tracking-widest">Current Shift</span>
                  <span className="text-sm font-mono font-bold text-[var(--apex-accent)]">
                    {isShiftActive ? (liveDuration / 3600).toFixed(2) : "0.00"}H / ${isShiftActive ? liveEarnings.toFixed(2) : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold opacity-20 uppercase tracking-widest">Period Total</span>
                  <span className="text-sm font-mono font-bold text-[var(--apex-accent)]">
                    {(totalPeriodHours + (isShiftActive ? liveDuration / 3600 : 0)).toFixed(2)}H / ${(totalPeriodEarnings + liveEarnings).toFixed(2)}
                  </span>
                </div>
              </div>
            </BentoCard>

            {/* Shift Trigger */}
            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={handleShiftToggle}
                className={cn(
                  "w-24 h-24 rounded-[2.5rem] flex items-center justify-center transition-all shadow-2xl relative group btn-scan",
                  isShiftActive 
                    ? "bg-red-500/20 border-2 border-red-500 text-red-500 shadow-red-500/20" 
                    : "bg-[var(--apex-accent-soft)] border border-[var(--apex-accent)]/30 text-[var(--apex-accent)] hover:bg-[var(--apex-accent-soft)]/80 accent-glow"
                )}
              >
                {isShiftActive ? (
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-8 h-8 bg-red-500 rounded-xl" 
                  />
                ) : (
                  <div className="w-4 h-4 bg-[var(--apex-accent)] rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_var(--apex-accent)]" />
                )}
              </button>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest transition-opacity",
                isShiftActive ? "text-red-500" : "text-[var(--apex-accent)] opacity-60"
              )}>
                {isShiftActive ? "Live Shift Active" : "Initiate Shift"}
              </span>
            </div>

            {/* Bottom Quick Actions */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Rate Card - Showcase Only */}
                <div className="liquid-glass p-8 text-left relative overflow-hidden">
                  <div className="text-[10px] font-bold opacity-20 uppercase tracking-widest mb-4">Rate</div>
                  <div className="text-4xl font-black italic leading-none">${rate}</div>
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] rotate-12">
                    <DollarSign size={80} />
                  </div>
                </div>
                {/* Config Card - Opens Settings */}
                <button onClick={() => setIsConfigOpen(true)} className="liquid-glass p-8 text-left group">
                  <div className="text-[10px] font-bold opacity-20 uppercase tracking-widest mb-4">Config</div>
                  <Settings size={28} className="opacity-20 group-hover:text-[var(--apex-accent)] transition-colors" />
                  <div className="absolute bottom-6 right-6 text-[var(--apex-accent)] opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={16} /></div>
                </button>
              </div>
              
              <button onClick={() => setIsHistoryOpen(true)} className="w-full liquid-glass p-8 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <History size={24} className="opacity-20" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">View Log History</span>
                </div>
                <ChevronRight size={16} className="opacity-20 group-hover:text-[var(--apex-accent)] transition-colors" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'CALC' && (
          <div className="space-y-10">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Terminal_Calc</h2>
            <CalculatorView />
          </div>
        )}

        {activeTab === 'PLAN' && (
          <div className="space-y-10">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Shift_Plan</h2>
            <div className="space-y-4">
              {days.map(d => {
                const shift = scheduledShifts.find(s => s.day === d.day) || { startTime: '08:00', endTime: '16:00' };
                const isEditing = editingShiftDay === d.day;

                return (
                  <div key={d.day} className="liquid-glass p-8 flex flex-col gap-4 group">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-[10px] font-bold opacity-20 uppercase tracking-widest mb-1">{d.weekday}</div>
                        <div className="text-2xl font-black italic">{d.day} MAR</div>
                      </div>
                      
                      {!isEditing ? (
                        <button 
                          onClick={() => handleEditScheduledShift(d.day)}
                          className="text-right hover:opacity-60 transition-opacity flex items-center gap-4"
                        >
                          <div>
                            <div className="text-sm font-mono text-[var(--apex-accent)]">{shift.startTime} - {shift.endTime}</div>
                            <div className="text-[10px] font-bold opacity-20 uppercase">Scheduled</div>
                          </div>
                          <Edit2 size={14} className="opacity-20" />
                        </button>
                      ) : (
                        <div className="flex flex-col gap-2 items-end">
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              defaultValue={shift.startTime} 
                              id={`start-${d.day}`}
                              className="w-16 bg-white/5 border border-white/10 rounded-lg p-1 text-xs font-mono text-center focus:border-[var(--apex-accent)] outline-none"
                            />
                            <span className="opacity-20">-</span>
                            <input 
                              type="text" 
                              defaultValue={shift.endTime} 
                              id={`end-${d.day}`}
                              className="w-16 bg-white/5 border border-white/10 rounded-lg p-1 text-xs font-mono text-center focus:border-[var(--apex-accent)] outline-none"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setEditingShiftDay(null)}
                              className="text-[8px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={() => {
                                const start = (document.getElementById(`start-${d.day}`) as HTMLInputElement).value;
                                const end = (document.getElementById(`end-${d.day}`) as HTMLInputElement).value;
                                saveScheduledShift(d.day, start, end);
                              }}
                              className="text-[8px] font-bold uppercase tracking-widest text-[var(--apex-accent)]"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-midnight via-midnight to-transparent z-20">
        <div className="max-w-md mx-auto liquid-glass p-2 flex gap-2">
          {[
            { id: 'CALC', icon: Calculator, label: 'Calc' },
            { id: 'EARNINGS', icon: DollarSign, label: 'Earnings' },
            { id: 'PLAN', icon: Calendar, label: 'Plan' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-4 rounded-[1.5rem] flex flex-col items-center gap-1 transition-all",
                activeTab === tab.id ? "bg-[var(--apex-accent)] text-black accent-glow" : "opacity-20 hover:opacity-40"
              )}
            >
              <tab.icon size={20} />
              <span className="text-[8px] font-bold uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Overlays */}
      <ShiftInputOverlay 
        isOpen={isShiftInputOpen} 
        onClose={() => setIsShiftInputOpen(false)} 
        day={selectedDay} 
        initialHours={logs.find(l => {
          const d = new Date(l.date);
          return d.getDate() === selectedDay && d.getMonth() === 2 && d.getFullYear() === 2026;
        })?.duration || 8.00}
        onSave={handleSaveShift} 
      />
      <LogHistoryOverlay isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} logs={logs} />
      <ConfigOverlay 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)}
        hue={hue} setHue={setHue}
        rate={rate} setRate={setRate}
        tax={tax} setTax={setTax}
        ghostMode={ghostMode} setGhostMode={setGhostMode}
      />
    </div>
  );
}
