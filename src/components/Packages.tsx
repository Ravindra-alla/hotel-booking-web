import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Check, X, CreditCard, CheckCircle, Sparkles } from "lucide-react";
import pkgBg from "@/assets/itinerary-bg.jpg";

const packages = [
  {
    name: "Royal Rajasthan Heritage",
    duration: "5 Days",
    price: "₹32,999",
    rating: 4.9,
    highlights: ["Palace Stay in Udaipur", "Desert Safari Jaisalmer", "Amber Fort Jaipur", "Traditional Rajasthani Dinner"],
    accent: "from-primary to-gold-glow",
    resort: "Taj Lake Palace, Udaipur",
  },
  {
    name: "Himalayan Explorer",
    duration: "8 Days",
    price: "₹45,999",
    rating: 4.8,
    highlights: ["Manali Valley Trek", "Rohtang Pass Visit", "Shimla Heritage Walk", "Kullu River Rafting"],
    accent: "from-teal to-teal-light",
    featured: true,
    resort: "The Himalayan Resort & Spa, Manali",
  },
  {
    name: "Kerala Backwater Bliss",
    duration: "6 Days",
    price: "₹28,499",
    rating: 4.7,
    highlights: ["Houseboat Cruise Alleppey", "Munnar Tea Gardens", "Kathakali Show", "Ayurvedic Spa Day"],
    accent: "from-primary to-teal",
    resort: "Kumarakom Lake Resort, Kerala",
  },
];

const BookingModal = ({ pkg, onClose }: { pkg: typeof packages[0]; onClose: () => void }) => {
  const [step, setStep] = useState<"payment" | "success">("payment");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hero-dark/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
        className="bg-card rounded-[3rem] max-w-md w-full shadow-2xl overflow-hidden border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {step === "payment" ? (
          <div className="p-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[10px] text-primary uppercase tracking-[0.3em] font-bold mb-2"
                >
                  Confirm Reservation
                </motion.p>
                <h3 className="font-display text-2xl font-bold text-card-foreground">{pkg.name}</h3>
              </div>
              <button onClick={onClose} className="bg-muted p-2 rounded-full text-muted-foreground hover:text-card-foreground transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="bg-warm-gray rounded-3xl p-6 mb-8 border border-border/50">
              <div className="space-y-3">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground font-medium">Duration</span><span className="font-bold text-card-foreground">{pkg.duration}</span></div>
                <div className="flex justify-between text-xs border-t border-border/40 pt-3"><span className="text-muted-foreground font-medium">Ultra Resort</span><span className="font-bold text-card-foreground text-right max-w-[150px]">{pkg.resort}</span></div>
                <div className="flex justify-between text-xs border-t border-border/40 pt-3"><span className="text-muted-foreground font-medium">Privilege Level</span><span className="font-bold text-primary">All-Inclusive Elite</span></div>
              </div>
              <div className="border-t border-dashed border-border/60 my-5" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-card-foreground uppercase text-[10px] tracking-widest">Grand Total</span>
                <span className="font-bold text-primary text-3xl">{pkg.price}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <input className="w-full bg-muted/60 border border-border/30 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-primary/50 transition-all text-card-foreground" placeholder="Your Full Name" />
              <input className="w-full bg-muted/60 border border-border/30 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-primary/50 transition-all text-card-foreground" placeholder="Email Address" />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep("success")}
              className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-bold font-body flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
            >
              <CreditCard size={18} /> Authorize Booking
            </motion.button>
          </div>
        ) : (
          <div className="p-12 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle size={48} className="text-primary" />
            </motion.div>
            <h3 className="font-display text-3xl font-bold text-card-foreground mb-4">It's Official!</h3>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Your luxury escape to <span className="text-card-foreground font-bold">{pkg.resort}</span> is secured.
              Get ready for the journey of a lifetime.
            </p>
            <div className="bg-primary/5 rounded-2xl p-4 mb-10 text-xs font-mono text-primary flex justify-between">
              <span>TRIP_REF</span>
              <span className="font-bold">#LX-{Math.floor(Math.random() * 900000 + 100000)}</span>
            </div>
            <button onClick={onClose} className="w-full h-12 bg-hero-dark text-white rounded-xl font-bold text-sm tracking-widest">DISMISS</button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Packages = () => {
  const [booking, setBooking] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-white" id="packages">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <img src={pkgBg} alt="" className="w-full h-full object-cover opacity-[0.03]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-primary/10 p-3 rounded-full">
              <Sparkles className="text-primary w-6 h-6" />
            </div>
          </motion.div>
          <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Elite Tiers</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">Premium Travel Packages</h2>
          <div className="w-12 h-1 bg-primary/20 mx-auto mt-8 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 items-stretch">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-[3rem] overflow-hidden transition-all duration-500 group flex flex-col ${pkg.featured
                ? "bg-hero-dark text-hero-dark-foreground shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] scale-105"
                : "bg-card text-card-foreground shadow-xl border border-border/40"
                }`}
            >
              {/* Dynamic Accent Bar */}
              <div className={`h-2.5 w-full bg-gradient-to-r ${pkg.accent} animate-pulse`} />

              {pkg.featured && (
                <div className="absolute top-8 right-8 bg-primary text-primary-foreground text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  Most Coveted
                </div>
              )}

              <div className="p-10 flex-grow flex flex-col">
                <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-4 ${pkg.featured ? "text-primary/90" : "text-muted-foreground"}`}>
                  {pkg.duration} EXPERIENCE
                </p>
                <h3 className="font-display text-2xl font-bold mb-6 group-hover:text-primary transition-colors leading-tight">
                  {pkg.name}
                </h3>

                <div className="flex items-center gap-1 mb-8">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="text-primary fill-primary" />
                  ))}
                  <span className="text-xs ml-2 font-bold opacity-60 italic">{pkg.rating} Rating</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {pkg.highlights.map((h) => (
                    <motion.li
                      key={h}
                      className="flex items-start gap-4 text-sm"
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${pkg.featured ? "bg-primary/20" : "bg-primary/10"}`}>
                        <Check size={12} className="text-primary" />
                      </div>
                      <span className="leading-snug">{h}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto space-y-6 pt-10 border-t border-white/10">
                  <div className="flex flex-col">
                    <p className={`text-[9px] uppercase font-bold tracking-widest mb-1 ${pkg.featured ? "text-white/40" : "text-muted-foreground/50"}`}>
                      All-Inclusive
                    </p>
                    <p className="text-4xl font-display font-bold text-gradient-gold">
                      {pkg.price}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setBooking(i)}
                    className={`w-full h-14 rounded-2xl font-bold font-body text-xs tracking-[0.2em] uppercase transition-all duration-300 ${pkg.featured
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-muted text-card-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                  >
                    Curate My Trip
                  </motion.button>

                  <p className={`text-center text-[10px] italic ${pkg.featured ? "text-white/30" : "text-muted-foreground/40"}`}>
                    *Limited availability for seasonal windows
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {booking !== null && <BookingModal pkg={packages[booking]} onClose={() => setBooking(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Packages;
