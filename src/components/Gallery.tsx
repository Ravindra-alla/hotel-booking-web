import { useState, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera, Html } from "@react-three/drei";
import * as THREE from "three";
import { MapPin, Star, X, Compass, ArrowRight, ShieldCheck, Zap } from "lucide-react";

// Tourist data with specific coordinates for the 3D map
const touristPlaces = [
  {
    name: "Jaipur, Rajasthan",
    lat: 26.9124, lng: 75.7873,
    description: "The Pink City, known for its magnificent palaces like Hawa Mahal and historic forts.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Munnar, Kerala",
    lat: 10.0889, lng: 77.0595,
    description: "Rolling hills, tea plantations, and pristine waterfalls in the heart of God's Own Country.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Varanasi, UP",
    lat: 25.3176, lng: 82.9739,
    description: "The spiritual capital of India, famous for its ancient ghats and mesmerizing Ganga Aarti.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Leh, Ladakh",
    lat: 34.1526, lng: 77.5771,
    description: "High-altitude desert known for its Buddhist monasteries and stunning mountain landscapes.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1581791538302-03537b9c97bf?q=80&w=800&auto=format&fit=crop"
  }
];

const SatelliteGlobe = ({ rotationSpeed = 0.002 }) => {
  const globeRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // High-res satellite textures (Earth at Night / Public NASA assets)
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(THREE.TextureLoader, [
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
  ]);

  useFrame((state) => {
    if (globeRef.current) globeRef.current.rotation.y += rotationSpeed;
    if (cloudsRef.current) cloudsRef.current.rotation.y += rotationSpeed * 1.2;
  });

  return (
    <group ref={globeRef}>
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
      {/* Atmosphere Glow */}
      <mesh>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshBasicMaterial color="#4299e1" side={THREE.BackSide} transparent opacity={0.15} />
      </mesh>

      {/* Main Globe Mesh */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={10}
        />
      </mesh>

      {/* Cloud Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const Gallery = () => {
  const [selectedPlace, setSelectedPlace] = useState<typeof touristPlaces[0] | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-[#050505]" id="gallery">
      {/* Advanced Background */}
      <div className="absolute inset-0 z-0 radial-gradient-space" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex justify-center mb-6"
          >
            <div className="bg-primary/20 p-4 rounded-full border border-primary/40 shadow-[0_0_30px_rgba(var(--primary),0.3)]">
              <Zap className="text-primary w-8 h-8 fill-primary/20" />
            </div>
          </motion.div>
          <p className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-4">Deep Space Exploration</p>
          <h2 className="text-4xl md:text-7xl font-display font-bold text-white">Explore the Cosmos</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: 3D Satellite Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative h-[500px] md:h-[650px] rounded-[3.5rem] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-move group"
          >
            <div className="absolute top-8 left-8 z-10 flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]" />
              <span className="text-white/70 text-[10px] font-bold tracking-[0.2em] uppercase">NASA LIVE SATELLITE FEED</span>
            </div>

            <Canvas shadows gl={{ antialias: true }}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
              <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

              <Suspense fallback={<Html center><div className="text-white/20 text-xs tracking-widest animate-pulse uppercase">INIT_SATELLITE_CORE...</div></Html>}>
                <SatelliteGlobe />
              </Suspense>

              <OrbitControls
                enableZoom={false}
                rotateSpeed={0.5}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Canvas>

            <div className="absolute bottom-10 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full flex gap-8 items-center">
                <div className="flex flex-col items-center">
                  <p className="text-primary font-bold text-[8px] uppercase">Orbit</p>
                  <p className="text-white text-[10px] font-mono">35,786 KM</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col items-center">
                  <p className="text-primary font-bold text-[8px] uppercase">Status</p>
                  <p className="text-green-500 text-[10px] font-mono">STABLE</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: High-Res Satellite Interaction */}
          <div className="space-y-10">
            <div className="grid grid-cols-2 gap-4">
              {touristPlaces.map((place, i) => (
                <motion.button
                  key={place.name}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPlace(place)}
                  className={`relative p-6 rounded-3xl border transition-all duration-500 text-left overflow-hidden ${selectedPlace?.name === place.name
                    ? "bg-primary/20 border-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                    : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                >
                  <div className="absolute top-0 right-0 p-3 opacity-20">
                    <Compass size={40} className="text-white" />
                  </div>
                  <p className="text-primary font-bold text-[9px] uppercase tracking-widest mb-1">Target 0{i + 1}</p>
                  <h4 className="text-white font-display text-lg font-bold">{place.name}</h4>
                  <div className={`mt-4 w-8 h-1 transition-all duration-500 ${selectedPlace?.name === place.name ? "w-16 bg-primary" : "bg-white/20"}`} />
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedPlace ? (
                <motion.div
                  key={selectedPlace.name}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 flex gap-2">
                      <span className="bg-primary/90 text-primary-foreground text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                        <ShieldCheck size={10} /> Certified
                      </span>
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-white font-display text-4xl font-bold">{selectedPlace.name}</h3>
                      <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-2xl">
                        <Star size={14} className="text-primary fill-primary" />
                        <span className="text-white font-bold text-sm tracking-tighter">{selectedPlace.rating}</span>
                      </div>
                    </div>
                    <p className="text-white/50 text-base leading-relaxed mb-8 font-body">{selectedPlace.description}</p>
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-primary text-primary-foreground h-14 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                      >
                        Initiate Protocol <ArrowRight size={16} />
                      </motion.button>
                      <button
                        onClick={() => setSelectedPlace(null)}
                        className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[432px] rounded-[3rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-10 bg-white/[0.02]"
                >
                  <div className="mb-6 relative">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="w-24 h-24 border border-primary/20 rounded-full" />
                    <Compass className="text-primary/30 w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h3 className="text-white/70 font-display text-2xl font-bold mb-3">Await Selection</h3>
                  <p className="text-white/30 text-sm max-w-[280px] leading-relaxed uppercase tracking-widest font-bold">
                    System ready for geo-spatial targeting. Choose a destination above.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .radial-gradient-space {
          background: radial-gradient(circle at 50% 50%, #1a202c 0%, #050505 100%);
        }
      `}</style>
    </section>
  );
};

export default Gallery;
