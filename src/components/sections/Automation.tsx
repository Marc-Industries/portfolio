'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { data } from '@/lib/data';

const NODES = [
  { id: 'event',  x: 80,  y: 150, label: 'EVENT',     sub: 'Trigger / Webhook' },
  { id: 'route',  x: 280, y: 150, label: 'ROUTER',    sub: 'Filter / Branch' },
  { id: 'logic',  x: 480, y: 80,  label: 'LOGIC',     sub: 'AI / Rule Engine' },
  { id: 'store',  x: 480, y: 220, label: 'STATE',     sub: 'Persist / RLS' },
  { id: 'action', x: 680, y: 150, label: 'ACTION',    sub: 'Notify / Sync' },
];

export function Automation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section
      id="automation"
      num="05"
      eyebrow="// AI · AUTOMATION"
      title="Event-driven workflows that think."
      lede="Combining AI agents, rule engines, and webhook orchestration into reliable pipelines — observability and rollback by design."
    >
      <div ref={ref} className="space-y-10">
        {/* Workflow graph */}
        <div className="card corner-brackets relative overflow-x-auto">
          <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson mb-6">EVENT FLOW · ANIMATED</div>
          <svg viewBox="0 0 800 320" className="w-full h-auto" style={{ minWidth: 700 }}>
            {/* Edges */}
            {[
              ['event', 'route'],
              ['route', 'logic'],
              ['route', 'store'],
              ['logic', 'action'],
              ['store', 'action'],
            ].map(([from, to], i) => {
              const a = NODES.find(n => n.id === from)!;
              const b = NODES.find(n => n.id === to)!;
              const dx = (b.x - a.x) * 0.4;
              return (
                <g key={i}>
                  <line
                    x1={a.x} y1={a.y}
                    x2={b.x} y2={b.y}
                    stroke="#D43F3F"
                    strokeWidth={1}
                    strokeOpacity={0.45}
                  />
                  <line
                    x1={a.x} y1={a.y}
                    x2={b.x} y2={b.y}
                    stroke="#FF5C3A"
                    strokeWidth={1.5}
                    strokeDasharray="6 16"
                    strokeOpacity={0.9}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="22" to="0"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </line>
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((n, i) => (
              <g key={n.id}>
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={28}
                  fill="#0A0202"
                  stroke="#D43F3F"
                  strokeWidth={1.5}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                />
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={36}
                  fill="none"
                  stroke="#D43F3F"
                  strokeOpacity={0.3}
                  strokeWidth={1}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: [1, 1.2, 1] } : { scale: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 2.5, repeat: Infinity }}
                />
                <text
                  x={n.x} y={n.y + 4}
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize={10}
                  fill="#F2D9D9"
                  fontWeight={600}
                >
                  {n.label}
                </text>
                <text
                  x={n.x} y={n.y + 50}
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize={8}
                  fill="#9C5050"
                >
                  {n.sub}
                </text>
              </g>
            ))}

            {/* Status legend */}
            <g>
              <text x="20" y="20" fontFamily="JetBrains Mono, monospace" fontSize={9} fill="#7A2E2E">
                FLOW LATENCY
              </text>
              <text x="20" y="35" fontFamily="JetBrains Mono, monospace" fontSize={12} fill="#D43F3F">
                ~120ms · p99
              </text>
              <text x="780" y="20" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize={9} fill="#7A2E2E">
                NODES
              </text>
              <text x="780" y="35" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize={12} fill="#D43F3F">
                5 / 5 ONLINE
              </text>
            </g>
          </svg>
        </div>

        {/* AI + Automation skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card corner-brackets">
            <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson mb-4">AI / ML</div>
            <div className="flex flex-wrap gap-2">
              {data.skills['ai'].map((s) => (
                <span key={s} className="border border-line px-3 py-1 text-[11px] mono text-space-200">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="card corner-brackets">
            <div className="mono text-[10px] tracking-[0.32em] text-accent-crimson mb-4">AUTOMATION</div>
            <div className="flex flex-wrap gap-2">
              {data.skills['automation'].map((s) => (
                <span key={s} className="border border-line px-3 py-1 text-[11px] mono text-space-200">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
