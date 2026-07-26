import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CustomCursor from "./components/CustomCursor";
import Populars from "./components/Populars";
import OrdersPage from "./pages/Orders";
import CartDrawer from "./components/CartDrawer";
import Reserve from "./pages/Reserve";
import Contact from "./pages/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add to cart (NO auto open)
  const handleAddToCart = useCallback((item) => {
    if (!item || !item.id) {
      console.error("Invalid item passed to cart", item);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Real Razorpay payment
  const placeOrder = () => {
  if (cart.length === 0) return;

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
    return sum + price * item.quantity;
  }, 0);

  const newOrder = {
    id: Date.now(),
    items: [...cart],
    total: total,
    date: new Date().toLocaleString(),
    status: "Preparing",
  };

  setOrders((prev) => [newOrder, ...prev]);
  setCart([]);
  
  return total; // ← return the total
};
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <CustomCursor />
      <Navbar
        loading={loading}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route
          path="/populars"
          element={<Populars onAddToCart={handleAddToCart} />}
        />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<OrdersPage orders={orders} />} />
      </Routes>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        placeOrder={placeOrder}
      />

      {loading && <Loader onComplete={() => setLoading(false)} />}
    </BrowserRouter>
  );
}