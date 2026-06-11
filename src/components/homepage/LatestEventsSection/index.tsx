"use client";

import React, { useEffect, useState } from "react";
import { useGalleryStore } from "@/lib/stores/galleryStore";
import { motion } from "framer-motion";

const LatestEventsSection = () => {
  const { videos, images, fetchGallery, loading } = useGalleryStore();
  const [mounted, setMounted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchGallery();
  }, [fetchGallery]);

  // Only show skeleton on true first load (no data cached yet)
  const hasData = videos.length > 0 || images.length > 0;
  if (!mounted || (loading && !hasData)) {
    return (
      <div className="bg-brand-orange py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
            Latest Events
          </h2>
          <div className="animate-pulse flex justify-center">
            <div className="w-full max-w-4xl rounded-2xl bg-white/20 aspect-video" />
          </div>
        </div>
      </div>
    );
  }

  // Use the "Ram Raksha yantra" video as requested.
  const featuredVideo = videos.find(
    (v) => v.title.toLowerCase().includes("ram raksha yantra")
  ) || videos[0];
  let thumbnailImage = images[3] || "https://hanumangadi.com/hanumangadi/uploads/images/WhatsApp_Image_2025-02-03_at_17_51_45.jpeg";
  // Proxy external thumbnail images to avoid CORS issues
  if (thumbnailImage && thumbnailImage.startsWith("http")) {
    thumbnailImage = `/api/image-proxy?url=${encodeURIComponent(thumbnailImage)}`;
  }

  // Use proxy for external video URLs
  const getVideoSrc = (url: string) =>
    url && url.startsWith("http")
      ? `/api/video-proxy?url=${encodeURIComponent(url)}`
      : url;

  return (
    <div
      className="py-8 md:py-10 -mx-3 md:mx-0 relative overflow-hidden bg-cover bg-center bg-scroll md:bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(232,168,124,0.50), rgba(212,132,92,0.50)), url('/banners/video.png')",
        backgroundColor: "#E8A87C",
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-[#ffb87b]/20 blur-2xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
            Latest Events
          </h2>
          <div className="w-24 h-1.5 bg-white mx-auto rounded-full"></div>
        </motion.div>

        {featuredVideo && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="w-full max-w-4xl">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/70 via-white/40 to-transparent shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/95 backdrop-blur">
                  {/* <div className="absolute left-4 top-4 z-20 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur">
                    Featured
                  </div>
                  <div className="absolute right-4 top-4 z-20 rounded-full border border-white/40 bg-black/35 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
                    HD Video
                  </div> */}

                  {selectedVideo ? (
                    <>
                      <video
                        src={getVideoSrc(selectedVideo)}
                        title="Latest Event Video"
                        controls
                        autoPlay
                        className="h-full w-full"
                      />
                      <button
                        type="button"
                        className="absolute bottom-4 right-4 z-20 rounded-full bg-black/65 px-4 py-2 text-xs font-semibold text-white transition hover:bg-black/80"
                        onClick={() => setSelectedVideo(null)}
                      >
                        Back to Preview
                      </button>
                    </>
                  ) : (
                    <div
                      className="relative h-full w-full flex items-center justify-center cursor-pointer"
                      style={{
                        backgroundImage: `linear-gradient(120deg, rgba(11,19,35,0.82), rgba(2,8,18,0.92)), url('${thumbnailImage}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      onClick={() => setSelectedVideo(featuredVideo.url)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1f3358]/35 to-black/45" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />

                      <motion.div
                        className="relative z-10"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full border border-white/40"
                          animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                        />
                        <div className="relative h-12 w-12 md:h-20 md:w-20 rounded-full bg-[#EA9137] flex items-center justify-center shadow-[0_10px_30px_rgba(229,33,42,0.55)]">
                          <svg
                            className="h-6 w-6 md:h-10 md:w-10 fill-current text-white"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </motion.div>

                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 md:p-7">
                        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-white/70">
                          Special Presentation
                        </p>
                        <h3 className="text-white text-xl md:text-2xl font-bold">
                          {featuredVideo.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LatestEventsSection;
