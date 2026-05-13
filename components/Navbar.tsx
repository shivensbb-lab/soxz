'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-black/10 sticky top-0 bg-white z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-black text-xl tracking-widest uppercase">SOXZ</span>
          <span className="text-[9px] tracking-[0.25em] text-gray-500 uppercase">for our feet</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link href="/shop" className="hover:text-gray-500 transition-colors uppercase tracking-widest text-xs">Shop</Link>
          <Link href="/custom" className="hover:text-gray-500 transition-colors uppercase tracking-widest text-xs">Custom</Link>
          <Link href="/about" className="hover:text-gray-500 transition-colors uppercase tracking-widest text-xs">About</Link>
          <Link href="/custom" className="bg-black text-white text-xs font-bold px-5 py-2.5 uppercase tracking-widest hover:bg-gray-800 transition-colors">
            Order Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="sm:hidden p-2">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-black/10 bg-white px-6 py-6 flex flex-col gap-5">
          {['Shop', 'Custom', 'About'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-widest font-bold">
              {item}
            </Link>
          ))}
          <Link href="/custom" onClick={() => setOpen(false)}
            className="bg-black text-white text-xs font-bold px-5 py-3 uppercase tracking-widest text-center">
            Order Now
          </Link>
        </div>
      )}
    </nav>
  )
}
