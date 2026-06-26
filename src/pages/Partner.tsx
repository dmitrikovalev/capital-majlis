import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { Footer } from "@/components/Closing";
import { supabase } from "@/lib/supabase";
import logo from "@/assets/adm-logo.png";

type Status = "idle" | "loading" | "success" | "error";

// 15 MB — matches the storage bucket cap. Generous enough for a deck, small
// enough to keep uploads quick and to discourage abuse.
const MAX_FILE_BYTES = 15 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const Partner = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    document.title = "Partner With Us, ADMSOC · Abu Dhabi Majlis Society";
    window.scrollTo(0, 0);
  }, []);

  // On success the form collapses; bring the confirmation back into view.
  useEffect(() => {
    if (status === "success") {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const handleFile = (selected: File | null) => {
    setFileError("");
    if (!selected) {
      setFile(null);
      return;
    }
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setFile(null);
      setFileError("Please attach an image (JPG, PNG, WEBP), a PDF or a PowerPoint deck.");
      return;
    }
    if (selected.size > MAX_FILE_BYTES) {
      setFile(null);
      setFileError("File is too large, maximum size is 15 MB.");
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);

    // Honeypot: bots fill every field, humans never see this one.
    if (fd.get("website")) {
      setStatus("success");
      return;
    }

    // Upload the attachment first (if any); keep only its path on the row.
    let attachmentPath: string | null = null;
    if (file) {
      const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("partnership-attachments")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (uploadError) {
        setErrorMsg("We couldn't upload your attachment. Please try again or contact us directly.");
        setStatus("error");
        return;
      }
      attachmentPath = path;
    }

    const { error } = await supabase.from("partnership_inquiries").insert({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      company: (fd.get("company") as string) || null,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
      attachment_path: attachmentPath,
    });
    if (error) {
      setErrorMsg("Something went wrong. Please try again or contact us directly.");
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

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

      <section className="relative px-6 md:px-10 pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30 pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto grid gap-12 lg:gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="lg:py-4">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-serif text-primary text-sm">N° 08</span>
              <span className="h-px w-10 bg-primary/60" />
              <span className="text-[11px] tracking-luxury uppercase text-muted-foreground">
                Partnership · B2B
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground">
              Begin a <span className="italic text-gold">conversation</span>.
            </h1>
            <p className="mt-7 text-base text-muted-foreground leading-relaxed max-w-md">
              Share your proposal directly with the principals of the society. Tell us who you are and what you
              have in mind, attach a deck if you have one, and we will respond personally where there is alignment.
            </p>

            <div className="mt-10 space-y-5 text-sm text-muted-foreground">
              {[
                { t: "One partner per category", d: "Protected positioning, by design, we keep collaborations exclusive." },
                { t: "Direct to the principals", d: "Your message reaches the people who decide, not a queue." },
                { t: "Considered in confidence", d: "Every proposal is reviewed privately and handled with discretion." },
              ].map((item) => (
                <div key={item.t} className="flex gap-4">
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-primary rotate-45" />
                  <div>
                    <p className="text-foreground">{item.t}</p>
                    <p className="mt-1 leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4 bg-card/60 border border-border p-7 md:p-8"
          >
            {status === "success" ? (
              <div className="py-12 text-center space-y-4">
                <div className="font-serif text-3xl text-gold">Received.</div>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Thank you. Your proposal has reached the principals of the society. Where there is alignment,
                  you will be contacted privately.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-3 pt-2 text-xs tracking-luxury uppercase text-primary hover:gap-5 transition-all duration-500"
                >
                  <ArrowLeft size={14} />
                  Return to the Society
                </Link>
              </div>
            ) : (
              <>
                <Field label="Full Name" name="name" />
                <Field label="Work Email" name="email" type="email" />
                <Field label="Phone" name="phone" type="tel" />
                <Field label="Company / Brand (optional)" name="company" required={false} />
                <Field label="Subject" name="subject" />
                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-[10px] tracking-luxury uppercase text-muted-foreground mb-1.5"
                  >
                    Your Proposal
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    maxLength={5000}
                    placeholder="Tell us about your brand and what you have in mind…"
                    className="w-full bg-transparent border-b border-border focus:border-primary py-2 text-foreground outline-none transition-colors duration-500 resize-y placeholder:text-muted-foreground/50"
                  />
                </div>

                <AttachmentUpload file={file} error={fileError} onSelect={handleFile} />

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
                    proposal, as described in the{" "}
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

                {status === "error" && <p className="text-xs text-destructive">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-gold text-primary-foreground py-4 text-xs tracking-luxury uppercase shadow-gold hover:shadow-none transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending…" : "Send Proposal"}
                </button>
                <p className="text-[11px] tracking-wider-2 uppercase text-muted-foreground text-center">
                  Reviewed in confidence
                </p>
              </>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

const AttachmentUpload = ({
  file,
  error,
  onSelect,
}: {
  file: File | null;
  error: string;
  onSelect: (file: File | null) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isImage = file?.type.startsWith("image/");
  const [preview, setPreview] = useState<string | null>(null);

  // Object URLs must be revoked to avoid leaks; regenerate when the file changes.
  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(e.target.files?.[0] ?? null);
    e.target.value = ""; // allow re-selecting the same file after removal
  };

  return (
    <div className="group">
      <label className="block text-[10px] tracking-luxury uppercase text-muted-foreground mb-2">
        Attachment (optional)
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf,.ppt,.pptx"
        onChange={pick}
        className="sr-only"
        tabIndex={-1}
      />

      {file ? (
        <div className="flex items-center gap-4 border border-border bg-background/40 p-3">
          {isImage && preview ? (
            <img
              src={preview}
              alt="Attachment preview"
              className="h-16 w-16 shrink-0 object-cover border border-border/60"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-border/60 bg-background/40 text-muted-foreground">
              <FileText size={22} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-foreground">{file.name}</p>
            <p className="mt-1 text-[10px] tracking-wider-2 uppercase text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(1)} MB · Attached
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
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-between gap-4 border border-dashed border-border bg-background/30 px-4 py-3 text-left transition-colors duration-500 hover:border-primary/50 group-hover:border-primary/50"
        >

          <span className="shrink-0 text-[10px] tracking-luxury uppercase text-foreground">
            Attach File
          </span>
        </button>
      )}

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
};

const Field = ({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) => (
  <div className="group">
    <label htmlFor={name} className="block text-[10px] tracking-luxury uppercase text-muted-foreground mb-1.5">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      required={required}
      className="w-full bg-transparent border-b border-border focus:border-primary py-2 text-foreground outline-none transition-colors duration-500"
    />
  </div>
);

export default Partner;
