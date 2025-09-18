"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons
import { AnimatedScope } from "./AnimatedScope";
import { MotionScopeMath } from "./MotionPlayground";
import { TransitionLink } from "./TransitionProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Portfolio" },
    { href: "/shadowfun", label: "Shadow Fun" },
    { href: "/responsive-grid", label: "Responsive Grid" },
    { href: "/spacing", label: "Spacing" },
    { href: "/playground", label: "Play Ground" },
    { href: "/terms-policy", label: "policy" },
  ];

  return (
    <nav className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-6xl font-normal text-[#335f33] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="text-xl text-[#915333] font-bold">
          My Demo
        </a>

        {/* Desktop Links */}
        <div className=" hidden  nav w-[80%] md:flex ">
          <AnimatedScope
            className=" flex justify-end gap-6 w-full "
            animation="fadeUp"
            stagger={0.2}
          >
            {/* <MotionScopeMath pattern="breath" > */}

            {links.map((link) => (
              <a key={link.href} href={link.href} className="  hover:underline">
                {link.label}
              </a>
            ))}
            {/* </MotionScopeMath> */}
          </AnimatedScope>
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
        <div className="flex z-11 flex-col gap-6 md:hidden px-4 py-2">
          <AnimatedScope className="z-11" animation="fadeIn" stagger={0.2}>
            {links.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="hover:underline"
              >
                {link.label}
              </TransitionLink>
            ))}
          </AnimatedScope>
        </div>
      )}
    </nav>
  );
}
