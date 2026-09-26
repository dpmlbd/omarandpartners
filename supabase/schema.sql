-- ==============================================================================
-- Omar & Partners (ONP) Complete Database Schema
-- Supabase PostgreSQL + Auth + Storage
-- Free-Tier Optimized
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed active companies (Inex is noted as coming-soon, projects are for Kolpokowsol & Kolpoporisor)
INSERT INTO public.companies (name, slug, description)
VALUES 
  ('Kolpoporisor', 'kolpoporisor', 'Architecture & Structural Solutions'),
  ('Kolpokowsol', 'kolpokowsol', 'Interior Design & Spatial Architecture'),
  ('INEX', 'inex', 'Building Materials & Sourcing (Coming Soon)')
ON CONFLICT (slug) DO NOTHING;

-- 3. User Profiles table (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'moderator')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 4. Projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE RESTRICT,
  category TEXT NOT NULL CHECK (category IN ('Building Projects', 'Interior Projects', 'Landscape Projects')),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  project_type TEXT NOT NULL,
  location TEXT NOT NULL,
  year TEXT NOT NULL,
  status TEXT,
  area TEXT,
  description TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_company ON public.projects(company_id);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);

-- 5. Project Images table (Max 7 images total per project: 1 main + up to 6 gallery)
CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('main', 'gallery')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_images_project ON public.project_images(project_id);

-- 6. Team table (Single unified team for the ecosystem)
CREATE TABLE IF NOT EXISTS public.team (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  team_type TEXT NOT NULL, -- e.g. 'Team Lead', 'Design Team', 'Structural Team', etc.
  study TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_team_type ON public.team(team_type);

-- 7. Testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  work TEXT NOT NULL, -- e.g. 'CEO, Horizon Developments'
  image TEXT NOT NULL, -- optimized single image
  description TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Articles table
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT NOT NULL, -- optimized single image
  description TEXT NOT NULL,
  author_id UUID REFERENCES public.team(id) ON DELETE SET NULL,
  author_name TEXT,
  author_designation TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_author ON public.articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(published);

-- ==============================================================================
-- Updated_at Trigger Function
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_team_updated_at BEFORE UPDATE ON public.team FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trg_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- Storage Bucket Setup
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('onp-media', 'onp-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- ==============================================================================
-- Row Level Security (RLS)
-- ==============================================================================
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is active profile
CREATE OR REPLACE FUNCTION public.current_profile_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles 
  WHERE user_id = auth.uid() AND status = 'active'
  LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Companies: Public read
CREATE POLICY "Public read companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Admins manage companies" ON public.companies FOR ALL 
  USING (public.current_profile_role() = 'admin');

-- Profiles: Authenticated users can read their own profile, Admins can read/manage all
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT 
  USING (auth.uid() = user_id OR public.current_profile_role() = 'admin');
CREATE POLICY "Admins manage profiles" ON public.profiles FOR ALL 
  USING (public.current_profile_role() = 'admin');

-- Projects: Public read published; Authenticated active users (admin/moderator) can manage
CREATE POLICY "Public read published projects" ON public.projects FOR SELECT 
  USING (published = true OR public.current_profile_role() IN ('admin', 'moderator'));
CREATE POLICY "Staff manage projects" ON public.projects FOR ALL 
  USING (public.current_profile_role() IN ('admin', 'moderator'));

-- Project Images: Public read; Staff manage
CREATE POLICY "Public read project images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Staff manage project images" ON public.project_images FOR ALL 
  USING (public.current_profile_role() IN ('admin', 'moderator'));

-- Team: Public read; Staff manage
CREATE POLICY "Public read team" ON public.team FOR SELECT USING (true);
CREATE POLICY "Staff manage team" ON public.team FOR ALL 
  USING (public.current_profile_role() IN ('admin', 'moderator'));

-- Testimonials: Public read published; Staff manage
CREATE POLICY "Public read published testimonials" ON public.testimonials FOR SELECT 
  USING (published = true OR public.current_profile_role() IN ('admin', 'moderator'));
CREATE POLICY "Staff manage testimonials" ON public.testimonials FOR ALL 
  USING (public.current_profile_role() IN ('admin', 'moderator'));

-- Articles: Public read published; Staff manage
CREATE POLICY "Public read published articles" ON public.articles FOR SELECT 
  USING (published = true OR public.current_profile_role() IN ('admin', 'moderator'));
CREATE POLICY "Staff manage articles" ON public.articles FOR ALL 
  USING (public.current_profile_role() IN ('admin', 'moderator'));

-- Storage Policies for 'onp-media'
CREATE POLICY "Public read onp-media" ON storage.objects FOR SELECT 
  USING (bucket_id = 'onp-media');

CREATE POLICY "Staff upload onp-media" ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'onp-media' AND auth.role() = 'authenticated');

CREATE POLICY "Staff update onp-media" ON storage.objects FOR UPDATE 
  USING (bucket_id = 'onp-media' AND auth.role() = 'authenticated');

CREATE POLICY "Staff delete onp-media" ON storage.objects FOR DELETE 
  USING (bucket_id = 'onp-media' AND auth.role() = 'authenticated');
