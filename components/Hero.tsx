import React from 'react';
import NeoCard from './NeoCard';
import NeoButton from './NeoButton';
import { PROFILE_DATA } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row gap-12 items-center">
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className="inline-block bg-neo-orange border-2 border-black px-4 py-1 font-mono font-bold self-start transform -rotate-2 shadow-neo">
          HELLO_WORLD
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight tracking-tighter">
          {PROFILE_DATA.name}
        </h1>
        <h2 className="text-2xl font-bold font-mono bg-neo-yellow inline-block self-start px-2 border-2 border-black">
          {PROFILE_DATA.headline}
        </h2>
        <p className="text-lg font-medium border-l-4 border-neo-blue pl-4 py-2">
          {PROFILE_DATA.subHeadline}
          <br />
          <span className="text-gray-600 text-sm font-mono mt-2 block">📍 {PROFILE_DATA.location}</span>
        </p>
        
        <div className="flex gap-4 flex-wrap">
          <NeoButton onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
            LET'S CONNECT
          </NeoButton>
          <NeoButton variant="secondary" onClick={() => document.getElementById('experience')?.scrollIntoView({behavior: 'smooth'})}>
            VIEW WORK
          </NeoButton>
        </div>
      </div>

      <div className="w-full md:w-1/2 relative">
        <NeoCard className="rotate-2 hover:rotate-0 relative z-10" color="bg-white">
          <div className="aspect-square bg-gray-200 border-2 border-black overflow-hidden relative group">
             {/* Placeholder for profile image since none provided, using a stylish brutalist placeholder */}
             <img 
               src="https://picsum.photos/800/800?grayscale" 
               alt="Twinkle Garg"
               className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
             />
             <div className="absolute inset-0 bg-neo-pink mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity"></div>
          </div>
          <div className="mt-4 font-mono text-sm border-t-2 border-black pt-2 flex justify-between">
            <span>STATUS: BUILDING</span>
            <span className="font-bold text-neo-blue">ONLINE</span>
          </div>
        </NeoCard>
        <div className="absolute top-0 right-0 w-full h-full bg-black border-4 border-black transform translate-x-4 translate-y-4 -z-0"></div>
      </div>
    </section>
  );
};

export default Hero;