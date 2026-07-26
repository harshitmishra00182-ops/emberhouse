import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  placeOrder,
}) {
  const [step, setStep] = useState("cart"); 
  const [orderTotal, setOrderTotal] = useState(0);   // ← add this// cart | qr | verifying | success
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
    return sum + price * item.quantity;
  }, 0);

  const upiLink = `upi://pay?pa=emberhouse@upi&pn=Ember%20House&am=${total.toFixed(
    2
  )}&cu=INR&tn=Food%20Order`;

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setStep("qr");
  };

  const handlePaymentDone = () => {
  setStep("verifying");

  setTimeout(() => {
    const totalPaid = placeOrder();   // get the returned total
    setOrderTotal(totalPaid || total);
    setStep("success");
  }, 3500);
};

  const handleTrackOrder = () => {
    setStep("cart");
    onClose();
    navigate("/orders");
  };

  const handleClose = () => {
    setStep("cart");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#faf8f5] z-[70] shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <h2 className="text-xl font-bold text-[#1f1f1f]">
            {step === "cart" && "Your Cart"}
            {step === "qr" && "Scan to Pay"}
            {step === "verifying" && "Verifying..."}
            {step === "success" && "Payment Successful"}
          </h2>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full hover:bg-black/5 flex items-center justify-center text-xl"
          >
            ×
          </button>
        </div>

        {/* ========== CART ========== */}
        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#888]">
                  <p className="text-lg mb-2">Your cart is empty</p>
                  <p className="text-sm">Add something delicious 🔥</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover bg-gray-100"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-[#1f1f1f]">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#999] hover:text-red-500 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-amber-600 font-medium mt-1">
                          {item.price}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-black/10 px-6 py-5 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-600">₹{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#1f1f1f] text-white py-4 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
                >
                  Pay with UPI QR • ₹{total.toFixed(2)}
                </button>
              </div>
            )}
          </>
        )}

        {/* ========== QR ========== */}
        {step === "qr" && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <p className="text-[#666] mb-6">
              Scan this QR with any UPI app
              <br />
              (GPay • PhonePe • Paytm)
            </p>

            <div className="bg-white p-4 rounded-2xl shadow-md">
              <QRCode value={upiLink} size={220} />
            </div>

            <p className="mt-6 text-3xl font-bold text-amber-600">
              ₹{total.toFixed(2)}
            </p>
            <p className="text-sm text-[#888] mt-1">Ember House</p>

            <p className="mt-8 text-sm text-[#666] max-w-xs">
              After completing the payment in your UPI app, come back and click
              the button below.
            </p>

            <button
              onClick={handlePaymentDone}
              className="mt-6 w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              I have completed the payment
            </button>

            <button
              onClick={() => setStep("cart")}
              className="mt-4 text-sm text-[#666] hover:text-black"
            >
              ← Back to Cart
            </button>
          </div>
        )}

        {/* ========== VERIFYING ========== */}
        {step === "verifying" && (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-[#1f1f1f] mb-2">
              Verifying Payment...
            </h3>
            <p className="text-[#666] text-sm">
              Please wait while we confirm your UPI payment
            </p>
          </div>
        )}

        {/* ========== SUCCESS ========== */}
{step === "success" && (
  <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
      <svg
        className="w-10 h-10 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>

    <h3 className="text-2xl font-bold text-[#1f1f1f] mb-2">
      Payment Successful!
    </h3>
    <p className="text-[#666] mb-8">Your order has been confirmed</p>

    <div className="w-full bg-white rounded-2xl border border-black/5 p-5 text-left mb-8">
      <div className="flex justify-between mb-3">
        <span className="text-[#888]">Estimated Delivery</span>
        <span className="font-semibold text-amber-600">30-40 mins</span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="text-[#888]">Order Total</span>
        <span className="font-semibold">₹{orderTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[#888]">Status</span>
        <span className="font-semibold text-green-600">Preparing</span>
      </div>
    </div>

    <button
      onClick={handleTrackOrder}
      className="w-full bg-[#1f1f1f] text-white py-4 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
    >
      Track Order
    </button>
  </div>
)}
      </div>
    </>
  );
}