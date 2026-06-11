import SectionHeading from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";

const partners = [
  "YAS MARINA",
  "ETIHAD",
  "W ABU DHABI",
  "EMIRATES PALACE",
  "ROLLS-ROYCE MENA",
  "MCLAREN ABU DHABI",
  "BUGATTI",
  "FOUR SEASONS",
];

const Partners = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="partners" className="relative py-32 md:py-40 px-6 md:px-10 bg-background">
      <div ref={ref} className="reveal max-w-[1400px] mx-auto">
        <SectionHeading
          align="center"
          number="N° 06"
          eyebrow="Partners & Collaborations"
          title={
            <>
              Not impressions. <span className="italic text-gold">Access.</span>
            </>
          }
        />

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60">
          {partners.map((p) => (
            <div
              key={p}
              className="aspect-[3/2] flex items-center justify-center bg-background hover:bg-card transition-colors duration-700 group"
            >
              <span className="font-serif text-sm md:text-base tracking-wider-2 text-muted-foreground/70 group-hover:text-primary transition-colors duration-700">
                {p}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center max-w-xl mx-auto text-sm text-muted-foreground italic">
          Premium activations with houses that share the same standard. Selective by design.
        </p>
      </div>
    </section>
  );
};

export default Partners;
