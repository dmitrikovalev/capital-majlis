import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";

const benefits = [
  { t: "Direct Audience", d: "Sit in the room with collectors and decision-makers, no media buy required." },
  { t: "Cinematic Content", d: "Bespoke productions delivered to an audience of 2M+ monthly views." },
  { t: "Co-hosted Activations", d: "Yas Marina, hospitality, and lifestyle integrations under your brand." },
  { t: "Exclusivity", d: "One partner per category. Protected positioning, by design." },
];

const Partnership = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10 bg-background">
      <div ref={ref} className="reveal max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
          <SectionHeading
            number="N° 08"
            eyebrow="Partnership · B2B"
            title={
              <>
                Brands that <span className="italic text-gold">belong</span> in the room.
              </>
            }
          />

          <div className="grid sm:grid-cols-2 gap-px bg-border/60">
            {benefits.map((b, i) => (
              <div
                key={b.t}
                className="bg-background p-8 md:p-10 hover:bg-card/60 transition-colors duration-700 group"
              >
                <span className="font-serif text-primary text-sm">0{i + 1}</span>
                <h3 className="font-serif text-2xl text-foreground mt-4 mb-3 group-hover:text-primary transition-colors duration-700">
                  {b.t}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/partner"
            className="inline-flex items-center gap-4 text-xs tracking-luxury uppercase border border-primary/60 px-8 py-4 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500"
          >
            Partner With Us
            <span className="w-6 h-px bg-current" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Partnership;
