"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import { SocialNetworks } from "./footer.types";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useLanguageStore } from "@/lib/stores/languageStore";

const socialsData: SocialNetworks[] = [
  {
    id: 1,
    icon: <FaFacebookF />,
    url: "https://facebook.com",
  },
  {
    id: 2,
    icon: <FaInstagram />,
    url: "https://instagram.com",
  },
  {
    id: 3,
    icon: <FaYoutube />,
    url: "https://youtube.com",
  },
];

const Footer = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    <footer>
      <div
        className="
      relative
      overflow-hidden
      backdrop-blur-md
    "
        style={{
          background:
            "linear-gradient(to right, rgba(255,243,229,0.95), var(--brand-orange))",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Content */}
        <div className="relative z-10 px-4 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

              {/* Logo and Address */}
              <div className="flex flex-col">
                <div className="inline-block rounded-2xl bg-white/35 backdrop-blur-sm px-4 py-3 w-fit border border-white/40 shadow-md">
                  <Image
                    src="/logo/logo.svg"
                    alt="Hanuman Gadi"
                    width={110}
                    height={110}
                    className="drop-shadow-sm"
                    priority
                  />
                </div>

                <p className="text-sm md:text-[15px] text-[#2f1a0d] leading-8 font-semibold mt-5">
                  {language === "hi" ? (
                    <>
                      श्री रामसत्संग भवन
                      <br />
                      छोटी छावनी, अयोध्या
                      <br />
                      224001
                    </>
                  ) : (
                    <>
                      Shri Ram Satsang Bhavan
                      <br />
                      Choti Chawni, Ayodhya
                      <br />
                      224001
                    </>
                  )}
                </p>
              </div>

              {/* Information */}
              <div>
                <h3 className="text-lg font-bold text-[#2f1a0d] mb-5 tracking-wide">
                  Information
                </h3>

                <ul className="space-y-3 text-sm md:text-[15px]">
                  {[
                    "About us",
                    "Contact us",
                    "Privacy Policy",
                    "Terms & Conditions",
                    "Return & Refund Policy",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="
                      text-[#3b220f]
                      hover:text-[#f28c18]
                      transition-all
                      duration-300
                      hover:translate-x-1
                      inline-flex
                      font-medium
                    "
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Helpful */}
              <div>
                <h3 className="text-lg font-bold text-[#2f1a0d] mb-5 tracking-wide">
                  Helpful
                </h3>

                <div className="space-y-4 text-sm md:text-[15px]">
                  <div className="flex items-start gap-3">
                    <span className="text-[#f28c18] mt-1">✉</span>

                    <a
                      href="mailto:info@hanumanagadi.com"
                      className="
                    text-[#3b220f]
                    hover:text-[#f28c18]
                    transition
                    font-medium
                  "
                    >
                      info@hanumanagadi.com
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#f28c18] mt-1">📞</span>

                    <a
                      href="tel:+919876543210"
                      className="
                    text-[#3b220f]
                    hover:text-[#f28c18]
                    transition
                    font-medium
                  "
                    >
                      +91 9876543210
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#f28c18] mt-1">📍</span>

                    <p className="text-[#3b220f] leading-7 font-medium">
                      Shri Ram Satsang Bhavan
                      <br />
                      Choti Chawni, Ayodhya
                      <br />
                      224001
                    </p>
                  </div>
                </div>
              </div>

              {/* App Section */}
              <div>
                <h3 className="text-lg font-bold text-[#2f1a0d] mb-2 tracking-wide">
                  Get Your App
                </h3>

                <p className="text-sm text-[#3b220f] mb-5 font-medium">
                  Download from here!
                </p>

                <div className="space-y-3 text-sm md:text-[15px] text-[#3b220f] font-medium">
                  Todo - Image for App Store and Play Store
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-[#8d5a2c]/25 mb-6" />

            {/* Bottom */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-5">
              <p className="text-xs md:text-sm text-[#2f1a0d] text-center md:text-left font-semibold">
                © Copyright hanumangadhi. All Rights Reserved
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#2f1a0d] font-semibold">
                  Follow us :
                </span>

                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    className="
                  bg-white/25
                  hover:bg-[#f28c18]
                  hover:text-white
                  transition-all
                  duration-300
                  w-10
                  h-10
                  rounded-full
                  border
                  border-white/40
                  flex
                  items-center
                  justify-center
                  text-[#2f1a0d]
                  hover:-translate-y-1
                  hover:shadow-[0_8px_20px_rgba(242,140,24,0.35)]
                  backdrop-blur-sm
                "
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;