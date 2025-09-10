"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ConfigContextType {
  gap: number;
  speed: number;
  showGrid: boolean;
  setGap: (n: number) => void;
  setSpeed: (n: number) => void;
  setShowGrid: (b: boolean) => void;
}

const ConfigContext = createContext<ConfigContextType | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [gap, setGap] = useState(20);
  const [speed, setSpeed] = useState(1);
  const [showGrid, setShowGrid] = useState(true);

  return (
    <ConfigContext.Provider
      value={{ gap, speed, showGrid, setGap, setSpeed, setShowGrid }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error("useConfig must be used inside ConfigProvider");
  return ctx;
}
