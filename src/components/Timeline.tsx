import { motion, useScroll, useTransform } from "framer-motion";
import { Plane, Map, Mountain, Palmtree, Compass } from "lucide-react";
import itineraryBg from "@/assets/itinerary-bg.jpg";
import { useRef } from "react";

const days = [
  { day: 1, title: "Arrival & Welcome", description: "Transfer to your luxury hotel. Enjoy a welcome dinner and cultural introduction to the local heritage.", icon: Plane },
  { day: 2, title: "Historical Exploration", description: "Guided tour of iconic historical landmarks and architectural wonders. Gourmet lunch featuring local delicacies.", icon: Map },
  { day: 3, title: "Nature & Adventure", description: "Full-day exploration of natural wonders. Options for light treks, scenic walks, and local market experiences.", icon: Mountain },
  { day: 4, title: "Relaxation & Farewell", description: "Relax by the coast or in a serene environment. Private sunset experience followed by a grand farewell celebration.", icon: Palmtree },
];

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-hero-dark" id="itinerary">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 scale-110">
        <img src={itineraryBg} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-hero-dark via-transparent to-hero-dark" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="bg-primary/20 p-4 rounded-full border border-primary/30"
            >
              <Compass className="text-primary w-8 h-8" />
            </motion.div>
          </div>
          <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4">The Grand Plan</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white">Travel Itinerary</h2>
        </motion.div>

        <div className="relative">
          {/* Animated Central Line */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-teal to-primary/10 md:-translate-x-1/2 origin-top rounded-full hidden md:block"
          />

          <div className="space-y-24">
            {days.map((d, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={d.day} className={`relative flex flex-col md:flex-row items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                    className={`ml-16 md:ml-0 md:w-[45%] ${isLeft ? "md:text-right" : "md:text-left"}`}
                  >
                    <div className="group relative">
                      {/* Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-teal/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />

                      <div className="relative bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border border-white/10 shadow-2xl overflow-hidden">
                        <div className={`absolute top-0 w-24 h-1 bg-primary ${isLeft ? "right-0" : "left-0"}`} />
                        <p className="text-primary font-bold text-xs mb-3 tracking-[0.2em] uppercase">Day {d.day}</p>
                        <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{d.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed font-body group-hover:text-white/80 transition-colors">{d.description}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Icon Circle */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-hero-dark border-2 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.3)] z-10 group"
                  >
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <d.icon size={24} className="text-primary group-hover:text-white transition-colors relative z-10" />
                  </motion.div>

                  <div className="hidden md:block md:w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
