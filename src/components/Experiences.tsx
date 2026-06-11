import SectionHeading from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import trackImg from "@/assets/track.jpg";
import convoyImg from "@/assets/convoy.jpg";
import majlisImg from "@/assets/majlis.jpg";
import carImg from "@/assets/car-detail.jpg";

const items = [
  {
    n: "I",
    title: "Private Car Meets",
    desc: "Quiet evenings in curated venues — by invitation, by name.",
    img: carImg,
  },
  {
    n: "II",
    title: "Track Experiences",
    desc: "Yas Marina sessions reserved for the society — pit lane access included.",
    img: trackImg,
  },
  {
    n: "III",
    title: "Convoys & Drives",
    desc: "Liwa. Jebel Jais. Hatta. The roads that earn your machine.",
    img: convoyImg,
  },
  {
    n: "IV",
    title: "Lifestyle Gatherings",
    desc: "Iftar, Suhoor, padel and café evenings — the society beyond the cars.",
    img: majlisImg,
  },
];

const Experiences = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="experiences" className="relative py-32 md:py-40 px-6 md:px-10 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div ref={ref} className="reveal flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <SectionHeading
            number="N° 03"
            eyebrow="Experiences"
            title={
              <>
                The calendar of a <span className="italic text-gold">private capital.</span>
              </>
            }
          />
          <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
            Thirty curated moments a year. Each one engineered for the room,
            never for the algorithm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/60">
          {items.map((it, i) => (
            <ExperienceCard key={it.title} {...it} delay={i % 2} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <span className="font-serif italic text-2xl md:text-3xl text-primary/80">
            Flagship Events — once a year, never repeated.
          </span>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({
  n,
  title,
  desc,
  img,
  delay,
}: {
  n: string;
  title: string;
  desc: string;
  img: string;
  delay: number;
}) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay + 1} group relative overflow-hidden bg-background aspect-[5/4] md:aspect-[4/3]`}
    >
      <img
        src={img}
        alt={title}
        loading="lazy"
        width={1600}
        height={1200}
        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1500ms] ease-out opacity-70 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20 group-hover:via-background/40 transition-all duration-700" />

      <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-serif text-primary text-lg">{n}</span>
          <span className="h-px w-8 bg-primary/60 group-hover:w-16 transition-all duration-700" />
        </div>
        <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-3">{title}</h3>
        <p className="text-sm md:text-base text-muted-foreground max-w-md">{desc}</p>
      </div>
    </div>
  );
};

export default Experiences;
