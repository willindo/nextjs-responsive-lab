'use client'
import { motion } from "framer-motion";
import HorizontalSection from "./HorizontalSection";

export default function Horiz() {
  return (
    <main>
      <div className="  mx-auto overflow-hidden">
        <HorizontalSection>
          <div style={{ flex: "0 0 100vw", background: "tomato" }}>One</div>
          <div style={{ flex: "0 0 100vw", background: "skyblue" }}>Two</div>
          <div style={{ flex: "0 0 100vw", background: "limegreen" }}>
            Three
          </div>
        </HorizontalSection>
      </div>
    </main>
  );
}
