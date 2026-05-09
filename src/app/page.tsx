import HeroBanner from "@/components/homepage/HeroBanner";
import ServicesSection from "@/components/homepage/ServicesSection";
import MantraSection from "@/components/homepage/MantraSection";
import LatestEventsSection from "@/components/homepage/LatestEventsSection";


export default function Home() {
  return (
    <>
      <main className="bg-[#f8e8dd] mx-auto pt-3 md:pt-0">
        <HeroBanner />
        <ServicesSection />
        <MantraSection />
        <LatestEventsSection />
      </main>
    </>
  );
}
