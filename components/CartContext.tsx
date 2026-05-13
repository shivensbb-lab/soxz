'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type CartItem = { name: string; price: number; qty: number; img: string }

type CartCtx = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>) => void
  remove: (name: string) => void
  update: (name: string, qty: number) => void
  clear: () => void
  total: number
  count: number
  cartOpen: boolean
  setCartOpen: (v: boolean) => void
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('soxz-cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('soxz-cart', JSON.stringify(items))
  }, [items])

  function add(item: Omit<CartItem, 'qty'>) {
    setItems(prev => {
      const existing = prev.find(i => i.name === item.name)
      if (existing) return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1 }]
    })
    setCartOpen(true)
  }

  function remove(name: string) {
    setItems(prev => prev.filter(i => i.name !== name))
  }

  function update(name: string, qty: number) {
    if (qty <= 0) return remove(name)
    setItems(prev => prev.map(i => i.name === name ? { ...i, qty } : i))
  }

  function clear() { setItems([]) }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, total, count, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
