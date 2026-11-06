import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT_VISUAL } from "../../lib/motion";

const W = 480;
const H = 320;
const PAD = { top: 26, right: 22, bottom: 34, left: 44 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const T_MIN = 20;
const T_MAX = 72;
const THRESHOLD = 55;

const yFor = (t) => PAD.top + (1 - (t - T_MIN) / (T_MAX - T_MIN)) * CH;
const xFor = (f) => PAD.left + f * CW;

// A synthetic cell temperature trace: sigmoid rise under load, ripple from
// the sampling interval, and one thermal excursion past the safety limit.
function series(points = 140) {
  const out = [];
  for (let i = 0; i < points; i += 1) {
    const f = i / (points - 1);
    const rise = 30 / (1 + Math.exp(-(f - 0.33) * 9.5));
    const ripple = Math.sin(f * 23) * 2.4 + Math.sin(f * 51 + 1.2) * 1.1;
    const excursion = 13 * Math.exp(-((f - 0.77) ** 2) / (2 * 0.042 ** 2));
    out.push({ x: xFor(f), y: yFor(26 + rise + ripple + excursion) });
  }
  return out;
}

const POINTS = series();
const LINE = POINTS.map(
  (p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`
).join(" ");
const AREA = `${LINE} L${xFor(1).toFixed(1)} ${PAD.top + CH} L${PAD.left} ${PAD.top + CH} Z`;

const GRID = [30, 40, 50, 60, 70];
const THRESHOLD_Y = yFor(THRESHOLD);

/** Live cell temperature against the safety threshold. */
export default function ThermalTrace() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Lithium-ion cell temperature trace crossing the 55 degree safety threshold"
    >
      <defs>
        <linearGradient id="thermalFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E9B949" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#E9B949" stopOpacity="0" />
        </linearGradient>
        {/* Everything above the threshold is drawn a second time in full
            accent, so the excursion reads without needing a legend. */}
        <clipPath id="aboveThreshold">
          <rect x="0" y="0" width={W} height={THRESHOLD_Y} />
        </clipPath>
      </defs>

      {GRID.map((t) => (
        <g key={t}>
          <line
            x1={PAD.left}
            y1={yFor(t)}
            x2={W - PAD.right}
            y2={yFor(t)}
            stroke="rgba(242,241,237,0.07)"
            strokeWidth="1"
          />
          <text
            x={PAD.left - 10}
            y={yFor(t) + 3.5}
            textAnchor="end"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="#87878A"
          >
            {t}
          </text>
        </g>
      ))}

      <motion.path
        d={AREA}
        fill="url(#thermalFill)"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_VISUAL}
        transition={{ duration: 0.9, ease: EASE, delay: reduced ? 0 : 0.9 }}
      />

      <motion.path
        d={LINE}
        fill="none"
        stroke="rgba(242,241,237,0.62)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEWPORT_VISUAL}
        transition={{ duration: 1.7, ease: "easeInOut" }}
      />

      <g clipPath="url(#aboveThreshold)">
        <motion.path
          d={LINE}
          fill="none"
          stroke="#E9B949"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEWPORT_VISUAL}
          transition={{ duration: 1.7, ease: "easeInOut" }}
        />
      </g>

      <motion.g
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_VISUAL}
        transition={{ duration: 0.6, ease: EASE, delay: reduced ? 0 : 0.35 }}
      >
        <line
          x1={PAD.left}
          y1={THRESHOLD_Y}
          x2={W - PAD.right}
          y2={THRESHOLD_Y}
          stroke="#E9B949"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity="0.75"
        />
        <text
          x={W - PAD.right}
          y={THRESHOLD_Y - 8}
          textAnchor="end"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill="#E9B949"
          letterSpacing="1.2"
        >
          THRESHOLD 55C
        </text>
      </motion.g>

      <text
        x={PAD.left}
        y={H - 12}
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill="#87878A"
        letterSpacing="1.2"
      >
        CELL TEMP
      </text>
      <text
        x={W - PAD.right}
        y={H - 12}
        textAnchor="end"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill="#87878A"
        letterSpacing="1.2"
      >
        MQTT 1 Hz
      </text>
    </svg>
  );
}
