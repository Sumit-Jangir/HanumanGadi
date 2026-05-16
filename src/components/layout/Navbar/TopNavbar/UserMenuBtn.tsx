"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, UserCircle2, ShoppingBag, LogOut, LogIn, X } from "lucide-react";

import useAuthStore from "@/lib/stores/authStore";

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 360, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -8,
    transition: { duration: 0.16, ease: "easeIn" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, type: "spring", stiffness: 340, damping: 26 },
  }),
};

const UserMenuBtn = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { isLoggedIn, logout, openLogin } = useAuthStore();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative ml-1">
      {/* Trigger */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="User menu"
        aria-expanded={open}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white/30 hover:bg-white/60 border border-white/50 hover:border-brand-brown/40 text-gray-800 hover:text-brand-brown transition-all duration-300"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={18} strokeWidth={2} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Menu size={18} strokeWidth={2} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-[calc(100%+12px)] w-64 rounded-2xl overflow-hidden z-50"
            style={{ boxShadow: "0 8px 32px rgba(93,27,3,0.18), 0 2px 8px rgba(0,0,0,0.08)" }}
          >
            {/* Gradient header */}
            <div
              className="px-5 pt-5 pb-4"
              style={{ background: "linear-gradient(135deg, var(--brand-brown) 0%, var(--brand-orange) 100%)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                  <UserCircle2 size={22} strokeWidth={1.5} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">
                    {isLoggedIn ? "My Account" : "Welcome!"}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">
                    {isLoggedIn ? "Manage your profile" : "Sign in to continue"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu body */}
            <div className="bg-brand-cream/95 backdrop-blur-md px-3 py-3 flex flex-col gap-1">
              {isLoggedIn ? (
                <>
                  <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
                    <Link
                      href="/orders"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-brand-orange-muted hover:text-brand-brown transition-all duration-200 group"
                    >
                      <span className="w-8 h-8 rounded-xl bg-brand-orange-muted group-hover:bg-brand-orange/20 flex items-center justify-center transition-colors duration-200 shrink-0">
                        <ShoppingBag size={15} strokeWidth={1.8} className="text-brand-orange" />
                      </span>
                      <span>My Orders</span>
                    </Link>
                  </motion.div>

                  <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible">
                    <div className="h-px bg-gray-100 mx-1 my-1" />
                  </motion.div>

                  <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
                    <button
                      onClick={() => { logout(); setOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                    >
                      <span className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors duration-200 shrink-0">
                        <LogOut size={15} strokeWidth={1.8} className="text-gray-400 group-hover:text-red-500" />
                      </span>
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
                    <button
                      onClick={() => {
                        setOpen(false);
                        openLogin();
                      }}
                      className="btn-gradient-slide flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                    >
                      <LogIn size={15} strokeWidth={2} />
                      Login
                    </button>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenuBtn;

