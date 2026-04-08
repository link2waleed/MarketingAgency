'use client'

import Link from 'next/link'
import { ArrowRight, Award, Users, TrendingUp, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { containerVariants, staggerChild } from '@/lib/animations'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="border-b border-white/10 px-4 py-16 sm:py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-30" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            About Our Agency
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground/90 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            We&apos;re a team of digital marketing experts dedicated to transforming brands and delivering measurable results.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl opacity-20" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            className="grid gap-12 lg:grid-cols-2 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground/80 leading-relaxed mb-4">
                Founded in 2012, we started with a simple mission: to help businesses grow through strategic digital marketing. What began as a small team of three has grown into a dynamic agency with 50+ team members across multiple disciplines.
              </p>
              <p className="text-lg text-muted-foreground/80 leading-relaxed mb-4">
                Over the years, we&apos;ve had the privilege of working with over 150 brands—from scrappy startups to established enterprises. Each project has taught us something new and sharpened our expertise in driving real, measurable results.
              </p>
              <p className="text-lg text-muted-foreground/80 leading-relaxed">
                Today, we&apos;re proud to be recognized as industry leaders, winning numerous awards and maintaining a 98% client retention rate. But our greatest achievement is the success of our clients.
              </p>
            </div>
            <div className="glass rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 aspect-square flex items-center justify-center border border-white/10 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <Heart className="h-32 w-32 text-primary/40" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-y border-white/10 bg-gradient-to-b from-white/5 to-white/0 px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl opacity-20" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground/80 leading-relaxed">
              The principles that guide everything we do
            </p>
          </div>

          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                icon: TrendingUp,
                title: 'Results-Driven',
                desc: 'Everything we do is tied to measurable outcomes and ROI for our clients.',
              },
              {
                icon: Users,
                title: 'Partnership',
                desc: 'We see ourselves as an extension of your team, invested in your success.',
              },
              {
                icon: Award,
                title: 'Excellence',
                desc: 'We continuously push boundaries and raise the bar on quality standards.',
              },
              {
                icon: Heart,
                title: 'Transparency',
                desc: 'Open communication and honest reporting are non-negotiable for us.',
              },
            ].map((value) => {
              const Icon = value.icon
              return (
                <motion.div key={value.title} variants={staggerChild} className="glass rounded-xl border border-white/5 bg-white/5 p-6 text-center hover:shadow-lg hover:shadow-primary/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-accent/30 mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 font-bold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{value.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl opacity-20" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
              Meet Our Leadership
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground/80 leading-relaxed">
              Experienced strategists and creators leading the charge
            </p>
          </div>

          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                name: 'Alex Johnson',
                role: 'Founder & CEO',
                bio: 'Digital marketing visionary with 15+ years in the industry. Former Head of Marketing at major tech company.',
              },
              {
                name: 'Sarah Chen',
                role: 'Chief Strategy Officer',
                bio: 'Award-winning strategist specializing in data-driven campaigns. MBA from Harvard Business School.',
              },
              {
                name: 'Michael Rodriguez',
                role: 'VP of Creative',
                bio: 'Multi-disciplinary designer and creative director. Led campaigns for Fortune 500 companies.',
              },
              {
                name: 'Jessica Williams',
                role: 'Head of Performance Marketing',
                bio: 'Paid advertising specialist with expertise in scaling DTC brands. $500M+ in ad spend managed.',
              },
              {
                name: 'David Park',
                role: 'SEO & Content Director',
                bio: 'Organic search expert driving 100M+ organic impressions. Published author on digital strategy.',
              },
              {
                name: 'Emma Thompson',
                role: 'Client Success Director',
                bio: 'Client satisfaction champion with 12+ years in account management. 99% client satisfaction rate.',
              },
            ].map((member) => (
              <motion.div key={member.name} variants={staggerChild} className="glass rounded-xl border border-white/5 bg-white/5 p-6 hover:shadow-lg hover:shadow-primary/10 hover:bg-white/10 transition-all duration-300">
                <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-primary/40 to-accent/30 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 font-bold text-foreground">{member.name}</h3>
                <p className="mb-3 text-sm font-medium text-primary">{member.role}</p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/10 bg-gradient-to-b from-white/5 to-white/0 px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-20" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { stat: '12+', label: 'Years in Business' },
              { stat: '150+', label: 'Happy Clients' },
              { stat: '50+', label: 'Team Members' },
              { stat: '98%', label: 'Client Retention' },
            ].map((item) => (
              <motion.div key={item.label} variants={staggerChild} className="glass rounded-xl border border-white/5 bg-white/5 p-8 hover:shadow-lg hover:shadow-primary/10 hover:bg-white/10 transition-all duration-300">
                <p className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{item.stat}</p>
                <p className="mt-2 text-muted-foreground font-medium">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-20" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Our Approach
          </motion.h2>

          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                num: '1',
                title: 'Discovery & Analysis',
                desc: 'We deep-dive into your business, industry, and competitors to understand your landscape and identify opportunities.',
              },
              {
                num: '2',
                title: 'Strategic Planning',
                desc: 'Based on insights, we craft a comprehensive strategy aligned with your goals, audience, and competitive advantages.',
              },
              {
                num: '3',
                title: 'Expert Execution',
                desc: 'Our multi-disciplinary team brings the strategy to life with creative excellence and technical precision.',
              },
              {
                num: '4',
                title: 'Continuous Optimization',
                desc: 'We continuously test, learn, and optimize to maximize results and ensure we\'re always improving.',
              },
            ].map((item) => (
              <motion.div key={item.num} variants={staggerChild} className="glass rounded-xl border border-white/5 bg-white/5 p-8 hover:shadow-lg hover:shadow-primary/10 hover:bg-white/10 transition-all duration-300 flex items-start gap-6">
                <div className="flex h-14 w-14 min-w-fit items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-accent/30">
                  <span className="font-bold text-primary text-xl">{item.num}</span>
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-foreground text-lg">{item.title}</h3>
                  <p className="text-muted-foreground/80 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 bg-gradient-to-b from-white/5 via-primary/5 to-white/0 px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl opacity-20" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            Ready to Work Together?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground/80 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Let&apos;s discuss how we can help transform your brand and drive growth.
          </p>
          <Button asChild size="lg" className="mt-8 bg-gradient-to-r from-destructive to-accent text-white border-0 font-semibold glow-cta animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 hover:shadow-lg">
            <Link href="/contact">Schedule Consultation</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-gradient-to-b from-white/5 to-black px-4 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Digital Marketing Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
