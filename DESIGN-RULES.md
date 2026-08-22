# Design rules

The rules that keep every page looking like the same site. If a change breaks
one of these, the change is wrong — not the rule.

Run `npm run check:design` to catch the mechanical ones.

---

## 1. Page heroes

**Every page below the landing uses `<PageHero>`.** No page builds its own.

The left column is exactly three things, in this order, and nothing else:

| Slot | Rule |
|---|---|
| `eyebrow` | Names the **subject**, not the brand. "Who we are", not "About Orvexiq Lab". |
| `headline` | One sentence, sans, `h1`. Never a serif display headline — that belongs to section bands. |
| `subdescription` | One supporting line. |

`iconAssetUrl` is the only optional prop, and it renders on the **right**.

**No hero carries a CTA.** `PageHero` has no actions prop, so this cannot be
added back by accident. Every page ends on `<LandingCtaSection>`, which is where
the call to action lives.

The **landing hero** (`HeroSection`) is the one exception and keeps its two
buttons. It is the site's entry point, not an inner page.

## 2. Section headings

**Every section band uses `<SectionHeading>`.** It supplies the eyebrow capsule,
the serif display headline, the dot rule and the sub-copy.

**Every section heading contains exactly one `<Accent>` run** — no more, no
fewer. `<Accent>` is the only place the violet gradient
(`--orv-gradient-accent-text`) may appear. This is the site's one typographic
signature; used everywhere it reads as a system, used sometimes it reads as an
accident.

Content follows the `headlineLine1` + `headlineAccent2` pair so the split lives
in the content file, not in the component.

`align`:

- `center` — the band is full width and the heading sits above its content.
- `left` — the heading shares a row with content, or sits inside a card.

### What is *not* a section heading

These keep plain `h2`/`h3` with no eyebrow, no serif and no accent:

- Legal clause titles (`1. Data retention`)
- Article body headings
- Card and list-item titles (post titles, case study cards, decision cards)
- Modal titles

Accenting a fragment of a numbered clause or a proper name looks arbitrary.
The rule is about **bands**, not about every heading element on the page.

## 3. Content, not components

Copy lives in `src/content/data/*.json` behind a zod schema. No headline,
eyebrow, button label or link text is written inline in a `.tsx` file.

## 4. Links must resolve

A link to `/case-studies/<slug>` must match a slug in `case-studies.json`.
When the work a section points at no longer exists, **remove the section** —
do not repoint it at something that does not illustrate the same thing.
`relatedWork` is optional on `service-detail.schema.ts` for exactly this reason.

## 5. Delete dead components

A section component that nothing renders gets deleted, not kept "for later".
Seven of them accumulated once, and new sections were built by copying them,
which is how the inconsistencies above started.
