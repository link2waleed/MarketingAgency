// Dummy data for chatbot - Marketing Agency Focus

export interface Service {
  id: string
  name: string
  category: string
  description: string
  price: number
  duration: string
  rating: number
  popularity: number
}

export interface Project {
  id: string
  name: string
  clientName: string
  service: string
  status: 'planning' | 'in-progress' | 'completed'
  startDate: string
  endDate: string
  progress: number
}

export interface FAQ {
  question: string
  answer: string
  category: string
  keywords: string[]
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  billingPeriod: 'month' | 'year'
  features: string[]
  description: string
  popular?: boolean
}

export const SERVICES_DATA: Service[] = [
  {
    id: '1',
    name: 'Social Media Marketing',
    category: 'social-media',
    description: 'Build engaged communities across all platforms',
    price: 2999,
    duration: '1 month',
    rating: 4.8,
    popularity: 95,
  },
  {
    id: '2',
    name: 'Paid Advertising',
    category: 'advertising',
    description: 'Data-driven campaigns for maximum ROI',
    price: 4999,
    duration: '1 month',
    rating: 4.9,
    popularity: 98,
  },
  {
    id: '3',
    name: 'SEO Optimization',
    category: 'seo',
    description: 'Improve search rankings and organic traffic',
    price: 3499,
    duration: '1 month',
    rating: 4.7,
    popularity: 92,
  },
  {
    id: '4',
    name: 'Web Development',
    category: 'development',
    description: 'Custom websites optimized for conversions',
    price: 5999,
    duration: '2-3 months',
    rating: 4.9,
    popularity: 88,
  },
  {
    id: '5',
    name: 'Brand Strategy',
    category: 'branding',
    description: 'Strategic branding that sets you apart',
    price: 3999,
    duration: '4 weeks',
    rating: 4.8,
    popularity: 85,
  },
  {
    id: '6',
    name: 'Analytics & Reporting',
    category: 'analytics',
    description: 'Real-time dashboards and actionable insights',
    price: 1999,
    duration: '1 month',
    rating: 4.6,
    popularity: 78,
  },
]

export const PROJECTS_DATA: Project[] = [
  {
    id: 'PRJ-001',
    name: 'Q1 Social Media Campaign',
    clientName: 'You',
    service: 'Social Media Marketing',
    status: 'in-progress',
    startDate: '2026-03-01',
    endDate: '2026-04-01',
    progress: 65,
  },
  {
    id: 'PRJ-002',
    name: 'Website Redesign',
    clientName: 'You',
    service: 'Web Development',
    status: 'planning',
    startDate: '2026-04-15',
    endDate: '2026-06-15',
    progress: 10,
  },
  {
    id: 'PRJ-003',
    name: 'Brand Identity Refresh',
    clientName: 'You',
    service: 'Brand Strategy',
    status: 'in-progress',
    startDate: '2026-02-15',
    endDate: '2026-03-15',
    progress: 85,
  },
]

export const FAQ_DATA: FAQ[] = [
  {
    question: 'What is included in the Social Media Marketing service?',
    answer: 'Our Social Media Marketing service includes content calendar management, daily posting and engagement, community moderation, monthly analytics reports, influencer outreach, and 24/7 customer support.',
    category: 'services',
    keywords: ['social', 'media', 'included', 'what'],
  },
  {
    question: 'How long does it take to see results?',
    answer: 'Most clients see measurable improvements within 30-60 days. Full campaign optimization typically takes 3-6 months to demonstrate maximum ROI. Results vary by service and goals.',
    category: 'general',
    keywords: ['results', 'timeline', 'how long', 'when'],
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 30-day money-back guarantee if you are not completely satisfied with our service. No questions asked. We stand behind our work.',
    category: 'billing',
    keywords: ['refund', 'money back', 'guarantee', 'policy'],
  },
  {
    question: 'Do you require a long-term contract?',
    answer: 'No! All our services are month-to-month with no long-term commitment. You can cancel anytime without penalties. We prefer quality over contracts.',
    category: 'billing',
    keywords: ['contract', 'long-term', 'commitment', 'cancel'],
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), bank transfers, and digital payment methods. Invoices are available instantly upon purchase.',
    category: 'billing',
    keywords: ['payment', 'accept', 'card', 'methods'],
  },
  {
    question: 'How do you measure campaign success?',
    answer: 'We establish clear KPIs at the beginning of every engagement and provide transparent monthly reporting. Success is defined by your business goals, whether that is revenue, leads, or website traffic.',
    category: 'general',
    keywords: ['measure', 'success', 'metrics', 'kpi'],
  },
  {
    question: 'What is the typical onboarding process?',
    answer: 'After purchasing a service, we schedule a 30-minute strategy call. We then create a custom plan tailored to your business goals and get started within 48 hours.',
    category: 'services',
    keywords: ['onboarding', 'process', 'start', 'setup'],
  },
  {
    question: 'Can you help with custom requirements?',
    answer: 'Absolutely! While our packages cover standard services, we offer custom solutions for specific needs. Contact our sales team for a personalized quote.',
    category: 'services',
    keywords: ['custom', 'specific', 'requirements', 'special'],
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes! All our services include ongoing support. Your dedicated account manager is available 24/7 to answer questions and optimize your campaigns.',
    category: 'services',
    keywords: ['support', 'help', 'available', 'ongoing'],
  },
  {
    question: 'How do I track my project progress?',
    answer: 'You can track your project in real-time through your dashboard. We also provide detailed monthly reports with metrics, insights, and recommendations.',
    category: 'general',
    keywords: ['track', 'progress', 'dashboard', 'status'],
  },
  {
    question: 'How is my order shipped?',
    answer: 'Digital services and deliverables are sent via email and our client portal immediately upon project completion. Physical assets or reports are shipped via standard courier within 3-5 business days. International delivery typically takes 5-10 business days.',
    category: 'shipping',
    keywords: ['shipping', 'ship', 'delivery', 'deliver', 'mail', 'send'],
  },
  {
    question: 'What are the shipping costs?',
    answer: 'Digital deliverables have no shipping costs as they are delivered electronically. For physical materials, shipping is included in the service price for domestic orders. International shipping may have additional fees calculated at checkout.',
    category: 'shipping',
    keywords: ['shipping cost', 'shipping fee', 'shipping price', 'delivery cost'],
  },
  {
    question: 'Can I expedite my delivery?',
    answer: 'Yes! We offer expedited delivery options for an additional fee. Contact your account manager to arrange rush processing. We can typically expedite projects by 3-5 business days depending on the service complexity.',
    category: 'shipping',
    keywords: ['expedited', 'faster', 'rush', 'urgent', 'quick'],
  },
  {
    question: 'What does your platform do?',
    answer: 'Our platform is a comprehensive marketing agency offering six core services: Social Media Marketing, Paid Advertising, SEO Optimization, Web Development, Brand Strategy, and Analytics & Reporting. We specialize in helping businesses build engaged communities, drive qualified leads, improve search visibility, create conversion-optimized websites, develop strategic brands, and gain actionable insights. All services include dedicated account management, real-time dashboards, and proven ROI.',
    category: 'general',
    keywords: ['platform', 'do', 'what', 'service', 'offer', 'help', 'create', 'build', 'marketing'],
  },
]

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Package',
    price: 1999,
    billingPeriod: 'month',
    description: 'Perfect for small businesses just getting started',
    features: [
      'Basic social media management',
      'Monthly performance reports',
      'Email support',
      'Up to 4 social media platforms',
      'Basic content calendar',
      'Weekly strategy calls',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Package',
    price: 3999,
    billingPeriod: 'month',
    popular: true,
    description: 'Most popular for growing businesses',
    features: [
      'Advanced social media management',
      'Multi-channel advertising campaigns',
      'Biweekly strategy & optimization calls',
      'All 6 social media platforms',
      'Advanced analytics dashboard',
      'Content creation included',
      'Priority email & phone support',
      'Monthly strategy reviews',
      'A/B testing & optimization',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Package',
    price: 5999,
    billingPeriod: 'month',
    description: 'Complete solution for large organizations',
    features: [
      'Fully managed marketing strategy',
      'Dedicated account manager',
      'All services included (Social, Ads, SEO, Design)',
      'Weekly strategy & optimization sessions',
      'Real-time dashboard & reporting',
      'Unlimited revisions & changes',
      '24/7 premium support',
      'Custom integrations',
      'Quarterly business reviews',
      'Custom training for your team',
      'Marketing automation setup',
      'Competitive analysis & insights',
    ],
  },
]

export const TRENDING_SERVICES = [
  { id: '2', name: 'Paid Advertising', mentions: 156 },
  { id: '1', name: 'Social Media Marketing', mentions: 143 },
  { id: '3', name: 'SEO Optimization', mentions: 128 },
]

export const COMMON_RESPONSES: Record<string, string> = {
  greeting: 'Hello! 👋 Welcome to our marketing agency. I am here to help you with service information, project tracking, FAQs, and more. How can I assist you today?',
  not_found: 'I am not sure how to help with that. You can ask me about our services, your projects, shipping information, or any other questions. What would you like to know?',
  pricing: 'Our services range from $1,999 to $5,999 per month. Would you like to know more about a specific service or see pricing details?',
  contact: 'You can contact our team at hello@marketingagency.com or through our contact page. We typically respond within 2 hours during business hours.',
}

// Service recommendations based on service relationships
export const SERVICE_RECOMMENDATIONS: Record<string, string[]> = {
  '1': ['2', '3'], // Social Media → Paid Ads, SEO
  '2': ['1', '6'], // Paid Ads → Social Media, Analytics
  '3': ['4', '6'], // SEO → Web Dev, Analytics
  '4': ['1', '5'], // Web Dev → Social Media, Brand
  '5': ['1', '4'], // Brand → Social Media, Web Dev
  '6': ['2', '3'], // Analytics → Paid Ads, SEO
}
