"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";

/**
 * REFINEMENT: Use ResizeObserver instead of window resize.
 * This tracks the element's actual size changes (e.g., when the widthClass changes)
 * even if the window itself doesn't change size.
 */
function useContainerSize() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({
          w: Math.round(entry.contentRect.width),
          h: Math.round(entry.contentRect.height),
        });
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

export default function ResponsiveImagesDemo() {
  const [widthClass, setWidthClass] = useState("w-[45%]");

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          📐 Image Layouts & Container Monitoring
        </h1>
        <p className="text-slate-500 mt-2">
          Testing modern Next.js 13+ Image components.
        </p>

        <div className="flex gap-2 mt-4">
          {["w-1/4", "w-[45%]", "w-full"].map((cls) => (
            <button
              key={cls}
              onClick={() => setWidthClass(cls)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                widthClass === cls
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cls.replace("w-", "") === "full"
                ? "100%"
                : cls.replace("w-1/", "") === "4"
                ? "25%"
                : "45%"}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-wrap gap-8 justify-start">
        {/* Aspect Ratio Controlled Images */}
        <ResponsiveBox
          label="16:9 Aspect Ratio"
          src="https://picsum.photos/800/450"
          aspect="16/9"
          widthClass={widthClass}
        />

        <ResponsiveBox
          label="4:3 Aspect Ratio"
          src="https://picsum.photos/800/600"
          aspect="4/3"
          widthClass={widthClass}
        />

        {/* Fill + Object Cover */}
        <FillBox
          label="Fill + Object Cover"
          src="https://picsum.photos/1200/800"
          widthClass={widthClass}
        />

        {/* Background Images */}
        <BackgroundBox
          label="CSS Background (Cover)"
          url="https://picsum.photos/1000/600"
          type="cover"
          widthClass={widthClass}
        />
      </div>
    </div>
  );
}

/* --- SUB-COMPONENTS --- */

function ResponsiveBox({
  label,
  src,
  aspect,
  widthClass,
}: {
  label: string;
  src: string;
  aspect: string;
  widthClass: string;
}) {
  const { ref, size } = useContainerSize();

  return (
    <div
      ref={ref}
      className={`${widthClass} border border-slate-200 rounded-xl overflow-hidden shadow-sm`}
    >
      <div className="bg-slate-50 border-b p-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
        {label}
      </div>
      {/* Modern Next.js Image with Aspect Ratio */}
      <div style={{ aspectRatio: aspect }} className="relative w-full">
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 45%"
        />
      </div>
      <Stats size={size} />
    </div>
  );
}

function FillBox({
  label,
  src,
  widthClass,
}: {
  label: string;
  src: string;
  widthClass: string;
}) {
  const { ref, size } = useContainerSize();
  return (
    <div
      ref={ref}
      className={`${widthClass} border border-slate-200 rounded-xl overflow-hidden shadow-sm`}
    >
      <div className="bg-slate-50 border-b p-2 text-xs font-bold text-slate-600 uppercase tracking-wider italic">
        {label}
      </div>
      <div className="relative h-64">
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 45%"
        />
      </div>
      <Stats size={size} />
    </div>
  );
}

function BackgroundBox({
  label,
  url,
  type,
  widthClass,
}: {
  label: string;
  url: string;
  type: "cover" | "contain";
  widthClass: string;
}) {
  const { ref, size } = useContainerSize();

  // REFINEMENT: Explicitly mapping classes to avoid Tailwind JIT issues with dynamic strings
  const bgClass = type === "cover" ? "bg-cover" : "bg-contain";

  return (
    <div
      ref={ref}
      className={`${widthClass} h-64 border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col`}
    >
      <div className="bg-slate-50 border-b p-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
        {label}
      </div>
      <div
        className={`flex-grow bg-center bg-no-repeat ${bgClass}`}
        style={{ backgroundImage: `url(${url})` }}
      />
      <Stats size={size} />
    </div>
  );
}

function Stats({ size }: { size: { w: number; h: number } }) {
  return (
    <div className="p-2 bg-white text-[10px] font-mono text-slate-400 border-t">
      CONTAINER: {size.w}px × {size.h}px
    </div>
  );
}
