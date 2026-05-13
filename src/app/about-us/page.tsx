"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguageStore } from "@/lib/stores/languageStore";

/* ─── Bilingual Content ───────────────────────────────────────────── */
const content = {
  en: {
    welcomeHeading: ["Welcome To", "Hanumangadi Dot Com"],
    // Section 1
    whoWeAre: "Who We Are",
    missionTitle: "Our",
    missionHighlight: "Mission",
    badge1: "✦ Authentic & Trusted",
    mission1:
      "Hanumangadi Dot Com is one of the most authentic astrology destinations for not only those who are seeking astrological assistance, but also for high-level astrological research and development on wide scale.",
    mission2:
      "It is a prolific astrological source for people to help them out from mundane questions to specialized queries. Our aim is to ameliorate those who are facing problems and betterment of humanity using divine science of astrology.",
    // Section 2
    ourLeadership: "Our Leadership",
    renownedTitle: "Renowned",
    renownedHighlight: "Astrologer",
    badge2: "✦ Expert Guidance",
    renowned1:
      "Keeping this all-embracing vision in mind, renowned astrologer and founder of Hanumangadi Dot Com has dedicated his life to spreading the authentic wisdom of Vedic astrology to every corner of the world.",
    renowned2:
      "The HanumanGadi team that works in his guidance consists of many expert astrologers pertaining to different schools of astrology.",
    // Contact section
    quoteText:
      "The HanumanGadi team that works in his guidance consists of many expert astrologers pertaining to different schools of astrology.",
    contactUs: "Contact Us",
    address: ["Shri Ram Satsang Bhawan Choti Chhavni", "Ayodhya, 224001"],
  },
  hi: {
    welcomeHeading: ["हनुमानगढ़ी डॉट कॉम में", "आपका स्वागत है"],
    // Section 1
    whoWeAre: "हम कौन हैं",
    missionTitle: "हमारा",
    missionHighlight: "उद्देश्य",
    badge1: "✦ प्रामाणिक और विश्वसनीय",
    mission1:
      "हनुमानगादी डॉट कॉम न केवल उन लोगों के लिए सबसे प्रामाणिक ज्योतिष स्थलों में से एक है जो ज्योतिषीय सहायता चाहते हैं, बल्कि व्यापक पैमाने पर उच्च-स्तरीय ज्योतिषीय शोध और विकास के लिए भी है।",
    mission2:
      "यह लोगों के लिए सांसारिक प्रश्नों से लेकर विशेष प्रश्नों तक की मदद करने वाला एक विपुल ज्योतिष स्रोत है। हमारा उद्देश्य समस्याओं का सामना कर रहे लोगों की मदद करना और ज्योतिष के दिव्य विज्ञान का उपयोग करके मानवता की बेहतरी करना है।",
    // Section 2
    ourLeadership: "हमारा नेतृत्व",
    renownedTitle: "प्रसिद्ध",
    renownedHighlight: "ज्योतिषी",
    badge2: "✦ विशेषज्ञ मार्गदर्शन",
    renowned1:
      "इस सर्वव्यापी दृष्टि को ध्यान में रखते हुए, प्रसिद्ध ज्योतिषी आचार्य हरीश गौतम ने बीमार मानव जाति की मदद के लिए ज्योतिषीय ज्ञान का उपयोग करने के लिए हनुमानगादी.कॉम की शुरुआत की। वे स्वयं एक चतुर और अनुभवी ज्योतिषी हैं और समझते हैं कि कैसे विभिन्न ज्योतिष प्रणालियों जैसे रामरक्षा यंत्र, पितृदोष यंत्र आदि को व्यावहारिक रूप से व्यवहार्य परिणाम प्राप्त करने के लिए विभिन्न स्थितियों में लागू किया जा सकता है।",
    renowned2:
      "उनके मार्गदर्शन में काम करने वाली हनुमानगादी टीम में ज्योतिष के विभिन्न विद्यालयों से संबंधित कई विशेषज्ञ ज्योतिषी शामिल हैं।",
    // Contact section
    quoteText:
      "उनके मार्गदर्शन में काम करने वाली हनुमानगादी टीम में ज्योतिष के विभिन्न विद्यालयों से संबंधित कई विशेषज्ञ ज्योतिषी शामिल हैं।",
    contactUs: "संपर्क करें",
    address: ["श्री राम सत्संग भवन छोटी छावनी", "अयोध्या, 224001"],
  },
};

/* ─── Animation Variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/* ─── Decorative Divider ─────────────────────────────────────────── */
function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <motion.span
        className="h-[2px] w-16 bg-gradient-to-r from-transparent to-orange-400 rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ transformOrigin: "right" }}
      />
      <motion.span
        className="text-orange-500 text-xl"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      >
        ✦
      </motion.span>
      <motion.span
        className="h-[2px] w-16 bg-gradient-to-l from-transparent to-orange-400 rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────── */
export default function AboutUsPage() {
  const language = useLanguageStore((s) => s.language);
  const t = content[language];

  return (
    <div className="min-h-screen bg-[#fdf8f2] overflow-x-hidden">

      {/* ══════════ HERO BANNER ══════════ */}
      <section className="w-full">
        {/* Full-width banner image */}
        <div className="m-3 md:m-0">

          <div className="w-full md:h-[520px] rounded-2xl md:rounded-none overflow-hidden">
            <Image
              src="/banners/about-us.png"
              alt={"About Us \u2013 Hanumangadi"}
              width={1920}
              height={420}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Welcome heading below banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center py-8 px-4"
        >
          <h1 className="text-xl md:text-2xl font-bold tracking-widest text-[#7b1c1c] uppercase">
            {t.welcomeHeading[0]}
            <br />
            {t.welcomeHeading[1]}
          </h1>
        </motion.div>
      </section>

      {/* ══════════ SECTION 1 — Mission ══════════ */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <motion.div
            variants={fadeLeft}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex-shrink-0 w-full md:w-[420px]"
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-orange-300 to-amber-200 blur-xl opacity-40 -z-10" />
            <Image
              src="/banners/banner1.png"
              alt="Hanumangadi Team"
              width={420}
              height={420}
              className="rounded-3xl shadow-2xl object-cover border-2 border-orange-100 w-full"
            />
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.4 }}
              className="absolute -bottom-4 -right-4 bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
            >
              {t.badge1}
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeRight}
            custom={0.15}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex-1"
          >
            <span className="inline-block mb-3 text-xs font-bold tracking-widest uppercase text-orange-500 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
              {t.whoWeAre}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
              {t.missionTitle} <span className="text-orange-600">{t.missionHighlight}</span>
            </h2>
            <OrnamentDivider />
            <div className="mt-5 space-y-4 text-gray-600 text-[1.05rem] leading-relaxed">
              <p>{t.mission1}</p>
              <p>{t.mission2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ SECTION 2 — Renowned Astrologer ══════════ */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          {/* Image */}
          <motion.div
            variants={fadeRight}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex-shrink-0 w-full md:w-[420px]"
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-amber-300 to-orange-200 blur-xl opacity-40 -z-10" />
            <Image
              src="/banners/banner2.png"
              alt="Renowned Astrologer"
              width={420}
              height={420}
              className="rounded-3xl shadow-2xl object-cover border-2 border-amber-100 w-full"
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.4 }}
              className="absolute -bottom-4 -left-4 bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
            >
              {t.badge2}
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeLeft}
            custom={0.15}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex-1"
          >
            <span className="inline-block mb-3 text-xs font-bold tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
              {t.ourLeadership}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
              {t.renownedTitle} <span className="text-amber-600">{t.renownedHighlight}</span>
            </h2>
            <OrnamentDivider />
            <div className="mt-5 space-y-4 text-gray-600 text-[1.05rem] leading-relaxed">
              <p>{t.renowned1}</p>
              <p>{t.renowned2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ CONTACT / QUOTE SECTION ══════════ */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-700 via-orange-600 to-amber-600" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 p-10 md:p-16">
            {/* Left quote text */}
            <div className="flex-1 text-white">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {/* <p className="text-2xl font-light italic opacity-20 leading-none">"</p> */}
                <p className="text-xl md:text-2xl font-semibold leading-relaxed">
                  {t.quoteText}
                </p>
              </motion.div>
            </div>

            {/* Right contact card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-white min-w-[260px]"
            >
              <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-4">
                {t.contactUs}
              </p>
              <div className="space-y-3 text-sm leading-relaxed">
                <p className="font-bold text-base">Hanumangadi Dot Com</p>
                <p className="opacity-80">
                  {t.address[0]}
                  <br />
                  {t.address[1]}
                </p>
                <p className="opacity-80">📞 +91 8239455455</p>
                <p className="opacity-80">✉ hanumangadiayodhya@gmail.com</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
