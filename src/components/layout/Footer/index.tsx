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
      <div className="relative w-full bg-cover bg-top" style={{
        backgroundImage: "url('/banners/footer-bg.png')",
        backgroundColor: "#F5E6D3"
      }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(147,133,113,0.4)] to-transparent"></div>
        
        {/* Content */}
        <div className="relative z-10 px-4 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              
              {/* Logo and Address Section */}
              <div className="flex flex-col">
                <Image
                  src="/logo/logo.svg"
                  alt="Hanuman Gadhi"
                  width={100}
                  height={100}
                  className="mb-4"
                  priority
                />
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                  {language === "hi" ? (
                    <>
                      श्री रामसत्संग भवन<br />
                      छोटी छावनी, अयोध्या<br />
                      224001
                    </>
                  ) : (
                    <>
                      Shri Ram Satsang Bhavan<br />
                      Choti Chawni, Ayodhya<br />
                      224001
                    </>
                  )}
                </p>
              </div>

              {/* Information Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">Information</h3>
                <ul className="space-y-2 text-xs md:text-sm">
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-orange-600 transition">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-orange-600 transition">
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-orange-600 transition">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-orange-600 transition">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-orange-600 transition">
                      Return & Refund Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Helpful Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">Helpful</h3>
                <div className="space-y-3 text-xs md:text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">✉</span>
                    <a href="mailto:info@hanumanagadhi.com" className="text-gray-700 hover:text-orange-600 transition">
                      info@hanumanagadhi.com
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">📍</span>
                    <a href="tel:+919876543210" className="text-gray-700 hover:text-orange-600 transition">
                      +91 9876543210
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">📍</span>
                    <p className="text-gray-700">
                      Shri Ram Satsang Bhavan<br />
                      Choti Chawni, Ayodhya<br />
                      224001
                    </p>
                  </div>
                </div>
              </div>

              {/* Get Your App Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">Get Your App<br /><span className="text-xs font-normal">Download from here!</span></h3>
                <div className="space-y-3">
                  {/* <Link href="#" className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-gray-300 hover:border-orange-600 transition w-fit">
                    <span className="text-xl">🍎</span>
                    <div>
                      <div className="text-xs text-gray-600">Download on</div>
                      <div className="text-sm font-bold text-gray-900">App Store</div>
                    </div>
                  </Link>
                  <Link href="#" className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-gray-300 hover:border-orange-600 transition w-fit">
                    <span className="text-xl">🎮</span>
                    <div>
                      <div className="text-xs text-gray-600">Get it on</div>
                      <div className="text-sm font-bold text-gray-900">Google Play</div>
                    </div>
                  </Link> */}
                  Todo -Image for app store and play store
                </div>
              </div>

            </div>

            {/* Divider */}
            <hr className="border-t border-gray-400 mb-6" />

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-700 text-center md:text-left">
                © Copyright hanumangadhi. All Rights Reserved
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-700">Follow us :</span>
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    className="bg-white hover:bg-orange-600 hover:text-white transition-all w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700"
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
