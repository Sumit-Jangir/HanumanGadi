"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Eye } from "lucide-react";
import { useGalleryStore } from "@/lib/stores/galleryStore";

type TabType = "all" | "images" | "videos";

type GalleryItem =
    | {
        type: "image";
        src: string;
        title?: string;
    }
    | {
        type: "video";
        src: string;
        title: string;
    };

type ModalState = {
    index: number;
} | null;

const getVideoEmbedUrl = (url: string) => {
    if (!url) return "";

    if (url.includes("youtube.com/watch?v=")) {
        const videoId = url.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    return url;
};

const getProxyImage = (src: string) => {
    return src?.startsWith("http")
        ? `/api/image-proxy?url=${encodeURIComponent(src)}`
        : src;
};

function GalleryTabs({
    activeTab,
    setActiveTab,
}: {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
}) {
    const tabs: { key: TabType; label: string }[] = [
        { key: "all", label: "ALL" },
        { key: "images", label: "Images" },
        { key: "videos", label: "Videos" },
    ];

    return (
        <div className="flex justify-center mb-10">
            <div className="flex items-center gap-3 bg-white/95 border border-[#e7c9a6] rounded-full px-3 py-2 shadow-md">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;

                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-6 py-2.5 rounded-[999px] text-sm font-bold transition-all duration-300 ${isActive
                                    ? "btn-gradient-slide !rounded-full !py-2 text-white shadow-lg"
                                    : "text-brand-brown hover:bg-[#f3e7dc]"
                                }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function GallerySkeleton() {
    return (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {Array.from({ length: 12 }).map((_, index) => (
                <div
                    key={index}
                    className={`break-inside-avoid rounded-xl bg-white/70 border border-[#e7c9a6] shadow-sm animate-pulse mb-4 ${index % 3 === 0 ? "h-72" : index % 3 === 1 ? "h-52" : "h-64"
                        }`}
                />
            ))}
        </div>
    );
}

function GalleryGrid({
    items,
    onOpen,
}: {
    items: GalleryItem[];
    onOpen: (index: number) => void;
}) {
    if (!items.length) {
        return (
            <div className="text-center bg-white/80 border border-[#e7c9a6] rounded-2xl p-10 text-brand-brown">
                No gallery items available.
            </div>
        );
    }

    return (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {items.map((item, index) => {
                const imageSrc =
                    item.type === "image" ? getProxyImage(item.src) : item.src;

                return (
                    <motion.div
                        key={`${item.type}-${item.src}-${index}`}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: index * 0.03 }}
                        onClick={() => onOpen(index)}
                        className="
                            group relative break-inside-avoid overflow-hidden rounded-xl
                            bg-white shadow-md cursor-pointer border border-[#e7c9a6]
                            hover:shadow-2xl hover:border-[#8b5a3c]
                            transition-all duration-500 mb-4
                            "
                    >
                        {item.type === "image" ? (
                            <img
                                src={imageSrc}
                                alt={`Gallery image ${index + 1}`}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                        ) : (
                            <>
                                <video
                                    src={item.src}
                                    muted
                                    preload="metadata"
                                    playsInline
                                    className="w-full h-auto object-contain bg-black transition-transform duration-700 group-hover:scale-[1.03]"
                                />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        className="
                                                w-14 h-14
                                                rounded-full
                                                border border-white/40
                                                bg-black/40
                                                backdrop-blur-md
                                                flex items-center justify-center
                                                transition-all duration-300
                                                group-hover:scale-110
                                                group-hover:bg-black/55
                                                "
                                    >
                                        <Play
                                            size={24}
                                            fill="white"
                                            className="text-white ml-[2px]"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            {item.type === "image" && (
                                <div className="w-11 h-11 rounded-full bg-white/90 text-[#7a4326] flex items-center justify-center shadow-lg">
                                    <Eye size={21} />
                                </div>
                            )}
                        </div>

                        {item.type === "video" && item.title && (
                            <div className="absolute left-0 right-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                                <p className="text-white text-xs font-semibold line-clamp-1">
                                    {item.title}
                                </p>
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}

function GalleryModal({
    modal,
    items,
    onClose,
    onNext,
    onPrev,
}: {
    modal: ModalState;
    items: GalleryItem[];
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}) {
    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowRight") onNext();
            if (event.key === "ArrowLeft") onPrev();
        };

        if (modal) window.addEventListener("keydown", handleKey);

        return () => window.removeEventListener("keydown", handleKey);
    }, [modal, onClose, onNext, onPrev]);

    if (!modal) return null;

    const item = items[modal.index];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition"
                >
                    <X size={24} />
                </button>

                {items.length > 1 && (
                    <>
                        <button
                            onClick={onPrev}
                            className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition"
                        >
                            <ChevronLeft size={26} />
                        </button>

                        <button
                            onClick={onNext}
                            className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition"
                        >
                            <ChevronRight size={26} />
                        </button>
                    </>
                )}

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="relative max-w-5xl w-full"
                >
                    {item.type === "image" ? (
                        <div className="flex justify-center">
                            <img
                                src={getProxyImage(item.src)}
                                alt="Gallery preview"
                                referrerPolicy="no-referrer"
                                className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                            />
                        </div>
                    ) : (
                        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                            {item.src.includes("youtube.com") ||
                                item.src.includes("youtu.be") ? (
                                <div className="aspect-video">
                                    <iframe
                                        src={getVideoEmbedUrl(item.src)}
                                        title={item.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            ) : (
                                <video
                                    src={item.src}
                                    controls
                                    autoPlay
                                    playsInline
                                    className="w-full max-h-[80vh] bg-black"
                                />
                            )}

                            {item.title && (
                                <div className="bg-white p-5">
                                    <h3 className="text-lg font-bold text-brand-brown">
                                        {item.title}
                                    </h3>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function GalleryPage() {
    const { images, videos, loading, error, fetchGallery } = useGalleryStore();

    const [activeTab, setActiveTab] = useState<TabType>("all");
    const [modal, setModal] = useState<ModalState>(null);

    useEffect(() => {
        fetchGallery();
    }, [fetchGallery]);

    const allItems: GalleryItem[] = useMemo(() => {
        const imageItems: GalleryItem[] = images.map((src) => ({
            type: "image",
            src,
        }));

        const videoItems: GalleryItem[] = videos.map((video) => ({
            type: "video",
            src: video.url,
            title: video.title,
        }));

        return [...imageItems, ...videoItems];
    }, [images, videos]);

    const filteredItems = useMemo(() => {
        if (activeTab === "images") {
            return allItems.filter((item) => item.type === "image");
        }

        if (activeTab === "videos") {
            return allItems.filter((item) => item.type === "video");
        }

        return allItems;
    }, [activeTab, allItems]);

    const handleNext = () => {
        if (!modal || filteredItems.length === 0) return;

        setModal({
            index: (modal.index + 1) % filteredItems.length,
        });
    };

    const handlePrev = () => {
        if (!modal || filteredItems.length === 0) return;

        setModal({
            index: modal.index === 0 ? filteredItems.length - 1 : modal.index - 1,
        });
    };

    return (
        <div className="theme-page max-w-[1920px] mx-auto overflow-x-hidden">
            {/* Banner Section */}
            <section className="w-full">
                <div className="m-3 md:m-0">
                    <div className="w-full h-auto rounded-2xl md:rounded-none overflow-hidden">
                        <Image
                            src="/banners/GalleryBanner.png"
                            alt="Gallery Banner"
                            width={1920}
                            height={600}
                            className="w-full h-full object-contain"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
                <div className="mb-8 md:mb-10 flex items-center justify-center">
                    <h2 className="text-3xl items-center md:text-4xl font-bold text-brand-brown">
                        Gallery
                    </h2>
                </div>

                <GalleryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {error ? (
                    <div className="text-center bg-red-50 border border-red-200 text-red-600 rounded-2xl p-8">
                        Failed to load gallery
                    </div>
                ) : loading ? (
                    <GallerySkeleton />
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -18 }}
                            transition={{ duration: 0.3 }}
                        >
                            <GalleryGrid
                                items={filteredItems}
                                onOpen={(index) => setModal({ index })}
                            />
                        </motion.div>
                    </AnimatePresence>
                )}
            </section>

            <GalleryModal
                modal={modal}
                items={filteredItems}
                onClose={() => setModal(null)}
                onNext={handleNext}
                onPrev={handlePrev}
            />
        </div>
    );
}