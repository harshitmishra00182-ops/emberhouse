import { useState } from "react";
import { Link } from "react-router-dom";

export default function Reserve() {
  const [form, setForm] = useState({
    guests: "2",
    date: "",
    time: "19:00",
    name: "",
    phone: "",
    requests: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image - cinematic restaurant */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')",
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left text */}
          <div className="text-white">
            <p className="text-amber-400 tracking-widest text-sm uppercase mb-4">
              Ember House
            </p>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Reserve Your
              <br />
              Table
            </h1>
            <p className="text-white/70 text-lg max-w-md leading-relaxed">
              Experience fire-kissed flavors in an intimate setting.  
              Book your table and let us take care of the rest.
            </p>
          </div>

          {/* Booking Form Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                  Table Reserved!
                </h3>
                <p className="text-[#666] mb-6">
                  We’ve received your request. You’ll get a confirmation shortly.
                </p>
                <Link
                  to="/"
                  className="inline-block bg-[#1f1f1f] text-white px-8 py-3 rounded-xl font-medium hover:bg-amber-600 transition"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#1f1f1f] mb-6">
                  Make a Reservation
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-medium text-[#555] mb-1.5">
                      Number of Guests
                    </label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="w-full border border-black/10 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#555] mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={form.date}
                        onChange={handleChange}
                        className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#555] mb-1.5">
                        Time
                      </label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="21:00">9:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#555] mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-[#555] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-[#555] mb-1.5">
                      Special Requests (optional)
                    </label>
                    <textarea
                      name="requests"
                      value={form.requests}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Birthday, window seat, allergies..."
                      className="w-full border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 rounded-xl transition-colors"
                  >
                    Confirm Reservation
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}