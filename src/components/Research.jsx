import { publications } from "../data/content";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";

export default function Research() {
  return (
    <section
      id="research"
      className="scroll-mt-24 border-t border-line bg-surface/40 py-24 sm:py-32 md:py-40"
    >
      <div className="shell">
        <SectionHeader
          index="04"
          label="Research & credentials"
          title="Published and certified"
          aside={`${publications.length} entries`}
        />

        <RevealGroup stagger={0.07}>
          {publications.map((item) => (
            <RevealItem
              key={item.title}
              // The row itself is the hover target: the whole line shifts
              // right and the year turns accent.
              className="group grid cursor-default grid-cols-[1fr_auto] items-baseline gap-6 border-t border-line py-6 transition-colors duration-500 last:border-b sm:grid-cols-[auto_1fr_auto] sm:gap-10"
            >
              <span className="label order-2 hidden transition-colors duration-500 group-hover:text-fg sm:order-none sm:block">
                {item.kind}
              </span>
              <h3 className="font-display text-2xl leading-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                {item.title}
              </h3>
              <span className="label transition-colors duration-500 group-hover:!text-accent">
                {item.year}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
