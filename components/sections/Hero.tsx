'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      // Initial states
      gsap.set([headlineRef.current, subtextRef.current, buttonsRef.current, brandRef.current], {
        opacity: 0,
        y: 40,
      })
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 1.1,
      })

      // Animation sequence
      tl.to(brandRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      })
      .to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, '-=0.4')
      .to(subtextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.6')
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
      }, '-=0.8')
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, '-=0.6')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95 z-10" />
      
      {/* Hero image */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero-spices.jpg"
          alt="Premium Indian spices arranged artistically"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
      </div>

      <div className="relative z-20 container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand name */}
          <div ref={brandRef} className="mb-8">
            <span className="inline-block px-4 py-2 border border-gold/30 text-gold text-sm tracking-[0.3em] uppercase">
              Since Generations
            </span>
          </div>

          {/* Headline */}
          <h1 
            ref={headlineRef}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance"
          >
            <span className="text-foreground">Just like home.</span>
            <br />
            <span className="text-gold">just like mom.</span>
          </h1>

          {/* Subtext */}
          <p 
            ref={subtextRef}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
          >
            Traditionally blended homemade spices from Kerala. 
            Experience the authentic aroma and flavor that has been passed down through generations.
          </p>

          {/* CTA Buttons */}
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={() => scrollToSection('products')}
              className="group relative px-8 py-4 bg-red text-foreground font-semibold text-sm tracking-wide uppercase overflow-hidden transition-all duration-300 hover:bg-red-light min-w-[200px]"
            >
              <span className="relative z-10">Explore Products</span>
              <div className="absolute inset-0 bg-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-background font-semibold text-sm tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                Explore Products
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="px-8 py-4 border border-gold/50 text-gold font-semibold text-sm tracking-wide uppercase transition-all duration-300 hover:bg-gold/10 hover:border-gold min-w-[200px]"
            >
              Know Our Story
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
