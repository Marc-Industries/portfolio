'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { data } from '@/lib/data';

const NODES = [
  { label: 'Aerospace', angle: 0,    color: '#D43F3F' },
  { label: 'Systems',   angle: 51,   color: '#FF5C3A' },
  { label: 'Software',  angle: 103,  color: '#FF8A5C' },
  { label: 'AI / ML',   angle: 154,  color: '#D43F3F' },
  { label: 'Automation',angle: 205,  color: '#FF5C3A' },
  { label: 'MBSE',      angle: 257,  color: '#F2B441' },
  { label: 'DevOps',    angle: 309,  color: '#8B0F0F' },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section id="about" num="01" eyebrow="// IDENTITY" title="An engineer who lives in both worlds.">
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Domain node graph */}
        <div className="relative aspect-square max-w-md mx-auto w-full">
          <svg viewBox="-150 -150 300 300" className="w-full h-full">
            {/* Connecting lines */}
            {NODES.map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = Math.cos(rad) * 110;
              const y = Math.sin(rad) * 110;
              return (
                <line
                  key={i}
                  x1={0}
                  y1={0}
                  x2={x}
                  y2={y}
                  stroke={node.color}
                  strokeOpacity={inView ? 0.6 : 0}
                  strokeWidth={0.5}
                  style={{ transition: 'stroke-opacity 1.2s ease', transitionDelay: `${i * 100}ms` }}
                />
              );
            })}

            {/* Center node */}
            <motion.circle
              r={26}
              fill="#050000"
              stroke="#D43F3F"
              strokeWidth={1.5}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.6 }}
            />
            <motion.text
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize={7}
              fill="#F2D9D9"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              M.M.
            </motion.text>

            {/* Outer nodes */}
            {NODES.map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = Math.cos(rad) * 110;
              const y = Math.sin(node.angle * Math.PI / 180) * 110;
              return (
                <g key={i}>
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={5}
                    fill={node.color}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  />
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={10}
                    fill="none"
                    stroke={node.color}
                    strokeOpacity={0.4}
                    strokeWidth={0.5}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: [1, 1.6, 1] } : { scale: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 2, repeat: Infinity, repeatDelay: 4 }}
                  />
                  <motion.text
                    x={x}
                    y={y + 18}
                    textAnchor="middle"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize={6}
                    fill="#C58080"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                  >
                    {node.label}
                  </motion.text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right column: bio */}
        <div className="space-y-6">
          <p className="text-lg text-space-100 leading-relaxed text-pretty">
            I'm an <span className="text-accent-crimson">Aerospace Engineer</span> from the
            University of Padua who also builds <span className="text-accent-crimson">production software</span>.
            My work spans the full lifecycle: requirements, architecture, implementation, testing, integration.
          </p>
          <p className="text-base text-space-200 leading-relaxed text-pretty">
            My path moves between ECSS-aligned space systems engineering and shipping
            production software — from the test campaign of a 1U CubeSat to the
            architecture of a multi-tenant MBSE platform. The discipline is the same in
            both: clear requirements, observable systems, evidence over intuition.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="card corner-brackets">
              <div className="mono text-[10px] tracking-[0.28em] text-space-300">PROJECTS SHIPPED</div>
              <div className="mt-2 text-3xl font-display text-accent-crimson">{data.projects.length}</div>
            </div>
            <div className="card corner-brackets">
              <div className="mono text-[10px] tracking-[0.28em] text-space-300">DOMAINS</div>
              <div className="mt-2 text-3xl font-display text-accent-crimson">7</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
