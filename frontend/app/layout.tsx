import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"

import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Workout App MERN",
  description: "MERN stack workout app",
};
 
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-[#f1f1f1] m-0 antialiased",
          poppins.className
        )}>
        <header className="flex items-center bg-white">
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
