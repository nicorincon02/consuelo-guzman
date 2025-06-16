// app/page.tsx
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/Pricing";
import ProcessFlowSection from "@/components/ProcessFlow";
import ClosetBasicsSection from "@/components/ClosetBasics";
import SobreLiaSection from "@/components/SobreLiaSection";
import ContactoSection from "@/components/ContactoSection";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProcessFlowSection />
      <PricingSection />
      <ClosetBasicsSection />
      <SobreLiaSection />
      <ContactoSection />
    </main>
  );
}