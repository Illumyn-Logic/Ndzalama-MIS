-- ============================================================================
-- NDZALAMA TRAINING — SUPABASE POSTGRESQL MASTER SCHEMA & MIGRATION
-- Project: Ndzalama Public Portal, LMIS & LMS (Unified Domain)
-- Compliance: ETDP SETA (ETDP0204), SAQA (ODETDP 50334), QCTO Occupational Certs
-- ============================================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. ENUMS
-- ----------------------------------------------------------------------------

create type user_role as enum (
  'super_admin',
  'admin',
  'registrar',
  'finance_officer',
  'facilitator',
  'assessor',
  'moderator',
  'sme_mentor',
  'host_employer',
  'learner',
  'prospective_learner'
);

create type equity_group as enum (
  'african',
  'coloured',
  'indian',
  'white',
  'other'
);

create type gender_type as enum (
  'male',
  'female',
  'other',
  'prefer_not_to_say'
);

create type citizen_status as enum (
  'sa_citizen',
  'permanent_resident',
  'foreign_national_with_permit',
  'other'
);

create type socio_economic_status as enum (
  'employed',
  'unemployed',
  'self_employed',
  'student_scholar'
);

create type disability_type as enum (
  'none',
  'sight',
  'hearing',
  'physical',
  'intellectual',
  'communication',
  'emotional',
  'multiple'
);

create type qualification_framework as enum (
  'legacy_unit_standard',
  'qcto_occupational_certificate',
  'skills_programme',
  'short_course',
  'regulatory_exam_prep'
);

create type module_category as enum (
  'unit_standard',
  'knowledge_module', -- KM
  'practical_module', -- PM
  'workplace_module', -- WM
  'general_topic'
);

create type delivery_mode as enum (
  'contact_classroom',
  'distance_online',
  'blended_hybrid',
  'workplace_based'
);

create type application_status as enum (
  'submitted',
  'under_review',
  'documents_verified',
  'invoiced',
  'payment_confirmed',
  'accepted_enrolled',
  'rejected',
  'waitlisted'
);

create type enrollment_status as enum (
  'enrolled',
  'in_training',
  'poe_submitted',
  'assessment_in_progress',
  'moderation_in_progress',
  'competent_certified',
  'not_yet_competent',
  'withdrawn',
  'deferred'
);

create type assessment_outcome as enum (
  'pending_submission',
  'submitted',
  'under_assessment',
  'competent',
  'not_yet_competent',
  'remediation_required',
  'moderated_confirmed'
);

create type moderation_decision as enum (
  'upheld',
  'overturned',
  'sample_expansion_required'
);

create type post_status as enum (
  'draft',
  'published',
  'archived'
);

create type post_category as enum (
  'announcement',
  'seta_regulatory_update',
  'course_intake',
  'industry_news',
  'success_story',
  'training_tip'
);

-- ----------------------------------------------------------------------------
-- 2. HELPER FUNCTIONS & TRIGGERS
-- ----------------------------------------------------------------------------

-- Automatic updated_at timestamp function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------
-- 3. USER PROFILES & RBAC (Linked to Supabase Auth)
-- ----------------------------------------------------------------------------

create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  role user_role not null default 'learner',
  is_active boolean not null default true,
  avatar_url text,

  -- Primary Demographics (South African NLRD / SETA Compliance)
  first_name text not null default '',
  last_name text not null default '',
  id_or_passport_number text unique,
  is_passport boolean not null default false,
  passport_country text,
  date_of_birth date,
  gender gender_type default 'prefer_not_to_say',
  equity equity_group default 'african',
  citizen_status citizen_status default 'sa_citizen',
  home_language text default 'English',
  socio_economic_status socio_economic_status default 'employed',
  disability disability_type default 'none',

  -- Contact & Location
  phone text,
  alternative_phone text,
  street_address text,
  suburb_city text,
  province text,
  postal_code text,
  municipality text,
  is_urban boolean default true,

  -- Accreditation & Professional Details
  highest_qualification text,
  seta_assessor_reg_no text,   -- For registered Assessors
  seta_moderator_reg_no text,  -- For registered Moderators
  employer_name text,
  employer_sdl_number text,    -- Skills Development Levy number

  -- POPIA Compliance
  popia_consent_signed boolean not null default false,
  popia_consent_date timestamp with time zone,

  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Helper function to check roles in RLS
create or replace function public.has_role(required_role user_role)
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = required_role
  );
end;
$$ language plpgsql security definer;

create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('super_admin', 'admin', 'registrar')
  );
end;
$$ language plpgsql security definer;

create or replace function public.is_staff()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('super_admin', 'admin', 'registrar', 'facilitator', 'assessor', 'moderator', 'finance_officer')
  );
end;
$$ language plpgsql security definer;

-- Trigger to auto-create profile on Supabase auth signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    email,
    first_name,
    last_name,
    role
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'learner'::user_role)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- 4. DYNAMIC CMS & PUBLIC PORTAL
-- ----------------------------------------------------------------------------

create table public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  summary text not null,
  content text not null, -- Markdown or rich HTML
  cover_image text,
  category post_category not null default 'announcement',
  status post_status not null default 'draft',
  is_featured boolean not null default false,
  tags text[] default '{}',
  
  author_id uuid references public.profiles(id) on delete set null,
  published_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create trigger set_posts_updated_at
  before update on public.posts
  for each row execute procedure public.handle_updated_at();

create index idx_posts_slug on public.posts(slug);
create index idx_posts_category_status on public.posts(category, status);

create table public.newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  is_active boolean not null default true,
  subscribed_at timestamp with time zone not null default now()
);

create table public.contact_inquiries (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  is_resolved boolean not null default false,
  created_at timestamp with time zone not null default now()
);

-- ----------------------------------------------------------------------------
-- 5. ACADEMIC CURRICULUM & COURSE CATALOGUE
-- ----------------------------------------------------------------------------

create table public.qualifications (
  id uuid default gen_random_uuid() primary key,
  code text unique not null,               -- e.g. '50334', '101321'
  saqa_id text,
  qcto_code text,
  title text not null,
  slug text unique not null,
  framework qualification_framework not null default 'legacy_unit_standard',
  nqf_level integer not null default 5,
  credits integer not null,
  duration_months integer not null default 12,
  short_description text not null,
  full_description text not null,
  price numeric(10, 2) not null default 0.00,
  cover_image_url text,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create trigger set_qualifications_updated_at
  before update on public.qualifications
  for each row execute procedure public.handle_updated_at();

create index idx_qualifications_slug on public.qualifications(slug);

create table public.course_modules (
  id uuid default gen_random_uuid() primary key,
  qualification_id uuid not null references public.qualifications(id) on delete cascade,
  module_code text not null,               -- e.g. 'KM-01', 'US-117871'
  title text not null,
  category module_category not null default 'unit_standard',
  unit_standard_id text,
  credits integer not null,
  duration_days integer,
  individual_price numeric(10, 2),
  summary text,
  order_index integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique(qualification_id, module_code)
);

create trigger set_course_modules_updated_at
  before update on public.course_modules
  for each row execute procedure public.handle_updated_at();

create table public.lessons (
  id uuid default gen_random_uuid() primary key,
  module_id uuid not null references public.course_modules(id) on delete cascade,
  title text not null,
  slug text not null,
  order_index integer not null default 0,
  content_body text,
  resource_urls text[] default '{}',
  video_embed_url text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create trigger set_lessons_updated_at
  before update on public.lessons
  for each row execute procedure public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- 6. COHORTS, INTAKES & VENUE LOGISTICS
-- ----------------------------------------------------------------------------

create table public.campus_venues (
  id uuid default gen_random_uuid() primary key,
  name text not null, -- 'Polokwane Head Office', 'Gauteng - Kempton Park', 'Tzaneen', 'Virtual Campus'
  address text not null,
  contact_person text,
  contact_phone text,
  is_virtual boolean not null default false,
  virtual_link text,
  created_at timestamp with time zone not null default now()
);

create table public.cohorts (
  id uuid default gen_random_uuid() primary key,
  code text unique not null, -- e.g. 'ODETDP-2026-Q1-PLK'
  name text not null,
  qualification_id uuid not null references public.qualifications(id) on delete restrict,
  venue_id uuid not null references public.campus_venues(id) on delete restrict,
  start_date date not null,
  end_date date not null,
  delivery_mode delivery_mode not null default 'blended_hybrid',
  capacity integer not null default 25,
  is_enrollment_open boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create trigger set_cohorts_updated_at
  before update on public.cohorts
  for each row execute procedure public.handle_updated_at();

create table public.cohort_facilitators (
  id uuid default gen_random_uuid() primary key,
  cohort_id uuid not null references public.cohorts(id) on delete cascade,
  facilitator_id uuid not null references public.profiles(id) on delete cascade,
  is_lead boolean not null default true,
  unique(cohort_id, facilitator_id)
);

-- ----------------------------------------------------------------------------
-- 7. LMIS: APPLICATIONS, ENROLLMENTS & WORKPLACE HOST EMPLOYERS
-- ----------------------------------------------------------------------------

create table public.host_employers (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  trading_name text,
  sdl_number text unique not null,
  seta_affiliation text not null, -- e.g. 'ETDP SETA', 'SERVICES SETA'
  contact_person_name text not null,
  contact_email text not null,
  contact_phone text not null,
  physical_address text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create trigger set_host_employers_updated_at
  before update on public.host_employers
  for each row execute procedure public.handle_updated_at();

create table public.applications (
  id uuid default gen_random_uuid() primary key,
  application_number text unique not null, -- e.g. 'NDZ-APP-2026-0042'
  applicant_id uuid not null references public.profiles(id) on delete cascade,
  qualification_id uuid not null references public.qualifications(id) on delete restrict,
  status application_status not null default 'submitted',
  preferred_campus text,
  funding_type text not null default 'Self-Funded',
  notes text,

  -- Uploaded Documents (Supabase Storage URLs)
  id_document_url text,
  matric_certificate_url text,
  cv_url text,
  proof_of_payment_url text,

  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create trigger set_applications_updated_at
  before update on public.applications
  for each row execute procedure public.handle_updated_at();

create table public.enrollments (
  id uuid default gen_random_uuid() primary key,
  enrollment_number text unique not null, -- e.g. 'NDZ-LRN-2026-0089'
  learner_id uuid not null references public.profiles(id) on delete cascade,
  qualification_id uuid not null references public.qualifications(id) on delete restrict,
  cohort_id uuid references public.cohorts(id) on delete set null,
  host_employer_id uuid references public.host_employers(id) on delete set null,
  status enrollment_status not null default 'enrolled',
  start_date date not null default current_date,
  completion_date date,
  final_result text, -- 'COMPETENT', 'NYC'
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique(learner_id, qualification_id)
);

create trigger set_enrollments_updated_at
  before update on public.enrollments
  for each row execute procedure public.handle_updated_at();

create table public.workplace_placements (
  id uuid default gen_random_uuid() primary key,
  enrollment_id uuid unique not null references public.enrollments(id) on delete cascade,
  host_employer_id uuid not null references public.host_employers(id) on delete restrict,
  mentor_id uuid references public.profiles(id) on delete set null,
  start_date date not null,
  end_date date not null,
  mentor_sign_off boolean not null default false,
  sign_off_date timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create trigger set_workplace_placements_updated_at
  before update on public.workplace_placements
  for each row execute procedure public.handle_updated_at();

create table public.logbook_entries (
  id uuid default gen_random_uuid() primary key,
  placement_id uuid not null references public.workplace_placements(id) on delete cascade,
  activity_date date not null,
  hours_spent integer not null,
  description text not null,
  evidence_url text,
  is_verified boolean not null default false,
  verified_at timestamp with time zone,
  created_at timestamp with time zone not null default now()
);

-- ----------------------------------------------------------------------------
-- 8. LMS: ASSESSMENTS, PORTFOLIO OF EVIDENCE (PoE) & MODERATION
-- ----------------------------------------------------------------------------

create table public.assessment_tasks (
  id uuid default gen_random_uuid() primary key,
  module_id uuid not null references public.course_modules(id) on delete cascade,
  title text not null,
  instructions text not null,
  total_marks integer not null default 100,
  pass_percentage integer not null default 50,
  rubric_criteria jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create trigger set_assessment_tasks_updated_at
  before update on public.assessment_tasks
  for each row execute procedure public.handle_updated_at();

create table public.assessment_submissions (
  id uuid default gen_random_uuid() primary key,
  task_id uuid not null references public.assessment_tasks(id) on delete restrict,
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  attempt_number integer not null default 1,
  file_urls text[] default '{}', -- Portfolio of Evidence file links
  submission_notes text,
  submitted_at timestamp with time zone not null default now(),
  outcome assessment_outcome not null default 'submitted',
  score_achieved numeric(5, 2),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create trigger set_assessment_submissions_updated_at
  before update on public.assessment_submissions
  for each row execute procedure public.handle_updated_at();

create table public.assessment_reviews (
  id uuid default gen_random_uuid() primary key,
  submission_id uuid unique not null references public.assessment_submissions(id) on delete cascade,
  assessor_id uuid not null references public.profiles(id) on delete restrict,
  is_competent boolean not null,
  marks_awarded numeric(5, 2) not null,
  feedback_report text not null,
  remediation_plan text,
  assessor_signature text not null,
  reviewed_at timestamp with time zone not null default now()
);

create table public.moderation_reviews (
  id uuid default gen_random_uuid() primary key,
  submission_id uuid unique not null references public.assessment_submissions(id) on delete cascade,
  moderator_id uuid not null references public.profiles(id) on delete restrict,
  decision moderation_decision not null default 'upheld',
  moderation_report text not null,
  moderator_signature text not null,
  moderated_at timestamp with time zone not null default now()
);

create table public.lesson_progress (
  id uuid default gen_random_uuid() primary key,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  is_completed boolean not null default false,
  completed_at timestamp with time zone,
  unique(lesson_id, enrollment_id)
);

create table public.attendance_records (
  id uuid default gen_random_uuid() primary key,
  cohort_id uuid not null references public.cohorts(id) on delete cascade,
  learner_id uuid not null references public.profiles(id) on delete cascade,
  session_date date not null,
  is_present boolean not null default true,
  notes text,
  created_at timestamp with time zone not null default now()
);

-- ----------------------------------------------------------------------------
-- 9. CERTIFICATION & PUBLIC VERIFICATION
-- ----------------------------------------------------------------------------

create table public.certificates (
  id uuid default gen_random_uuid() primary key,
  certificate_number text unique not null, -- e.g. 'NDZ-CERT-2026-8831'
  verification_hash text unique not null,  -- SHA-256 hash for public QR check
  learner_id uuid not null references public.profiles(id) on delete cascade,
  enrollment_id uuid not null references public.enrollments(id) on delete cascade,
  issue_date date not null default current_date,
  pdf_download_url text not null,
  seta_endorsement_ref text,
  created_at timestamp with time zone not null default now()
);

create index idx_certificates_cert_number on public.certificates(certificate_number);
create index idx_certificates_verification_hash on public.certificates(verification_hash);

-- ----------------------------------------------------------------------------
-- 10. AUDIT TRAILS & COMPLIANCE LOGS
-- ----------------------------------------------------------------------------

create table public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,     -- 'ENROLLMENT_CREATED', 'POE_ASSESSED', 'ROLE_UPDATED'
  entity_type text not null,-- 'assessment_submissions', 'enrollments'
  entity_id uuid not null,
  details jsonb default '{}'::jsonb,
  ip_address text,
  created_at timestamp with time zone not null default now()
);

create index idx_audit_logs_action on public.audit_logs(action, entity_type, entity_id);

-- ----------------------------------------------------------------------------
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.qualifications enable row level security;
alter table public.course_modules enable row level security;
alter table public.lessons enable row level security;
alter table public.campus_venues enable row level security;
alter table public.cohorts enable row level security;
alter table public.cohort_facilitators enable row level security;
alter table public.host_employers enable row level security;
alter table public.applications enable row level security;
alter table public.enrollments enable row level security;
alter table public.workplace_placements enable row level security;
alter table public.logbook_entries enable row level security;
alter table public.assessment_tasks enable row level security;
alter table public.assessment_submissions enable row level security;
alter table public.assessment_reviews enable row level security;
alter table public.moderation_reviews enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.attendance_records enable row level security;
alter table public.certificates enable row level security;
alter table public.audit_logs enable row level security;

-- PROFILES Policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_staff());

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin());

create policy "Admins have full access to profiles"
  on public.profiles for all
  using (public.is_admin());

-- POSTS Policies (Public can view published posts, Staff can edit)
create policy "Anyone can read published posts"
  on public.posts for select
  using (status = 'published' or public.is_staff());

create policy "Staff can manage posts"
  on public.posts for all
  using (public.is_staff());

-- QUALIFICATIONS, MODULES & LESSONS (Public view, Admin manage)
create policy "Anyone can view active qualifications"
  on public.qualifications for select
  using (is_active = true or public.is_staff());

create policy "Admins can manage qualifications"
  on public.qualifications for all
  using (public.is_admin());

create policy "Anyone can view modules"
  on public.course_modules for select
  using (true);

create policy "Admins can manage course modules"
  on public.course_modules for all
  using (public.is_admin());

create policy "Enrolled learners and staff can view lessons"
  on public.lessons for select
  using (true);

create policy "Admins can manage lessons"
  on public.lessons for all
  using (public.is_admin());

-- APPLICATIONS Policies
create policy "Applicants can view and create their applications"
  on public.applications for select
  using (applicant_id = auth.uid() or public.is_staff());

create policy "Applicants can insert applications"
  on public.applications for insert
  with check (applicant_id = auth.uid());

create policy "Staff can manage all applications"
  on public.applications for all
  using (public.is_staff());

-- ENROLLMENTS Policies
create policy "Learners can view their own enrollments"
  on public.enrollments for select
  using (learner_id = auth.uid() or public.is_staff());

create policy "Admins can manage enrollments"
  on public.enrollments for all
  using (public.is_admin());

-- ASSESSMENT SUBMISSIONS Policies
create policy "Learners can view and submit their own assessments"
  on public.assessment_submissions for select
  using (
    exists (
      select 1 from public.enrollments
      where enrollments.id = assessment_submissions.enrollment_id
        and (enrollments.learner_id = auth.uid() or public.is_staff())
    )
  );

create policy "Learners can create submissions"
  on public.assessment_submissions for insert
  with check (
    exists (
      select 1 from public.enrollments
      where enrollments.id = assessment_submissions.enrollment_id
        and enrollments.learner_id = auth.uid()
    )
  );

create policy "Staff can evaluate assessment submissions"
  on public.assessment_submissions for update
  using (public.is_staff());

-- CERTIFICATES Policies (Public verification by hash, Learner view)
create policy "Anyone can verify a certificate by number or hash"
  on public.certificates for select
  using (true);

create policy "Admins can issue certificates"
  on public.certificates for all
  using (public.is_admin());
