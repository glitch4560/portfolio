/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "Times New Roman", "serif"],
        sans: ["Inter Tight", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        ground: "#0A0A0B",
        surface: {
          DEFAULT: "#141417",
          raised: "#1C1C20",
        },
        fg: "#F2F1ED",
        muted: "#87878A",
        line: {
          DEFAULT: "rgba(242, 241, 237, 0.09)",
          strong: "rgba(242, 241, 237, 0.18)",
        },
        accent: {
          DEFAULT: "#E9B949",
          dim: "rgba(233, 185, 73, 0.14)",
        },
      },
      borderColor: {
        DEFAULT: "rgba(242, 241, 237, 0.09)",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "3px",
      },
      maxWidth: {
        shell: "1320px",
        prose: "62ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.85)", opacity: "0.55" },
          "70%": { transform: "scale(1.9)", opacity: "0" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        drift: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "pulse-ring": "pulseRing 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        drift: "drift 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
