import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT_VISUAL } from "../../lib/motion";

const W = 480;
const H = 320;

// Hand-placed so the graph reads as infrastructure rather than a hairball:
// an account root, a few service clusters, and three flagged resources.
const NODES = [
  { id: "root", x: 240, y: 44, r: 7, kind: "root" },
  { id: "iam", x: 118, y: 108, r: 5.5 },
  { id: "vpc", x: 240, y: 122, r: 5.5 },
  { id: "s3", x: 366, y: 106, r: 5.5 },
  { id: "role-a", x: 58, y: 178, r: 4 },
  { id: "role-b", x: 132, y: 196, r: 4, flagged: true },
  { id: "role-c", x: 196, y: 168, r: 4 },
  { id: "sg-a", x: 262, y: 196, r: 4, flagged: true },
  { id: "sg-b", x: 318, y: 168, r: 4 },
  { id: "bucket-a", x: 396, y: 178, r: 4 },
  { id: "bucket-b", x: 438, y: 214, r: 4, flagged: true },
  { id: "leaf-a", x: 92, y: 262, r: 3 },
  { id: "leaf-b", x: 174, y: 274, r: 3 },
  { id: "leaf-c", x: 236, y: 260, r: 3 },
  { id: "leaf-d", x: 306, y: 268, r: 3 },
  { id: "leaf-e", x: 386, y: 258, r: 3 },
];

const BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n]));

const EDGES = [
  ["root", "iam"], ["root", "vpc"], ["root", "s3"],
  ["iam", "role-a"], ["iam", "role-b"], ["iam", "role-c"],
  ["vpc", "sg-a"], ["vpc", "sg-b"], ["vpc", "role-c"],
  ["s3", "bucket-a"], ["s3", "bucket-b"], ["s3", "sg-b"],
  ["role-a", "leaf-a"], ["role-b", "leaf-b"], ["sg-a", "leaf-c"],
  ["sg-b", "leaf-d"], ["bucket-a", "leaf-e"], ["role-b", "leaf-a"],
  ["sg-a", "role-c"], ["bucket-b", "leaf-e"],
];

/**
 * Message passing over a cloud resource graph, with the misconfigured
 * nodes surfacing in accent once the edges have drawn.
 */
export default function SecurityGraph() {
  const reduced = useReducedMotion();
  const flaggedIds = NODES.filter((n) => n.flagged).map((n) => n.id);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Cloud resource graph with three misconfigured nodes highlighted"
    >
      {/* Edges first, so nodes always sit on top of them. */}
      <g>
        {EDGES.map(([a, b], i) => {
          const from = BY_ID[a];
          const to = BY_ID[b];
          const touchesFlag = flaggedIds.includes(a) || flaggedIds.includes(b);

          return (
            <motion.line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={touchesFlag ? "rgba(233,185,73,0.42)" : "rgba(242,241,237,0.16)"}
              strokeWidth={touchesFlag ? 1.2 : 1}
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={VIEWPORT_VISUAL}
              transition={{ duration: 0.7, ease: EASE, delay: reduced ? 0 : 0.15 + i * 0.035 }}
            />
          );
        })}
      </g>

      <g>
        {NODES.map((n, i) => {
          const delay = reduced ? 0 : 0.4 + i * 0.04;

          return (
            <motion.g
              key={n.id}
              initial={reduced ? false : { opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT_VISUAL}
              transition={{ duration: 0.5, ease: EASE, delay }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              {/* Expanding ring marks the flagged resources without needing
                  a legend to explain it. */}
              {n.flagged && !reduced && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r + 3}
                  fill="none"
                  stroke="#E9B949"
                  strokeWidth="1"
                  className="animate-pulse-ring"
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={n.flagged ? "#E9B949" : n.kind === "root" ? "#F2F1ED" : "#0A0A0B"}
                stroke={n.flagged ? "#E9B949" : "rgba(242,241,237,0.45)"}
                strokeWidth="1.25"
              />
            </motion.g>
          );
        })}
      </g>
    </svg>
  );
}
