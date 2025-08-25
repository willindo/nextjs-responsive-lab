// context/ConfigContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Config = {
  radius: number;
  spacing: number;
  angleStart: number;
  sweep: number;
  spiralA: number;
  spiralB: number;
  spiralStepDeg: number;
  rotateWithTangent: boolean;
};

const defaultConfig: Config = {
  radius: 160,
  spacing: 100,
  angleStart: -90,
  sweep: 120,
  spiralA: 24,
  spiralB: 32,
  spiralStepDeg: 40,
  rotateWithTangent: true,
};

type ConfigContextType = {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Config>(defaultConfig);
  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error("useConfig must be used inside ConfigProvider");
  return ctx;
}
