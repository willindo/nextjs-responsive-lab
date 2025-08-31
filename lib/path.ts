// lib/paths.ts
// Reusable SVG path strings for MotionGroup / MotionPath

export const paths = {
  // Straight line (L → R)
  straight: "M 50 250 L 450 250",

  // Zig-Zag
  zigzag: "M 50 250 L 150 150 L 250 250 L 350 150 L 450 250",

  // Wave
  wave: "M 50 250 Q 150 150 250 250 T 450 250",

  // Circle
  circle:
    "M 250 250 m -150,0 a 150,150 0 1,0 300,0 a 150,150 0 1,0 -300,0",

  // Infinity ∞
  infinity:
    "M 150 250 C 150 150, 350 150, 350 250 C 350 350, 150 350, 150 250 \
     M 350 250 C 350 150, 550 150, 550 250 C 550 350, 350 350, 350 250",

  // Spiral
  spiral:
    "M 250 250 \
     m -20,0 \
     a 20,20 0 1,1 40,0 \
     a 40,40 0 1,0 -80,0 \
     a 60,60 0 1,1 120,0",

  // Heart ♥
  heart:
    "M 250 300 \
     C 250 250, 150 200, 150 120 \
     A 50,50 0 0,1 250 120 \
     A 50,50 0 0,1 350 120 \
     C 350 200, 250 250, 250 300 Z",
} as const;

export type PathName = keyof typeof paths;
