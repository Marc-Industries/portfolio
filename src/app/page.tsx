'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { data } from '@/lib/data';
import { Nav } from '@/components/Nav';
import { TelemetryBar } from '@/components/TelemetryBar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Aerospace } from '@/components/sections/Aerospace';
import { MBSE } from '@/components/sections/MBSE';
import { Software } from '@/components/sections/Software';
import { Automation } from '@/components/sections/Automation';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Publication } from '@/components/sections/Publication';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/Footer';

// 3D scene is client-only (Three.js needs WebGL)
const Scene = dynamic(() => import('@/components/three/Scene').then(m => m.Scene), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Persistent 3D backdrop (low intensity) */}
      {!reduced && <Scene reduced={reduced} />}

      <Nav />
      <TelemetryBar />

      <Hero />
      <About />
      <Aerospace />
      <MBSE />
      <Software />
      <Automation />
      <Projects data={data.projects} />
      <Experience data={data.experience} />
      <Publication />
      <Education data={data.education} certifications={data.certifications} />
      <Contact />

      <Footer />
    </main>
  );
}
