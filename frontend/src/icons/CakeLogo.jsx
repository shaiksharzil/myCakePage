"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const staticVariants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
  },
};

const flameVariants = {
  animate: (i) => {
    const patterns = [
      { scale: [1, 1.2, 0.9, 1.1, 1], y: [0, -1, 1, -2, 0] },
      { scale: [1, 0.9, 1.1, 0.8, 1], y: [0, 1, -1, 0, 0] },
      { scale: [1, 1.1, 0.8, 1.2, 1], y: [0, -2, 0, -1, 0] },
    ];
    return {
      ...patterns[i % patterns.length],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    };
  },
};

const CakeLogo = ({
  width = 32,
  height = 32,
  strokeWidth = 2,
  stroke = "white",
  ...props
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("animate");
  }, []);

  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {/* Static cake parts */}
        <motion.path
          d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"
          variants={staticVariants}
          animate={controls}
        />
        <motion.path
          d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"
          variants={staticVariants}
          animate={controls}
        />
        <motion.path
          d="M2 21h20"
          variants={staticVariants}
          animate={controls}
        />

        {/* Candle sticks */}
        <motion.path d="M7 8v3" variants={staticVariants} animate={controls} />
        <motion.path d="M12 8v3" variants={staticVariants} animate={controls} />
        <motion.path d="M17 8v3" variants={staticVariants} animate={controls} />

        {/* Animated flames */}
        <motion.path
          d="M7 4h.01"
          variants={flameVariants}
          animate={controls}
          custom={0}
          stroke="#FF9933"
          style={{ transformOrigin: "center" }}
        />
        <motion.path
          d="M12 4h.01"
          variants={flameVariants}
          animate={controls}
          custom={1}
          style={{ transformOrigin: "center" }}
        />
        <motion.path
          d="M17 4h.01"
          variants={flameVariants}
          animate={controls}
          custom={2}
          stroke="#138808"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
};

export default CakeLogo;
