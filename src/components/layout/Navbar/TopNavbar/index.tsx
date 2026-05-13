"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NavMenu } from "../navbar.types";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import UserMenuBtn from "./UserMenuBtn";
import { Languages } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguageStore } from "@/lib/stores/languageStore";

const getNavData: NavMenu = [
  {
    id: 1,
    type: "MenuItem",
    label: "Home",
    url: "/",
    children: [],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "About Us",
    url: "/about-us",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "Yantra",
    url: "/shop",
    children: [],
  },
  {
    id: 4,
    type: "MenuItem",
    label: "Gallery",
    url: "/gallery",
    children: [],
  },
  {
    id: 5,
    type: "MenuItem",
    label: "Contact Us",
    url: "/contact-us",
    children: [],
  },
];

const TopNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguageStore();
  const data = getNavData;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="sticky top-0 z-20 backdrop-blur-md transition-shadow duration-300"
      style={{
        background: scrolled
          ? "linear-gradient(to right, rgba(255,243,229,0.95), var(--brand-orange))"
          : "linear-gradient(to right, rgba(255,243,229,0.6), var(--brand-orange))",
        boxShadow: scrolled
          ? "0 4px 20px rgba(0,0,0,0.12)"
          : "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <motion.div
        animate={{ paddingTop: scrolled ? "10px" : undefined, paddingBottom: scrolled ? "10px" : undefined }}
        transition={{ duration: 0.3 }}
        className="flex relative max-w-frame mx-auto items-center justify-between py-4 md:py-5 px-4 xl:px-0"
      >
        {/* Logo */}
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link href="/" className="flex items-center mr-6 lg:mr-10">
            <Image
              priority
              src="/logo/logo.svg"
              height={52}
              width={52}
              alt="logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Desktop nav links */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center mr-4">
          <NavigationMenuList>
            {data.map((item, i) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, type: "spring", stiffness: 300, damping: 24 }}
                  >
                    <MenuItem label={item.label} url={item.url} />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right actions */}
        <div className="flex items-center gap-1 ml-auto md:ml-0">
          {/* Mobile search icon */}
          <Link href="/search" className="block md:hidden mr-2 p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={22}
              width={22}
              alt="search"
            />
          </Link>

          {/* Cart */}
          <CartBtn />

          {/* Language switcher */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/40 hover:border-brand-brown bg-white/20 hover:bg-brand-cream/60 text-sm font-medium text-gray-800 hover:text-brand-brown transition-all duration-300 ml-1"
            aria-label="Switch language"
          >
            <Languages size={15} strokeWidth={1.8} />
            <span className="hidden sm:inline text-xs tracking-wide uppercase">
              {language}
            </span>
          </motion.button>

          {/* User menu */}
          <UserMenuBtn />
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default TopNavbar;
