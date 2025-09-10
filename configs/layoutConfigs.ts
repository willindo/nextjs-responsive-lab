// layoutConfigs.ts
export type CircleConfig = {
  radius: number;
  spacing: number;
  angleStart: number;
  sweep: number;
  spiralA: number;
  spiralB: number;
  spiralStepDeg: number;
  rotateWithTangent: boolean;
};

export type LayoutConfigMap = {
  circle: CircleConfig;
  // later you can add: row, column, arc, spiral...
};

export const defaultConfigs: LayoutConfigMap = {
  circle: {
    radius: 160,
    spacing: 100,
    angleStart: -90,
    sweep: 120,
    spiralA: 24,
    spiralB: 32,
    spiralStepDeg: 40,
    rotateWithTangent: true,
  },
};
