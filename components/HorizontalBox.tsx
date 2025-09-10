"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalBox({
  children,
  width = "50vw",
  height = "50vh",
  debug = false, // show gsap markers
}: {
  children: React.ReactNode;
  width?: string;
  height?: string;
  debug?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const parentWidth = section.clientWidth;
    const totalWidth = track.scrollWidth;
    const scrollDistance = totalWidth -parentWidth ;
    if (scrollDistance <= 0) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 20%", // parent pins when reaching viewport center
          end: () => `+=${scrollDistance}`, // scroll until last child fully enters
        // end: "top bottom", // scroll until last child fully enters
          scrub: true,
          pin: true,
          anticipatePin: 1,
          markers: debug, // show start/end markers
        },
      });
    }, section);

    return () => ctx.revert();
  }, [debug]);

  return (
    <section
      ref={sectionRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // viewport-sized container
      }}
    >
      <div
        style={{
          width,
          height,
          overflow: "hidden",
          position: "relative",
          border: "2px solid #333",
          borderRadius: "1rem",
          background: "#fafafa",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            height: "100%",
            width: "max-content",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
