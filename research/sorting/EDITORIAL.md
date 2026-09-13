# Sorting explainer: research and editorial decisions
Research cutoff: 13 September 2026. Prepared before page implementation.

## User intent
A substantive FT-inspired interactive history of sorting, including unusual origins, AI discoveries and the role of sorting in learning structural thinking. The uploaded skill is reference guidance, not publication authorization or a command to change hosting. Its ZIP contains the same SKILL.md. This is an addition to the existing isaee.xyz interactive-blog project; preserve its stack and hosting.

## Thesis
Sorting is a particularly good small laboratory for algorithmic thinking: specify success, preserve information, establish an invariant, prove progress and termination, count resources, test adversarial examples, and expose assumptions. This is an editorial argument, not a proven ranking of teaching methods. Counterpoint: sorting supplies a fixed objective and exact answers; it does not by itself teach uncertainty, fairness, conflicting objectives, search, or graph structure.

## Scope
No finite authoritative registry contains every sorting variant ever invented. Include a broad, explicitly curated atlas of foundational families, named variants, production hybrids, external/parallel methods, curiosities, and research available by the cutoff. Count entries as methods/variants, not independent inventions. Unknown origins remain unknown. Dates distinguish publication, documented appearance and adoption. Research preprints are not independent benchmark verification. Related tasks (topological ordering, partial selection, differentiable relaxations) are explained separately from exact total-order sorting.

## Verified central facts
- Sorting requires nondecreasing output AND a permutation of the input, including duplicate multiplicities. https://xlinux.nist.gov/dads/HTML/sort.html
- Insertion/selection, cost model and invariants: https://algs4.cs.princeton.edu/21elementary/
- Merge recurrence and comparison lower bound: https://algs4.cs.princeton.edu/22mergesort/
- Quicksort partitions and three-way duplicate handling: https://algs4.cs.princeton.edu/23quicksort/
- Heap construction and repeated extraction: https://algs4.cs.princeton.edu/24pq/
- Counting and digit-based sorting exploit key representation: https://algs4.cs.princeton.edu/51radix/
- Punched-card sorting predates electronic computers; Hollerith system used in 1890 census. https://www.census.gov/about/history/bureau-history/census-innovations/technology/hollerith-machine.html
- Hoare described developing quicksort while studying in Moscow in connection with machine translation. His oral history supports the story; 1961 algorithm publication and 1962 article are distinct. https://archive.computerhistory.org/resources/text/Oral_History/Hoare_Sir_Antony/102658017.05.01.pdf ; https://www.cs.ox.ac.uk/people/publications/bibtex/Tony.Hoare.html
- Shell's paper is July 1959. https://xlinux.nist.gov/dads/HTML/shellsort.html
- Smoothsort's journal paper is 1982, distinct from the 1981 manuscript. https://www.sciencedirect.com/science/article/pii/0167642382900168
- Comb has a 1980 predecessor and 1991 Box/Lacey account. https://xlinux.nist.gov/dads/HTML/combSort.html
- Gnome's precursor is Sarbazi-Azad's 2000 Stupid Sort; Grune's documented naming recollection is 2003. https://xlinux.nist.gov/dads/HTML/gnomeSort.html
- Fung's October 2021 paper documents intentionally constructing incorrect sorting algorithms and discovering the all-pairs routine still sorted. It does NOT verify a classroom discovery. It uses A[i] < A[j] for ascending output, n² comparisons, and is unstable. https://arxiv.org/html/2110.01111v1
- Fung proof invariant: after outer pass i, the first i positions are ordered and their last contains a global maximum (1-based). Independently machine-verified example: https://toccata.gitlabpages.inria.fr/toccata/gallery/i_cant_believe_it_can_sort.fr.html
- Gates/Papadimitriou's prefix-reversal paper is 1979; this is not a claim that they invented the original pancake puzzle. https://doi.org/10.1016/0012-365X(79)90068-2
- Timsort is Tim Peters' stable adaptive mergesort; CPython now documents a Powersort merge policy. https://github.com/python/cpython/blob/main/Objects/listsort.txt
- Powersort and Peeksort introduced by Munro/Wild in 2018. https://www2.wild-inter.net/publications/munro-wild-2018
- Rust 1.81 (September 2024) adopted driftsort for stable and ipnsort for unstable sorting. https://blog.rust-lang.org/2024/09/05/Rust-1.81.0/
- AlphaDev (Nature, 7 June 2023) discovered low-level small-array routines. Sort3/4/5 routines entered LLVM libc++; this did not change the asymptotic comparison lower bound. Benchmark percentages are conditional and will not be promoted as universal. https://www.nature.com/articles/s41586-023-06004-9
- LearnedSort uses a learned estimate of distribution/rank and repair; it differs from AI designing a fixed program. https://github.com/anikristo/LearnedSort ; https://arxiv.org/abs/2107.03290
- DovetailSort: 2024 parallel integer-sort research. https://arxiv.org/abs/2401.00710
- Universal optimality work (2025) changes the parameter-sensitive performance model; it does not demonstrate fastest software on every machine. https://arxiv.org/abs/2506.08261
- bsort (March 2026) is a non-comparison numeric sorting proposal. https://arxiv.org/abs/2603.08929
- Need for Speed Sort (13 July 2026) combines recursive distribution with cleanup/fallback. https://arxiv.org/abs/2607.11850
- Minimal-move sorting (29 July 2026) reports in-place randomized comparison sorting with n lg n + O(n) comparisons with exponentially high probability and O(n) moves. https://arxiv.org/abs/2607.27040
- A 2026 educational study explores the obstacle that learners visually sort holistically, skipping explicit comparisons. This supports hiding values during an optional comparison exercise, not a universal claim of teaching superiority. https://publikationen.bibliothek.kit.edu/1000192480

## Narrative, settled before coding
1. The contract (5 scrolly steps): output order; preserve items; local comparisons; invariant; termination. Interactive prediction and a deliberately invalid deletion sort.
2. The cost (5): insertion progress; reverse input; merge divide; merge combine; input growth. Actual trace lab with counts, not a fake timed race.
3. The loopholes (5): comparison decision tree; counting; stable radix passes; equal-key stability; memory and parallelism. Explicit computational models.
4. The surprises (5): Fung's unexpected code; maximum-first pass; ordered-prefix invariant; AI-designed tiny programs; change what you optimize. Sources and recent research.
Then an interactive lab, chronological milestone rail, expandable searchable atlas, present-day frontier, and five transferable habits plus the limits of the thesis.

## Design and measurement
Editorial serif, fine rules, parchment referencing the supplied FT visual, saturated vermilion for active work, teal for established order. Bar height encodes value; labels remain legible. Same input identity persists in trace playback. No animation substitutes for a computational result. Reduced-motion and explicit next/back controls. Semantic HTML, external assets for the existing CSP. No unrelated video or image generation required for native data diagrams.

## Verification plan
Check implementations on exhaustive small permutations and duplicate-heavy inputs against numeric sorted order plus identity preservation. Check supposed-stable implementations for duplicate ordering. Check counters and cancellation. Verify responsive layout and representative story, lab and atlas interactions in the browser; build existing project without embedding the local AI API key. Keep publication distinct from local preview.
