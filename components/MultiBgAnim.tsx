"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function MultiBgAnim() {

useEffect(() => {
  const el = document.querySelector(".multi-bg");
  if (!el) return;

  // Animate first background portion (slide across oversized image)
  gsap.to(el, {
    "--x1": "100%",
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Animate second background portion
  gsap.to(el, {
    "--y2": "50%",
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}, []);


  return (
    <div className="multi-bg w-full h-64 rounded-2xl shadow-lg" />
  );
}
