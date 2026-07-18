"use client";

import { motion } from "framer-motion";

/**
 * Abstract "growth system" composition for the About section: concentric
 * orbit rings with connected nodes, representing strategy → execution →
 * scale as an interconnected system rather than a literal office photo.
 */
export function GrowthSystemArt() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 overflow-hidden shadow-xl"
      >
        <svg
          viewBox="0 0 400 500"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="38%" r="60%">
              <stop offset="0%" stopColor="#46D3F3" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#46D3F3" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill="url(#glow)" />

          {/* Orbit rings */}
          {[70, 110, 150].map((r, i) => (
            <motion.circle
              key={r}
              cx="200"
              cy="220"
              r={r}
              fill="none"
              stroke="white"
              strokeOpacity="0.12"
              strokeWidth="1"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* Connecting lines */}
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <line x1="200" y1="220" x2="200" y2="70" stroke="#46D3F3" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="200" y1="220" x2="330" y2="290" stroke="#FF7A1A" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="200" y1="220" x2="90" y2="320" stroke="#46D3F3" strokeOpacity="0.4" strokeWidth="1.5" />
          </motion.g>

          {/* Center node */}
          <motion.circle
            cx="200"
            cy="220"
            r="14"
            fill="#FF7A1A"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <circle cx="200" cy="220" r="14" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="2" />

          {/* Satellite nodes */}
          {[
            { cx: 200, cy: 70, r: 9, fill: "#46D3F3", delay: 0.6 },
            { cx: 330, cy: 290, r: 7, fill: "white", delay: 0.75 },
            { cx: 90, cy: 320, r: 8, fill: "#46D3F3", delay: 0.9 },
          ].map((n) => (
            <motion.circle
              key={`${n.cx}-${n.cy}`}
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill={n.fill}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: n.delay, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* Ambient dots */}
          {[
            [60, 90], [340, 130], [70, 430], [350, 420], [40, 250], [360, 250],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="white" fillOpacity="0.25" />
          ))}
        </svg>
      </div>

      {/* Floating stat chip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-xl border border-border bg-white shadow-lg px-5 py-3 text-center"
      >
        <p className="text-xs font-medium text-text-subtle">Client retention</p>
        <p className="text-xl font-bold text-primary-900 font-display">94%</p>
      </motion.div>
    </div>
  );
}
