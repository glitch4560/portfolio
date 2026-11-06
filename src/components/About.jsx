import { education, interests, profile, stats } from "../data/content";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-line bg-surface/40 py-24 sm:py-32 md:py-40"
    >
      <div className="shell">
        <SectionHeader index="02" label="About" title="Who is behind this" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="max-w-prose text-lg font-light leading-[1.65] text-fg/85 sm:text-xl">
              {profile.intro}
            </p>

            {/* The numbers used to sit in the hero. They read better here,
                next to the paragraph that earns them. */}
            <RevealGroup
              className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-4"
              stagger={0.09}
            >
              {stats.map((s) => (
                <RevealItem key={s.label}>
                  <p className="font-display text-4xl leading-none sm:text-5xl">{s.value}</p>
                  <p className="label mt-3">{s.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <p className="label-accent">Education</p>
              <ul className="mt-6">
                {education.map((e) => (
                  <li key={e.title} className="border-t border-line py-5 first:border-t-0 first:pt-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-xl leading-tight">{e.title}</h3>
                      <span className="label shrink-0">{e.period}</span>
                    </div>
                    <p className="mt-1.5 text-sm font-light text-muted">{e.org}</p>
                    {e.details && (
                      <p className="mt-2 text-[13px] font-light leading-relaxed text-muted/80">
                        {e.details}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16} className="mt-12">
              <p className="label-accent">Outside the terminal</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {interests.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
