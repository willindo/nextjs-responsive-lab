"use client";
import { LayoutProvider } from "@/components/contexts/LayoutContext";
import { ConfigProvider } from "@/components/contexts/ConfigContext";

export function DevProviders({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <ConfigProvider>{children}</ConfigProvider>
    </LayoutProvider>
  );
}
