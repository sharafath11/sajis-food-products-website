'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRefs = useRef<HTMLParagraphElement[]>([])
  const decorRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Text paragraphs staggered animation
      textRefs.current.forEach((ref, index) => {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Decorative line animation
      gsap.fromTo(
        decorRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el)
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/about-process.jpg"
                alt="Traditional spice grinding process in Kerala"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gold frame accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
            </div>
            {/* Years badge */}
            <div className="absolute -bottom-6 -left-6 lg:-left-10 bg-red px-6 py-4">
              <span className="text-foreground font-serif text-3xl font-bold">15+</span>
              <p className="text-foreground/80 text-sm">Years of Trust</p>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="lg:pl-8">
            <div className="mb-6">
              <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">
                Our Story
              </span>
            </div>
            
            <h2 
              ref={titleRef}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance"
            >
              Crafted with Care,
              <br />
              <span className="text-gold">Rooted in Tradition</span>
            </h2>

            <div 
              ref={decorRef}
              className="w-20 h-0.5 bg-gold mb-8 origin-left"
            />

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p ref={addToRefs}>
                SAJIS FOOD PRODUCTS began as a small family kitchen in Kerala, 
                where the art of spice blending was passed down through generations. 
                What started as a tradition of making spices for our own family has 
                now become a trusted name in homes across the region.
              </p>
              <p ref={addToRefs}>
                Every batch of our spices is prepared using time-honored methods—sun-dried, 
                stone-ground, and hand-blended to preserve the authentic aroma and flavor 
                that commercial processing often loses.
              </p>
              <p ref={addToRefs}>
                We believe in simplicity: pure ingredients, honest processes, and no 
                shortcuts. No added colors, no artificial preservatives—just the natural 
                goodness of Kerala&apos;s finest spices, delivered to your kitchen.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <span className="text-gold font-serif text-2xl font-bold">100%</span>
                <p className="text-sm text-muted-foreground">Natural Ingredients</p>
              </div>
              <div>
                <span className="text-gold font-serif text-2xl font-bold">1000+</span>
                <p className="text-sm text-muted-foreground">Happy Families</p>
              </div>
              <div>
                <span className="text-gold font-serif text-2xl font-bold">Kerala</span>
                <p className="text-sm text-muted-foreground">Origin Sourced</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
