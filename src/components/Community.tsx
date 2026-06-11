import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { useCounter, useReveal } from "@/hooks/use-reveal";

const stats = [
  { value: 300, suffix: "+", label: "Members" },
  { value: 30, suffix: "+", label: "Events / Year" },
  { value: 2, suffix: "M+", label: "Monthly Views" },
];

const breakdown = [
  { label: "Business Owners & Executives", pct: 42 },
  { label: "Collectors & Investors", pct: 28 },
  { label: "Royal & Government Figures", pct: 18 },
  { label: "International Members", pct: 12 },
];

const StatCard = ({ s, start }: { s: typeof stats[0]; start: boolean }) => {
  const v = useCounter(s.value, 2200, start);
  return (
    <div className="text-center">
      <div className="font-serif text-6xl md:text-7xl lg:text-8xl text-gold">
        {v}
        <span>{s.suffix}</span>
      </div>
      <div className="mt-4 text-[11px] tracking-luxury uppercase text-muted-foreground">{s.label}</div>
    </div>
  );
};

const Community = () => {
  const ref = useReveal<HTMLDivElement>();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setStart(true)),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-10 bg-card border-y border-border/50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-gold opacity-50 pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto">
        <SectionHeading
          align="center"
          number="N° 02"
          eyebrow="The Community"
          title={
            <>
              The room <span className="italic text-gold">already exists.</span>
            </>
          }
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`reveal reveal-delay-${i + 1} in-view`}>
              <StatCard s={s} start={start} />
            </div>
          ))}
        </div>

        <div ref={ref} className="reveal mt-24 max-w-3xl mx-auto">
          <p className="text-center font-serif italic text-2xl md:text-3xl text-foreground/90 mb-16">
            "You don't reach this audience.
            <br />
            <span className="text-gold">You sit alongside them.</span>"
          </p>

          <div className="space-y-7">
            <div className="text-[11px] tracking-luxury uppercase text-muted-foreground mb-2">
              Member Composition
            </div>
            {breakdown.map((b, i) => (
              <div key={b.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/90">{b.label}</span>
                  <span className="text-primary font-serif">{b.pct}%</span>
                </div>
                <div className="h-px bg-border overflow-hidden">
                  <div
                    className="h-full bg-gold transition-all duration-[2000ms] ease-out"
                    style={{
                      width: start ? `${b.pct}%` : "0%",
                      transitionDelay: `${i * 200}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
