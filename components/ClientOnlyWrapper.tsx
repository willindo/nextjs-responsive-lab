// ClientOnlyWrapper.tsx
"use client";
import { useState, useEffect } from "react";

export function ClientOnlyWrapper({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Render a placeholder or null on the server/initial client load
    return null;
  }

  // Render the actual content only after mounting
  return <>{children}</>;
}
