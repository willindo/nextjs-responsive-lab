"use client";
import React from "react";

interface ParallaxProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  height?: string;
}

const ParallaxSection: React.FC<ParallaxProps> = ({
  imageUrl,
  title,
  subtitle,
  height = "h-[600px]",
}) => {
  return (
    <section
      className={`relative w-full ${height} flex items-center justify-center overflow-hidden bg-gray-900`}
    >
      {/* 1. The Background Layer 
        - 'bg-fixed' is the Tailwind utility for background-attachment: fixed
      */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      />

      {/* 2. The Professional Overlay 
        - Uses a gradient to ensure text contrast and add depth
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

      {/* 3. The Content Layer */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-200 font-light italic">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default ParallaxSection;
