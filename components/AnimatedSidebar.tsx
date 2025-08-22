"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function AnimatedSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      {/* Toggle button (always visible) */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 m-2 bg-gray-800 text-white rounded-md z-50"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* --------- Desktop Sidebar (md+) --------- */}
      <motion.aside
        animate={{ width: open ? 240 : 64 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex h-screen bg-gray-900 text-white flex-col overflow-hidden"
      >
        <div className="p-4 font-bold border-b border-gray-700">Logo</div>

        <nav className="flex-1">
          {["Dashboard", "Projects", "Settings"].map((item, i) => (
            <motion.div
              key={item}
              className="flex items-center px-4 py-3 hover:bg-gray-800 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: open ? 1 : 0 }}
              transition={{ delay: open ? i * 0.05 : 0 }}
            >
              <span className="mr-3 w-5 h-5 rounded bg-gray-500" />
              {open && <span>{item}</span>}
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      {/* --------- Mobile Drawer (<md) --------- */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer itself */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white flex flex-col z-50 md:hidden"
            >
              <div className="p-4 font-bold border-b border-gray-700">
                Logo
              </div>

              <nav className="flex-1">
                {["Dashboard", "Projects", "Settings"].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center px-4 py-3 hover:bg-gray-800 cursor-pointer"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="mr-3 w-5 h-5 rounded bg-gray-500" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
