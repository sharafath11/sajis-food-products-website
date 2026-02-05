'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Language = 'en' | 'ml'

interface ProductVariant {
  en: string
  ml: string
  quantity: string
  mrp: number | null
  price: number | null
}

const productVariants: ProductVariant[] = [
  { en: 'Chicken Masala', ml: 'ചിക്കൻ മസാല', quantity: '50 g', mrp: 35, price: 30 },
  { en: 'Chicken Masala', ml: 'ചിക്കൻ മസാല', quantity: '100 g', mrp: 59, price: 55 },
  { en: 'Beef Masala', ml: 'ബീഫ് മസാല', quantity: '50 g', mrp: 35, price: 30 },
  { en: 'Beef Masala', ml: 'ബീഫ് മസാല', quantity: '100 g', mrp: 59, price: 55 },
  { en: 'Fish Masala', ml: 'മീൻ മസാല', quantity: '50 g', mrp: 35, price: 30 },
  { en: 'Fish Masala', ml: 'മീൻ മസാല', quantity: '100 g', mrp: 59, price: 55 },
  { en: 'Sambar Masala', ml: 'സാമ്പാർ മസാല', quantity: '50 g', mrp: 35, price: 30 },
  { en: 'Sambar Masala', ml: 'സാമ്പാർ മസാല', quantity: '100 g', mrp: 59, price:55 },
]

const strings = {
  en: {
    sectionEyebrow: 'Product List',
    sectionTitle: 'Products & Price',
    sectionSubtitle: 'Select a size to view pricing details.',
    mrp: 'MRP',
    sellingPrice: 'Selling Price',
    priceUnavailable: 'Price not available',
  },
  ml: {
    sectionEyebrow: 'ഉൽപ്പന്ന പട്ടിക',
    sectionTitle: 'ഉൽപ്പന്നങ്ങളും വിലയും',
    sectionSubtitle: 'വില വിശദാംശങ്ങൾ കാണാൻ അളവ് തിരഞ്ഞെടുക്കുക.',
    mrp: 'എംആർപി',
    sellingPrice: 'വില്പന വില',
    priceUnavailable: 'വില ലഭ്യമല്ല',
  },
}

const formatPrice = (value: number | null) => (value == null ? '' : `₹${value}`)

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [language, setLanguage] = useState<Language>('en')
  const [selectedByKey, setSelectedByKey] = useState<Record<string, number>>({})

  const grouped = useMemo(() => {
    const map = new Map<string, ProductVariant[]>()
    productVariants.forEach((variant) => {
      const key = variant.en
      const existing = map.get(key)
      if (existing) {
        existing.push(variant)
      } else {
        map.set(key, [variant])
      }
    })
    return Array.from(map.entries()).map(([key, variants]) => ({ key, variants }))
  }, [])

  useEffect(() => {
    const stored = sessionStorage.getItem('products-language')
    if (stored === 'en' || stored === 'ml') {
      setLanguage(stored)
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('products-language', language)
  }, [language])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [grouped.length])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  const handleSelect = (key: string, index: number) => {
    setSelectedByKey((prev) => ({ ...prev, [key]: index }))
  }

  const t = strings[language]

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-24 lg:py-32 bg-background relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={headerRef} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">
                {t.sectionEyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-balance">
                {t.sectionTitle}
              </h2>
              <p className="text-muted-foreground max-w-2xl mt-3">
                {t.sectionSubtitle}
              </p>
            </div>
            <div className="self-start md:self-auto">
              <div className="inline-flex items-center rounded-full border border-border bg-card/60 p-1 text-sm">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    language === 'en'
                      ? 'bg-gold text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-pressed={language === 'en'}
                >
                  English
                </button>
                <span className="px-2 text-muted-foreground">|</span>
                <button
                  type="button"
                  onClick={() => setLanguage('ml')}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    language === 'ml'
                      ? 'bg-gold text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-pressed={language === 'ml'}
                >
                  മലയാളം
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mt-14">
          {grouped.map((group, groupIndex) => {
            const selectedIndex = selectedByKey[group.key] ?? 0
            const selected = group.variants[selectedIndex] ?? group.variants[0]
            const isUnavailable = selected.price == null
            const hasMrp = selected.mrp != null
            const hasPrice = selected.price != null
            const isDiscounted =
              hasMrp && hasPrice && selected.mrp > selected.price

            return (
              <div
                key={group.key}
                ref={addToRefs}
                className="group relative bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10"
              >
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />

                <div className="flex flex-col gap-5 h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
                        {language === 'en' ? selected.en : selected.ml}
                      </h3>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {groupIndex + 1 < 10 ? `0${groupIndex + 1}` : groupIndex + 1}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.variants.map((variant, index) => {
                      const active = index === selectedIndex
                      return (
                        <button
                          key={`${group.key}-${variant.quantity}`}
                          type="button"
                          onClick={() => handleSelect(group.key, index)}
                          className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                            active
                              ? 'border-gold bg-gold/10 text-foreground'
                              : 'border-border text-muted-foreground hover:border-gold/60 hover:text-foreground'
                          }`}
                          aria-pressed={active}
                        >
                          {variant.quantity}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-auto pt-4 border-t border-border/60 flex flex-col gap-2">
                    {isUnavailable ? (
                      <span className="text-muted-foreground text-sm">
                        {t.priceUnavailable}
                      </span>
                    ) : (
                      <>
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-muted-foreground text-sm">{t.mrp}</span>
                          <span
                            className={`text-sm ${
                              isDiscounted ? 'line-through text-muted-foreground' : 'text-foreground'
                            }`}
                          >
                            {formatPrice(selected.mrp)}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-muted-foreground text-sm">{t.sellingPrice}</span>
                          <span className="text-gold font-semibold text-xl">
                            {formatPrice(selected.price)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
