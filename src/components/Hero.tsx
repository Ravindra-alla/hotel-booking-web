import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import indiaHero from "@/assets/india-hero.jpg";
import rajasthanImg from "@/assets/rajasthan.jpg";
import keralaImg from "@/assets/kerala.jpg";
import goaImg from "@/assets/goa.jpg";
import manaliImg from "@/assets/manali.jpg";
import varanasiImg from "@/assets/varanasi.jpg";
import ladakhImg from "@/assets/ladakh.jpg";
import agraImg from "@/assets/agra.jpg";

const destinations = [
  { name: "Rajasthan", image: rajasthanImg, subtitle: "Royal Desert" },
  { name: "Kerala", image: keralaImg, subtitle: "God's Own Country" },
  { name: "Goa", image: goaImg, subtitle: "Beach Paradise" },
  { name: "Manali", image: manaliImg, subtitle: "Mountain Magic" },
  { name: "Varanasi", image: varanasiImg, subtitle: "Spiritual Capital" },
  { name: "Ladakh", image: ladakhImg, subtitle: "Land of Passes" },
  { name: "Agra", image: agraImg, subtitle: "Taj Mahal City" },
];

const Hero = () => {
  const [active, setActive] = useState(3);
  const [paused, setPaused] = useState(false);

  const prev = () => setActive((a) => (a === 0 ? destinations.length - 1 : a - 1));
  const next = () => setActive((a) => (a === destinations.length - 1 ? 0 : a + 1));

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((a) => (a === destinations.length - 1 ? 0 : a + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={indiaHero} alt="Luxury landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-hero-dark/70 via-hero-dark/50 to-hero-dark/80" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div className="glass rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-hero-dark-foreground animate-fade-up leading-tight">
              Explore Premium <br />
              <span className="text-gradient-gold">Destinations</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-hero-dark-foreground/70 font-body animate-fade-up-delay-1 max-w-2xl mx-auto">
              Curated luxury travel experiences across the world's most breathtaking locations
            </p>
          </div>

          <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-3xl mx-auto animate-fade-up-delay-2">
            <div className="flex items-center gap-3 flex-1 px-4 py-3">
              <MapPin className="text-primary shrink-0" size={20} />
              <input type="text" placeholder="Where do you want to explore?" className="bg-transparent text-hero-dark-foreground placeholder:text-hero-dark-foreground/40 outline-none w-full font-body" />
            </div>
            <button className="glow-button bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold font-body flex items-center gap-2 justify-center">
              <Search size={18} /> Explore
            </button>
          </div>

          <div className="mt-12 animate-fade-up-delay-3" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="flex items-center justify-center gap-4">
              <button onClick={prev} className="glass-card rounded-full p-2 text-hero-dark-foreground/70 hover:text-primary transition-colors shrink-0">
                <ChevronLeft size={24} />
              </button>

              <div className="flex items-center overflow-hidden max-w-full">
                <div className="flex items-center gap-4 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  style={{ transform: `translateX(calc(50% - ${active * (window.innerWidth >= 768 ? 152 : 112)}px - ${window.innerWidth >= 768 ? 96 : 80}px))` }}>
                  {destinations.map((d, i) => {
                    const isActive = i === active;
                    return (
                      <button key={d.name} onClick={() => setActive(i)}
                        className={`relative shrink-0 rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isActive ? "w-40 h-52 md:w-48 md:h-60 scale-100" : "w-24 h-36 md:w-32 md:h-44 opacity-60 scale-95"}`}>
                        <img src={d.image} alt={d.name} className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? "scale-110" : "scale-100"}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-hero-dark/80 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-left">
                          <p className="text-hero-dark-foreground font-display font-semibold text-sm">{d.name}</p>
                          {isActive && <p className="text-hero-dark-foreground/60 text-xs font-body mt-0.5 animate-fade-in">{d.subtitle}</p>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button onClick={next} className="glass-card rounded-full p-2 text-hero-dark-foreground/70 hover:text-primary transition-colors shrink-0">
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {destinations.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${i === active ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-hero-dark-foreground/30"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
