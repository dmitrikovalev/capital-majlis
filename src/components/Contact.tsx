import SectionHeading from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import { MessageCircle, Phone } from "lucide-react";

const contacts = [
  { name: "Ali", phone: "+971 50 228 6616", wa: "971502286616" },
  { name: "Philipp", phone: "+971 55 111 0052", wa: "971551110052" },
];

const Contact = () => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="contact" className="relative py-32 md:py-40 px-6 md:px-10 bg-card border-t border-border/50">
      <div ref={ref} className="reveal max-w-[1100px] mx-auto">
        <SectionHeading
          align="center"
          number="N° 09"
          eyebrow="Contact"
          title={
            <>
              <span className="italic text-gold">Direct Access.</span>
            </>
          }
        />
        <p className="text-center max-w-xl mx-auto mt-8 text-base text-muted-foreground leading-relaxed">
          For membership inquiries, partnerships, or private introductions —
          reach out directly.
        </p>

        <div className="mt-20 grid md:grid-cols-2 gap-px bg-border/60 max-w-3xl mx-auto">
          {contacts.map((c) => (
            <div key={c.name} className="bg-background p-10 md:p-12 text-center group">
              <div className="text-[10px] tracking-luxury uppercase text-muted-foreground">Principal</div>
              <h3 className="font-serif text-4xl text-foreground mt-3">{c.name}</h3>
              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="block mt-6 font-serif text-xl text-gold hover:opacity-80 transition-opacity"
              >
                {c.phone}
              </a>

              <div className="mt-8 flex items-center justify-center gap-3">
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

        <p className="mt-12 text-center text-[11px] tracking-luxury uppercase text-muted-foreground">
          By referral preferred
        </p>
      </div>
    </section>
  );
};

export default Contact;
