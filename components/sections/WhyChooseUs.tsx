'use client'

import React from "react"

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: '100% Pure & Aromatic',
    description: 'No additives, no fillers. Just pure, premium spices that bring authentic flavor to every dish.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10" />
        <path d="M12 6v6l4 2" />
        <path d="M17 3l4 4-4 4" />
        <path d="M21 7h-7" />
      </svg>
    ),
    title: 'Homemade Process',
    description: 'Traditional methods passed down through generations. Sun-dried, stone-ground, hand-blended.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" />
        <path d="M8 16s1.5 2 4 2 4-2 4-2" />
        <path d="m9 9-1-1M15 9l1-1" />
      </svg>
    ),
    title: 'No Added Colors',
    description: 'What you see is natural. Our spices derive their vibrant colors purely from nature.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Quality Ingredients',
    description: 'Sourced directly from Kerala farmers. Every ingredient is selected for its quality and freshness.',
  },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const iconsRef = useRef<HTMLDivElement[]>([])

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

      // Cards fade up
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Icons scale in
      iconsRef.current.forEach((icon, index) => {
        gsap.fromTo(
          icon,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.3 + index * 0.1,
            ease: 'back.out(1.7)',
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

  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  const addToIconsRef = (el: HTMLDivElement | null) => {
    if (el && !iconsRef.current.includes(el)) {
      iconsRef.current.push(el)
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="why-us"
      className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 border border-gold rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 border border-gold rounded-full" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">
            Why Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4 text-balance">
            Why Choose <span className="text-gold">SAJIS?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The difference is in every pinch. Here&apos;s what makes our spices special.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={addToCardsRef}
              className="group relative bg-card p-8 text-center border border-border hover:border-gold/30 transition-all duration-300"
            >
              {/* Icon */}
              <div 
                ref={addToIconsRef}
                className="inline-flex items-center justify-center w-16 h-16 mb-6 text-gold border border-gold/30 group-hover:bg-gold/10 transition-all duration-300"
              >
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold group-hover:w-1/2 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
