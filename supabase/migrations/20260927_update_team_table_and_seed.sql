-- ==============================================================================
-- Omar & Partners (ONP) - Migration: Update Team Table & Seed Extracted Roster
-- Run this in your Supabase Project -> SQL Editor
-- ==============================================================================

-- 1. Add study column if not exists
ALTER TABLE public.team 
  ADD COLUMN IF NOT EXISTS study TEXT;

-- 2. Drop the company foreign key constraint and company_id column
ALTER TABLE public.team 
  DROP CONSTRAINT IF EXISTS team_company_id_fkey;

ALTER TABLE public.team 
  DROP COLUMN IF EXISTS company_id;

-- 3. Clear existing placeholder/dummy records safely (preserves articles)
UPDATE public.articles SET author_id = NULL;
DELETE FROM public.team;

-- 4. Seed all 26 extracted team members from the official team roster
INSERT INTO public.team (name, designation, team_type, study) VALUES
  -- Team Lead
  ('Ar. Abdullah Al Omar MIAB', 'Principal Architect & CEO', 'Team Lead', 'B.Arch (SUST), PM (EDCP)-Japan, MSGED (UIU)'),
  ('Engr. Md. Mohiuddin Ovi MIEB', 'COO', 'Team Lead', 'B.Sc-Civil (CUET), PGD-PM (Edu Pro, UK)'),
  ('Ar. Avijit Saha MIAB', 'Head of Design Studio', 'Team Lead', 'B.Arch (KU)'),

  -- Structural Team
  ('Engr. Anurup Chowdhury FIEB', 'Structural Advisor', 'Structural Team', NULL),
  ('Engr. Anisul Islam MIEB', 'Structural Engineer', 'Structural Team', NULL),
  ('Engr. Shafiqul Islam MIEB', 'Structural Engineer', 'Structural Team', 'B.Sc-Civil (RUET)'),

  -- Electrical Team
  ('Mrs. Sabrina Alam', 'Electrical Advisor', 'Electrical Team', 'Associate Professor, EEE, CU (Faculty)'),
  ('Engr. Rashedul Alam MIEB', 'Electrical Engineer', 'Electrical Team', NULL),

  -- Accounts & Admin
  ('Mr. Md. Rafi Ullah Rahel', 'Deputy Manager', 'Accounts & Admin', NULL),

  -- Design Team
  ('Ar. Sayed Aziz MIAB', 'Project Team Lead', 'Design Team', 'B.Arch (SUST), M.Urban Design (HKU)'),
  ('Ar. Munira Yeasmin AMIAB', 'Asst. Architect', 'Design Team', 'B.Arch (KU)'),
  ('Ar. Faisal Hossen MIAB', 'Asst. Architect', 'Design Team', 'B.Arch (AIUB)'),
  ('Ar. Tasfia Islam', 'Jr. Architect', 'Design Team', 'B.Arch (SUST)'),
  ('Ar. Pranta Dey AMIAB', 'Jr. Architect', 'Design Team', 'B.Arch (CUET)'),
  ('Mr. Mahmudul Islam Mamun', 'Sr. Executive (3D Visualizer)', 'Design Team', '(BSPI)'),
  ('Ms. Sangita Barua', 'Executive (CAD Operator)', 'Design Team', '(CPI)'),

  -- Project Management & Site Supervision Team
  ('Engr. Abir Hossain', 'APM (Interior)', 'Project Management & Site Supervision Team', 'B.Sc-Civil (CIU)'),
  ('Engr. Belal Hosen', 'APM (Civil)', 'Project Management & Site Supervision Team', 'MIEB'),
  ('Engr. Md. Jahed Hossain', 'Asst. Engineer', 'Project Management & Site Supervision Team', 'Diploma in Civil Eng.'),
  ('Engr. Md. Antor Hossain', 'Asst. Engineer', 'Project Management & Site Supervision Team', 'B.Sc-Civil (WIU)'),
  ('Engr. Md. Touhiduzzaman Tauhid', 'Asst. Engineer', 'Project Management & Site Supervision Team', 'B.Sc-Civil (WIU)'),

  -- Supply Chain Team
  ('Mr. Md. Moin Uddin (Mahin)', 'Sr. Executive (SCM)', 'Supply Chain Team', NULL),
  ('Mr. Md. Borhan Uddin', 'Officer (SCM)', 'Supply Chain Team', NULL),
  ('Mr. Md. Anzam Mia', 'Officer (SCM)', 'Supply Chain Team', NULL),
  ('Mr. Aman Uddin Nayeem', 'Jr. Officer (SCM)', 'Supply Chain Team', NULL),

  -- Office Co-ordination Team
  ('Mr. Md. Yasin Arafat', 'Office Asst.', 'Office Co-ordination Team', NULL);
