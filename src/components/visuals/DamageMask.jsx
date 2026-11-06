import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT_VISUAL } from "../../lib/motion";

const W = 480;
const H = 320;
const CELL = 20;
const COLS = W / CELL;
const ROWS = H / CELL;

// Deterministic hash-noise, so the mask is identical on every render and
// between server and client. Nothing here should depend on Math.random.
function noise(i) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Three damage epicentres, in cell coordinates. Severity falls off as a
// gaussian from each, which is roughly how the real masks cluster.
const BLOBS = [
  { cx: 6.5, cy: 5.5, r: 3.1 },
  { cx: 15.5, cy: 10.5, r: 3.8 },
  { cx: 19.5, cy: 4.0, r: 2.2 },
];

function buildMask() {
  const cells = [];

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      let severity = 0;
      for (const b of BLOBS) {
        const dx = col - b.cx;
        const dy = row - b.cy;
        const d2 = dx * dx + dy * dy;
        severity = Math.max(severity, Math.exp(-d2 / (2 * b.r * b.r)));
      }

      // Roughen the edges so the mask does not read as three clean circles.
      severity *= 0.62 + noise(row * COLS + col) * 0.55;

      if (severity > 0.2) {
        cells.push({ col, row, severity: Math.min(severity, 1) });
      }
    }
  }

  return cells;
}

const MASK = buildMask();

/**
 * Pixel-level building damage mask resolving over a satellite raster.
 * A scan line sweeps left to right and the mask fills in behind it.
 */
export default function DamageMask() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Damage segmentation mask resolving over a grid of satellite imagery tiles"
    >
      <defs>
        {/* The base raster is one rect filled with a pattern, rather than
            several hundred individual nodes. */}
        <pattern id="raster" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
          <rect width={CELL} height={CELL} fill="none" />
          <path
            d={`M ${CELL} 0 L 0 0 0 ${CELL}`}
            fill="none"
            stroke="rgba(242,241,237,0.07)"
            strokeWidth="1"
          />
        </pattern>
        <linearGradient id="scan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E9B949" stopOpacity="0" />
          <stop offset="100%" stopColor="#E9B949" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill="url(#raster)" />

      {MASK.map(({ col, row, severity }) => {
        // Cells light up as the scan line passes them, with a little jitter
        // so the leading edge is ragged rather than a straight column.
        const delay = (col / COLS) * 1.25 + noise(col * 31 + row) * 0.12;

        return (
          <motion.rect
            key={`${col}-${row}`}
            x={col * CELL + 1}
            y={row * CELL + 1}
            width={CELL - 2}
            height={CELL - 2}
            fill="#E9B949"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 0.12 + severity * 0.62 }}
            viewport={VIEWPORT_VISUAL}
            transition={{ duration: 0.5, ease: EASE, delay: reduced ? 0 : delay }}
          />
        );
      })}

      {!reduced && (
        <motion.rect
          y="0"
          width="60"
          height={H}
          fill="url(#scan)"
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: [-60, W], opacity: [0, 1, 1, 0] }}
          viewport={VIEWPORT_VISUAL}
          transition={{ duration: 1.5, ease: "linear", times: [0, 0.1, 0.85, 1] }}
        />
      )}
    </svg>
  );
}
