"use client";
import { useState } from "react";

import { motion } from "framer-motion";

const colors = [
    "#38bdf8", // Sky Blue
    "#4ade80", // Green
    "#a855f7", // Purple
    "#f472b6", // Pink
    "#fbbf24", // Amber
    "#f87171", // Red
    "#22d3ee", // Cyan
    "#e879f9", // Fuchsia
];

export const RandomColorHoverText = ({ text }: { text: string }) => {
    return (
        <div className="flex justify-center flex-wrap cursor-pointer select-none">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold w-full flex justify-between tracking-tighter sm:tracking-normal">
                {text.split("").map((char, index) => (
                    <HoverChar key={index} char={char} />
                ))}
            </h1>
        </div>
    );
};

const HoverChar = ({ char }: { char: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [color, setColor] = useState<string>("");

    const handleMouseEnter = () => {
        setIsHovered(true);
        setColor(colors[Math.floor(Math.random() * colors.length)]);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <motion.span
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`
                transition-all duration-300 relative
                ${!isHovered ? "text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-green)] to-[var(--accent-blue)] bg-300-percent animate-gradient" : ""}
            `}
            style={{
                color: isHovered ? color : undefined,
                // Glow intensity reduced to approx 20% (0.2 opacity)
                textShadow: isHovered ? `0 0 20px ${color}33` : undefined,
                fontFamily: "'Montserrat', sans-serif" // Ensure font match
            }}
            animate={{
                scale: isHovered ? 1.2 : 1,
                y: isHovered ? -10 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
            {isHovered ? char.toUpperCase() : char}
        </motion.span>
    );
};
