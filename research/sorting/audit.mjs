import assert from 'node:assert/strict';
import fs from 'node:fs';
import {METHODS,runSort,auditResult} from '../../public/interactive-blogs/sorting/algorithms.js';
function* permutations(a,k=0){if(k===a.length){yield [...a];return;}for(let j=k;j<a.length;j++){[a[j],a[k]]=[a[k],a[j]];yield*permutations(a,k+1);[a[j],a[k]]=[a[k],a[j]];}}
let total=0;const perMethod={};
for(const [method,meta] of Object.entries(METHODS)){
 let count=0;const cases=[[],[1],[2,2],[3,1,3,2,1,2],[99,1,55,55,2,99,1,2]];
 for(let n=2;n<=6;n++)cases.push(...permutations(Array.from({length:n},(_,i)=>i+1)));
 for(let i=0;i<256;i++)cases.push(Array.from({length:8},(_,j)=>1+(i>>j&1)));
 for(const input of cases){if(method==='bitonic'&&(!input.length||(input.length&(input.length-1))))continue;const result=runSort(method,input,false),audit=auditResult(input,result.a,meta.stable);assert.ok(audit.pass,`${method}: ${input}; ${JSON.stringify(audit)}`);assert.deepEqual(result.a.map(x=>x.v),[...input].sort((a,b)=>a-b));if(method==='fung')assert.equal(result.comparisons,input.length**2);count++;}
 const traced=runSort(method,[4,2,3,1,2,4,3,1]);assert.equal(traced.frames.at(-1).comparisons,traced.comparisons);assert.equal(traced.frames.at(-1).writes,traced.writes);assert.ok(traced.frames.at(-1).complete);assert.equal(traced.frames[0].comparisons,0);assert.ok(auditResult([4,2,3,1,2,4,3,1],traced.a,meta.stable).pass);
 total+=count;perMethod[method]=count;
}
assert.equal(runSort('insertion',[1,2,3,4,5,6,7,8],false).comparisons,7);
assert.equal(runSort('insertion',[8,7,6,5,4,3,2,1],false).writes,56);
// Independently inspect the non-obvious invariant after every Fung outer pass.
for(const input of permutations([1,2,3,4,5])){
 const trace=runSort('fung',input);for(const f of trace.frames.filter(f=>Number.isInteger(f.outer))){const prefix=f.a.slice(0,f.outer+1).map(x=>x.v);assert.ok(prefix.every((v,i)=>!i||prefix[i-1]<=v));assert.equal(prefix.at(-1),Math.max(...input));}
}
const source=fs.readFileSync(new URL('../../public/interactive-blogs/sorting/index.html',import.meta.url),'utf8');
const ids=[...source.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'Duplicate HTML id');
for(const m of source.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(m[1]),'Missing anchor '+m[1]);
const fact=JSON.parse(fs.readFileSync(new URL('./fact-sheet.json',import.meta.url)));assert.equal(fact.algorithms.length,74);assert.ok(fact.algorithms.every(a=>a.sources.length&&a.sources.every(k=>fact.sources[k])));
assert.equal((source.match(/class="step"/g)||[]).length,20);
const report={date:'2026-09-13',totalAlgorithmCases:total,perMethod,checks:['Order and record identity preservation','Stable duplicate order where claimed','All permutations through length 6 (power-of-two restriction for bitonic)','256 binary duplicate patterns of length 8','Trace counter consistency and completion','Insertion example counts','Fung prefix-and-maximum invariant for all 120 permutations of length 5','Unique HTML IDs and valid source anchors','74 source-backed atlas entries and 20 guided steps'],limits:['Finite tests do not prove correctness for unbounded inputs','Historical sources support stated attributions; frontier proofs and external performance benchmarks not independently reproduced','Browser measurements are local educational implementations, not product internals']};
fs.writeFileSync(new URL('./audit-results.json',import.meta.url),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
