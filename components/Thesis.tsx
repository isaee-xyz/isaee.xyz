import React, { useState } from 'react';
import { PROFILE_DATA } from '../constants';

const Thesis: React.FC = () => {
  const { thesis } = PROFILE_DATA;
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="thesis" className="bg-black border-y-4 border-black relative overflow-hidden">

      {/* Try the actual photo first; CSS recreation falls back automatically */}
      {!imgFailed && (
        <img
          src="/neon-thesis.jpg"
          alt="Neon sign reading: This present moment used to be the unimaginable"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      )}

      {/* CSS-faithful neon recreation (fallback) */}
      {imgFailed && (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, #2a0014 0%, #100008 60%, #000 100%)' }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(0deg, transparent 24px, #555 25px), linear-gradient(90deg, transparent 24px, #555 25px)',
              backgroundSize: '25px 25px',
            }}
          />
        </>
      )}

      {/* Vignette to ensure text reads on the photo too */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.55) 100%)' }}
      />

      <div className="relative container mx-auto px-4 py-28 md:py-44 flex flex-col items-center text-center">

        <div className="font-mono text-[10px] font-bold tracking-[0.3em] mb-6" style={{ color: '#ffb6dc' }}>
          [ 04 / WHY NOW ]
        </div>

        {/* The neon line — kept readable whether the photo loads or not */}
        <h2
          className="font-black uppercase leading-[1.05] tracking-tight text-3xl sm:text-5xl md:text-7xl max-w-5xl"
          style={imgFailed ? {
            color: '#ff2d8a',
            textShadow:
              '0 0 6px #ff2d8a, 0 0 14px #ff2d8a, 0 0 28px #ff2d8a, 0 0 56px rgba(255,45,138,0.6), 0 0 90px rgba(255,45,138,0.35)',
          } : {
            color: 'white',
            textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 0 12px rgba(0,0,0,0.4)',
          }}
        >
          {thesis.quote}
        </h2>

        <p className="font-mono text-sm md:text-base mt-6 italic" style={{ color: '#ffb6dc' }}>
          {thesis.attribution}
        </p>

        {/* Long-form thesis — single block, white card on dark */}
        <div className="mt-12 md:mt-16 max-w-3xl bg-white border-4 border-white p-6 md:p-8 text-left" style={{ boxShadow: '12px 12px 0 0 #ff2d8a' }}>
          <div className="font-mono text-[10px] font-bold tracking-widest mb-3 text-black">// THE BET</div>
          <p className="text-base md:text-lg leading-relaxed text-black">
            {thesis.body}
          </p>
        </div>

      </div>
    </section>
  );
};

export default Thesis;
