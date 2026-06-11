import { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  number?: string;
  title: ReactNode;
  className?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ eyebrow, number, title, className = "", align = "left" }: Props) => (
  <div className={`${align === "center" ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
    {(eyebrow || number) && (
      <div className={`flex items-center gap-4 mb-6 ${align === "center" ? "justify-center" : ""}`}>
        {number && <span className="font-serif text-primary text-sm">{number}</span>}
        {number && eyebrow && <span className="h-px w-10 bg-primary/60" />}
        {eyebrow && (
          <span className="text-[11px] tracking-luxury uppercase text-muted-foreground">{eyebrow}</span>
        )}
      </div>
    )}
    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground">
      {title}
    </h2>
  </div>
);

export default SectionHeading;
