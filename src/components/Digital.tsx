import SectionHeading from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import { Instagram, Eye, Heart, Film } from "lucide-react";

const videos = [
  { id: "rJg3GHjseHM", title: "ADMSOC Drive #1" },
  { id: "g9Q35fc6pLA", title: "ADMSOC Drive #2" },
  { id: "Ixu_jyDWNSg", title: "ADMSOC Drive #3" },
  { id: "eqLWie7qrZU", title: "ADMSOC Drive #4" },
  { id: "dQw4w9WgXcQ", title: "ADMSOC Drive #5" },
  { id: "dQw4w9WgXcQ", title: "ADMSOC Drive #6" },
];

const metrics = [
  { icon: Eye, value: "2M+", label: "Monthly Views" },
  { icon: Heart, value: "8.4%", label: "Avg. Engagement" },
  { icon: Film, value: "120+", label: "Productions / Yr" },
];

const Digital = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10 bg-card border-y border-border/50">
      <div ref={ref} className="reveal max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeading
            number="N° 05"
            eyebrow="Digital Presence"
            title={
              <>
                Quiet in the room.
                <br />
                <span className="italic text-gold">Loud on the feed.</span>
              </>
            }
          />
          <p className="mt-8 text-base text-muted-foreground max-w-lg leading-relaxed">
            Cinematic content from inside the society — drives, tracks, gatherings.
            A media presence that carries the room far beyond it.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {metrics.map((m) => (
              <div key={m.label} className="border-l border-primary/40 pl-4">
                <m.icon size={16} className="text-primary mb-3" />
                <div className="font-serif text-2xl md:text-3xl text-foreground">{m.value}</div>
                <div className="text-[10px] tracking-luxury uppercase text-muted-foreground mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://www.instagram.com/admsoc"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 mt-12 text-xs tracking-luxury uppercase text-primary hover:gap-5 transition-all duration-500"
          >
            <Instagram size={16} />
            Follow @admsoc
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {videos.map((v) => (
            <div key={v.id + v.title} className="aspect-square relative overflow-hidden bg-background">
              <iframe
                src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Digital;
