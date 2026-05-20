import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { NavMenu } from "../navbar.types";

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Image
          priority
          src="/icons/menu.svg"
          height={100}
          width={100}
          alt="menu"
          className="max-w-[22px] max-h-[22px]"
        />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader className="mb-10">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link href="/" className="flex items-center">
                <Image
                  priority
                  src="/logo/logo.svg"
                  height={52}
                  width={52}
                  alt="logo"
                  className="w-auto"
                />
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start gap-4">
          {data.map((item) => (
            <SheetClose key={item.id} asChild>
              <Link href={item.url ?? "/"} className="text-base font-medium hover:text-amber-800 transition-colors">
                {item.label}
              </Link>
            </SheetClose>
          ))}
          {/* <div className="mt-4 pt-4 border-t w-full">
            <SheetClose asChild>
              <Link
                href="/signin"
                className="flex items-center gap-2 bg-[#3d1a00] text-white text-sm font-medium px-4 py-2 rounded-lg w-fit"
              >
                <Image
                  priority
                  src="/icons/user.svg"
                  height={16}
                  width={16}
                  alt="user"
                  className="invert"
                />
                Login
              </Link>
            </SheetClose>
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
