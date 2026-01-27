'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Product {
  name: string
  quantity: string
  price: string
}

const products: Product[] = [
  { name: 'Chilli Powder', quantity: '100 g', price: '₹75' },
  { name: 'Chilli Powder', quantity: '50 g', price: '₹40' },
  { name: 'Coriander Powder', quantity: '100 g', price: '₹60' },
  { name: 'Coriander Powder', quantity: '50 g', price: '₹35' },
  { name: 'Turmeric Powder', quantity: '100 g', price: '₹50' },
  { name: 'Turmeric Powder', quantity: '50 g', price: '₹30' },
  { name: 'Pepper Powder', quantity: '100 g', price: '₹80' },
  { name: 'Pepper Powder', quantity: '50 g', price: '₹45' },
  { name: 'Garam Masala', quantity: '50 g', price: '₹70' },
  { name: 'Garam Masala', quantity: '100 g', price: '₹130' },
  { name: 'Kashmir Chilli Powder', quantity: '100 g', price: '₹60' },
]

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Staggered card reveal
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
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="products"
      className="py-24 lg:py-32 bg-background relative"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">
            Our Products
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4 text-balance">
            Products & <span className="text-gold">Price List</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium quality spices, freshly prepared and packed. 
            Available in convenient sizes for your kitchen needs.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, index) => (
            <div
              key={`${product.name}-${product.quantity}-${index}`}
              ref={addToRefs}
              className="group relative bg-card border border-border hover:border-gold/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5"
            >
              {/* Gold accent line */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />
              
              <div className="flex flex-col h-full">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="flex justify-between items-end mt-auto pt-4 border-t border-border/50">
                  <span className="text-muted-foreground text-sm">
                    {product.quantity}
                  </span>
                  <span className="text-gold font-semibold text-xl">
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-muted-foreground text-sm mt-10">
          Prices may vary. Contact us for bulk orders and wholesale inquiries.
        </p>
      </div>
    </section>
  )
}
