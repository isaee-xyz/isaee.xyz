// Educational implementations. Tracing and benchmarking share the same algorithm path.
// Counters: key comparisons; assignments to the main array (swap = two writes).
// Auxiliary buffer writes, loop conditions, and digit inspections are not key comparisons.
export const METHODS = {
 insertion:{name:'Insertion sort',stable:true,invariant:'Everything left of the cursor is ordered. Insert one item without breaking that prefix.',cost:'O(n²) worst · O(n) on ordered input'},
 selection:{name:'Selection sort',stable:false,invariant:'The finished prefix contains the smallest items in their final positions.',cost:'Θ(n²) comparisons · at most n−1 swaps'},
 bubble:{name:'Bubble sort',stable:true,invariant:'After a complete forward pass, the largest remaining item is in place.',cost:'O(n²) worst · early exit on ordered input'},
 merge:{name:'Merge sort',stable:true,invariant:'Each merge consumes two ordered runs and produces one ordered run.',cost:'O(n log n) · O(n) auxiliary buffer'},
 quick:{name:'Quicksort · last pivot',stable:false,invariant:'After partitioning, the pivot separates smaller-or-equal and larger items.',cost:'Expected O(n log n) on random input · O(n²) worst'},
 heap:{name:'Heapsort',stable:false,invariant:'The root is the maximum of the remaining heap; extraction grows the finished suffix.',cost:'O(n log n) worst · O(1) iterative extra space'},
 shell:{name:'Shellsort · halving gaps',stable:false,invariant:'At each gap, interleaved subsequences become ordered. The final gap is one.',cost:'O(n²) worst for this halving-gap version'},
 cocktail:{name:'Cocktail shaker sort',stable:true,invariant:'Alternating passes place the remaining maximum and minimum at opposite ends.',cost:'O(n²) worst'},
 comb:{name:'Comb sort',stable:false,invariant:'Large gaps move distant mistakes; gap-one passes finish only when no swap is needed.',cost:'O(n²) worst'},
 gnome:{name:'Gnome sort',stable:true,invariant:'An inversion moves the cursor backward to repair the ordered prefix.',cost:'O(n²) worst · O(n) on ordered input'},
 counting:{name:'Counting sort',stable:true,invariant:'Cumulative counts assign a separate output interval to each integer key.',cost:'O(n + k) · integer keys 1–99 in this lab'},
 radix:{name:'LSD radix sort · base 10',stable:true,invariant:'After each stable pass, the digits processed so far are ordered.',cost:'O(d(n + 10)) · nonnegative integer keys'},
 pancake:{name:'Pancake sort',stable:false,invariant:'Each pair of prefix flips places a remaining maximum at the end.',cost:'O(n²) basic max-and-flip procedure'},
 fung:{name:'I Can’t Believe It Can Sort',stable:false,invariant:'After outer pass i, positions 0…i are ordered and position i holds a global maximum.',cost:'Exactly n² comparisons · O(1) extra space'},
 oddEven:{name:'Odd-even transposition',stable:true,invariant:'Alternating disjoint adjacent pairs move values toward their final positions.',cost:'O(n²) work · this demo executes pairs sequentially'},
 bitonic:{name:'Bitonic sorting network',stable:false,invariant:'Fixed comparator stages build and merge bitonic sequences.',cost:'O(n log² n) work · power-of-two input length'}
};
export function runSort(method, input, tracing=true) {
 if (!METHODS[method]) throw new Error('Unknown method');
 if(input.some(x=>!Number.isInteger(x)||x<1||x>99)) throw new Error('Use integers 1–99');
 if(method==='bitonic' && (input.length<1 || (input.length&(input.length-1)))) throw new Error('Bitonic demo requires a power-of-two length');
 const a=input.map((v,id)=>({v,id})),frames=[];let comparisons=0,writes=0;
 const snap=(note,active=[],done=[],extra={})=>{if(tracing) frames.push({a:a.map(x=>({...x})),comparisons,writes,note,active,done,...extra});};
 const compare=(i,j)=>{comparisons++;snap(`Compare ${a[i].v} with ${a[j].v}.`,[i,j]);return a[i].v-a[j].v;};
 const swap=(i,j,note)=>{if(i===j)return;[a[i],a[j]]=[a[j],a[i]];writes+=2;snap(note||`Swap positions ${i+1} and ${j+1}.`,[i,j]);};
 const range=(start,end)=>Array.from({length:Math.max(0,end-start)},(_,i)=>start+i);
 const n=a.length;snap('Input: a number is the key; its small letter identifies the original record.');
 const insert=(lo,hi)=>{for(let i=lo+1;i<hi;i++){let j=i;while(j>lo){if(compare(j-1,j)<=0)break;swap(j-1,j);j--;}snap(`Prefix through position ${i+1} is ordered.`,[],range(lo,i+1));}};
 if(method==='insertion')insert(0,n);
 if(method==='selection')for(let i=0;i<n-1;i++){let min=i;for(let j=i+1;j<n;j++)if(compare(j,min)<0)min=j;swap(i,min);snap('The smallest remaining item is now in place.',[],range(0,i+1));}
 if(method==='bubble')for(let end=n-1;end>0;end--){let changed=false;for(let j=0;j<end;j++)if(compare(j,j+1)>0){swap(j,j+1);changed=true;}snap(changed?'The largest remaining item is in place.':'No swaps: all adjacent pairs are ordered.',[],range(end,n));if(!changed)break;}
 if(method==='merge'){
  const rec=(lo,hi)=>{if(hi-lo<2)return;let mid=(lo+hi)>>1;rec(lo,mid);rec(mid,hi);const left=a.slice(lo,mid),right=a.slice(mid,hi);let i=0,j=0,k=lo;
   snap('Merge two ordered runs. The scratch buffer preserves records during writes.',range(lo,hi),[],{buffer:true});
   while(i<left.length||j<right.length){let item;if(i===left.length)item=right[j++];else if(j===right.length)item=left[i++];else {comparisons++;snap(`Compare buffer fronts ${left[i].v} and ${right[j].v}.`,[k],[],{buffer:true});item=left[i].v<=right[j].v?left[i++]:right[j++];}a[k++]=item;writes++;snap('Write the next buffer winner. Equal keys take the left record first.',[k-1],[],{buffer:true});}
   snap('This merged region is ordered.',[],range(lo,hi));
  };rec(0,n);
 }
 if(method==='quick'){
  const rec=(lo,hi)=>{if(lo>=hi)return;let p=lo;const pivot=a[hi].v;snap(`Use ${pivot} at the end as pivot.`,[hi]);for(let j=lo;j<hi;j++)if(compare(j,hi)<=0){swap(p,j);p++;}swap(p,hi);snap(`Pivot ${pivot} is in its final position.`,[],[p]);rec(lo,p-1);rec(p+1,hi);};rec(0,n-1);
 }
 if(method==='heap'){
  const sift=(root,end)=>{while(root*2+1<end){let child=root*2+1;if(child+1<end&&compare(child,child+1)<0)child++;if(compare(root,child)>=0)return;swap(root,child,'Restore the max-heap property.');root=child;}};
  for(let i=Math.floor(n/2)-1;i>=0;i--)sift(i,n);snap('Max-heap built: the first position is the maximum.');for(let end=n-1;end>0;end--){swap(0,end,'Extract the maximum to the finished suffix.');sift(0,end);snap('Remaining heap repaired.',[],range(end,n));}
 }
 if(method==='shell')for(let gap=Math.floor(n/2);gap>0;gap=Math.floor(gap/2)){snap(`Insertion-sort positions separated by gap ${gap}.`);for(let i=gap;i<n;i++){let j=i;while(j>=gap){if(compare(j-gap,j)<=0)break;swap(j-gap,j,`Swap across gap ${gap}.`);j-=gap;}}snap(`Gap ${gap} pass complete.`);}
 if(method==='cocktail'){let lo=0,hi=n-1,changed=true;while(changed&&lo<hi){changed=false;for(let i=lo;i<hi;i++)if(compare(i,i+1)>0){swap(i,i+1);changed=true;}hi--;if(!changed)break;changed=false;for(let i=hi;i>lo;i--)if(compare(i-1,i)>0){swap(i-1,i);changed=true;}lo++;snap('Forward and backward passes complete.');}}
 if(method==='comb'){let gap=n,changed=true;while(gap>1||changed){gap=Math.max(1,Math.floor(gap/1.3));changed=false;for(let i=0;i+gap<n;i++)if(compare(i,i+gap)>0){swap(i,i+gap,`Compare across shrinking gap ${gap}.`);changed=true;}snap(`Gap ${gap} pass complete.`);}}
 if(method==='gnome'){let i=1;while(i<n){if(i===0||compare(i-1,i)<=0)i++;else {swap(i-1,i,'Repair this pair, then step backward.');i--;}}}
 if(method==='counting'){
  const counts=Array(100).fill(0);for(const x of a)counts[x.v]++;for(let k=1;k<100;k++)counts[k]+=counts[k-1];const out=Array(n);for(let i=n-1;i>=0;i--)out[--counts[a[i].v]]=a[i];snap('Frequency counts and cumulative positions built. No key-to-key comparisons.',[],[],{buffer:true});for(let i=0;i<n;i++){a[i]=out[i];writes++;snap('Copy the stable output buffer into the array.',[i],[],{buffer:true});}
 }
 if(method==='radix'){
  const max=Math.max(0,...input);for(let place=1;place<=max;place*=10){const buckets=Array.from({length:10},()=>[]);for(const x of a)buckets[Math.floor(x.v/place)%10].push(x);const out=buckets.flat();snap(`Distribute by ${place===1?'units':'tens'} digit, preserving order within each bucket.`,[],[],{buckets:buckets.map(b=>b.map(x=>x.v))});for(let i=0;i<n;i++){a[i]=out[i];writes++;}snap(`${place===1?'Units':'Tens'} pass complete.`,[],[],{buckets:buckets.map(b=>b.map(x=>x.v))});}
 }
 if(method==='pancake'){const flip=k=>{for(let i=0,j=k;i<j;i++,j--)swap(i,j,`Flip the first ${k+1} pancakes.`);};for(let end=n-1;end>0;end--){let max=0;for(let i=1;i<=end;i++)if(compare(i,max)>0)max=i;if(max!==end){if(max>0)flip(max);flip(end);}snap('Largest remaining pancake placed at the bottom.',[],range(end,n));}}
 if(method==='fung')for(let i=0;i<n;i++){for(let j=0;j<n;j++)if(compare(i,j)<0)swap(i,j,'The < comparison triggers a swap. Follow the whole procedure.');snap(`Outer pass ${i+1}: ordered prefix, with a global maximum at its right end.`,[i],range(0,i+1),{outer:i});}
 if(method==='oddEven'){let changed=true;while(changed){changed=false;for(let parity=0;parity<2;parity++){for(let i=parity;i+1<n;i+=2)if(compare(i,i+1)>0){swap(i,i+1);changed=true;}snap(`${parity?'Odd':'Even'} starting positions compared.`);}}}
 if(method==='bitonic')for(let size=2;size<=n;size*=2)for(let stride=size/2;stride>0;stride/=2){for(let i=0;i<n;i++){const j=i^stride;if(j>i){const c=compare(i,j);if(((i&size)===0&&c>0)||((i&size)!==0&&c<0))swap(i,j,'A fixed network comparator orders this pair.');}}snap(`Network stage: group ${size}, distance ${stride}.`);}
 snap('Complete. Check both order and record preservation.',[],range(0,n),{complete:true});
 return {a,frames,comparisons,writes};
}
export function auditResult(input,result,stableRequired=false){
 const ordered=result.every((x,i)=>i===0||result[i-1].v<=x.v);
 const preserved=result.length===input.length&&new Set(result.map(x=>x.id)).size===input.length&&result.every(x=>input[x.id]===x.v);
 const stable=result.every((x,i)=>i===0||result[i-1].v!==x.v||result[i-1].id<x.id);
 return {ordered,preserved,stable,pass:ordered&&preserved&&(!stableRequired||stable)};
}
