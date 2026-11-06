// Shared motion language: editorial, unhurried, never bouncy.
// Everything eases out on cubic-bezier(0.16, 1, 0.3, 1) so movement
// decelerates into place rather than snapping.

export const EASE = [0.16, 1, 0.3, 1];
export const EASE_SOFT = [0.33, 1, 0.68, 1];

export const DUR = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  draw: 1.6,
};

// Reveals fire once, a little before the block reaches the viewport edge.
export const VIEWPORT = { once: true, margin: "0px 0px -14% 0px" };

// Visuals need more of themselves on screen before they start drawing.
export const VIEWPORT_VISUAL = { once: true, margin: "0px 0px -22% 0px" };

export const riseIn = (delay = 0, y = 22) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.base, ease: EASE, delay },
});
