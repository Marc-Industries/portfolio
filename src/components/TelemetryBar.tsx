'use client';

import { useEffect, useState } from 'react';

const ITEMS = [
  'SYSTEMS NOMINAL',
  'TELEMETRY LINK ACTIVE',
  'FCOM ENCRYPTED',
  'ECSS COMPLIANT',
  'PDR GATE CLEARED',
  'CDR REVIEW PENDING',
  'OPS HANDOFF READY',
  'GITHUB BUILD #4421 OK',
  'LINK BUDGET +12dB',
  'ATTI TLM @ 1Hz',
];

export function TelemetryBar() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toISOString().slice(11, 19) + 'Z');
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Double the items so the ticker loop is seamless
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="fixed top-14 left-0 right-0 z-30 h-7 bg-space-950/85 backdrop-blur-sm border-b border-line overflow-hidden">
      <div className="flex items-center h-full">
        <div className="px-3 flex items-center gap-2 border-r border-line flex-shrink-0">
          <span className="dot fire" />
          <span className="mono text-[9px] tracking-[0.28em] text-accent-crimson">LIVE</span>
        </div>
        <div className="ticker-track py-1">
          {loop.map((item, i) => (
            <span key={i} className="mono text-[9px] tracking-[0.28em] text-space-300 flex items-center gap-3">
              {item}
              <span className="w-1 h-1 bg-accent-blood rounded-full" />
            </span>
          ))}
        </div>
        <div className="px-3 border-l border-line flex-shrink-0 mono text-[9px] tracking-[0.28em] text-space-400">
          UTC {time || '--:--:--'}
        </div>
      </div>
    </div>
  );
}
