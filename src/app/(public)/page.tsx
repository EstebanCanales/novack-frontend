import HeroSection from "../../components/home/ui/secctions/hero-section/heroSection";
import { Navbar } from "@/components/home/ui/navbar/navbar";

export default function page() {
  return (
    <>
      <Navbar />

      <main className="m-4 mt-24.5">
        <HeroSection />
      </main>
    </>
  );
}
