// utils/paths.ts

// Wave generator
export function generateWave({
  width,
  height,
  amplitude,
  frequency,
  offsetY = 0,
}: {
  width: number;
  height: number;
  amplitude: number;
  frequency: number;
  offsetY?: number;
}): string {
  const points: string[] = [];
  for (let x = 0; x <= width; x += 10) {
    const y = offsetY + amplitude * Math.sin((x / width) * frequency * Math.PI * 2);
    points.push(`${x},${y}`);
  }
  return `M${points.join(" L")}`;
}

// Circle generator
export function generateCircle({
  cx,
  cy,
  radius,
}: {
  cx: number;
  cy: number;
  radius: number;
}): string {
  return `M ${cx + radius}, ${cy}
          A ${radius},${radius} 0 1,0 ${cx - radius},${cy}
          A ${radius},${radius} 0 1,0 ${cx + radius},${cy}`;
}

// Spiral generator
export function generateSpiral({
  cx,
  cy,
  turns,
  step,
}: {
  cx: number;
  cy: number;
  turns: number;
  step: number;
}): string {
  const points: string[] = [];
  const totalPoints = turns * 50;
  for (let i = 0; i < totalPoints; i++) {
    const angle = 0.1 * i;
    const r = step * angle;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return `M${points.join(" L")}`;
}

// ZigZag generator
export function generateZigZag({
  x,
  y,
  width,
  height,
  segments,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  segments: number;
}): string {
  const points: string[] = [];
  const stepX = width / segments;

  for (let i = 0; i <= segments; i++) {
    const px = x + i * stepX;
    const py = i % 2 === 0 ? y : y + height;
    points.push(`${px},${py}`);
  }

  return `M${points.join(" L")}`;
}
