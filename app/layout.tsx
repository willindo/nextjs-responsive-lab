import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FontDebugger from "@/components/dev-tools/FontDebugger";
import FontSizeOverlay from "@/components/dev-tools/FontSizeOverlay";
import Navbar from "@/components/Navbar";
import UnitCheatSheet from "@/components/UnitCheatSheet";
import TransitionProvider from "@/components/TransitionProvider";
import { DevProviders } from "@/components/providers/DevProviders";
// import { DevConfigPanel } from "@/components/dev-tools/DevConfigPanel";
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
          {/* <DevProviders> */}
             {/* {process.env.NODE_ENV === "development" && <DevConfigPanel />} */}
            {children}
            {/* <DevConfigPanel /> */}
          {/* </DevProviders> */}

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
