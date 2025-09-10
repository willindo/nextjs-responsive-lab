"use client";
import { useEffect } from "react";

export default function FontSizeDebugger() {
  useEffect(() => {
    const update = () => {
      document.querySelectorAll("h1,h2,h3,h4,h5,p").forEach(el => {
        let label = el.querySelector(".font-size-label");
        if (!label) {
          label = document.createElement("span");
          label.className = "font-size-label";
          (el as HTMLElement).appendChild(label);
        }
        label.textContent = getComputedStyle(el).fontSize;
      });
    };
    window.addEventListener("resize", update);
    update(); // run once on mount
    return () => window.removeEventListener("resize", update);
  }, []);

  return null; // this component just attaches behavior
}
