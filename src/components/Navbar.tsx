import { useState, useEffect } from "react";
import { Plane, Hotel, ShoppingBag, Globe, Tag, Info, Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const leftLinks = [
    { label: "Flight", icon: Plane },
    { label: "Hotel", icon: Hotel },
    { label: "Shop", icon: ShoppingBag },
  ];
  const rightLinks = [
    { label: "Visa", icon: Globe },
    { label: "Promotion", icon: Tag },
    { label: "About", icon: Info },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-dark py-3" : "py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left links - desktop */}
        <div className="hidden md:flex items-center gap-8">
          {leftLinks.map((l) => (
            <a
              key={l.label}
              href="#"
              className="flex items-center gap-2 text-hero-dark-foreground/80 hover:text-primary transition-colors text-sm font-medium tracking-wide"
            >
              <l.icon size={16} />
              {l.label}
            </a>
          ))}
        </div>

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <Globe className="text-primary" size={28} />
          <span className="font-display text-xl font-bold text-hero-dark-foreground tracking-wider uppercase">
            LuxeTravel
          </span>
        </a>

        {/* Right links - desktop */}
        <div className="hidden md:flex items-center gap-8">
          {rightLinks.map((l) => (
            <a
              key={l.label}
              href="#"
              className="flex items-center gap-2 text-hero-dark-foreground/80 hover:text-primary transition-colors text-sm font-medium tracking-wide"
            >
              <l.icon size={16} />
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-hero-dark-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-dark mt-2 mx-4 rounded-xl p-6 flex flex-col gap-4">
          {[...leftLinks, ...rightLinks].map((l) => (
            <a
              key={l.label}
              href="#"
              className="flex items-center gap-3 text-hero-dark-foreground/80 hover:text-primary transition-colors font-medium"
            >
              <l.icon size={18} />
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
