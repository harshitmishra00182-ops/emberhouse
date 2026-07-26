import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function KineticWelcome() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big text horizontal scrub
      gsap.to(textRef.current, {
        xPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          scrub: 1.2,
          pin: true,
        },
      });

      // Subtle fade of bottom label
      gsap.to(labelRef.current, {
        opacity: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=50%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#1a1a1a] flex items-center"
    >
      {/* Repeating pattern */}
      <div className="absolute inset-0 opacity-[0.06] select-none pointer-events-none overflow-hidden">
        <div className="absolute inset-0 flex flex-wrap gap-10 justify-center content-center text-[#faf8f5] text-5xl font-bold tracking-[0.3em]">
          {Array.from({ length: 90 }).map((_, i) => (
            <span key={i}>EMBER</span>
          ))}
        </div>
      </div>

      {/* Kinetic text */}
      <div ref={textRef} className="relative whitespace-nowrap will-change-transform px-8">
        <h2 className="text-[17vw] md:text-[13vw] font-black text-[#faf8f5] leading-none tracking-tighter">
          WELCOME TO EMBER HOUSE&nbsp;&nbsp;—&nbsp;&nbsp;
        </h2>
      </div>

      {/* Scroll label */}
      <div ref={labelRef} className="absolute bottom-12 left-0 right-0 text-center">
        <p className="text-[#faf8f5]/60 text-sm tracking-[0.35em] uppercase">
          Scroll to enter
        </p>
      </div>
    </section>
  );
}