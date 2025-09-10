import React, { useRef, useState, useEffect } from "react";

interface Circle3DProps {
  children: React.ReactNode;
  radius?: number;
  autoRotate?: boolean;
  speed?: number; // degrees per frame
  perspective?: number;
  real3D?: boolean; // toggle 3D vs flat
  bend?: boolean; // toggle bend effect
  draggable?: boolean; // click + drag rotation
  childRotate?: boolean; // children rotate on their axis
  className?: string;
}

const Circle3D: React.FC<Circle3DProps> = ({
  children,
  radius = 200,
  autoRotate = true,
  speed = 0.2,
  perspective = 1000,
  real3D = true,
  bend = false,
  draggable = true,
  childRotate = false,
  className,
}) => {
  const frameRef = useRef<number>(0);
  const [angle, setAngle] = useState(0);
  const [hovered, setHovered] = useState(false);

  // drag state
  const isDragging = useRef(false);
  const lastX = useRef(0);

  // auto-rotation
  useEffect(() => {
    if (!autoRotate || hovered || isDragging.current) return;

    const rotate = () => {
      setAngle((prev) => prev + speed);
      frameRef.current = requestAnimationFrame(rotate);
    };

    frameRef.current = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [autoRotate, speed, hovered]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    isDragging.current = true;
    lastX.current = e.clientX;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!draggable || !isDragging.current) return;
    const deltaX = e.clientX - lastX.current;
    setAngle((prev) => prev + deltaX * 0.5); // adjust sensitivity
    lastX.current = e.clientX;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const count = React.Children.count(children);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        transform: `rotateY(${angle}deg)`,
        perspective: real3D ? `${perspective}px` : undefined,
        margin: "auto",
        cursor: draggable ? "grab" : "default",
        userSelect: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      // onMouseLeaveCapture={onMouseUp}
    >
      {React.Children.map(children, (child, i) => {
        const itemAngle = (i / count) * 360;

        return (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `
                rotateY(${itemAngle}deg)
                translateZ(${radius}px)
                translate(-50%, -50%)
                ${bend ? `rotateX(${itemAngle / 4}deg)` : ""}
                ${childRotate ? `rotateY(${angle}deg)` : ""}
              `,
              transformOrigin: `center center -${radius}px`,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};


export default Circle3D;