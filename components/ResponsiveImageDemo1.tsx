"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * REFINEMENT: ResizeObserver is better than 'resize' event
 * because it detects changes to the specific element even
 * if the window size doesn't change.
 */
function useContainerSize() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ w: Math.round(width), h: Math.round(height) });
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

export default function ResponsiveImagesDemo1() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8 col-span-full text-center">
        <h2 className="text-2xl font-bold text-slate-800">
          📐 Responsive Images + Container Size Demo
        </h2>
        <p className="text-slate-500 text-sm">
          Testing modern Next.js Image API with ResizeObserver
        </p>
      </header>

      {/* Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Modern Responsive (16:9) */}
        <ResponsiveBox
          label="1️⃣ Aspect Ratio 16:9"
          src="https://picsum.photos/800/450"
          type="responsive"
          aspect="aspect-video"
        />

        {/* 2. Modern Responsive (4:3) */}
        <ResponsiveBox
          label="2️⃣ Aspect Ratio 4:3"
          src="https://picsum.photos/800/600"
          type="responsive"
          aspect="aspect-[4/3]"
        />

        {/* 3. fill + object-cover */}
        <ResponsiveBox
          label="3️⃣ Fill + Object-Cover"
          src="https://picsum.photos/1200/800"
          type="fill"
        />

        {/* 4. background cover */}
        <BackgroundBox
          label="4️⃣ Background (Cover)"
          url="https://picsum.photos/1000/600"
          type="cover"
        />

        {/* 5. background contain */}
        <BackgroundBox
          label="5️⃣ Background (Contain)"
          url="https://picsum.photos/400/400"
          type="contain"
        />

        {/* 6. Plain <img> */}
        <PlainImgBox
          label="6️⃣ Plain <img> (max-width:100%)"
          url="https://picsum.photos/900/500"
        />
      </div>
    </div>
  );
}

/* --- SUB-COMPONENTS --- */

function ResponsiveBox({
  label,
  src,
  type,
  aspect = "aspect-square",
}: {
  label: string;
  src: string;
  type: "responsive" | "fill";
  aspect?: string;
}) {
  const { ref, size } = useContainerSize();
  return (
    <div
      ref={ref}
      className="border border-slate-200 rounded-lg overflow-hidden flex flex-col bg-white shadow-sm"
    >
      <Label text={label} color="bg-red-50 text-red-700" />

      <div className={`relative w-full ${type === "fill" ? "h-64" : aspect}`}>
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <SizeFooter size={size} />
    </div>
  );
}

function BackgroundBox({
  label,
  url,
  type,
}: {
  label: string;
  url: string;
  type: "cover" | "contain";
}) {
  const { ref, size } = useContainerSize();

  // Explicitly map types to prevent Tailwind JIT purging
  const bgStyle = type === "cover" ? "bg-cover" : "bg-contain";

  return (
    <div
      ref={ref}
      className="border border-slate-200 rounded-lg overflow-hidden flex flex-col bg-white shadow-sm"
    >
      <Label text={label} color="bg-blue-50 text-blue-700" />
      <div
        className={`h-64 bg-no-repeat bg-center ${bgStyle}`}
        style={{ backgroundImage: `url(${url})` }}
      />
      <SizeFooter size={size} />
    </div>
  );
}

function PlainImgBox({ label, url }: { label: string; url: string }) {
  const { ref, size } = useContainerSize();
  return (
    <div
      ref={ref}
      className="border border-slate-200 rounded-lg overflow-hidden flex flex-col bg-white shadow-sm"
    >
      <Label text={label} color="bg-green-50 text-green-700" />
      <div className="flex-grow">
        <img src={url} alt={label} className="w-full h-auto block" />
      </div>
      <SizeFooter size={size} />
    </div>
  );
}

/* --- UI HELPERS --- */

function Label({ text, color }: { text: string; color: string }) {
  return (
    <p
      className={`${color} text-xs font-bold uppercase p-2 border-b border-inherit`}
    >
      {text}
    </p>
  );
}

function SizeFooter({ size }: { size: { w: number; h: number } }) {
  return (
    <p className="text-[10px] font-mono text-gray-400 p-2 bg-slate-50 border-t border-inherit">
      📏 {size.w}px × {size.h}px
    </p>
  );
}
