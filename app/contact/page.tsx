'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { containerVariants, staggerChild } from '@/lib/animations'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setIsLoading(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="border-b border-white/10 px-4 py-16 sm:py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl opacity-30" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Let&apos;s Work Together
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Ready to transform your business? Schedule a free consultation with our strategy team or reach out with any questions.
          </p>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="px-4 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="grid gap-6 sm:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={staggerChild} className="glass rounded-lg p-6 text-center border border-white/5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-accent/30 text-primary mb-3 glow">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground text-sm">Phone</h3>
              <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm">
                +1 (234) 567-890
              </a>
            </motion.div>

            <motion.div variants={staggerChild} className="glass rounded-lg p-6 text-center border border-white/5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-accent/30 text-primary mb-3 glow">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground text-sm">Email</h3>
              <a href="mailto:hello@agency.com" className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm">
                hello@agency.com
              </a>
            </motion.div>

            <motion.div variants={staggerChild} className="glass rounded-lg p-6 text-center border border-white/5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-accent/30 text-primary mb-3 glow">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground text-sm">Address</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                123 Marketing Street<br />
                San Francisco, CA 94105
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
              Send us a Message
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 sm:p-10 border border-white/5">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Thank You!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      We&apos;ve received your inquiry and will get back to you within 24 hours.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      In the meantime, check out our{' '}
                      <Link href="/case-studies" className="text-primary hover:underline">
                        case studies
                      </Link>{' '}
                      to see what we can do for you.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                          Company Name
                        </label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                          Service Interest
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
                        >
                          <option value="">Select a service</option>
                          <option value="social-media">Social Media Marketing</option>
                          <option value="paid-ads">Paid Advertising</option>
                          <option value="seo">SEO & Content</option>
                          <option value="web-dev">Web Development</option>
                          <option value="branding">Brand Strategy</option>
                          <option value="analytics">Analytics & Reporting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                        Monthly Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
                      >
                        <option value="">Select budget range</option>
                        <option value="0-2k">$0 - $2,000</option>
                        <option value="2k-5k">$2,000 - $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k+">$25,000+</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Tell Us About Your Project
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full min-h-32"
                        placeholder="Share details about your business, goals, and what you're looking to achieve..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-destructive to-accent text-white border-0 font-semibold glow-cta disabled:opacity-50"
                    >
                      {isLoading ? 'Sending...' : 'Send Inquiry'}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      We respect your privacy. Your information will only be used to respond to your inquiry.
                    </p>
                  </div>
                )}
              </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-y border-white/10 px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl opacity-30" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                q: 'How long does it take to see results?',
                a: 'Results vary by service, but most clients see measurable improvements within 30-60 days. Full campaign optimization typically takes 3-6 months to demonstrate maximum ROI.',
              },
              {
                q: 'What is your minimum contract length?',
                a: 'We require a minimum 3-month engagement to properly strategize, implement, and measure results. Most clients continue for 12+ months due to ongoing improvements.',
              },
              {
                q: 'Do you work with small businesses?',
                a: 'Absolutely! We work with businesses of all sizes, from bootstrapped startups to enterprise companies. We have flexible packages to fit any budget.',
              },
              {
                q: 'How do you measure success?',
                a: 'We establish clear KPIs at the beginning of every engagement and provide transparent monthly reporting. Success is defined by your business goals, whether that\'s revenue, leads, or traffic.',
              },
              {
                q: 'Can you work with our existing team?',
                a: 'Yes! Many clients work with us as an extension of their internal team. We integrate seamlessly and can train your staff on our strategies and processes.',
              },
              {
                q: 'What industries do you specialize in?',
                a: 'We have experience across e-commerce, SaaS, B2B, local services, healthcare, finance, and more. Our strategies are customizable for any industry.',
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={staggerChild} className="glass rounded-xl p-6 border border-white/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:bg-white/10">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 min-w-fit items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-accent/30 text-sm font-semibold text-primary">?</span>
                  <div className="w-full">
                    <h3 className="mb-3 font-bold text-foreground text-lg">{item.q}</h3>
                    <p className="text-muted-foreground/90 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl opacity-20" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.h2
            className="text-3xl font-bold text-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Why Choose Us?
          </motion.h2>
          <motion.div
            className="grid gap-8 sm:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { number: '98%', label: 'Client Retention' },
              { number: '12+', label: 'Years of Excellence' },
              { number: '150+', label: 'Happy Clients' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={staggerChild} className="glass rounded-xl p-8 border border-white/5">
                <p className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">{stat.number}</p>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
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
