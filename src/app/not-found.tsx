'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-24 px-6">
      <div className="max-w-md text-center">
        <div className="mono text-[10px] tracking-widest2 text-accent-cyan mb-3">ERROR 404</div>
        <h1 className="h-display text-4xl">Off the trajectory</h1>
        <p className="text-text-2 mt-3">
          The page you were looking for is not on this orbit.
        </p>
        <Link href="/" className="btn btn-primary mt-6 inline-flex">← Return to mission control</Link>
      </div>
    </main>
  );
}
