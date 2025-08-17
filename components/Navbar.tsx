"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/fluid-text", label: "Fluid Text" },
    { href: "/responsive-grid", label: "Responsive Grid" },
    { href: "/spacing", label: "Spacing" },
    { href: "/responsive-image", label: "Responsive Image" },
  ];

  return (
    <nav className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="text-xl font-bold">My Demo</a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-3 space-y-2 bg-gray-50">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 border-b border-gray-200 hover:underline"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
