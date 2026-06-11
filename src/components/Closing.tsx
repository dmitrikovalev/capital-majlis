import { useReveal } from "@/hooks/use-reveal";
import convoyImg from "@/assets/convoy.jpg";
import logo from "@/assets/logo.jpg";

const Closing = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden grain">
      <img
        src={convoyImg}
        alt="Supercar convoy in the desert"
        loading="lazy"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-vignette)" }} />

      <div ref={ref} className="reveal relative h-full flex flex-col items-center justify-center text-center px-6">
        <span className="text-[11px] tracking-luxury text-primary mb-8">N° 10 · FINAL</span>
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl text-foreground">
          Where Abu Dhabi's
          <br />
          <span className="italic text-gold">car culture</span> actually lives.
        </h2>

        <div className="mt-14 flex flex-col sm:flex-row gap-4">
          <a
            href="#membership"
            className="bg-gold text-primary-foreground px-10 py-5 text-xs tracking-luxury uppercase shadow-gold hover:shadow-none transition-all duration-500"
          >
            Join the Society
          </a>
          <a
            href="#contact"
            className="border border-primary/40 text-foreground px-10 py-5 text-xs tracking-luxury uppercase hover:border-primary hover:text-primary transition-all duration-500"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-background border-t border-border/50 px-6 md:px-10 py-14">
    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img src={logo} alt="ADM Majlis Society" width={180} height={54} className="h-12 w-auto object-contain" />
      </div>
      <div className="text-[11px] tracking-wider-2 uppercase text-muted-foreground">
        © {new Date().getFullYear()} · All Rights Reserved · By Invitation
      </div>
    </div>
  </footer>
);

export { Closing, Footer };
