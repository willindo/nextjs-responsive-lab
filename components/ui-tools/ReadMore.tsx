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

  const className: string = children.props?.className ?? "";
  const clampClass = (className.match(/line-clamp-\d+/) || [])[0] || "";

  // Clone for collapsed state (with clamp intact)
  const collapsed = cloneElement(children, {
    className,
  });

  return (
    <div>
      {/* Collapsed view */}
      {!expanded && (
        <>
          {collapsed}
          <button
            onClick={() => setExpanded(true)}
            className="mt-1 text-sm font-medium text-blue-600 hover:underline"
          >
            Read more
          </button>
        </>
      )}

      {/* Expanded full-screen overlay */}
      {expanded && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            {/* Expanded child without line clamp */}
            {cloneElement(children, {
              className: className.replace(clampClass, ""), // unclamped
            })}

            <button
              onClick={() => setExpanded(false)}
              className="mt-4 text-sm font-medium text-blue-600 hover:underline"
            >
              Read less
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
