import SectionHeading from "./SectionHeading";
import aliPhilippLogo from "@/assets/ali_philipp_logo.jpeg";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "loading" | "success" | "error";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB — matches the storage bucket cap.
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

const Membership = () => {
  const ref = useReveal<HTMLDivElement>();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [doc, setDoc] = useState<File | null>(null);
  const [docError, setDocError] = useState("");

  // When the form collapses into the short success message, the layout shifts
  // and the confirmation can end up scrolled off-screen on mobile — bring it back.
  useEffect(() => {
    if (status === "success") {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!doc) {
      setDocError("Please attach the vehicle registration certificate.");
      return;
    }

    setStatus("loading");
    const fd = new FormData(e.currentTarget);

    // Honeypot: bots fill every field, humans never see this one.
    if (fd.get("website")) {
      setStatus("success");
      return;
    }

    // Upload the certificate to the private bucket first; keep only its path on the row.
    const ext = doc.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("vehicle-registrations")
      .upload(path, doc, { contentType: doc.type, upsert: false });
    if (uploadError) {
      setErrorMsg("We couldn't upload your document. Please try again or contact us directly.");
      setStatus("error");
      return;
    }

    const { error } = await supabase.from("membership_requests").insert({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      cars: fd.get("cars") as string,
      referred_by: (fd.get("ref") as string) || null,
      registration_doc_path: path,
    });
    if (error) {
      setErrorMsg("Something went wrong. Please try again or contact us directly.");
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  const handleDoc = (file: File | null) => {
    setDocError("");
    if (!file) {
      setDoc(null);
      return;
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setDoc(null);
      setDocError("Please upload an image file (JPG, PNG, WEBP or HEIC).");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setDoc(null);
      setDocError("Image is too large — maximum size is 10 MB.");
      return;
    }
    setDoc(file);
  };

  return (
    <section id="membership" className="relative py-32 md:py-40 px-6 md:px-10 bg-card border-y border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold opacity-40 pointer-events-none" />
      <div ref={ref} className="reveal relative max-w-[1280px] mx-auto grid gap-12 lg:grid-cols-[minmax(340px,0.9fr)_1fr_1.05fr]">
        <div className="hidden lg:block relative group">
          <div className="absolute -inset-px bg-gradient-to-b from-gold/40 to-transparent pointer-events-none z-10" />
          <img
            src={aliPhilippLogo}
            alt="ADM Society — members at an exclusive automotive gathering"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover border border-border grayscale-[0.15] transition-all duration-700 group-hover:grayscale-0"
          />
        </div>

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
            {["Personally vetted", "Residence in the capital preferred", "Discretion guaranteed"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rotate-45" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 bg-background/60 border border-border p-8 md:p-10"
        >
          {status === "success" ? (
            <div className="py-12 text-center space-y-4">
              <div className="font-serif text-3xl text-gold">Received.</div>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your submission is under review. If there is alignment, a member of the society will contact you privately.
              </p>
            </div>
          ) : (
            <>
              <Field label="Full Name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone (incl. country code)" name="phone" />
              <Field label="Vehicle / Collection" name="cars" />
              <RegistrationUpload doc={doc} error={docError} onSelect={handleDoc} />
              <Field label="Referred by (optional)" name="ref" />
              {/* Honeypot — hidden from users, traps bots that fill all fields */}
              <div aria-hidden="true" style={{ display: "none" }}>
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              {/* PDPL consent — required legal basis for processing the submitted data */}
              <label htmlFor="consent" className="group/consent flex items-start gap-4 cursor-pointer pt-2">
                <input id="consent" name="consent" type="checkbox" required className="peer sr-only" />
                <span className="mt-[3px] w-3.5 h-3.5 shrink-0 rotate-45 border border-border peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-1 peer-focus-visible:ring-primary transition-all duration-500" />
                <span className="text-[11px] leading-relaxed text-muted-foreground">
                  I consent to the processing of my personal data for the purpose of considering this
                  enquiry, as described in the{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:opacity-80 transition-opacity underline underline-offset-4 decoration-primary/40"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
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
                Referrals preferred
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

const RegistrationUpload = ({
  doc,
  error,
  onSelect,
}: {
  doc: File | null;
  error: string;
  onSelect: (file: File | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Object URLs must be revoked to avoid leaks; regenerate whenever the file changes.
  useEffect(() => {
    if (!doc) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(doc);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [doc]);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(e.target.files?.[0] ?? null);
    e.target.value = ""; // allow re-selecting the same file after removal
  };

  return (
    <div className="group">
      <label className="block text-[10px] tracking-luxury uppercase text-muted-foreground mb-2">
        Vehicle Ownership Certificate
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={pick}
        className="sr-only"
        tabIndex={-1}
      />
      {/* Mobile camera capture — opens the rear camera directly. */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={pick}
        className="sr-only"
        tabIndex={-1}
      />

      {doc && preview ? (
        <div className="flex items-center gap-4 border border-border bg-background/40 p-3">
          <img
            src={preview}
            alt="Registration certificate preview"
            className="h-16 w-16 shrink-0 object-cover border border-border/60"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-foreground">{doc.name}</p>
            <p className="mt-1 text-[10px] tracking-wider-2 uppercase text-muted-foreground">
              {(doc.size / 1024 / 1024).toFixed(1)} MB · Attached
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="shrink-0 text-[10px] tracking-luxury uppercase text-muted-foreground hover:text-primary transition-colors duration-500"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="border border-dashed border-border bg-background/30 px-5 py-6 text-center transition-colors duration-500 group-hover:border-primary/50">
          <p className="text-xs text-muted-foreground">
            A clear photo or scan of the certificate
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="border border-border px-5 py-2.5 text-[10px] tracking-luxury uppercase text-foreground hover:border-primary hover:text-primary transition-colors duration-500"
            >
              Upload Image
            </button>
            {/* Camera shortcut — only meaningful on touch devices. */}
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="md:hidden border border-border px-5 py-2.5 text-[10px] tracking-luxury uppercase text-foreground hover:border-primary hover:text-primary transition-colors duration-500"
            >
              Take Photo
            </button>
          </div>
          <p className="mt-3 text-[10px] tracking-wider-2 uppercase text-muted-foreground/70">
            JPG · PNG · HEIC — up to 10 MB
          </p>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
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
