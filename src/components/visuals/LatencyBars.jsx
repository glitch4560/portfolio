import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT_VISUAL } from "../../lib/motion";

const W = 480;
const H = 320;
const LABEL_W = 96;
const TRACK_X = LABEL_W + 18;
const TRACK_W = W - TRACK_X - 48;
const MAX_MS = 2400;
const TOP = 48;
const ROW_H = 46;

const ms = (v) => (v / MAX_MS) * TRACK_W;

const ROWS = [
  { route: "/quote", before: 2300, after: 400 },
  { route: "/history", before: 1850, after: 320 },
  { route: "/screener", before: 1420, after: 265 },
  { route: "/watchlist", before: 980, after: 190 },
  { route: "/index", before: 760, after: 155 },
];

const TICKS = [0, 800, 1600, 2400];

/** Per-route page load before and after the query rewrite. */
export default function LatencyBars() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Page load time per route, before and after the database query rewrite"
    >
      <g fontFamily="JetBrains Mono, monospace" letterSpacing="1.2">
        <rect x={TRACK_X} y={14} width="16" height="6" rx="1" fill="rgba(242,241,237,0.13)" />
        <text x={TRACK_X + 22} y={20} fontSize="9" fill="#87878A">
          BEFORE
        </text>
        <rect x={TRACK_X + 88} y={14} width="16" height="6" rx="1" fill="#E9B949" />
        <text x={TRACK_X + 110} y={20} fontSize="9" fill="#E9B949">
          AFTER
        </text>
      </g>

      {TICKS.map((t) => (
        <g key={t}>
          <line
            x1={TRACK_X + ms(t)}
            y1={TOP - 14}
            x2={TRACK_X + ms(t)}
            y2={TOP + ROWS.length * ROW_H - 16}
            stroke="rgba(242,241,237,0.07)"
            strokeWidth="1"
          />
          <text
            x={TRACK_X + ms(t)}
            y={H - 16}
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="#87878A"
          >
            {t === 0 ? "0" : `${(t / 1000).toFixed(1)}s`}
          </text>
        </g>
      ))}

      {ROWS.map((row, i) => {
        const y = TOP + i * ROW_H;
        const delay = reduced ? 0 : 0.12 + i * 0.09;

        return (
          <g key={row.route}>
            <text
              x={LABEL_W}
              y={y + 13}
              textAnchor="end"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              fill="#87878A"
            >
              {row.route}
            </text>

            {/* Before: dim, on top, drawn first. */}
            <motion.rect
              x={TRACK_X}
              y={y}
              height="7"
              rx="1"
              fill="rgba(242,241,237,0.13)"
              initial={reduced ? false : { width: 0 }}
              whileInView={{ width: ms(row.before) }}
              viewport={VIEWPORT_VISUAL}
              transition={{ duration: 0.8, ease: EASE, delay }}
            />

            {/* After: accent, offset below so both stay legible. */}
            <motion.rect
              x={TRACK_X}
              y={y + 11}
              height="7"
              rx="1"
              fill="#E9B949"
              initial={reduced ? false : { width: 0 }}
              whileInView={{ width: ms(row.after) }}
              viewport={VIEWPORT_VISUAL}
              transition={{ duration: 0.8, ease: EASE, delay: delay + 0.28 }}
            />

            <motion.text
              x={TRACK_X + ms(row.before) + 8}
              y={y + 6.5}
              fontFamily="JetBrains Mono, monospace"
              fontSize="9"
              fill="#87878A"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT_VISUAL}
              transition={{ duration: 0.4, ease: EASE, delay: delay + 0.6 }}
            >
              {(row.before / 1000).toFixed(2)}s
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}
