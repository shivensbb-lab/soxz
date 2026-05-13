import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SOXZ — For Our Feet",
  description: "Never for everyone, but for you. Premium personalised socks and apparel. Custom designs or handpicked styles.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="bg-white text-black font-sans">
        <Navbar />
        {children}
        <footer className="border-t border-black/10 mt-24">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div>
              <span className="font-black text-black tracking-widest uppercase">SOXZ</span>
              <span className="ml-2 text-xs tracking-wider">for our feet</span>
            </div>
            <p className="text-xs text-center">never for everyone, but for you</p>
            <p className="text-xs">© 2026 Soxz. Founded by Viraj Sanghi & Shiven Balchandani.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
