import React from 'react';
import { PROFILE_DATA } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="bg-white border-b-4 border-black">
      <div className="container mx-auto px-4 pt-10 md:pt-16 pb-12 md:pb-20">

        {/* Status pill — single source of priority signal */}
        <div className="inline-flex items-stretch border-2 border-black shadow-neo mb-10 bg-white">
          <span className="bg-black text-white font-mono text-[11px] font-bold tracking-widest px-3 py-1.5 flex items-center gap-2">
            <span className="w-2 h-2 bg-neo-green inline-block"></span>
            APPLYING · YC W26
          </span>
          <span className="font-mono text-[11px] font-bold tracking-widest px-3 py-1.5 flex items-center">
            BUILDING · HOWTOHELP.IN
          </span>
        </div>

        {/* The pitch — name + one-line positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            {/* 6.8vw ≈ the widest "TWINKLE" can render without spilling into the intro column */}
            <h1 className="font-black uppercase leading-[0.9] tracking-tighter text-[min(11.5vw,4.5rem)] sm:text-7xl lg:text-[min(6.8vw,8.5rem)]">
              Twinkle<br />Garg.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xl md:text-2xl font-medium leading-snug border-l-4 border-black pl-4">
              Builder + product marketer. <span className="bg-neo-yellow px-1">Six shipped products,</span> one autonomous-agent stack, and a book about Indian judicial activism.
              <span className="block mt-3 font-mono text-sm text-gray-600">Bengaluru · Born in Bathinda · 5+ years in startups</span>
            </p>
          </div>
        </div>

        {/* Proof strip — the four numbers a partner needs */}
        <div className="grid grid-cols-2 md:grid-cols-4 mt-12 md:mt-16 border-4 border-black bg-black">
          {PROFILE_DATA.heroStats.map((s, i) => (
            <div
              key={i}
              className={`p-5 md:p-7 border-black bg-white ${i % 2 === 0 ? 'border-r-4' : ''} ${i < 2 ? 'border-b-4 md:border-b-0' : ''} ${i === 1 ? 'md:border-r-4' : ''}`}
            >
              <div className="text-4xl md:text-6xl font-black leading-none">{s.value}</div>
              <div className="font-mono text-[10px] md:text-xs font-bold tracking-widest mt-3 text-gray-600">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA — single, decisive */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#products"
            className="bg-black text-white font-bold py-4 px-8 border-4 border-black shadow-neo hover:bg-neo-yellow hover:text-black transition-colors inline-flex items-center gap-3"
          >
            <span>SEE THE PROOF</span>
            <span aria-hidden>↓</span>
          </a>
          <a
            href="#contact"
            className="font-mono text-sm font-bold underline underline-offset-4 decoration-2 hover:bg-neo-yellow px-1"
          >
            or skip to contact →
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
