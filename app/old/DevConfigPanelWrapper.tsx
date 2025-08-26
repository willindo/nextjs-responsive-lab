// components/DevConfigPanelWrapper.tsx
"use client";
import { useConfig } from "@/components/contexts/ConfigContext";
// import { DevConfigPanel } from "@/components/dev-tools/DevConfigPanel";
// import { Children } from "react";

export default function DevConfigPanelWrapper({ children }: { children: React.ReactNode }) {
  const { config, setConfig } = useConfig();

  return (
    <>
      <DevConfigPanel
        position="top-right"
        schema={[
          {
            type: "number",
            key: "radius",
            label: "Radius",
            min: 50,
            max: 300,
            step: 10,
          },
          {
            type: "number",
            key: "angleStart",
            label: "Angle Start",
            min: -180,
            max: 180,
            step: 5,
          },
          {
            type: "number",
            key: "sweep",
            label: "Sweep",
            min: -180,
            max: 180,
            step: 5,
          },
          {
            type: "number",
            key: "spiralA",
            label: "Spiral A",
            min: -180,
            max: 180,
          },
          {
            type: "number",
            key: "spiralB",
            label: "Spiral B",
            min: -180,
            max: 180,
          },
          {
            type: "number",
            key: "spiralStepDeg",
            label: "Spiral Step Deg",
            min: -180,
            max: 180,
            step: 5,
          },
          {
            type: "number",
            key: "spacing",
            label: "Spacing",
            min: 0,
            max: 100,
            step: 1,
          },
          {
            type: "boolean",
            key: "rotateWithTangent",
            label: "Rotate With Tangent",
          },
        ]}
        values={config}
        onChange={setConfig}
      />
      {children}
    </>
  );
}
