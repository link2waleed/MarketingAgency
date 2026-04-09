import {
  SERVICES_DATA,
  PROJECTS_DATA,
  FAQ_DATA,
  PRICING_PLANS,
  COMMON_RESPONSES,
  SERVICE_RECOMMENDATIONS,
  TRENDING_SERVICES,
} from './chatbot-data'

export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'service' | 'project' | 'faq' | 'services-list' | 'faqs-list' | 'pricing'
  data?: any
}

export interface ChatBotResponse {
  text: string
  type: 'text' | 'service' | 'project' | 'faq' | 'services-list' | 'faqs-list' | 'pricing'
  data?: any
}

export class ChatBotService {
  private conversationHistory: ChatMessage[] = []

  // Normalize text for matching
  private normalize(text: string): string {
    return text.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '')
  }

  // Check if user is asking about services
  private detectServiceQuery(text: string): string[] {
    const normalized = this.normalize(text)
    const keywords = ['service', 'price', 'cost', 'how much', 'fee', 'package', 'offer']
    
    if (keywords.some(k => normalized.includes(k))) {
      return SERVICES_DATA.map(s => s.id)
    }

    // Search for specific service names
    for (const service of SERVICES_DATA) {
      if (normalized.includes(this.normalize(service.name)) ||
          normalized.includes(this.normalize(service.category))) {
        return [service.id]
      }
    }

    return []
  }

  // Check if user is asking about projects/orders
  private detectProjectQuery(text: string): string[] {
    const normalized = this.normalize(text)
    const keywords = ['project', 'order', 'status', 'where', 'tracking', 'progress', 'campaign']
    
    if (keywords.some(k => normalized.includes(k))) {
      return PROJECTS_DATA.map(p => p.id)
    }

    return []
  }

  // Find matching FAQ
  private findMatchingFAQ(text: string): any | null {
    const normalized = this.normalize(text)
    
    for (const faq of FAQ_DATA) {
      if (faq.keywords.some(keyword => normalized.includes(this.normalize(keyword)))) {
        return faq
      }
    }

    return null
  }

  // Get service recommendations
  private getRecommendations(serviceId: string): any[] {
    const recommendedIds = SERVICE_RECOMMENDATIONS[serviceId] || []
    return recommendedIds
      .map(id => SERVICES_DATA.find(s => s.id === id))
      .filter(Boolean)
      .slice(0, 2)
  }

  // Get trending services
  getTrendingServices(): any[] {
    return TRENDING_SERVICES
      .map(t => SERVICES_DATA.find(s => s.id === t.id))
      .filter(Boolean)
  }

  // Main response generator
  generateResponse(userMessage: string): ChatBotResponse {
    const normalized = this.normalize(userMessage)

    // Check for greeting
    if (['hi', 'hello', 'hey', 'start'].some(g => normalized.includes(g))) {
      return {
        text: COMMON_RESPONSES.greeting,
        type: 'text',
      }
    }

    // Check for contact info
    if (['contact', 'email', 'phone', 'call', 'reach', 'support'].some(k => normalized.includes(k))) {
      return {
        text: COMMON_RESPONSES.contact,
        type: 'text',
      }
    }

    // Check for shipping info
    if (['shipping', 'ship', 'delivery', 'deliver', 'mail', 'send', 'expedite'].some(k => normalized.includes(k))) {
      const shippingFAQs = FAQ_DATA.filter(faq => faq.category === 'shipping')
      return {
        text: 'Here is our shipping information:',
        type: 'faqs-list',
        data: shippingFAQs,
      }
    }

    // Check if user is asking for FAQs list
    if (['faq', 'faqs', 'questions', 'help', 'question'].some(k => normalized.includes(k))) {
      return {
        text: 'Here are our frequently asked questions:',
        type: 'faqs-list',
        data: FAQ_DATA,
      }
    }

    // Check for project/order tracking
    const projectIds = this.detectProjectQuery(userMessage)
    if (projectIds.length > 0) {
      const projects = PROJECTS_DATA.filter(p => projectIds.includes(p.id))
      if (projects.length > 0) {
        return {
          text: 'Here are your active projects:',
          type: 'project',
          data: projects,
        }
      }
    }

    // Check for FAQ
    const faq = this.findMatchingFAQ(userMessage)
    if (faq) {
      return {
        text: faq.answer,
        type: 'faq',
        data: faq,
      }
    }

    // Check for service queries
    const serviceIds = this.detectServiceQuery(userMessage)
    if (serviceIds.length > 0) {
      const services = SERVICES_DATA.filter(s => serviceIds.includes(s.id))
      
      if (services.length === 1) {
        const service = services[0]
        const recommendations = this.getRecommendations(service.id)
        
        return {
          text: `Here are the details for ${service.name}:`,
          type: 'service',
          data: { service, recommendations },
        }
      } else if (services.length > 1) {
        return {
          text: 'Here are our relevant services:',
          type: 'services-list',
          data: services,
        }
      }
    }

    // Check for pricing
    if (['price', 'cost', 'how much', 'fee', 'expensive', 'affordable', 'plan', 'package'].some(k => normalized.includes(k))) {
      return {
        text: 'Here are our flexible pricing plans:',
        type: 'pricing',
        data: PRICING_PLANS,
      }
    }

    // Default response
    return {
      text: COMMON_RESPONSES.not_found,
      type: 'text',
    }
  }

  // Add message to history
  addMessage(message: ChatMessage): void {
    this.conversationHistory.push(message)
  }

  // Get conversation history
  getHistory(): ChatMessage[] {
    return this.conversationHistory
  }

  // Clear history
  clearHistory(): void {
    this.conversationHistory = []
  }
}

// Export singleton instance
export const chatBotService = new ChatBotService()
