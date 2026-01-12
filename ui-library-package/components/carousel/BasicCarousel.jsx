import React, { useState } from "react";
import "../../index.css";

/**
 * BasicCarousel
 *
 * @param {React.ReactNode[]} items - slides content
 * @param {string} className - override container styles
 * @param {string} slideClassName - override slide styles
 */
export function BasicCarousel({
  items = [],
  className = "",
  slideClassName = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = items.length;

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % totalSlides);

  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div
      className={`
        relative flex items-center justify-center overflow-hidden
        w-full h-[60vh] sm:h-[70vh] md:h-[80vh]
        bg-slate-900
        ${className}
      `}
    >
      {/* Left button */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 z-20
                   w-10 h-10 sm:w-12 sm:h-12
                   rounded-full bg-violet-500 text-white
                   flex items-center justify-center
                   hover:bg-white hover:text-black transition"
      >
        ‹
      </button>

      {/* Slides container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {items.map((item, index) => {
          const offset = index - currentIndex;
          const scale = Math.max(0.6, 1 - Math.abs(offset) * 0.15);

          return (
            <div
              key={index}
              className={`
                absolute transition-all duration-300 ease-out
                rounded-xl
                w-[80%] sm:w-[65%] md:w-[55%]
                h-[70%] sm:h-[75%] md:h-[80%]
                ${slideClassName}
              `}
              style={{
                transform: `
                  translateX(${offset * 18}rem)
                  scale(${scale})
                `,
                zIndex: totalSlides - Math.abs(offset),
              }}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* Right button */}
      <button
        onClick={next}
        className="absolute right-2 sm:right-4 z-20
                   w-10 h-10 sm:w-12 sm:h-12
                   rounded-full bg-violet-500 text-white
                   flex items-center justify-center
                   hover:bg-white hover:text-black transition"
      >
        ›
      </button>
    </div>
  );
}
