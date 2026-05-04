import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import VideoShowcase from '../components/VideoShowcase'
import Features from '../components/Features'
import GlossyMatte from '../components/GlossyMatte'
import HowItWorks from '../components/HowItWorks'
import Reviews from '../components/Reviews'
import UrgencyStrip from '../components/UrgencyStrip'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <>
      <Navbar light />
      <Hero />
      <VideoShowcase />
      <Features />
      <GlossyMatte />
      <HowItWorks />
      <Reviews />
      <UrgencyStrip />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}
