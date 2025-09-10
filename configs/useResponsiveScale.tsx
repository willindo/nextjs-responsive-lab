"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ResponsiveScaleContext = createContext<number>(1);

export const ResponsiveScaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w <= 425) setScale(0.6);
      else if (w <= 768) setScale(0.8);
      else setScale(1);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <ResponsiveScaleContext.Provider value={scale}>
      {children}
    </ResponsiveScaleContext.Provider>
  );
};

export function useResponsiveScale() {
  return useContext(ResponsiveScaleContext);
}
