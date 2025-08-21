'use client'
import { motion } from "framer-motion";
import HorizontalSection from "./HorizontalSection";

export default function Horiz() {
  return (
    <main>
      <div style={{ height: "100vh", width: "100vw", background: "#eee" }}>
        Normal vertical section
      </div>
      <div className="  mx-auto overflow-hidden">
        <HorizontalSection>
          <div style={{ flex: "0 0 100vw", background: "tomato" }}>One</div>
          <div style={{ flex: "0 0 100vw", background: "skyblue" }}>Two</div>
          <div style={{ flex: "0 0 100vw", background: "limegreen" }}>
            Three
          </div>
        </HorizontalSection>
      </div>
     

      <div style={{ height: "100vh", background: "#ccc" }}>
        Vertical continues after horizontal
      </div>
    </main>
  );
}
