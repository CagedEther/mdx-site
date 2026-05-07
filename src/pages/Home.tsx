import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Calculator />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
