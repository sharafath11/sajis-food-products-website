'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Brand */}
          <div className="mb-6">
            <h3 className="font-serif text-2xl font-bold">
              <span className="text-gold">SAJIS</span>
              <span className="text-foreground"> FOOD PRODUCTS</span>
            </h3>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground text-sm max-w-md mb-8">
            Pure Spices. Honest Taste. Bringing the authentic flavors of Kerala to your kitchen since generations.
          </p>

          {/* Divider */}
          <div className="w-16 h-px bg-gold/30 mb-8" />

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a href="#about" className="text-muted-foreground hover:text-gold transition-colors">
              About
            </a>
            <a href="#products" className="text-muted-foreground hover:text-gold transition-colors">
              Products
            </a>
            <a href="#why-us" className="text-muted-foreground hover:text-gold transition-colors">
              Why Us
            </a>
            <a href="#gallery" className="text-muted-foreground hover:text-gold transition-colors">
              Gallery
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-gold transition-colors">
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-muted-foreground text-xs">
            © {currentYear} SAJIS FOOD PRODUCTS. All rights reserved.
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            Made with care in Kerala, India
          </p>
        </div>
      </div>
    </footer>
  )
}
