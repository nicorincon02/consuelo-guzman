// app/page.tsx
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/Pricing";
import ProcessFlow from "@/components/ProcessFlow";
// Eliminar la importación de ColorProvider

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PricingSection />
      <ProcessFlow />
    </main>
  );
}