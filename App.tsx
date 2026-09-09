import React from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import MissionControl from './components/MissionControl';
import InteractiveBlogs from './components/InteractiveBlogs';
import Publications from './components/Publications';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden selection:bg-neo-pink selection:text-white">

      {/* Top utility bar — single signal of priority */}
      <div className="bg-black text-white text-[11px] font-mono py-1.5 px-3 sticky top-0 z-40 border-b-4 border-black flex flex-wrap items-center justify-between gap-2">
        <span className="font-bold">TWINKLE GARG · BUILDER</span>
        <nav className="flex gap-4 md:gap-5 overflow-x-auto whitespace-nowrap">
          <a href="#products" className="hover:text-neo-yellow">products</a>
          <a href="#systems" className="hover:text-neo-yellow">systems</a>
          <a href="/interactive-blogs/" className="hover:text-neo-yellow">interactive blogs</a>
          <a href="#cv" className="hover:text-neo-yellow">cv</a>
          <a href="#contact" className="hover:text-neo-yellow font-bold">contact →</a>
        </nav>
      </div>

      <main>
        <Hero />
        <Projects />
        <MissionControl />
        <InteractiveBlogs />
        <Publications />
        <Experience />
        <Contact />
      </main>

      <ChatWidget />
    </div>
  );
};

export default App;
