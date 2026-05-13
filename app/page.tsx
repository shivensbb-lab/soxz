import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const STYLES = [
  { name: 'The Monogram Edition', desc: 'Your initials, your identity', color: 'bg-green-900', emoji: '🟢' },
  { name: 'Celestial Strides', desc: 'Constellations mapped to midnight navy', color: 'bg-indigo-950', emoji: '🌌' },
  { name: "The Navigator's Compass", desc: 'Anchors, waves, and open sea', color: 'bg-blue-900', emoji: '⚓' },
  { name: 'Urban Pulse', desc: 'City grids and transit maps', color: 'bg-gray-400', emoji: '🗺️' },
  { name: 'Botanical Ink', desc: 'Hand-drawn ferns and florals', color: 'bg-rose-300', emoji: '🌿' },
  { name: 'The Manifesto Tab', desc: '"never for everyone" — woven in', color: 'bg-black', emoji: '🖤' },
  { name: 'Celestial Step', desc: 'Moon phases across every step', color: 'bg-slate-800', emoji: '🌙' },
  { name: 'The Retro Cassette', desc: 'Bold retro stripes and warm tones', color: 'bg-amber-600', emoji: '📼' },
  { name: 'The Coordinates', desc: 'Your city. Your GPS. Your story.', color: 'bg-gray-600', emoji: '📍' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[92vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
          <span className="text-[40vw] font-black tracking-tighter leading-none">S</span>
        </div>
        <div className="relative z-10">
          <div className="border-t-4 border-b-4 border-black py-8 px-4 mb-8">
            <h1 className="text-[15vw] sm:text-[12vw] font-black tracking-tight leading-none uppercase">SOXZ</h1>
            <p className="text-lg sm:text-2xl tracking-[0.4em] text-gray-500 mt-3 uppercase">for our feet</p>
          </div>
          <p className="text-sm tracking-[0.3em] text-gray-400 uppercase mb-10">never for everyone, but for you</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              Shop Styles <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/custom" className="border-2 border-black text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Design Custom
            </Link>
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] text-gray-500 uppercase mb-6">Why we exist</p>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-8">
            Socks are the world&apos;s most common gift.<br />
            <span className="text-gray-500">They deserve to mean something.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            The global footwear market is worth billions, yet socks remain generic and uninspired. We believe your wardrobe should be as one-of-a-kind as your DNA.
          </p>
        </div>
      </section>

      {/* Premade styles */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-2">The Collection</p>
              <h2 className="text-4xl sm:text-5xl font-black uppercase">Premade Styles</h2>
            </div>
            <Link href="/shop" className="text-xs tracking-widest uppercase font-bold border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors hidden sm:block">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
            {STYLES.map((style) => (
              <Link key={style.name} href="/shop"
                className="bg-white p-8 hover:bg-gray-50 transition-colors group">
                <div className={`w-full h-40 ${style.color} mb-6 flex items-center justify-center text-5xl`}>
                  {style.emoji}
                </div>
                <h3 className="font-black text-lg uppercase tracking-wide mb-1 group-hover:underline">{style.name}</h3>
                <p className="text-sm text-gray-500">{style.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Custom order CTA */}
      <section className="bg-black text-white py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] text-gray-500 uppercase mb-6">Go further</p>
          <h2 className="text-4xl sm:text-6xl font-black uppercase leading-tight mb-6">
            Fully Custom.<br />Fully You.
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Upload your photo, your pet, your inside joke. We&apos;ll put it on the highest quality sock you&apos;ve ever worn.
          </p>
          <Link href="/custom" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
            Start Your Custom Order <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Packaging section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-4">The Experience</p>
              <h2 className="text-4xl sm:text-5xl font-black uppercase leading-tight mb-6">
                Unboxing is part of the gift.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We replace standard shipping with a premium tactile vessel designed for shelf-display and reuse. Every order includes a bespoke authentication card with a handwritten note from the artisan who packed it.
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  'Custom-engineered reusable box',
                  'Handwritten artisan authentication card',
                  'Tissue paper wrap with SOXZ seal',
                  'Built to display, not throw away',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 aspect-square flex items-center justify-center text-6xl">📦</div>
              <div className="bg-black aspect-square flex items-center justify-center text-6xl">🖤</div>
              <div className="bg-gray-900 aspect-square flex items-center justify-center text-6xl col-span-2 py-12">✨</div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="border-t border-black/10 py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-4">The Founders</p>
          <h2 className="text-4xl font-black uppercase mb-12">Built by two people<br />who hate boring socks.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                name: 'Viraj Sanghi',
                quote: 'Even though Soxz is primarily a socks brand, our goal is to create a street where mixed with simple clothing creates our brand.',
              },
              {
                name: 'Shiven Balchandani',
                quote: 'Socks are the most normal gift in the world — we want to make people feel they are getting something truly special.',
              },
            ].map((founder) => (
              <div key={founder.name} className="bg-white border border-black/10 p-8 text-left">
                <div className="w-12 h-12 bg-black rounded-full mb-5 flex items-center justify-center text-white font-black text-lg">
                  {founder.name[0]}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">&quot;{founder.quote}&quot;</p>
                <p className="font-black text-sm uppercase tracking-widest">— {founder.name}</p>
                <p className="text-xs text-gray-400 tracking-wider uppercase mt-0.5">Co-Founder</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="border-t-4 border-b-4 border-black py-12">
            <h2 className="text-4xl sm:text-6xl font-black uppercase mb-4">Your feet.<br />Your story.</h2>
            <p className="text-gray-500 tracking-[0.3em] text-sm uppercase mb-8">never for everyone, but for you</p>
            <Link href="/shop" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
