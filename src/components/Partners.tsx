import SectionHeading from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import mclaren from "@/assets/partners/mclaren.png";
import lamborghini from "@/assets/partners/lamborghini.png";
import ferrari from "@/assets/partners/ferrari.png";
import porsche from "@/assets/partners/porsche.png";
import brabus from "@/assets/partners/brabus.png";
import yasMarina from "@/assets/partners/yas-marina.png";
import alForsan from "@/assets/partners/al-forsan.png";
import a2rl from "@/assets/partners/a2rl.png";
import liwa from "@/assets/partners/liwa.png";
import h24 from "@/assets/partners/24h-series.png";
import gulfNews from "@/assets/partners/gulf-news.png";
import adSports from "@/assets/partners/ad-sports.png";

// Sizes and opacity are normalized by optical mass, not by height:
// bold wide marks (Brabus, 24H) get a lower cap, thin or stacked marks
// (A2RL, Lamborghini) a higher one — so every logo reads at the same scale.
// Row 1: McLaren · Lamborghini · Ferrari · Brabus
// Row 2: Porsche · A2RL · Al Forsan · 24H
// Row 3 (centered): Yas Marina · Liwa
const partners = [
  { src: mclaren, name: "McLaren Abu Dhabi", img: "max-h-11 md:max-h-14 opacity-55", href: "https://cars.mclaren.com/gl_en/retailers/abu-dhabi"  },
  { src: lamborghini, name: "Lamborghini Abu Dhabi & Dubai", img: "max-h-16 md:max-h-20 opacity-55", href: "https://www.lamborghini-abudhabi.com" },
  { src: ferrari, name: "Ferrari Abu Dhabi", img: "max-h-[72px] md:max-h-24 opacity-55", href: "https://www.ferrari.com/en-AE" },
  { src: brabus, name: "Brabus Middle East", img: "max-h-9 md:max-h-11 opacity-50", href: "https://www.brabus.com/en-fr/cars/supercars.html" },
  { src: porsche, name: "Porsche Abu Dhabi", img: "max-h-[72px] md:max-h-24 opacity-55", href: "https://www.porsche.com/middle-east/_abudhabi_/" },
  { src: a2rl, name: "Abu Dhabi Autonomous Racing League", img: "max-h-12 md:max-h-[60px] opacity-60", href: "https://a2rl.io/" },
  { src: alForsan, name: "Al Forsan", img: "max-h-11 md:max-h-14 opacity-55", href: "https://www.alforsan.com/" },
  { src: h24, name: "24H Series", img: "max-h-8 md:max-h-10 opacity-50", href: "https://www.24hseries.com/" },
  { src: yasMarina, name: "Yas Marina Circuit", img: "max-h-11 md:max-h-14 opacity-55", href: "https://www.yasmarina.ae/" },
  { src: liwa, name: "Liwa International Festival", img: "max-h-11 md:max-h-14 opacity-55", href: "https://liwainternationalfestival.ae" },
];

const press = [
  { src: gulfNews, name: "Gulf News", img: "max-h-10 md:max-h-12", href: "https://gulfnews.com/" },
  { src: adSports, name: "Abu Dhabi Sports TV", img: "max-h-9 md:max-h-10", href: "https://www.admn.ae/" },
];

const crossesY = ["top-0", "top-1/3", "top-2/3", "top-full"];
const crossesX = ["left-1/4", "left-1/2", "left-3/4"];

const PartnerCell = ({ src, name, img, href }: { src: string; name: string; img: string; href?: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative aspect-[3/2] flex items-center justify-center bg-background hover:bg-card transition-colors duration-700 group p-6 cursor-pointer"
  >
    <img
      src={src}
      alt={name}
      loading="lazy"
      className={`${img} max-w-[78%] w-auto object-contain group-hover:opacity-95 transition-opacity duration-700`}
    />
    <span className="pointer-events-none absolute inset-x-0 bottom-4 px-3 text-center text-[10px] tracking-luxury uppercase text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      {name}
    </span>
  </a>
);

// On desktop (4 cols) the last row holds only 2 marks — flank them with empty
// background cells so they sit centered and the grid stays a clean rectangle.
const Filler = () => <div aria-hidden className="hidden md:block bg-background" />;

const Partners = () => {
  const ref = useReveal<HTMLDivElement>();
  const ref2 = useReveal<HTMLDivElement>();
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

        <div className="mt-20 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60">
            {partners.slice(0, 8).map((p) => (
              <PartnerCell key={p.name} {...p} />
            ))}
            <Filler />
            {partners.slice(8).map((p) => (
              <PartnerCell key={p.name} {...p} />
            ))}
            <Filler />
          </div>

          {/* gold crosses on the inner grid intersections */}
          {crossesY.map((y) =>
            crossesX.map((x) => (
              <span
                key={`${y}-${x}`}
                aria-hidden
                className={`hidden md:block pointer-events-none absolute ${y} ${x} w-[11px] h-[11px] -translate-x-1/2 -translate-y-1/2 text-primary/60`}
              >
                <span className="absolute left-0 right-0 top-1/2 h-px bg-current" />
                <span className="absolute top-0 bottom-0 left-1/2 w-px bg-current" />
              </span>
            ))
          )}
        </div>
      </div>

      <div ref={ref2} className="reveal reveal-delay-1 max-w-[1400px] mx-auto mt-20 flex flex-col items-center gap-8">
        <span className="text-[11px] tracking-luxury uppercase text-muted-foreground">As Featured In</span>
        <div className="flex items-center justify-center gap-12 md:gap-20">
          {press.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer">
              <img
                src={p.src}
                alt={p.name}
                loading="lazy"
                className={`${p.img} w-auto object-contain opacity-50 hover:opacity-90 transition-opacity duration-700`}
              />
            </a>
          ))}
        </div>
      </div>

      <p className="mt-20 text-center max-w-xl mx-auto text-sm text-muted-foreground italic">
        Premium activations with houses that share the same standard. Selective, always.
      </p>
    </section>
  );
};

export default Partners;
