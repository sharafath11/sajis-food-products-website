'use client'

import { useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const showcaseImages = [
  {
    src: '/images/showcase-1.jpg',
    alt: 'Premium red chilli powder with whole dried chillies',
    title: 'Chilli Powder',
  },
  {
    src: '/images/showcase-2.jpg',
    alt: 'Golden turmeric powder and whole turmeric roots',
    title: 'Turmeric',
  },
  {
    src: '/images/showcase-3.jpg',
    alt: 'Black peppercorns with brass spoon',
    title: 'Pepper',
  },
  {
    src: '/images/showcase-4.jpg',
    alt: 'Aromatic garam masala spice blend',
    title: 'Garam Masala',
  },
]

export default function ImageShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement[]>([])

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

      // Images reveal with subtle parallax
      imagesRef.current.forEach((img, index) => {
        // Initial reveal
        gsap.fromTo(
          img,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Subtle parallax on scroll
        gsap.to(img.querySelector('.image-inner'), {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el)
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="gallery"
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">
            Gallery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4 text-balance">
            The <span className="text-gold">Essence</span> of Our Spices
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A visual journey through our premium spice collection.
          </p>
        </div>

        {/* Image Grid - Masonry-style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {showcaseImages.map((image, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`group relative overflow-hidden ${
                index === 0 || index === 3 ? 'lg:row-span-2' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${
                index === 0 || index === 3 ? 'aspect-[3/4]' : 'aspect-square'
              }`}>
                <div className="image-inner absolute inset-0 scale-110">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl font-semibold text-foreground transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {image.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-gold mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
