"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function StickyPortion() {
  useEffect(() => {
    const el = document.querySelector(".portion-bg");
    if (!el) return;

    // Animate inside top-left slot
      gsap.to(el, {
      "--offsetX": "50%",
      // rotateZ: 40,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(el, {
      "--offsetY": "-50%",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);
    

  return <div className="portion-bg border border-gray-400" />;
}
