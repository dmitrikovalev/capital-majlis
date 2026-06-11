import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Society from "@/components/Society";
import Community from "@/components/Community";
import Experiences from "@/components/Experiences";
import Cars from "@/components/Cars";
import Digital from "@/components/Digital";
import Partners from "@/components/Partners";
import Membership from "@/components/Membership";
import Partnership from "@/components/Partnership";
import Contact from "@/components/Contact";
import { Closing, Footer } from "@/components/Closing";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "ADMSOC — Abu Dhabi Majlis Society · A Society, Not a Scene";
    const desc = "A private, invite-only society of supercar owners, collectors and decision-makers in Abu Dhabi.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Society />
      <Community />
      <Experiences />
      <Cars />
      <Digital />
      <Partners />
      <Membership />
      <Partnership />
      <Contact />
      <Closing />
      <Footer />
    </main>
  );
};

export default Index;
