-- Migration: 004_seed_services_data.sql
-- Description: Insert sample marketing services data
-- Created: 2026-04-08

INSERT INTO public.services (name, slug, description, category, price, duration, rating, popularity, features, benefits)
VALUES
  (
    'Social Media Marketing',
    'social-media-marketing',
    'Build engaged communities across all platforms',
    'social-media',
    2999,
    '1 month',
    4.8,
    95,
    '["Content calendar management", "Daily posting and engagement", "Community moderation", "Monthly analytics reports", "Influencer outreach", "24/7 customer support"]'::jsonb,
    '["Increased brand awareness", "Higher engagement rates", "Community growth", "Authentic customer conversations"]'::jsonb
  ),
  (
    'Paid Advertising',
    'paid-advertising',
    'Data-driven campaigns for maximum ROI',
    'advertising',
    4999,
    '1 month',
    4.9,
    98,
    '["Campaign strategy and planning", "Ad creative development", "Audience targeting", "Budget optimization", "Performance tracking", "Monthly optimization"]'::jsonb,
    '["Qualified leads", "Higher conversion rates", "Better ROI", "Scalable growth"]'::jsonb
  ),
  (
    'SEO Optimization',
    'seo-optimization',
    'Improve search rankings and organic traffic',
    'seo',
    3499,
    '1 month',
    4.7,
    92,
    '["Keyword research and analysis", "On-page optimization", "Technical SEO", "Link building", "Local SEO", "Monthly reports"]'::jsonb,
    '["Higher search rankings", "Increased organic traffic", "Long-term visibility", "Cost-effective growth"]'::jsonb
  ),
  (
    'Web Development',
    'web-development',
    'Custom websites optimized for conversions',
    'development',
    5999,
    '2-3 months',
    4.9,
    88,
    '["Custom design", "Responsive development", "Performance optimization", "SEO-ready", "Security features", "Mobile app integration"]'::jsonb,
    '["Professional online presence", "Better user experience", "Higher conversion rates", "Mobile accessibility"]'::jsonb
  ),
  (
    'Brand Strategy',
    'brand-strategy',
    'Strategic branding that sets you apart',
    'branding',
    3999,
    '4 weeks',
    4.8,
    85,
    '["Brand positioning", "Logo design", "Brand guidelines", "Messaging framework", "Visual identity", "Brand audit"]'::jsonb,
    '["Stronger brand identity", "Better market positioning", "Consistent messaging", "Premium perception"]'::jsonb
  ),
  (
    'Analytics & Reporting',
    'analytics-reporting',
    'Real-time dashboards and actionable insights',
    'analytics',
    1999,
    '1 month',
    4.6,
    78,
    '["Real-time dashboards", "Custom reports", "KPI tracking", "Competitor analysis", "Insights and recommendations", "Data visualization"]'::jsonb,
    '["Data-driven decisions", "Better performance tracking", "Competitive advantage", "Measurable results"]'::jsonb
  )
ON CONFLICT (name) DO NOTHING;
