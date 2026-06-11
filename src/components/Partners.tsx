import SectionHeading from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import mclaren from "@/assets/partners/mclaren.png";
import lamborghini from "@/assets/partners/lamborghini.png";
import brabus from "@/assets/partners/brabus.png";
import yasMarina from "@/assets/partners/yas-marina.png";
import alForsan from "@/assets/partners/al-forsan.png";
import a2rl from "@/assets/partners/a2rl.png";
import liwa from "@/assets/partners/liwa.png";
import h24 from "@/assets/partners/24h-series.png";
import gulfNews from "@/assets/partners/gulf-news.png";
import adSports from "@/assets/partners/ad-sports.png";

const partners = [
  { src: mclaren, name: "McLaren Abu Dhabi" },
  { src: lamborghini, name: "Lamborghini Abu Dhabi & Dubai" },
  { src: yasMarina, name: "Yas Marina Circuit" },
  { src: brabus, name: "Brabus Middle East" },
  { src: a2rl, name: "Abu Dhabi Autonomous Racing League" },
  { src: liwa, name: "Liwa International Festival" },
  { src: alForsan, name: "Al Forsan" },
  { src: h24, name: "24H Series" },
];

const press = [
  { src: gulfNews, name: "Gulf News" },
  { src: adSports, name: "Abu Dhabi Sports TV" },
];

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

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60">
          {partners.map((p) => (
            <div
              key={p.name}
              className="aspect-[3/2] flex items-center justify-center bg-background hover:bg-card transition-colors duration-700 group p-6"
            >
              <img
                src={p.src}
                alt={p.name}
                loading="lazy"
                className="max-h-10 md:max-h-12 max-w-[78%] w-auto object-contain opacity-45 group-hover:opacity-95 transition-opacity duration-700"
              />
            </div>
          ))}
        </div>
      </div>

      <div ref={ref2} className="reveal reveal-delay-1 max-w-[1400px] mx-auto mt-20 flex flex-col items-center gap-8">
        <span className="text-[11px] tracking-luxury uppercase text-muted-foreground">As Featured In</span>
        <div className="flex items-center justify-center gap-12 md:gap-20">
          {press.map((p) => (
            <img
              key={p.name}
              src={p.src}
              alt={p.name}
              loading="lazy"
              className="max-h-9 md:max-h-10 w-auto object-contain opacity-40 hover:opacity-90 transition-opacity duration-700"
            />
          ))}
        </div>
      </div>

      <p className="mt-20 text-center max-w-xl mx-auto text-sm text-muted-foreground italic">
        Premium activations with houses that share the same standard. Selective by design.
      </p>
    </section>
  );
};

export default Partners;
