"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import Joi from "joi";
import { saveContactUs } from "@/services/contact";
import {
  FaFacebookF,
  // FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useLanguageStore } from "@/lib/stores/languageStore";

/* ─── Bilingual Content ───────────────────────────────────────────── */
const content = {
  en: {
    bannerAlt: "Contact Us - Hanumangadi",
    pageHeading: "Contact Us",
    formTitle: "Send Us a Message",
    // formSubtitle: "We'll get back to you within 24 hours.",
    namePlaceholder: "Enter Your Name",
    mobilePlaceholder: "Enter Your Mobile",
    emailPlaceholder: "Enter Your Email",
    messagePlaceholder: "Enter Your Message...",
    submitBtn: "Submit",
    submitting: "Submitting...",
    successMsg: "Thank you! We'll be in touch soon.",
    errorMsg: "Something went wrong. Please try again.",
    addressLabel: "Address",
    contactLabel: "Contact Details",
    socialLabel: "Social Media",
    orgName: "Hanumangadi",
    addressLines: [
      "Shri Ram Satsang Bhawan",
      "Choti Chhavni Ayodhya",
      "224001",
    ],
    phone: "+91 8239455455",
  },
  hi: {
    bannerAlt: "संपर्क करें - हनुमानगढ़ी",
    pageHeading: "संपर्क करें",
    formTitle: "हमें संदेश भेजें",
    // formSubtitle: "हम 24 घंटे के भीतर आपसे संपर्क करेंगे।",
    namePlaceholder: "अपना नाम दर्ज करें",
    mobilePlaceholder: "अपना मोबाइल नंबर दर्ज करें",
    emailPlaceholder: "अपना ईमेल दर्ज करें",
    messagePlaceholder: "अपना संदेश दर्ज करें...",
    submitBtn: "सबमिट करें",
    submitting: "सबमिट हो रहा है...",
    successMsg: "धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।",
    errorMsg: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
    addressLabel: "पता",
    contactLabel: "संपर्क विवरण",
    socialLabel: "सोशल मीडिया",
    orgName: "हनुमानगढ़ी",
    addressLines: [
      "श्री रामसत्संग भवन",
      "छोटी छावनी, अयोध्या",
      "224001",
    ],
    phone: "+91 8239455455",
  },
};

/* ─── Joi Validation Schema ──────────────────────────────────────── */
const schema = Joi.object({
  name: Joi.string().min(2).max(80).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
  }),
  mobile: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": "Mobile is required",
      "string.pattern.base": "Enter a valid 10-digit Indian mobile number",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Enter a valid email address",
    }),
  msg: Joi.string().min(5).max(1000).required().messages({
    "string.empty": "Message is required",
    "string.min": "Message must be at least 5 characters",
  }),
});

function validate(values: Record<string, string>) {
  const { error } = schema.validate(values, { abortEarly: false });
  if (!error) return {};
  return Object.fromEntries(
    error.details.map((d) => [d.path[0], d.message])
  );
}

/* ─── Floating Label Input ───────────────────────────────────────── */
function Field({
  id,
  label,
  type = "text",
  error,
  touched,
  as,
  ...rest
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
  touched?: boolean;
  as?: "textarea";
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  const showError = touched && error;
  const Tag = as ?? "input";

  return (
    <div className="relative w-full">
      <Tag
        id={id}
        name={id}
        type={as ? undefined : type}
        placeholder={label}
        rows={as === "textarea" ? 4 : undefined}
        className={`w-full px-4 py-3 rounded-xl bg-white/80 border text-gray-800 placeholder-gray-400 text-sm outline-none transition-all duration-200
          focus:ring-2 focus:ring-orange-400 focus:border-orange-400
          ${showError
            ? "border-red-400 ring-1 ring-red-300"
            : "border-gray-200"
          }
          ${as === "textarea" ? "resize-none" : ""}
        `}
        {...(rest as any)}
      />

      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-xs text-red-500 pl-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────── */
export default function ContactUsPage() {
  const language = useLanguageStore((s) => s.language);
  const t = content[language];

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  /* ─── Auto Hide Success/Error Message After 6 Seconds ─────────── */
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (submitted || serverError) {
      timer = setTimeout(() => {
        setSubmitted(false);
        setServerError("");
      }, 6000);
    }

    return () => clearTimeout(timer);
  }, [submitted, serverError]);

  const formik = useFormik({
    initialValues: { name: "", mobile: "", email: "", msg: "" },
    validate,

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setServerError("");

      try {
        await saveContactUs(values);

        setSubmitted(true);

        resetForm();
      } catch {
        setServerError(t.errorMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="theme-page max-w-[1920px] mx-auto overflow-x-hidden bg-[#fdf8f2]">
      {/* ══════════ HERO BANNER ══════════ */}
      <section className="w-full p-3 pb-0 sm:p-0 md:p-0">
        <div className="w-full h-auto rounded-2xl md:rounded-none overflow-hidden">
          <Image
            src="/banners/AstrologerContactUs.png"
            alt={t.bannerAlt}
            width={1920}
            height={600}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Page heading below banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center pt-12 px-4"
        >
          <h1 className="text-xl md:text-2xl font-bold tracking-widest text-brand-brown uppercase">
            {t.pageHeading}
          </h1>

          <div className="mt-4 mx-auto h-[3px] w-16 rounded-full bg-[#7a4326]" />
        </motion.div>
      </section>

      {/* ══════════ CONTACT BODY ══════════ */}
      <section className="pb-0 sm:py-12 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* ── Form Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            {/* Glowing bg */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#d8b08c] to-[#f3e7dc] blur-2xl opacity-40 -z-10" />

              <div className="bg-white/95 backdrop-blur-sm border border-[#e7c9a6] rounded-3xl shadow-2xl p-6 hover:border-[#8b5a3c] transition-all duration-300">
                {/* Form header */}
                <div className="mb-7">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-brand-brown">
                    {t.formTitle}
                  </h2>

                  <div className="mt-3 h-[3px] w-14 rounded-full bg-[#7a4326]" />
                </div>

                {/* Success state */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl px-5 py-4 text-sm font-medium"
                    >
                      <span className="text-2xl">✅</span>
                      {t.successMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Server error */}
                <AnimatePresence>
                  {serverError && (
                    <motion.p
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                    >
                      {t.errorMsg || serverError}
                    </motion.p>
                  )}
                </AnimatePresence>

                <form
                  onSubmit={formik.handleSubmit}
                  noValidate
                  className="space-y-4"
                >
                  <Field
                    id="name"
                    label={t.namePlaceholder}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.name}
                    touched={formik.touched.name}
                  />

                  <Field
                    id="mobile"
                    label={t.mobilePlaceholder}
                    type="tel"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.mobile}
                    touched={formik.touched.mobile}
                  />

                  <Field
                    id="email"
                    label={t.emailPlaceholder}
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                  />

                  <Field
                    id="msg"
                    label={t.messagePlaceholder}
                    as="textarea"
                    value={formik.values.msg}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.msg}
                    touched={formik.touched.msg}
                  />

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={formik.isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full mt-2 btn-gradient-slide inline-flex items-center justify-center py-3.5 rounded-xl font-bold text-white text-sm tracking-wide transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formik.isSubmitting ? t.submitting : t.submitBtn}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* ── Info Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-full lg:w-[360px] space-y-7 mb-7 "
          >
            {/* Address */}
            <div className="bg-white/95 backdrop-blur-sm border border-[#e7c9a6] rounded-3xl shadow-xl p-7 hover:border-[#8b5a3c] transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <FaMapMarkerAlt className="text-[#7a4326] text-lg" />

                <p className="text-xs font-bold uppercase tracking-widest text-[#7a4326]">
                  {t.addressLabel}
                </p>
              </div>

              <p className="text-base font-bold text-brand-brown mb-1">
                {t.orgName}
              </p>

              <p className="text-sm text-gray-600 leading-relaxed">
                {t.addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>

            {/* Contact Details */}
            <div className="bg-white/95 backdrop-blur-sm border border-[#e7c9a6] rounded-3xl shadow-xl p-7 hover:border-[#8b5a3c] transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <FaPhone className="text-[#7a4326] text-base" />

                <p className="text-xs font-bold uppercase tracking-widest text-[#7a4326]">
                  {t.contactLabel}
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaPhone className="text-[#7a4326] text-xs" />
                  <a
                    href="tel:+918239455455"
                    className="hover:text-[#7a4326] transition-colors"
                  >
                    {t.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-[#7a4326] text-xs" />
                  <span>hanumangadiayodhya@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/95 backdrop-blur-sm border border-[#e7c9a6] rounded-3xl shadow-xl p-7 hover:border-[#8b5a3c] transition-all duration-300">
              <p className="text-xs font-bold uppercase tracking-widest text-[#7a4326] mb-4">
                {t.socialLabel}
              </p>

              <div className="flex flex-wrap gap-4">
                {[
                  {
                    icon: FaFacebookF,
                    href: "https://www.facebook.com/hanumangadiayodhyaa/",
                    label: "Facebook",
                  },
                  // {
                  //   icon: FaTwitter,
                  //   href: "#",
                  //   label: "Twitter",
                  // },
                  {
                    icon: FaInstagram,
                    href: "https://www.instagram.com/shriramlalaayodhyajisewasamiti?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
                    label: "Instagram",
                  },
                  {
                    icon: FaYoutube,
                    href: "https://www.youtube.com/@hanumangadiayodhyaa",
                    label: "YouTube",
                  },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                        group relative overflow-hidden
                        w-11 h-11 rounded-2xl
                        flex items-center justify-center
                        border border-[#d9b99b]
                        bg-gradient-to-br from-[#fffaf6] to-[#f3e7dc]
                        text-[#7a4326]
                        shadow-md
                        hover:shadow-xl
                        hover:border-[#8b5a3c]
                        transition-all duration-300
                      "
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8b5a3c]/10 to-[#7a4326]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Icon */}
                    <Icon className="relative z-10 text-[16px] transition-transform duration-300 group-hover:scale-110" />

                    {/* Tooltip */}
                    <span
                      className="
                        absolute -bottom-8 left-1/2 -translate-x-1/2
                        whitespace-nowrap rounded-md
                        bg-[#5c2f1b] text-white text-[10px]
                        px-2 py-1 opacity-0
                        group-hover:opacity-100
                        transition-all duration-300
                      "
                    >
                      {label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}