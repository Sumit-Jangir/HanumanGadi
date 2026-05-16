import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import LoginModal from "@/components/auth/LoginModal";

export const metadata: Metadata = {
  title: "Hanuman Gadi",
  description: "Hanuman Gadi - श्री रामसत्संग भवन अयोध्या",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#ed940b" />
        {/* <TopBanner /> */}
          <div className="max-w-[1920px] mx-auto bg-[#f8e8dd]">
        <Providers>
          <TopNavbar />
          {children}
        </Providers>
        <LoginModal />
        <Footer />
          </div>
      </body>
    </html>
  );
}
