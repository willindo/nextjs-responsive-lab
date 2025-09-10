"use client";
import { useState } from "react";

export default function ResponsiveShowcase() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          Elevate your product with a clean, responsive surface
        </h1>
        <p className="mt-4 text-pretty text-gray-600 text-sm sm:text-base md:text-lg">
          Smooth scaling, quick load, and tiny micro-interactions—no heavy frameworks required.
        </p>
      </header>

      {/* Grid */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <article
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="group relative rounded-2xl border bg-white p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
          >
            {/* Image */}
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
              <img
                src={`https://picsum.photos/seed/${i}/800/450`}
                alt={`Card preview ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Content */}
            <h3 className="mt-3 text-lg font-medium sm:text-xl">
              Card title {i + 1}
            </h3>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              Compact copy that wraps gracefully and never reflows weirdly.
            </p>

            {/* Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                className="rounded-xl border px-3 py-2 text-sm shadow-xs transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
              >
                View
              </button>
              <button
                className="rounded-xl border px-3 py-2 text-sm shadow-xs transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
              >
                Details
              </button>
            </div>

            {/* Active ring */}
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
