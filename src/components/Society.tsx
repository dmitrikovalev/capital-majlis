import SectionHeading from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import majlisImg from "@/assets/majlis.jpg";

const principles = [
  { n: "01", t: "Invite Only", d: "No applications. No public access. Members are personally introduced." },
  { n: "02", t: "Curated Membership", d: "Each member is considered for cultural fit, not just collection size." },
  { n: "03", t: "Capital First", d: "Rooted in Abu Dhabi. Built around the people who shape it." },
  { n: "04", t: "Depth Over Attention", d: "We build the room, not the audience. Influence over impressions." },
];

const Society = () => {
  const ref = useReveal<HTMLDivElement>();
  const ref2 = useReveal<HTMLDivElement>();
  return (
    <section id="society" className="relative py-32 md:py-40 px-6 md:px-10 bg-background">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div ref={ref} className="reveal lg:sticky lg:top-32">
          <SectionHeading
            number="N° 01"
            eyebrow="Who We Are"
            title={
              <>
                Not a public car meet.
                <br />
                A <span className="italic text-gold">curated society</span> built on one standard,
                <span className="text-muted-foreground"> premium or nothing.</span>
              </>
            }
          />
          <div className="mt-10 relative overflow-hidden">
            <img
              src={majlisImg}
              alt="Members in a private majlis gathering"
              loading="lazy"
              width={1920}
              height={1440}
              className="w-full h-auto block"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-serif italic text-xl text-primary/90">
                "The most important room in the capital has no sign on the door."
              </p>
            </div>
          </div>
        </div>

        <div ref={ref2} className="reveal reveal-delay-1 space-y-px">
          {principles.map((p) => (
            <div
              key={p.n}
              className="group border-t border-border/60 last:border-b py-10 grid grid-cols-[auto_1fr] gap-8 hover:bg-card/40 transition-colors duration-700"
            >
              <span className="font-serif text-primary text-2xl pt-1">{p.n}</span>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3 group-hover:text-primary transition-colors duration-700">
                  {p.t}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                  {p.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Society;
