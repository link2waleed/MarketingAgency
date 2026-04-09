-- Migration: 003_create_services_table.sql
-- Description: Create services table for marketing services catalog
-- Created: 2026-04-08

CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic info
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL,
  
  -- Pricing and Details
  price DECIMAL(10, 2) NOT NULL,
  duration TEXT,
  
  -- Ratings and Popularity
  rating DECIMAL(3, 2) DEFAULT 5.0,
  popularity INTEGER DEFAULT 0,
  
  -- Features and Benefits
  features JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  
  -- Display
  icon TEXT,
  image_url TEXT,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_rating ON public.services(rating);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Everyone can view active services
CREATE POLICY "Everyone can view active services"
  ON public.services
  FOR SELECT
  USING (is_active = TRUE);

-- Only service_role can insert/update/delete services
CREATE POLICY "Service role can manage services"
  ON public.services
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_services_updated_at ON public.services;
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
