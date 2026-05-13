import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const STYLES = [
  {
    name: 'The Monogram Edition',
    desc: 'Your initials, woven into premium ribbed cotton.',
    price: 28,
    tag: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&q=80',
    bg: 'bg-green-800',
  },
  {
    name: 'Celestial Strides',
    desc: 'Constellations mapped across midnight navy.',
    price: 32,
    tag: 'Fan Favourite',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    bg: 'bg-indigo-950',
  },
  {
    name: "The Navigator's Compass",
    desc: 'Anchors, waves, and open-sea motifs.',
    price: 30,
    tag: null,
    img: 'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=600&q=80',
    bg: 'bg-blue-900',
  },
  {
    name: 'Urban Pulse',
    desc: 'City grids and transit maps.',
    price: 30,
    tag: null,
    img: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80',
    bg: 'bg-zinc-400',
  },
  {
    name: 'Botanical Ink',
    desc: 'Hand-drawn ferns and florals on blush pink.',
    price: 32,
    tag: 'New',
    img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80',
    bg: 'bg-rose-300',
  },
  {
    name: 'The Manifesto Tab',
    desc: '"never for everyone" — woven in jet black.',
    price: 35,
    tag: 'Signature',
    img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80',
    bg: 'bg-zinc-900',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[90vh] bg-white flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          <div>
            <div className="border-t-4 border-black pt-8 mb-8">
              <h1 className="text-[13vw] sm:text-[8vw] lg:text-[7vw] font-black tracking-tighter leading-none uppercase text-black">SOXZ</h1>
              <p className="text-base sm:text-xl tracking-[0.35em] text-gray-500 mt-3 uppercase">for our feet</p>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-4 max-w-md">
              Premium personalised socks designed around you — your stories, your style, your identity.
            </p>
            <p className="text-sm tracking-[0.25em] text-gray-400 uppercase mb-10">never for everyone, but for you</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Shop Styles <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/custom" className="border-2 border-black text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors text-center">
                Design Custom
              </Link>
            </div>
          </div>
          <div className="relative h-[500px] hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=900&q=85"
              alt="Premium socks"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* The pitch — dark section */}
      <section className="bg-[#111111] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] text-gray-500 uppercase mb-6">Why we exist</p>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-8 text-white">
            Socks are the world&apos;s most gifted item.
            <span className="block text-gray-400 mt-2">They deserve to mean something.</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            The global footwear market is worth billions, yet socks remain generic and uninspired. We believe your wardrobe should be as one-of-a-kind as your DNA.
          </p>
        </div>
      </section>

      {/* Styles grid */}
      <section className="py-24 px-6 bg-[#F8F6F2]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-2">The Collection</p>
              <h2 className="text-4xl sm:text-5xl font-black uppercase text-black">Premade Styles</h2>
            </div>
            <Link href="/shop" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-400 transition-colors hidden sm:block">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STYLES.map((style) => (
              <Link key={style.name} href="/shop" className="group bg-white hover:shadow-lg transition-all duration-300 block">
                <div className="relative h-56 overflow-hidden">
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
                <div className="p-5">
                  <h3 className="font-black text-base uppercase tracking-wide mb-1 text-black">{style.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{style.desc}</p>
                  <p className="font-black text-lg text-black">${style.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80"
                alt="Premium white packaging"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="relative h-64 mt-8">
              <Image
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80"
                alt="Premium black packaging"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-4">The Experience</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase leading-tight mb-6 text-black">
              Unboxing is part<br />of the gift.
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              We replace standard shipping with a premium tactile vessel designed for shelf-display and reuse. Every order includes a handwritten note from the artisan who packed it.
            </p>
            <ul className="space-y-3">
              {[
                'Custom-engineered reusable box',
                'Handwritten artisan authentication card',
                'Tissue paper wrap with SOXZ seal',
                'Built to display, not throw away',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section className="bg-[#111111] text-white py-32 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] text-gray-500 uppercase mb-6">Go Further</p>
            <h2 className="text-4xl sm:text-5xl font-black uppercase leading-tight mb-6">
              Fully Custom.<br />Fully You.
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-10">
              Upload your photo, your pet, your inside joke. We&apos;ll put it on the highest quality sock you&apos;ve ever worn.
            </p>
            <Link href="/custom" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
              Start Custom Order <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative h-80">
            <Image
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80"
              alt="Custom socks"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 px-6 bg-[#F8F6F2]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-4">The Founders</p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mb-12 text-black">Built by two people<br />who hate boring socks.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: 'Viraj Sanghi', quote: 'Our goal is to create a street where bold statement pieces are mixed with simple clothing — creating our brand.', letter: 'V' },
              { name: 'Shiven Balchandani', quote: 'Socks are the most normal gift in the world. We want to make people feel they are getting something truly special.', letter: 'S' },
            ].map((f) => (
              <div key={f.name} className="bg-white p-8 text-left">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-lg mb-6">{f.letter}</div>
                <p className="text-gray-600 italic leading-relaxed mb-5 text-sm">&quot;{f.quote}&quot;</p>
                <p className="font-black text-sm uppercase tracking-widest text-black">— {f.name}</p>
                <p className="text-xs text-gray-400 tracking-wider uppercase mt-1">Co-Founder</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="border-t-4 border-b-4 border-black py-12">
            <h2 className="text-4xl sm:text-5xl font-black uppercase mb-3 text-black">Your feet.<br />Your story.</h2>
            <p className="text-gray-500 tracking-[0.3em] text-sm uppercase mb-8">never for everyone, but for you</p>
            <Link href="/shop" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 text-sm font-black uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
