import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import ClientProviders from "@/components/ClientProviders"

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SOXZ — For Our Feet",
  description: "Never for everyone, but for you. Premium personalised socks. Custom designs or handpicked styles.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `try{if(localStorage.getItem('soxz-dark')==='1')document.documentElement.classList.add('dark')}catch(e){}`
        }} />
      </head>
      <body className="bg-[#F8F6F2] dark:bg-[#0f0f0f] text-[#111111] dark:text-white font-sans transition-colors duration-200">
        <ClientProviders>
          <Navbar />
          {children}
          <footer className="border-t border-black/10 dark:border-white/10 mt-24 bg-white dark:bg-[#111111]">
            <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-black text-lg text-black dark:text-white tracking-widest uppercase">SOXZ</span>
                <span className="ml-2 text-xs tracking-wider text-gray-400">for our feet</span>
              </div>
              <p className="text-xs text-gray-400 tracking-widest uppercase text-center">never for everyone, but for you</p>
              <p className="text-xs text-gray-400">© 2026 Soxz. Founded by Viraj & Shiven.</p>
            </div>
          </footer>
        </ClientProviders>
      </body>
    </html>
  )
}
