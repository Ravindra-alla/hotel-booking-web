import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Packages from "@/components/Packages";
import Timeline from "@/components/Timeline";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

const Index = () => {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="min-h-screen overflow-x-hidden scroll-smooth bg-background text-foreground">
      <Navbar />
      <Hero />
      <Destinations />
      <Packages />
      <Timeline />
      <Reviews />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
