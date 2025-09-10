"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useContainerSize() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    function update() {
      if (ref.current) {
        setSize({
          w: ref.current.offsetWidth,
          h: ref.current.offsetHeight,
        });
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { ref, size };
}

export default function ResponsiveImagesDemo() {
  const [widthClass, setWidthClass] = useState("w-1/2");

  return (
    <div className="p-6 space-y-12">
      <h1 className="text-2xl font-bold mb-4">📐 Responsive Images + Container Size Demo</h1>

      {/* Width toggle buttons */}
      <div className="space-x-2 mb-6">
        <button
          onClick={() => setWidthClass("w-1/4")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          25%
        </button>
        <button
          onClick={() => setWidthClass("w-1/2")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          50%
        </button>
        <button
          onClick={() => setWidthClass("w-full")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          100%
        </button>
      </div>

      {/* 1. layout=responsive (16:9 aspect ratio) */}
      <ResponsiveBox
        label="1️⃣ layout=responsive (16:9)"
        src="https://picsum.photos/800/450"
        type="responsive"
        width={800}
        height={450}
        widthClass={widthClass}
      />

      {/* 2. layout=responsive (4:3 aspect ratio) */}
      <ResponsiveBox
        label="2️⃣ layout=responsive (4:3)"
        src="https://picsum.photos/800/600"
        type="responsive"
        width={800}
        height={600}
        widthClass={widthClass}
      />

      {/* 3. fill + object-cover */}
      <ResponsiveBox
        label="3️⃣ fill + object-cover"
        src="https://picsum.photos/1200/800"
        type="fill"
        widthClass={widthClass}
      />

      {/* 4. background cover */}
      <BackgroundBox
        label="4️⃣ Background Image (cover)"
        url="https://picsum.photos/1000/600"
        type="cover"
        widthClass={widthClass}
      />

      {/* 5. background contain */}
      <BackgroundBox
        label="5️⃣ Background Image (contain)"
        url="https://picsum.photos/600/1000"
        type="contain"
        widthClass={widthClass}
      />

      {/* 6. Plain <img> */}
      <PlainImgBox
        label="6️⃣ Plain <img> (max-width:100%)"
        url="https://picsum.photos/900/500"
        widthClass={widthClass}
      />
    </div>
  );
}

function ResponsiveBox({
  label,
  src,
  type,
  width,
  height,
  widthClass,
}: {
  label: string;
  src: string;
  type: "responsive" | "fill";
  widthClass: string;
  width?: number;
  height?: number;
}) {
  const { ref, size } = useContainerSize();
  return (
    <div ref={ref} className={`border-2 border-red-500 ${widthClass} relative`}>
      <p className="bg-red-100 text-sm p-1">{label}</p>
      {type === "responsive" && width && height && (
        <Image src={src} alt={label} width={width} height={height} layout="responsive" />
      )}
      {type === "fill" && (
        <div className="relative h-64">
          <Image src={src} alt={label} fill className="object-cover" />
        </div>
      )}
      <p className="text-xs text-gray-700 p-1">
        📏 Container: {size.w}px × {size.h}px
      </p>
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
  return (
    <div
      ref={ref}
      className={`${widthClass} h-64 border-2 border-blue-500 rounded-lg bg-${type} bg-center`}
      style={{ backgroundImage: `url(${url})` }}
    >
      <p className="bg-blue-100 text-sm p-1">{label}</p>
      <p className="text-xs text-gray-700 p-1">
        📏 Container: {size.w}px × {size.h}px
      </p>
    </div>
  );
}

function PlainImgBox({ label, url, widthClass }: { label: string; url: string; widthClass: string }) {
  const { ref, size } = useContainerSize();
  return (
    <div ref={ref} className={`border-2 border-green-500 ${widthClass}`}>
      <p className="bg-green-100 text-sm p-1">{label}</p>
      <img src={url} alt={label} className="max-w-full h-auto" />
      <p className="text-xs text-gray-700 p-1">
        📏 Container: {size.w}px × {size.h}px
      </p>
    </div>
  );
}
