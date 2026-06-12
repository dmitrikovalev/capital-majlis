import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Instagram, Eye, Heart, Film, Play, X } from "lucide-react";

const videos = [
  { id: "rJg3GHjseHM", title: "ADMSOC Porsche" },
  { id: "oLFahxr_vwA", title: "ADMSOC Ferrari" },
  { id: "Ixu_jyDWNSg", title: "ADMSOC Porsche" },
  { id: "eqLWie7qrZU", title: "ADMSOC Ferrari" },
  { id: "XUlCYPA5gz8", title: "ADMSOC Aston Martin" },
  { id: "9MNjYVKjsxs", title: "ADMSOC Mercedes" },
];

const metrics = [
  { icon: Eye, value: "2M+", label: "Monthly Views" },
  { icon: Heart, value: "8.4%", label: "Avg. Engagement" },
  { icon: Film, value: "120+", label: "Productions / Year" },
];

type Video = (typeof videos)[number];

const Digital = () => {
  const ref = useReveal<HTMLDivElement>();
  const [active, setActive] = useState<Video | null>(null);

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
            A media presence that carries the room far beyond its walls.
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
            <button
              key={v.id + v.title}
              type="button"
              onClick={() => setActive(v)}
              aria-label={`Play ${v.title}`}
              className="group aspect-square relative overflow-hidden bg-background focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              <img
                src={`https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`}
                alt={v.title}
                loading="lazy"
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.dataset.fb) {
                    t.dataset.fb = "1";
                    t.src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-background/40 group-hover:bg-background/15 transition-colors duration-500" />

              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-primary/70 flex items-center justify-center bg-background/30 backdrop-blur-sm group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                  <Play
                    size={15}
                    fill="currentColor"
                    className="text-primary translate-x-[1px] group-hover:text-primary-foreground transition-colors duration-500"
                  />
                </span>
              </span>

              <span className="absolute inset-x-0 bottom-0 p-3 text-left text-[10px] tracking-luxury uppercase text-foreground/90 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {v.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-5xl w-[92vw] border-border/60 bg-background p-0 gap-0 overflow-hidden [&>button]:hidden">
          <DialogTitle className="sr-only">{active?.title}</DialogTitle>
          <div className="relative">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute -top-9 right-0 inline-flex items-center gap-2 text-[10px] tracking-luxury uppercase text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              Close
              <X size={14} />
            </button>
            <div className="aspect-video w-full bg-black">
              {active && (
                <iframe
                  key={active.id}
                  src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&color=white&playsinline=1&modestbranding=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Digital;
