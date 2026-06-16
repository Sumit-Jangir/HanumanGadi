import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import LoginModal from "@/components/auth/LoginModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://hanumangadi.com"),
  title: {
    default: "Hanumangadi",
    template: "%s | Hanumangadi",
  },
  description:
    "Authentic Vedic astrology, spiritual services, and yantras from Shri Ram Satsang Bhavan, Ayodhya. श्री रामसत्संग भवन, अयोध्या",
  applicationName: "Hanumangadi",
  icons: {
    icon: "/logo/logo.svg",
    shortcut: "/logo/logo.svg",
    apple: "/logo/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hanumangadi.com",
    siteName: "Hanumangadi",
    title: "Hanumangadi",
    description:
      "Authentic Vedic astrology, spiritual services, and yantras from Shri Ram Satsang Bhavan, Ayodhya.",
    images: [{ url: "/logo/logo.svg", alt: "Hanumangadi" }],
  },
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
        <HolyLoader color="#61341C" />
        {/* <TopBanner /> */}
        <div className="max-w-[1920px] mx-auto bg-[#f8e8dd]">
          <Providers>
            <TopNavbar />
            {children}
            <Footer />
          </Providers>
          <LoginModal />
        </div>
      </body>
    </html>
  );
}
