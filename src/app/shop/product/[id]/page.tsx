"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    FiCheckCircle,
    FiPackage,
    FiPlus,
    FiMinus,
} from "react-icons/fi";
import { useLanguageStore } from "@/lib/stores/languageStore";
import { useParams } from "next/navigation";
import { getProductDetail } from "@/services/product";
import { useCartStore } from "@/lib/stores/cartStore";

const ProductByIdPage = () => {
    const params = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [qty, setQty] = useState<number>(1);
    const [added, setAdded] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);
        const { addToCart } = useCartStore();
    const [tab, setTab] = useState("description");
    // Allow multiple mobile sections to be open at once
    const [activeMobileSections, setActiveMobileSections] = useState<string[]>(["description"]);

    const { language } = useLanguageStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // If the user navigates directly without a param, fallback to the requested slug
                const slug = (params?.id as string) || "";

                const response = await getProductDetail(slug);

                // Ensure we extract the product correctly whether it's wrapped in data as an array or object
                let fetchedProduct = response;
                if (response?.data && Array.isArray(response.data)) {
                    fetchedProduct = response.data[0];
                } else if (response?.data) {
                    fetchedProduct = response.data;
                } else if (Array.isArray(response)) {
                    fetchedProduct = response[0];
                }

                setProduct(fetchedProduct);

                const firstImage = fetchedProduct?.image_urls?.split(",")?.[0] || "";
                setSelectedImage(firstImage);
                setSelectedImageIndex(0);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params?.id]);

    const images = useMemo(() => {
        return product?.image_urls
            ? product.image_urls
                .split(",")
                .map((img: string) => img.trim())
                .filter(Boolean)
            : [];
    }, [product]);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 min-h-screen animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* LEFT SKELETON */}
                    <div>
                        {/* Main image skeleton */}
                        <div className="rounded-[28px] bg-gray-300 aspect-square w-full" />
                        {/* Thumbnails skeleton */}
                        <div className="flex gap-2 mt-5 flex-wrap">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-[4.8rem] h-[4.8rem] rounded-2xl bg-gray-300" />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SKELETON */}
                    <div className="flex flex-col gap-5 pt-2">
                        {/* Category badge */}
                        <div className="h-7 w-24 rounded-full bg-gray-300" />
                        {/* Title */}
                        <div className="space-y-3">
                            <div className="h-10 w-3/4 rounded-xl bg-gray-300" />
                            <div className="h-10 w-1/2 rounded-xl bg-gray-300" />
                        </div>
                        {/* Price */}
                        <div className="h-12 w-40 rounded-xl bg-gray-300" />
                        {/* Stock badge */}
                        <div className="h-5 w-24 rounded-lg bg-gray-300" />
                        {/* Short description lines */}
                        <div className="space-y-2">
                            <div className="h-4 w-full rounded bg-gray-300" />
                            <div className="h-4 w-5/6 rounded bg-gray-300" />
                            <div className="h-4 w-4/6 rounded bg-gray-300" />
                        </div>
                        {/* Booking/Qty */}
                        <div className="h-10 w-48 rounded-full bg-gray-300" />
                        {/* Button */}
                        <div className="h-14 w-full rounded-2xl bg-gray-300" />
                    </div>
                </div>

                {/* Tabs skeleton */}
                <div className="mt-14">
                    <div className="rounded-2xl bg-gray-300 h-16 w-full mb-8" />
                    <div className="rounded-[28px] bg-gray-300 h-40 w-full" />
                </div>
            </div>
        );
    }

    const availableQty = Number(product.quantity) || 0;
    const inStock = availableQty > 0;
    const price = Number(product.price) || 0;
    const total = price * qty;

    const isYagya = product.category_name?.toLowerCase() === "yagya";

    const TABS = [
        { key: "description", label: language === "hi" ? "विवरण" : "Description" },
        {
            key: "benefits",
            label:
                language === "hi"
                    ? "लाभ"
                    : "Benefits",
        },
        ...(!isYagya ? [{
            key: "info",
            label: language === "hi" ? "अतिरिक्त जानकारी" : "Additional Information",
        }] : []),
        { key: "guidelines", label: language === "hi" ? "निर्देश" : "Guidelines" },
    ];

    const benefits =
        (language === "hi" ? product.hindi_instruction : product.instruction)
            ?.split("|")
            .map((b: string) => b.trim())
            .filter(Boolean) || [];

    const descriptionHtml =
        language === "hi" ? product.hindi_description : product.description;

    const extraInfoHtml =
        language === "hi" ? product.hindi_extra_info : product.extra_info;

    const renderTabContent = (key: string) => {
        if (key === "description") {
            return descriptionHtml ? (
                <div
                    className="prose prose-sm max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
            ) : (
                <p className="text-gray-500">
                    {language === "hi" ? "कोई विवरण नहीं मिला" : "No description found."}
                </p>
            );
        }

        if (key === "benefits") {
            return (
                <ul className="space-y-3 text-base md:text-lg text-gray-800">
                    {benefits.length > 0 ? (
                        benefits.map((b: string, i: number) => (
                            <li key={i} className="flex gap-2">
                                <span className="text-brand-brown">•</span>
                                <span>{b}</span>
                            </li>
                        ))
                    ) : (
                        <li>
                            {language === "hi" ? "कोई लाभ नहीं मिला" : "No benefits found."}
                        </li>
                    )}
                </ul>
            );
        }

        if (key === "info") {
            return (
                <div className="space-y-3 text-base md:text-lg text-gray-700">
                    <p>
                        <span className="font-semibold text-gray-900">
                            {language === "hi" ? "सामग्री" : "Matrial"}:
                        </span>{" "}
                        {product.matrial || "NA"}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-900">
                            {language === "hi" ? "वजन" : "Weight"}:
                        </span>{" "}
                        {product.weight || "NA"}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-900">
                            {language === "hi" ? "आकार" : "Size"}:
                        </span>{" "}
                        {product.size || "NA"}
                    </p>
                </div>
            );
        }

        if (key === "guidelines") {
            return extraInfoHtml ? (
                <div
                    className="prose prose-sm max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: extraInfoHtml }}
                />
            ) : (
                <p className="text-gray-500">
                    {language === "hi"
                        ? "कोई दिशानिर्देश नहीं मिला"
                        : "No guidelines found."}
                </p>
            );
        }

        return null;
    };

    // Add to Cart handler
    const handleAddToCart = async () => {
        if (!product) return;
        setAddingToCart(true);
        try {
            const productSlug = product.slug || params?.id;
            const sendQty = isYagya ? 1 : qty;
            await addToCart(productSlug, String(sendQty));
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } catch (err) {
            window.alert(language === "hi" ? "कार्ट में जोड़ने में त्रुटि!" : "Error adding to cart!");
        } finally {
            setAddingToCart(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* LEFT SIDE */}
                <div>
                    {/* MAIN IMAGE */}
                    <div className="relative rounded-[28px] overflow-hidden border border-brand-brown/15 bg-gradient-to-br from-brand-cream to-brand-cream-dark aspect-square flex items-center justify-center shadow-sm">
                        {/* IMAGE COUNT */}
                        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md border border-white/40 shadow-md px-4 py-1.5 rounded-full text-sm font-semibold text-gray-700">
                            {selectedImageIndex + 1}/{images.length}
                        </div>

                        {/* IMAGE ANIMATION */}
                        <AnimatePresence mode="wait">
                            {selectedImage && (
                                <motion.div
                                    key={selectedImage}
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.08 }}
                                    transition={{ duration: 0.35 }}
                                    className="w-full h-full bg-white/70 flex items-center justify-center"
                                >
                                    <Image
                                        src={selectedImage}
                                        alt={product.product_name}
                                        width={500}
                                        height={500}
                                        className="object-contain w-full h-full drop-shadow-md"
                                        unoptimized
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* THUMBNAILS */}
                    <div className="flex gap-2 mt-5 flex-wrap">
                        {images.map((img: string, index: number) => (
                            <button
                                type="button"
                                key={img}
                                onClick={() => {
                                    setSelectedImage(img);
                                    setSelectedImageIndex(index);
                                }}
                                className={`relative w-[4.8rem] h-[4.8rem] rounded-2xl overflow-hidden transition-all duration-300 border-2 ${selectedImage === img
                                    ? "border-brand-brown shadow-md scale-105"
                                    : "border-transparent hover:border-brand-brown/40"
                                    } bg-brand-cream`}
                            >
                                <Image
                                    src={img}
                                    alt={product.product_name}
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full"
                                    unoptimized
                                    loading="lazy"
                                />

                                {selectedImage === img && (
                                    <div className="absolute inset-0 bg-brand-brown/10" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col gap-5">
                    {/* CATEGORY */}
                    <span className="text-xs font-bold tracking-[0.25em] text-brand-brown uppercase bg-brand-brown/10 border border-brand-brown/15 rounded-full px-4 py-2 w-fit">
                        {product.category_name}
                    </span>

                    {/* TITLE */}
                    <h1 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
                        {product.product_name}
                    </h1>

                    {/* PRICE */}
                    <div className="flex items-end gap-3">
                        <span className="text-4xl md:text-5xl font-semibold text-brand-brown">
                            ₹{total.toLocaleString("en-IN")}
                        </span>

                        <span className="text-sm text-gray-400 mb-1">
                            {language === "hi"
                                ? `के लिए ${qty} ${qty > 1 ? "यूनिट्स" : "यूनिट"}`
                                : `for ${qty} ${qty > 1 ? "units" : "unit"}`}
                        </span>
                    </div>

                    {/* STOCK */}
                    <div className="flex items-center gap-2 text-sm">
                        <FiCheckCircle
                            className={inStock ? "text-green-500" : "text-red-400"}
                            size={16}
                        />

                        <span
                            className={`font-semibold ${inStock ? "text-green-600" : "text-red-500"
                                }`}
                        >
                            {inStock
                                ? product.stock_status_label || "In Stock"
                                : language === "hi"
                                    ? "स्टॉक में नहीं"
                                    : "Out of Stock"}
                        </span>
                    </div>

                    {/* SHORT DESCRIPTION */}
                    {product.short_description && (
                        <div
                            className="prose prose-sm max-w-none text-gray-600"
                            dangerouslySetInnerHTML={{
                                __html:
                                    language === "hi"
                                        ? product.hindi_short_description
                                        : product.short_description,
                            }}
                        />
                    )}

                    {/* QUANTITY OR BOOKING AMOUNT */}
                    {isYagya ? (
                        <div className="flex items-center gap-4 pt-2">
                            <span className="text-base font-semibold text-gray-800">
                                {language === "hi" ? "बुकिंग राशि" : "Booking Amount"}
                            </span>
                            <span className="text-xl font-bold text-brand-brown">
                                ₹{Number(product.cod_advance_amt || 0).toLocaleString("en-IN")}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 pt-2">
                            <span className="text-base font-semibold text-gray-800">
                                {language === "hi" ? "मात्रा" : "Quantity"}
                            </span>

                            <div className="flex items-center bg-brand-cream-dark border border-orange-200 rounded-full overflow-hidden px-2 py-1 min-w-[120px]">

                                <button
                                    type="button"
                                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                                    className="w-8 h-8 flex items-center justify-center text-lg text-gray-700 hover:bg-brand-cream transition-colors rounded"
                                    tabIndex={-1}
                                    aria-label="Decrease quantity"
                                >
                                    <FiMinus />
                                </button>

                                <input
                                    type="text"
                                    value={qty}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");

                                        const numericValue = Number(value) || 1;

                                        setQty(
                                            Math.max(1, Math.min(availableQty, numericValue))
                                        );
                                    }}
                                    className="w-10 text-center outline-none text-base font-semibold bg-transparent border-none focus:ring-0"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setQty((prev) => Math.min(availableQty, prev + 1))
                                    }
                                    className="w-8 h-8 flex items-center justify-center text-lg text-gray-700 hover:bg-brand-cream transition-colors rounded"
                                    tabIndex={-1}
                                    aria-label="Increase quantity"
                                >
                                    <FiPlus />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* BUTTON */}
                    <button
                        type="button"
                        className={`mt-3 w-full h-14 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 shadow-md transition-all duration-300 ${inStock
                            ? added
                                ? "bg-green-500 text-white"
                                : "btn-gradient-slide"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        disabled={!inStock || addingToCart}
                        onClick={handleAddToCart}
                    >
                        {inStock ? (
                            addingToCart ? (
                                <>
                                    <FiPackage size={18} />
                                    {language === "hi"
                                        ? "जोड़ा जा रहा है..."
                                        : "Adding..."}
                                </>
                            ) : added ? (
                                <>
                                    <FiCheckCircle size={18} />
                                    {language === "hi"
                                        ? "कार्ट में जोड़ा गया!"
                                        : "Added to Cart!"}
                                </>
                            ) : (
                                <>
                                    <FiPackage size={18} />
                                    {language === "hi"
                                        ? "कार्ट में जोड़ें"
                                        : "Add to Cart"}
                                </>
                            )
                        ) : (
                            <>{language === "hi" ? "स्टॉक में नहीं" : "Out of Stock"}</>
                        )}
                    </button>
                </div>
            </div>

            {/* TABS SECTION */}
            <div className="max-w-6xl mx-auto mt-14">
                {/* DESKTOP */}
                <div className="hidden md:block">
                    {/* INTERACTIVE TAB BAR */}
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-2 shadow-sm border border-brand-brown/10 mb-8">
                        <div className={`grid gap-2 ${isYagya ? "grid-cols-3" : `grid-cols-4`}`}>
                            {TABS.map((t) => (
                                <button
                                    type="button"
                                    key={t.key}
                                    onClick={() => setTab(t.key)}
                                    className={`relative px-5 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${tab === t.key
                                        ? "bg-brand-brown text-white shadow-md"
                                        : "text-gray-700 hover:bg-brand-brown/10 hover:text-brand-brown"
                                        }`}
                                >
                                    {t.label}

                                    {tab === t.key && (
                                        <motion.span
                                            layoutId="activeTab"
                                            className="absolute inset-0 rounded-xl bg-brand-brown -z-10"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TAB CONTENT */}
                    <div className="bg-white/60 rounded-[28px] border border-brand-brown/10 shadow-sm p-8 min-h-[180px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={tab}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -14 }}
                                transition={{ duration: 0.25 }}
                            >
                                {renderTabContent(tab)}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* MOBILE ACCORDION */}
                <div className="md:hidden space-y-4">
                    {TABS.map((t) => {
                        const isOpen = activeMobileSections.includes(t.key);
                        return (
                            <div
                                key={t.key}
                                className="rounded-2xl border border-brand-brown/10 bg-white/70 shadow-sm overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveMobileSections((prev) =>
                                            prev.includes(t.key)
                                                ? prev.filter((k) => k !== t.key)
                                                : [...prev, t.key]
                                        );
                                    }}
                                    className="w-full flex items-center justify-between px-5 py-5 text-left"
                                >
                                    <span className="text-lg font-semibold text-gray-900">
                                        {t.label}
                                    </span>

                                    <span className="text-brand-brown text-xl">
                                        {isOpen ? <FiMinus /> : <FiPlus />}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                                                {renderTabContent(t.key)}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductByIdPage;