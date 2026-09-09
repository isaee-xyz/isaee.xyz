import React from 'react';

const Story: React.FC = () => {
  return (
    <section id="story" className="bg-white border-b-4 border-black py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-4xl">

        <div className="font-mono text-xs font-bold tracking-widest mb-3">[ 05 / STORY ]</div>
        <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight mb-10">
          The short<br />version.
        </h2>

        {/* Five-sentence story — load-bearing only */}
        <div className="text-xl md:text-2xl leading-relaxed font-medium space-y-5 max-w-3xl border-l-4 border-black pl-6">
          <p>
            Bathinda kid. Engineering at <span className="bg-neo-yellow px-1">PEC, Chandigarh</span> — graduated with the college's highest honour, <em>Institute Colors</em>.
          </p>
          <p>
            Five years in startups: business analyst → BD → product marketing → growth manager. Currently owning B2C and B2B growth at <span className="bg-neo-pink px-1">Infinity Learn</span> in Bengaluru.
          </p>
          <p>
            Somewhere along the way I stopped being the marketer <em>for</em> builders and became one. I write code in evenings. I write books on weekends. I run autonomous AI agents the rest of the time.
          </p>
          <p className="font-bold">
            Now I'm betting the next chapter on Howtohelp — and applying to <span className="bg-black text-neo-yellow px-1">YC Winter 2026</span>.
          </p>
        </div>

        {/* Footnote facts — quiet, dense */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="border-l-2 border-black pl-3">
            <div className="font-mono text-[10px] tracking-widest text-gray-500">BORN</div>
            <div className="font-bold">Sep 2, 1997 · Bathinda</div>
          </div>
          <div className="border-l-2 border-black pl-3">
            <div className="font-mono text-[10px] tracking-widest text-gray-500">DEGREE</div>
            <div className="font-bold">B.Tech ECE, PEC '21</div>
          </div>
          <div className="border-l-2 border-black pl-3">
            <div className="font-mono text-[10px] tracking-widest text-gray-500">HONOUR</div>
            <div className="font-bold">Institute Colors, Aug '21</div>
          </div>
          <div className="border-l-2 border-black pl-3">
            <div className="font-mono text-[10px] tracking-widest text-gray-500">BASED</div>
            <div className="font-bold">Bengaluru, Karnataka</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Story;
