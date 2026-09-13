# Libraries and narrative direction
Research date: 13 September 2026. Documentation/repository research, not an implementation benchmark. No dependencies installed and no live-page changes in this research pass.

## Recommendation
For the existing static HTML/JavaScript article, start with Anime.js plus selective D3 modules. Keep semantic DOM/SVG records, identity-preserving movements, keyboard/tap controls and the verified algorithm engine separate from presentation. Add Scrollama if its step/resize lifecycle simplifies the narrative. Use locally authored inline definitions inspired by Nutshell to reduce terminology overload. Avoid importing several competing animation engines.

- Anime.js: https://github.com/juliangarnier/anime — MIT. DOM/SVG/object animation and draggable support. Best initial fit for cards, rows, bucket moves and reversible teaching sequences in the current page. https://animejs.com/documentation/draggable/
- D3: https://github.com/d3/d3 — ISC. Scales, data joins, trees, paths and interactive behaviours; useful for comparison trees, growth plots and run diagrams. https://d3js.org/
- Scrollama: https://github.com/russellsamora/scrollama — MIT. IntersectionObserver-based scroll steps, direction/progress callbacks, resize handling. Does not create meaningful learning interactions by itself.
- Motion: https://github.com/motiondivision/motion — MIT core. Gestures, layout animations, springs and scroll effects. Strong alternative if we choose React islands; do not install alongside Anime.js without a distinct need. Premium Motion+ assets/APIs are separate from the MIT core.
- manim-web: https://github.com/maloyan/manim-web — MIT. Independent TypeScript browser project inspired by Manim, with shapes, equations, graphing, clickable/draggable objects and React integration. Worth prototyping one scene; not the official 3Blue1Brown engine. Validate mobile performance, text, accessibility, reverse seeking, cancellation and payload before adopting it widely.
- Original Manim: https://github.com/3b1b/manim — MIT. Python/OpenGL explanatory-animation engine used by 3Blue1Brown. Better suited to authored animation exports than as the direct runtime for the reader's browser-based puzzles. Distinct from https://github.com/ManimCommunity/manim .
- Motion Canvas: https://github.com/motion-canvas/motion-canvas — MIT. TypeScript generator-based vector-animation authoring/editor with a browser player. Consider for a tightly scripted explanatory sequence or later teaser; custom learner-controlled state still needs engineering.
- Mafs: https://github.com/stevenpetryk/mafs — MIT. React interactive math components. Good for growth curves or coordinate mathematics; less directly helpful for a sorting-card narrative. https://mafs.dev/
- Nutshell: https://github.com/ncase/nutshell — CC0. Expandable explanations in the reading flow. Use local explanations rather than remote embedding under the site's current CSP. https://ncase.me/nutshell/

GitHub metadata checked: all nine repositories were unarchived. A recent push is only an activity signal, not proof of maintenance quality. Avoid selecting by star counts alone.

## Story hypothesis
Working title: “This looks wrong. It still sorts.”
Subhead: “A strange little program, an AI discovery, and what they reveal about thinking in steps.”

Open on six identifiable cards and a machine making a counterintuitive move. Invite a prediction before showing the final output. Teach the repeated rule in plain language; do not require the visitor to read nested loops. Let them try another input. Distinguish successful examples from a reason the procedure always works. Discover the ordered-prefix-plus-maximum invariant with a visible boundary.

The second mystery: why can sorting still be improved if humans understand it so well? Let readers count different costs, then explain AlphaDev's offline discovery of tiny low-level routines. Any simplified program-building game must be labelled a teaching analogy, not an AlphaDev reproduction or live AI competition.

Bridge to everyday records: sorting can be correct under the wrong criterion; apparent order can hide damaged records; the fastest procedure depends on the workload. Preserve the full atlas as optional depth after the short discovery journey.

A shareable challenge should encode the input and prediction in a URL so another reader can replay the same puzzle. Potential hooks: predicting the wrong direction, solving a prefix-flip pancake puzzle, or constructing an input that exposes a named method's weakness. Do not claim actual failure of a correct method when the challenge only makes it slower. No fabricated success rates or “beat AI” claims. Virality is an untested editorial hypothesis.

## Evidence behind the hooks
- Fung's original paper is from October 2021, even if the user encountered recent coverage. It describes finding the surprising method while attempting to construct incorrect algorithms: https://arxiv.org/html/2110.01111v1 . The exact recent news item remains unidentified.
- AlphaDev's Nature paper (7 June 2023) reports discovered small sorting routines, including sort3/4/5 implementations in LLVM libc++: https://www.nature.com/articles/s41586-023-06004-9 . Do not imply it invented sorting or broke the general comparison lower bound.
- If “two AI discoveries” means two examples, AlphaTensor (5 October 2022) provides matrix multiplication as a separate example: https://deepmind.google/blog/discovering-novel-algorithms-with-alphatensor/ . These are two examples, not a count of every AI algorithmic discovery in history.
- Nicky Case's design patterns support a hook requiring little prior knowledge, trying before explanation, building small mechanics into larger ones, and checking learning through application: https://blog.ncase.me/explorable-explanations/ and https://blog.ncase.me/explorable-explanations-4-more-design-patterns/ . These are practitioner design guidance, not proof that a particular redesign will go viral or teach better.

## Prototype acceptance
Build one short hook before expanding the article. The visitor should be able to make a prediction, replay a trace, change the input and explain the observed mechanism. Test on phone with tap/keyboard alternatives, reduced motion and a static fallback. Measure comprehension and willingness to share with real readers; use no invented conversion targets as established evidence.
