// ResponsiveShowcase.tsx
"use client";
import { useState } from "react";

export default function ResponsiveShowcase() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-7xl  p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-balance text-center  text-3xl md:text-5xl font-semibold leading-tight">
          Elevate your product with a clean, responsive surface
        </h1>
        <p className="mt-3 text-pretty text-sm md:text-base text-gray-600">
          Smooth scaling, quick load, and tiny micro-interactions—no heavy frameworks required.
        </p>
      </header>

      <div className="card-grid grid [container-type:inline-size] gap-4 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
        {Array.from({ length: 6 }).map((_, i) => (
          <article
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={`group relative rounded-2xl border bg-white p-4 shadow-sm transition-transform duration-200 will-change-transform hover:-translate-y-0.5`}
          >
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
              <img
                src={`https://picsum.photos/seed/${i}/800/450`}
                alt=""
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3 className="mt-3 text-lg font-medium">Card title {i + 1}</h3>
            <p className="mt-1 text-sm text-gray-600">
              Compact copy that wraps gracefully and never reflows weirdly.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                className="rounded-xl px-3 py-2 text-sm border shadow-xs transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                aria-label="Primary"
              >
                View
              </button>
              <button
                className="rounded-xl px-3 py-2 text-sm border shadow-xs transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                aria-label="Secondary"
              >
                Details
              </button>
            </div>
            <div
              className={`pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-transparent transition-[ring-color] duration-200 ${
                active === i ? "ring-black/10" : ""
              }`}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
