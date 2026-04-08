'use client'

import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { useData } from '@/contexts/data-context'
import { ArrowLeft, Check, Star } from 'lucide-react'
import { containerVariants, staggerChild } from '@/lib/animations'

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { services } = useData()
  const [quantity, setQuantity] = useState(1)
  const { id } = React.use(params)
  const foundService = services.find(s => s.id === id)
  
  // Provide fallback values for service properties
  const service = foundService ? {
    ...foundService,
    features: foundService.features || [],
    benefits: foundService.benefits || [],
    description: foundService.description || 'Premium service for your business',
    price: foundService.price || 0,
  } : null

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center mt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Service Not Found</h1>
            <Button asChild>
              <Link href="/services">Back to Services</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleCheckout = () => {
    const checkoutData = {
      serviceId: service.id,
      serviceName: service.title,
      price: service.price,
      quantity,
      total: service.price * quantity,
    }
    localStorage.setItem('checkout_data', JSON.stringify(checkoutData))
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <section className="border-b border-white/10 px-4 py-4">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="border-b border-white/10 px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl opacity-30" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-5xl mb-6">{service.icon}</div>
            <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              {service.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing & Details Section */}
      <section className="px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Pricing Card */}
            <motion.div
              className="glass rounded-2xl border border-white/10 p-8 bg-white/5 backdrop-blur-xl sticky top-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${(service.price / 100).toFixed(0)}
                  </span>
                  <span className="text-muted-foreground">/{service.billingPeriod}</span>
                </div>
                <p className="text-sm text-muted-foreground">Perfect for businesses ready to scale</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <label className="block text-sm font-semibold text-foreground mb-3">Months/Year</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-lg border border-white/20 hover:bg-white/10 transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-foreground min-w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-lg border border-white/20 hover:bg-white/10 transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">${((service.price * quantity) / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
                  <span className="text-muted-foreground">Tax (estimated)</span>
                  <span className="font-semibold text-foreground">${((service.price * quantity * 0.1) / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${((service.price * quantity * 1.1) / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-destructive to-accent text-white border-0 font-semibold glow-cta hover:shadow-lg hover:shadow-destructive/50 py-6 text-lg"
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Cancel anytime. No long-term contract required.
              </p>
            </motion.div>

            {/* Features & Benefits */}
            <motion.div
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* Features */}
              <motion.div variants={staggerChild}>
                <h3 className="text-2xl font-bold text-foreground mb-6">What's Included</h3>
                <div className="space-y-4">
                  {(service?.features || []).map((feature) => (
                    <div key={feature} className="flex gap-3 items-start">
                      <div className="flex h-6 w-6 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div variants={staggerChild}>
                <h3 className="text-2xl font-bold text-foreground mb-6">Key Benefits</h3>
                <div className="space-y-4">
                  {(service?.benefits || []).map((benefit) => (
                    <div key={benefit} className="flex gap-3 items-start p-4 glass rounded-lg border border-white/10 bg-white/5">
                      <Star className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Support */}
              <motion.div variants={staggerChild} className="glass rounded-xl p-6 border border-white/10 bg-white/5">
                <h4 className="font-semibold text-foreground mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is available 24/7 to help you make the best choice.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-white/10 px-4 py-20 lg:py-28 relative overflow-hidden">
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
                q: 'Can I change my service plan?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the beginning of your next billing cycle.',
              },
              {
                q: 'Is there a setup fee?',
                a: 'No hidden fees. The price you see is what you pay. We may require a one-time onboarding fee of $500 for initial strategy and setup.',
              },
              {
                q: "What if I'm not satisfied?",
                a: "We offer a 30-day money-back guarantee if you're not completely satisfied with our service.",
              },
              {
                q: 'Do you require a long-term contract?',
                a: 'No, all our services are month-to-month with no long-term commitment. Cancel anytime.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={staggerChild}
                className="glass rounded-xl p-6 border border-white/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:bg-white/10"
              >
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

      {/* CTA Footer */}
      <section className="border-t border-white/10 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Join 150+ brands transforming their digital presence with our {service.title} service.
          </p>
          <Button
            onClick={handleCheckout}
            className="bg-gradient-to-r from-destructive to-accent text-white border-0 font-semibold glow-cta hover:shadow-lg hover:shadow-destructive/50 px-8 py-6 text-lg"
          >
            Start Free Consultation
          </Button>
        </div>
      </section>
    </div>
  )
}
