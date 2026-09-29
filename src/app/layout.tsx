import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import GlobalCanvas from "@/components/canvas/GlobalCanvas";
import FurnitureModal from "@/components/ui/FurnitureModal";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoomCraft",
  description: "3D Furniture E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <GlobalCanvas />
        <main className="pt-16 relative z-10 pointer-events-none">
          {/* pointer-events-none so we can click through to the canvas by default, page content can re-enable it */}
          {children}
        </main>
        <FurnitureModal />
      </body>
    </html>
  );
}
