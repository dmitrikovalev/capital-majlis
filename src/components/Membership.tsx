import SectionHeading from "./SectionHeading";
import { useReveal } from "@/hooks/use-reveal";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "loading" | "success" | "error";

const Membership = () => {
  const ref = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("membership_requests").insert({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      cars: fd.get("cars") as string,
      referred_by: (fd.get("ref") as string) || null,
    });
    if (error) {
      setErrorMsg("Something went wrong. Please try again or contact us directly.");
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  return (
    <section id="membership" className="relative py-32 md:py-40 px-6 md:px-10 bg-card border-y border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold opacity-40 pointer-events-none" />
      <div ref={ref} className="reveal relative max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <SectionHeading
            number="N° 07"
            eyebrow="Membership"
            title={
              <>
                <span className="italic text-gold">Membership is not applied for.</span>
                <br />
                It is considered.
              </>
            }
          />
          <p className="mt-8 text-base text-muted-foreground leading-relaxed max-w-md">
            Submit your details below. If there is alignment, you will be contacted privately for an introduction.
          </p>
          <div className="mt-10 space-y-4 text-sm text-muted-foreground">
            {["Personally vetted", "Capital-based residency preferred", "Discretion guaranteed"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rotate-45" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-background/60 border border-border p-8 md:p-10"
        >
          {status === "success" ? (
            <div className="py-12 text-center space-y-4">
              <div className="font-serif text-3xl text-gold">Received.</div>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your submission is under review. If aligned, a member of the society will contact you privately.
              </p>
            </div>
          ) : (
            <>
              <Field label="Full Name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone (incl. country code)" name="phone" />
              <Field label="Vehicle / Collection" name="cars" />
              <Field label="Referred by (optional)" name="ref" />
              {status === "error" && (
                <p className="text-xs text-destructive">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-gold text-primary-foreground py-4 text-xs tracking-luxury uppercase shadow-gold hover:shadow-none transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending…" : "Submit for Consideration"}
              </button>
              <p className="text-[11px] tracking-wider-2 uppercase text-muted-foreground text-center">
                By referral preferred
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

const Field = ({ label, name, type = "text" }: { label: string; name: string; type?: string }) => (
  <div className="group">
    <label htmlFor={name} className="block text-[10px] tracking-luxury uppercase text-muted-foreground mb-2">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      required={name !== "ref"}
      className="w-full bg-transparent border-b border-border focus:border-primary py-3 text-foreground outline-none transition-colors duration-500"
    />
  </div>
);

export default Membership;
