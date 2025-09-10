// components/PlaygroundSidebar.tsx
import Link from "next/link";

const demos = [
  { name: "Shadcn UI", href: "/playground/shadcn" },
  { name: "Animations", href: "/playground/animations" },
  { name: "Three.js", href: "/playground/3d/threejs" },
  { name: "Babylon.js", href: "/playground/3d/babylon" },
];

export default function PlaygroundSidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Playground</h2>
      <nav className="flex flex-col gap-2">
        {demos.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="px-3 py-2 rounded hover:bg-gray-200"
          >
            {d.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
