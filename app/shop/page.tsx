import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const STYLES = [
  { name: 'The Monogram Edition', desc: 'Your initials woven into premium ribbed cotton. Understated, personal, unmistakable.', price: 28, color: 'bg-green-900', emoji: '🟢', tag: 'Bestseller' },
  { name: 'Celestial Strides', desc: 'Constellations mapped across midnight navy. For those who navigate by stars.', price: 32, color: 'bg-indigo-950', emoji: '🌌', tag: 'Fan Favourite' },
  { name: "The Navigator's Compass", desc: 'Anchors, waves, and open-sea motifs. Built for the explorer in you.', price: 30, color: 'bg-blue-900', emoji: '⚓', tag: null },
  { name: 'Urban Pulse', desc: 'City grids and transit maps. Wear the city you love.', price: 30, color: 'bg-gray-400', emoji: '🗺️', tag: null },
  { name: 'Botanical Ink', desc: 'Hand-drawn ferns, botanicals, and florals on blush pink.', price: 32, color: 'bg-rose-300', emoji: '🌿', tag: 'New' },
  { name: 'The Manifesto Tab', desc: '"never for everyone" — woven into jet black. A statement with every step.', price: 35, color: 'bg-black', emoji: '🖤', tag: 'Signature' },
  { name: 'Celestial Step', desc: 'Moon phases across charcoal. Track the lunar cycle from your ankles.', price: 32, color: 'bg-slate-800', emoji: '🌙', tag: null },
  { name: 'The Retro Cassette', desc: 'Bold retro stripes in warm amber and rust. Decades of style, one pair of socks.', price: 30, color: 'bg-amber-600', emoji: '📼', tag: 'Trending' },
  { name: 'The Coordinates', desc: 'Your city. Your GPS coordinates. Your story printed to last.', price: 35, color: 'bg-gray-600', emoji: '📍', tag: null },
]

export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-14 text-center">
        <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-3">The Collection</p>
        <h1 className="text-5xl sm:text-7xl font-black uppercase mb-4">Shop</h1>
        <div className="w-24 h-1 bg-black mx-auto mb-6" />
        <p className="text-gray-500 max-w-lg mx-auto">Premium premade styles — each one designed to make a statement. Or go fully custom.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 mb-16">
        {STYLES.map((style) => (
          <div key={style.name} className="bg-white p-8 hover:bg-gray-50 transition-colors group relative">
            {style.tag && (
              <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest bg-black text-white px-2 py-1">
                {style.tag}
              </span>
            )}
            <div className={`w-full h-44 ${style.color} mb-6 flex items-center justify-center text-6xl`}>
              {style.emoji}
            </div>
            <h3 className="font-black text-base uppercase tracking-wide mb-2 group-hover:underline">{style.name}</h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">{style.desc}</p>
            <div className="flex items-center justify-between">
              <span className="font-black text-lg">${style.price}</span>
              <Link href="/custom"
                className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors">
                Order →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Custom CTA */}
      <div className="bg-black text-white p-12 sm:p-16 text-center">
        <h2 className="text-3xl sm:text-5xl font-black uppercase mb-4">None of these feel like you?</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Upload your photo, your pet, your inside joke. Make something truly yours.</p>
        <Link href="/custom" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
          Design Custom <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
