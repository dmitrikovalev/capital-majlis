import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Footer } from "./Closing";
import logo from "@/assets/adm-logo.png";

export interface LegalSection {
  title: string;
  body: ReactNode;
}

interface Props {
  eyebrow: string;
  title: ReactNode;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
  documentTitle: string;
}

const LegalLayout = ({ eyebrow, title, updated, intro, sections, documentTitle }: Props) => {
  useEffect(() => {
    document.title = documentTitle;
    window.scrollTo(0, 0);
  }, [documentTitle]);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="Abu Dhabi Majlis Society">
            <img
              src={logo}
              alt="Abu Dhabi Majlis Society"
              width={90}
              height={60}
              className="h-20 md:h-24 w-auto object-contain"
            />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-xs tracking-wider-2 uppercase text-muted-foreground hover:text-primary transition-colors duration-500"
          >
            <ArrowLeft size={14} />
            Return to the Society
          </Link>
        </div>
      </header>

      <section className="relative pt-44 pb-24 md:pt-52 md:pb-32 px-6 md:px-10 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30 pointer-events-none" />
        <div className="relative max-w-[900px] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-serif text-primary text-sm">Legal</span>
            <span className="h-px w-10 bg-primary/60" />
            <span className="text-[11px] tracking-luxury uppercase text-muted-foreground">{eyebrow}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] text-foreground">{title}</h1>
          <p className="mt-8 text-[11px] tracking-luxury uppercase text-muted-foreground">
            Last updated · {updated}
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-[900px] mx-auto">
          <div className="text-base text-muted-foreground leading-relaxed max-w-2xl">{intro}</div>

          <div className="mt-20 space-y-16">
            {sections.map((s, i) => (
              <article key={s.title} className="border-l border-primary/40 pl-6 md:pl-10">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-serif text-gold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground">{s.title}</h2>
                </div>
                <div className="text-sm md:text-base text-muted-foreground leading-relaxed space-y-4 max-w-2xl [&_strong]:text-foreground [&_a]:text-primary [&_a:hover]:opacity-80 [&_ul]:space-y-2 [&_li]:flex [&_li]:items-baseline [&_li]:gap-3">
                  {s.body}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-24 pt-10 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-[11px] tracking-luxury uppercase text-muted-foreground">
              Discretion guaranteed
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-xs tracking-luxury uppercase text-primary hover:gap-5 transition-all duration-500"
            >
              <ArrowLeft size={14} />
              Return to the Society
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export const Bullet = ({ children }: { children: ReactNode }) => (
  <li>
    <span className="w-1.5 h-1.5 shrink-0 bg-primary rotate-45 translate-y-[-1px]" />
    <span>{children}</span>
  </li>
);

export default LegalLayout;
