import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { STYLES, getStyle } from '@/lib/styles'
import SockImage from '@/components/SockImage'
import AddToCartSection from '@/components/AddToCartSection'

export function generateStaticParams() {
  return STYLES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const style = getStyle(slug)
  if (!style) return {}
  return { title: `${style.name} — SOXZ`, description: style.desc }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const style = getStyle(slug)
  if (!style) notFound()

  const related = STYLES.filter(s => s.slug !== slug).slice(0, 3)

  return (
    <div className="bg-white dark:bg-[#0f0f0f] min-h-screen transition-colors">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 py-5">
        <Link href="/shop" className="flex items-center gap-2 text-xs text-gray-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest font-bold">
          <ArrowLeft className="w-3 h-3" /> Shop
        </Link>
      </div>

      {/* Product */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-[#F8F6F2] dark:bg-[#1a1a1a]">
            <SockImage
              src={style.img}
              alt={style.name}
              fallbackColor={style.color}
              fallbackLabel={style.name}
              className="w-full h-full"
            />
            {style.tag && (
              <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest bg-black text-white px-3 py-1.5">
                {style.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">

            {/* Collection badge */}
            {style.og ? (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest border border-black dark:border-white px-2 py-1 text-black dark:text-white">
                  OG Collection
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                  {style.ogColor}
                </span>
              </div>
            ) : style.tag ? (
              <div className="mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{style.theme}</span>
              </div>
            ) : (
              <div className="mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{style.theme}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-black uppercase leading-tight text-black dark:text-white mb-2">
              {style.name}
            </h1>

            <p className="text-2xl font-black text-black dark:text-white mb-6">${style.price}</p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-base">
              {style.desc}
            </p>

            {/* Details */}
            <div className="border-t border-b border-black/10 dark:border-white/10 py-5 mb-8 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Includes</span>
                <span className="text-black dark:text-white text-xs font-bold">{style.includes}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Fit</span>
                <span className="text-black dark:text-white text-xs font-bold">One Size Fits Most (EU 36–46)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Material</span>
                <span className="text-black dark:text-white text-xs font-bold">80% Cotton, 15% Nylon, 5% Elastane</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Packaging</span>
                <span className="text-black dark:text-white text-xs font-bold">Premium SOXZ gift box</span>
              </div>
            </div>

            <AddToCartSection style={style} />

            <div className="mt-8 text-center">
              <Link href="/custom" className="text-xs text-gray-400 hover:text-black dark:hover:text-white transition-colors underline">
                Want this personalised? Design a custom version →
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-24 pt-12 border-t border-black/10 dark:border-white/10">
          <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-2">You might also like</p>
          <h2 className="text-2xl font-black uppercase text-black dark:text-white mb-10">More Styles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map(s => (
              <Link key={s.slug} href={`/shop/${s.slug}`} className="group">
                <div className="relative aspect-square overflow-hidden bg-[#F8F6F2] dark:bg-[#1a1a1a] mb-3">
                  <SockImage
                    src={s.img}
                    alt={s.name}
                    fallbackColor={s.color}
                    fallbackLabel={s.theme}
                    className="group-hover:scale-105 transition-transform duration-500 w-full h-full"
                  />
                </div>
                <p className="font-black text-xs uppercase tracking-wide text-black dark:text-white mb-1">{s.name}</p>
                <p className="font-black text-sm text-black dark:text-white">${s.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
