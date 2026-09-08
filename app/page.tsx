import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import Expertise from "@/components/Expertise";
import Principles from "@/components/Principles";
import Stats from "@/components/Stats";
import Careers from "@/components/Careers";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-jet">
      <Navbar />
      <Hero />
      <Services />
      <Partners />
      <Expertise />
      <Principles />
      <Stats />
      <Careers />
      <CTA />
      <Footer />
    </main>
  );
}
