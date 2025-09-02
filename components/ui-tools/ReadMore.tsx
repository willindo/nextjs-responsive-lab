"use client";
import { useState, ReactElement, cloneElement } from "react";

interface ReadMoreProps {
  children: ReactElement<{ className?: string }>; // child must support className
}

export default function ReadMore({ children }: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false);

  if (!children.props?.className) {
    console.warn("⚠️ <ReadMore> child needs a className with line-clamp-*");
  }

  // Extract clamp class from child
  const className: string = children.props?.className ?? "";
  const clampClass = (className.match(/line-clamp-\d+/) || [])[0] || "";

  // New className depending on expanded state
  const appliedClass = expanded
    ? className.replace(clampClass, "") // remove clamp
    : className; // keep clamp

  // Clone the child with updated className
  const cloned = cloneElement(children, {
    className: appliedClass,
  });

  return (
    <div>
      {cloned}

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-1 text-sm font-medium text-blue-600 hover:underline"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
