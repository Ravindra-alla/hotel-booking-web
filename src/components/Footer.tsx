import { Send, Instagram, Linkedin, Facebook, Youtube, Globe, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <>
      {/* Contact Section */}
      <section className="section-padding bg-hero-dark relative overflow-hidden" id="contact">
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14 reveal">
            <p className="text-primary font-semibold font-body tracking-widest uppercase text-sm mb-3">
              Get In Touch
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-hero-dark-foreground">
              Plan Your Journey
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Form */}
            <div className="reveal glass rounded-3xl p-8">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-hero-dark-foreground/5 border border-hero-dark-foreground/10 rounded-xl px-5 py-3 text-hero-dark-foreground placeholder:text-hero-dark-foreground/30 outline-none focus:border-primary transition-colors font-body"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-hero-dark-foreground/5 border border-hero-dark-foreground/10 rounded-xl px-5 py-3 text-hero-dark-foreground placeholder:text-hero-dark-foreground/30 outline-none focus:border-primary transition-colors font-body"
                />
                <textarea
                  placeholder="Tell us about your dream trip..."
                  rows={4}
                  className="w-full bg-hero-dark-foreground/5 border border-hero-dark-foreground/10 rounded-xl px-5 py-3 text-hero-dark-foreground placeholder:text-hero-dark-foreground/30 outline-none focus:border-primary transition-colors font-body resize-none"
                />
                <button className="glow-button bg-primary text-primary-foreground w-full py-3 rounded-xl font-semibold font-body flex items-center justify-center gap-2">
                  <Send size={18} />
                  Send Message
                </button>
              </div>
            </div>

            {/* Info + Map placeholder */}
            <div className="reveal flex flex-col gap-6" style={{ transitionDelay: "0.15s" }}>
              <div className="glass rounded-3xl p-8 flex-1">
                <h3 className="font-display text-xl font-bold text-hero-dark-foreground mb-6">Contact Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-hero-dark-foreground/80">
                    <MapPin size={18} className="text-primary shrink-0" />
                    <span className="font-body text-sm">Srinivas Nagar,Narasaraopet, Palnadu(Dist)</span>
                  </div>
                  <div className="flex items-center gap-3 text-hero-dark-foreground/80">
                    <Phone size={18} className="text-primary shrink-0" />
                    <span className="font-body text-sm">+91 8247392437</span>
                  </div>
                  <div className="flex items-center gap-3 text-hero-dark-foreground/80">
                    <Mail size={18} className="text-primary shrink-0" />
                    <span className="font-body text-sm">ranbidgesolutionspvtltd@gmail.com</span>
                  </div>
                </div>

                {/* Social icons */}
                <div className="flex gap-3 mt-8">
                  {[
                    { Icon: Instagram, href: "https://www.instagram.com/rspl_academy?igsh=MXE3NWY3ZmNiNmtucg==" },
                    { Icon: Linkedin, href: "https://www.linkedin.com/in/ranbidge-solutions-private-limited-company-a98983376" },
                    { Icon: Facebook, href: "https://ranbidge-solutions-private-limited.onrender.com/" },
                    { Icon: Youtube, href: "https://youtube.com/@rspl-academy?si=vWWZ6PIScjraDIJr" },
                  ].map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-hero-dark-foreground/60 hover:text-primary hover:scale-110 transition-all"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map area */}
              <div className="glass rounded-3xl p-6 h-40 flex items-center justify-center">
                <div className="text-center">
                  <Globe size={32} className="mx-auto text-primary/60 mb-2" />
                  <p className="text-hero-dark-foreground/40 text-sm font-body">Interactive Map Available Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hero-dark border-t border-hero-dark-foreground/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Globe className="text-primary" size={20} />
            <span className="font-display text-lg font-bold text-hero-dark-foreground uppercase">LuxeTravel</span>
          </div>
          <div className="flex gap-6 text-hero-dark-foreground/50 text-sm font-body">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
          <p className="text-hero-dark-foreground/30 text-sm font-body">
            © 2026 LuxeTravel. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
