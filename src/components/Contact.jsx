import { profile } from "../data/content";
import { Reveal } from "./ui/Reveal";
import AssemblyHeading from "./ui/AssemblyHeading";

const YEAR = new Date().getFullYear();

const SOCIALS = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Phone", href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
];

export default function Contact() {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-line pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="shell">
        <Reveal>
          <span className="label-accent">05 &nbsp;/&nbsp; Contact</span>
        </Reveal>

        <AssemblyHeading>
          <h2 className="mt-6 font-display text-[clamp(2.8rem,10vw,8rem)] leading-[0.96] tracking-[-0.02em]">
            Let's build<br /><i>something</i>
          </h2>
        </AssemblyHeading>

        <Reveal delay={0.12} className="mt-12 max-w-prose">
          <p className="text-lg font-light leading-[1.6] text-fg/80">
            I am {profile.available.toLowerCase()} and always happy to talk about deep
            learning, cloud security, or a problem you cannot get a model to behave on.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <a
            href={`mailto:${profile.email}`}
            className="link-underline inline-block break-all font-display text-[clamp(1.5rem,4.5vw,3rem)] leading-tight text-accent"
          >
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={0.28} className="mt-14 border-t border-line pt-8">
          <ul className="flex flex-wrap gap-x-10 gap-y-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="link-underline label !text-fg"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-20 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-line pt-6">
          <span className="label">
            &copy; {YEAR} {profile.name}
          </span>
          <span className="label">{profile.location}</span>
          <a href="#top" className="link-underline label transition-colors hover:!text-fg">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
