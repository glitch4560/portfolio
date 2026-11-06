import { useId } from "react";

// A jointed drawing lets the greeting and the plotter share the same tool tip.
export default function BuilderRobot({ className = "", tipRef }) {
  const id = useId().replace(/:/g, "");
  const paint = (name) => `url(#${id}-${name})`;
  const wheel = (x, y, radius) => (
    <g key={x} transform={`translate(${x} ${y}) skewY(-8)`}>
      <circle r={radius} fill="#151619" stroke="#66645c" strokeWidth="2" />
      <circle r={radius - 4} fill={paint("alloy")} stroke="#101114" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <path key={angle} transform={`rotate(${angle})`} d={`M0 -6v-${radius - 14}`}
          stroke="#17181a" strokeWidth="4" strokeLinecap="round" />
      ))}
      <circle r="5" fill="#a39f90" stroke="#343438" strokeWidth="2" />
    </g>
  );

  return (
    <svg className={`builder-robot ${className}`} viewBox="62 40 366 316" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-shell`} x2=".75" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#fff9e8" /><stop offset=".35" stopColor="#dbd6c8" />
          <stop offset=".78" stopColor="#b5b1a6" /><stop offset="1" stopColor="#918e85" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x2=".8" y2="1">
          <stop stopColor="#c5c0b2" /><stop offset=".48" stopColor="#969387" /><stop offset="1" stopColor="#63635c" />
        </linearGradient>
        <linearGradient id={`${id}-alloy`} x2=".6" y2="1">
          <stop stopColor="#a9a698" /><stop offset=".16" stopColor="#6f6f66" />
          <stop offset=".48" stopColor="#383b3c" /><stop offset="1" stopColor="#242527" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x2=".5" y2="1">
          <stop stopColor="#44494b" /><stop offset=".27" stopColor="#282c31" />
          <stop offset=".74" stopColor="#131518" /><stop offset="1" stopColor="#27292a" />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x2=".85" y2="1">
          <stop stopColor="#ffe29b" /><stop offset=".4" stopColor="#e7b753" /><stop offset="1" stopColor="#9b702e" />
        </linearGradient>
        <pattern id={`${id}-screen`} width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".55" fill="#c9d1d4" opacity=".19" />
        </pattern>
      </defs>

      {/* Far track, belly and the near track. The dashed rim is the moving tread. */}
      <path d="m164 259 114-18q19-2 24 12l6 19q5 19-15 24l-116 21q-22 2-26-14l-4-20q-3-18 17-24Z" fill="#222427" stroke="#65645d" strokeWidth="2" />
      <path d="m169 283 128-22 51 28-126 34-57-19Z" fill="#26272a" />
      <path d="m214 277 109-21q26-4 35 17l3 13q5 22-18 29l-111 23q-24 4-32-15l-4-15q-6-23 18-31Z" fill="#101113" stroke="#393a39" strokeWidth="8" />
      <path className="robot-tread" d="m214 277 109-21q26-4 35 17l3 13q5 22-18 29l-111 23q-24 4-32-15l-4-15q-6-23 18-31Z"
        fill="none" stroke="#6b6a61" strokeWidth="6" strokeDasharray="2 7" />
      <path d="m221 283 103-20q21-3 27 16t-13 26l-105 23q-22 4-27-15t15-30Z" fill={paint("alloy")} stroke="#87857c" />
      {wheel(228, 304, 19)}{wheel(266, 299, 13)}{wheel(295, 293, 13)}{wheel(330, 283, 18)}
      <path d="m168 245 112-21 67 24 10 17-132 28-66-27Z" fill={paint("edge")} stroke="#494a46" strokeWidth="1.5" />
      <path d="m169 243 112-18 65 23-124 26-63-16Z" fill="#d7d2c4" />
      <path d="m222 274 124-26 8 11-130 27Z" fill={paint("gold")} />
      <path d="m169 257 51 15 3 14-55-17Z" fill="#333537" />
      <path d="m181 263 23 7m-20-3 20 6" stroke="#89877b" strokeWidth="1.3" />

      {/* Ceramic body panels around an exposed neck bearing. */}
      <path d="m211 188 81-11 39 20-3 46-32 14-83 3-26-18 2-36Z" fill={paint("edge")} stroke="#585951" strokeWidth="2" />
      <path d="m201 194 75 4 14 13-3 35-11 12-61 1-21-14-3-40Z" fill={paint("shell")} stroke="#8d8a7e" strokeWidth="1.4" />
      <path d="m282 202 40-9 9 7-2 39-41 13 4-40Z" fill={paint("edge")} />
      <path d="m298 213 23-6m-24 11 23-6m-24 11 23-6m-24 11 22-6" fill="none" stroke="#434644" strokeWidth="2.5" strokeLinecap="round" />
      <path d="m202 198 73 3 9 9" fill="none" stroke="#f8f3e3" strokeWidth="2"/>
      <g transform="rotate(3 236 226)" fill="#373a38">
        <text x="210" y="229" fontFamily="ui-monospace, monospace" fontSize="16" fontWeight="bold" letterSpacing="1">CK–01</text>
        <path d="M211 236h28" stroke="#88877c" /><path d="M211 239h16" stroke="#aaa89c" />
        <circle cx="270" cy="238" r="2.5" fill="#d8a644" stroke="#70694e" />
      </g>
      <path d="m213 184 2 10q29 13 61 1l2-13Z" fill="#373a38" stroke="#79796e" strokeWidth="2" />
      <path d="M220 187q24 8 50 1" fill="none" stroke="#bbbaab" strokeWidth="2" />

      {/* Rear service arm. */}
      <g>
        <circle cx="329" cy="206" r="12" fill={paint("alloy")} stroke="#4a4c47" strokeWidth="2"/>
        <path d="m334 202 15 1 13 22-6 9-12-2-13-21Z" fill={paint("shell")} stroke="#686a63" strokeWidth="1.4"/>
        <circle cx="355" cy="232" r="8" fill={paint("alloy")} stroke="#a8a597"/>
        <path d="m352 237-5 11 3 6 5-5 5 3 3-7-3-9Z" fill="#62665f" stroke="#333636" strokeWidth="2"/>
      </g>

      <g className="robot-head">
        <path d="m297 105 4-37" stroke="#333739" strokeWidth="5" /><path d="m297 100 3-26" stroke="#adada0" strokeWidth="2" />
        <rect x="295" y="60" width="11" height="12" rx="4" fill={paint("gold")} stroke="#655b3f" strokeWidth="2"/>
        <path d="M170 107q0-9 12-13l39-12q8-3 18-2l80 8q15 2 18 15l5 47q1 13-10 20l-32 17q-8 4-21 2l-96-9q-14-2-16-17Z"
          fill={paint("edge")} stroke="#4e504d" strokeWidth="2" />
        <path d="m181 97 40-13q8-3 18-2l79 8q9 1 13 6l-37 17Z" fill="#ede8da" stroke="#aaa799" strokeWidth="1.2" />
        <path d="m224 88 46 4-9 3-47-4Z" fill="#b6b4a9"/>
        <path d="m307 116 23-11 4 43-26 13Z" fill="#888b81" stroke="#74776e" />
        <path d="m313 124 14-7m-14 13 15-7m-15 13 15-7" stroke="#444945" strokeWidth="2.6" strokeLinecap="round"/>
        <path d="m181 97 103 10q18 2 19 18l1 42q1 20-17 21l-105-10q-15-1-16-17l-1-44q-1-20 16-20Z" fill={paint("shell")} stroke="#969388" strokeWidth="1.6" />
        <path d="m183 101 98 10q12 1 16 10" fill="none" stroke="#fcf8e9" strokeWidth="2.2" strokeLinecap="round"/>
        <g transform="matrix(1 .096 .015 1 175 106)">
          <rect width="117" height="60" rx="18" fill="#66685e" />
          <rect x="2" y="2" width="113" height="56" rx="16" fill={paint("glass")} stroke="#1a1c1e" strokeWidth="2" />
          <rect x="3" y="3" width="111" height="54" rx="15" fill={paint("screen")} />
          <path d="M10 15q2-8 13-8h41" fill="none" stroke="#b8c2bd" opacity=".28" strokeLinecap="round" />
          <g className="robot-eyes" fill="#ffd678">
            <rect x="27" y="20" width="10" height="21" rx="4.5" /><rect x="74" y="20" width="10" height="21" rx="4.5" />
            <path d="M29 24v11m47-11v11" stroke="#fff2bd" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </g>
        <path d="m218 173 25 2.4" stroke="#777a71" strokeWidth="2" strokeLinecap="round" />
        <circle cx="180" cy="169" r="2" fill="#7c7c73"/><circle cx="288" cy="179" r="2" fill="#797c73"/>
      </g>

      {/* A two-link arm with a brass plotter nib at its wrist. */}
      <g className="robot-shoulder">
        <path d="m191 207-30 12-17-3-2 9 15 12 39-14Z" fill={paint("alloy")} stroke="#4b4e4b" strokeWidth="2" />
        <path d="m189 201 8 6-7 13-32 10-8-6 3-9Z" fill={paint("shell")} stroke="#797b71" strokeWidth="1.5" />
        <circle cx="190" cy="210" r="9" fill={paint("alloy")} stroke="#c0beaf" strokeWidth="2" />
        <circle cx="190" cy="210" r="3.4" fill="#292b2b" />
        <g className="robot-forearm">
          <path d="m151 222-24-14-10-18 4-6 11 2 8 14 19 9Z" fill={paint("shell")} stroke="#787a71" strokeWidth="1.6" />
          <path d="m146 217-14-12-10-16" fill="none" stroke="#676c64" strokeWidth="3" />
          <circle cx="153" cy="220" r="9" fill={paint("alloy")} stroke="#bdbbae" strokeWidth="2" />
          <circle cx="153" cy="220" r="3" fill="#e3b655"/>
          <g transform="translate(121 188)">
            <g className="robot-pen">
              <rect x="-9" y="-21" width="18" height="27" rx="5" fill={paint("alloy")} stroke="#373a37" strokeWidth="2" />
              <rect x="-9" y="-21" width="18" height="6" rx="2" fill={paint("gold")} />
              <path d="M-6-21l3-8h6l3 8Z" fill="#ccc8b9" stroke="#65675d"/>
              <circle ref={tipRef} className="robot-tip" cx="0" cy="-29" r="2.6" fill="#ffe29b" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
