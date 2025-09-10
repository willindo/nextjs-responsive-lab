// configs/panelSchemas.ts
export type NumberField = {
  type: "number";
  key: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
};

export type BooleanField = {
  type: "boolean";
  key: string;
  label: string;
};

export type ConfigField = NumberField | BooleanField;
export const circleSchema = [
  { type: "number", key: "radius", label: "Radius", min: 50, max: 300, step: 10 },
  { type: "number", key: "angleStart", label: "Angle Start", min: -180, max: 180, step: 5 },
  { type: "number", key: "sweep", label: "Sweep", min: -180, max: 300, step: 5 },
];

export const spiralSchema = [
  { type: "number", key: "spiralA", label: "Spiral A", min: -180, max: 180 },
  { type: "number", key: "spiralB", label: "Spiral B", min: -180, max: 180 },
  { type: "number", key: "spiralStepDeg", label: "Spiral Step Deg", min: -180, max: 180, step: 5 },
];

export const layoutSchema: ConfigField[] = [
  { type: "number", key: "spacing", label: "Spacing", min: 0, max: 200, step: 1 },
  { type: "boolean", key: "rotateWithTangent", label: "Rotate With Tangent" },
];

// You can also merge them when needed:
export const arcSpiralSchema = [...circleSchema, ...spiralSchema, ...layoutSchema];
