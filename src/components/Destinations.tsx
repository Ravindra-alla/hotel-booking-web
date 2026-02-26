import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Star, ArrowRight, Mountain, Clock, Route, X, Navigation } from "lucide-react";
import rajasthanImg from "@/assets/rajasthan.jpg";
import keralaImg from "@/assets/kerala.jpg";
import goaImg from "@/assets/goa.jpg";
import manaliImg from "@/assets/manali.jpg";
import varanasiImg from "@/assets/varanasi.jpg";
import ladakhImg from "@/assets/ladakh.jpg";
import bgPattern from "@/assets/itinerary-bg.jpg";

const cards = [
  {
    image: rajasthanImg,
    name: "Jaisalmer Desert Safari",
    location: "Jaisalmer, Rajasthan",
    distance: "18.5 km",
    elevation: "225 m",
    duration: "8 hrs",
    difficulty: 55,
    rating: 4.8,
    popular: true,
    route: {
      stops: ["Jaisalmer Fort", "Patwon Ki Haveli", "Gadisar Lake", "Sam Sand Dunes", "Desert Camp"],
      description: "Experience the golden city and its magnificent sand dunes with a camel safari through the Thar Desert.",
      bestTime: "October – March",
      cost: "₹4,500",
    },
  },
  {
    image: keralaImg,
    name: "Alleppey Backwaters Cruise",
    location: "Alleppey, Kerala",
    distance: "32 km",
    elevation: "5 m",
    duration: "Full Day",
    difficulty: 20,
    rating: 4.9,
    popular: true,
    route: {
      stops: ["Alleppey Jetty", "Vembanad Lake", "Kumarakom Bird Sanctuary", "Pathiramanal Island", "Sunset Point"],
      description: "Cruise through serene backwaters on a traditional houseboat, passing lush paddy fields and coconut groves.",
      bestTime: "September – March",
      cost: "₹6,000",
    },
  },
  {
    image: goaImg,
    name: "South Goa Beach Trail",
    location: "Palolem, Goa",
    distance: "14 km",
    elevation: "30 m",
    duration: "5 hrs",
    difficulty: 25,
    rating: 4.7,
    popular: true,
    route: {
      stops: ["Palolem Beach", "Butterfly Beach", "Cola Beach", "Cabo de Rama Fort", "Agonda Beach"],
      description: "Explore Goa's pristine southern beaches, hidden coves, and historic Portuguese fort ruins.",
      bestTime: "November – February",
      cost: "₹2,500",
    },
  },
  {
    image: manaliImg,
    name: "Solang Valley Trek",
    location: "Manali, Himachal Pradesh",
    distance: "22 km",
    elevation: "3,050 m",
    duration: "2 Days",
    difficulty: 70,
    rating: 4.8,
    popular: false,
    route: {
      stops: ["Old Manali", "Solang Valley", "Anjani Mahadev Temple", "Rohtang Pass Viewpoint", "Beas Kund"],
      description: "A stunning Himalayan trek through pine forests, snow-capped peaks, and alpine meadows.",
      bestTime: "May – June, Sept – Oct",
      cost: "₹5,500",
    },
  },
  {
    image: varanasiImg,
    name: "Varanasi Ghat Walk",
    location: "Varanasi, Uttar Pradesh",
    distance: "6 km",
    elevation: "15 m",
    duration: "4 hrs",
    difficulty: 15,
    rating: 4.9,
    popular: true,
    route: {
      stops: ["Assi Ghat", "Dashashwamedh Ghat", "Manikarnika Ghat", "Ganga Aarti", "Kashi Vishwanath Temple"],
      description: "Walk along the ancient ghats of Varanasi, witnessing spiritual rituals and timeless traditions on the Ganges.",
      bestTime: "October – March",
      cost: "₹1,500",
    },
  },
  {
    image: ladakhImg,
    name: "Pangong Lake Expedition",
    location: "Leh, Ladakh",
    distance: "160 km",
    elevation: "4,350 m",
    duration: "3 Days",
    difficulty: 90,
    rating: 4.6,
    popular: false,
    route: {
      stops: ["Leh Town", "Chang La Pass", "Tangste Village", "Pangong Tso Lake", "Spangmik"],
      description: "An epic journey through the highest motorable roads to the mesmerizing color-changing Pangong Lake.",
      bestTime: "June – September",
      cost: "₹8,500",
    },
  },
];

const RouteModal = ({ card, onClose }: { card: typeof cards[0]; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hero-dark/70 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 20, opacity: 0 }}
      className="bg-card rounded-[2.5rem] max-w-lg w-full shadow-2xl overflow-hidden border border-white/20"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative h-64">
        <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-hero-dark/90 via-transparent to-transparent" />
        <button onClick={onClose} className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-2.5 rounded-full hover:bg-white/40 transition-colors">
          <X size={20} className="text-white" />
        </button>
        <div className="absolute bottom-6 left-8">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white font-display text-3xl font-bold"
          >
            {card.name}
          </motion.h3>
          <p className="text-white/80 text-sm flex items-center gap-1 mt-1"><MapPin size={14} /> {card.location}</p>
        </div>
      </div>
      <div className="p-8">
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed bg-muted/50 p-4 rounded-2xl italic">"{card.route.description}"</p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-1">Best Season</p>
            <p className="font-bold text-card-foreground">{card.route.bestTime}</p>
          </div>
          <div className="bg-teal/5 rounded-2xl p-4 border border-teal/10">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-1">Est. Investment</p>
            <p className="font-bold text-primary">{card.route.cost}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground font-bold uppercase tracking-[0.2em] mb-4 text-center">Exclusive Route Stops</p>
        <div className="space-y-3">
          {card.route.stops.map((stop, i) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              key={stop}
              className="flex items-center gap-4 group/stop"
            >
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0 group-hover/stop:bg-primary transition-colors duration-300">
                <Navigation size={14} className="text-primary group-hover/stop:text-white" />
              </div>
              <div className="flex-1 pb-2 border-b border-border/50">
                <p className="text-sm text-card-foreground font-medium">{stop}</p>
              </div>
              <span className="text-[10px] text-muted-foreground font-bold bg-muted px-2 py-0.5 rounded-full uppercase">Step {i + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Destinations = () => {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-warm-gray/50" id="destinations">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">Unforgettable Trails</motion.p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">Popular Travel Routes</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-teal mx-auto mt-8 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.name}
              variants={cardVariants}
              whileHover={{ y: -15 }}
              className="group bg-card rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-border/40"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={card.image} alt={card.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-hero-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {card.popular && (
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur text-primary text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg border border-primary/20 uppercase tracking-widest">
                    Top Rated
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-5 right-5 bg-white/90 backdrop-blur p-2.5 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <Heart size={18} className="text-destructive fill-none group-hover:fill-destructive transition-colors" />
                </motion.button>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors">{card.name}</h3>
                    <p className="flex items-center gap-1 text-muted-foreground text-xs font-medium mt-1 uppercase tracking-wider"><MapPin size={12} className="text-teal" /> {card.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6 p-4 bg-warm-gray rounded-2xl">
                  <div className="text-center">
                    <Route size={14} className="mx-auto text-primary mb-1.5" />
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold">Dist.</p>
                    <p className="font-bold text-xs text-card-foreground">{card.distance}</p>
                  </div>
                  <div className="text-center border-x border-border/50">
                    <Mountain size={14} className="mx-auto text-primary mb-1.5" />
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold">Elev.</p>
                    <p className="font-bold text-xs text-card-foreground">{card.elevation}</p>
                  </div>
                  <div className="text-center">
                    <Clock size={14} className="mx-auto text-primary mb-1.5" />
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold">Time</p>
                    <p className="font-bold text-xs text-card-foreground">{card.duration}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2">
                    <span className="text-muted-foreground">Difficulty Level</span>
                    <span className="text-primary">{card.difficulty}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${card.difficulty}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-teal to-primary rounded-full"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-primary fill-primary" />
                    <span className="text-sm font-bold text-card-foreground">{card.rating}</span>
                    <span className="text-[10px] text-muted-foreground ml-1">(4.8k)</span>
                  </div>
                  <motion.button
                    onClick={() => setSelectedRoute(i)}
                    whileHover={{ x: 5 }}
                    className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group/btn"
                  >
                    View Experience <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedRoute !== null && <RouteModal card={cards[selectedRoute]} onClose={() => setSelectedRoute(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Destinations;
