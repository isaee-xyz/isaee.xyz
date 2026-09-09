import React from 'react';
import { PROFILE_DATA } from '../constants';

const Publications: React.FC = () => {
  return (
    <section id="writing" className="bg-neo-pink border-b-4 border-black py-20 md:py-28">
      <div className="container mx-auto px-4">

        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs font-bold tracking-widest mb-3">[ 06 / WRITING ]</div>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight">
            One book.<br />Many essays.
          </h2>
          <p className="text-lg md:text-xl mt-5 max-w-2xl border-l-4 border-black pl-4">
            I think out loud. About AI architecture, civic history, the philosophy of building. The book is fiction; everything else is honest.
          </p>
        </div>

        {/* Book — featured */}
        <a
          href={PROFILE_DATA.book.link}
          target="_blank"
          rel="noreferrer"
          className="group block bg-white border-4 border-black shadow-neo-lg hover:shadow-neo-xl hover:-translate-x-1 hover:-translate-y-1 transition-all mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-3 bg-neo-yellow border-b-4 md:border-b-0 md:border-r-4 border-black p-6 flex items-center justify-center min-h-[160px]">
              <div className="bg-white border-4 border-black p-3 text-center w-full max-w-[180px] shadow-neo">
                <div className="font-mono text-[10px] font-bold border-b-2 border-black pb-1 mb-2">KINDLE EDITION</div>
                <div className="font-black text-lg uppercase leading-tight">Aisha's<br />Quest</div>
                <div className="font-mono text-[10px] mt-2">Twinkle Garg</div>
              </div>
            </div>
            <div className="md:col-span-9 p-6 md:p-8">
              <div className="font-mono text-[10px] font-bold tracking-widest mb-2">FEATURED · BOOK</div>
              <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight group-hover:underline decoration-4">
                {PROFILE_DATA.book.title}
              </h3>
              <p className="font-mono text-sm font-bold text-neo-blue mt-1">{PROFILE_DATA.book.subtitle}</p>
              <p className="text-sm md:text-base leading-relaxed mt-4 border-l-4 border-neo-pink pl-3">
                {PROFILE_DATA.book.description}
              </p>
              <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
                <div className="font-mono text-xs">
                  <span className="text-gray-500">EDITORS </span>
                  <span className="font-bold">GPT-4 · Claude</span>
                </div>
                <span className="font-mono text-xs font-black border-2 border-black px-3 py-1 group-hover:bg-black group-hover:text-white transition-colors">
                  GET ON AMAZON ↗
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Articles — dense list, not card-grid */}
        <div className="border-4 border-black bg-white">
          <div className="bg-black text-white px-5 py-3 flex justify-between items-center">
            <span className="font-mono text-xs font-bold tracking-widest">+ ESSAYS</span>
            <span className="font-mono text-[10px] text-gray-400">{PROFILE_DATA.articles.length} pieces, ~1 / month</span>
          </div>
          <ul className="divide-y-2 divide-black">
            {PROFILE_DATA.articles.map((a, i) => (
              <li key={i}>
                <a
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-12 gap-4 px-5 py-4 hover:bg-neo-yellow transition-colors"
                >
                  <span className="col-span-3 md:col-span-2 font-mono text-[10px] md:text-xs font-bold pt-1 text-gray-600">{a.date}</span>
                  <div className="col-span-9 md:col-span-10">
                    <div className="font-bold text-base md:text-lg leading-tight group-hover:underline">{a.title}</div>
                    <p className="text-xs md:text-sm text-gray-700 mt-1 line-clamp-2">{a.description}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default Publications;
