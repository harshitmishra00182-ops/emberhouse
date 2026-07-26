import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import menuItems from "../data/menuItems";

export default function PopularsPage({ onAddToCart }) {
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredId, setHoveredId] = useState(null);

  const specials = [
    menuItems.find((i) => i.name.includes("Burger")) || menuItems[0],
    menuItems.find((i) => i.name.includes("Avocado") || i.name.includes("Pancakes")) || menuItems[1],
    menuItems.find((i) => i.name.includes("Pizza") || i.category === "Mains") || menuItems[2],
    {
      id: "secret",
      name: "Chef's Secret Plate",
      description: "Unlocked after 8:00pm",
      image: null,
      locked: true,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.children || [], {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.3,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-28 pb-24 px-6 md:px-12">
      {/* Header */}
      <div
        ref={headerRef}
        className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16"
      >
        <div>
          <p className="text-amber-600 text-sm font-semibold tracking-[0.22em] uppercase mb-4">
            Most Loved
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#1f1f1f] leading-[0.9] tracking-tight">
            Tonight’s
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              Specials
            </span>
          </h1>
        </div>

        <p className="max-w-sm text-[#555] text-base leading-relaxed">
          Small plates designed to awaken the senses. Each dish combines warmth,
          contrast, and texture — setting the tone for the meal ahead.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {specials.map((item, index) => {
          const isLocked = item.locked;
          const isHovered = hoveredId === item.id;

          return (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative group"
              onMouseEnter={() => !isLocked && setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`
                  relative aspect-[3/4] rounded-2xl overflow-hidden
                  border transition-all duration-500
                  ${isLocked
                    ? "bg-[#f0ece6] border-[#e5e0d8]"
                    : "bg-white border-[#e8e4de] shadow-sm hover:shadow-xl cursor-pointer"
                  }
                  ${isHovered ? "border-amber-400/70 -translate-y-2" : ""}
                `}
              >
                {!isLocked && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`
                      absolute inset-0 w-full h-full object-cover
                      transition-all duration-700 ease-out
                      ${isHovered ? "opacity-100 scale-110" : "opacity-0 scale-100"}
                    `}
                  />
                )}

                {!isLocked && (
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent
                      transition-opacity duration-500
                      ${isHovered ? "opacity-100" : "opacity-0"}
                    `}
                  />
                )}

                {/* Locked state */}
                {isLocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full border border-amber-500/40 flex items-center justify-center mb-5 bg-amber-50/50">
                      <svg
                        className="w-6 h-6 text-amber-600/80"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs tracking-[0.2em] uppercase text-[#888] mb-1">
                      Unlocked after
                    </p>
                    <p className="text-base font-semibold text-amber-600">
                      8:00 pm
                    </p>
                  </div>
                )}

                {/* Bottom text */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3
                    className={`
                      text-[15px] font-semibold transition-colors duration-300
                      ${isHovered && !isLocked ? "text-white" : "text-[#1f1f1f]"}
                    `}
                  >
                    {item.name}
                  </h3>

                  {!isLocked && (
                    <p
                      className={`
                        text-sm mt-1.5 font-medium transition-all duration-300
                        ${isHovered
                          ? "opacity-100 translate-y-0 text-amber-300"
                          : "opacity-0 translate-y-3 text-[#1f1f1f]"
                        }
                      `}
                    >
                      {item.price}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto mt-16 flex justify-center">
        <a
          href="/#menu"
          className="group flex items-center gap-3 text-sm font-medium tracking-wide text-[#555] hover:text-[#1f1f1f] transition-colors"
        >
          <span>Explore Full Menu</span>
          <span className="w-9 h-9 rounded-full border border-[#ddd] flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-50 transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}