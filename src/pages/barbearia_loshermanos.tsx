import Navbar from "@/components/barbearia_loshermanos/Navbar";
import HeroSection from "@/components/barbearia_loshermanos/HeroSection";
import ServicesSection from "@/components/barbearia_loshermanos/ServicesSection";
import BarbersSection from "@/components/barbearia_loshermanos/BarbersSection";
import StatsSection from "@/components/barbearia_loshermanos/StatsSection";
import SubscriptionSection from "@/components/barbearia_loshermanos/SubscriptionSection";
import TestimonialSection from "@/components/barbearia_loshermanos/TestimonialSection";
import CTASection from "@/components/barbearia_loshermanos/CTASection";
import Footer from "@/components/barbearia_loshermanos/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <BarbersSection />
        <SubscriptionSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
