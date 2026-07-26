import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { GlowEffect } from "./ui/glow-effect";

export default function FoodCard({ image, title, price, description, onAdd }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.015,
      transformPerspective: 900,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <div className="relative group h-full">
      {/* Glow that appears on hover */}
      <div className="absolute -inset-[2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none z-0">
        <GlowEffect
          colors={["#F59E0B", "#EF4444", "#F97316", "#FBBF24"]}
          mode="rotate"
          blur="medium"
          duration={4}
          scale={1.05}
        />
      </div>

      {/* Actual card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 1, y: 0 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="relative z-10 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 will-change-transform h-full flex flex-col"
      >
        {/* Image */}
        <div className="w-full h-44 overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="text-base font-bold text-[#1f1f1f] leading-tight">
              {title}
            </h3>
            <span className="text-base font-semibold text-amber-700 whitespace-nowrap">
              {price}
            </span>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3 flex-grow">
            {description}
          </p>

          <button
  onClick={() =>
    onAdd({
      id: title,               // temporary (better if you pass real id)
      name: title,
      price: price,
      image: image,
    })
  }
  className="w-full mt-4 bg-[#1f1f1f] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-amber-600 transition-colors"
>
  Add to Cart
</button>
        </div>
      </motion.div>
    </div>
  );
}