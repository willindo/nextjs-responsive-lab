"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar1() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md px-6 py-3 flex items-center justify-between">
      <div className="text-lg font-bold">MySite</div>

      <div className="flex items-center gap-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>

        {/* More Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-1 hover:text-gray-300"
          >
            More <ChevronDown size={16} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
              <Link
                href="/playground"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Playground
              </Link>
              <Link href="/blog" className="block px-4 py-2 hover:bg-gray-100">
                Blog
              </Link>
              <Link href="/resume" className="block px-4 py-2 hover:bg-gray-100">
                Resume
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
