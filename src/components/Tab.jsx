"use client";
import { useRef } from "react";

export default function Tab({ children, setPosition }) {
  const ref = useRef(null);
  return (
    <>
      <li
        ref={ref}
        onMouseEnter={() => {
          if (!ref.current) return;

          const { width } = ref.current.getBoundingClientRect();
          setPosition({
            width,
            opacity: 1,
            left: ref.current.offsetLeft,
          });
        }}
        className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white
       mix-blend-difference md:px-5 md:py-3 md:text-base"
      >
        {children}
      </li>
    </>
  );
}
