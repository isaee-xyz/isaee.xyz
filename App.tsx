import React from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-black overflow-x-hidden selection:bg-neo-pink selection:text-white">
      {/* Decorative Header Bar */}
      <div className="bg-black text-white font-mono text-xs py-1 px-2 flex justify-between items-center sticky top-0 z-40 border-b-4 border-white">
        <span>TWINKLE_GARG_PORTFOLIO_V1.0</span>
        <div className="flex gap-4">
           <span>SYS: ONLINE</span>
           <span>LOC: BENGALURU</span>
        </div>
      </div>

      <main>
        <Hero />
        <div className="h-4 bg-black w-full pattern-diagonal-lines"></div>
        <Skills />
        <Experience />
        <Contact />
      </main>

      <ChatWidget />
      
      {/* Decorative background grid fix */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(#00000011_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </div>
  );
};

export default App;
