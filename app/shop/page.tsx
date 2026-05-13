import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

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

export default function ShopPage() {
  return (
    <div>
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
              <Link key={style.name} href="/custom" className="group bg-white dark:bg-[#1a1a1a] hover:shadow-lg transition-all duration-300 block">
                <div className="relative h-60 overflow-hidden">
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
                </div>
                <div className="p-6">
                  <h3 className="font-black text-base uppercase tracking-wide mb-2 text-black dark:text-white">{style.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{style.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xl text-black dark:text-white">${style.price}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black dark:border-white pb-0.5 text-black dark:text-white group-hover:text-gray-500 dark:group-hover:text-gray-400 group-hover:border-gray-400 transition-colors">
                      Order →
                    </span>
                  </div>
                </div>
              </Link>
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
