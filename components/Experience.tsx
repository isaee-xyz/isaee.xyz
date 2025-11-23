import React from 'react';
import NeoCard from './NeoCard';
import { PROFILE_DATA } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Experience Column */}
        <div>
          <h2 className="text-4xl font-black mb-8 border-b-4 border-black inline-block bg-neo-yellow px-2">
            EXPERIENCE
          </h2>
          <div className="space-y-8">
            {PROFILE_DATA.experience.map((exp, idx) => (
              <NeoCard key={idx} className="relative group">
                <div className="absolute -left-3 -top-3 w-8 h-8 bg-black text-white flex items-center justify-center font-bold border-2 border-white z-10">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold uppercase">{exp.role}</h3>
                <h4 className="text-neo-blue font-black text-lg">{exp.company}</h4>
                <div className="font-mono text-sm text-gray-600 my-2 bg-gray-100 p-1 inline-block border border-black">
                  {exp.period}
                </div>
                {exp.description && <p className="mt-2 font-medium">{exp.description}</p>}
                <p className="text-xs text-gray-500 mt-1">{exp.location}</p>
              </NeoCard>
            ))}
          </div>
        </div>

        {/* Education & Awards Column */}
        <div>
          <h2 className="text-4xl font-black mb-8 border-b-4 border-black inline-block bg-neo-pink px-2">
            EDUCATION
          </h2>
          <div className="space-y-8 mb-12">
            {PROFILE_DATA.education.map((edu, idx) => (
              <NeoCard key={idx} color="bg-white">
                <h3 className="text-xl font-bold">{edu.institution}</h3>
                <p className="font-mono text-sm">{edu.degree}</p>
                <p className="text-gray-500 text-xs font-bold mt-1">{edu.period}</p>
              </NeoCard>
            ))}
          </div>

          <h2 className="text-4xl font-black mb-8 border-b-4 border-black inline-block bg-neo-green px-2">
            PUBLICATIONS
          </h2>
          <div className="space-y-4">
             {PROFILE_DATA.publications.map((pub, idx) => (
               <div key={idx} className="bg-black text-white p-4 border-4 border-neo-yellow shadow-neo">
                 <p className="font-bold italic">"{pub}"</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
