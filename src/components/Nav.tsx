import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";

const links = [
  { href: "#society", label: "Society" },
  { href: "#community", label: "Community" },
  { href: "#experiences", label: "Experiences" },
  { href: "#cars", label: "Cars" },
  { href: "#partners", label: "Partners" },
  { href: "#contact", label: "Contact" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group" aria-label="Abu Dhabi Majlis Society">
          <img
            src={logo}
            alt="Abu Dhabi Majlis Society"
            width={160}
            height={48}
            className="h-9 md:h-10 w-auto object-contain"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs tracking-wider-2 uppercase text-muted-foreground hover:text-primary transition-colors duration-500"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#membership"
          className="hidden lg:inline-flex items-center text-xs tracking-wider-2 uppercase border border-primary/60 px-5 py-3 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500"
        >
          Request Invitation
        </a>

        <button
          aria-label="Menu"
          className="lg:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border/50">
          <div className="flex flex-col px-6 py-6 gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm tracking-wider-2 uppercase text-muted-foreground hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#membership"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center text-xs tracking-wider-2 uppercase border border-primary/60 px-5 py-3 text-primary"
            >
              Request Invitation
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
