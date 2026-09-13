# Sorting explainer: editorial and learning audit

Date: 13 September 2026

Live page: https://isaee.xyz/interactive-blogs/sorting/


## Executive assessment

The page has a useful central thesis and a substantial reference collection. It currently functions mainly as an illustrated lesson plus a configurable visualiser. It does not yet meet the intended standard of intuitive learning through discovery. A passing build and sorting tests did not establish that the page was engaging or understandable.


## Scope and standard

Reviewed the live reading structure, authored narrative paragraphs, dynamic everyday copy, all 74 atlas records, diagram and lab logic, and timing methodology. This is a first-principles editorial/interaction audit, with targeted technical source checks; it is not a fresh independent verification of every one of the 82 external references or a user study. No live content was changed in this audit.

For each passage: What question does it answer? What must the reader already know? Is the claim exact under its stated assumptions? Does the illustration demonstrate the reasoning? Can the reader make a meaningful decision and receive explanatory feedback? Can they transfer the idea to a new situation?


## Priority findings

1. Most guided steps reveal fixed illustrations. The reader can advance without predicting, comparing, constructing, or explaining. The one explicit correctness quiz arrives after the answer has already been taught.

2. The narrative spends its attention budget on breadth and terminology. It introduces prefix, invariant, logarithm, stability, networks and assembly without enough concrete experience beforehand.

3. The implementation has 16 executable methods, but the main story gives no embedded mission connecting its individual lesson to the corresponding lab state.

4. The hero morphs bar heights at fixed positions rather than visibly moving persistent records. The same visual ambiguity affects row/card redraws. Object continuity matters when preservation is the central lesson.

5. The reference atlas repeats one average-case disclaimer in 56 of 74 entries. Seven generic use-case templates occupy 49 of 74 entries. These are not 49 concrete real-world use cases.

6. The project currently claims breadth more convincingly than depth. Most history is a list of milestones, and surprising stories are summaries rather than discoveries the reader can participate in.

7. A handful of claims need tighter scope: choosing an earliest item is selection; stability is required by the illustrated LSD passes, not all radix sorts; natural merge cost depends on scheduling; invariants must be established and preserved, not merely named.


## Main narrative paragraph audit

Numbers follow the source document’s paragraph order, including label and empty UI paragraphs. Labels and empty placeholders are excluded below; dynamic copy is covered separately.


### P1: From arranging a hand of cards to an AI discovering code. The surprisingly human story of sorting, and what it teaches us about solving problems.

Rewrite the opening around a task the reader can attempt. The promise is clear, but neither the problem nor the stakes is concrete.


### P2: You already sort. You might just not call it an algorithm.

Keep the familiar-life connection, but avoid repeating it in the next heading.


### P3: You put the soonest deadline first. You arrange receipts by date. You place a new playing card between two cards already in order. Each time, you choose what matters, then use a procedure to organise the things in front of you.

Qualify: choosing the earliest deadline can be selection, not full sorting. Merely arranging objects is not yet an explicitly specified algorithm. Ask for a repeatable procedure another person could follow.


### P4: Our argument: sorting is a small laboratory for structured thinking. The answer is easy to recognise, so the interesting questions become visible: What must stay true? Why does this step help? Will it finish? What does it cost?

Keep as the thesis, after a reader experiment. The page names these questions before creating a need to ask them.


### P5: But “the best introduction to every algorithm” goes too far. Sorting begins with a known objective and an exact answer. Later, we will ask what changes when a product tries to decide what you should care about.

Move to the conclusion. It rebuts “best introduction to every algorithm”, a stronger claim than the user made. Assess sorting as a useful first teaching example, not as a universal curriculum.


### P7: Start with a familiar task. Change its rule. Notice what moves, what stays together, and what information the rule needs.

Make the instruction concrete: sort five expenses without changing which amount belongs to which expense.


### P9: “Sort by price” defines the desired order. Quicksort describes a way to compute it. A product’s help page can verify the first without revealing the second. We do not infer Excel’s or Google Sheets’ internal algorithm from their interface.

Keep the key-versus-procedure distinction. Compress the implementation caveat into one accessible evidence note.


### P10: Where code is public, we can be specific: CPython documents a Powersort merge policy, Rust 1.81 adopted driftsort and ipnsort, and .NET documents an introspective Array.Sort implementation. These facts do not establish what Excel uses. ↗↗↗

Move to an optional “Inside real software” panel. Introducing five unfamiliar product/algorithm names here interrupts the beginner story.


### P12: A key is the property you order by: price, date, name or size. These numbers use smallest first; “best” would need a definition. ↗

Keep. Let the reader choose date versus price before naming “key”.


### P13: Deleting the inconvenient numbers makes this list look ordered. But a true sort must keep every original item, including repeats. ↗

Keep the preservation requirement. Ask the reader to catch a missing duplicate before revealing the answer.


### P14: A computer can compare two keys, then exchange their records. A method must say which pair to inspect next, without relying on a person seeing the whole answer. ↗

Qualify as a comparison-based example; not all sorts use pairwise comparisons. Add a restricted two-card comparison exercise.


### P15: In insertion sort, the processed prefix remains ordered after each insertion. This promise is an invariant: a fact that connects one step to the next. ↗

Define prefix as “the part we have already processed”. Show one insertion preserving its order before naming invariant.


### P16: The processed prefix gains an item each round, and the input is finite. A rule plus an invariant plus progress gives a reason to trust the result; now ask what that progress costs. ↗

Incomplete as a proof explanation. Also show the promise holds initially, survives an insertion, and implies the goal at termination. Finite input alone does not force a procedure to finish.


### P18: An ordered input needs only a short confirmation in insertion sort. Adaptive algorithms can benefit from structure that is already present. ↗

Keep, but demonstrate the seven checks and explain that this implementation still verifies order.


### P19: If every new item belongs at the front, an adjacent-swap insertion sort moves it past everything before it. This example needs 1 + 2 + … + 7 = 28 swaps. ↗

Correct for eight reversed distinct values using adjacent swaps. Let the reader try a smaller case and predict 28 before exposing it.


### P20: Merge sort splits the sequence until the pieces are trivial to sort. The teaching example has eight items, so halving reaches singletons in three levels. ↗

Explain why single-item pieces are already sorted; “trivial” assumes the intended insight.


### P21: Merge two ordered runs by comparing their front values and taking the smaller. Each level processes the items again, giving growth proportional to n log n. ↗

Demonstrate a merge by asking which visible front card to take. Explain one linear pass at each halving level before the formula.


### P22: O(n²) and O(n log n) describe how work scales, not seconds. Input, constants and hardware still matter; some methods even change which operations they need. ↗

Correct distinction, introduced too abstractly. Put the symbol explanation here, alongside a size slider and labelled operation counts.


### P24: Four distinct items have 24 possible orders. A yes/no comparison decision tree needs at least five levels somewhere to distinguish them: four binary answers distinguish at most 16 possibilities. ↗

The binary-information argument is valid for the stated comparison model, but cognitively abrupt. Let each chosen comparison eliminate impossible orders before presenting 24 and five.


### P25: With small integer keys, counting sort can directly count occurrences. Its O(n + k) work includes the key range k; this is extra information the comparison-only model does not use. ↗

Let the reader allocate bins, then widen the key range. Show why memory cost grows with range even when the number of records stays fixed.


### P26: Radix sort can order the units digit, then the tens digit. Each pass must preserve the order of equal digits so the previous pass keeps doing useful work. ↗

Specify LSD radix sort. The stability requirement applies to these least-significant-first passes, not to every radix-family implementation. Teach stable ties before relying on them.


### P27: A stable sort preserves the input order of equal keys. If you need a particular tie-breaker in a spreadsheet, specify that second key explicitly instead of assuming undocumented tie behaviour. ↗↗

Keep the exact stability definition. Separate stable sorting from specifying a secondary key: both can produce the desired example, but they are different guarantees.


### P28: A sorting network fixes the comparison schedule; independent pairs can run together. Memory use, parallel depth and total work are different costs, which is why history never converged on one winner. ↗

Too many ideas at once. First compare parallel rounds with total comparisons; explain memory separately. Show a counter and rounds advancing together.


### P30: In 2021, Stanley Fung described this all-pairs routine after trying to make incorrect sorts. The < sign looks backwards, yet the result is ascending. ↗

Strong story, but a novice has not learned why the sign looks wrong. Ask ascending/descending/fails, then run the first outer pass.


### P31: The first outer pass pulls a global maximum to the first position. Watch the whole pass before judging the direction of the result. ↗

Keep, but let the reader perform or replay each inner comparison; one snapshot does not show why the maximum arrives there.


### P32: After outer pass i, the prefix through i is ordered and its last item holds a maximum. At the last pass, that prefix is the entire array; an invariant explains the surprise. ↗

States a useful invariant; does not prove its preservation. Add a plain-language induction explanation or label this a preview with an optional proof.


### P33: AlphaDev used reinforcement learning to discover small sorting routines published in 2023 and incorporated into LLVM libc++. It optimised low-level building blocks, not the asymptotic limit for arbitrary lists. ↗

Preserve the small-routine and offline-discovery distinction. Explain the training goal and what entered the library in concrete language. “LLVM libc++” and “asymptotic” need optional definitions.


### P34: In July 2026, researchers reported linear data moves alongside near-optimal comparisons in an in-place randomised method. The discovery changes a resource tradeoff; it does not make every existing sort obsolete. ↗

Move to the research appendix or make record-movement cost tangible with heavy objects. Near-optimal, in-place, randomised and linear all arrive together.


### P36: If the list holds 1,000 receipts, n is 1,000. The receipt values are a different quantity.

Keep; move before the first n-dependent expression.


### P37: Double the items and the growth term doubles. This is a bound on scaling, not a promise of exactly one operation per item.

Explain linear growth using a concrete work model. O(n) is an upper bound, so it does not itself mean runtime doubles exactly or that every such algorithm makes one pass.


### P38: At powers of two, log₂ n counts halvings. Doubling the input adds one level as well as doubling each level’s size.

Keep the halving analogy. Demonstrate it instead of asking readers to infer a recursion tree.


### P39: Double n and n² becomes four times as large. Constants and small-input overhead still matter.

Correct for the n² growth term; do not turn it into a promise about measured seconds.


### P40: O is an upper-bound notation; Θ describes a tight growth rate. “Average” requires a distribution of inputs, “expected” may average over an algorithm’s random choices, and “worst” covers the hardest allowed input. None is a universal duration in seconds.

Correct distinctions but overloaded. Introduce average/worst using two actual inputs; keep Θ and formal notation optional.


### P42: Input: 4, 2, 2, 7. Output: 2, 4, 7.

Good counterexample placed too late. It repeats an answer explicitly taught many sections earlier.


### P43: Choose an answer, then test it against the contract.

Replace passive feedback with “Which original record disappeared?” and highlight the missing duplicate after the response.


### P45: Run real teaching implementations. Step backward, inspect the counters, and look for a reason the algorithm must work.

The lab needs a first mission. “Look for a reason” is vague when the reader faces 16 algorithms and many controls.


### P49: One comparison tests two keys. A swap writes two array slots. Buffer writes, digit inspections and loop tests are not counted as key comparisons. Zero comparisons in radix sort does not mean zero work.

Retain honest counters, but show comparison and movement separately. Cross-algorithm comparisons omit digit inspection and auxiliary writes, so the visible counts are not total work.


### P50: Merge/counter methods temporarily keep records in a scratch buffer. The main-array view alone can show duplicates during copying; the final audit checks the complete result.

The warning describes a real visual weakness. Render the scratch buffer and ownership of records instead of asking a novice to tolerate apparent lost/duplicated records.


### P51: These are teaching versions, not copies of production library implementations. The implementation details shown in the selector matter.

Keep once in methodology; link to it from the selector.


### P53: Compare insertion, merge and quicksort on the same generated values in your browser. Change input size or shape and measure again.

Add a prediction, equal inputs, and a before/after comparison chart. The current table gives numbers without a guided inference.


### P54: Mean of seven runs after two warm-ups. Timings include this implementation’s record creation and counters, exclude animation and display, and are not timings for Excel, Sheets or YouTube. Timer precision and browser load affect short runs.

Retain the timing protocol. Add that random values come from 1–99, so 512/1024-item random inputs necessarily contain duplicates. Report implementation and workload-specific results.


### P55: No timing has been measured yet.That is more honest than a universal number.

Remove the self-congratulatory wording. Say “Run the experiment to measure your device.”


### P57: Dates below mark a documented milestone, not the birthday of every idea. Explore individual methods in the atlas.

Keep the date convention as a compact note; the timeline itself needs a narrative of changing constraints.


### P58: Hollerith’s census equipment combines tabulation with a sorting table. Humans still place the cards into indicated drawers. ↗

Turn physical card processing into a playable digit-bucket demonstration. Explain the concrete role of sorting in organising records.


### P59: Shellsort, published quicksort and heapsort offer different ways to organise work on electronic computers. ↗↗↗

Too generic: names without problems or mechanisms. Feature one person, one constraint and one consequential idea; move the remaining dates to the atlas.


### P60: Batcher networks and then the AKS construction explore how little sequential depth sorting needs. ↗↗

Translate “sequential depth” into rounds of simultaneous comparisons. Cross-link the network experiment.


### P61: Introsort adds a fallback. Timsort exploits runs. Powersort improves the merge schedule. ↗↗↗

Define run and fallback before these compressed claims. Let the reader trigger a fallback or merge existing runs.


### P62: Learned distributions, AI-generated small routines, memory-aware hybrids and minimal-move research pursue different savings. ↗↗↗

This is a list of technical categories. Replace with one concrete cost that changed with hardware or data.


### P64: Foundations, variants, hybrids, special models and a few cautionary jokes. Open a row for the mechanism, story, costs, assumptions and sources.

Treat the atlas as optional reference. The main teaching journey should not make reading 74 entries feel necessary.


### P65: This is a broad curated atlas, not an exhaustive inventory of every published or unnamed variant. There is no closed registry of all sorting techniques. The 74 entries include algorithm families, named variants, implementation designs and research results; they are not 74 independent inventions.

Keep scope honesty. The main heading should say methods, variants and related ideas; some entries do not solve the same full-sorting task.


### P66: Dates identify publication, a documented appearance or adoption as labelled. “Classical” and “origin uncertain” mean no verified invention date is claimed. Original papers, author repositories, official documentation and institutional histories are prioritised. A preprint is labelled research, not independently verified performance.

Keep the distinction among invention, publication and adoption. Source presence does not establish that each paraphrase or guarantee has been independently proved.


### P67: Complexities refer to the stated implementation or model. n is the number of items, k the key range, d the number of digits, b the base and w the word width. “Stable” means preserving input order for equal keys. “In-place” conventions vary; see each memory note.

Put each parameter definition next to the bound using it. A glossary far away is insufficient for expert-looking complexity labels.


### P68: No matches. Try another name, idea or family.

Useful recovery text; add suggested familiar ideas or a reset action nearby.


### P69: All 74 entries are readable without JavaScript. Interactive diagrams, filtering and timings need JavaScript enabled.

True for atlas records, but not all story visuals or dynamically generated everyday explanations. Do not extend this claim to the entire experience.


### P71: bsort proposes a binary-quicksort-derived method with reported O(wn) time, where w is word width. “Linear” needs that parameter in view. ↗

Keep as optional frontier material. Explain word width and ordering conventions before treating the bound as informative.


### P72: Need for Speed Sort refines value buckets, then uses cleanup and fallback mechanisms. Its reported results are conditional on the paper’s workloads. ↗

Explain why a bucket split fails and how a fallback prevents runaway work. Otherwise the paragraph is a research abstract fragment.


### P73: Minimal-move sorting separates moves from comparisons. The reported randomised result achieves linear moves and near-optimal comparisons with a stated probability guarantee. ↗

Separate the probabilistic comparison guarantee from the moves guarantee in the wording; connect to the earlier resource example.


### P74: These sources were available before 13 September 2026. This page verifies attribution and summarises stated models; it does not independently reproduce their proofs or performance benchmarks. The cutoff is a research boundary, not a claim that nothing else was published.

Keep methodological limits once, close to the frontier claims. This audit does not independently reproduce the papers.


### P76: “Sort the expenses” is incomplete. By date or amount? Ascending or descending? What breaks a tie? What must remain attached to each record?

Good takeaway. Test it on a new task instead of merely repeating the expense example.


### P77: Sorted-looking output can still omit duplicates or scramble names and prices. Preserve the original information, then check order.

Good takeaway. Ask the reader to find a mismatch in unfamiliar records.


### P78: An ordered prefix, a maximum at the root, or correctly assigned buckets gives you something to reason about. Ask how the next step preserves it.

Make this transferable with a non-sorting workflow, such as ensuring each order retains its customer and payment record through processing.


### P79: If memory is scarce, a buffer costs something. If comparisons are expensive, fewer comparisons may be worth extra bookkeeping. Measure the workload that matters.

Good tradeoff principle. Supply a scenario with a constrained resource and ask the reader to defend a choice.


### P80: Reverse the list. Repeat every value. Use a huge numeric range. A few successful examples test a program; an invariant and termination argument explain why a method works.

Good falsification habit. Clarify which hypotheses each adversarial input targets, and offer inputs outside the lab’s restricted 1–99 numeric domain in a conceptual exercise.


### P81: A sorting algorithm cannot decide which employee deserves a promotion or which comment is valuable. Defining those keys involves judgement, uncertainty and consequences. Relevance ranking, graph problems and optimisation under constraints need ideas beyond ordering a list.

Overly absolute wording. A sorting procedure orders under supplied criteria; it cannot justify the criteria by itself. Software can produce decisions, but that does not establish their desirability or fairness.


### P82: We believe sorting is an unusually clear first classroom for algorithms. A 2026 education paper also points out the trap: people may visually jump to the answer without practising pairwise decisions. The lesson works when you explain the steps, not just admire the moving bars. ↗

The pedagogical claim is plausible, not established as the best approach. Replace “the lesson works” with “the design should require readers to explain and test steps”; actual learning needs learner evaluation.


### P83: Put the thinking in order.The list will follow.

Pleasant closing, but a small transfer challenge would provide stronger evidence of learning.


### P85: Sources sit beside the claims they support and inside every atlas entry. Diagrams and everyday records are teaching examples, not captured product internals.

Keep traceability. Use descriptive source previews instead of relying only on arrow links that take readers away.


### P86: The executable laboratory checks that the finished array is ordered and preserves every original record. Stable algorithms also check the relative order of duplicate keys. The development audit exercises exhaustive small permutations, duplicates and every provided method. Tests are not a proof of all input sizes; the accompanying invariants and references supply the reasoning.

Keep test/proof distinction. The current short invariant statements do not alone provide all proof steps. Tests verify implementation properties over tested cases, not comprehension.


### P87: Story diagrams use fixed illustrative values. The growth figure compares n² with n log₂ n in abstract units; it is not an empirical runtime chart. Browser timings use actual local measurements, disclose their sample count and include neither rendering nor trace capture. They describe these educational implementations only.

Keep the declared difference between illustrative diagrams and measurements. The same distinction should be visible on each experiment.


### P88: Excel and Google Sheets documentation verifies sorting features, not an internal named sorting algorithm. The YouTube example distinguishes timestamp ordering from relevance selection; its illustrative score is not YouTube’s formula. Unknown attribution and research status are labelled. Algorithm variants with different guarantees are named separately where useful.

Keep once in methodology. Repeated caveats throughout the main path are replacing explanation rather than supporting it.


### P89: The Financial Times explainer inspired the scroll-driven visual grammar. Its words, illustrations and branding are not reproduced. ↗

Appropriate credit. Inspiration should be evaluated by causal teaching and visual continuity, not just sticky panels and typography.


## Everyday examples and interaction text

**Spreadsheet:** The row/key distinction and broken-column example are useful. The current “Amount ↑” header appears even on original unsorted rows. Make headers express active sorting state. Ask the reader to spot the misassigned amount before exposing red error cells. “A second key resolves ties” should say it orders records tied on the first key; ties may remain, requiring another key. The ID tie-breaker makes this demo deterministic but must not be confused with proof that the underlying algorithm is stable.

**Comments:** The toy ranking is appropriately disclosed. Choosing preset modes is low-agency. Let readers choose between recency, likes and a supplied relevance judgment, then explain how a change in criteria changes visibility. Keep real YouTube behaviour separate. “Reverse input shows the worst case” in a toy comment needs an algorithm qualifier; it is not true for every method.

**Cards:** The analogy is intuitive. However, the text supplies the destination before the experiment, and Next performs predetermined actions. Hide the destination, ask which neighbour to compare, then name insertion sort. Distinguish shifting-with-a-held-key from adjacent swapping, since the page uses both descriptions.

**Lab:** Start with six cards and a goal. Include a visible pointer and scratch space. Keep record identity fixed across movements. After an error explain which condition failed. Offer advanced controls after the first success. Custom input length should update the displayed item count rather than leaving the preset size selected.

**Timing:** Same-input trials, warm-ups, mean and range are useful. The 1–99 generator means random large arrays have many duplicates; include distinct permutations as a separate workload. The last-pivot quicksort is a deliberate teaching implementation, not a stand-in for production quicksort. Avoid comparing partial counters as though they were total computational cost.


## Atlas review by entry

All entries were read for internal meaning, pedagogical value and stated model. Each entry’s mechanism, use, story and caveat are treated together here; repeated text is flagged rather than certified as useful. “No new contradiction found” would not mean a fresh source-level proof.


### A1: Insertion sort

Use the card exercise; clarify shift versus adjacent-swap implementation.


### A2: Binary insertion sort

Show why fewer comparisons still leave quadratic moves; keep the distinction.


### A3: Selection sort

Demonstrate cheap swaps versus many comparisons.


### A4: Bubble sort

Show a small item crawling left, then introduce the backward pass.


### A5: Cocktail shaker sort

Replace the generic use paragraph with the specific crawling problem.

Use-case paragraph repeats across 12 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.


### A6: Comb sort

Show a gap sequence; explain why a gap-one finish is necessary.

Use-case paragraph repeats across 12 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A7: Gnome sort

Make the walking-cursor metaphor executable.

Use-case paragraph repeats across 12 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.


### A8: Shellsort

Name the gap sequence for any precise bound; the generic use paragraph adds little.

Use-case paragraph repeats across 12 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A9: Merge sort

Demonstrate a merge and show scratch storage.


### A10: Bottom-up merge sort

Show widths 1, 2, 4; recursion is an optional implementation choice.

Use-case paragraph repeats across 12 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.


### A11: Natural merge sort

Qualify O(n log r) with pairwise merge passes or another appropriate schedule; arbitrary repeated accumulation can be quadratic.

Use-case paragraph repeats across 12 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A12: Quicksort

Show a bad pivot; qualify expected bounds by randomness/distinct-input assumptions.


### A13: Three-way quicksort

Use many equal keys to justify a finished equal region.

Use-case paragraph repeats across 12 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.


### A14: Dual-pivot quicksort

Name the Java version and primitive type for adoption claims; two pivots alone do not imply speed.

Use-case paragraph repeats across 11 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A15: Heapsort

Teach the root-winner property before heap vocabulary.


### A16: Smoothsort

Leonardo heaps need a diagram; otherwise this belongs in the expert appendix.

Use-case paragraph repeats across 12 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A17: Tree sort

Show balanced versus chain-shaped trees and preserved duplicate records.

Use-case paragraph repeats across 12 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A18: Tournament sort

A sports bracket is a useful concrete analogy; replay only the winner’s path.

Use-case paragraph repeats across 12 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A19: Cycle sort

Show a cycle and count writes; qualify the variant behind claims of minimality.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A20: Patience sorting

Have the reader build piles, then explicitly perform extraction; piles alone are not a sorted output.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A21: Strand sort

Show one extracted increasing strand and a merge.

Use-case paragraph repeats across 12 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A22: Ford–Johnson / merge-insertion

Frame around expensive comparisons and small fixed inputs, with implementation overhead visible.

Use-case paragraph repeats across 12 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A23: Counting sort

Use bounded exam scores and a range slider; retain full records, not only counts.


### A24: LSD radix sort

Teach stable passes with digit highlighting and an intentionally broken equal-digit pass.


### A25: MSD radix sort

Recheck the variable-base bound. Recursing into many buckets can pay radix-array setup per node, so the LSD-like O(d(n+b)) label is not universally justified for MSD implementations.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A26: Bucket sort

State a concrete distribution and bucket count for the expected linear claim.

Use-case paragraph repeats across 6 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A27: Histogram sort

Explain that histogram placement is a stage and buckets may still contain disorder.

Use-case paragraph repeats across 6 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A28: Pigeonhole sort

Contrast stored records with stored frequencies using one example.

Use-case paragraph repeats across 6 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A29: American flag sort

Demonstrate cyclic bucket placement; explain the radix-partition name without implying a verified origin story beyond its source.

Use-case paragraph repeats across 6 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A30: Flashsort

Show a skewed distribution that makes cleanup expensive.

Use-case paragraph repeats across 6 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A31: Spreadsort

Tie the hybrid to concrete key widths and fallback thresholds.

Use-case paragraph repeats across 6 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A32: Introsort

Let the reader create bad partitions and see a fallback trigger.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A33: Timsort

Show already ordered runs, define run, and distinguish current policies from the historical design.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A34: Powersort

Let the reader compare merge orders for unequal run lengths.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A35: Peeksort

Compare its merge-tree construction with Powersort using the same runs.

Use-case paragraph repeats across 11 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A36: Multiway Powersort

Show the tradeoff between fewer passes and more front values to choose among.

Use-case paragraph repeats across 11 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A37: GrailSort

Internal array workspace needs a concrete block diagram; the generic use paragraph is insufficient.

Use-case paragraph repeats across 11 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A38: WikiSort

Specify whether constant workspace includes a fixed-size external cache and which implementation is meant.

Use-case paragraph repeats across 11 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A39: Pattern-defeating quicksort

Let a constructed pattern trigger protection rather than merely listing safeguards.

Use-case paragraph repeats across 11 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A40: BlockQuicksort

Branch misprediction is unexplained; use a short CPU prediction analogy in optional depth.

Use-case paragraph repeats across 11 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A41: Quadsort

Four-way merge needs a four-front-item exercise; benchmark superiority remains workload-specific.

Use-case paragraph repeats across 11 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A42: Fluxsort

Clarify what stable partitioning preserves and where memory is spent.

Use-case paragraph repeats across 11 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A43: Crumsort

Compare directly with Fluxsort on stability and workspace.

Use-case paragraph repeats across 11 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A44: Glidesort

Explain what delayed merge decisions buy using one run pattern.

Use-case paragraph repeats across 11 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A45: Driftsort

Separate the adoption date, API guarantee and algorithm mechanism.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A46: Ipnsort

Contrast equal-key freedom with the stable API using identifiable records.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A47: Bitonic sort

Distinguish total comparisons from parallel rounds and state input-size/padding conventions.


### A48: Odd-even merge network

Show how it differs from odd-even transposition; similar names are a predictable confusion.

Use-case paragraph repeats across 5 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A49: Odd-even transposition sort

Use disjoint adjacent pairs with a round counter.

Use-case paragraph repeats across 5 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A50: AKS sorting network

Keep as an optional theoretical milestone; no expectation that a beginner understand expander constructions.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A51: Samplesort

Show a bad splitter sample producing one overloaded worker.

Use-case paragraph repeats across 5 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A52: IPS⁴o

Define its name and memory model; make block/per-thread workspace explicit.

Use-case paragraph repeats across 5 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A53: External merge sort

Use a file larger than RAM; show chunk sorting and streaming merge.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A54: Polyphase merge sort

Use tape drives as the constraint; avoid implying it is today’s default in-memory choice.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A55: Funnelsort

Define cache-oblivious as not receiving cache size; keep the tall-cache theorem optional.

Use-case paragraph repeats across 5 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A56: Pancake sort

Make prefix flips a puzzle; preserve the distinction between the puzzle and Gates’s bounds paper.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A57: Bead sort / gravity sort

Separate physical parallel time from sequential simulation and apparatus size.

Use-case paragraph repeats across 6 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A58: Bogosort

Ask how many permutations could be tried; state independent uniform shuffles for the usual expectation.

Use-case paragraph repeats across 6 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.


### A59: Stooge sort

Show overlapping recursion and why work is repeated.

Use-case paragraph repeats across 6 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A60: Slowsort

Explain the deliberately inefficient objective, with bounded demonstration only.

Use-case paragraph repeats across 6 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A61: Sleep sort

Offer a jitter control to demonstrate why timer wakeups are not a correctness guarantee.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A62: Stalin sort

Label as a non-sort/filter in the top-level atlas, not only inside its caveat.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A63: I Can’t Believe It Can Sort

Put the surprising procedure in a prediction experiment; provide the invariant’s preservation argument.

Use-case paragraph repeats across 6 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.


### A64: ExpoSort

State the concrete recurrence behind the exponential label in optional depth.

Use-case paragraph repeats across 6 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A65: LearnedSort

Show rank prediction errors and the repair stage; distinguish training costs.

Use-case paragraph repeats across 2 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A66: LearnedSort 2.0

Compare duplicate-heavy input before and after the change.

Use-case paragraph repeats across 2 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A67: AlphaDev small-sort routines

Do not present fixed-size O(1) as arbitrary-size superiority; illustrate offline program search.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A68: DovetailSort

Keep processor, key representation and duplication parameters together.

Use-case paragraph repeats across 7 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A69: Parameter-aware partition sorting

Use the paper’s exact terminology and parameter definitions; avoid presenting an editorial label as a standard algorithm name.

Use-case paragraph repeats across 7 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A70: Adaptive Hybrid Sort

“Adaptive Hybrid Sort” is not a unique identifier without author/year/paper; clarify the specific proposal.

Use-case paragraph repeats across 7 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A71: bsort

Explain numeric representation and ordering conventions, especially floating point.

Use-case paragraph repeats across 7 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.


### A72: Need for Speed Sort

Show the fallback guarantee separately from author-reported speed.

Use-case paragraph repeats across 7 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.


### A73: Minimal-move in-place sorting

Separate high-probability comparison bounds from move guarantees and exact workspace model.

Use-case paragraph repeats across 7 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


### A74: Random-order online sorting

Mark visibly as a different online problem; it is not another drop-in full-array sorting method.

Use-case paragraph repeats across 7 entries: replace it with a concrete scenario, or explicitly label the entry as theoretical/pedagogical.

Average-case paragraph repeats across 56 entries: replace with an explicit model-specific result where established, or a concise “not specified for this family” note. A single global methodology note should explain why universal seconds cannot be supplied.


## Targeted technical checks

Munro and Wild discuss how merge order changes the cost of exploiting runs: https://www2.wild-inter.net/publications/munro-wild-2018 . This supports adding the scheduling qualification to the natural merge family entry.

Princeton separates LSD, MSD and radix-partition implementations: https://algs4.cs.princeton.edu/51radix/ . The MSD variable-radix bound remains a specific follow-up item, not an assertion that all MSD implementations violate the displayed bound.


## Recommended learning sequence

1. Sort six visible cards yourself. Then repeat with only two values revealed at a time. State a rule someone else can execute.

2. Catch a sorted-looking expense table that changed ownership of amounts. Define both order and preservation.

3. Insert one new card. Predict each comparison. Discover the ordered-prefix promise and why the procedure stops.

4. Predict which input costs more. Compare identical workloads and expose comparisons, moves and scratch memory separately.

5. Merge two runs by choosing their front cards. Grow the input and discover the n log n structure.

6. Try bounded scores and two-digit keys. Discover why key representation and stability matter.

7. Solve a pancake puzzle and predict Fung’s result. Use counterexamples and a real invariant explanation to resolve the surprise.

8. Explore AI-generated tiny routines and the historical atlas as optional depth.

9. Finish with an unfamiliar practical problem. Ask for the sorting criteria, information to preserve, procedure, stopping argument and likely difficult input.

Each activity should support keyboard/tap operation, optional hints, an immediate explanation of mistakes, a worked-example bypass, replay and reduced motion. Fun should come from prediction, agency, surprise and understandable consequences.


## What would count as improvement?

A reader should be able to explain one procedure without looking at the animation, diagnose lost records, distinguish criteria from computation, predict why reversed or duplicate-heavy inputs change work, and justify a choice under one constraint. Test those abilities with readers; interaction counts, visual polish and algorithm unit tests are not learning outcomes.
