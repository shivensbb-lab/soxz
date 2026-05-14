'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from './CartContext'
import type { Style } from '@/lib/styles'

export default function AddToCartSection({ style }: { style: Style }) {
  const [qty, setQty] = useState(1)
  const { add } = useCart()

  function handleAdd() {
    for (let i = 0; i < qty; i++) add({ name: style.name, price: style.price, img: style.img })
  }

  return (
    <div className="space-y-6">
      {/* Qty */}
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-9 h-9 border-2 border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="font-black text-xl text-black dark:text-white w-6 text-center">{qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="w-9 h-9 border-2 border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        <span className="font-black text-lg text-black dark:text-white ml-auto">
          ${(style.price * qty).toFixed(2)}
        </span>
      </div>

      <button
        onClick={handleAdd}
        className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-sm font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-4 h-4" /> Add to Cart — ${(style.price * qty).toFixed(2)}
      </button>

      <div className="border border-black/10 dark:border-white/10 p-4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        <strong className="text-black dark:text-white block mb-1">No payment now.</strong>
        We&apos;ll send a design preview within 24 hours. Once you approve, we email you a secure payment link. That&apos;s it.
      </div>
    </div>
  )
}
