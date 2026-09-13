import {runSort,auditResult,METHODS} from './algorithms.js';
self.onmessage=({data})=>{
 try{
 const {n,pattern}=data;if(![128,512,1024].includes(n))throw new Error('Unsupported measurement size');let state=data.seed>>>0;
 const rnd=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
 let input=Array.from({length:n},()=>1+Math.floor(rnd()*99));if(pattern==='sorted')input.sort((a,b)=>a-b);if(pattern==='reverse')input.sort((a,b)=>b-a);if(pattern==='duplicates')input=input.map(x=>[15,35,55,75][x%4]);
 const methods=['insertion','merge','quick'],times=Object.fromEntries(methods.map(k=>[k,[]])),counts={};
 // Rotate method order across trials to reduce a fixed first/last bias.
 for(let trial=-2;trial<7;trial++)for(let offset=0;offset<3;offset++){
 const method=methods[(trial+2+offset)%3],start=performance.now(),result=runSort(method,input,false),elapsed=performance.now()-start;
 if(!auditResult(input,result.a,METHODS[method].stable).pass)throw new Error('A measurement failed its correctness audit.');
 if(trial>=0)times[method].push(elapsed);counts[method]=result.comparisons;
 }
 self.postMessage({n,pattern,results:methods.map(method=>({method,mean:times[method].reduce((s,v)=>s+v,0)/7,min:Math.min(...times[method]),max:Math.max(...times[method]),comparisons:counts[method]}))});
 }catch(e){self.postMessage({error:e.message});}
};
