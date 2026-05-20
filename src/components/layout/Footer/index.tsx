"use client";

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
        className="relative overflow-hidden backdrop-blur-md"
        style={{
          background:
            "linear-gradient(to right, rgba(255,243,229,0.95), var(--brand-orange))",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <div className="relative z-10 px-5 py-8 md:px-8 md:py-14">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mb-10">
              {/* Logo and Address */}
              <div className="min-w-0">
                <div className="rounded-2xl bg-white/35 backdrop-blur-sm px-3 py-3 w-fit border border-white/40 shadow-md">
                  <Image
                    src="/logo/logo.svg"
                    alt="Hanuman Gadi"
                    width={130}
                    height={80}
                    className="w-[135px] max-[360px]:w-[115px] h-auto"
                    priority
                  />
                </div>

                <p className="text-[14px] md:text-[15px] text-[#2f1a0d] leading-7 font-semibold mt-5 break-words">
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
                      Choti Chawni,
                      <br />
                      Ayodhya
                      <br />
                      224001
                    </>
                  )}
                </p>
              </div>

              {/* Information */}
              <div className="min-w-0">
                <h3 className="text-[20px] md:text-lg font-bold text-[#2f1a0d] mb-5">
                  Information
                </h3>

                <ul className="space-y-4 text-[15px] md:text-[15px]">
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
                        className="text-[#3b220f] hover:text-[#f28c18] transition-all duration-300 font-medium leading-5"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Helpful */}
              <div className="min-w-0">
                <h3 className="text-[20px] md:text-lg font-bold text-[#2f1a0d] mb-5">
                  Helpful
                </h3>

                <div className="space-y-4 text-[14px] md:text-[15px]">
                  <div className="flex items-start gap-3">
                    <span className="text-[#f28c18] mt-1 shrink-0">✉</span>
                    <a
                      href="mailto:info@hanumanagadi.com"
                      className="text-[#ff7a00] hover:text-[#f28c18] transition font-medium break-all"
                    >
                      info@hanumanagadi.com
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#f28c18] mt-1 shrink-0">📞</span>
                    <a
                      href="tel:+919876543210"
                      className="text-[#3b220f] hover:text-[#f28c18] transition font-medium"
                    >
                      +91 9876543210
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#f28c18] mt-1 shrink-0">📍</span>
                    <p className="text-[#3b220f] leading-7 font-medium">
                      Shri Ram Satsang
                      <br />
                      Bhavan
                      <br />
                      Choti Chawni,
                      <br />
                      Ayodhya
                      <br />
                      224001
                    </p>
                  </div>
                </div>
              </div>

              {/* App Section */}
              <div className="min-w-0">
                <h3 className="text-[20px] md:text-lg font-bold text-[#2f1a0d] mb-4">
                  Get Your App
                </h3>

                <p className="text-[15px] text-[#3b220f] mb-5 font-medium">
                  Download from here!
                </p>

                <div className="text-[15px] md:text-[15px] text-[#3b220f] font-medium leading-6">
                  Todo - Image for App Store and Play Store
                </div>
              </div>
            </div>

            <hr className="border-t border-[#8d5a2c]/25 mb-6" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-5">
              <p className="text-xs md:text-sm text-[#2f1a0d] text-center md:text-left font-semibold">
                © Copyright hanumangadi. All Rights Reserved
              </p>

              <div className="flex items-center gap-3">
                <span className="text-sm text-[#2f1a0d] font-semibold">
                  Follow us :
                </span>

                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    className="bg-white/25 hover:bg-[#f28c18] hover:text-white transition-all duration-300 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-[#2f1a0d] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(242,140,24,0.35)] backdrop-blur-sm"
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