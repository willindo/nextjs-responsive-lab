"use client";
import React, { ReactNode, ElementType } from "react";
import { MotionScopeMath } from "./MotionPlayground"; // adjust import

// Utility: split text into spans
function splitText(text: string): ReactNode[] {
  return text.split("").map((char, i) => (
    <span key={i} className="inline-block whitespace-pre">
      {char}
    </span>
  ));
}

interface MotionTextMathProps {
  as?: ElementType; 
  text: string;
  pattern?: Parameters<typeof MotionScopeMath>[0]["pattern"];
  params?: Parameters<typeof MotionScopeMath>[0]["params"];
  className?: string;
}

/**
 * MotionTextMath
 * - For inline/heading text (span, p, h1, h2, etc.)
 * - Splits text into letters and applies MotionScopeMath animations
 */
export function MotionTextMath({
  as: Tag = "span", // Default to span (safe inline element)
  text,
  pattern = "waveY",
  params,
  className = "",
}: MotionTextMathProps) {
  const letters = splitText(text);

  return (
    <Tag className={`inline-block ${className}`}>
      <MotionScopeMath pattern={pattern} params={params}>
        {letters}
      </MotionScopeMath>
    </Tag>
  );
}
