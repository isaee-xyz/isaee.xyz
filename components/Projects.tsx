import React from 'react';
import { PROFILE_DATA } from '../constants';

const Projects: React.FC = () => {
  const flagships = PROFILE_DATA.projects.slice(0, 3);
  const tools = PROFILE_DATA.projects.slice(3);

  return (
    <section id="products" className="bg-neo-yellow border-y-4 border-black py-20 md:py-28">
      <div className="container mx-auto px-4">

        {/* Section header — disciplined, single accent */}
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs font-bold tracking-widest mb-3">[ 02 / PROOF ]</div>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight">
            Things I've shipped.
          </h2>
          <p className="text-lg md:text-xl mt-5 max-w-2xl border-l-4 border-black pl-4">
            Three flagship products that pay rent in users. Three tools that paid rent in lessons. All public, all built fast.
          </p>
        </div>

        {/* Flagships — give them weight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {flagships.map((p) => (
            <a
              key={p.name}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="group block bg-white border-4 border-black shadow-neo-lg hover:shadow-neo-xl hover:-translate-x-1 hover:-translate-y-1 transition-all"
            >
              <div className="bg-black text-white px-5 py-3 flex justify-between items-center border-b-4 border-black">
                <span className="font-mono text-[10px] font-bold tracking-widest">{p.tag}</span>
                <span className="font-mono text-[10px] font-bold bg-neo-green text-black px-2 py-0.5 border-2 border-neo-green">
                  ● {p.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-3 group-hover:underline decoration-4">
                  {p.name}
                </h3>
                <p className="text-sm leading-relaxed text-gray-800 mb-5">{p.description}</p>

                {(p as any).techStack && (
                  <div className="flex flex-wrap gap-1 mb-5">
                    {(p as any).techStack.slice(0, 6).map((t: string) => (
                      <span key={t} className="font-mono text-[10px] font-bold bg-gray-100 border border-black px-1.5 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="border-t-2 border-black pt-3 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold leading-tight max-w-[60%]">{p.metric}</span>
                  <span className="font-mono text-xs font-black group-hover:bg-black group-hover:text-white px-2 py-1 border-2 border-black transition-colors">
                    {p.cta} →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Tools — denser strip */}
        <div className="border-4 border-black bg-white">
          <div className="bg-black text-white px-5 py-3 flex justify-between items-center">
            <span className="font-mono text-xs font-bold tracking-widest">+ EVENING BUILDS · CHROME EXTENSIONS</span>
            <span className="font-mono text-[10px] text-gray-400">3 shipped, 1 went 449%</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y-4 md:divide-y-0 md:divide-x-4 divide-black">
            {tools.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="group block p-5 hover:bg-neo-yellow transition-colors"
              >
                <div className="flex items-baseline justify-between mb-2 gap-3">
                  <h4 className="text-lg font-black uppercase leading-tight group-hover:underline decoration-2">{p.name}</h4>
                  <span className="font-mono text-[10px] font-bold whitespace-nowrap">● {p.status}</span>
                </div>
                <p className="text-sm leading-snug text-gray-700 line-clamp-3">{p.description}</p>
                <div className="mt-3 font-mono text-[10px] font-bold">{p.metric} →</div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
