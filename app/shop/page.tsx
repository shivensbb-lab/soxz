'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/CartContext'

const STYLES = [
  {
    name: 'The Monogram Edition',
    desc: 'Your initials woven into premium ribbed cotton. Understated, personal, unmistakable.',
    price: 28,
    tag: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80',
    theme: 'Embroidered initials',
  },
  {
    name: 'Celestial Strides',
    desc: 'Constellations mapped across midnight navy. For those who navigate by stars.',
    price: 32,
    tag: 'Fan Favourite',
    img: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80',
    theme: 'Galaxy & stars',
  },
  {
    name: "The Navigator's Compass",
    desc: 'Anchors, waves, and open-sea motifs. Built for the explorer in you.',
    price: 30,
    tag: null,
    img: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&q=80',
    theme: 'Nautical & ocean',
  },
  {
    name: 'Urban Pulse',
    desc: 'City grids and transit maps. Wear the city you love.',
    price: 30,
    tag: null,
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80',
    theme: 'City skyline',
  },
  {
    name: 'Botanical Ink',
    desc: 'Hand-drawn ferns, botanicals, and florals on blush pink.',
    price: 32,
    tag: 'New',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    theme: 'Botanical garden',
  },
  {
    name: 'The Manifesto Tab',
    desc: '"never for everyone" — woven into jet black. A statement with every step.',
    price: 35,
    tag: 'Signature',
    img: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=600&q=80',
    theme: 'Dark minimal',
  },
  {
    name: 'Celestial Step',
    desc: 'Moon phases across charcoal. Track the lunar cycle from your ankles.',
    price: 32,
    tag: null,
    img: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=600&q=80',
    theme: 'Moon phases',
  },
  {
    name: 'The Retro Cassette',
    desc: 'Bold retro stripes in warm amber and rust. Decades of style, one pair.',
    price: 30,
    tag: 'Trending',
    img: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=600&q=80',
    theme: 'Retro vibes',
  },
  {
    name: 'The Coordinates',
    desc: 'Your city. Your GPS coordinates. Your story printed to last.',
    price: 35,
    tag: null,
    img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=600&q=80',
    theme: 'World map',
  },
]

type Style = typeof STYLES[0]

function OrderModal({ style, onClose }: { style: Style; onClose: () => void }) {
  const [qty, setQty] = useState(1)
  const { add } = useCart()

  function handleAdd() {
    for (let i = 0; i < qty; i++) add({ name: style.name, price: style.price, img: style.img })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#111111] w-full max-w-lg shadow-2xl z-50 flex flex-col sm:flex-row overflow-hidden max-h-[90vh]">

        {/* Image */}
        <div className="relative h-52 sm:h-auto sm:w-48 flex-shrink-0">
          <Image src={style.img} alt={style.name} fill className="object-cover" unoptimized />
          {style.tag && (
            <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest bg-black text-white px-2 py-1">
              {style.tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 text-black dark:text-white hover:opacity-60 transition-opacity">
            <X className="w-5 h-5" />
          </button>

          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">{style.theme}</p>
          <h2 className="font-black text-lg uppercase tracking-wide text-black dark:text-white mb-2 leading-tight pr-6">{style.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">{style.desc}</p>

          <div className="flex items-center justify-between mb-5">
            <span className="font-black text-2xl text-black dark:text-white">${style.price}</span>
            <span className="text-xs text-gray-400">per pair</span>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">Qty</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-8 h-8 border-2 border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-black text-lg text-black dark:text-white w-6 text-center">{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className="w-8 h-8 border-2 border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <span className="font-black text-sm text-black dark:text-white ml-auto">${(style.price * qty).toFixed(2)}</span>
          </div>

          <button onClick={handleAdd}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>

          <p className="text-[10px] text-gray-400 text-center mt-3">
            No payment now — we&apos;ll send a design preview, then a secure payment link once you approve.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const [modal, setModal] = useState<Style | null>(null)
  const { add } = useCart()

  return (
    <div>
      {modal && <OrderModal style={modal} onClose={() => setModal(null)} />}

      {/* Header */}
      <section className="bg-white dark:bg-[#111111] border-b border-black/10 dark:border-white/10 py-20 px-6 text-center transition-colors">
        <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-3">The Collection</p>
        <h1 className="text-5xl sm:text-7xl font-black uppercase mb-4 text-black dark:text-white">Shop</h1>
        <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-6" />
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-lg mx-auto">
          Premium premade styles — each one designed to make a statement. Or go fully custom.
        </p>
      </section>

      {/* Grid */}
      <section className="bg-[#F8F6F2] dark:bg-[#0f0f0f] py-16 px-6 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {STYLES.map((style) => (
              <div key={style.name} className="group bg-white dark:bg-[#1a1a1a] hover:shadow-lg transition-all duration-300 flex flex-col">
                {/* Clickable image area → opens modal */}
                <button onClick={() => setModal(style)} className="relative h-60 overflow-hidden text-left block w-full">
                  <Image
                    src={style.img}
                    alt={style.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  {style.tag && (
                    <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest bg-black text-white px-2 py-1">
                      {style.tag}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 text-[9px] font-bold uppercase tracking-widest bg-white/90 dark:bg-black/90 text-gray-600 dark:text-gray-300 px-2 py-1">
                    {style.theme}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <span className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-4 py-2">View Details</span>
                  </span>
                </button>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-black text-sm uppercase tracking-wide mb-1 text-black dark:text-white">{style.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed flex-1">{style.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xl text-black dark:text-white">${style.price}</span>
                    <button
                      onClick={() => add({ name: style.name, price: style.price, img: style.img })}
                      className="flex items-center gap-1.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest px-3 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom CTA */}
          <div className="bg-[#111111] dark:bg-black text-white p-12 sm:p-16 text-center">
            <p className="text-xs tracking-[0.4em] text-gray-500 uppercase mb-4">Go Further</p>
            <h2 className="text-3xl sm:text-5xl font-black uppercase mb-4">None of these feel like you?</h2>
            <p className="text-gray-400 text-base mb-8 max-w-md mx-auto">
              Upload your photo, your pet, your inside joke. Make something truly yours.
            </p>
            <Link href="/custom" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
              Design Custom <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
