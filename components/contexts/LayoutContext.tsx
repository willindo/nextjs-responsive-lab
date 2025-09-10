"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Layout = "grid" | "stack" | "motion";

interface LayoutContextType {
  layout: Layout;
  setLayout: (layout: Layout) => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayout] = useState<Layout>("grid");

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used inside LayoutProvider");
  return ctx;
}
