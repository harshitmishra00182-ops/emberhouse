import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.style.cursor = "none";

    const move = (e) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const grow = () => {
      gsap.to(dot, { scale: 0.4, duration: 0.25 });
      gsap.to(ring, { scale: 2.2, duration: 0.25 });
    };

    const shrink = () => {
      gsap.to(dot, { scale: 1, duration: 0.25 });
      gsap.to(ring, { scale: 1, duration: 0.25 });
    };

    window.addEventListener("mousemove", move);

    const targets = document.querySelectorAll("button, a, .group");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", move);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      {/* Small solid amber dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-amber-600 pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Soft outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-amber-600/50 pointer-events-none z-[9998]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}