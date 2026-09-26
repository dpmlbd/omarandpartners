export type UserRole = "admin" | "moderator";
export type UserStatus = "active" | "inactive";

export type ProjectCategory =
  | "Building Projects"
  | "Interior Projects"
  | "Landscape Projects";

export interface Company {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  company_id: string;
  category: ProjectCategory;
  title: string;
  slug: string;
  project_type: string;
  location: string;
  year: string;
  status: string | null;
  area: string | null;
  description: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  // Joins
  company?: Company;
  images?: ProjectImage[];
}

export interface ProjectImage {
  id: string;
  project_id: string;
  storage_path: string;
  public_url?: string;
  role: "main" | "gallery";
  display_order: number;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  team_type: string;
  study?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  work: string;
  image: string;
  description: string;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  author_id: string | null;
  author_name: string | null;
  author_designation: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  // Joins
  author?: TeamMember | null;
}

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: Company;
        Insert: Omit<Company, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<Omit<Company, "id" | "created_at">>;
        Relationships: [];
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>;
        Relationships: [];
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "updated_at" | "company" | "images"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Project, "id" | "created_at" | "updated_at" | "company" | "images">>;
        Relationships: [];
      };
      project_images: {
        Row: ProjectImage;
        Insert: Omit<ProjectImage, "id" | "created_at" | "public_url"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<ProjectImage, "id" | "created_at" | "public_url">>;
        Relationships: [];
      };
      team: {
        Row: TeamMember;
        Insert: Omit<TeamMember, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<TeamMember, "id" | "created_at" | "updated_at">>;
        Relationships: [];
      };
      testimonials: {
        Row: Testimonial;
        Insert: Omit<Testimonial, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Testimonial, "id" | "created_at" | "updated_at">>;
        Relationships: [];
      };
      articles: {
        Row: Article;
        Insert: Omit<Article, "id" | "created_at" | "updated_at" | "author"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Article, "id" | "created_at" | "updated_at" | "author">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
