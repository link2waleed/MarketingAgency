'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, TrendingUp, Zap, Users, CheckCircle2, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { containerVariants, staggerChild } from '@/lib/animations'

export default function ServicesPage() {
  const getServiceId = (title: string): string => {
    const idMap: { [key: string]: string } = {
      'Social Media Marketing': '1',
      'Paid Advertising': '2',
      'SEO & Content Strategy': '3',
      'Web Development': '1',
      'Brand Strategy': '2',
      'Analytics & Reporting': '3',
    }
    return idMap[title] || '1'
  }

  const services = [
    {
      title: 'Social Media Marketing',
      description: 'Build an engaged community and drive sales through strategic social media campaigns.',
      icon: Users,
      benefits: [
        'Platform optimization for Instagram, TikTok, LinkedIn, and Facebook',
        'Content creation and community management',
        'Influencer partnerships and collaborations',
        'Performance tracking and audience insights',
      ],
    },
    {
      title: 'Paid Advertising',
      description: 'Data-driven campaigns optimized for maximum ROI and customer acquisition.',
      icon: BarChart3,
      benefits: [
        'Google Ads (Search, Display, Shopping)',
        'Social media advertising (Facebook, Instagram, TikTok)',
        'LinkedIn B2B advertising',
        'Retargeting and remarketing strategies',
      ],
    },
    {
      title: 'SEO & Content Strategy',
      description: 'Dominate search rankings and attract qualified organic traffic.',
      icon: TrendingUp,
      benefits: [
        'Technical SEO audits and optimization',
        'Content strategy and keyword research',
        'Link building and domain authority',
        'Local SEO for multi-location businesses',
      ],
    },
    {
      title: 'Web Development',
      description: 'Beautiful, fast, and conversion-optimized websites that drive results.',
      icon: Zap,
      benefits: [
        'Custom website design and development',
        'E-commerce platforms (Shopify, WooCommerce)',
        'Performance optimization and speed',
        'Mobile-first responsive design',
      ],
    },
    {
      title: 'Brand Strategy',
      description: 'Strategic branding that sets you apart in a crowded marketplace.',
      icon: Lightbulb,
      benefits: [
        'Brand positioning and messaging',
        'Logo and visual identity design',
        'Brand guidelines and voice',
        'Market research and competitive analysis',
      ],
    },
    {
      title: 'Analytics & Reporting',
      description: 'Transparent, actionable insights into your marketing performance.',
      icon: CheckCircle2,
      benefits: [
        'Custom dashboard creation',
        'Real-time performance tracking',
        'Monthly strategy reviews',
        'Data-driven recommendations',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Services Section */}
      <section className="px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl opacity-30" />
        </div>
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Our Premium Services
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Complete digital marketing solutions designed to accelerate your growth and deliver measurable results across all channels.
            </p>
          </div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            {services.map((service) => {
              const Icon = service.icon

              return (
                <motion.div
                  key={service.title}
                  variants={staggerChild}
                  className="glass rounded-xl border border-white/5 bg-white/5 p-8 hover:shadow-lg hover:shadow-primary/10 hover:bg-white/10 transition-all duration-300 flex flex-col"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-accent/30 text-primary mb-4 glow">
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="mb-3 text-xl font-bold text-foreground">{service.title}</h3>
                  
                  <p className="mb-6 text-muted-foreground/80 leading-relaxed text-sm flex-grow">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                    {service.benefits.slice(0, 3).map((benefit) => (
                      <div key={benefit} className="flex gap-2 text-xs">
                        <span className="text-accent mt-0.5">✓</span>
                        <span className="text-muted-foreground/80">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild size="sm" className="w-full bg-gradient-to-r from-primary to-accent text-white border-0 font-semibold">
                    <Link href={`/services/${getServiceId(service.title)}`}>
                      Get Started
                    </Link>
                  </Button>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="border-y border-white/10 px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-accent/15 blur-3xl opacity-40" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
              Transparent Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Flexible packages tailored to your budget and goals
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 sm:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                name: 'Starter',
                price: '$2,999',
                period: '/month',
                description: 'Perfect for small businesses just starting',
                features: [
                  'One social media channel',
                  'Basic SEO optimization',
                  '4 blog posts/month',
                  'Monthly reporting',
                ],
              },
              {
                name: 'Growth',
                price: '$7,999',
                period: '/month',
                description: 'Ideal for scaling businesses',
                features: [
                  'All social platforms',
                  'Paid ads management ($1K budget)',
                  'Advanced SEO strategy',
                  '8 blog posts/month',
                  'Bi-weekly calls',
                ],
                featured: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: 'pricing',
                description: 'For ambitious brands',
                features: [
                  'Full-service marketing',
                  'Dedicated account team',
                  'Custom strategy & reporting',
                  'Brand development',
                  'Web development included',
                ],
              },
            ].map((plan) => (
              <motion.div key={plan.name} variants={staggerChild}>
                <div
                  className={`${plan.featured ? 'glass lg:scale-105 shadow-2xl shadow-primary/30' : 'glass'} rounded-2xl p-8 flex flex-col transition-all duration-500 hover:shadow-2xl h-full`}
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">/{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full font-semibold border-0 ${
                      plan.featured
                        ? 'bg-gradient-to-r from-destructive to-accent text-white glow-cta'
                        : 'glass hover:shadow-lg'
                    }`}
                  >
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Process
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              How we deliver results for our clients
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your goals and market' },
              { step: '02', title: 'Strategy', desc: 'Developing a comprehensive plan' },
              { step: '03', title: 'Execution', desc: 'Implementing and optimizing campaigns' },
              { step: '04', title: 'Growth', desc: 'Scaling what works, refining what doesn\'t' },
            ].map((item) => (
              <motion.div key={item.step} variants={staggerChild} className="text-center">
                <div className="mb-4 text-4xl font-bold text-primary/30">{item.step}</div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-destructive/10 blur-3xl opacity-30" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Schedule a free consultation to discuss which services are right for your business.
          </p>
          <Button asChild size="lg" className="mt-8 bg-gradient-to-r from-destructive to-accent text-white border-0 font-semibold glow-cta">
            <Link href="/contact">Schedule Consultation</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 px-4 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Digital Marketing Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
