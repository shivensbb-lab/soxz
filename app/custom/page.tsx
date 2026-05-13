'use client'

import { useState, useRef } from 'react'
import { Upload, CheckCircle, X } from 'lucide-react'

const SOCK_TYPES = ['Crew (ankle-high)', 'Mid-calf', 'Knee-high', 'No-show']
const QUANTITIES = ['1 pair', '2 pairs', '3 pairs', '5 pairs', '10+ pairs']

export default function CustomPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', idea: '', type: '', qty: '', gift: false })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFile(f: File | null) {
    if (!f) return
    setFile(f)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#F8F6F2] dark:bg-[#0f0f0f] transition-colors">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 mx-auto mb-6 text-black dark:text-white" />
          <h2 className="text-4xl font-black uppercase mb-4 text-black dark:text-white">Order Received.</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-2">We&apos;ll email you within 24 hours with a design preview and payment details.</p>
          <p className="text-sm text-gray-400 tracking-widest uppercase mt-6">— The SOXZ team</p>
        </div>
      </div>
    )
  }

  const inputClass = "w-full border-2 border-black/20 dark:border-white/20 focus:border-black dark:focus:border-white px-4 py-3 text-sm outline-none transition-colors bg-white dark:bg-[#1a1a1a] text-black dark:text-white placeholder:text-gray-400"

  return (
    <div className="bg-[#F8F6F2] dark:bg-[#0f0f0f] min-h-screen transition-colors">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — info */}
          <div>
            <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-4">Fully Yours</p>
            <h1 className="text-5xl sm:text-6xl font-black uppercase leading-tight mb-6 text-black dark:text-white">Custom<br />Order</h1>
            <div className="w-16 h-1 bg-black dark:bg-white mb-8" />
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10">
              Tell us your idea — a photo of your pet, your initials, an inside joke, a memory — and we&apos;ll craft it onto the highest quality sock you&apos;ve ever worn.
            </p>

            <div className="space-y-6">
              {[
                { step: '01', title: 'Tell us your idea', desc: 'Fill in the form with your vision — the more detail the better.' },
                { step: '02', title: 'We send a design preview', desc: 'Within 24 hours, our team sends you a digital mockup for approval.' },
                { step: '03', title: 'Pay & we produce', desc: 'Approve the design, pay securely, and we handle the rest.' },
                { step: '04', title: 'Premium unboxing delivered', desc: 'Arrives in our signature box with handwritten artisan card.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-5">
                  <span className="font-black text-2xl text-black/10 dark:text-white/10 flex-shrink-0 w-10">{step}</span>
                  <div>
                    <p className="font-black text-sm uppercase tracking-wide mb-1 text-black dark:text-white">{title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-[#1a1a1a]">
              <p className="text-xs font-black uppercase tracking-widest mb-2 text-black dark:text-white">Pricing guide</p>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <div className="flex justify-between"><span>1 pair</span><span className="font-bold">From $35</span></div>
                <div className="flex justify-between"><span>2–4 pairs</span><span className="font-bold">From $30 each</span></div>
                <div className="flex justify-between"><span>5+ pairs</span><span className="font-bold">From $25 each</span></div>
                <div className="flex justify-between"><span>10+ pairs</span><span className="font-bold">Contact for quote</span></div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 text-black dark:text-white">Sock type</label>
                <select required value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                  className={inputClass}>
                  <option value="">Select a style</option>
                  {SOCK_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 text-black dark:text-white">Quantity</label>
                <select required value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })}
                  className={inputClass}>
                  <option value="">How many pairs?</option>
                  {QUANTITIES.map(q => <option key={q}>{q}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 text-black dark:text-white">Your design idea</label>
                <textarea required value={form.idea} onChange={e => setForm({ ...form, idea: e.target.value })}
                  placeholder="Describe your idea — a photo of your dog, your initials in gold, a constellation pattern, a quote... anything."
                  rows={5} className={`${inputClass} resize-none`} />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="gift" checked={form.gift} onChange={e => setForm({ ...form, gift: e.target.checked })}
                  className="w-4 h-4 accent-black" />
                <label htmlFor="gift" className="text-sm text-gray-600 dark:text-gray-300">This is a gift — include gift message card</label>
              </div>

              {/* Image upload */}
              <div
                className="border-2 border-dashed border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors cursor-pointer bg-white dark:bg-[#1a1a1a]"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
                {preview ? (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Reference" className="w-full max-h-48 object-contain" />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null) }}
                      className="absolute top-2 right-2 bg-black dark:bg-white text-white dark:text-black rounded-full p-1 hover:bg-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 py-2 text-center">{file?.name}</p>
                  </div>
                ) : (
                  <div className="p-6 flex flex-col items-center justify-center gap-2 text-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <p className="text-sm font-bold text-black dark:text-white">Upload reference image (optional)</p>
                    <p className="text-xs text-gray-400">Photo, logo, sketch — drag & drop or click</p>
                  </div>
                )}
              </div>

              <button type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black py-5 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                Submit Custom Order
              </button>

              <p className="text-xs text-gray-400 text-center">No payment now. We&apos;ll send a design preview first and invoice you after approval.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
