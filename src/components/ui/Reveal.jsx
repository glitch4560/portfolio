import { motion, useReducedMotion } from "framer-motion";
import { EASE, DUR, VIEWPORT } from "../../lib/motion";

/**
 * Scroll-triggered block reveal, fires once.
 * Renders a plain element when the user prefers reduced motion, so nothing
 * ever depends on an animation having run.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  as = "div",
  className = "",
  ...rest
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.base, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Staggering container. Children should be <RevealItem>. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  ...rest
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = "", y = 18, ...rest }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Hairline that draws itself from the left as it scrolls into view. */
export function Rule({ className = "" }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={`h-px w-full bg-line ${className}`} />;
  }

  return (
    <motion.div
      className={`h-px w-full origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.slow, ease: EASE }}
    />
  );
}

/**
 * Lines that slide up from behind a mask. Used for the hero name and the
 * large section titles. Each line is a separate string.
 *
 * `trigger` is "mount" for above-the-fold type, "scroll" for everything else.
 */
export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.09,
  trigger = "mount",
  renderLine,
}) {
  const reduced = useReducedMotion();
  const draw = (line, i) => (renderLine ? renderLine(line, i) : line);

  if (reduced) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={line} className={`block ${lineClassName}`}>
            {draw(line, i)}
          </span>
        ))}
      </span>
    );
  }

  const activate =
    trigger === "scroll"
      ? { whileInView: "show", viewport: VIEWPORT }
      : { animate: "show" };

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...activate}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {lines.map((line, i) => (
        // The clip has to sit on its own element; padding on the inner span
        // keeps descenders from being sheared off by the mask.
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{
              hidden: { y: "108%" },
              show: { y: "0%", transition: { duration: DUR.slow, ease: EASE } },
            }}
          >
            {draw(line, i)}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
