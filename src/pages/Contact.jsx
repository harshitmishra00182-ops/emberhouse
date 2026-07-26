import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---- Live open/closed ----
function getOpenStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const isWeekend = day === 5 || day === 6 || day === 0;
  return hour >= 12 && hour < (isWeekend ? 23.5 : 22);
}

// ---- Floating Input ----
function FloatingInput({ label, type = "text", name, value, onChange, required, optional }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <motion.div
      className="relative"
      whileFocus={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full border rounded-2xl px-5 pt-7 pb-3 bg-[#fdfbf7] focus:outline-none transition-all duration-300 ${
          focused
            ? "border-amber-500 ring-4 ring-amber-500/20 shadow-[0_0_0_1px_rgba(245,158,11,0.1)]"
            : "border-black/8 hover:border-black/15"
        }`}
      />
      <label
        className={`absolute left-5 transition-all duration-300 pointer-events-none ${
          focused || hasValue
            ? "top-2.5 text-[11px] text-amber-700 font-semibold tracking-wide"
            : "top-1/2 -translate-y-1/2 text-[#999] text-[15px]"
        }`}
      >
        {label} {optional && <span className="text-[#bbb] font-normal">(optional)</span>}
      </label>
      <AnimatePresence>
        {hasValue && !focused && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500 text-sm"
          >
            ✓
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FloatingTextarea({ label, name, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <textarea
        name={name}
        required={required}
        rows={4}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full border rounded-2xl px-5 pt-7 pb-3 bg-[#fdfbf7] resize-none focus:outline-none transition-all duration-300 ${
          focused
            ? "border-amber-500 ring-4 ring-amber-500/20"
            : "border-black/8 hover:border-black/15"
        }`}
      />
      <label
        className={`absolute left-5 transition-all duration-300 pointer-events-none ${
          focused || hasValue
            ? "top-2.5 text-[11px] text-amber-700 font-semibold tracking-wide"
            : "top-6 text-[#999] text-[15px]"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

// ---- Floating ember particles (very reel-friendly) ----
function EmberParticles() {
  const particles = Array.from({ length: 14 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-500/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -120 - Math.random() * 80],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0, 0.7, 0],
            scale: [0.6, 1.2, 0.4],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(getOpenStatus());
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setIsOpen(getOpenStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="min-h-screen bg-[#f5f0e9] pt-24 pb-28 px-5 md:px-8 relative overflow-hidden">
      {/* Warm ambient glows */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[580px] h-[580px] rounded-full bg-gradient-to-br from-amber-300/30 via-orange-200/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -left-32 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-orange-300/20 via-amber-100/15 to-transparent blur-3xl" />

      <EmberParticles />

      {/* Giant background word */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none select-none absolute top-24 left-1/2 -translate-x-1/2 text-[9rem] md:text-[15rem] font-black text-black/[0.03] whitespace-nowrap leading-none tracking-tighter"
      >
        HELLO
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ========== HEADER ========== */}
        <div className="mb-14 md:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-amber-700 font-semibold tracking-[0.25em] uppercase text-[11px] mb-4"
              >
                Get in Touch
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-black text-[#1a1a1a] leading-[0.9] tracking-tight"
              >
                Let’s talk
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                  over coffee
                </span>
              </motion.h1>
            </div>

            {/* Live status — very reel-friendly */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex flex-col items-start lg:items-end gap-3"
            >
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md border border-black/5 rounded-full px-5 py-3 shadow-lg shadow-black/5">
                <span className="relative flex h-3 w-3">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isOpen ? "bg-emerald-400" : "bg-rose-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      isOpen ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  />
                </span>
                <span className="text-sm font-bold text-[#1a1a1a]">
                  {isOpen ? "Kitchen is open" : "Kitchen is closed"}
                </span>
              </div>
              <p className="text-sm text-[#666] max-w-[240px] lg:text-right leading-snug">
                {isOpen
                  ? "We’re live right now — message us or just walk in."
                  : "We’ll reply the moment the kitchen opens."}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ========== LEFT COLUMN ========== */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick actions — perfect for reel hover shots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-2.5"
            >
              {[
                {
                  label: "Call now",
                  href: "tel:+919876543210",
                  primary: true,
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  href: "https://wa.me/919876543210",
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                },
                {
                  label: "Directions",
                  href: "https://maps.google.com/?q=New+Delhi",
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
              ].map((btn) => (
                <motion.a
                  key={btn.label}
                  href={btn.href}
                  target={btn.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full transition-colors ${
                    btn.primary
                      ? "bg-[#1a1a1a] text-white hover:bg-amber-600 shadow-md"
                      : "bg-white border border-black/10 text-[#1a1a1a] hover:border-amber-500 hover:text-amber-700"
                  }`}
                >
                  {btn.icon}
                  {btn.label}
                </motion.a>
              ))}
            </motion.div>

            {/* Info blocks */}
            {[
              {
                title: "Visit Us",
                content: <>123 Ember Street<br />Your City, 00000<br />India</>,
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: "Call Us",
                content: <>+91 98765 43210</>,
                copy: "+919876543210",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
              },
              {
                title: "Email",
                content: <>hello@emberhouse.com</>,
                copy: "hello@emberhouse.com",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Opening Hours",
                content: (
                  <>
                    Mon – Thu: 12:00 PM – 10:00 PM<br />
                    Fri – Sun: 12:00 PM – 11:30 PM
                  </>
                ),
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ x: 6 }}
                className="group flex gap-4 p-4 rounded-2xl bg-white/60 hover:bg-white border border-transparent hover:border-black/5 transition-all duration-300 cursor-default"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {block.icon}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#888] mb-1.5">
                    {block.title}
                  </h3>
                  <div className="text-[15px] text-[#1a1a1a] leading-relaxed flex items-start gap-3">
                    <div className="flex-1">{block.content}</div>
                    {block.copy && (
                      <button
                        onClick={() => handleCopy(block.copy, block.title)}
                        className="flex-shrink-0 text-[11px] font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                      >
                        {copied === block.title ? "Copied!" : "Copy"}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl overflow-hidden border border-black/6 shadow-md h-52 md:h-56 relative"
            >
              <iframe
                title="Ember House Location"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
                loading="lazy"
                src="https://maps.google.com/maps?q=New+Delhi&t=&z=14&ie=UTF8&iwloc=&output=embed"
              />
            </motion.div>
          </div>

          {/* ========== RIGHT — FORM ========== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[28px] p-7 md:p-9 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.12)] border border-black/5 relative overflow-hidden">
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-amber-200/40 to-transparent rounded-bl-full pointer-events-none" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, type: "spring" }}
                    className="text-center py-14 px-4"
                  >
                    {/* Fire success icon — great for reels */}
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.1 }}
                      className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-xl shadow-amber-400/40"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-4xl"
                      >
                        🔥
                      </motion.span>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3 tracking-tight"
                    >
                      Message received
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="text-[#666] max-w-sm mx-auto leading-relaxed mb-8"
                    >
                      We’ll get back to you within a few hours while the kitchen is open.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="flex flex-wrap justify-center gap-3"
                    >
                      <a
                        href="tel:+919876543210"
                        className="inline-flex items-center gap-2 text-sm font-semibold bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full hover:bg-amber-600 transition-colors"
                      >
                        Prefer to call?
                      </a>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({ name: "", email: "", phone: "", message: "" });
                        }}
                        className="text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                      >
                        Send another →
                      </button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 relative"
                  >
                    <div className="mb-1">
                      <h2 className="text-xl font-bold text-[#1a1a1a] tracking-tight">
                        Send us a note
                      </h2>
                      <p className="text-sm text-[#777] mt-1">
                        Questions, feedback, group bookings — anything works.
                      </p>
                    </div>

                    <FloatingInput label="Full Name" name="name" required value={form.name} onChange={handleChange} />
                    <FloatingInput label="Email" type="email" name="email" required value={form.email} onChange={handleChange} />
                    <FloatingInput label="Phone" type="tel" name="phone" optional value={form.phone} onChange={handleChange} />
                    <FloatingTextarea label="How can we help?" name="message" required value={form.message} onChange={handleChange} />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full mt-2 relative overflow-hidden bg-[#1a1a1a] text-white font-semibold py-4 rounded-2xl transition-all duration-300 group"
                    >
                      <span className="relative z-10">Send Message</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.button>

                    <p className="text-center text-[12px] text-[#999] pt-1">
                      Average reply time · under 3 hours during open hours
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}