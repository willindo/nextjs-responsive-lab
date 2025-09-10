// useLayoutConfig.ts
import { useState } from "react";
import { defaultConfigs, LayoutConfigMap } from "./layoutConfigs";

export function useLayoutConfig<T extends keyof LayoutConfigMap>(kind: T) {
  const [config, setConfig] = useState(defaultConfigs[kind]);
  return { config, setConfig };
}
