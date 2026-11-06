import DamageMask from "./DamageMask";
import SecurityGraph from "./SecurityGraph";
import ThermalTrace from "./ThermalTrace";
import LatencyBars from "./LatencyBars";

// Keys here are what the `visual` field in src/data/content.js refers to.
// Each caption is the small mono strip printed under the panel.
const VISUALS = {
  mask: {
    Component: DamageMask,
    caption: "Damage mask — pixel-level segmentation",
  },
  graph: {
    Component: SecurityGraph,
    caption: "Resource graph — 3 misconfigurations flagged",
  },
  thermal: {
    Component: ThermalTrace,
    caption: "Cell temperature — live telemetry",
  },
  latency: {
    Component: LatencyBars,
    caption: "Page load — before and after",
  },
};

export default VISUALS;
