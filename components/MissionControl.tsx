import React from 'react';
import { PROFILE_DATA } from '../constants';

const MissionControl: React.FC = () => {
  const { missionControl } = PROFILE_DATA;
  return (
    <section id="systems" className="bg-white border-b-4 border-black py-20 md:py-28">
      <div className="container mx-auto px-4">

        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs font-bold tracking-widest mb-3">[ 03 / EDGE ]</div>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight">
            The agents do<br />the work.
          </h2>
          <p className="text-lg md:text-xl mt-5 max-w-2xl border-l-4 border-neo-blue pl-4">
            One operator, three products, a portable AI toolkit underneath. Same primitives, redeployed across verticals — outreach, content, programmatic SEO.
          </p>
        </div>

        <div className="space-y-10">
          {missionControl.systems.map((sys, i) => (
            <article
              key={sys.name}
              className="border-4 border-black bg-white grid grid-cols-1 md:grid-cols-12"
            >
              {/* Index column */}
              <div className="md:col-span-1 bg-black text-white p-5 md:p-6 flex md:flex-col md:items-center md:justify-start gap-2 border-b-4 md:border-b-0 md:border-r-4 border-black">
                <span className="font-mono text-[10px] font-bold tracking-widest text-neo-yellow">SYS</span>
                <span className="text-3xl md:text-5xl font-black leading-none">{String(i + 1).padStart(2, '0')}</span>
              </div>

              {/* Identity */}
              <div className="md:col-span-4 p-6 border-b-4 md:border-b-0 md:border-r-4 border-black">
                <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-3">{sys.name}</h3>
                <p className="font-medium text-base leading-snug border-l-4 border-neo-pink pl-3">
                  {sys.oneLiner}
                </p>

                <div className="mt-5">
                  <div className="font-mono text-[10px] font-bold tracking-widest text-gray-500 mb-2">DEPLOYED IN</div>
                  <div className="flex flex-wrap gap-1.5">
                    {sys.deployed.map(d => (
                      <span key={d} className="font-mono text-[10px] font-bold bg-neo-green border-2 border-black px-2 py-0.5">
                        ↳ {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* How it works */}
              <div className="md:col-span-7 p-6">
                <div className="font-mono text-[10px] font-bold tracking-widest text-gray-500 mb-3">HOW IT WORKS</div>
                <ul className="space-y-2 mb-5">
                  {sys.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm md:text-base leading-relaxed">
                      <span className="font-mono text-xs font-black text-neo-pink mt-1 shrink-0">{String(j + 1).padStart(2, '0')}</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t-2 border-black flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-gray-500 mr-1">STACK</span>
                  {sys.stack.map(t => (
                    <span key={t} className="font-mono text-[10px] font-bold bg-black text-white px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 max-w-3xl bg-black text-white p-6 md:p-8 border-4 border-black shadow-neo-lg">
          <div className="font-mono text-[10px] font-bold tracking-widest text-neo-yellow mb-3">// LEVERAGE</div>
          <p className="text-lg md:text-xl font-bold leading-snug">
            One person can run a search platform with <span className="text-neo-yellow">96K monthly sessions</span>, an autonomous outreach agent flipping unverified records to verified, and a daily content engine publishing pillar articles —
            because the agents do the work. Not the operator.
          </p>
        </div>

      </div>
    </section>
  );
};

export default MissionControl;
