-- ==============================================================================
-- Omar & Partners (ONP) - Migration: Add is_shared column to Projects
-- Run this script in your Supabase Project -> SQL Editor
-- Enables uploading a project once and displaying it on both Kolpoporishor & Kolpokowsol
-- ==============================================================================

-- 1. Add is_shared column if it doesn't already exist
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS is_shared BOOLEAN NOT NULL DEFAULT false;

-- 2. Create index for fast filtering of shared projects
CREATE INDEX IF NOT EXISTS idx_projects_is_shared ON public.projects(is_shared);

-- 3. Documentation comment
COMMENT ON COLUMN public.projects.is_shared IS 'When true, project appears in both Kolpoporishor and Kolpokowsol portfolios';
