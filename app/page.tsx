'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BarChart3,
  TrendingUp,
  Zap,
  Users,
  CheckCircle2,
  ArrowRight,
  LogOut,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { ServiceCard } from '@/components/service-card'
import { TestimonialCard } from '@/components/testimonial-card'
import { CaseStudyCard } from '@/components/case-study-card'
import { VideoBackground } from '@/components/video-background'
import { TestimonialCarousel } from '@/components/testimonial-carousel'
import { containerVariants, staggerChild } from '@/lib/animations'
import { useAuth } from '@/contexts/auth-provider'

export default function Home() {
  const { isAuthenticated, user, userProfile, signOut, isLoading } = useAuth()
  const router = useRouter()
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <VideoBackground 
          src="/videos/Hero_Video.mp4"
          overlay="gradient" 
          overlayIntensity="medium"
        >
          <div className="px-4 py-20 sm:py-32 lg:py-40">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap className="h-4 w-4" />
                  Trusted by 150+ Growing Brands
                </motion.span>
                <motion.h1
                  className="text-balance mt-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Transform Your Brand with
                  <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Digital Excellence
                  </span>
                </motion.h1>
                <motion.p
                  className="text-balance mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Drive measurable results with our expert digital marketing services. From social media to paid ads, SEO to web development—we&apos;ve got everything you need to dominate your industry.
                </motion.p>
                <motion.div
                  className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Button asChild size="lg" className="bg-gradient-to-r from-destructive to-accent text-white border-0 font-semibold glow-cta shadow-lg hover:shadow-xl">
                    <Link href="/contact">Start Your Campaign</Link>
                  </Button>
                  <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/70 text-white border-0 font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                    <Link href="/case-studies">View Our Work</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </VideoBackground>
      </section>

      {/* Authentication Status Section */}
      {!isLoading && !isAuthenticated && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-8 sm:py-12 bg-gradient-to-r from-primary/10 via-background to-accent/10 border-b border-primary/20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="glass rounded-2xl border border-primary/20 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Transform Your Business?</h3>
                  <p className="text-muted-foreground">Create an account or sign in to get started with our marketing services.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 sm:flex-none glass rounded-xl px-6 py-3 h-auto font-semibold text-foreground border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  >
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-accent text-white border-0 font-semibold rounded-xl h-auto px-6 py-3 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  >
                    <Link href="/auth/signup">Create Account</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Authenticated User Welcome Section */}
      {!isLoading && isAuthenticated && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-8 sm:py-12 bg-gradient-to-r from-accent/10 via-background to-primary/10 border-b border-accent/20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="glass rounded-2xl border border-accent/20 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Welcome back, {userProfile?.full_name || user?.email?.split('@')[0]}! 👋</h3>
                  <p className="text-muted-foreground">You're all set. Check out our services or start a new campaign today.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary/70 text-white border-0 font-semibold rounded-xl h-auto px-6 py-3 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  >
                    <Link href="/services">View Services</Link>
                  </Button>
                  <Button
                    onClick={async () => {
                      await signOut()
                      router.push('/')
                    }}
                    size="lg"
                    className="flex-1 sm:flex-none glass rounded-xl px-6 py-3 h-auto font-semibold text-destructive border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 hover:border-destructive/40 transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Social Proof Section */}
      <section className="border-y border-border bg-card/50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">150+</p>
              <p className="text-sm text-muted-foreground mt-2">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">$2.5B+</p>
              <p className="text-sm text-muted-foreground mt-2">Revenue Generated</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground mt-2">Client Retention</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">12+</p>
              <p className="text-sm text-muted-foreground mt-2">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
              Our Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Comprehensive solutions designed to accelerate your growth and maximize ROI
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={staggerChild}>
              <Link href="/services/1">
                <ServiceCard
                  icon={<TrendingUp className="h-6 w-6" />}
                  title="Social Media Marketing"
                  description="Build an engaged audience and drive sales through strategic social media campaigns across all platforms."
                />
              </Link>
            </motion.div>
            <motion.div variants={staggerChild}>
              <Link href="/services/2">
                <ServiceCard
                  icon={<BarChart3 className="h-6 w-6" />}
                  title="Paid Advertising"
                  description="Data-driven ad campaigns that convert. Google Ads, Facebook, LinkedIn, and TikTok optimization."
                />
              </Link>
            </motion.div>
            <motion.div variants={staggerChild}>
              <Link href="/services/1">
                <ServiceCard
                  icon={<Zap className="h-6 w-6" />}
                  title="SEO & Content"
                  description="Dominate search rankings with expert SEO strategies and high-performing content that ranks and converts."
                />
              </Link>
            </motion.div>
            <motion.div variants={staggerChild}>
              <Link href="/services/2">
                <ServiceCard
                  icon={<Users className="h-6 w-6" />}
                  title="Web Development"
                  description="Beautiful, fast, and conversion-optimized websites built with the latest technologies for maximum performance."
                />
              </Link>
            </motion.div>
            <motion.div variants={staggerChild}>
              <Link href="/services/3">
                <ServiceCard
                  icon={<CheckCircle2 className="h-6 w-6" />}
                  title="Brand Strategy"
                  description="Strategic branding that sets you apart. Logo design, brand identity, and complete brand guidelines."
                />
              </Link>
            </motion.div>
            <motion.div variants={staggerChild}>
              <Link href="/services/3">
                <ServiceCard
                  icon={<TrendingUp className="h-6 w-6" />}
                  title="Analytics & Reporting"
                  description="Transparent, actionable reporting. Real-time dashboards so you always know how your campaigns perform."
                />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/70 text-white border-0 font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
              <Link href="/services">
                Explore All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-y border-white/10 bg-gradient-to-b from-white/5 to-white/0 px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
              {/* Loved by Leading Brands */}
              Testimonals
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              See what our clients are saying about the results we&apos;ve delivered
            </p>
          </motion.div>

          <TestimonialCarousel
            testimonials={[
              {
                quote: 'They transformed our online presence completely. Our sales increased by 340% in just 6 months.',
                author: 'Sarah Mitchell',
                role: 'Founder',
                company: 'TechStartup Co',
                rating: 5,
              },
              {
                quote: 'Best marketing investment we\'ve made. The team is responsive, strategic, and incredibly results-driven.',
                author: 'Michael Chen',
                role: 'CEO',
                company: 'E-commerce Plus',
                rating: 5,
              },
              {
                quote: 'Professional, transparent, and deliver exactly what they promise. Highly recommend to any growing business.',
                author: 'Jessica Williams',
                role: 'Marketing Director',
                company: 'Fashion Brands Inc',
                rating: 5,
              },
              {
                quote: 'The strategy and execution were flawless. We tripled our conversions in 3 months.',
                author: 'David Park',
                role: 'Founder',
                company: 'SaaS Victory',
                rating: 5,
              },
              {
                quote: 'Their team went above and beyond. Exceptional service and phenomenal ROI.',
                author: 'Emma Thompson',
                role: 'CMO',
                company: 'Enterprise Co',
                rating: 5,
              },
            ]}
            autoPlay
            autoPlayInterval={6000}
          />
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
              Featured Case Studies
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Real results from real clients across different industries
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={staggerChild}>
              <CaseStudyCard
                title="E-commerce Brand Scaling"
                company="FashionHub"
                category="E-commerce"
                result="Increased revenue by 450% through strategic SEO and paid ads optimization in 12 months."
                href="/case-studies/fashionhub"
              />
            </motion.div>
            <motion.div variants={staggerChild}>
              <CaseStudyCard
                title="SaaS Customer Acquisition"
                company="CloudTools"
                category="SaaS"
                result="Reduced CAC by 35% and increased conversion rate to 8.2% with targeted demand generation."
                href="/case-studies/cloudtools"
              />
            </motion.div>
            <motion.div variants={staggerChild}>
              <CaseStudyCard
                title="Local Service Growth"
                company="HomeServices Pro"
                category="Local Services"
                result="Generated 500+ qualified leads and 80 new customers using geo-targeted campaigns."
                href="/case-studies/homeservices"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/70 text-white border-0 font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
              <Link href="/case-studies">
                View All Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
            Ready to Transform Your Business?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Let&apos;s discuss your goals and create a winning strategy together. Schedule a free consultation with our strategy team today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-destructive to-accent text-white border-0 font-semibold glow-cta shadow-lg hover:shadow-xl">
              <Link href="/contact">Schedule Free Consultation</Link>
            </Button>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/70 text-white border-0 font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                  DM
                </div>
                <span className="font-semibold">Digital Marketing</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transforming brands through strategic digital marketing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/services" className="hover:text-primary transition-colors">Social Media</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">Paid Ads</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">SEO</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">Web Dev</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Digital Marketing Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
