-- ==============================================================================
-- Omar & Partners (ONP) - Migration: Create Jobs / Careers Table
-- Run this script in your Supabase Project -> SQL Editor
-- ==============================================================================

-- 1. Create Jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  division TEXT NOT NULL,
  company_name TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL DEFAULT 'Full-Time', -- e.g. 'Full-Time', 'Part-Time', 'Contract', 'Remote'
  experience TEXT, -- e.g. '5+ Years'
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  application_email TEXT NOT NULL DEFAULT 'info@onp-bd.com',
  published BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_published ON public.jobs(published);
CREATE INDEX IF NOT EXISTS idx_jobs_display_order ON public.jobs(display_order);
CREATE INDEX IF NOT EXISTS idx_jobs_company_name ON public.jobs(company_name);

-- 3. Automatic updated_at trigger
DROP TRIGGER IF EXISTS trg_jobs_updated_at ON public.jobs;
CREATE TRIGGER trg_jobs_updated_at 
  BEFORE UPDATE ON public.jobs 
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
DROP POLICY IF EXISTS "Public read published jobs" ON public.jobs;
CREATE POLICY "Public read published jobs" ON public.jobs 
  FOR SELECT 
  USING (published = true OR public.current_profile_role() IN ('admin', 'moderator'));

DROP POLICY IF EXISTS "Staff manage jobs" ON public.jobs;
CREATE POLICY "Staff manage jobs" ON public.jobs 
  FOR ALL 
  USING (public.current_profile_role() IN ('admin', 'moderator'));
