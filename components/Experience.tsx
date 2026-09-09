import React from 'react';
import { PROFILE_DATA } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="cv" className="bg-white border-b-4 border-black py-20 md:py-28">
      <div className="container mx-auto px-4">

        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs font-bold tracking-widest mb-3">[ 07 / TRACK RECORD ]</div>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight">
            The CV, briefly.
          </h2>
          <p className="text-lg md:text-xl mt-5 max-w-2xl border-l-4 border-black pl-4">
            Five years. Three EdTechs. One venture studio. The bullets are descriptive, not embellished — ask me for numbers in conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Roles list — dense, no card chrome */}
          <ol className="md:col-span-8 border-4 border-black bg-white divide-y-4 divide-black">
            {PROFILE_DATA.experience.map((exp) => (
              <li key={exp.role + exp.period} className="p-5 md:p-6">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h3 className="text-lg md:text-xl font-black uppercase leading-tight">{exp.role}</h3>
                  {exp.period.includes('Present') && (
                    <span className="font-mono text-[10px] font-bold bg-neo-green border-2 border-black px-2 py-0.5">● ACTIVE</span>
                  )}
                </div>
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  <span className="text-base font-black text-neo-blue">{exp.company}</span>
                  <span className="font-mono text-[11px] text-gray-600">· {exp.period} · {exp.location}</span>
                </div>
                {exp.description && (
                  <p className="text-sm md:text-base leading-relaxed">{exp.description}</p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-gray-800">
                        <span className="text-neo-pink font-black mt-0.5">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>

          {/* Education + honour sidebar */}
          <aside className="md:col-span-4 space-y-5">
            <div className="border-4 border-black bg-neo-yellow p-5">
              <div className="font-mono text-[10px] font-bold tracking-widest mb-3">EDUCATION</div>
              {PROFILE_DATA.education.map((edu, i) => (
                <div key={i} className={i > 0 ? 'mt-4 pt-4 border-t-2 border-black' : ''}>
                  <div className="font-black text-base leading-tight">{edu.institution}</div>
                  <div className="font-mono text-xs mt-1">{edu.degree}</div>
                  <div className="font-mono text-[10px] text-gray-700 mt-1">{edu.period}</div>
                </div>
              ))}
            </div>

            <div className="border-4 border-black bg-black text-white p-5">
              <div className="font-mono text-[10px] font-bold tracking-widest text-neo-yellow mb-3">HONOUR</div>
              {PROFILE_DATA.awards.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <div className="font-black text-base leading-tight">{a.name}</div>
                    <div className="font-mono text-[10px] text-neo-yellow mt-1">{a.issuer} · {a.date}</div>
                    {a.note && <div className="text-xs text-gray-300 mt-1">{a.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </aside>

        </div>

      </div>
    </section>
  );
};

export default Experience;
