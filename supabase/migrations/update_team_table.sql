-- ==============================================================================
-- Omar & Partners (ONP) - Migration: Update Team Table
-- Run this in your Supabase Project -> SQL Editor
-- ==============================================================================

-- 1. Drop the image, bio, and display_order columns from the team table
ALTER TABLE public.team 
  DROP COLUMN IF EXISTS image,
  DROP COLUMN IF EXISTS bio,
  DROP COLUMN IF EXISTS display_order;

-- 2. Backfill any team members that have NULL company_id to an active company
UPDATE public.team 
SET company_id = (SELECT id FROM public.companies WHERE slug = 'kolpoporisor' LIMIT 1)
WHERE company_id IS NULL;

-- 3. Enforce NOT NULL on company_id so every member is assigned to a practice
ALTER TABLE public.team 
  ALTER COLUMN company_id SET NOT NULL;
