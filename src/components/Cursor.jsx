"use client";
import { motion } from "framer-motion";

export default function Cursor({ position }) {
  return (
    <>
      <motion.li
        animate={position}
        className="absolute z-0 h-7  rounded-full bg-black md:h-12"
      />
    </>
  );
}
