"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type MenuItemProps = {
  label: string;
  url?: string;
};

export function MenuItem({ label, url }: MenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <NavigationMenuItem>
      <Link href={url ?? "/"} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn([
            navigationMenuTriggerStyle(),
            "relative bg-transparent hover:bg-transparent focus:bg-transparent px-3 py-1.5 transition-colors duration-300",
            isActive ? "text-brand-orange font-semibold text-base" : "font-normal hover:text-brand-orange text-base",
          ])}
        >
          {/* Text with subtle lift on hover */}
          <motion.span
            className="relative font-semibold inline-block"
            whileHover={{ y: -1.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            {label}
          </motion.span>

          {/* Active: shared sliding underline via layoutId */}
          {isActive && (
            <motion.span
              layoutId="nav-active-underline"
              className="absolute bottom-0 left-2 right-2 h-[2px] bg-brand-orange rounded-full"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}

          {/* Hover: scale-in underline for non-active items */}
          {!isActive && (
            <motion.span
              className="absolute bottom-0 left-2 right-2 h-[2px] bg-brand-orange rounded-full origin-center"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            />
          )}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}
