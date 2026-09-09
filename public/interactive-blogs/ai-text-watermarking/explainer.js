
(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;};
  const prog=$('#progress');
  addEventListener('scroll',()=>{const h=document.documentElement;prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';},{passive:true});

  /* hero */
  const heroWords=['This','sentence','was','written','by','a','machine','and','you','cannot','tell'];
  const heroCols=['g','g','r','g','g','r','g','g','r','g','g'];
  const ht=$('#heroTiles');
  heroWords.forEach(w=>ht.appendChild(el('span','tile big',w)));
  setTimeout(()=>{[...ht.children].forEach((t,i)=>setTimeout(()=>t.classList.add(heroCols[i]),i*140));},900);

  /* ---------- Figure A ---------- */
  const aWords=['The','quick','brown'];
  const aTiles=$('#a-tiles'), aSent=$('#a-sent');
  aWords.forEach(w=>aTiles.appendChild(el('span','tile ghost',w)));
  const cand1=[['fox',42],['dog',18],['cat',12],['hare',7],['bear',5],['leaf',3],['other',13]];
  const cand2=[['jumps',35],['runs',22],['leaps',14],['sat',9],['darted',6],['was',4],['other',10]];
  const aBars=$('#a-bars');
  function buildBars(container,data,cls){container.innerHTML='';data.forEach(([n,p])=>{const b=el('div','bar'+(cls?' '+cls:''));const nm=el('div','name');nm.appendChild(el('span','tile sm',n));const tr=el('div','track');const f=el('div','fill');f.dataset.w=p;tr.appendChild(f);b.appendChild(nm);b.appendChild(tr);b.appendChild(el('div','pct',p+'%'));container.appendChild(b);});}
  function growBars(container){[...container.querySelectorAll('.fill')].forEach(f=>{f.style.width=Math.min(100,Number(f.dataset.w))+'%';});}
  buildBars(aBars,cand1);
  const layersA=[...$('#figA').querySelectorAll('.layer')];
  const showLayer=(layers,i)=>layers.forEach((l,k)=>{l.classList.toggle('show',k===i);l.setAttribute('aria-hidden',String(k!==i));});
  function figA(i){
    if(i<=1){showLayer(layersA,0);aSent.style.display=i===0?'block':'none';[...aTiles.children].forEach(t=>{t.classList.toggle('ghost',i===0);t.classList.remove('win');});}
    if(i===1){[...aTiles.children].forEach(t=>t.classList.remove('ghost'));}
    if(i>=2){showLayer(layersA,1);}
    if(i===2){buildBars(aBars,cand1);requestAnimationFrame(()=>growBars(aBars));}
    if(i===3){buildBars(aBars,cand1);requestAnimationFrame(()=>growBars(aBars));aBars.children[0].classList.add('win');aBars.children[0].querySelector('.tile').classList.add('win');}
    if(i===4){$('#a-bars').previousElementSibling.textContent='Next token after "The quick brown fox"';buildBars(aBars,cand2);requestAnimationFrame(()=>growBars(aBars));}
    else{$('#a-bars').previousElementSibling.textContent='Next token candidates';}
  }

  /* ---------- Figure B ---------- */
  const vocab=['fox','dog','cat','hare','bear','leaf','wolf','deer','sky','and','the','of','river','stone','quiet','loud','jumps','runs','over','under','bird','tree','wind','rain','coat','bag','bell','road','moon','sun','hill','song'];
  const col1=[1,0,1,0,0,1,1,0,1,0,1,1,0,1,0,1,0,1,1,0,1,0,0,1,1,0,1,0,1,0,0,1];
  const col2=[0,1,1,1,0,0,1,0,0,1,1,0,1,0,1,1,1,0,0,1,0,1,1,0,0,1,0,1,0,1,1,0];
  const bGrid=$('#b-grid'), bSent=$('#b-sent');
  vocab.forEach(w=>bGrid.appendChild(el('span','tile sm',w)));
  const bt=[...bGrid.children];
  const layersB=[...$('#figB').querySelectorAll('.layer')];
  const detWords=['The','quick','brown','fox','jumps','over','the','sleepy','dog','and','vanishes','into','the','trees'];
  const bDet=$('#b-detect');detWords.forEach(w=>bDet.appendChild(el('span','tile sm',w)));
  buildBars($('#b-paris'),[['Paris',99],['Lyon',0.4],['Nice',0.3],['Rome',0.2],['other',0.1]]);
  function colour(cols,ban){bt.forEach((t,k)=>{t.className='tile sm '+(cols[k]?'g':'r')+(ban&&!cols[k]?' ban':'');});}
  function figB(i){
    bSent.textContent=i>=4?'The quick brown fox':'The quick brown';
    if(i<=2||i===4){showLayer(layersB,0);}
    if(i===0){bt.forEach(t=>t.className='tile sm');}
    if(i===1){colour(col1,false);}
    if(i===2){colour(col1,true);bt[0].className='tile sm win';}
    if(i===3){showLayer(layersB,1);$('#b-prev').textContent='brown';}
    if(i===4){colour(col2,true);}
    if(i===5){showLayer(layersB,2);[...bDet.children].forEach((t,k)=>{t.className='tile sm';t.classList.add('g');});}
    if(i===6){showLayer(layersB,3);const pb=$('#b-paris');requestAnimationFrame(()=>{growBars(pb);pb.children[0].classList.add('r');pb.children[0].querySelector('.tile').classList.add('r');pb.children[0].querySelector('.tile').classList.add('ban');[1,2,3].forEach(k=>{pb.children[k].classList.add('g');pb.children[k].querySelector('.tile').classList.add('g');});});}
  }

  /* ---------- Figure C ---------- */
  const cB=$('#c-bracket'), cSent=$('#c-sent');
  const seats=['fox','fox','dog','fox','cat','fox','dog','fox'];
  // A token has ONE colour per round, including all repeated seats.
  const R1=[0,3,5,7], R1cols=[1,1,0,1,0,1,0,1];
  const R2cols=[0,0,0,0], R2=[0,2];
  const R3cols=[1,1], R3=0;
  const cols=[el('div','bcol'),el('div','bcol'),el('div','bcol'),el('div','bcol')];
  const heads=['Sampled','Round 1','Round 2','Winner'];
  const colTiles=[[],[],[],[]];
  cols.forEach((c,k)=>{const h=el('div','rhead',heads[k]);c.appendChild(h);const inner=el('div','col r'+(k||1));c.appendChild(inner);const n=[8,4,2,1][k];for(let j=0;j<n;j++){const t=el('span','tile ghost','');inner.appendChild(t);colTiles[k].push(t);}cB.appendChild(c);});
  cols[0].querySelector('.col').className='col r1';cols[1].querySelector('.col').className='col r2';cols[2].querySelector('.col').className='col r3';cols[3].querySelector('.col').className='col';
  function setSeats(arr){colTiles[0].forEach((t,k)=>{t.textContent=arr[k];t.className='tile';});}
  function fill(k,names,colsArr,winners){colTiles[k].forEach((t,j)=>{t.textContent=names[j];t.className='tile'+(colsArr?(colsArr[j]?' g':' r'):'');if(winners&&!winners.includes(j))t.classList.add('dim');});}
  function clearFrom(k){for(let m=k;m<4;m++){colTiles[m].forEach(t=>{t.className='tile ghost';});cols[m].querySelector('.rhead').classList.toggle('show',false);}}
  function head(k,on){cols[k].querySelector('.rhead').classList.toggle('show',on);}
  const layersC=[...$('#figC').querySelectorAll('.layer')];
  const dotWords=['The','quick','brown','fox','jumps','over','the','sleepy','dog','and','vanishes','into','the','trees','before','dawn'];
  const dotsEl=$('#c-dots');
  const rng=(seed)=>()=>{seed=(seed*9301+49297)%233280;return seed/233280;};
  function buildDots(bias){dotsEl.innerHTML='';const r=rng(bias?7:3);dotWords.forEach(w=>{const d=el('div','dtok');d.appendChild(el('span','tile sm',w));const row=el('div','drow');let g=0;for(let k=0;k<30;k++){const isG=r()<(bias?0.62:0.5);if(isG)g++;row.appendChild(el('span','d'+(isG?' g':'')));}d.appendChild(row);d.appendChild(el('span','avg',(g/30).toFixed(2)));dotsEl.appendChild(d);});}
  function figC(i){
    if(i<=4){showLayer(layersC,0);}
    cSent.textContent=i===4?'The capital of France is':'The quick brown';
    if(i===0){setSeats(seats);head(0,true);clearFrom(1);}
    if(i===1){fill(0,seats,R1cols,R1);head(0,true);fill(1,R1.map(k=>seats[k]),null);head(1,true);clearFrom(2);}
    if(i===2){fill(0,seats,R1cols,R1);head(0,true);fill(1,R1.map(k=>seats[k]),R2cols,R2);head(1,true);fill(2,R2.map(k=>seats[R1[k]]),null);head(2,true);clearFrom(3);}
    if(i===3){fill(0,seats,R1cols,R1);fill(1,R1.map(k=>seats[k]),R2cols,R2);fill(2,R2.map(k=>seats[R1[k]]),R3cols,[R3]);head(2,true);head(0,true);head(1,true);fill(3,['fox'],null);head(3,true);colTiles[3][0].classList.add('win');cSent.textContent='The quick brown';}
    if(i===4){const p=Array(8).fill('Paris');fill(0,p,Array(8).fill(0),R1);fill(1,p.slice(0,4),Array(4).fill(1),R2);fill(2,p.slice(0,2),[0,0],[0]);fill(3,['Paris'],null);colTiles[3][0].classList.add('win');[0,1,2,3].forEach(k=>head(k,true));}
    if(i===5){showLayer(layersC,1);buildDots(false);$('#c-dots-note').textContent='A human wrote this. Every verdict is a coin flip; the averages hover around 0.50.';}
    if(i===6){showLayer(layersC,1);buildDots(true);$('#c-dots-note').textContent='Watermarked. The chosen tokens keep landing green. Averages drift toward 0.60.';}
    if(i===7){showLayer(layersC,2);const pin=$('#c-pin');pin.style.left='40%';$('#c-pin-label').textContent='human · 0.50';$('#c-mean').textContent='0.50';$('#c-z').textContent='baseline';$('#c-verdict').textContent='baseline';$('#c-hump2').style.opacity='0';
      {pin.style.left='70%';$('#c-pin-label').textContent='watermarked · 0.60';$('#c-mean').textContent='0.60';$('#c-z').textContent='above baseline';$('#c-verdict').textContent='illustrative signal';$('#c-hump2').style.opacity='1';}}
  }

  /* Scroll state is calculated from position, so fast jumps and reverse scrolling agree. */
  const figs={A:figA,B:figB,C:figC};
  const sections=[...document.querySelectorAll('.scrolly')].map(sec=>{
    const steps=[...sec.querySelectorAll('.step')], figure=sec.querySelector('.figure');
    const legend=el('div','legend');
    legend.append(el('span','','Green / favoured'),el('span','','Red / not favoured'));
    figure.appendChild(legend);
    const controls=el('div','figure-controls'), prev=el('button','','← Back'), next=el('button','','Next →'), count=el('span');
    count.setAttribute('aria-live','polite');prev.type=next.type='button';
    prev.setAttribute('aria-label','Previous diagram step');next.setAttribute('aria-label','Next diagram step');
    controls.append(prev,count,next);figure.appendChild(controls);
    const state={sec,steps,figure,prev,next,count,index:-1};
    function go(delta){
      const index=Math.max(0,Math.min(steps.length-1,state.index+delta));
      const line=activationLine(state);
      const top=steps[index].getBoundingClientRect().top+window.scrollY;
      window.scrollTo({top:Math.max(0,top-line+24),behavior:'instant'});
      activate(state,index);
    }
    prev.addEventListener('click',()=>go(-1));next.addEventListener('click',()=>go(1));
    return state;
  });
  function activationLine(state){return matchMedia('(max-width:860px)').matches?Math.min(innerHeight-40,state.figure.offsetHeight+40):innerHeight*.46;}
  function activate(state,index){
    if(state.index===index)return;
    state.index=index;
    state.steps.forEach((s,k)=>s.classList.toggle('on',k===index));
    figs[state.sec.dataset.fig](index);
    state.sec.querySelector('.stage').scrollTop=0;
    state.count.textContent=(index+1)+' / '+state.steps.length;
    state.prev.disabled=index===0;state.next.disabled=index===state.steps.length-1;
  }
  let pending=false;
  function update(){
    pending=false;
    sections.forEach(state=>{
      const line=activationLine(state);let index=0;
      state.steps.forEach((s,k)=>{if(s.getBoundingClientRect().top<=line)index=k;});
      activate(state,index);
    });
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
  update();
})();
