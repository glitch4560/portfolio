import { motion, useReducedMotion } from "framer-motion";
import { projects } from "../data/content";
import { Reveal } from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import VISUALS from "./visuals";
import { EASE } from "../lib/motion";

function ProjectRow({ project, index }) {
  const reduced = useReducedMotion();
  const visual = VISUALS[project.visual];
  const Visual = visual?.Component;
  // Alternate which side the visual sits on, so the eye zig-zags down the
  // page instead of tracking a single column.
  const flipped = index % 2 === 1;

  return (
    <article className="border-t border-line py-14 first:border-t-0 first:pt-0 sm:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal
          as="div"
          className={`lg:col-span-5 ${flipped ? "lg:order-2 lg:col-start-8" : ""}`}
        >
          <div className="flex items-baseline gap-4">
            <span className="label-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="label">{project.focus}</span>
            <span className="label ml-auto">{project.year}</span>
          </div>

          <h3 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1]">
            {project.title}
          </h3>
          <p className="mt-3 text-base font-light italic text-muted">{project.subtitle}</p>

          <ul className="mt-7 space-y-4">
            {project.highlights.map((h) => (
              <li key={h} className="text-[15px] font-light leading-[1.6] text-fg/75">
                {h}
              </li>
            ))}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          as="div"
          delay={0.1}
          className={`lg:col-span-6 ${flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}
        >
          <motion.div
            whileHover={reduced ? {} : { y: -4 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="panel"
          >
            <div className="aspect-[3/2] w-full">{Visual && <Visual />}</div>
            {visual?.caption && (
              <div className="border-t border-line px-4 py-2.5">
                <span className="label">{visual.caption}</span>
              </div>
            )}
          </motion.div>
        </Reveal>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="shell scroll-mt-24 py-24 sm:py-32 md:py-40">
      <SectionHeader
        index="01"
        label="Selected work"
        title="Things I built"
        aside={`${projects.length} projects`}
      />

      <div>
        {projects.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
