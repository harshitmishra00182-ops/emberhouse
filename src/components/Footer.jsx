import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left side - Logo + Socials */}
          <div className="lg:col-span-3">
            <Link to="/" className="inline-block mb-8">
              <span className="text-3xl font-black tracking-tighter">
                EMBER HOUSE
              </span>
            </Link>

            <div className="flex gap-5 text-white/70">
              {/* Facebook */}
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Center - Big text */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center relative">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none text-amber-500 select-none">
              EAT.
              <br />
              FIRE.
              <br />
              REPEAT.
            </h2>
            
            {/* Decorative doodles */}
            <div className="absolute -top-4 -right-4 text-white/20 text-4xl">★</div>
            <div className="absolute bottom-8 -left-6 text-white/20 text-3xl">✦</div>
          </div>

          {/* Right side - Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-10">
            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-5">
                Menu
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/" className="hover:text-amber-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/populars" className="hover:text-amber-400 transition-colors">
                    Populars
                  </Link>
                </li>
                <li>
                  <a href="/#menu" className="hover:text-amber-400 transition-colors">
                    Full Menu
                  </a>
                </li>
                <li>
                  <a href="/#reserve" className="hover:text-amber-400 transition-colors">
                    Book a Table
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-amber-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Gift Cards
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Brand cards row */}
        <div className="mt-20 flex flex-wrap justify-center gap-4">
          <div className="border border-white/20 rounded-xl px-8 py-4 text-center min-w-[160px] hover:border-amber-500/50 transition-colors">
            <div className="text-xs tracking-widest text-white/50 mb-1">EMBER</div>
            <div className="font-bold text-lg">Burgers</div>
          </div>
          <div className="border border-white/20 rounded-xl px-8 py-4 text-center min-w-[160px] hover:border-amber-500/50 transition-colors">
            <div className="text-xs tracking-widest text-white/50 mb-1">EMBER</div>
            <div className="font-bold text-lg">Brunch</div>
          </div>
          <div className="border border-white/20 rounded-xl px-8 py-4 text-center min-w-[160px] hover:border-amber-500/50 transition-colors">
            <div className="text-xs tracking-widest text-white/50 mb-1">EMBER</div>
            <div className="font-bold text-lg">Fire Kitchen</div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Ember House. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}