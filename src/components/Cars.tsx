import SectionHeading from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import carImg from "@/assets/car-detail.jpg";

const brands = ["McLaren", "Ferrari", "Lamborghini", "Bugatti", "Pagani", "Koenigsegg", "Rolls-Royce", "Aston Martin"];

const Cars = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="cars" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={carImg}
          alt="Pagani carbon fiber detail"
          loading="lazy"
          width={1600}
          height={1200}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>

      <div ref={ref} className="reveal relative max-w-[1400px] mx-auto px-6 md:px-10">
        <SectionHeading
          number="N° 04"
          eyebrow="The Cars"
          title={
            <>
              The capital's
              <br />
              <span className="italic text-gold">rarest machines</span>
              <br />
              live here.
            </>
          }
        />

        <div className="mt-16 max-w-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-12 gap-y-5">
            {brands.map((b, i) => (
              <div
                key={b}
                className="flex items-center gap-4 border-b border-border/60 py-4"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="font-serif text-primary text-xs">0{i + 1}</span>
                <span className="font-serif text-xl md:text-2xl text-foreground">{b}</span>
              </div>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted-foreground italic max-w-md leading-relaxed">
            Hypercars, one-offs, and limited series — many of which never appear outside our own gatherings.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cars;
