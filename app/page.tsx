import Hero from "@/components/Hero";
import AsesorImagenSection from "@/components/AsesorImagenSection";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/Pricing";
import ProcessFlow from "@/components/ProcessFlow";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PricingSection />
      <ProcessFlow />
      <AsesorImagenSection />

    </main>
  );
}