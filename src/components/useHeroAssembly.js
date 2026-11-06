import { useCallback, useLayoutEffect, useState } from "react";

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const beats = [
  { part: "profile", start: 3100, duration: 560, label: "Aligning the frame" },
  { part: "given-name", start: 3800, duration: 920, label: "Setting the name" },
  { part: "surname", start: 4800, duration: 860, label: "Setting the name" },
  { part: "statement", start: 5840, duration: 950, label: "Writing the introduction" },
  { part: "links", start: 6950, duration: 740, label: "Connecting the links" },
  { part: "footer", start: 7840, duration: 760, label: "Finishing the layout" },
];
const endTime = 9000;

export default function useHeroAssembly(scene, tip, beam) {
  const [reduced, setReduced] = useState(() => window.matchMedia(MOTION_QUERY).matches);
  const [running, setRunning] = useState(() =>
    !window.matchMedia(MOTION_QUERY).matches && !window.location.hash && window.scrollY < 16
  );
  const [status, setStatus] = useState("");
  const finish = useCallback(() => setRunning(false), []);

  useLayoutEffect(() => {
    const query = window.matchMedia(MOTION_QUERY);
    const change = () => {
      setReduced(query.matches);
      if (query.matches) finish();
    };
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, [finish]);

  useLayoutEffect(() => {
    if (!running) return undefined;
    const stage = scene.current;
    const plotter = beam.current;
    const targets = beats.map(({ part }) => stage.querySelector(`[data-build="${part}"]`));
    const ray = plotter.querySelector("path");
    const spark = plotter.querySelector("g");
    let frame;
    let next = 0;
    let started;

    // One clock drives both the clipping edge and the tool. Re-measure the
    // current piece so a font load, resize or wrapped link row stays aligned.
    const draw = (now) => {
      if (started === undefined) started = now;
      const time = now - started;
      if (time >= endTime) {
        finish();
        return;
      }
      let pose = time < 650 ? "arriving" : "greeting";
      const beat = beats[next];
      const isDrawing = beat && time >= beat.start;
      if (time >= beats[0].start - 280) pose = "working";
      if (stage.dataset.pose !== pose) {
        stage.dataset.pose = pose;
        if (pose === "greeting") setStatus("Saying hello");
      }
      if (isDrawing) {
        const target = targets[next];
        if (!target.hasAttribute("data-placed")) {
          target.setAttribute("data-placed", "");
          setStatus(beat.label);
        }
        const progress = Math.min((time - beat.start) / beat.duration, 1);
        const sweep = progress * progress * (3 - 2 * progress);
        const origin = stage.getBoundingClientRect();
        const point = tip.current.getBoundingClientRect();
        const box = target.getBoundingClientRect();
        const x = box.left - origin.left + box.width * sweep;
        const y = box.top - origin.top + box.height * (0.5 + 0.28 * Math.sin(progress * Math.PI * 6));
        const fromX = point.left - origin.left + point.width / 2;
        const fromY = point.top - origin.top + point.height / 2;
        const angle = Math.atan2(y - fromY, x - fromX) * 180 / Math.PI;
        // The forearm has a limited travel. The wrist supplies the rest
        // when the narrow layout puts the lettering below the robot.
        const aim = ((angle + 360) % 360) - 222;
        const armAngle = Math.max(-78, Math.min(36, aim));
        stage.style.setProperty("--tool-aim", `${armAngle}deg`);
        stage.style.setProperty("--pen-angle", `${aim - armAngle - 48}deg`);
        target.style.setProperty("--cut", `${(1 - sweep) * 100}%`);
        ray.setAttribute("d", `M${fromX} ${fromY} L${x} ${y}`);
        spark.setAttribute("transform", `translate(${x} ${y})`);
        if (progress === 1) next += 1;
      }
      plotter.style.opacity = isDrawing ? "1" : "0";
      frame = requestAnimationFrame(draw);
    };
    setStatus("Arriving");
    frame = requestAnimationFrame(draw);
    const keydown = (event) => { if (event.key === "Escape") finish(); };
    const scroll = () => { if (window.scrollY > 32) finish(); };
    const focus = (event) => { if (event.target.closest("[data-build]")) finish(); };
    window.addEventListener("keydown", keydown);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("hashchange", finish);
    stage.addEventListener("focusin", focus);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("hashchange", finish);
      stage.removeEventListener("focusin", focus);
      targets.forEach((target) => {
        target.style.removeProperty("--cut");
        target.removeAttribute("data-placed");
      });
      stage.style.removeProperty("--tool-aim");
      stage.style.removeProperty("--pen-angle");
      delete stage.dataset.pose;
      plotter.style.opacity = "0";
    };
  }, [running, scene, tip, beam, finish]);

  return { running, reduced, status, finish, replay: () => { if (!reduced) setRunning(true); } };
}
