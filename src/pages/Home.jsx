import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/Hero";
import FoodCard from "../components/FoodCanvas";
import menuItems from "../data/menuItems";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import KineticWelcome from "../components/KineticWelcome";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home({ onAddToCart }) {
  const menuSectionRef = useRef(null);

  // Group items by category
const categories = {
  Brunch: menuItems.filter((item) => item.category === "Brunch"),
  Burgers: menuItems.filter((item) => item.category === "Burgers"),
  Mains: menuItems.filter((item) => item.category === "Mains"),
  Sides: menuItems.filter((item) => item.category === "Sides"),
  Desserts: menuItems.filter((item) => item.category === "Desserts"),
  Drinks: menuItems.filter((item) => item.category === "Drinks"),
};
  useEffect(() => {
    const cards = menuSectionRef.current?.querySelectorAll(".food-card");
    if (!cards?.length) return;

    // Start invisible
    gsap.set(cards, { opacity: 0, y: 16 });

    ScrollTrigger.batch(cards, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.15,
          stagger: 0.02,
          ease: "power1.out",
          overwrite: true,
        });
      },
      start: "top 99%",
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="min-h-screen pt-24 bg-[#faf8f5]">
      <Hero />

      <KineticWelcome />

      {/* Big image scroll section */}
      <section className="bg-[#faf8f5]">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#1f1f1f]">
                Fire meets flavor
              </h2>
              <p className="text-4xl md:text-[5.5rem] font-bold text-[#1f1f1f] mt-2 leading-none">
                Ember House
              </p>
            </>
          }
        >
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1400&q=80"
            alt="Ember House signature dish"
            className="mx-auto rounded-2xl object-cover h-full w-full object-center"
            draggable={false}
          />
        </ContainerScroll>
      </section>

      {/* ========== MENU SECTION ========== */}
      <section
        id="menu"
        ref={menuSectionRef}
        className="px-4 md:px-8 pb-24"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-3">
              Full Menu
            </p>
            <h2 className="text-5xl md:text-7xl font-black text-[#1f1f1f] leading-none">
              WHAT’S ON
              <br />
              THE FIRE
            </h2>
          </div>

          {/* Categories */}
          {Object.entries(categories).map(([categoryName, items]) => {
            if (items.length === 0) return null;

            return (
              <div key={categoryName} className="mb-20">
                <h3 className="text-3xl md:text-4xl font-black text-[#1f1f1f] mb-8 border-b border-black/10 pb-4">
                  {categoryName}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {items.map((item) => (
                    <div key={item.id} className="food-card">
                      <FoodCard
  key={item.id}
  image={item.image}
  title={item.name}
  price={item.price}
  description={item.description}
  onAdd={() => onAddToCart(item)}   // ← full item object
/>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}