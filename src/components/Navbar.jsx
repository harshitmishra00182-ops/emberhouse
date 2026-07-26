import { Link, useLocation } from "react-router-dom";
import EmberLogo from "../assets/logo/ember-house-logo.svg?react";
import { GlowEffect } from "./ui/glow-effect";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const navLinks = [
  { to: "/#menu", label: "Menu" },
  { to: "/populars", label: "Populars" },
  { to: "/orders", label: "Your Orders" },
  { to: "/reserve", label: "Book a Table" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ loading, cartCount = 0, onCartClick }) {
  const location = useLocation();
  const badgeRef = useRef(null);
  const prevCount = useRef(cartCount);

  // Bounce the cart badge when count increases
  useEffect(() => {
    if (cartCount > prevCount.current && badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.5 },
        { scale: 1, duration: 0.45, ease: "back.out(2)" }
      );
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  const isActive = (to) => {
    if (to === "/#menu") return location.pathname === "/" || location.hash === "#menu";
    return location.pathname === to;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-[#faf8f5]/85 backdrop-blur-md border-b border-black/5">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2.5 transition-opacity duration-300"
        style={{ opacity: loading ? 0 : 1 }}
      >
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
          <EmberLogo className="w-full h-full" />
        </div>
        <span className="text-[17px] font-bold text-[#1f1f1f] tracking-tight">
          Ember House
        </span>
      </Link>

      {/* Links + Cart */}
      <div className="flex items-center gap-1 h-full">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`relative px-4 py-1.5 text-[15px] font-medium transition-colors ${
              isActive(link.to) ? "text-[#1f1f1f]" : "text-[#1f1f1f]/80 hover:text-[#1f1f1f]"
            }`}
          >
            {isActive(link.to) && (
              <span className="absolute inset-0 rounded-full bg-amber-100/80 -z-10" />
            )}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
              <GlowEffect
                colors={["#F59E0B", "#EF4444", "#F97316", "#FBBF24"]}
                mode="rotate"
                blur="soft"
                duration={4}
                scale={1.1}
              />
            </div>
            <span className="relative z-10">{link.label}</span>
          </Link>
        ))}

        {/* Cart */}
        <button
          id="navbar-cart"
          onClick={onCartClick}
          className="relative p-2.5 rounded-full hover:bg-black/5 transition-colors ml-3"
          aria-label="Cart"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>

          {cartCount > 0 && (
            <span
              ref={badgeRef}
              id="cart-badge"
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-amber-600 text-white text-[11px] font-bold"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}