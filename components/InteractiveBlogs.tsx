export default function InteractiveBlogs() {
  return (
    <section id="interactive-blogs" className="bg-neo-yellow border-b-4 border-black py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="font-mono text-xs font-bold tracking-widest mb-3">[ 05 / INTERACTIVE BLOGS ]</div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight">Ideas you<br />can explore.</h2>
            <p className="text-lg mt-5 max-w-lg">Visual explanations of the systems shaping our world. Scroll through the mechanics, one idea at a time.</p>
            <a href="/interactive-blogs/" className="inline-block mt-6 font-mono text-sm font-bold underline underline-offset-4">All interactive blogs →</a>
            <a href="/interactive-blogs/sorting/" className="block mt-6 border-t-2 border-black pt-5 max-w-lg group">
              <span className="font-mono text-xs font-bold">NEW · ALGORITHMS & EVERYDAY LIFE</span>
              <h3 className="text-2xl font-black mt-2 group-hover:underline">This looks wrong. It still sorts. ↗</h3>
              <p className="mt-2 text-base">Solve a sorting mystery, rebuild one picture 16 ways, and learn how to think in steps.</p>
            </a>
          </div>
          <a href="/interactive-blogs/ai-text-watermarking/" className="group block bg-white border-4 border-black shadow-neo-lg p-6 md:p-8 hover:-translate-y-1 transition-transform focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4">
            <div className="font-mono text-xs font-bold tracking-widest mb-6">01 · ARTIFICIAL INTELLIGENCE</div>
            <div aria-hidden="true" className="flex flex-wrap gap-2 mb-7 font-mono text-base">
              {['The', 'invisible', 'watermark'].map((word, i) => <span key={word} className={`border-2 border-black px-3 py-2 ${i === 1 ? 'bg-neo-pink' : 'bg-neo-green'}`}>{word}</span>)}
            </div>
            <h3 className="text-3xl font-black leading-tight group-hover:underline">Why you cannot see a watermark in AI text</h3>
            <p className="mt-3 text-base">Follow a token from a probability chart to a secret pattern. Explore green lists, tournament sampling, and the limits of detection.</p>
            <div className="mt-6 pt-4 border-t-2 border-black font-mono text-sm font-bold flex justify-between"><span>SCROLL TO EXPLORE</span><span aria-hidden="true">↗</span></div>
          </a>
        </div>
      </div>
    </section>
  );
}
