import HeroBanner from "@/components/homepage/HeroBanner";
import ServicesSection from "@/components/homepage/ServicesSection";
import MantraSection from "@/components/homepage/MantraSection";
import LatestEventsSection from "@/components/homepage/LatestEventsSection";


export default function Home() {
  return (
    <>
      <main className="px-3 pt-3 md:p-0">
        <HeroBanner />
        <ServicesSection />
        <MantraSection />
        <LatestEventsSection />
      </main>
    </>
  );
}
