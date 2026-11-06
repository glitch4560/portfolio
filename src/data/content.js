// All site copy lives here. Edit this file to update the portfolio.

export const robotIntro = {
  name: "Kiro",
  hello: "Hello there.",
  greeting: "I’m Kiro. Let me build Chandra’s portfolio for you.",
};

export const profile = {
  name: "Chandra Kiran Kopparapu",
  // The hero sets the second line in italic, so keep it to two lines.
  nameLines: ["Chandra Kiran", "Kopparapu"],
  role: "Deep Learning · Cloud Security · Full-Stack",
  location: "Bangalore, India",
  phone: "+91-8073882044",
  email: "chandukopparapu@gmail.com",
  github: "https://github.com/ChandraKiran",
  linkedin: "https://www.linkedin.com/in/chandra-kiran-kopparapu",
  available: "Open to 2026 roles",

  // One-line positioning statement, set under the hero name.
  statement:
    "I build production machine learning for satellite imagery, cloud security and real-time systems — and I care about the number at the end of it.",

  intro:
    "Computer Science undergraduate working at the intersection of deep learning, cloud security and full-stack engineering. I design and deploy ML systems that survive contact with real, messy data — segmentation models on satellite imagery, graph networks over cloud infrastructure, and telemetry pipelines that have to stay up. Published research, shipped dashboards, and a habit of measuring what I claim.",
};

// Short punchy stats, set as a data row inside About.
export const stats = [
  { value: "4+", label: "Shipped projects" },
  { value: "89%", label: "RUL model accuracy" },
  { value: "0.4s", label: "Page load, from 2.3s" },
  { value: "2025", label: "Latest research" },
];

export const education = [
  {
    title: "B.Tech. in Computer Science and Engineering",
    org: "Amrita Vishwa Vidyapeetham, Bangalore",
    period: "2023 — Present",
    details:
      "Algorithms, Data Structures, Operating Systems, Computer Networks, DBMS, Cloud Computing",
  },
  {
    title: "Intermediate (XII)",
    org: "Swamy Narayana Gurukul",
    period: "2021 — 2023",
  },
  {
    title: "Secondary Education",
    org: "Narayana School",
    period: "2010 — 2021",
  },
];

export const skills = {
  Languages: ["Python", "JavaScript", "SQL", "Java"],
  "AI / ML": ["Deep Learning", "Image Segmentation", "GNNs", "Predictive Modeling"],
  Backend: ["Node.js", "Python (Flask)"],
  Frontend: ["HTML5", "CSS3", "React", "D3.js"],
  Databases: ["MySQL", "InfluxDB"],
  "Cloud & Tools": [
    "AWS (EC2, S3, IAM)",
    "PyTorch",
    "PyTorch Geometric",
    "GDAL",
    "Scikit-learn",
    "GraphQL",
    "MQTT",
    "Grafana",
  ],
};

// `visual` selects the generated graphic drawn beside each project.
// Valid keys live in src/components/visuals/index.js.
export const projects = [
  {
    title: "Post-Earthquake Damage Assessment",
    subtitle: "Siamese U-Net with Triplet Attention",
    focus: "Deep Learning / Computer Vision",
    year: "2025",
    visual: "mask",
    highlights: [
      "Built a Siamese U-Net with Triplet Attention for pixel-level building damage segmentation on paired pre- and post-event satellite imagery.",
      "Worked through channel, spatial and triplet attention mechanisms, transfer learning, and the geospatial preprocessing that makes any of it usable.",
    ],
    tech: ["PyTorch", "GDAL", "Rasterio", "Albumentations"],
  },
  {
    title: "Cloud Security Posture Analysis",
    subtitle: "Graph neural networks over live infrastructure",
    focus: "ML & Cloud Systems",
    year: "2024",
    visual: "graph",
    highlights: [
      "Designed a GNN-based framework that detects infrastructure misconfigurations and security vulnerabilities across an account at scale.",
      "Wired it into AWS IAM and monitoring, then built a React and Node.js dashboard so the alerts landed somewhere a human would actually look.",
    ],
    tech: ["PyTorch Geometric", "GraphQL", "AWS SDK", "Node.js", "D3.js"],
  },
  {
    title: "Li-Ion Cell Thermal Monitoring",
    subtitle: "Real-time telemetry and remaining useful life",
    focus: "IoT & Data Analytics",
    year: "2024",
    visual: "thermal",
    highlights: [
      "Engineered real-time thermal monitoring for lithium-ion cells; the predictive maintenance model hit 89% accuracy estimating remaining useful life.",
      "Research published at Amrita University in 2024, with findings feeding into energy safety protocol development.",
    ],
    tech: ["Python", "Pandas", "Scikit-learn", "MQTT", "InfluxDB", "Grafana"],
  },
  {
    title: "Stock Data Insights Platform",
    subtitle: "End-to-end aggregation and query tuning",
    focus: "Full-Stack Development",
    year: "2023",
    visual: "latency",
    highlights: [
      "Built a full stock aggregation platform end to end, from scraping and storage through to the charts.",
      "Rewrote the database access path and cut page load from 2.3 seconds to 0.4 — the change users could actually feel.",
    ],
    tech: ["Python", "Flask", "BeautifulSoup", "Plotly", "JavaScript", "MySQL"],
  },
];

export const publications = [
  { title: "Lithium-ion Cell Thermal Monitoring", kind: "Publication", year: "2025" },
  { title: "AWS Cloud Fundamentals", kind: "Certification", year: "2025" },
  { title: "Python with AI Workshop", kind: "Workshop", year: "2024" },
  { title: "Data Science with Python", kind: "Certification", year: "2024" },
];

export const interests = [
  "Deep Learning & Computer Vision",
  "Cloud Security",
  "IoT Systems",
  "AI Ethics",
  "Cricket — team organiser, Bren Zahara Strikers",
  "Writing about ML and cloud",
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];
