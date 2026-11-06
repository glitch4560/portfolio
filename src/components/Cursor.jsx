import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Only elements a pointer can actually act on should grow the ring.
const INTERACTIVE = "a, button, [role='button'], input, textarea, select, summary";

/**
 * A small dot that tracks the pointer exactly, plus a ring that lags behind
 * it and expands over interactive elements. Fine pointers only — touch and
 * reduced-motion users keep the native cursor.
 */
export default function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (reduced) return undefined;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setEnabled(fine.matches);
    apply();
    fine.addEventListener("change", apply);
    return () => fine.removeEventListener("change", apply);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return undefined;

    // The class drives `cursor: none`, so it is only ever applied when the
    // replacement is actually on screen.
    document.documentElement.classList.add("cursor-none-fine");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHot(Boolean(e.target.closest?.(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("cursor-none-fine");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute h-1 w-1 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute rounded-full border border-accent"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hot ? 44 : 24,
          height: hot ? 44 : 24,
          opacity: visible ? (hot ? 0.9 : 0.4) : 0,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
