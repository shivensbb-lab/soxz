'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag, CheckCircle } from 'lucide-react'
import { useCart } from './CartContext'

export default function CartDrawer() {
  const { items, remove, update, total, count, cartOpen, setCartOpen, clear } = useCart()
  const [step, setStep] = useState<'cart' | 'checkout' | 'done'>('cart')
  const [form, setForm] = useState({ name: '', email: '', notes: '' })

  function handleClose() {
    setCartOpen(false)
    if (step === 'done') { setStep('cart'); setForm({ name: '', email: '', notes: '' }) }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStep('done')
    clear()
  }

  if (!cartOpen) return null

  const inputClass = "w-full border-2 border-black/20 dark:border-white/20 focus:border-black dark:focus:border-white px-4 py-3 text-sm outline-none bg-white dark:bg-[#1a1a1a] text-black dark:text-white placeholder:text-gray-400 transition-colors"

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={handleClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-[#111111] z-50 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-black dark:text-white" />
            <h2 className="font-black text-sm uppercase tracking-widest text-black dark:text-white">
              {step === 'done' ? 'Order Received' : step === 'checkout' ? 'Confirm Order' : `Cart (${count})`}
            </h2>
          </div>
          <button onClick={handleClose} className="p-1 text-black dark:text-white hover:opacity-60 transition-opacity">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Done state */}
        {step === 'done' && (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <CheckCircle className="w-14 h-14 text-black dark:text-white mb-6" />
            <h3 className="font-black text-2xl uppercase mb-4 text-black dark:text-white">We&apos;re on it.</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              We&apos;ll email you within <strong>24 hours</strong> with a design preview for your approval.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Once you approve the design, we&apos;ll send a <strong>secure payment link</strong> to your email — no card details needed right now.
            </p>
            <p className="text-xs text-gray-400 tracking-widest uppercase mt-8">— The SOXZ Team</p>
            <button onClick={handleClose} className="mt-6 text-xs font-black uppercase tracking-widest border-b-2 border-black dark:border-white pb-1 text-black dark:text-white">
              Done
            </button>
          </div>
        )}

        {/* Checkout form */}
        {step === 'checkout' && (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Order summary */}
            <div className="mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Your Order</p>
              {items.map(item => (
                <div key={item.name} className="flex justify-between text-sm py-2 border-b border-black/5 dark:border-white/5">
                  <span className="text-black dark:text-white">{item.name} <span className="text-gray-400">× {item.qty}</span></span>
                  <span className="font-bold text-black dark:text-white">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-black text-base text-black dark:text-white pt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-[#F8F6F2] dark:bg-[#1a1a1a] p-4 mb-6 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              <strong className="text-black dark:text-white block mb-1">No payment now.</strong>
              We&apos;ll review your order, send a design preview for approval, then email you a secure payment link. Simple as that.
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 text-black dark:text-white">Your name</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Shiven Balchandani" className={inputClass} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 text-black dark:text-white">Email address</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com" className={inputClass} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 text-black dark:text-white">Notes (optional)</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="Sizing, personalisation details, gift message..."
                  rows={3} className={`${inputClass} resize-none`} />
              </div>
              <button type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                Send Order Request
              </button>
              <button type="button" onClick={() => setStep('cart')}
                className="w-full text-xs text-gray-400 hover:text-gray-600 underline transition-colors">
                ← Back to cart
              </button>
            </form>
          </div>
        )}

        {/* Cart items */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-200 dark:text-gray-700 mb-4" />
                  <p className="text-gray-400 text-sm mb-6">Your cart is empty.</p>
                  <button onClick={handleClose}
                    className="text-xs font-black uppercase tracking-widest border-b-2 border-black dark:border-white pb-1 text-black dark:text-white">
                    Browse Styles
                  </button>
                </div>
              ) : (
                <div className="px-6 py-4 space-y-5">
                  {items.map(item => (
                    <div key={item.name} className="flex gap-4 pb-5 border-b border-black/5 dark:border-white/5 last:border-0">
                      <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <Image src={item.img} alt={item.name} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-xs uppercase tracking-wide text-black dark:text-white mb-1 leading-tight">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">${item.price} per pair</p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => update(item.name, item.qty - 1)}
                            className="w-6 h-6 border border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold text-black dark:text-white w-5 text-center">{item.qty}</span>
                          <button onClick={() => update(item.name, item.qty + 1)}
                            className="w-6 h-6 border border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-black text-sm text-black dark:text-white">${(item.price * item.qty).toFixed(2)}</p>
                        <button onClick={() => remove(item.name)}
                          className="text-xs text-gray-400 hover:text-red-500 transition-colors mt-2">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-black/10 dark:border-white/10 px-6 py-5 flex-shrink-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Subtotal ({count} pair{count !== 1 ? 's' : ''})
                  </span>
                  <span className="font-black text-xl text-black dark:text-white">${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 text-center mb-4">Payment link sent via email after design approval</p>
                <button onClick={() => setStep('checkout')}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
