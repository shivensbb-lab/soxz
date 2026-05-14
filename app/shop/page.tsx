'use client'

import Link from 'next/link'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { STYLES, OG_STYLES, NEW_STYLES } from '@/lib/styles'
import SockImage from '@/components/SockImage'
import { useCart } from '@/components/CartContext'

function StyleCard({ style, large = false }: { style: typeof STYLES[0]; large?: boolean }) {
  const { add } = useCart()
  return (
    <div className={`group bg-white dark:bg-[#1a1a1a] flex flex-col hover:shadow-xl transition-all duration-300 ${large ? '' : ''}`}>
      <Link href={`/shop/${style.slug}`} className={`relative overflow-hidden block ${large ? 'aspect-[4/5]' : 'aspect-square'}`}>
        <SockImage
          src={style.img}
          alt={style.name}
          fallbackColor={style.color}
          fallbackLabel={style.theme}
          className="group-hover:scale-105 transition-transform duration-500 w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
          <div className="flex items-start justify-between">
            {style.og ? (
              <span className="text-[9px] font-black uppercase tracking-widest bg-white text-black px-2 py-1">
                OG Collection
              </span>
            ) : style.tag ? (
              <span className="text-[9px] font-black uppercase tracking-widest bg-black text-white px-2 py-1">
                {style.tag}
              </span>
            ) : <span />}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
            <span className="bg-white dark:bg-black text-black dark:text-white text-[10px] font-black uppercase tracking-widest px-4 py-2">
              View Product
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/shop/${style.slug}`}>
          <h3 className="font-black text-xs uppercase tracking-wide text-black dark:text-white mb-1 hover:underline">{style.name}</h3>
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-3">{style.shortDesc}</p>
        <div className="flex items-center justify-between">
          <span className="font-black text-base text-black dark:text-white">${style.price}</span>
          <button
            onClick={() => add({ name: style.name, price: style.price, img: style.img })}
            className="flex items-center gap-1.5 border-2 border-black dark:border-white text-black dark:text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <ShoppingBag className="w-3 h-3" /> Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <div className="bg-[#F8F6F2] dark:bg-[#0f0f0f] transition-colors min-h-screen">

      {/* Header */}
      <section className="bg-white dark:bg-[#111111] border-b border-black/10 dark:border-white/10 py-16 px-6 transition-colors">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-2">The Collection</p>
          <h1 className="text-5xl sm:text-6xl font-black uppercase text-black dark:text-white">Shop All</h1>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* OG Collection */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest border border-black dark:border-white px-2 py-1 text-black dark:text-white mr-3">OG Collection</span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-black dark:text-white mt-3">The Originals</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">White · Blue · Black · Green — the four that started it all.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {OG_STYLES.map(style => (
              <StyleCard key={style.slug} style={style} large />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-black/10 dark:border-white/10" />

        {/* Extended Collection */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-2">New Arrivals</p>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-black dark:text-white">Extended Collection</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {NEW_STYLES.map(style => (
              <StyleCard key={style.slug} style={style} />
            ))}
          </div>
        </section>

        {/* Custom CTA */}
        <section className="bg-[#111111] dark:bg-black text-white p-12 sm:p-16 text-center">
          <p className="text-xs tracking-[0.4em] text-gray-500 uppercase mb-4">Go Further</p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mb-4">None of these feel like you?</h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
            Upload your photo, your pet, your inside joke. We&apos;ll make it into the highest-quality sock you&apos;ve ever worn.
          </p>
          <Link href="/custom" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
            Design Custom <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  )
}
