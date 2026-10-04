---
target: GaMa homepage (sites/gama/index.html)
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 3
timestamp: 2026-10-04T16-06-11Z
slug: sites-gama-index-html
---
Method: dual-agent (A: a1e964325e00c51f0 · B: a907af8f15001a72b)

# Critique: GaMa homepage (sites/gama/index.html)

## Design Health Score: 20/32 (62.5%, Acceptable; heuristics 7 and 10 n/a for a Persuade page)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 3 | Sticky nav and anchors good; mailto form gives no clear state |
| 2 | Match system / real world | 2 | Radio metaphor ("98.6 FM", "SAYS", "signal report") is the agency's idea, not the audience's vocabulary |
| 3 | User control | 3 | Skip link, FAQ, drawer; no back-to-top |
| 4 | Consistency | 3 | Very consistent; cost is monotony |
| 5 | Error prevention | 2 | novalidate form, no inline validation |
| 6 | Recognition over recall | 3 | Clear nav; 01-04 numbers collide with frequencies |
| 7 | Flexibility | n/a | Persuade surface |
| 8 | Aesthetic and minimalist | 2 | Strong type voice, monotone dark field, heavy text blocks |
| 9 | Error recovery | 2 | No visible error handling in form |
| 10 | Help and docs | n/a | FAQ covers it |

## Design specificity verdict
Concept is authored (dial / "tuned in" ties to being found and GEO), but execution is the stock "dark technical agency" look: near-black ground, orange mono labels, hairline rows, no imagery, no human. Detector: 1 warning (flat-type-hierarchy, line 203; mild false positive; the real small-text issue is sub-12px labels).

## Is the dark ground wrong?
Partly; it is the symptom. Color is spent as hairlines and tiny labels with no large saturated field, nine sections look identical, nothing shows an app or a person, and older skeptical professionals read dark plus mono as "dev shop".

## Priority issues
- [P0] No visual proof or imagery (0 images; no screenshot, device frame, or portrait). Fix: authored/real device frames for dashboard and Android app, portrait of Gavin, replace the bar graphic. Command: shape then delight.
- [P0] Flat dark system reads sober, not striking. Fix: warm light ground, one saturated hero field, one dark section, orange as CTA. Command: colorize then bolder.
- [P1] Hero overloaded; primary CTA below the fold on mobile (H1 about 25 words, dial, 3 stats). Fix: shorter H1, shrink or drop dial on mobile, one proof line. Command: layout then distill.
- [P1] Radio metaphor adds decode work and the section labels act as eyebrows. Fix: keep "tuned in" and the dial as a logo; plain section labels; remove "98.6 FM". Command: quieter then typeset.
- [P1] Accessibility gaps (measured): 26 touch targets under 44px at 1280 and 16 at 375 (nav links 36px, FAQ summaries 28px, footer links 18px); no global a:focus-visible or summary:focus-visible; form inputs use outline:none with a border-color change only. Command: audit then polish.
- [P2] Small text: 10.4px (x9), 11.5px (x4), 11.2px (x2) labels; decode table built from inline styles.

## Where the reviewers disagreed
A listed 44px targets and focus outlines as strengths; B's measurements show buttons pass but nav, FAQ and footer targets and several focus states fail. B's numbers stand. A's heuristic total was recomputed from its own rows: 20/32, not 18/32.

## Persona red flags
- Jordan: "tuned in", "98.6 FM", "GEO" unexplained in the hero.
- Riley: novalidate form, no error state, mailto placeholder action.
- Casey: first mobile screen is dial, label, H1; CTA below fold.
- Skeptical 55-year-old accountant on a mid-range Android: dark, orange mono type, no face, no named firm, repeated "AI"; reads as hobbyist/startup; three Google font families.

## Minor observations
- Copy still leads with Android apps; new order is websites, online marketing, apps, AI software.
- Voice mixes "we" and "I".
- Hero orange blob (14% opacity) reads muddy on black.
- Blog teasers have no dates.
- Claims to verify: "R0 extra software subscriptions", "Days".
- No OG image.

## Questions to consider
- If every radio reference were removed, would a visitor lose anything they need?
- Would an accountant trust a firm with no face, no screenshot and one anonymous quote?
- If the differentiator is working software in days, why does the page never show a finished screen?
