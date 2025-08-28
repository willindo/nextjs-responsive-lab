"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

export default function ParallaxGroup() {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Create smoother only on client
    let smoother = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
    });

    return () => {
      // cleanup on unmount
      smoother.kill();
    };
  }, []);

  return (
    <main id="smooth-wrapper" className="w-full h-screen bg-[#0e100f]">
      <div id="smooth-content" className="w-full h-[200vh] relative">
        <h1 className="text-center text-white py-8">
          Scroll down to see parallax layers
        </h1>

        <div className="img-group flex justify-around items-center relative w-4/5 top-[75vh] left-1/2 -translate-x-1/2">
          <div data-speed="0.6" className="parallax"></div>
          <div data-speed="0.85" className="parallax"></div>
          <div data-speed="1" className="parallax"></div>
          <div data-speed="1.15" className="parallax"></div>
          <div data-speed="clamp(1.3)" className="parallax"></div>
        </div>
      </div>
    </main>
  );
}
