"use client";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const HeroBanner = dynamic(() => import("@/components/homepage/HeroBanner"), { ssr: false, loading: () => <HomeSkeleton section="hero" /> });
const ServicesSection = dynamic(() => import("@/components/homepage/ServicesSection"), { ssr: false, loading: () => <HomeSkeleton section="services" /> });
const MantraSection = dynamic(() => import("@/components/homepage/MantraSection"), { ssr: false, loading: () => <HomeSkeleton section="mantra" /> });
const LatestEventsSection = dynamic(() => import("@/components/homepage/LatestEventsSection"), { ssr: false, loading: () => <HomeSkeleton section="events" /> });

function HomeSkeleton({ section }: { section: string }) {
  // Use theme colors: bg-white/70 border border-[#e7c9a6] animate-pulse
  let height = "h-64";
  if (section === "hero") height = "h-[220px] md:h-[400px] lg:h-[500px]";
  if (section === "services") height = "h-56 md:h-64";
  if (section === "mantra") height = "h-40 md:h-52";
  if (section === "events") height = "h-40 md:h-52";
  return (
    <div className={`rounded-2xl bg-white/70 border border-[#e7c9a6] shadow-sm animate-pulse w-full my-6 ${height}`} />
  );
}


export default function Home() {
  return (
    <main className="px-3 pt-3 md:p-0">
      <Suspense fallback={<HomeSkeleton section="hero" />}> <HeroBanner /> </Suspense>
      <Suspense fallback={<HomeSkeleton section="services" />}> <ServicesSection /> </Suspense>
      <Suspense fallback={<HomeSkeleton section="mantra" />}> <MantraSection /> </Suspense>
      <Suspense fallback={<HomeSkeleton section="events" />}> <LatestEventsSection /> </Suspense>
    </main>
  );
}
