import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const STYLES = [
  {
    name: 'The Monogram Edition',
    desc: 'Your initials woven into premium ribbed cotton. Understated, personal, unmistakable.',
    price: 28,
    tag: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&q=80',
  },
  {
    name: 'Celestial Strides',
    desc: 'Constellations mapped across midnight navy. For those who navigate by stars.',
    price: 32,
    tag: 'Fan Favourite',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  },
  {
    name: "The Navigator's Compass",
    desc: 'Anchors, waves, and open-sea motifs. Built for the explorer in you.',
    price: 30,
    tag: null,
    img: 'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=600&q=80',
  },
  {
    name: 'Urban Pulse',
    desc: 'City grids and transit maps. Wear the city you love.',
    price: 30,
    tag: null,
    img: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80',
  },
  {
    name: 'Botanical Ink',
    desc: 'Hand-drawn ferns, botanicals, and florals on blush pink.',
    price: 32,
    tag: 'New',
    img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80',
  },
  {
    name: 'The Manifesto Tab',
    desc: '"never for everyone" — woven into jet black. A statement with every step.',
    price: 35,
    tag: 'Signature',
    img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80',
  },
  {
    name: 'Celestial Step',
    desc: 'Moon phases across charcoal. Track the lunar cycle from your ankles.',
    price: 32,
    tag: null,
    img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
  },
  {
    name: 'The Retro Cassette',
    desc: 'Bold retro stripes in warm amber and rust. Decades of style, one pair.',
    price: 30,
    tag: 'Trending',
    img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
  },
  {
    name: 'The Coordinates',
    desc: 'Your city. Your GPS coordinates. Your story printed to last.',
    price: 35,
    tag: null,
    img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
  },
]

export default function ShopPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-white border-b border-black/10 py-20 px-6 text-center">
        <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-3">The Collection</p>
        <h1 className="text-5xl sm:text-7xl font-black uppercase mb-4 text-black">Shop</h1>
        <div className="w-24 h-1 bg-black mx-auto mb-6" />
        <p className="text-gray-500 text-lg max-w-lg mx-auto">
          Premium premade styles — each one designed to make a statement. Or go fully custom.
        </p>
      </section>

      {/* Grid */}
      <section className="bg-[#F8F6F2] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {STYLES.map((style) => (
              <Link key={style.name} href="/custom" className="group bg-white hover:shadow-lg transition-all duration-300 block">
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
                </div>
                <div className="p-6">
                  <h3 className="font-black text-base uppercase tracking-wide mb-2 text-black">{style.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{style.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xl text-black">${style.price}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-0.5 text-black group-hover:text-gray-500 group-hover:border-gray-400 transition-colors">
                      Order →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Custom CTA */}
          <div className="bg-[#111111] text-white p-12 sm:p-16 text-center">
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
