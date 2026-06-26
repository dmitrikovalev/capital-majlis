import heroImg from "@/assets/hero-grid-v2.jpg";
import { ChevronDown } from "lucide-react";

const Hero = () => (
  <section id="top" className="relative h-screen min-h-[720px] w-full overflow-hidden grain">
    {/* Background image with Ken Burns */}
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt="Supercars lined up on the grid at golden hour in Abu Dhabi"
        width={1920}
        height={1080}
        className="w-full h-full object-cover animate-ken-burns"
      />
    </div>
    {/* Gradient overlays */}
    <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/1.2" />
    <div className="absolute inset-0" style={{ background: "var(--gradient-vignette)" }} />

    {/* Side ornaments */}
    <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 text-[10px] tracking-luxury text-muted-foreground/70 [writing-mode:vertical-rl] rotate-180">
      <span>EST. MMXXIV</span>
      <span className="h-20 w-px bg-primary/40" />
      <span>MEMBERS ONLY</span>
    </div>
    <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 text-[10px] tracking-luxury text-muted-foreground/70 [writing-mode:vertical-rl]">
      <span>N° 001</span>
      <span className="h-20 w-px bg-primary/40" />
      <span>PRIVATE SOCIETY</span>
    </div>

    {/* Content */}
    <div className="relative z-10 h-full flex flex-col items-center justify-start pt-[12vh] md:pt-[13vh] pb-24 md:pb-28 text-center px-6">
      <div className="reveal in-view">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-12 bg-primary" />
          <span className="text-[11px] tracking-luxury text-primary uppercase">Invite Only</span>
          <span className="h-px w-12 bg-primary" />
        </div>
      </div>

      <h1 className="font-serif leading-[0.92] max-w-6xl reveal in-view reveal-delay-1">
        <span className="block text-3xl sm:text-5xl md:text-6xl font-light tracking-wider-2 text-foreground/60">
          Abu Dhabi
        </span>
        <span className="block mt-2 md:mt-3 text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] italic font-light text-platinum">
          Majlis Society
        </span>
      </h1>

      <p className="mt-8 font-serif italic text-2xl md:text-3xl text-foreground/80 reveal in-view reveal-delay-2">
      Where power meets prestige in the capital.
      </p>

      <p className="mt-4 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed reveal in-view reveal-delay-3">
        A private, invite-only community of supercar owners, collectors
        and decision-makers in the capital.
      </p>

      <div className="mt-auto flex flex-col sm:flex-row gap-4 reveal in-view reveal-delay-4">
        <a
          href="#membership"
          className="group inline-flex items-center justify-center gap-3 bg-gold text-primary-foreground px-8 py-4 text-xs tracking-luxury uppercase shadow-gold hover:shadow-none transition-all duration-500"
        >
          Request Invitation
          <span className="w-6 h-px bg-primary-foreground group-hover:w-10 transition-all" />
        </a>
        <a
          href="#society"
          className="inline-flex items-center justify-center gap-3 border border-primary/40 text-foreground px-8 py-4 text-xs tracking-luxury uppercase hover:border-primary hover:text-primary transition-all duration-500"
        >
          Explore the Society
        </a>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-float-slow">
      <span className="text-[10px] tracking-luxury">SCROLL</span>
      <ChevronDown size={16} className="text-primary" />
    </div>
  </section>
);

export default Hero;
