import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const burgerRef = useRef(null);
  const pizzaRef = useRef(null);

  useEffect(() => {
    const words = headingRef.current?.querySelectorAll(".word");
    if (words) {
      gsap.set(words, { opacity: 0, y: 40, filter: "blur(10px)" });
      gsap.to(words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.85,
        stagger: 0.14,
        ease: "power4.out",
        delay: 0.2,
      });
    }

    gsap.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: "power3.out" }
    );

    // Floating idle animation for food characters
    gsap.to(burgerRef.current, {
      y: -8,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(pizzaRef.current, {
      y: -10,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.4,
    });

    // Eyes follow mouse
    const moveEyes = (e) => {
      const look = (el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const dist = Math.min(6, Math.hypot(e.clientX - cx, e.clientY - cy) / 30);

        gsap.to(el.querySelectorAll(".pupil"), {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          duration: 0.25,
          ease: "power2.out",
        });
      };
      look(burgerRef.current);
      look(pizzaRef.current);
    };

    window.addEventListener("mousemove", moveEyes);
    return () => window.removeEventListener("mousemove", moveEyes);
  }, []);

  return (
    <>
      {/* Fixed food characters */}
      <div className="fixed top-24 right-6 z-40 flex flex-col gap-6 pointer-events-none select-none">
        {/* Burger */}
        <div ref={burgerRef} className="relative text-5xl drop-shadow-lg">
          🍔
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-white border border-black/80 flex items-center justify-center">
              <div className="pupil w-1.5 h-1.5 rounded-full bg-black" />
            </div>
            <div className="w-3.5 h-3.5 rounded-full bg-white border border-black/80 flex items-center justify-center">
              <div className="pupil w-1.5 h-1.5 rounded-full bg-black" />
            </div>
          </div>
        </div>

        {/* Pizza */}
        <div ref={pizzaRef} className="relative text-5xl drop-shadow-lg">
          🍕
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-white border border-black/80 flex items-center justify-center">
              <div className="pupil w-1.5 h-1.5 rounded-full bg-black" />
            </div>
            <div className="w-3.5 h-3.5 rounded-full bg-white border border-black/80 flex items-center justify-center">
              <div className="pupil w-1.5 h-1.5 rounded-full bg-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero text */}
      <div className="max-w-6xl mx-auto text-center pt-14 pb-8">
        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl font-black text-[#1f1f1f] mb-4 tracking-tight"
        >
          {"Taste the Ember".split(" ").map((word, i) => (
            <span key={i} className="word inline-block mr-[0.28em] last:mr-0">
              {word}
            </span>
          ))}
        </h1>
        <p ref={subRef} className="text-gray-500 text-lg md:text-xl font-medium">
          Handcrafted dishes, fire-kissed flavors
        </p>
      </div>
    </>
  );
}