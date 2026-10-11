-- ============================================================================
-- NDZALAMA TRAINING — OFFLINE SQLITE SCHEMA
-- Project: Ndzalama Public Portal, LMIS & LMS (Unified Domain)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ----------------------------------------------------------------------------
-- 1. USERS & PROFILES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'learner', -- 'super_admin','admin','registrar','facilitator','assessor','moderator','sme_mentor','host_employer','learner','visitor'
  is_active INTEGER NOT NULL DEFAULT 1,
  avatar_url TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  id_or_passport_number TEXT UNIQUE,
  is_passport INTEGER NOT NULL DEFAULT 0,
  date_of_birth TEXT,
  gender TEXT DEFAULT 'female',
  equity TEXT DEFAULT 'african',
  citizen_status TEXT DEFAULT 'sa_citizen',
  home_language TEXT DEFAULT 'English',
  socio_economic_status TEXT DEFAULT 'employed',
  disability TEXT DEFAULT 'none',
  phone TEXT,
  street_address TEXT,
  suburb_city TEXT,
  province TEXT,
  postal_code TEXT,
  highest_qualification TEXT,
  seta_assessor_reg_no TEXT,
  seta_moderator_reg_no TEXT,
  employer_name TEXT,
  employer_sdl_number TEXT,
  popia_consent_signed INTEGER NOT NULL DEFAULT 1,
  popia_consent_date TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 2. DYNAMIC POSTS & NEWS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'announcement', -- 'announcement','seta_regulatory_update','course_intake','industry_news','training_tip'
  status TEXT NOT NULL DEFAULT 'published',
  is_featured INTEGER NOT NULL DEFAULT 0,
  tags TEXT NOT NULL DEFAULT '[]', -- JSON array
  author_id TEXT REFERENCES profiles(id) ON DELETE SET NULL,
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 3. QUALIFICATIONS, MODULES & LESSONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS qualifications (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  saqa_id TEXT,
  qcto_code TEXT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  framework TEXT NOT NULL DEFAULT 'legacy_unit_standard', -- 'legacy_unit_standard','qcto_occupational_certificate','skills_programme','short_course'
  nqf_level INTEGER NOT NULL DEFAULT 5,
  credits INTEGER NOT NULL,
  duration_months INTEGER NOT NULL DEFAULT 12,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  price REAL NOT NULL DEFAULT 0.0,
  cover_image_url TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS course_modules (
  id TEXT PRIMARY KEY,
  qualification_id TEXT NOT NULL REFERENCES qualifications(id) ON DELETE CASCADE,
  module_code TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'unit_standard', -- 'unit_standard','knowledge_module','practical_module','workplace_module'
  unit_standard_id TEXT,
  credits INTEGER NOT NULL,
  duration_days INTEGER,
  individual_price REAL,
  summary TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(qualification_id, module_code)
);

CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  content_body TEXT,
  resource_urls TEXT DEFAULT '[]', -- JSON array of file links
  video_embed_url TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 4. VENUES & COHORTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS campus_venues (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  contact_person TEXT,
  contact_phone TEXT,
  is_virtual INTEGER NOT NULL DEFAULT 0,
  virtual_link TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cohorts (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  qualification_id TEXT NOT NULL REFERENCES qualifications(id),
  venue_id TEXT NOT NULL REFERENCES campus_venues(id),
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  delivery_mode TEXT NOT NULL DEFAULT 'blended_hybrid',
  capacity INTEGER NOT NULL DEFAULT 25,
  is_enrollment_open INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 5. LMIS: APPLICATIONS, ENROLLMENTS & HOST EMPLOYERS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS host_employers (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  trading_name TEXT,
  sdl_number TEXT UNIQUE NOT NULL,
  seta_affiliation TEXT NOT NULL,
  contact_person_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  physical_address TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  application_number TEXT UNIQUE NOT NULL,
  applicant_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  qualification_id TEXT NOT NULL REFERENCES qualifications(id),
  status TEXT NOT NULL DEFAULT 'submitted', -- 'submitted','under_review','documents_verified','invoiced','payment_confirmed','accepted_enrolled','rejected'
  preferred_campus TEXT,
  funding_type TEXT NOT NULL DEFAULT 'Self-Funded',
  notes TEXT,
  id_document_url TEXT,
  matric_certificate_url TEXT,
  cv_url TEXT,
  proof_of_payment_url TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY,
  enrollment_number TEXT UNIQUE NOT NULL,
  learner_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  qualification_id TEXT NOT NULL REFERENCES qualifications(id),
  cohort_id TEXT REFERENCES cohorts(id),
  host_employer_id TEXT REFERENCES host_employers(id),
  status TEXT NOT NULL DEFAULT 'enrolled', -- 'enrolled','in_training','poe_submitted','assessment_in_progress','moderation_in_progress','competent_certified','not_yet_competent'
  start_date TEXT NOT NULL DEFAULT CURRENT_DATE,
  completion_date TEXT,
  final_result TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(learner_id, qualification_id)
);

-- ----------------------------------------------------------------------------
-- 6. LMS: ASSESSMENTS, POE & MODERATION
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS assessment_tasks (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  instructions TEXT NOT NULL,
  total_marks INTEGER NOT NULL DEFAULT 100,
  pass_percentage INTEGER NOT NULL DEFAULT 50,
  rubric_criteria TEXT NOT NULL DEFAULT '[]', -- JSON array
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assessment_submissions (
  id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL REFERENCES assessment_tasks(id),
  enrollment_id TEXT NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  file_urls TEXT NOT NULL DEFAULT '[]', -- JSON array of file paths
  submission_notes TEXT,
  submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  outcome TEXT NOT NULL DEFAULT 'submitted', -- 'submitted','under_assessment','competent','not_yet_competent','remediation_required','moderated_confirmed'
  score_achieved REAL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assessment_reviews (
  id TEXT PRIMARY KEY,
  submission_id TEXT UNIQUE NOT NULL REFERENCES assessment_submissions(id) ON DELETE CASCADE,
  assessor_id TEXT NOT NULL REFERENCES profiles(id),
  is_competent INTEGER NOT NULL,
  marks_awarded REAL NOT NULL,
  feedback_report TEXT NOT NULL,
  remediation_plan TEXT,
  assessor_signature TEXT NOT NULL,
  reviewed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS moderation_reviews (
  id TEXT PRIMARY KEY,
  submission_id TEXT UNIQUE NOT NULL REFERENCES assessment_submissions(id) ON DELETE CASCADE,
  moderator_id TEXT NOT NULL REFERENCES profiles(id),
  decision TEXT NOT NULL DEFAULT 'upheld', -- 'upheld','overturned','sample_expansion_required'
  moderation_report TEXT NOT NULL,
  moderator_signature TEXT NOT NULL,
  moderated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 7. CERTIFICATES & AUDIT
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS certificates (
  id TEXT PRIMARY KEY,
  certificate_number TEXT UNIQUE NOT NULL,
  verification_hash TEXT UNIQUE NOT NULL,
  learner_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  enrollment_id TEXT NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  issue_date TEXT NOT NULL DEFAULT CURRENT_DATE,
  pdf_download_url TEXT NOT NULL,
  seta_endorsement_ref TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details TEXT DEFAULT '{}',
  ip_address TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
