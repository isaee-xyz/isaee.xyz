(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;};
const prog=$('#prog');
addEventListener('scroll',()=>{const h=document.documentElement;prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';},{passive:true});

/* ---------- auto-fit: guarantees no clipping ---------- */
function fitAll(){
  $$('.figwrap').forEach(w=>{
    const stage=$('.stage',w), fit=$('.fit',w);
    if(!stage||!fit) return;
    fit.style.transform='scale(1)';
    const avW=stage.clientWidth, avH=stage.clientHeight;
    let needW=0,needH=0;
    $$('.layer',fit).forEach(l=>{
      const was=l.classList.contains('show');
      if(!was){l.style.visibility='hidden';l.classList.add('show');}
      const p=$('.panel',l); if(p){needW=Math.max(needW,p.scrollWidth); needH=Math.max(needH,p.scrollHeight);}
      if(!was){l.classList.remove('show');l.style.visibility='';}
    });
    if(!needW||!needH) return;
    const s=Math.min(1, (avW-8)/needW, (avH-8)/needH);
    fit.style.transform='scale('+(s<0.35?0.35:s)+')';
  });
}
addEventListener('resize',fitAll);
if(window.ResizeObserver){const ro=new ResizeObserver(()=>fitAll());$$('.figwrap').forEach(w=>ro.observe(w));}

/* ---------- shared data (Fig 2 of the paper) ---------- */
const VOCAB=[{t:'mango',p:.50},{t:'lychee',p:.30},{t:'papaya',p:.15},{t:'durian',p:.05}];
const PARIS=[{t:'Paris',p:.985},{t:'Lyon',p:.007},{t:'Nice',p:.005},{t:'Rome',p:.003}];
const GREEN={mango:1,lychee:0,papaya:0,durian:1,Paris:0,Lyon:1,Nice:1,Rome:0};
let rngS=7;const rnd=()=>{rngS=(rngS*1103515245+12345)&0x7fffffff;return rngS/0x7fffffff;};
const draw=d=>{let r=rnd(),a=0;for(const c of d){a+=c.p;if(r<=a)return c.t;}return d[d.length-1].t;};

/* ---------- FIG A ---------- */
const aTok=$('#a-tok'), aBars=$('#a-bars');
'my favourite tropical fruit is'.split(' ').forEach(w=>aTok.appendChild(el('span','tk sm',w)));
function mkBars(host,data,opts={}){
  host.innerHTML='';
  data.forEach(c=>{
    const b=el('div','bar'); b.dataset.t=c.t;
    const n=el('div'); n.appendChild(el('span','tk sm',c.t)); b.appendChild(n);
    const tr=el('div','trk'); const f=el('div','fil'); tr.appendChild(f);
    if(opts.ghost){const gm=el('div','ghostmark'); gm.style.left=(c.p*100)+'%'; tr.appendChild(gm);}
    b.appendChild(tr);
    const v=el('div','val'); v.appendChild(el('span','p',c.p.toFixed(2)));
    if(opts.obs) v.appendChild(el('span','obs','--'));
    b.appendChild(v); host.appendChild(b);
  });
  requestAnimationFrame(()=>$$('.fil',host).forEach((f,i)=>f.style.width=(data[i].p*100)+'%'));
}
mkBars(aBars,VOCAB);
let counts={},total=0;
function renderObs(){
  $$('#a-bars .bar').forEach(b=>{
    const o=$('.obs',b); if(!o) return;
    const c=counts[b.dataset.t]||0;
    o.textContent = total? (c/total).toFixed(2) : '--';
  });
  $('#a-tally').textContent = total? total+(total===1?' draw':' draws') : '0 draws';
}
function doSample(n){
  for(let i=0;i<n;i++){const t=draw(VOCAB);counts[t]=(counts[t]||0)+1;total++;}
  renderObs();
  const last=VOCAB.map(v=>v.t);
  $$('#a-bars .bar').forEach(b=>b.classList.remove('w'));
  if(n===1){const b=$$('#a-bars .bar').find(x=>x.dataset.t===Object.keys(counts).slice(-1)[0]);}
}
$('#a-s1').onclick=()=>{const t=draw(VOCAB);counts[t]=(counts[t]||0)+1;total++;renderObs();
  $$('#a-bars .bar').forEach(b=>{b.classList.toggle('w',b.dataset.t===t);});};
$('#a-s100').onclick=()=>{doSample(100);$$('#a-bars .bar').forEach(b=>b.classList.remove('w'));};
$('#a-reset').onclick=()=>{counts={};total=0;renderObs();$$('#a-bars .bar').forEach(b=>b.classList.remove('w'));};
const aL=$$('[data-fig="A"] .layer');
function figA(i){
  aL.forEach((l,k)=>l.classList.toggle('show',k===(i===0?0:1)));
  const ctrl=$('#a-ctrl');
  if(i>=1){
    const low=i===3;
    $('#a-cap').textContent = low? 'Low entropy: the capital of France is' : 'Next token distribution';
    mkBars(aBars, low?PARIS:VOCAB, {obs:i===2, ghost:i===2});
    ctrl.hidden = i!==2;
    if(i===2){counts={};total=0;renderObs();}
  }
  fitAll();
}

/* ---------- FIG B ---------- */
const bVocab=$('#b-vocab');
const toy=['mango','lychee','papaya','durian','sun','river','stone','quiet','loud','over','under','the','and','of','bright','slow','north','ember','cloth','signal','pearl','ridge','amber','frost','onyx','plume','vault','wren','cinder','harbor','lattice','drift'];
const toyG=[1,0,0,1,1,0,1,0,1,1,0,1,0,0,1,1,0,1,1,0,0,1,1,0,1,0,1,0,0,1,0,1];
toy.forEach(w=>bVocab.appendChild(el('span','tk sm',w)));
const bTiles=$$('.tk',bVocab);
let bMode='off', bCtx='fruit', bBoost=2;
function softmaxBoost(data,boost,mode){
  const out=data.map(c=>{
    const g=GREEN[c.t]===1;
    let logit=Math.log(Math.max(c.p,1e-9));
    if(mode==='soft'&&g) logit+=boost;
    return {t:c.t,g,logit, banned: mode==='hard'&&!g};
  });
  const live=out.filter(o=>!o.banned);
  const mx=Math.max(...live.map(o=>o.logit));
  let z=0; live.forEach(o=>{o.e=Math.exp(o.logit-mx);z+=o.e;});
  out.forEach(o=>o.p = o.banned?0:o.e/z);
  return out;
}
function renderB(){
  const src = bCtx==='fruit'?VOCAB:PARIS;
  const res = softmaxBoost(src,bBoost,bMode);
  $('#b-sent').innerHTML = (bCtx==='fruit'?'my favourite tropical fruit is ':'the capital of France is ')+'<span class="blank">&nbsp;</span>';
  $('#b-cap').textContent = bMode==='off'?'Original distribution':(bMode==='hard'?'Hard ban: red removed':'Soft boost: green logits raised');
  $('#b-bars').innerHTML='';
  res.forEach((o,i)=>{
    const b=el('div','bar '+(o.g?'g':'r')); b.dataset.t=o.t;
    const n=el('div'); const tk=el('span','tk sm '+(o.g?'g':'r'),o.t);
    if(o.banned) tk.style.textDecoration='line-through';
    n.appendChild(tk); b.appendChild(n);
    const tr=el('div','trk'); const f=el('div','fil'); tr.appendChild(f);
    const gm=el('div','ghostmark'); gm.style.left=(src[i].p*100)+'%'; tr.appendChild(gm);
    b.appendChild(tr);
    const v=el('div','val'); v.appendChild(el('span',null,o.p.toFixed(3))); b.appendChild(v);
    $('#b-bars').appendChild(b);
  });
  requestAnimationFrame(()=>$$('#b-bars .fil').forEach((f,i)=>f.style.width=(res[i].p*100)+'%'));
  const top=res.reduce((a,b)=>b.p>a.p?b:a);
  const orig=src[0].t;
  let msg='';
  if(bMode==='off') msg='The model’s own distribution. The thin marker on each bar shows this original value for comparison.';
  else if(bMode==='hard') msg = top.t!==orig
      ? 'Red tokens are removed entirely. The correct answer '+orig+' was on the red list, so the model is forced into '+top.t+'. This is why the hard variant is a teaching example rather than a deployed method.'
      : 'Red tokens are removed entirely. Here the leader happened to be green, so nothing looks wrong. That is luck, not safety.';
  else msg = top.t===orig
      ? 'With δ = '+bBoost.toFixed(1)+', '+orig+' still leads at '+top.p.toFixed(3)+'. A modest boost leaves a strongly preferred token overwhelmingly likely.'
      : 'With δ = '+bBoost.toFixed(1)+' the boost has overturned the leader: '+top.t+' now beats '+orig+'. The soft variant is a dial, not a guarantee.';
  $('#b-verdict').textContent=msg;
  $('#b-boostwrap').hidden = bMode!=='soft';
  fitAll();
}
$$('#b-mode button').forEach(b=>b.onclick=()=>{bMode=b.dataset.m;$$('#b-mode button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderB();});
$$('#b-ctx button').forEach(b=>b.onclick=()=>{bCtx=b.dataset.c;$$('#b-ctx button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderB();});
$('#b-boost').oninput=e=>{bBoost=+e.target.value;$('#b-boostv').textContent=bBoost.toFixed(1);renderB();};
const bL=$$('[data-fig="B"] .layer');
function figB(i){
  const idx = i===0?0 : (i===1?1:2);
  bL.forEach((l,k)=>l.classList.toggle('show',k===idx));
  if(i===1) bTiles.forEach((t,k)=>t.className='tk sm '+(toyG[k]?'g':'r'));
  if(i===2){bMode='hard';bCtx='fruit';}
  if(i===3){bMode='hard';bCtx='paris';}
  if(i>=4){bMode='soft';bCtx='paris';}
  if(i>=2){
    $$('#b-mode button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.m===bMode));
    $$('#b-ctx button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.c===bCtx));
    renderB();
  }
  fitAll();
}

/* ---------- FIG C: faithful Fig-2 bracket with wires ---------- */
const SEATS=['durian','mango','lychee','mango','papaya','lychee','mango','mango'];
const G1={durian:1,mango:1,lychee:0,papaya:0};
const G2={durian:0,mango:0,lychee:1,papaya:0};
const G3={mango:1,lychee:0,durian:0,papaya:0};
const R1W=[0,3,5,6];              // durian, mango, lychee, mango
const R2W=[1,2];                  // mango (from seat3), lychee (seat5)
const R1TIE=[true,false,true,true];
const R2TIE=[true,false];
const brk=$('#c-brk');
let colsEls=[];
function buildBracket(seats){
  brk.innerHTML='';
  const wires=document.createElementNS('http://www.w3.org/2000/svg','svg');
  wires.setAttribute('class','wires'); brk.appendChild(wires);
  const heads=['Sampled 2³','g₁','g₂','g₃'];
  const counts=[8,4,2,1]; colsEls=[];
  counts.forEach((n,ci)=>{
    const c=el('div','bcol'); c.appendChild(el('div','bhead',heads[ci]));
    const s=el('div','bslots'); const arr=[];
    for(let j=0;j<n;j++){const sl=el('div','slot');const tk=el('span','tk','');sl.appendChild(tk);const g=el('span','gv','');sl.appendChild(g);s.appendChild(sl);arr.push({sl,tk,g});}
    c.appendChild(s); brk.appendChild(c); colsEls.push(arr);
  });
  colsEls[0].forEach((o,i)=>{o.tk.textContent=seats[i];o.tk.className='tk';});
  return wires;
}
let wiresEl=buildBracket(SEATS);
function drawWires(upto){
  const bb=brk.getBoundingClientRect();
  let d='';
  for(let ci=0;ci<3;ci++){
    if(ci>=upto) break;
    const from=colsEls[ci], to=colsEls[ci+1];
    for(let j=0;j<to.length;j++){
      const t=to[j].sl.getBoundingClientRect();
      const x2=t.left-bb.left, y2=t.top-bb.top+t.height/2;
      [2*j,2*j+1].forEach(k=>{
        if(!from[k])return;
        const f=from[k].sl.getBoundingClientRect();
        const x1=f.right-bb.left, y1=f.top-bb.top+f.height/2;
        const mx=(x1+x2)/2;
        d+=`M${x1} ${y1} H${mx} V${y2} H${x2} `;
      });
    }
  }
  wiresEl.innerHTML = d? `<path d="${d}" fill="none" stroke="var(--rule)" stroke-width="1.5"/>` : '';
}
function figC(i){
  const lowE = i===4;
  const seats = lowE? Array(8).fill('Paris') : SEATS;
  if(brk.dataset.mode !== (lowE?'low':'norm')){ wiresEl=buildBracket(seats); brk.dataset.mode=lowE?'low':'norm'; }
  colsEls[0].forEach((o,k)=>{o.tk.textContent=seats[k];});
  $('#c-cap').textContent = lowE? 'Low entropy: nearly every seat is the same token' : 'Tournament sampling, m = 3';
  $('#c-illus').textContent = lowE? 'Illustrative low entropy case. With p = 0.99, all eight seats match about 92 percent of the time.' : 'Reproduces Figure 2, Dathathri et al., Nature 2024.';
  const clear=(ci)=>colsEls[ci].forEach(o=>{o.tk.textContent='';o.tk.className='tk';o.tk.style.visibility='hidden';o.g.textContent='';o.g.className='gv';const t=$('.tiebadge',o.sl);if(t)t.remove();});
  for(let ci=1;ci<4;ci++) clear(ci);
  colsEls[0].forEach((o,k)=>{o.tk.style.visibility='';o.tk.className='tk';o.g.textContent='';o.g.className='gv';const t=$('.tiebadge',o.sl);if(t)t.remove();});
  const paint=(ci,names,gmap,winners,ties)=>{
    colsEls[ci].forEach((o,k)=>{
      o.tk.style.visibility=''; o.tk.textContent=names[k];
      const gv=gmap? (gmap[names[k]]??0) : null;
      o.tk.className='tk'+(gmap? (gv?' g':' r'):'');
      if(gmap){o.g.textContent=gv;o.g.className='gv '+(gv?'one':'zero');}
      if(winners && !winners.includes(k)) o.tk.classList.add('dim');
      if(ties){const pi=Math.floor(k/2); if(ties[pi] && k%2===0){const b=el('span','tiebadge','tie'); o.sl.appendChild(b);} }
    });
  };
  if(lowE){
    if(i>=0){paint(0,seats,G3,null,null);}
    paint(1,Array(4).fill('Paris'),null,null,null);
    paint(2,Array(2).fill('Paris'),null,null,null);
    paint(3,['Paris'],null,null,null); colsEls[3][0].tk.className='tk w';
    drawWires(3); fitAll(); return;
  }
  if(i===0){ paint(0,SEATS,null,null,null); drawWires(0); }
  if(i===1){ paint(0,SEATS,G1,R1W,R1TIE); drawWires(0); }
  if(i>=2){
    paint(0,SEATS,G1,R1W,R1TIE);
    const r1=R1W.map(k=>SEATS[k]);
    paint(1,r1, i>=2?G2:null, i>=2?R2W:null, i>=2?R2TIE:null);
    drawWires(1);
  }
  if(i>=3){
    const r1=R1W.map(k=>SEATS[k]);
    const r2=R2W.map(k=>r1[k]);
    paint(2,r2,G3,[0],null);
    paint(3,['mango'],null,null,null);
    colsEls[3][0].tk.className='tk w';
    drawWires(3);
  }
  if(i===5){ $('#c-cap').textContent='More layers add evidence, with diminishing returns'; }
  fitAll(); requestAnimationFrame(()=>drawWires(i>=3?3:(i>=2?1:0)));
}

/* ---------- FIG D ---------- */
const dRows=$$('#d-tab tr[data-r]');
function figD(i){
  dRows.forEach(r=>r.classList.remove('on'));
  if(i===0){ /* nothing highlighted */ }
  else if(i<=3){ const map={1:[0],2:[1],3:[2,3]}; (map[i]||[]).forEach(k=>dRows[k].classList.add('on')); }
  else { dRows[4].classList.add('on'); }
  fitAll();
}

/* ---------- FIG E ---------- */
const eWords=['Watermarking','a','language','model','turns','out','to','be','a','question','about','sampling','rather','than','about','text','itself','which'];
const eDots=$('#e-dots');
function buildDots(bias){
  eDots.innerHTML='';
  let s=bias?31:11; const r=()=>{s=(s*1103515245+12345)&0x7fffffff;return s/0x7fffffff;};
  eWords.forEach(w=>{
    const d=el('div'); d.style.cssText='display:flex;flex-direction:column;align-items:center;gap:5px';
    d.appendChild(el('span','tk sm',w));
    const row=el('div'); row.style.cssText='display:grid;grid-template-columns:repeat(6,6px);gap:3px';
    let g=0; for(let k=0;k<30;k++){const on=r()<(bias?.62:.5); if(on)g++;
      const dot=el('span'); dot.style.cssText='width:6px;height:6px;border-radius:50%;background:'+(on?'var(--green)':'var(--red)')+';opacity:'+(on?1:.55); row.appendChild(dot);}
    d.appendChild(row);
    const a=el('span',null,(g/30).toFixed(2)); a.style.cssText='font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--ink3)';
    d.appendChild(a); eDots.appendChild(d);
  });
}
const eL=$$('[data-fig="E"] .layer');
function figE(i){
  const idx = i<=1?0 : (i<=3?1:2);
  eL.forEach((l,k)=>l.classList.toggle('show',k===idx));
  if(i===0) buildDots(false);
  if(i===1) buildDots(true);
  if(i===2||i===3){
    $('#e-pin').style.left='33%'; $('#e-pinl').textContent='unwatermarked baseline · 0.50';
    $('#e-mean').textContent='0.50'; $('#e-z').textContent='0.2'; $('#e-v').textContent='no evidence'; $('#e-h2').style.opacity='0';
    setTimeout(()=>{ if(!eL[1].classList.contains('show'))return;
      $('#e-pin').style.left='67%'; $('#e-pinl').textContent='watermarked · 0.58';
      $('#e-mean').textContent='0.58'; $('#e-z').textContent='6.1'; $('#e-v').textContent='mark reported'; $('#e-h2').style.opacity='1';
      $('#e-n').textContent = i===3? '180' : '640';
    },650);
  }
  fitAll();
}

/* ---------- observer ---------- */
const figs={A:figA,B:figB,C:figC,D:figD,E:figE};
const io=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(!e.isIntersecting) return;
    const step=e.target, sec=step.closest('.scrolly');
    $$('.step',sec).forEach(s=>s.classList.toggle('on',s===step));
    figs[sec.dataset.fig](+step.dataset.i);
  });
},{rootMargin:'-42% 0px -42% 0px',threshold:0});
$$('.step').forEach(s=>io.observe(s));

/* nav highlight */
const secs=$$('section[id]');
const navA=$$('#nav a');
const navIO=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){navA.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id));}});},{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>navIO.observe(s));

/* hero */
let hi=0; const hero=$('#heroBlank'); const hw=['mango','lychee','papaya','durian'];
setInterval(()=>{hero.textContent=hw[hi++%hw.length];},1500);
hero.textContent='mango';

figA(0);figB(0);figC(0);figD(0);figE(0);
renderB();
setTimeout(fitAll,300); setTimeout(fitAll,1200);
})();