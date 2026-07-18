"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const POINTS = [18, 22, 20, 30, 27, 38, 34, 46, 42, 58, 52, 68];

function buildPath(values: number[], width: number, height: number, pad: number) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = (width - pad * 2) / (values.length - 1);

  const coords = values.map((v, i) => {
    const x = pad + i * stepX;
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return [x, y] as const;
  });

  const line = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");

  const area = `${line} L ${coords[coords.length - 1][0].toFixed(1)} ${height - pad} L ${coords[0][0].toFixed(1)} ${height - pad} Z`;

  return { line, area, coords };
}

export function GrowthChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const width = 400;
  const height = 160;
  const pad = 8;
  const { line, area, coords } = buildPath(POINTS, width, height, pad);
  const last = coords[coords.length - 1];

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full overflow-visible"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#46D3F3" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#46D3F3" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Baseline grid */}
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={0}
          x2={width}
          y1={height * f}
          y2={height * f}
          stroke="#0A355B"
          strokeOpacity="0.06"
          strokeWidth="1"
        />
      ))}

      <motion.path
        d={area}
        fill="url(#growth-fill)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      />

      <motion.path
        d={line}
        fill="none"
        stroke="#46D3F3"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      <motion.circle
        cx={last[0]}
        cy={last[1]}
        r="5"
        fill="#FF7A1A"
        stroke="white"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.5 }}
      />
      <motion.circle
        cx={last[0]}
        cy={last[1]}
        r="5"
        fill="none"
        stroke="#FF7A1A"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 1 }}
        animate={inView ? { opacity: [0.6, 0], scale: [1, 2.4] } : {}}
        transition={{
          duration: 1.6,
          delay: 1.6,
          repeat: Infinity,
          repeatDelay: 0.4,
          ease: "easeOut",
        }}
      />
    </svg>
  );
}
