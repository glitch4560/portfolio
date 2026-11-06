import { useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import BuilderRobot from "../BuilderRobot";

export default function AssemblyHeading({ children }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.18 });
  const reduced = useReducedMotion();
  const [finished, setFinished] = useState(false);
  const state = reduced || finished ? "ready" : seen ? "drawing" : "waiting";

  return (
    <div ref={ref} className="assembly-heading" data-heading={state}>
      <div className="section-type">{children}</div>
      <div className="section-track" aria-hidden="true">
        <div className="section-rule" />
        {state === "drawing" && (
          <div className="section-builder" onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) setFinished(true);
          }}>
            <BuilderRobot />
            <i />
          </div>
        )}
      </div>
    </div>
  );
}
