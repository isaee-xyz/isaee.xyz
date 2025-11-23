import React from 'react';
import { PROFILE_DATA } from '../constants';
import NeoButton from './NeoButton';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-neo-yellow border-t-4 border-black py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase leading-none">
          Let's Build<br/>The Future
        </h2>
        <p className="text-xl font-bold mb-12 max-w-2xl mx-auto">
          Open to connecting for YC Winter 2025 collaboration, AI initiatives, or just a coffee chat in Bengaluru.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
          <a href={`mailto:${PROFILE_DATA.contact.email}`}>
            <NeoButton className="text-xl py-4 px-8">
              EMAIL ME
            </NeoButton>
          </a>
          <a href={`https://${PROFILE_DATA.contact.linkedin}`} target="_blank" rel="noreferrer">
            <NeoButton variant="secondary" className="text-xl py-4 px-8">
              LINKEDIN
            </NeoButton>
          </a>
        </div>

        <div className="mt-20 font-mono text-sm border-t-2 border-black pt-8 inline-block px-8">
          <p>© {new Date().getFullYear()} Twinkle Garg. Made with React & Gemini.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
