import { Navbar } from "@/components/public/ui/navbar/navbar";
import Footer from "@/components/ui/footer/footer";
import CtaSection from "@/components/public/home/ui/secctions/cta/cta-section";
import HeroSection from "@/components/public/home/ui/secctions/hero/hero-section";
import Example from "@/components/public/home/ui/secctions/example/example";

export default function page() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-20 sm:pt-24 md:pt-28">
        <HeroSection />
        <Example />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
