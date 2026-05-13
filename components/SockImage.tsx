'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Props {
  src: string
  alt: string
  fallbackColor: string
  fallbackLabel: string
  className?: string
}

export default function SockImage({ src, alt, fallbackColor, fallbackLabel, className = '' }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`${className} flex flex-col items-center justify-center gap-2`} style={{ background: fallbackColor }}>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/60 text-center px-4 leading-relaxed">
          {fallbackLabel}
        </span>
        <span className="text-[9px] text-white/40 uppercase tracking-widest">add photo to public/socks/</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      unoptimized
      onError={() => setFailed(true)}
    />
  )
}
