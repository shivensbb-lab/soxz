'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggleDark() {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('soxz-dark', '1')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('soxz-dark', '0')
    }
  }

  return (
    <nav className="border-b border-black/10 dark:border-white/10 sticky top-0 bg-white dark:bg-[#111111] z-50 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-black text-xl tracking-widest uppercase text-black dark:text-white">SOXZ</span>
          <span className="text-[9px] tracking-[0.25em] text-gray-500 uppercase">for our feet</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          <Link href="/shop" className="text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors uppercase tracking-widest text-xs font-medium">Shop</Link>
          <Link href="/custom" className="text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors uppercase tracking-widest text-xs font-medium">Custom</Link>
          <Link href="/about" className="text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors uppercase tracking-widest text-xs font-medium">About</Link>
          <button onClick={toggleDark} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-black dark:text-white">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link href="/custom" className="bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-5 py-2.5 uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            Order Now
          </Link>
        </div>

        {/* Mobile buttons */}
        <div className="sm:hidden flex items-center gap-1">
          <button onClick={toggleDark} className="p-2 text-black dark:text-white">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => setOpen(!open)} className="p-2 text-black dark:text-white">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-black/10 dark:border-white/10 bg-white dark:bg-[#111111] px-6 py-6 flex flex-col gap-5">
          {['Shop', 'Custom', 'About'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-widest font-bold text-black dark:text-white">
              {item}
            </Link>
          ))}
          <Link href="/custom" onClick={() => setOpen(false)}
            className="bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-5 py-3 uppercase tracking-widest text-center">
            Order Now
          </Link>
        </div>
      )}
    </nav>
  )
}
