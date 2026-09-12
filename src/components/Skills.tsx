import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { sections, skills } from "@/content";

const meta = sections[3];

/**
 * Five skill groups, one `Card` each. The groups and their order are the CV's
 * own — they are not re-bucketed into invented headings.
 *
 * Bullets, not tags. Tags are the card-owned label pattern: a stack line on a
 * project, a competency row in About. Skills is forty-odd items, and rendering
 * each one as a tag is exactly the "pills everywhere" failure that got v1
 * rejected.
 *
 * Also deliberately absent:
 *   - proficiency bars, percentages, star ratings — nobody believes "React 92%"
 *   - technology logos — a licence question per mark, and it turns the section
 *     into a sticker sheet
 *   - a glyph per group
 *
 * `(fundamentals)` stays on AWS and Azure. Overstating that depth is the first
 * thing a technical interviewer will probe.
 */
export function Skills() {
  return (
    <Section id={meta.id} title={meta.title}>
      {/* Columns, not a grid.

          A grid rows these five cards, and every row is as tall as its
          tallest member. "Languages & Frameworks" carries ten bullets against
          the others' four to six, so row two started a long way below the
          bottom of the two short cards beside it: a visible hole through the
          middle of the section. `items-start` stopped those short cards
          stretching to fill their row, but did nothing about the gap left
          underneath them.

          CSS columns pack the cards instead. Every card is exactly as tall as
          its own content, the first card in each column starts at the same
          top edge, and the browser balances the column heights so the bottoms
          come out close to level. `break-inside-avoid` is what stops a card
          being split across a column boundary, and the vertical rhythm is a
          margin rather than a gap because `gap` on a multi-column box sets the
          column gap only. */}
      <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {skills.map((group, i) => (
          <Card
            key={group.slug}
            className="reveal mb-6 break-inside-avoid p-6"
            data-reveal
            style={{ transitionDelay: `${Math.min(i * 60, 240)}ms` }}
          >
            <h3 className="display text-[1.0625rem] text-accent">
              {group.title}
            </h3>
            <ul className="bullets mt-4 space-y-2 text-[0.9375rem] text-fg-dim">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
