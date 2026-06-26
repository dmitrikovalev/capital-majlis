import SectionHeading from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import { MessageCircle, Phone } from "lucide-react";
import principalsImg from "@/assets/principals-v2.jpg";

const contacts = [
  { name: "Ali", phone: "+971 50 228 6616", wa: "971502286616" },
  { name: "Philipp", phone: "+971 55 111 0052", wa: "971551110052" },
];

const Contact = () => {
  const ref = useReveal<HTMLDivElement>();
  const ref2 = useReveal<HTMLDivElement>();
  return (
    <section id="contact" className="relative py-32 md:py-40 px-6 md:px-10 bg-card border-t border-border/50">
      <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Photo of the two principals — kept fully unobstructed */}
        <div ref={ref} className="reveal relative overflow-hidden">
          <img
            src={principalsImg}
            alt="Ali and Philipp, the society's principals, at Yas Marina"
            loading="lazy"
            width={1200}
            height={1600}
            className="w-full h-auto block"
          />
          {/* subtle scrim over the empty sky for the caption — never reaches the people */}
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background/70 to-transparent" />
          <div className="absolute top-6 left-6">
            <div className="text-[10px] tracking-luxury uppercase text-primary/90">The Principals</div>
            <div className="font-serif italic text-base text-foreground/90 mt-1"> Philipp &amp; Ali</div>
          </div>
        </div>

        {/* Contact content */}
        <div ref={ref2} className="reveal reveal-delay-1">
          <SectionHeading
            number="N° 09"
            eyebrow="Contact"
            title={<span className="italic text-gold">Direct Access.</span>}
          />
          <p className="mt-8 text-base text-muted-foreground max-w-lg leading-relaxed">
            For membership inquiries, partnerships, or private introductions,
            reach out directly.
          </p>

          <div className="mt-12 space-y-px bg-border/60 border-y border-border/60">
            {contacts.map((c) => (
              <div key={c.name} className="bg-background p-8 md:p-10 group">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-[10px] tracking-luxury uppercase text-muted-foreground">Principal</div>
                    <h3 className="font-serif text-3xl text-foreground mt-2">{c.name}</h3>
                  </div>
                  <a
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                    className="font-serif text-lg text-gold hover:opacity-80 transition-opacity"
                  >
                    {c.phone}
                  </a>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={`https://wa.me/${c.wa}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-primary/60 px-5 py-2.5 text-[11px] tracking-luxury uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500"
                  >
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                  <a
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-[11px] tracking-luxury uppercase text-foreground hover:border-primary hover:text-primary transition-all duration-500"
                  >
                    <Phone size={14} /> Call
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-[11px] tracking-luxury uppercase text-muted-foreground">
            Referrals preferred
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
