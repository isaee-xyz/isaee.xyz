(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;};
const prog=$('#progress');
addEventListener('scroll',()=>{const h=document.documentElement;prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';},{passive:true});

/* auto-fit so nothing can ever clip */
function fitAll(){
  $$('.figure').forEach(w=>{
    const stage=$('.stage',w), fit=$('.fit',w);
    if(!stage||!fit) return;
    fit.style.transform='scale(1)';
    const avW=stage.clientWidth, avH=stage.clientHeight;
    let nW=0,nH=0;
    $$('.layer',fit).forEach(l=>{
      const was=l.classList.contains('show');
      if(!was){l.style.visibility='hidden';l.classList.add('show');}
      const p=$('.panel',l); if(p){nW=Math.max(nW,p.scrollWidth); nH=Math.max(nH,p.scrollHeight);}
      if(!was){l.classList.remove('show');l.style.visibility='';}
    });
    if(!nW||!nH) return;
    const s=Math.min(1,(avW-10)/nW,(avH-10)/nH);
    fit.style.transform='scale('+(s<0.4?0.4:s)+')';
  });
}
addEventListener('resize',fitAll);
if(window.ResizeObserver){const ro=new ResizeObserver(()=>fitAll());$$('.figure').forEach(w=>ro.observe(w));}

/* hero */
const heroWords=['This','sentence','was','written','by','a','machine','and','you','cannot','tell'];
const heroCols=['g','g','r','g','g','r','g','g','r','g','g'];
const ht=$('#heroTiles');
heroWords.forEach(w=>ht.appendChild(el('span','tile big',w)));
setTimeout(()=>{[...ht.children].forEach((t,i)=>setTimeout(()=>t.classList.add(heroCols[i]),i*130));},800);

/* data */
const FOX=[{t:'fox',p:.42},{t:'dog',p:.18},{t:'cat',p:.12},{t:'hare',p:.09},{t:'bear',p:.06},{t:'leaf',p:.03}];
const PARIS=[{t:'Paris',p:.985},{t:'Lyon',p:.007},{t:'Nice',p:.005},{t:'Rome',p:.003}];
const GREEN={fox:1,dog:0,cat:1,hare:1,bear:0,leaf:1,Paris:0,Lyon:1,Nice:1,Rome:0};
let sd=9; const rnd=()=>{sd=(sd*1103515245+12345)&0x7fffffff;return sd/0x7fffffff;};
const drawT=d=>{let r=rnd(),a=0;for(const c of d){a+=c.p;if(r<=a)return c.t;}return d[d.length-1].t;};

/* FIG A */
const aTiles=$('#a-tiles'), aBars=$('#a-bars');
'The quick brown'.split(' ').forEach(w=>aTiles.appendChild(el('span','tile ghost',w)));
function mkBars(host,data,o={}){
  host.innerHTML='';
  data.forEach(c=>{
    const b=el('div','bar'); b.dataset.t=c.t;
    const n=el('div'); n.appendChild(el('span','tile sm',c.t)); b.appendChild(n);
    const tr=el('div','track'); const f=el('div','fill'); tr.appendChild(f);
    if(o.ghost){const gm=el('div','ghostmark'); gm.style.left=(c.p*100)+'%'; tr.appendChild(gm);}
    b.appendChild(tr);
    const v=el('div','pct'); v.appendChild(el('span',null,c.p.toFixed(2)));
    if(o.obs) v.appendChild(el('span','obs','--'));
    b.appendChild(v); host.appendChild(b);
  });
  requestAnimationFrame(()=>$$('.fill',host).forEach((f,i)=>f.style.width=(data[i].p*100)+'%'));
}
mkBars(aBars,FOX);
let cnt={},tot=0;
function renderObs(){
  $$('#a-bars .bar').forEach(b=>{const o=$('.obs',b); if(o) o.textContent = tot? ((cnt[b.dataset.t]||0)/tot).toFixed(2):'--';});
  $('#a-tally').textContent = tot? tot+(tot===1?' draw':' draws'):'0 draws';
}
$('#a-s1').onclick=()=>{const t=drawT(FOX);cnt[t]=(cnt[t]||0)+1;tot++;renderObs();$$('#a-bars .bar').forEach(b=>b.classList.toggle('win',b.dataset.t===t));};
$('#a-s100').onclick=()=>{for(let i=0;i<100;i++){const t=drawT(FOX);cnt[t]=(cnt[t]||0)+1;tot++;}renderObs();$$('#a-bars .bar').forEach(b=>b.classList.remove('win'));};
$('#a-reset').onclick=()=>{cnt={};tot=0;renderObs();$$('#a-bars .bar').forEach(b=>b.classList.remove('win'));};
const aL=$$('[data-fig="A"] .layer');
function figA(i){
  aL.forEach((l,k)=>l.classList.toggle('show',k===(i<=1?0:1)));
  if(i<=1) [...aTiles.children].forEach(t=>t.classList.toggle('ghost',i===0));
  if(i>=2){
    const low=i===4;
    $('#a-cap').textContent = low?'Low entropy: the capital of France is':'Next token distribution';
    mkBars(aBars, low?PARIS:FOX, {obs:i===3, ghost:i===3});
    $('#a-ctrl').hidden = i!==3;
    if(i===3){cnt={};tot=0;renderObs();}
  }
  fitAll();
}

/* FIG B */
const toy=['fox','dog','cat','hare','bear','leaf','wolf','deer','sky','and','the','of','river','stone','quiet','loud','jumps','runs','over','under','bird','tree','wind','rain','coat','bag','bell','road','moon','sun','hill','song'];
const toyG=[1,0,1,1,0,1,1,0,1,0,1,1,0,1,0,1,0,1,1,0,1,0,0,1,1,0,1,0,1,0,0,1];
const bV=$('#b-vocab'); toy.forEach(w=>bV.appendChild(el('span','tile sm',w)));
const bT=$$('.tile',bV);
let bMode='off', bCtx='fox', bBoost=2;
function calc(data,boost,mode){
  const out=data.map(c=>{const g=GREEN[c.t]===1; let lg=Math.log(Math.max(c.p,1e-9));
    if(mode==='soft'&&g) lg+=boost; return {t:c.t,g,lg,banned:mode==='hard'&&!g};});
  const live=out.filter(o=>!o.banned); const mx=Math.max(...live.map(o=>o.lg));
  let z=0; live.forEach(o=>{o.e=Math.exp(o.lg-mx);z+=o.e;});
  out.forEach(o=>o.p=o.banned?0:o.e/z); return out;
}
function renderB(){
  const src = bCtx==='fox'?FOX:PARIS;
  const res = calc(src,bBoost,bMode);
  $('#b-sent').innerHTML = (bCtx==='fox'?'The quick brown ':'The capital of France is ')+'<span class="blank">&nbsp;</span>';
  $('#b-cap').textContent = bMode==='off'?'The model’s own distribution':(bMode==='hard'?'Hard ban: red removed':'Soft boost: green logits raised');
  const host=$('#b-bars'); host.innerHTML='';
  res.forEach((o,i)=>{
    const b=el('div','bar '+(o.g?'g':'r')); b.dataset.t=o.t;
    const n=el('div'); const tk=el('span','tile sm '+(o.g?'g':'r')+(o.banned?' ban':''),o.t); n.appendChild(tk); b.appendChild(n);
    const tr=el('div','track'); const f=el('div','fill'); tr.appendChild(f);
    const gm=el('div','ghostmark'); gm.style.left=(src[i].p*100)+'%'; tr.appendChild(gm); b.appendChild(tr);
    const v=el('div','pct'); v.appendChild(el('span',null,o.p.toFixed(3))); b.appendChild(v);
    host.appendChild(b);
  });
  requestAnimationFrame(()=>$$('#b-bars .fill').forEach((f,i)=>f.style.width=(res[i].p*100)+'%'));
  const top=res.reduce((a,b)=>b.p>a.p?b:a), orig=src[0].t;
  let m;
  if(bMode==='off') m='The model’s own distribution. The thin marker on each bar shows this original value, so you can see what the other modes change.';
  else if(bMode==='hard') m = top.t!==orig
    ? 'Red tokens are removed entirely. The correct answer '+orig+' was on the red list, so the model is forced into '+top.t+'. This is why the hard variant is a teaching example rather than a deployed method.'
    : 'Red tokens are removed entirely. Here the leader happened to be green, so nothing looks wrong. That is luck, not safety.';
  else m = top.t===orig
    ? 'With δ = '+bBoost.toFixed(1)+', '+orig+' still leads at '+top.p.toFixed(3)+'. A modest boost leaves a strongly preferred token overwhelmingly likely.'
    : 'With δ = '+bBoost.toFixed(1)+' the boost has overturned the leader: '+top.t+' now beats '+orig+'. The soft variant is a dial, not a guarantee.';
  $('#b-verdict').textContent=m;
  $('#b-boostwrap').hidden = bMode!=='soft';
  fitAll();
}
$$('#b-mode button').forEach(b=>b.onclick=()=>{bMode=b.dataset.m;$$('#b-mode button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderB();});
$$('#b-ctx button').forEach(b=>b.onclick=()=>{bCtx=b.dataset.c;$$('#b-ctx button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderB();});
$('#b-boost').oninput=e=>{bBoost=+e.target.value;$('#b-boostv').textContent=bBoost.toFixed(1);renderB();};
const bL=$$('[data-fig="B"] .layer');
function figB(i){
  bL.forEach((l,k)=>l.classList.toggle('show',k===(i===0?0:i===1?1:2)));
  if(i===1) bT.forEach((t,k)=>t.className='tile sm '+(toyG[k]?'g':'r'));
  if(i===2){bMode='hard';bCtx='fox';}
  if(i===3){bMode='hard';bCtx='paris';}
  if(i>=4){bMode='soft';bCtx='paris';}
  if(i>=2){
    $$('#b-mode button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.m===bMode));
    $$('#b-ctx button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.c===bCtx));
    renderB();
  }
  fitAll();
}

/* FIG C: connected bracket, mixed survivors */
const SEATS=['fox','fox','dog','hare','cat','fox','fox','bear'];
const G1={fox:1,dog:0,cat:1,hare:0,bear:0,leaf:1};
const G2={fox:0,dog:1,cat:1,hare:0,bear:0,leaf:0};
const G3={fox:0,dog:0,cat:1,hare:0,bear:0,leaf:0};
const R1W=[0,2,4,6];            // fox, dog, cat, fox
const R1TIE=[true,true,true,false];
const R2TIE=[false,false];
const brk=$('#c-brk'); let cols=[], wires=null;
function build(seats){
  brk.innerHTML='';
  wires=document.createElementNS('http://www.w3.org/2000/svg','svg');
  wires.setAttribute('class','wires'); brk.appendChild(wires);
  const heads=['Sampled 2³','g₁','g₂','g₃'], n=[8,4,2,1]; cols=[];
  n.forEach((c,ci)=>{
    const col=el('div','bcol'); col.appendChild(el('div','bhead',heads[ci]));
    const s=el('div','bslots'); const arr=[];
    for(let j=0;j<c;j++){const sl=el('div','slot');const tk=el('span','tile','');sl.appendChild(tk);const g=el('span','gv','');sl.appendChild(g);s.appendChild(sl);arr.push({sl,tk,g});}
    col.appendChild(s); brk.appendChild(col); cols.push(arr);
  });
}
function wire(upto){
  if(!wires) return; const bb=brk.getBoundingClientRect(); let d='';
  for(let ci=0;ci<3 && ci<upto;ci++){
    const from=cols[ci], to=cols[ci+1];
    for(let j=0;j<to.length;j++){
      const t=to[j].sl.getBoundingClientRect();
      const x2=t.left-bb.left, y2=t.top-bb.top+t.height/2;
      [2*j,2*j+1].forEach(k=>{ if(!from[k])return;
        const f=from[k].sl.getBoundingClientRect();
        const x1=f.right-bb.left, y1=f.top-bb.top+f.height/2, mx=(x1+x2)/2;
        d+=`M${x1} ${y1} H${mx} V${y2} H${x2} `; });
    }
  }
  wires.innerHTML = d?`<path d="${d}" fill="none" stroke="var(--rule)" stroke-width="1.5"/>`:'';
}
function paint(ci,names,gm,win,ties){
  cols[ci].forEach((o,k)=>{
    o.tk.style.visibility=''; o.tk.textContent=names[k];
    const gv = gm? (gm[names[k]]??0) : null;
    o.tk.className='tile'+(gm?(gv?' g':' r'):'');
    if(gm){o.g.textContent=gv;o.g.className='gv '+(gv?'one':'zero');} else {o.g.textContent='';o.g.className='gv';}
    if(win && !win.includes(k)) o.tk.classList.add('dim');
    const old=$('.tiebadge',o.sl); if(old) old.remove();
    if(ties && ties[Math.floor(k/2)] && k%2===0) o.sl.appendChild(el('span','tiebadge','tie'));
  });
}
function clearCol(ci){cols[ci].forEach(o=>{o.tk.textContent='';o.tk.className='tile';o.tk.style.visibility='hidden';o.g.textContent='';o.g.className='gv';const b=$('.tiebadge',o.sl);if(b)b.remove();});}
function figC(i){
  const low = i===4;
  const mode = low?'low':'norm';
  if(brk.dataset.m!==mode){ build(low?Array(8).fill('Paris'):SEATS); brk.dataset.m=mode; }
  $('#c-cap').textContent = low?'Low entropy: nearly every seat is the same token':'Tournament sampling, m = 3';
  $('#c-illus').textContent = low?'Illustrative low entropy case. At p = 0.99 all eight seats match about 92 percent of the time.':'Illustrative bracket. Structure follows Figure 2, Dathathri et al., Nature 2024.';
  for(let c=1;c<4;c++) clearCol(c);
  if(low){
    const P=Array(8).fill('Paris');
    paint(0,P,null,null,null); paint(1,P.slice(0,4),null,null,null);
    paint(2,P.slice(0,2),null,null,null); paint(3,['Paris'],null,null,null);
    cols[3][0].tk.className='tile win';
    requestAnimationFrame(()=>wire(3)); fitAll(); return;
  }
  const r1=R1W.map(k=>SEATS[k]);            // fox, dog, cat, fox
  const r2=[r1[0],r1[3]];                    // fox, fox -> pick winners below
  if(i===0){ paint(0,SEATS,null,null,null); requestAnimationFrame(()=>wire(0)); }
  if(i===1){ paint(0,SEATS,G1,R1W,R1TIE); requestAnimationFrame(()=>wire(0)); }
  if(i===2){ paint(0,SEATS,G1,R1W,R1TIE); paint(1,r1,G2,[1,2],R2TIE); requestAnimationFrame(()=>wire(1)); }
  if(i>=3){
    paint(0,SEATS,G1,R1W,R1TIE);
    paint(1,r1,G2,[1,2],R2TIE);
    paint(2,[r1[1],r1[2]],G3,[1],null);      // dog 0 vs cat 1 -> cat
    paint(3,['cat'],null,null,null);
    cols[3][0].tk.className='tile win';
    requestAnimationFrame(()=>wire(3));
  }
  if(i===5) $('#c-cap').textContent='More layers add evidence, with diminishing returns';
  fitAll();
}

/* FIG D */
const dRows=$$('#d-tab tr[data-r]');
function figD(i){
  dRows.forEach(r=>r.classList.remove('on'));
  const map={1:[0],2:[1],3:[2,3],4:[4],5:[4]};
  (map[i]||[]).forEach(k=>dRows[k]&&dRows[k].classList.add('on'));
  fitAll();
}

/* FIG E */
const eW=['Watermarking','a','language','model','turns','out','to','be','a','question','about','sampling','rather','than','about','the','text'];
const eD=$('#e-dots');
function dots(bias){
  eD.innerHTML='';
  let s=bias?31:11; const r=()=>{s=(s*1103515245+12345)&0x7fffffff;return s/0x7fffffff;};
  eW.forEach(w=>{
    const d=el('div','dtok'); d.appendChild(el('span','tile sm',w));
    const row=el('div','drow'); let g=0;
    for(let k=0;k<30;k++){const on=r()<(bias?.62:.5); if(on)g++; const dot=el('span','d'+(on?' g':'')); row.appendChild(dot);}
    d.appendChild(row); d.appendChild(el('span','avg',(g/30).toFixed(2))); eD.appendChild(d);
  });
}
const eL=$$('[data-fig="E"] .layer');
function figE(i){
  eL.forEach((l,k)=>l.classList.toggle('show',k===(i<=1?0:i<=3?1:2)));
  if(i===0) dots(false);
  if(i===1) dots(true);
  if(i===2||i===3){
    $('#e-pin').style.left='33%'; $('#e-pinl').textContent='unwatermarked baseline · expected 0.50';
    $('#e-mean').textContent='0.50'; $('#e-z').textContent='0.2'; $('#e-v').textContent='no evidence'; $('#e-h2').style.opacity='0';
    $('#e-n').textContent = i===3?'180':'640';
    setTimeout(()=>{ if(!eL[1].classList.contains('show'))return;
      $('#e-pin').style.left='67%'; $('#e-pinl').textContent='watermarked · 0.58';
      $('#e-mean').textContent='0.58'; $('#e-z').textContent = i===3?'2.9':'6.1';
      $('#e-v').textContent = i===3?'too short to call':'mark reported'; $('#e-h2').style.opacity='1';
    },640);
  }
  fitAll();
}

/* observer */
const figs={A:figA,B:figB,C:figC,D:figD,E:figE};
const io=new IntersectionObserver(es=>{es.forEach(e=>{ if(!e.isIntersecting) return;
  const step=e.target, sec=step.closest('.scrolly');
  $$('.step',sec).forEach(s=>s.classList.toggle('on',s===step));
  figs[sec.dataset.fig](+step.dataset.i);
});},{rootMargin:'-42% 0px -42% 0px',threshold:0});
$$('.step').forEach(s=>io.observe(s));

const navA=$$('#nav a');
const nio=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting) navA.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id));});},{rootMargin:'-45% 0px -50% 0px'});
$$('section[id]').forEach(s=>nio.observe(s));

figA(0);figB(0);figC(0);figD(0);figE(0);renderB();
setTimeout(fitAll,280); setTimeout(fitAll,1200);
})();