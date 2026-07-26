import { useEffect, useRef } from "react";
import gsap from "gsap";
import EmberLogo from "../assets/logo/ember-house-logo.svg?react";

export default function Loader({ onComplete }) {
  const overlayRef = useRef(null);
  const groupRef = useRef(null);
  const logoWrapRef = useRef(null);
  const percentRef = useRef(null);
  const wavePathRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const logoSize = isMobile ? 110 : 170;

    // Start centered
    gsap.set(groupRef.current, {
      position: "fixed",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      zIndex: 100,
    });

    gsap.set(logoWrapRef.current, {
      width: logoSize,
      height: logoSize,
    });

    gsap.set(wavePathRef.current, {
      attr: { d: "M0 200 Q 150 200 300 200 T 600 200 V 200 H 0 Z" },
    });

    // Gentle floating
    const logoFloat = gsap.to(logoWrapRef.current, {
      y: isMobile ? -8 : -12,
      scale: 1.04,
      duration: 1.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const tl = gsap.timeline();

    // 1. Wave fill 0 → 100
    tl.to(
      { value: 0 },
      {
        value: 100,
        duration: 2.6,
        ease: "power2.inOut",
        onUpdate: function () {
          const val = Math.round(this.targets()[0].value);

          // Update text directly (no React re-render)
          if (percentRef.current) {
            percentRef.current.textContent = `loading... ${val}%`;
          }

          const y = 200 - (val / 100) * 200;
          const d = `M0 ${y + 18} Q 100 ${y - 18} 200 ${y + 18} T 400 ${y + 18} T 600 ${y + 18} V 200 H 0 Z`;
          gsap.set(wavePathRef.current, { attr: { d } });
        },
      }
    );

    // 2. Hide percentage
    tl.to(percentRef.current, { opacity: 0, duration: 0.12 }, "-=0.05");

    // 3. Kill float + clean
    tl.add(() => {
      logoFloat.kill();
      gsap.killTweensOf(logoWrapRef.current);
      gsap.set(logoWrapRef.current, {
        y: 0,
        scale: 1,
        clearProps: "transform",
      });

      const filledText = document.querySelector("#ember-text-svg text:last-child");
      if (filledText) filledText.removeAttribute("clip-path");
    });

    // 4. Instant hide (no long fade)
    tl.set([overlayRef.current, groupRef.current], {
      opacity: 0,
      visibility: "hidden",
      pointerEvents: "none",
    });

    // 5. Tiny tick then unmount
    tl.to({}, {
      duration: 0.01,
      onComplete: () => onComplete?.(),
    });

    return () => {
      logoFloat.kill();
      tl.kill();
    };
  }, [onComplete]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] pointer-events-none"
        style={{ background: "#faf8f5" }}
      />

      {/* Logo + Text group */}
      <div
        ref={groupRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "28px",
          pointerEvents: "none",
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <div
          ref={logoWrapRef}
          style={{
            overflow: "hidden",
            borderRadius: 20,
            background: "#ffffff",
            flexShrink: 0,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <EmberLogo style={{ width: "100%", height: "100%", display: "block" }} />
        </div>

        {/* Text + percentage */}
        <div style={{ position: "relative" }}>
          <svg
            id="ember-text-svg"
            width="620"
            height="120"
            viewBox="0 0 620 120"
            style={{ overflow: "visible" }}
          >
            <defs>
              <clipPath id="waveClip">
                <path
                  ref={wavePathRef}
                  d="M0 200 Q 150 200 300 200 T 600 200 V 200 H 0 Z"
                />
              </clipPath>
            </defs>

            {/* Gray base */}
            <text
              x="0"
              y="82"
              fontSize="74"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="-1.5"
              fill="#c4c4c4"
            >
              Ember House
            </text>

            {/* Filled text */}
            <text
              x="0"
              y="82"
              fontSize="74"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="-1.5"
              fill="#1f1f1f"
              clipPath="url(#waveClip)"
            >
              Ember House
            </text>
          </svg>

          {/* Percentage */}
          <div
            ref={percentRef}
            style={{
              position: "absolute",
              bottom: -30,
              left: 0,
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#999",
              letterSpacing: "0.04em",
            }}
          >
            loading... 0%
          </div>
        </div>
      </div>
    </>
  );
}