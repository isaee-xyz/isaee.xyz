import React from 'react';
import { PROFILE_DATA } from '../constants';

const Skills: React.FC = () => {
  return (
    <section className="bg-neo-blue py-20 border-y-4 border-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-12 uppercase drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          Expertise & Skills
        </h2>
        
        <div className="flex flex-wrap gap-4">
          {PROFILE_DATA.skills.map((skill, index) => (
            <div 
              key={index}
              className={`
                px-6 py-3 border-2 border-black font-bold text-lg shadow-neo
                transition-transform hover:-translate-y-1 hover:shadow-neo-lg
                ${index % 3 === 0 ? 'bg-neo-yellow' : index % 3 === 1 ? 'bg-neo-pink' : 'bg-neo-green'}
              `}
            >
              #{skill}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white border-4 border-black p-8 shadow-neo-lg">
           <h3 className="text-2xl font-bold mb-4 font-mono">CORE_FOCUS</h3>
           <p className="text-xl leading-relaxed">
             {PROFILE_DATA.summary}
           </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
