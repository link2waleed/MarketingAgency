'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Check, Lock } from 'lucide-react'
import { containerVariants, staggerChild } from '@/lib/animations'

interface CheckoutData {
  serviceId: string
  serviceName: string
  price: number
  quantity: number
  total: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    company: '',
    phone: '',
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  })

  useEffect(() => {
    const data = localStorage.getItem('checkout_data')
    if (data) {
      setCheckoutData(JSON.parse(data))
    } else {
      router.push('/services')
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Show success message
    const orderId = `ORD-${Date.now()}`
    localStorage.removeItem('checkout_data')
    
    // Redirect to success page
    router.push(`/checkout/success?orderId=${orderId}`)
  }

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center mt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Loading...</h1>
          </div>
        </div>
      </div>
    )
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
            Back
          </button>
        </div>
      </section>

      <section className="px-4 py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl opacity-20" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-foreground mb-4">Secure Checkout</h1>
            <p className="text-lg text-muted-foreground">Complete your purchase to get started</p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true, margin: '-100px' }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <motion.div variants={staggerChild} className="glass rounded-xl p-8 border border-white/10 bg-white/5 hover:bg-white/8 transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-accent/30 text-sm font-bold text-primary">1</span>
                    <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <Input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="sm:col-span-2 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <Input
                      type="text"
                      name="company"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="sm:col-span-2 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                </motion.div>

                {/* Billing Address */}
                <motion.div variants={staggerChild} className="glass rounded-xl p-8 border border-white/10 bg-white/5 hover:bg-white/8 transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-accent/30 text-sm font-bold text-primary">2</span>
                    <h2 className="text-2xl font-bold text-foreground">Billing Address</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      type="text"
                      name="billingAddress"
                      placeholder="Street address"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      required
                      className="sm:col-span-2 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <Input
                      type="text"
                      name="state"
                      placeholder="State/Province"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="Postal code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <Input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                </motion.div>

                {/* Payment Information */}
                <motion.div variants={staggerChild} className="glass rounded-xl p-8 border border-white/10 bg-white/5 hover:bg-white/8 transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/40 to-accent/30 text-sm font-bold text-primary">3</span>
                    <Lock className="h-5 w-5 text-accent" />
                    <h2 className="text-2xl font-bold text-foreground">Payment Method</h2>
                  </div>
                  <div className="grid gap-4">
                    <Input
                      type="text"
                      name="cardholderName"
                      placeholder="Cardholder name"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <Input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      maxLength={19}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        maxLength={5}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                      <Input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        maxLength={4}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={staggerChild} className="glass rounded-xl p-8 border border-white/10 bg-white/5">
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white border-0 font-semibold py-6 text-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : `Pay $${((checkoutData.total * 1.1) / 100).toFixed(2)}`}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    <Lock className="h-3 w-3 inline mr-1" />
                    Your payment information is secure and encrypted. We use industry-standard SSL encryption.
                  </p>
                </motion.div>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="glass rounded-xl p-8 border border-white/10 bg-gradient-to-br from-white/5 to-white/0 sticky top-24 h-fit hover:from-white/8 transition-all duration-300">
                <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  Order Summary
                </h3>

                <div className="space-y-4 pb-6 border-b border-white/10 mb-6">
                  <div className="glass rounded-lg p-4 border border-white/5 bg-white/5">
                    <h4 className="font-bold text-foreground text-lg">{checkoutData.serviceName}</h4>
                    <p className="text-sm text-muted-foreground/80 mt-2">Professional monthly service for your business</p>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-semibold text-foreground bg-gradient-to-r from-primary/20 to-accent/20 px-3 py-1 rounded-lg">{checkoutData.quantity}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Price per unit</span>
                    <span className="font-semibold text-foreground">${(checkoutData.price / 100).toFixed(0)}/month</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">${(checkoutData.total / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="text-foreground font-medium">${((checkoutData.total * 0.1) / 100).toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      ${((checkoutData.total * 1.1) / 100).toFixed(2)}
                    </span>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    {[
                      { icon: '✓', text: 'Instant activation' },
                      { icon: '✓', text: '24/7 customer support' },
                      { icon: '✓', text: 'Money-back guarantee' },
                      { icon: '✓', text: 'Cancel anytime' },
                    ].map((benefit) => (
                      <div key={benefit.text} className="flex gap-3 items-center text-sm">
                        <span className="text-accent font-bold">{benefit.icon}</span>
                        <span className="text-muted-foreground/90">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="glass rounded-lg p-4 border border-white/5 bg-white/5 space-y-2 text-xs text-center text-muted-foreground/70">
                  <p>🔒 Secure Payment</p>
                  <p>✓ SSL Encrypted</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
