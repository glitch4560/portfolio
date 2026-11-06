import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { nav, profile } from "../data/content";
import { EASE } from "../lib/motion";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 40,
    restDelta: 0.001,
  });

  // The bar only gains a background once it is over content.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section currently owns the middle of the viewport.
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.href.slice(1)))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock the page and wire Escape while the mobile drawer is open.
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "border-b border-line bg-ground/80 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="shell flex items-center justify-between py-4">
          <a href="#top" className="group flex items-baseline gap-3" aria-label="Back to top">
            <span className="font-display text-xl leading-none transition-colors duration-300 group-hover:text-accent">
              CK
            </span>
            <span className="label hidden transition-colors duration-300 group-hover:text-fg sm:inline">
              {profile.name}
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`label transition-colors duration-300 hover:text-fg ${
                    isActive ? "!text-accent" : ""
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-px w-6 bg-fg" />
              <span className="block h-px w-6 bg-fg" />
            </span>
          </button>
        </div>

        {/* Reading progress, thin enough to read as part of the rule. */}
        <motion.div
          style={{ scaleX: reduced ? 1 : progress }}
          className={`h-px w-full origin-left bg-accent ${scrolled ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ground md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="shell flex items-center justify-between py-4">
              <span className="label">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="-mr-2 flex h-11 w-11 items-center justify-center text-2xl leading-none text-fg"
              >
                &times;
              </button>
            </div>

            <nav className="shell mt-8 flex flex-col" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE }}
                  className="border-b border-line py-5 font-display text-4xl leading-none transition-colors duration-300 active:text-accent xs:text-5xl"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.5, ease: EASE }}
              className="shell mt-10"
            >
              <p className="label">Email</p>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => setOpen(false)}
                className="mt-2 block break-all font-mono text-sm text-accent"
              >
                {profile.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
