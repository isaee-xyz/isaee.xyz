import React from 'react';
import { PROFILE_DATA } from '../constants';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-black text-white py-20 md:py-32">
      <div className="container mx-auto px-4">

        <div className="font-mono text-xs font-bold tracking-widest mb-3 text-neo-yellow">[ 08 / THE BET ]</div>
        <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tight max-w-5xl">
          Want to build<br />
          <span className="text-neo-pink">something hard</span><br />
          together?
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <p className="text-lg md:text-xl leading-relaxed border-l-4 border-neo-yellow pl-4 max-w-2xl">
              Open for: YC W26 collaboration · AI / agent product roles · investor or operator intros · interesting partnerships at the intersection of EdTech, AI, and storytelling. Coffee in Bengaluru also fine.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3">
            <a
              href={`mailto:${PROFILE_DATA.contact.email}`}
              className="bg-neo-yellow text-black font-bold py-5 px-6 border-4 border-neo-yellow hover:bg-white hover:border-white transition-colors flex items-center justify-between gap-4 group"
            >
              <span className="font-mono text-xs tracking-widest text-gray-700">EMAIL</span>
              <span className="font-black text-base md:text-lg truncate">{PROFILE_DATA.contact.email}</span>
              <span aria-hidden>↗</span>
            </a>
            <a
              href={`https://${PROFILE_DATA.contact.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="bg-neo-pink text-black font-bold py-5 px-6 border-4 border-neo-pink hover:bg-white hover:border-white transition-colors flex items-center justify-between gap-4"
            >
              <span className="font-mono text-xs tracking-widest text-gray-700">LINKEDIN</span>
              <span className="font-black text-base md:text-lg truncate">/in/twinkle-garg</span>
              <span aria-hidden>↗</span>
            </a>
            <a
              href="https://github.com/isaee-xyz"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black font-bold py-5 px-6 border-4 border-white hover:bg-neo-yellow hover:border-neo-yellow transition-colors flex items-center justify-between gap-4"
            >
              <span className="font-mono text-xs tracking-widest text-gray-700">GITHUB</span>
              <span className="font-black text-base md:text-lg">isaee-xyz</span>
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        {/* Footer line */}
        <div className="mt-20 pt-8 border-t-2 border-neo-yellow flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-gray-400">
          <span>© {new Date().getFullYear()} TWINKLE GARG · ISAEE.XYZ · BUILT IN BENGALURU</span>
          <span>SHIPPED WITH REACT + GEMINI · STILL UNDER CONSTRUCTION</span>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
