'use client'

import React from "react"
import Image from "next/image"

import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import gsap from 'gsap'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initial animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [logoRef.current, linksRef.current],
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.5,
        }
      )
    }, navRef)

    return () => ctx.revert()
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-sm border-b border-border' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              ref={logoRef}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="font-serif text-lg md:text-xl font-bold flex items-center gap-2 leading-tight"
            >
              <span className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="text-gold">SAJIS</span>
                <span className="text-foreground">POWDER</span>
              </span>
              <span className="relative h-8 w-28 md:h-10 md:w-32 shrink-0 -ml-[43px]">
                <Image
                  src="/images/logo.png"
                  alt="SAJIS"
                  fill
                  sizes="(min-width: 768px) 128px, 112px"
                  className="object-contain"
                  priority
                />
              </span>
            </a>

            {/* Desktop Navigation */}
            <div ref={linksRef} className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm text-muted-foreground hover:text-gold transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:9961585808"
                className="px-4 py-2 border border-gold/50 text-gold text-sm hover:bg-gold/10 transition-all duration-200"
              >
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span 
                className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`} 
              />
              <span 
                className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`} 
              />
              <span 
                className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`} 
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-2xl font-serif text-foreground hover:text-gold transition-colors"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:9961585808"
            className="mt-4 px-6 py-3 border border-gold text-gold text-lg hover:bg-gold/10 transition-all"
            style={{
              transitionDelay: isMobileMenuOpen ? '250ms' : '0ms',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            Call Now
          </a>
        </div>
      </div>
    </>
  )
}
