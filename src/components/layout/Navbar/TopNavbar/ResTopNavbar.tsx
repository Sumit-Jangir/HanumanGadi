"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { NavMenu } from "../navbar.types";
import {
  LogIn,
  LogOut,
  ShoppingBag,
  X,
} from "lucide-react";
import useAuthStore from "@/lib/stores/authStore";
import { useRouter } from "next/navigation";

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout, openLogin } = useAuthStore();
  const router = useRouter();

  const handleLogin = () => {
    setOpen(false);
    openLogin();
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex items-center justify-center"
        >
          <Image
            priority
            src="/icons/menu.svg"
            height={24}
            width={24}
            alt="menu"
            className="max-w-[22px] max-h-[22px]"
          />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[82vw] max-w-[330px] p-0 overflow-hidden border-r border-[#f3d2a5]"
      >
        <div className="flex h-full flex-col bg-[#fffaf4]">
          {/* Header */}
          <div
            className="relative px-5 py-4"
            style={{
              background:
                "linear-gradient(to right, rgba(255,243,229,0.95), var(--brand-orange))",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-[#2f1a0d]"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>

            <SheetHeader>
              <SheetTitle asChild>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center"
                >
                  <Image
                  priority
                  src="/logo/logo.svg"
                  height={52}
                  width={52}
                  alt="logo"
                  className="h-12 w-auto"
                />
                </Link>
              </SheetTitle>
            </SheetHeader>
          </div>

          {/* Menu Links */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="flex flex-col items-start gap-6">
              {data.map((item) => (
                <Link
                  key={item.id}
                  href={item.url ?? "/"}
                  onClick={() => setOpen(false)}
                  className="text-[18px] font-semibold text-[#08111f] hover:text-[#f28c18] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Account Section */}
          <div className="px-5 py-5">
            {isLoggedIn ? (
              <div className="space-y-3">
                {/* <div className="flex items-center gap-3 rounded-2xl bg-[#fff3e5] p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f28c18]/15 text-[#8a3f12]">
                    <UserCircle2 size={22} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#2f1a0d]">
                      My Account
                    </p>
                    <p className="text-xs text-[#6f4a2f]">
                      Manage your profile
                    </p>
                  </div>
                </div> */}

                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3d1a00] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#f28c18]"
                >
                  <ShoppingBag size={17} />
                  My Orders
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e3b57d] bg-white px-4 py-3 text-sm font-semibold text-[#3d1a00] transition hover:bg-[#fff3e5]"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleLogin}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3d1a00] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#f28c18]"
              >
                <LogIn size={17} />
                Login
              </button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;