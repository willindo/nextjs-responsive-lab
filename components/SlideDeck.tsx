// app/page.tsx (Next.js 13+ App Router)
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Observer, ScrollTrigger);

const slides = [
  {
    heading: "SCROLL",
    img: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=800&q=80",
    bg: "bg-[#6d597a]",
  },
  {
    heading: "SWIPE",
    img: "https://images.unsplash.com/photo-1558603668-6570496b66f8?w=800&q=85",
    bg: "bg-[#355070]",
  },
  {
    heading: "SCROLL",
    img: "https://images.unsplash.com/photo-1537165924986-cc3568f5d454?w=800&q=85",
    bg: "bg-[#b56576]",
  },
  {
    heading: "SWIPE",
    img: "https://images.unsplash.com/photo-1589271243958-d61e12b61b97?w=800&q=80",
    bg: "bg-[#9a8c98]",
  },
];

export default function Home() {
  const countRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".slide");
    const images = gsap.utils.toArray<HTMLElement>(".image").reverse();
    const slideImages = gsap.utils.toArray<HTMLElement>(".slide-img");
    const outerWrappers = gsap.utils.toArray<HTMLElement>(".slide-outer");
    const innerWrappers = gsap.utils.toArray<HTMLElement>(".slide-inner");

    const wrap = gsap.utils.wrap(0, sections.length);
    let currentIndex = 0;
    let animating = false;

    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set(".slide:nth-of-type(1) .slide-outer", { xPercent: 0 });
    gsap.set(".slide:nth-of-type(1) .slide-inner", { xPercent: 0 });

    function gotoSection(index: number, direction: number) {
      animating = true;
      index = wrap(index);

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "expo.inOut" },
        onComplete: () => { animating = false; },
      });

      const currentSection = sections[currentIndex];
      const heading = currentSection.querySelector(".slide-heading");
      const nextSection = sections[index];
      const nextHeading = nextSection?.querySelector(".slide-heading");

      gsap.set([sections, images], { zIndex: 0, autoAlpha: 0 });
      gsap.set([sections[currentIndex], images[index]], {
        zIndex: 1,
        autoAlpha: 1,
      });
      gsap.set([sections[index], images[currentIndex]], {
        zIndex: 2,
        autoAlpha: 1,
      });

      tl.set(countRef.current, { textContent: index + 1 }, 0.32)
        .fromTo(
          outerWrappers[index],
          { xPercent: 100 * direction },
          { xPercent: 0 },
          0
        )
        .fromTo(
          innerWrappers[index],
          { xPercent: -100 * direction },
          { xPercent: 0 },
          0
        )
        .to(
          heading,
          { "--width": 800, xPercent: 30 * direction } as any,
          0
        )
        .fromTo(
          nextHeading,
          { "--width": 800, xPercent: -30 * direction } as any,
          { "--width": 200, xPercent: 0 } as any,
          0
        )
        .fromTo(
          images[index],
          { xPercent: 125 * direction, scaleX: 1.5, scaleY: 1.3 },
          { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
          0
        )
        .fromTo(
          images[currentIndex],
          { xPercent: 0, scaleX: 1, scaleY: 1 },
          { xPercent: -125 * direction, scaleX: 1.5, scaleY: 1.3 },
          0
        )
        .fromTo(slideImages[index], { scale: 2 }, { scale: 1 }, 0)
        .timeScale(0.8);

      currentIndex = index;
    }

    Observer.create({
      type: "wheel,touch,pointer",
      preventDefault: true,
      wheelSpeed: -1,
      onUp: () => !animating && gotoSection(currentIndex + 1, +1),
      onDown: () => !animating && gotoSection(currentIndex - 1, -1),
      tolerance: 10,
    });

    document.addEventListener("keydown", (e) => {
      if ((e.code === "ArrowUp" || e.code === "ArrowLeft") && !animating) {
        gotoSection(currentIndex - 1, -1);
      }
      if (
        ["ArrowDown", "ArrowRight", "Space", "Enter"].includes(e.code) &&
        !animating
      ) {
        gotoSection(currentIndex + 1, 1);
      }
    });
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#4361ee] text-white font-sora">
      {/* Slides */}
      {slides.map((s, i) => (
        <section
          key={i}
          className={`slide fixed inset-0 invisible first:visible`}
        >
          <div className="slide-outer w-full h-full overflow-hidden">
            <div className="slide-inner w-full h-full overflow-hidden">
              <div
                className={`slide-content absolute inset-0 flex items-center justify-center ${s.bg}`}
              >
                <div className="slide-container relative grid h-[90vh] w-screen max-w-[1400px] grid-cols-10 grid-rows-10 gap-0 px-4 md:px-12 md:mt-[10vh] md:h-[80vh] mb-[10vh] mx-auto">
                  <h2 className="slide-heading z-[999] col-span-8 row-start-2 self-end font-bold text-[clamp(5rem,15vw,15rem)]  text-[#f2f1fc] mix-blend-difference [font-variation-settings:'wdth'_200] md:col-span-9 md:row-start-1 md:row-end-4">
                    {s.heading}
                  </h2>
                  <figure className="slide-img-cont col-span-7 row-span-5 row-start-2 mt-16 md:mt-0 md:col-span-5 md:row-start-3 md:row-end-8 overflow-hidden">
                    <img
                      className="slide-img h-full w-full object-cover"
                      src={s.img}
                      alt=""
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Overlay */}
      <section className="overlay fixed inset-0 z-10">
        <div className="overlay-content mx-auto mb-[10vh] grid h-[90vh] w-screen max-w-[1400px] grid-cols-10 grid-rows-10 gap-0 px-4 md:px-12 md:mt-[10vh] md:h-[80vh]">
          <p className="overlay-count col-start-10 row-start-3 border-b-4 border-white text-right text-[clamp(3rem,4vw,15rem)]">
            0<span ref={countRef}>1</span>
          </p>
          <figure className="overlay-img-cont relative col-start-3 row-start-4 col-end-11 row-end-9 md:col-start-4 md:row-start-5 md:row-end-10 overflow-hidden">
            {[
              "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80",
              "https://images.unsplash.com/photo-1594666757003-3ee20de41568?w=800&q=80",
              "https://images.unsplash.com/photo-1579830341096-05f2f31b8259?w=800&q=80",
              "https://images.unsplash.com/photo-1603771628302-c32c88e568e3?w=800&q=80",
            ].map((src, i) => (
              <img
                key={i}
                className="image absolute h-full w-full object-cover object-center"
                src={src}
                alt=""
              />
            ))}
          </figure>
        </div>
      </section>

      {/* Footer */}
      <footer className="fixed bottom-0 flex h-28 w-full items-center justify-between px-8 font-sora text-[clamp(1.2rem,2vw,1rem)] z-[999]">
        <a
          href="https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.observe/"
          className="text-white no-underline"
        >
          ScrollTrigger.observe()
        </a>
        <p>GSAP demo</p>
      </footer>
    </main>
  );
}
