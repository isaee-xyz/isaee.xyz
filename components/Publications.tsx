import React from 'react';
import NeoCard from './NeoCard';
import NeoButton from './NeoButton';
import { PROFILE_DATA } from '../constants';

const Publications: React.FC = () => {
  return (
    <section id="publications" className="container mx-auto px-4 py-20 bg-white">
      <div className="mb-16">
        <div className="inline-block bg-neo-green border-2 border-black px-4 py-1 font-mono font-bold mb-4 shadow-neo">
          READ_ME.md
        </div>
        <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
          Publications & <span className="text-neo-blue">Thoughts</span>
        </h2>
        <p className="text-xl max-w-2xl border-l-4 border-neo-pink pl-4">
          Documenting my journey through AI, tech, and storytelling.
        </p>
      </div>

      {/* Featured Book Section */}
      <div className="mb-20">
        <h3 className="text-2xl font-black mb-8 border-b-4 border-black inline-block pr-12">
          AUTHORED BOOK
        </h3>
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Book Cover Placeholder / Graphic */}
          <div className="lg:w-1/3 shrink-0">
             <div className="bg-neo-yellow border-4 border-black p-4 h-full shadow-neo-lg flex items-center justify-center min-h-[400px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity z-10"></div>
                {/* Simulated Book Spine/Cover Effect */}
                <div className="w-48 h-72 bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col p-4 text-center justify-between rotate-3 transition-transform group-hover:rotate-0">
                   <div className="border-b-2 border-black pb-2">
                     <span className="font-mono text-xs font-bold block">KINDLE EDITION</span>
                   </div>
                   <div className="font-black text-xl uppercase leading-tight">
                     Aisha's<br/>Quest
                   </div>
                   <div className="text-xs font-mono">
                     Twinkle Garg
                   </div>
                </div>
             </div>
          </div>
          
          {/* Book Details */}
          <div className="lg:w-2/3 flex flex-col justify-center">
            <NeoCard className="h-full flex flex-col justify-center gap-4 border-l-0 lg:border-l-4 border-t-4 lg:border-t-4" color="bg-white">
              <div>
                <h4 className="text-3xl md:text-4xl font-black uppercase leading-tight">
                  {PROFILE_DATA.book.title}
                </h4>
                <p className="text-xl text-neo-blue font-bold font-mono mt-2">
                  {PROFILE_DATA.book.subtitle}
                </p>
              </div>
              
              <div className="bg-gray-100 p-4 border-2 border-black font-mono text-sm">
                <span className="font-bold">EDITORS:</span> {PROFILE_DATA.book.authors}
              </div>

              <p className="text-lg leading-relaxed border-l-4 border-neo-yellow pl-4">
                {PROFILE_DATA.book.description}
              </p>

              <div className="mt-4">
                <a href={PROFILE_DATA.book.link} target="_blank" rel="noreferrer">
                  <NeoButton variant="accent">
                    GET IT ON AMAZON ↗
                  </NeoButton>
                </a>
              </div>
            </NeoCard>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div>
        <h3 className="text-2xl font-black mb-8 border-b-4 border-black inline-block pr-12">
          FEATURED ARTICLES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROFILE_DATA.articles.map((article, idx) => (
            <NeoCard key={idx} className="flex flex-col justify-between h-full hover:bg-neo-pink/10" color="bg-white">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-black text-white px-2 py-1 font-mono text-xs font-bold">
                    {article.date}
                  </span>
                  <span className="text-2xl">✍️</span>
                </div>
                <h4 className="text-xl font-black uppercase mb-3 leading-tight group-hover:underline">
                  <a href={article.link} target="_blank" rel="noreferrer">
                    {article.title}
                  </a>
                </h4>
                <p className="text-gray-700 text-sm mb-6 border-l-2 border-black pl-3">
                  {article.description}
                </p>
              </div>
              <a href={article.link} target="_blank" rel="noreferrer" className="self-start">
                <span className="font-mono font-bold border-b-2 border-black hover:bg-neo-yellow transition-colors">
                  READ ARTICLE ->
                </span>
              </a>
            </NeoCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;