'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || 'ORD-000000000'

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="px-4 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/40 to-accent/30 rounded-full flex items-center justify-center mb-6 glow">
              <Check className="w-12 h-12 text-primary" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold text-foreground mb-4">Payment Successful!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your purchase. Your service is now active.
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 border border-white/10 bg-white/5 mb-8 text-left"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono font-semibold text-primary">{orderId}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-muted-foreground">Status</span>
                <span className="flex items-center gap-2 text-primary">
                  <Check className="h-4 w-4" />
                  Confirmed
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">What's Next?</span>
              </div>
              <p className="text-sm text-muted-foreground">
                We'll send a confirmation email shortly. Our team will be in touch to onboard you and get started on your service.
              </p>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid gap-6 sm:grid-cols-3 mb-12"
          >
            {[
              { number: '1', title: 'Confirmation', desc: 'Check your email' },
              { number: '2', title: 'Onboarding', desc: 'We\'ll call you' },
              { number: '3', title: 'Launch', desc: 'Service starts' },
            ].map((step, idx) => (
              <div
                key={idx}
                className="glass rounded-xl p-6 border border-white/10 bg-white/5"
              >
                <div className="text-3xl font-bold text-primary mb-3">{step.number}</div>
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild className="bg-gradient-to-r from-primary to-primary/70 text-white border-0 font-semibold">
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20">
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 text-left"
          >
            <h3 className="font-semibold text-foreground mb-6 text-center">Questions?</h3>
            <div className="space-y-4">
              {[
                { q: 'When will I be contacted?', a: 'Within 24 hours of your purchase.' },
                { q: 'What if I need to cancel?', a: 'You can cancel anytime with no penalties.' },
                { q: 'Is there a refund policy?', a: 'Yes, 30-day money-back guarantee available.' },
              ].map((item, idx) => (
                <div key={idx} className="glass rounded-lg p-4 border border-white/10 bg-white/5">
                  <h4 className="font-semibold text-foreground mb-1">{item.q}</h4>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
