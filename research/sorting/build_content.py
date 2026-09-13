import json,re
from pathlib import Path
root=Path(__file__).resolve().parents[2]
sources={
'contract':('The sorting contract · NIST','https://xlinux.nist.gov/dads/HTML/sort.html'),
'elementary':('Elementary sorts · Sedgewick & Wayne','https://algs4.cs.princeton.edu/21elementary/'),
'merge':('Mergesort & comparison lower bounds · Sedgewick & Wayne','https://algs4.cs.princeton.edu/22mergesort/'),
'quick':('Quicksort · Sedgewick & Wayne','https://algs4.cs.princeton.edu/23quicksort/'),
'heap':('Priority queues and heapsort · Sedgewick & Wayne','https://algs4.cs.princeton.edu/24pq/'),
'string':('String and radix sorts · Sedgewick & Wayne','https://algs4.cs.princeton.edu/51radix/'),
'cards':('The Hollerith machine · US Census Bureau','https://www.census.gov/about/history/bureau-history/census-innovations/technology/hollerith-machine.html'),
'hoare':('Tony Hoare · oral history, 2006','https://archive.computerhistory.org/resources/text/Oral_History/Hoare_Sir_Antony/102658017.05.01.pdf'),
'hoarepapers':('Hoare publication bibliography · Oxford','https://www.cs.ox.ac.uk/people/publications/bibtex/Tony.Hoare.html'),
'von':('John von Neumann on computers · Mark Priestley','https://markpriestley.net/john-von-neumann-on-computers'),
'fung':('Fung · Is this the simplest sorting algorithm ever? (2021)','https://arxiv.org/html/2110.01111v1'),
'proof':('Fung algorithm · Why3 verified proof, Inria','https://toccata.gitlabpages.inria.fr/toccata/gallery/i_cant_believe_it_can_sort.fr.html'),
'alpha':('Mankowitz et al. · AlphaDev, Nature (2023)','https://www.nature.com/articles/s41586-023-06004-9'),
'alpharesponse':('Shorter and faster than Sort3AlphaDev (2023)','https://arxiv.org/abs/2307.14503'),
'python':('CPython · list sorting design notes','https://github.com/python/cpython/blob/main/Objects/listsort.txt'),
'power':('Munro & Wild · Nearly-Optimal Mergesorts (2018)','https://www2.wild-inter.net/publications/munro-wild-2018'),
'multipower':('Gelling et al. · Multiway Powersort (2022)','https://arxiv.org/abs/2209.06909'),
'intro':('Musser · Introspective Sorting (1997)','https://www.cs.rpi.edu/~musser/gp/algorithms.html'),
'dual':('Yaroslavskiy, Bentley & Bloch · OpenJDK code (2009)','https://cr.openjdk.org/~alanb/6880672/webrev.03/src/share/classes/java/util/DualPivotQuicksort.java.html'),
'smooth':('Dijkstra · Smoothsort (1982)','https://www.sciencedirect.com/science/article/pii/0167642382900168'),
'cycle':('Haddon · Cycle-Sort (1990)','https://doi.org/10.1093/comjnl/33.4.365'),
'patience':('Aldous & Diaconis · Patience sorting (1999)','https://escholarship.org/uc/item/09j2v8d0'),
'ford':('MergeInsertion / Ford–Johnson analysis (2019)','https://arxiv.org/abs/1905.09656'),
'flash':('Neubert · FlashSort (1997/98)','https://www.neubert.net/FSOIntro.html'),
'spread':('Ross · Spreadsort paper (2002)','https://www.boost.org/doc/libs/1_61_0/libs/sort/doc/papers/original_spreadsort06_2002.pdf'),
'pdq':('Peters · pdqsort implementation','https://github.com/orlp/pdqsort'),
'block':('Edelkamp & Weiss · BlockQuicksort (2016)','https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ESA.2016.38'),
'grail':('Astrelín · GrailSort implementation','https://github.com/Mrrl/GrailSort'),
'wiki':('Wikström · WikiSort implementation','https://github.com/BonzaiThePenguin/WikiSort'),
'quad':('van den Hoven · quadsort implementation','https://github.com/scandum/quadsort'),
'flux':('van den Hoven · fluxsort implementation','https://github.com/scandum/fluxsort'),
'crum':('van den Hoven · crumsort implementation','https://github.com/scandum/crumsort'),
'glide':('Peters · glidesort implementation','https://github.com/orlp/glidesort'),
'rust':('Rust 1.81 release notes · September 2024','https://blog.rust-lang.org/2024/09/05/Rust-1.81.0/'),
'drift':('Driftsort · design notes','https://github.com/Voultapher/sort-research/blob/main/writeup/driftsort_introduction/text.md'),
'batcher':('Batcher · Sorting networks and their applications (1968)','https://doi.org/10.1145/1468075.1468121'),
'aks':('Jeřábek · A sorting network in bounded arithmetic','https://users.math.cas.cz/~jerabek/papers/aks.pdf'),
'parallel':('Gerbessiotis · Integer sorting on multicores (2018)','https://arxiv.org/abs/1808.10292'),
'ips':('Axtmann et al. · Engineering in-place sorting (2020)','https://arxiv.org/abs/2009.13569'),
'funnel':('Frigo et al. · Cache-Oblivious Algorithms (1999)','https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/Frigo.Leiserson-CacheObliviousAlgorithms-1999.pdf'),
'poly':('AFIPS proceedings · Polyphase merge sorting (1960)','https://bitsavers.computerhistory.org/pdf/afips/1960-12_%2318.pdf'),
'pancake':('Gates & Papadimitriou · Prefix reversal (1979)','https://doi.org/10.1016/0012-365X(79)90068-2'),
'bead':('Bead-Sort · original paper reproduced','https://studyres.com/doc/1818629/bead%E2%80%93sort--a-natural-sorting-algorithm'),
'sleep':('Henney · Need Something Sorted? Sleep On It! (2023)','https://accu.org/journals/overload/31/175/henney/'),
'stalin':('Deletion-based Stalin sort · reference implementations','https://github.com/gustavo-depaula/stalin-sort'),
'expo':('Abrahamsen · ExpoSort (2024)','https://arxiv.org/abs/2409.00794'),
'learned':('Kristo et al. · LearnedSort (2020)','https://github.com/anikristo/LearnedSort'),
'learned2':('Kristo et al. · LearnedSort 2.0 (2021)','https://arxiv.org/abs/2107.03290'),
'dovetail':('Parallel Integer Sort: Theory and Practice (2024)','https://arxiv.org/abs/2401.00710'),
'universal':('Sen · Towards universally optimal sorting (2025)','https://arxiv.org/abs/2506.08261'),
'ahs':('Adaptive Hybrid Sort · preprint (2025)','https://arxiv.org/abs/2506.20677'),
'bsort':('Guzmán · bsort (9 March 2026)','https://arxiv.org/abs/2603.08929'),
'nfs':('Sučić et al. · Need for Speed Sort (13 July 2026)','https://arxiv.org/abs/2607.11850'),
'moves':('Xu & Chick · Minimal-move sorting (29 July 2026)','https://arxiv.org/abs/2607.27040'),
'online':('Online Sorting with Our Eyes Wide Shut (July 2026)','https://arxiv.org/abs/2607.17289'),
'education':('Vielsack & Landman · Exploring sorting strategies (2026)','https://publikationen.bibliothek.kit.edu/1000192480'),
'soft':('Prillo & Eisenschlos · SoftSort (2020)','https://arxiv.org/abs/2006.16038'),
'ft':('Visual reference · Financial Times transformer explainer','https://ig.ft.com/generative-ai/')
}
for k,p in {'bubble':'bubblesort','cocktail':'bidirectionalBubbleSort','comb':'combSort','gnome':'gnomeSort','shell':'shellsort','strand':'strandSort','bucket':'bucketsort','count':'countingsort','radix':'radixsort','flag':'americanFlagSort','bitonic':'bitonicSort','bogo':'bogosort','stooge':'stoogesort','tournament':'tournamentSort','selection':'selectionSort'}.items():
 sources[k]=(k.capitalize()+' sort · NIST','https://xlinux.nist.gov/dads/HTML/'+p+'.html')
# Records are editorial fact-sheet entries. Costs describe the indicated implementation/model.
raw='''Insertion sort|Classical; origin uncertain|0|Foundations|Established|O(n²) worst; O(n) sorted|Yes|O(1)|Grow an ordered prefix by inserting the next item and shifting larger items right.|Like arranging a hand of cards. Its simplicity survives inside sophisticated library sorts.|Excellent for small or nearly ordered inputs; quadratic on reversed input.|elementary
Binary insertion sort|Classical variant|0|Foundations|Variant|O(n log n) comparisons; O(n²) moves|Yes, with rightmost ties|O(1)|Use binary search inside the ordered prefix, then shift to create the insertion slot.|Fewer comparisons need not mean fewer moves.|The array still has to make space; binary search does not make this an O(n log n) time array sort.|elementary,python
Selection sort|Classical; origin uncertain|0|Foundations|Established|Θ(n²) comparisons|No, usual swap version|O(1)|Scan the unsorted suffix for its minimum, then place it at the boundary.|You can minimise swaps without minimising comparisons.|At most n−1 nontrivial swaps, but it rescans even already sorted input.|selection
Bubble sort|Classical; origin uncertain|0|Foundations|Established|O(n²) worst; O(n) with early exit|Yes|O(1)|Swap adjacent inverted pairs; repeat passes until no swap occurs.|A large value can cross the array in one pass; a small value can crawl back slowly.|Useful for explaining local repair, usually a poor general-purpose implementation.|bubble
Cocktail shaker sort|Classical variant|0|Foundations|Variant|O(n²) worst|Yes|O(1)|Alternate forward and backward bubble passes.|Also called bidirectional bubble sort. The return trip repairs the small-value crawling problem.|Symmetry improves some inputs without changing the quadratic worst case.|cocktail
Comb sort|1980 precursor; 1991 account|1980|Foundations|Established|O(n²) worst|No|O(1)|Compare values across shrinking gaps, ending with gap-one passes until no swaps occur.|Dobosiewicz described a precursor; Box and Lacey published their account in Byte.|Unlike Shellsort, each gap gets a bubbling pass rather than a complete insertion sort.|comb
Gnome sort|2000 precursor; 2003 naming evidence|2000|Foundations|Established|O(n²) worst; O(n) sorted|Yes|O(1)|Move forward if neighbours are ordered; otherwise swap and step backward.|Sarbazi-Azad called its precursor Stupid Sort. Grune used the garden-gnome name.|An insertion-sort idea expressed as a walking cursor; naming history is not a single clean invention date.|gnome
Shellsort|1959 publication|1959|Foundations|Established|Depends on gap sequence|No|O(1)|Insertion-sort interleaved subsequences, shrinking the gap until it reaches one.|Named for Donald Shell, not a shell-shaped data structure.|Different gaps give different bounds. A single universal O(n log n) label would be misleading.|shell
Merge sort|1940s electronic-computing era|1945|Foundations|Established|O(n log n)|Yes, with left-first ties|O(n), usual arrays|Sort two parts and repeatedly take the smaller front item to merge them.|Early electronic-computing discussions by von Neumann already treated sorting as a fundamental workload.|Predictable growth; the usual array implementation buys easy merging with extra memory.|merge,von
Bottom-up merge sort|Classical merge variant|0|Foundations|Variant|O(n log n)|Yes|O(n), usual arrays|Merge runs of length one, then two, then four, continuing iteratively.|Recursion is a way to describe divide-and-conquer, not a requirement for implementing it.|The merge schedule is fixed and normally ignores existing long runs.|merge
Natural merge sort|Classical adaptive family|0|Foundations|Variant|O(n log r), r runs; O(n) for one run|Yes, with careful ties|O(n), common implementation|Recognise already ordered runs and merge them rather than starting from singletons.|Real data often brings some of its own order.|Run detection and the order of merges determine how effectively that structure is used.|python,power
Quicksort|1959 development; 1961 publication|1961|Foundations|Established|Expected O(n log n); O(n²) worst|No, usual partition|O(log n) typical stack; O(n) naive worst|Choose a pivot, partition around it, then sort the resulting regions.|Hoare developed the idea while studying in Moscow and thinking about Russian-to-English translation.|Bad pivot splits can repeatedly leave almost the whole problem unsolved.|quick,hoare,hoarepapers
Three-way quicksort|Classical duplicate-aware variant|0|Foundations|Variant|Expected O(n log n); O(n²) worst|No|Stack-dependent|Partition into values smaller than, equal to, and larger than the pivot.|Equal values become a finished middle region instead of being needlessly sorted again.|Especially instructive on many duplicates; pivot quality still matters.|quick
Dual-pivot quicksort|2009 OpenJDK contribution|2009|Hybrids|Established|O(n²) for basic form; hybrids differ|No|Stack-dependent|Two pivots create three regions that are sorted recursively.|Yaroslavskiy’s variant entered Java’s primitive-array sorting implementation.|Two pivots are not automatically better: partition costs, memory scans and safeguards matter.|dual
Heapsort|1964 publication|1964|Foundations|Established|O(n log n) worst|No|O(1), iterative array form|Build a max-heap, move its root to the end, then repair the smaller heap.|A priority queue becomes a full sorting procedure when you repeatedly remove its winner.|Reliable worst case and little extra storage; heap navigation has different locality from sequential merging.|heap
Smoothsort|1981 manuscript; 1982 journal|1982|Foundations|Established|O(n log n) worst; O(n) best|No|O(1) words|Use a forest of Leonardo heaps to retain useful order while selecting maxima.|Dijkstra designed a heapsort relative that transitions smoothly toward linear work on ordered data.|The bookkeeping is considerably more intricate than ordinary heapsort.|smooth
Tree sort|Classical data-structure method|0|Foundations|Established|O(n log n) balanced; O(n²) unbalanced|Implementation-dependent|O(n)|Insert values into a search tree and read them in order.|It shifts the sorting problem into maintaining an ordered data structure.|A plain unbalanced tree can degenerate into a chain. Duplicate storage must preserve all items.|heap,contract
Tournament sort|Documented by 1962|1962|Foundations|Established|O(n log n)|Implementation-dependent|O(n), tournament tree|Compare pairs up a tournament tree; emit the winner and replay its path.|Only the matches affected by removing a winner need to be played again.|The extra tree records reusable comparison results instead of starting each minimum scan anew.|tournament
Cycle sort|1990 Haddon paper; variants differ|1990|Foundations|Established|O(n²) for comparison-ranked variant|No|O(1), common cycle variant|Find destinations and rotate items around permutation cycles.|Haddon studied cycles under conditions allowing linear sorting; the common teaching variant spends comparisons finding ranks.|Minimal writes and minimal comparisons are different goals. The original paper’s linear claim has assumptions.|cycle
Patience sorting|Classical; 1999 survey|1999|Foundations|Established|O(n log n) with efficient pile search/merge|Implementation-dependent|O(n)|Deal values onto ordered piles, then merge their top values.|A card-game viewpoint connects sorting to the longest increasing subsequence.|Building piles alone does not emit a globally sorted list; extraction or merging still matters.|patience
Strand sort|Documented in 1997 discussion|1997|Foundations|Established|O(n²) worst|Can be stable|O(n), list representation|Pull an increasing strand out of the input, merge it into the output, and repeat.|A linked list lets the procedure remove a strand without shifting an entire array.|Ordered inputs are friendly; many short strands can force repeated scanning and merging.|strand
Ford–Johnson / merge-insertion|1959 publication|1959|Foundations|Established|O(n log n) comparisons|Usually no|O(n), common implementations|Pair elements, order the larger partners, then insert the smaller ones in a carefully chosen schedule.|A classic attempt to squeeze out comparisons, with special relevance to small input sizes.|Comparison counts are the objective; bookkeeping can outweigh savings in elapsed time.|ford
Counting sort|Classical integer-key method|0|Distribution|Established|O(n + k), k key range|Yes, output-buffer form|O(n + k)|Count occurrences, compute output positions and place each record into its slot.|Knowing the key universe substitutes direct addressing for pairwise comparison.|A huge sparse range makes the count array expensive, even if there are few input items.|count
LSD radix sort|Punched-card lineage|1900|Distribution|Established|O(d(n + b)), d digits, base b|Yes, stable passes|O(n + b)|Sort by the least significant digit, then by each more significant digit using stable passes.|Physical card sorting helps explain why digit-by-digit ordering predates electronic programs.|It relies on key representation and stability. Digit width and sign handling are part of the algorithm.|radix,cards
MSD radix sort|Classical radix variant|0|Distribution|Established|O(d(n + b)), conventional bound|Implementation-dependent|Implementation-dependent|Group by the most significant digit and recursively refine each group.|A shared prefix lets whole strings travel together before their next character matters.|Short strings need an end marker; empty and highly uneven buckets require care.|string
Bucket sort|Classical distribution family|0|Distribution|Established|Expected O(n + k) with suitable distribution; O(n²) possible|Implementation-dependent|O(n + k)|Distribute values into ordered ranges, sort within each range and concatenate.|The shape of the data can be useful information.|The usual linear expectation assumes balanced buckets and cheap internal work; one crowded bucket changes everything.|bucket
Histogram sort|Classical distribution variant|0|Distribution|Variant|Distribution and local-sort dependent|Implementation-dependent|Bucket-count dependent|Count bucket sizes first so each bucket receives an exact output range.|Sizing the destinations before moving records avoids guessing capacity.|Histogram construction is only one stage; items within a bucket may still need sorting.|bucket
Pigeonhole sort|Classical direct-address method|0|Distribution|Variant|O(n + k)|Can be stable|O(n + k) for records|Allocate a hole for each possible key and collect records in key order.|It makes the range of possible values visible as a physical storage cost.|A counting-style technique; storing whole records in holes differs from storing only frequencies.|count,bucket
American flag sort|1990s string-sorting literature|1993|Distribution|Established|Key-length dependent|No, usual in-place form|Bucket counters plus stack|Count digit buckets and use cyclic moves to permute items into contiguous bucket regions.|An in-place relative of radix sorting, named by analogy with multi-colour partitioning.|Saving a full output array makes the permutation logic harder; stability is normally lost.|flag
Flashsort|1997 conference; 1998 magazine|1997|Distribution|Established|O(n) under suitable distributions; O(n²) possible|No|O(m), m classes|Estimate value classes, permute into classes, then clean up the local order.|Neubert published the method at euroFORTH and in Dr. Dobb’s Journal.|Interpolation needs useful value ranges; skew and the cleanup method determine actual performance.|flash
Spreadsort|2002 paper|2002|Distribution|Established|Key-width and hybrid dependent|No|Variant-dependent|Combine radix-style distribution with comparison sorting for appropriate subproblems.|Steven Ross’ work became part of Boost.Sort.|Numeric representation, range and fallback thresholds matter; the name is not a guarantee of beating every comparison sort.|spread
Introsort|1996 draft; 1997 publication|1997|Hybrids|Established|O(n log n) worst|No|O(log n) stack|Begin with quicksort; switch to heapsort if recursion grows too deep.|Musser turned an algorithm’s own behaviour into a signal to change strategy.|It retains quicksort’s practical appeal while placing a bound on pathological partitions.|intro
Timsort|2002 Python introduction|2002|Hybrids|Established|O(n log n) worst; O(n) ordered|Yes|O(n) worst|Find natural runs, extend short ones and merge while respecting a scheduling policy.|Tim Peters’ design treats pre-existing order as a resource.|The original merge policy and current CPython’s Powersort policy should not be conflated.|python,power
Powersort|2018 publication|2018|Hybrids|Established|O(n log n) worst; adapts to runs|Yes|O(n), buffered merge|Choose a nearly optimal merge tree from the positions and lengths of adjacent runs.|Munro and Wild’s policy is documented in CPython’s list-sort implementation.|It improves how runs are combined, not the definition of a comparison or a universal CPU speed limit.|power
Peeksort|2018 publication|2018|Hybrids|Established|O(n log n) worst; adapts to runs|Yes|O(n), buffered merge|Peek around the middle to find runs and recursively organise their merges.|Introduced alongside Powersort as another way to use existing runs well.|Similar objective, different merge-tree construction. “Adaptive” needs a specified measure of order.|power
Multiway Powersort|2022 preprint|2022|Hybrids|Research|O(n log n) work, fixed merge arity|Yes|O(n), buffered implementation|Extend run-aware merge scheduling to combine more than two runs at a time.|The research targets data transfers as well as comparisons.|Results for a four-way implementation describe tested workloads, not a universal multiplier.|multipower
GrailSort|2010s implementation|2013|Hybrids|Established|O(n log n) worst|Yes|O(1) without external buffer|Use keys inside the array as workspace for block merging.|Andrey Astrelin’s implementation pursues stability and constant external memory together.|Internal buffers and duplicate handling make the implementation more complex than textbook merge sort.|grail
WikiSort|2010s implementation|2014|Hybrids|Established|O(n log n) worst|Yes|O(1) external workspace|Merge blocks using a small internal working area rather than a full second array.|Mike Wikström’s implementation demonstrates a practical stable block-sort approach.|Constant extra space is not free: rotations, searches and block bookkeeping still cost work.|wiki
Pattern-defeating quicksort|2010s implementation|2015|Hybrids|Established|O(n log n) worst|No|O(log n) stack|Detect bad partitions and useful order, disturb patterns and fall back when necessary.|Orson Peters’ pdqsort explicitly fights inputs that repeatedly fool pivot selection.|Some branchless benefits depend on cheap comparisons and the type being sorted.|pdq
BlockQuicksort|2016 publication|2016|Hybrids|Established|O(n log n) expected; safeguard-dependent worst|No|Block buffers plus stack|Record partition decisions in blocks before moving the misplaced elements.|Edelkamp and Weiss target branch mispredictions, a cost hidden by a simple comparison count.|Same broad quicksort idea, different interaction with a modern processor.|block
Quadsort|2020s implementation|2020|Hybrids|Established|O(n log n) worst|Yes|O(n), default buffer|Build small ordered groups and use a four-way merging strategy.|Igor van den Hoven’s implementation emphasises predictable comparison and movement patterns.|Repository benchmarks are author experiments; speed depends on data types, compiler and hardware.|quad
Fluxsort|2020s implementation|2021|Hybrids|Established|O(n log n) worst, documented hybrid|Yes|O(n), default buffer|Use adaptive analysis and stable partitioning with merging machinery.|A stable quicksort/mergesort hybrid from van den Hoven.|This is a concrete engineered combination, not proof that either parent family has become obsolete.|flux
Crumsort|2020s implementation|2022|Hybrids|Established|O(n log n) worst, documented hybrid|No|O(log n), bounded partition machinery|Pursue the partitioning approach with limited workspace and without stability.|Related to Fluxsort, with a different memory and stability tradeoff.|Use the implementation’s own guarantees and benchmarks rather than assuming a sibling has identical properties.|crum
Glidesort|2023 public implementation|2023|Hybrids|Established|O(n log n) worst|Yes|O(n) worst|Combine adaptive merging with stable quicksort and delayed merge decisions.|Peters’ implementation draws on both run structure and duplicate-aware partitioning.|Its practical behaviour depends on more than a single textbook recurrence.|glide
Driftsort|2024 Rust adoption|2024|Hybrids|Established|O(n log n) worst|Yes|O(n) worst|Combine stable quicksort with merging and detection of useful existing order.|Rust 1.81 adopted driftsort for stable slice sorting.|An adoption date, not a claim that the entire design was invented on release day.|rust,drift
Ipnsort|2024 Rust adoption|2024|Hybrids|Established|O(n log n) worst|No|O(log n) stack|Combine quicksort’s fast partitions with safeguards and specialised small-input handling.|Rust 1.81 adopted ipnsort for unstable slice sorting.|Stable and unstable library APIs promise different behaviour for equal keys.|rust
Bitonic sort|1968 Batcher publication|1968|Parallel & external|Established|O(n log² n) comparators; O(log² n) depth|No|Network/implementation-dependent|Build sequences rising then falling, then compare across distances to merge them.|A fixed wiring diagram can run many independent comparisons at once.|Depth measures parallel stages, not the total work of all comparators.|bitonic,batcher
Odd-even merge network|1968 Batcher publication|1968|Parallel & external|Established|O(n log² n) comparators; O(log² n) depth|No, usual network|Network-dependent|Recursively merge odd and even positions, then repair neighbouring outputs.|A second classic Batcher construction with a predetermined comparison schedule.|It is different from the adjacent odd-even transposition algorithm.|batcher
Odd-even transposition sort|Classical parallel variant|0|Parallel & external|Established|O(n²) work; O(n) parallel stages|Yes, strict adjacent swaps|O(1) sequential extra space|Alternate disjoint pairs (0,1),(2,3) and (1,2),(3,4).|Bubble-like local movement arranged so independent neighbours can work simultaneously.|More processors reduce elapsed stages but do not erase total quadratic work.|parallel
AKS sorting network|1983 theoretical construction|1983|Parallel & external|Established|O(n log n) size; O(log n) depth|Not generally|Circuit-dependent|Use expander-based constructions to obtain an asymptotically shallow sorting network.|Ajtai, Komlós and Szemerédi showed that logarithmic-depth sorting networks exist.|An asymptotic existence result does not imply an attractive small-input implementation.|aks
Samplesort|Classical parallel family|0|Parallel & external|Established|Expected O(n log n); balance-dependent|Usually no|Implementation-dependent|Sample splitter keys, distribute values into ordered buckets, then sort each bucket.|Once bucket boundaries are correct, workers can sort their regions independently.|Sampling, skew and duplicate treatment determine whether work is balanced.|ips,parallel
IPS⁴o|2017 lineage; 2020 extended paper|2020|Parallel & external|Established|Expected O(n log n) work|No|Per-thread/block buffers|Use in-place block distribution and branchless splitter trees for parallel samplesort.|Axtmann and colleagues make memory locality and load balancing central design concerns.|“In-place” in parallel engineering can still include bounded buffers per worker.|ips
External merge sort|Classical storage family|0|Parallel & external|Established|I/O-dependent; O(n log n) comparison work|Can be stable|Bounded RAM plus external output|Sort chunks that fit in memory, write ordered runs, then stream a multiway merge.|When data exceeds RAM, transfers to storage become part of the algorithm’s cost.|The number of passes and available buffers can matter more than a small comparison saving.|merge,poly
Polyphase merge sort|1960 publication|1960|Parallel & external|Established|Run-schedule and device dependent|Can be stable|Multiple external streams|Distribute runs unevenly among input tapes and rotate which tape receives output.|A design shaped by a limited number of sequential-access storage devices.|Its cleverness addresses a particular I/O model; it is not a universal modern in-memory sort.|poly
Funnelsort|1999 publication|1999|Parallel & external|Established|O(n log n) work; cache-efficient model|Can be stable|O(n)|Recursively merge through buffered funnels at several scales.|A cache-oblivious design seeks good transfers without being told cache sizes.|The theoretical I/O guarantee assumes the paper’s cache model and tall-cache condition.|funnel
Pancake sort|1979 Gates/Papadimitriou paper|1979|Unusual|Exact curiosity|O(n²) for basic max-and-flip method|No|O(1), iterative flips|Move the largest remaining pancake to the top, then flip it to the bottom.|Bill Gates coauthored a paper on bounds for sorting by prefix reversal.|Their bounds research is not the same as inventing the puzzle. Only prefix reversals are legal moves.|pancake
Bead sort / gravity sort|2002 publication|2002|Unusual|Model-specific|Depends on physical vs simulated model|Not meaningful for bare counts|May require O(n·M) cells|Represent nonnegative integers as rows of beads; let the beads settle into ordered row lengths.|Arulanandham, Calude and Dinneen explored a physical model of sorting.|A fast physical settling step does not include all encoding, hardware or simulation costs; M is the maximum value.|bead
Bogosort|Folklore; 2007 analysis|2007|Unusual|Randomised curiosity|Expected Θ(n·n!) for shuffle/check; unbounded worst|No|O(1) shuffle workspace|Randomly shuffle and check whether the result is ordered. Repeat.|A correct sorted result can come from an absurdly unhelpful search strategy.|Uniform independent shuffles eventually succeed with probability one, but have no finite worst-case attempt bound.|bogo
Stooge sort|Classical teaching curiosity|0|Unusual|Exact curiosity|O(n^2.71), approximately|No|O(log n) recursion|Sort the first two thirds, the last two thirds and the first two thirds again.|Overlapping recursive work turns a simple idea into a very expensive one.|The exponent is log(3)/log(3/2). A divide-and-conquer shape alone does not promise efficiency.|stooge
Slowsort|1984 satire|1984|Unusual|Exact curiosity|Superpolynomial in standard analysis|No|Implementation-dependent|Recursively find maxima in two halves, put the larger last, then sort the remaining prefix again.|Broder and Stolfi inverted the usual optimisation objective in their pessimal-algorithms work.|It deliberately repeats work; a concise recursive definition need not be fast.|expo
Sleep sort|2011 internet appearance|2011|Unusual|Not a reliable general sort|Delay depends on values and scheduling|No guarantee|Tasks/timers proportional to input|Start a timer for each value and emit when it wakes.|It tries to turn numeric order into waking order.|Real timers jitter, task starts differ and negatives need handling. The scheduler has inherited much of the problem.|sleep
Stalin sort|Internet folklore; origin uncertain|0|Unusual|Not a valid full sort|O(n) filtering|Keeps surviving order|O(1) possible|Discard each value smaller than the last retained one.|The joke exposes a missing requirement: a sorted-looking output can lose data.|It produces a nondecreasing subsequence, not a permutation of the full input. A merge-based repair would be a different algorithm.|stalin,contract
I Can’t Believe It Can Sort|2021 Fung paper|2021|Unusual|Exact curiosity|Exactly n² comparisons|No|O(1)|For every i and every j, swap when A[i] < A[j]. The output is ascending.|Fung found it while deliberately constructing wrong algorithms; the classroom detail is unverified.|Symmetric-looking loops hide asymmetric progress. It is correct but needlessly quadratic even on ordered input.|fung
ExpoSort|2024 preprint|2024|Unusual|Exact curiosity|Θ(2ⁿ)|Implementation-dependent|Recursive workspace|Use repeated recursion to intentionally take exponential time.|Abrahamsen’s paper pursues reluctant sorting, continuing the tradition of deliberately inefficient algorithms.|This is mathematical humour with a real cost analysis, not a performance recommendation.|expo
LearnedSort|2020 publication|2020|AI & learning|Research|Model, distribution and repair dependent|No, usual implementation|Model/bucket-dependent|Fit a model estimating where a value belongs; distribute it and repair remaining disorder.|Machine learning helps while sorting the data, unlike AlphaDev’s offline program discovery.|Model error, duplicates and training overhead must be included in the workload.|learned
LearnedSort 2.0|2021 preprint|2021|AI & learning|Research|Distribution-dependent hybrid|No, usual implementation|Model/bucket-dependent|Redesign learned distribution to handle repeated keys more effectively.|The authors identified high-duplicate inputs as a weakness in the original design.|A useful example of adversarial data exposing an assumption in a promising algorithm.|learned2
AlphaDev small-sort routines|2023 Nature publication|2023|AI & learning|Established|O(1) for fixed tiny input sizes|Routine-dependent|O(1)|Search for correct, low-latency assembly programs for tiny sorting tasks.|Reinforcement learning found routines incorporated into LLVM’s libc++ sorting code.|These are small building blocks. They do not remove the Ω(n log n) comparison lower bound for arbitrary n.|alpha
DovetailSort|2024 preprint|2024|Research frontier|Research|Parallel integer-model bounds|Implementation-dependent|Parallel implementation-dependent|Combine integer-sorting techniques with special treatment of frequent keys.|A theory-and-practice study of sorting integers in parallel.|Integer representation, duplication and processor model are essential to interpreting its guarantees.|dovetail
Parameter-aware partition sorting|2025 preprint|2025|Research frontier|Research|Optimality under paper’s parameters|Model-dependent|See paper|Measure order using richer parameters than input length and adapt partition-based sorting to them.|Sen’s work asks what it should mean for an algorithm to be universally optimal.|This is a defined theoretical notion, not “fastest for every real-world input”.|universal
Adaptive Hybrid Sort|2025 preprint; 2026 journal listing|2025|Research frontier|Research|Strategy- and assumptions-dependent|Chosen-strategy dependent|Chosen-strategy dependent|Select among sorting strategies using observed properties of the input.|A recent proposal makes strategy selection itself the algorithmic subject.|Author-reported comparisons need independent reproduction; do not treat a promising title as a universal guarantee.|ahs
bsort|9 March 2026 preprint|2026|Research frontier|Research|O(wn), w word width, reported|Not specified here|O(w), reported|Use a binary-quicksort-derived method for signed, unsigned and floating-point representations.|Guzmán proposes one representation-aware framework for several numeric types.|The reported bound includes word width. Representation and floating-point ordering conventions are not optional details.|bsort
Need for Speed Sort|13 July 2026 preprint|2026|Research frontier|Research|O(n log n) worst, reported|Not specified here|See full implementation/model|Recursively refine value intervals; clean small buckets with insertion sort and fall back when splits fail.|A 2026 distribution-sort proposal by Sučić, Vitasović and Petrušić.|Benchmark claims are the authors’ results, not reproduced here; read the full paper for workspace accounting.|nfs
Minimal-move in-place sorting|29 July 2026 preprint|2026|Research frontier|Research|n lg n + O(n) comparisons with high probability|Not specified here|In-place, paper’s model|Use an ordered-set structure to reduce comparison overhead while guaranteeing only linear moves.|Xu and Chick focus on moving records as a separate resource from comparing them.|The near-optimal comparison statement is probabilistic; the paper also gives a distinct worst-case tradeoff.|moves
Random-order online sorting|July 2026 preprint|2026|Research frontier|Research|Different online model|Not a batch stability claim|Model-dependent|Study sorting decisions when items arrive in random order under online constraints.|Recent theory explores what arrival assumptions buy an algorithm.|An online objective is not interchangeable with sorting an already available array. See the model before comparing bounds.|online'''
fields=['name','date','year','family','status','cost','stable','memory','idea','story','catch','sources']
records=[]
for line in raw.splitlines():
 vals=line.split('|')
 assert len(vals)==len(fields),(len(vals),line)
 d=dict(zip(fields,vals));d['year']=int(d['year']);d['sources']=d['sources'].split(',');d['id']=re.sub('[^a-z0-9]+','-',d['name'].lower()).strip('-')
 assert all(x in sources for x in d['sources'])
 records.append(d)
data={'cutoff':'2026-09-13','sources':{k:{'title':v[0],'url':v[1]} for k,v in sources.items()},'algorithms':records}
(root/'research/sorting/fact-sheet.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
print(len(records),'catalogue entries;',len(sources),'source records')
data['sources'].update({
'excel':{'title':'Sort data in Excel · Microsoft Support','url':'https://support.microsoft.com/en-us/excel/sort-data-in-a-range-or-table-in-excel'},
'sheets':{'title':'Sort and filter your data · Google Sheets Help','url':'https://support.google.com/docs/answer/3540681?hl=en'},
'youtube':{'title':'Comment visibility and Top comments · YouTube Help','url':'https://support.google.com/youtube/answer/13209064?hl=en'},
'dotnet':{'title':'Array.Sort implementation notes · Microsoft Learn','url':'https://learn.microsoft.com/en-us/dotnet/api/system.array.sort'},
})
(root/'research/sorting/fact-sheet.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
data['sources']['bst']={'title':'Binary search trees · Sedgewick & Wayne','url':'https://algs4.cs.princeton.edu/32bst/'}
data['sources']['insertioncode']={'title':'Insertion.java · reference implementation and bounds','url':'https://algs4.cs.princeton.edu/21elementary/Insertion.java.html'}
data['sources']['binarycode']={'title':'BinaryInsertion.java · reference implementation','url':'https://algs4.cs.princeton.edu/21elementary/BinaryInsertion.java.html'}
data['sources']['mergecode']={'title':'Merge.java · reference implementation and bounds','url':'https://algs4.cs.princeton.edu/22mergesort/Merge.java.html'}
data['sources']['quickcode']={'title':'Quick.java · reference implementation and bounds','url':'https://algs4.cs.princeton.edu/23quicksort/Quick.java.html'}
averages={
'Insertion sort':'Θ(n²) for uniformly shuffled distinct keys; Θ(n) for ordered input.',
'Binary insertion sort':'Θ(n log n) key comparisons, but Θ(n²) expected shifts on shuffled distinct keys.',
'Selection sort':'Θ(n²) comparisons regardless of input order in the standard implementation.',
'Bubble sort':'Θ(n²) on uniformly shuffled distinct keys; early exit helps ordered input.',
'Cocktail shaker sort':'Quadratic on typical random permutations; favourable inputs can be cheaper.',
'Gnome sort':'Θ(n²) on random permutations; linear on already ordered input.',
'Merge sort':'Θ(n log n) for standard merge sort; run-aware variants can do less work.',
'Bottom-up merge sort':'Θ(n log n) for the conventional fixed merge schedule.',
'Quicksort':'Expected Θ(n log n) with random pivots or uniformly shuffled distinct input.',
'Three-way quicksort':'Expected O(n log n), often less with many equal keys; pivot assumptions matter.',
'Counting sort':'Θ(n + k) in the standard dense-count implementation; k is the key range.',
'LSD radix sort':'Θ(d(n + b)) for fixed-width keys and counting-based digit passes.',
'Heapsort':'O(n log n); the worst-case guarantee is its main attraction, not one measured average.',
'I Can’t Believe It Can Sort':'Exactly n² key comparisons on every input of length n, including already ordered input.',
'Bogosort':'Expected n! shuffles for distinct keys; Θ(n·n!) time if each shuffle costs Θ(n).',
'Bitonic sort':'The comparator count does not depend on the values: a fixed O(n log² n) network.',
'Need for Speed Sort':'Author-reported benchmark results; no independent average reproduced here.',
'bsort':'Reported O(wn) bound; actual average timing depends on numeric type and implementation.',
}
uses={
'Insertion sort':'A small hand of cards, a short list, or the cleanup inside a larger sorting method.',
'Binary insertion sort':'Small arrays whose keys are expensive to compare but whose records are cheap to shift.',
'Selection sort':'A teaching baseline when separating the cost of comparisons from the cost of swaps.',
'Bubble sort':'Teaching local repair and early termination; rarely the first choice for large data.',
'Merge sort':'Combining already ordered runs, such as batches of dated records. External variants stream them from storage.',
'Quicksort':'General-purpose in-memory sorting when fast partitions are useful; robust libraries add safeguards.',
'Heapsort':'A bounded worst case with little workspace, or a fallback when quicksort partitions go badly.',
'Counting sort':'Dense integer categories such as a bounded score range, if the count array fits comfortably in memory.',
'LSD radix sort':'Digit-structured identifiers. Punched-card processing provides a historical physical analogue.',
'MSD radix sort':'Strings or identifiers sharing prefixes, where later characters matter only inside tied groups.',
'Pancake sort':'A constrained-move puzzle: useful for learning to design a procedure around operations you are allowed to use.',
'Stalin sort':'A counterexample for testing specifications. Deletion is valid filtering, but is not full sorting.',
'Sleep sort':'A thought experiment about clocks, parallel tasks and hidden scheduling costs.',
'Patience sorting':'Reasoning about card piles and the length of an increasing subsequence, with a merge stage for full sorting.',
'Introsort':'General-purpose library sorting that needs both quicksort-like speed and worst-case protection.',
'Timsort':'Data arriving as several already ordered runs, such as concatenated sorted batches.',
'Powersort':'Stable library sorting that should preserve and efficiently combine existing runs.',
'Driftsort':'The stable slice-sorting implementation adopted by Rust 1.81.',
'Ipnsort':'The unstable slice-sorting implementation adopted by Rust 1.81.',
'AlphaDev small-sort routines':'Tiny fixed-size subroutines called inside a larger library sort. The learning happens before deployment.',
'External merge sort':'A file or database export too large for RAM, where sequential reads and writes are valuable.',
'Polyphase merge sort':'Historical tape workloads with few drives and sequential access.',
'Bitonic sort':'Parallel comparator schedules and fixed small networks; hardware or vectorisation changes the tradeoff.',
'AKS sorting network':'Understanding what is theoretically possible for parallel depth, rather than choosing a simple app implementation.',
'Cycle sort':'A situation where overwriting records is expensive and reducing writes is worth extra comparisons.',
}
for a in data['algorithms']:
 if a['name']=='Tree sort':a['sources']=['bst']
 if a['name']=='Insertion sort':a['sources']=['insertioncode']
 if a['name']=='Binary insertion sort':a['sources']=['binarycode']
 if a['name']=='Merge sort':a['sources']=['mergecode','von']
 if a['name']=='Quicksort':a['sources']=['quickcode','hoare','hoarepapers']
 a['average']=averages.get(a['name'],'No single average is claimed: specify an input distribution, implementation and cost model. The stated cost above gives the available bound or dependency.')
 a['use']=uses.get(a['name'],{'Foundations':'Use it to study a distinct way of preserving order and making progress. Compare its costs against the simpler alternatives.','Distribution':'Consider the idea when keys expose useful numeric ranges or representations; verify that the distribution assumptions hold.','Hybrids':'Consider the implementation when its combination of stability, memory and input adaptivity matches the workload.','Parallel & external':'Consider the idea when parallelism, memory transfers or external storage are the resource that limits the task.','Unusual':'Use it as a reasoning exercise or counterexample; its educational value can outweigh its practical performance.','AI & learning':'Study how a learned component contributes, and include its training or correction cost in the appropriate phase.','Research frontier':'Use it to understand a recent research direction. Validate the paper’s model and reproduce relevant measurements before adoption.'}[a['family']])
(root/'research/sorting/fact-sheet.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))

# Reader-focused, versioned editorial revisions.
overrides_path=root/"research/sorting/editorial-overrides.json"
if overrides_path.exists():
 overrides=json.loads(overrides_path.read_text())
 for a in data["algorithms"]:a.update(overrides.get(a["name"],{}))
 (root/"research/sorting/fact-sheet.json").write_text(json.dumps(data,ensure_ascii=False,indent=2))
