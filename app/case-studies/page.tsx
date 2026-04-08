import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { CaseStudyCard } from '@/components/case-study-card'

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: 'E-commerce Brand Scaling',
      company: 'FashionHub',
      category: 'E-commerce',
      result: 'Increased revenue by 450% through strategic SEO and paid ads optimization in 12 months.',
      slug: 'fashionhub',
      challenge: 'FashionHub was struggling to compete in a crowded e-commerce space with low organic visibility and high ad spend inefficiency.',
      solution: 'We implemented a comprehensive SEO strategy targeting high-intent keywords and optimized their Google Shopping campaigns.',
      metrics: [
        { label: 'Revenue Growth', value: '450%' },
        { label: 'Monthly Traffic', value: '+320%' },
        { label: 'Conversion Rate', value: '5.2%' },
      ],
    },
    {
      title: 'SaaS Customer Acquisition',
      company: 'CloudTools',
      category: 'SaaS',
      result: 'Reduced CAC by 35% and increased conversion rate to 8.2% with targeted demand generation.',
      slug: 'cloudtools',
      challenge: 'CloudTools faced high customer acquisition costs and struggled with lead quality, making unit economics unsustainable.',
      solution: 'We built a demand generation machine using account-based marketing, content strategy, and optimized paid campaigns.',
      metrics: [
        { label: 'CAC Reduction', value: '35%' },
        { label: 'Conversion Rate', value: '8.2%' },
        { label: 'ARR Growth', value: '$2.1M' },
      ],
    },
    {
      title: 'Local Service Growth',
      company: 'HomeServices Pro',
      category: 'Local Services',
      result: 'Generated 500+ qualified leads and 80 new customers using geo-targeted campaigns.',
      slug: 'homeservices',
      challenge: 'HomeServices Pro wanted to expand into new markets but lacked a scalable customer acquisition strategy.',
      solution: 'We developed a multi-channel local strategy combining Google Local Services Ads, local SEO, and geo-targeted social ads.',
      metrics: [
        { label: 'Leads Generated', value: '500+' },
        { label: 'New Customers', value: '80' },
        { label: 'Cost per Lead', value: '$45' },
      ],
    },
    {
      title: 'B2B Lead Generation',
      company: 'TechSolutions Inc',
      category: 'B2B',
      result: 'Generated 150+ qualified B2B leads with 28% close rate, totaling $4.2M pipeline.',
      slug: 'techsolutions',
      challenge: 'TechSolutions needed a consistent lead flow from their target market of enterprise customers.',
      solution: 'We built a LinkedIn and content marketing strategy targeting C-suite decision makers with thought leadership.',
      metrics: [
        { label: 'Qualified Leads', value: '150+' },
        { label: 'Close Rate', value: '28%' },
        { label: 'Pipeline Value', value: '$4.2M' },
      ],
    },
    {
      title: 'Agency Rebranding',
      company: 'Creative Studio',
      category: 'Branding',
      result: 'Complete brand overhaul increasing brand perception value by 45% and lead quality by 60%.',
      slug: 'creativestudio',
      challenge: 'Creative Studio\'s brand felt outdated and wasn\'t attracting their ideal high-value clients.',
      solution: 'We delivered comprehensive rebranding including strategy, visual identity, messaging, and website redesign.',
      metrics: [
        { label: 'Brand Value Increase', value: '45%' },
        { label: 'Lead Quality Improvement', value: '60%' },
        { label: 'Average Project Value', value: '+$15K' },
      ],
    },
    {
      title: 'Startup Growth from $0 to $10M ARR',
      company: 'WorkFlow App',
      category: 'Startup',
      result: 'Built marketing engine that helped scale from $0 to $10M ARR in 24 months.',
      slug: 'workflowapp',
      challenge: 'WorkFlow App was a bootstrapped startup competing against well-funded competitors with large marketing budgets.',
      solution: 'We created a scrappy growth playbook using organic channels, partnerships, and viral mechanics.',
      metrics: [
        { label: 'ARR Achieved', value: '$10M' },
        { label: 'Users Acquired', value: '50K+' },
        { label: 'Growth Rate', value: '420%' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="border-b border-border px-4 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Case Studies
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Real results from real clients. See how we&apos;ve helped businesses across industries achieve extraordinary growth.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <CaseStudyCard
                key={study.slug}
                title={study.title}
                company={study.company}
                category={study.category}
                result={study.result}
                href={`/case-studies/${study.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study Detail */}
      <section className="border-y border-border bg-card/30 px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Featured Deep Dive</h2>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
                <TrendingUp className="h-4 w-4" />
                E-commerce Success
              </div>
              <h3 className="mb-4 text-3xl font-bold text-foreground">
                How FashionHub Scaled Revenue by 450%
              </h3>
              <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
                FashionHub was a growing e-commerce brand but faced two critical challenges: their organic visibility was poor, and their paid advertising costs were consuming 40% of revenue.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="font-bold text-foreground mb-2">The Challenge</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Competing in a crowded fashion e-commerce space with limited budget and visibility. They were losing market share to better-optimized competitors.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-foreground mb-2">Our Strategy</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Comprehensive SEO audit and optimization, Google Shopping campaign restructuring, content strategy targeting long-tail keywords, and conversion rate optimization.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-foreground mb-2">The Results</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>450% revenue increase over 12 months</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>320% increase in monthly organic traffic</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Reduced CAC by 42% through optimized ads</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Improved conversion rate from 1.8% to 5.2%</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">
                  Get Your Success Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 aspect-square flex flex-col items-center justify-center p-8">
              <div className="space-y-8 w-full">
                <div className="rounded-lg bg-card/80 backdrop-blur p-6 text-center">
                  <p className="text-4xl font-bold text-primary">450%</p>
                  <p className="text-sm text-muted-foreground mt-2">Revenue Growth</p>
                </div>
                <div className="rounded-lg bg-card/80 backdrop-blur p-6 text-center">
                  <p className="text-4xl font-bold text-primary">5.2%</p>
                  <p className="text-sm text-muted-foreground mt-2">Conversion Rate</p>
                </div>
                <div className="rounded-lg bg-card/80 backdrop-blur p-6 text-center">
                  <p className="text-4xl font-bold text-primary">12mo</p>
                  <p className="text-sm text-muted-foreground mt-2">Timeline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">
            Aggregate Client Results
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { value: '$2.5B+', label: 'Total Revenue Generated for Clients' },
              { value: '1M+', label: 'New Customers Acquired' },
              { value: '340%', label: 'Average Revenue Growth' },
              { value: '98%', label: 'Client Retention Rate' },
              { value: '150+', label: 'Successful Projects' },
              { value: '12+', label: 'Years of Excellence' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-card p-8 text-center">
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
            Ready to Write Your Success Story?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Let&apos;s discuss your goals and create a winning strategy to achieve extraordinary results.
          </p>
          <Button asChild size="lg" className="mt-8 bg-gradient-to-r from-destructive to-accent text-white border-0 font-semibold glow-cta hover:shadow-lg hover:shadow-destructive/50">
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
