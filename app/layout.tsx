import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FontDebugger from "@/components/ui-tools/FontDebugger";
import FontSizeOverlay from "@/components/ui-tools/FontSizeOverlay";
import Navbar from "@/components/Navbar";
import UnitCheatSheet from "@/components/UnitCheatSheet";
import TransitionProvider from "@/components/TransitionProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Responsive",
  description: "responsive design, animation and layout examples",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   
return (
  <html lang="en">
     
      <body>
        <TransitionProvider preset="cinematic">
          <Navbar />
            {children}

          {/* <main className="p-6">{children}</main> */}

          {/* Persistent Overlay */}
          {/* <FontDebugger /> */}
          {/* <FontSizeOverlay /> */}
          {/* <UnitCheatSheet /> */}
        </TransitionProvider>
      </body>
    </html>
  );
}
