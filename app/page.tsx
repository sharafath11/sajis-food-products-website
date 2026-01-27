import Navigation from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Products from '@/components/sections/Products'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import ImageShowcase from '@/components/sections/ImageShowcase'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Products />
      <WhyChooseUs />
      <ImageShowcase />
      <Contact />
      <Footer />
    </main>
  )
}
