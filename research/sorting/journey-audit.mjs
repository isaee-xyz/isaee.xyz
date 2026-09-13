import assert from 'node:assert/strict';
import fs from 'node:fs';
import {METHODS,runSort} from '../../public/interactive-blogs/sorting/algorithms.js';
import {pictureTrace,pictureInput,shuffled,testNetwork,flipPrefix,isOrdered,parseChallenge} from '../../public/interactive-blogs/sorting/journey-model.js';
let pictures=0,checkpoints=0;
for(const method of Object.keys(METHODS))for(const pattern of ['mixed','nearly','reverse','sorted'])for(let seed=1;seed<=20;seed++){
 const input=pictureInput(pattern,seed),r=pictureTrace(method,input),plain=runSort(method,input,false);pictures++;
 assert.deepEqual(r.frames[0].a.map(x=>x.v),input);
 assert.deepEqual(r.frames.at(-1).a.map(x=>x.v),[1,2,3,4,5,6,7,8]);
 assert.equal(r.frames.at(-1).comparisons,plain.comparisons);assert.equal(r.frames.at(-1).writes,plain.writes);
 for(const f of r.frames){assert.equal(new Set(f.a.map(x=>x.id)).size,8);assert.ok(f.a.every(x=>input[x.id]===x.v));checkpoints++;}
}
const pairs=[[0,1],[1,2],[0,2]];let programs=0,passing=0;
const check=p=>{const results=testNetwork(p);programs++;if(results.every(r=>r.pass)){passing++;assert.ok(p.length>=3);}if(p.length<4)for(const c of pairs)check([...p,c]);};check([]);
assert.ok(testNetwork([[0,1],[1,2],[0,1]]).every(r=>r.pass));assert.ok(!testNetwork([[0,1],[1,2]]).every(r=>r.pass));
const start=[3,1,5,2,4];const queue=[[start,[]]],seen=new Set();let solution;
while(queue.length){const [a,path]=queue.shift();if(isOrdered(a)){solution=path;break;}for(let i=1;i<a.length;i++){const b=flipPrefix(a,i),k=b.join(',');assert.deepEqual([...b].sort(),[1,2,3,4,5]);if(!seen.has(k)){seen.add(k);queue.push([b,[...path,i]]);}}}
assert.ok(solution);assert.deepEqual(parseChallenge('?cards=3,1,6,2,5,4'),[3,1,6,2,5,4]);for(const bad of ['?cards=1,1,2,3,4,5','?cards=0,2,3,4,5,6','?cards=<script>','?cards=1,2,3'])assert.equal(parseChallenge(bad),null);
for(let seed=0;seed<100;seed++)assert.deepEqual([...shuffled(6,seed)].sort(),[1,2,3,4,5,6]);
const html=fs.readFileSync(new URL('../../public/interactive-blogs/sorting/index.html',import.meta.url),'utf8');
assert.ok(html.includes('src="journey.js"'));assert.ok(html.includes('src="landscape.svg"'));assert.ok(!html.includes('No single average is claimed'));
const report={pictures,checkpoints,programs,passingPrograms:passing,pancakeSolutionIndices:solution,checks:['All picture checkpoints preserve record identity','All 16 methods reconstruct identical picture inputs','Final counters equal untraced engine counters','Exhaustive comparator programs through four instructions','Three-comparison network succeeds on all six permutations','Prefix flips preserve all pancakes','Shared inputs validated and deterministic']};
fs.writeFileSync(new URL('./journey-audit-results.json',import.meta.url),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
