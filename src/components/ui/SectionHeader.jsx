import { Reveal } from "./Reveal";
import AssemblyHeading from "./AssemblyHeading";

/**
 * Shared section masthead: mono index and label on one line, serif title
 * under it, hairline closing the block.
 */
export default function SectionHeader({ index, label, title, aside }) {
  return (
    <header className="mb-12 sm:mb-16">
      <Reveal className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <div className="flex items-baseline gap-4">
          <span className="label-accent">{index}</span>
          <span className="label">{label}</span>
        </div>
        {aside && <span className="label">{aside}</span>}
      </Reveal>

      <AssemblyHeading>
        <h2 className="mt-5 font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95]">
          {title}
        </h2>
      </AssemblyHeading>
    </header>
  );
}
