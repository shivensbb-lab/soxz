import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-black/10 py-24 px-6 text-center">
        <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-4">Our Story</p>
        <h1 className="text-5xl sm:text-7xl font-black uppercase mb-6">About SOXZ</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto tracking-wide">
          Built by two teenagers who believed socks deserved better.
        </p>
      </section>

      {/* The problem */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-4">The Problem</p>
            <h2 className="text-3xl font-black uppercase mb-5 leading-tight">The world&apos;s most gifted item. The least thought about.</h2>
            <p className="text-gray-600 leading-relaxed">
              The global footwear market is worth billions, yet the most essential part of a daily outfit — socks — remains generic and uninspired. Consumers are forced to choose between plain white or mass-produced patterns that millions of others already own.
            </p>
          </div>
          <div className="bg-black text-white p-10 text-center">
            <p className="text-6xl font-black mb-2">∞</p>
            <p className="text-sm tracking-widest uppercase text-gray-400">Pairs sold yearly</p>
            <div className="w-8 h-px bg-gray-600 mx-auto my-5" />
            <p className="text-2xl font-black mb-2">0</p>
            <p className="text-sm tracking-widest uppercase text-gray-400">That felt personal</p>
          </div>
        </div>
      </section>

      {/* The opportunity */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] text-gray-500 uppercase mb-6">The Opportunity</p>
          <h2 className="text-3xl sm:text-5xl font-black uppercase leading-tight mb-8">
            Identity Dressing.<br />
            <span className="text-gray-500">Wear your story.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Consumers are increasingly moving toward &quot;Identity Dressing.&quot; They don&apos;t just want to wear clothes — they want to wear their stories, their pets, their jokes, and their memories. There is currently no market leader successfully merging premium textile quality with seamless, high-tech customization.
          </p>
          <p className="text-white font-black text-xl mt-8 tracking-wide">That&apos;s the gap SOXZ fills.</p>
        </div>
      </section>

      {/* Founders */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-4 text-center">Founded by</p>
        <h2 className="text-4xl font-black uppercase text-center mb-16">The Founders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            {
              name: 'Viraj Sanghi',
              role: 'Co-Founder',
              quote: 'Even though Soxz is primarily a socks brand, our goal is to create a street where bold statement pieces are mixed with simple clothing — creating our brand identity.',
              letter: 'V',
            },
            {
              name: 'Shiven Balchandani',
              role: 'Co-Founder',
              quote: 'Socks are the most normal gift in the world. We want to make people feel they are getting something truly special — something that couldn\'t have been made for anyone else.',
              letter: 'S',
            },
          ].map((f) => (
            <div key={f.name} className="border-2 border-black p-10">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-black text-2xl mb-6">
                {f.letter}
              </div>
              <p className="text-gray-600 italic leading-relaxed mb-6 text-sm">&quot;{f.quote}&quot;</p>
              <p className="font-black text-base uppercase tracking-widest">{f.name}</p>
              <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">{f.role}, SOXZ</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black uppercase text-center mb-12">What makes SOXZ different</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-black/10">
            {[
              { title: 'Premium Textiles', desc: 'Cloud-like comfort in every pair. We source only the highest quality cotton blends.' },
              { title: 'True Customisation', desc: 'No templates. No limits. If you can imagine it, we can put it on a sock.' },
              { title: 'The Unboxing', desc: 'Every order arrives in a premium box with a handwritten artisan card. The experience is part of the product.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white p-8">
                <h3 className="font-black text-sm uppercase tracking-widest mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl font-black uppercase mb-4">Ready to stand out?</h2>
        <p className="text-gray-500 mb-8 tracking-widest text-sm uppercase">never for everyone, but for you</p>
        <Link href="/shop" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors">
          Shop Now <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}
