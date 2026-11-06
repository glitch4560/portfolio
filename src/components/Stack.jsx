import { skills } from "../data/content";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";

const entries = Object.entries(skills);
const total = entries.reduce((n, [, items]) => n + items.length, 0);

export default function Stack() {
  return (
    <section id="stack" className="shell scroll-mt-24 py-24 sm:py-32 md:py-40">
      <SectionHeader
        index="03"
        label="Stack"
        title="What I reach for"
        aside={`${total} tools`}
      />

      {/* A quiet matrix: category on the left, tools on the right, one
          hairline between each row. */}
      <RevealGroup stagger={0.07}>
        {entries.map(([category, items]) => (
          <RevealItem
            key={category}
            className="grid grid-cols-1 gap-4 border-t border-line py-7 first:border-t-0 first:pt-0 sm:grid-cols-12 sm:gap-8"
          >
            <p className="label-accent sm:col-span-3 sm:pt-1">{category}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 sm:col-span-9">
              {items.map((item) => (
                <li
                  key={item}
                  className="text-base font-light text-fg/80 transition-colors duration-300 hover:text-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
