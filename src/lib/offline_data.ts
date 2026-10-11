// ============================================================================
// NDZALAMA TRAINING — MASTER OFFLINE DATA STORE & SEED REPOSITORY
// High-fidelity domain dataset based on Ndzalama 2025/2026 ETDP SETA & QCTO specs
// ============================================================================

export type UserRole =
  | 'visitor'
  | 'learner'
  | 'facilitator'
  | 'assessor'
  | 'moderator'
  | 'sme_mentor'
  | 'admin'
  | 'super_admin';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatar: string;
  regNo?: string;
  phone?: string;
  location?: string;
}

export const demoUsers: Record<UserRole, DemoUser> = {
  visitor: {
    id: 'user-visitor',
    name: 'Guest Visitor',
    email: 'visitor@example.com',
    role: 'visitor',
    title: 'Prospective Student / Client',
    avatar: 'GV',
    location: 'South Africa',
  },
  learner: {
    id: 'user-learner-01',
    name: 'Lerato Ndlovu',
    email: 'lerato.ndlovu@gmail.com',
    role: 'learner',
    title: 'ODETDP & Occupational Trainer Candidate',
    avatar: 'LN',
    phone: '072 443 8910',
    location: 'Polokwane, Limpopo',
  },
  facilitator: {
    id: 'user-fac-01',
    name: 'Masilo Diale',
    email: 'masilo@ndzalama.org.za',
    role: 'facilitator',
    title: 'Senior ETD Facilitator',
    avatar: 'MD',
    regNo: 'ETDP-FAC-2009-418',
    phone: '015 5900 730',
    location: 'Polokwane Head Office',
  },
  assessor: {
    id: 'user-ass-01',
    name: 'Innocent Mabunda',
    email: 'innocent@ndzalama.org.za',
    role: 'assessor',
    title: 'Registered ETDP SETA Assessor',
    avatar: 'IM',
    regNo: 'ETDP-ASS-8812',
    phone: '015 5900 731',
    location: 'Tzaneen Training Venue',
  },
  moderator: {
    id: 'user-mod-01',
    name: 'Ferdie Wevell',
    email: 'ferdie@ndzalama.org.za',
    role: 'moderator',
    title: 'Internal Lead Moderator & QA Specialist',
    avatar: 'FW',
    regNo: 'ETDP-MOD-4419',
    phone: '083 4545 405',
    location: 'Gauteng Office (Kempton Park)',
  },
  sme_mentor: {
    id: 'user-mentor-01',
    name: 'Sanette Wevell',
    email: 'sanette@ndzalama.org.za',
    role: 'sme_mentor',
    title: 'Managing Director & Host Employer Mentor',
    avatar: 'SW',
    phone: '083 4545 405',
    location: 'Gauteng & Polokwane',
  },
  admin: {
    id: 'user-admin-01',
    name: 'Sarah Dlamini',
    email: 'registrar@ndzalama.org.za',
    role: 'admin',
    title: 'Registrar & Operations Manager',
    avatar: 'SD',
    phone: '015 5900 735',
    location: 'Polokwane Head Office',
  },
  super_admin: {
    id: 'user-super-01',
    name: 'Basani Antoinette Baloyi',
    email: 'director@ndzalama.org.za',
    role: 'super_admin',
    title: 'Executive Director (51% Owner)',
    avatar: 'BB',
    phone: '015 5900 730',
    location: 'Head Office',
  },
};

// ----------------------------------------------------------------------------
// DYNAMIC POSTS & REGULATORY UPDATES
// ----------------------------------------------------------------------------
export interface DynamicPost {
  id: string;
  slug: string;
  title: string;
  category: 'SETA Update' | 'QCTO Transition' | 'Intake Announcement' | 'Training Tip';
  summary: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  isFeatured: boolean;
  tags: string[];
}

export const dynamicPosts: DynamicPost[] = [
  {
    id: 'post-1',
    slug: 'qcto-occupational-certificate-transition-guide-2026',
    title: 'Complete Guide: Legacy ETDP SETA Unit Standards to QCTO Occupational Certificates',
    category: 'QCTO Transition',
    summary:
      'Understanding the migration from legacy SAQA 50334 ODETDP qualifications to new QCTO Occupational Certificates (Training Development Practitioner & Occupational Trainer).',
    content: `### Navigating South Africa's Skills Revolution

The Quality Council for Trades and Occupations (QCTO) has revised occupational qualifications across South Africa. As an accredited ETDP SETA provider (Accreditation No: **ETDP0204**), Ndzalama Training provides complete transition pathways.

#### Key Differences:
1. **Three-Tier Modular Architecture:**
   - **Knowledge Modules (KM):** Theoretical foundations and learning principles.
   - **Practical Skill Modules (PM):** Simulated training delivery and assessed practical demonstrations.
   - **Work Experience Modules (WM):** Structured workplace logbook activities supervised by an accredited host employer mentor.
2. **External Integrated Summative Assessment (EISA):** Final national standard assessment ensuring consistent practitioner competence.

Ndzalama continues to offer both accredited legacy unit standard short courses (Facilitator, Assessor, Moderator, SDF) and full QCTO Occupational Certificates.`,
    coverImage: '/images/clients/carousel/01.jpg',
    author: 'Sanette Wevell',
    publishedAt: '12 August 2026',
    isFeatured: true,
    tags: ['QCTO', 'ETDP SETA', 'ODETDP', 'Accreditation'],
  },
  {
    id: 'post-2',
    slug: '2026-q3-facilitator-assessor-moderator-combo-intake',
    title: '2026 Q3 Intake Open: Triple Qualification Combo (Facilitator + Assessor + Moderator)',
    category: 'Intake Announcement',
    summary:
      'Save R3,000 with our bundled training package across our Polokwane, Gauteng, and Tzaneen training centres, plus virtual live cohorts.',
    content: `### Accelerate Your Career as an Education & Training Practitioner

Registration is officially open for the **Q3 Triple Practitioner Package**:
- **Facilitator Training (US 117871):** Master adult facilitation, interactive techniques, and classroom management.
- **Assessor Training (US 115753):** Learn competence-based assessment, evidence collection, and scoring rubrics.
- **Moderator Training (US 115759):** Gain expertise in quality assurance, assessment moderation, and SETA verification standards.

**Special Package Price:** R8,400 (Standard: R11,200). Available in Contact (Polokwane, Gauteng, Tzaneen) and Online Blended cohorts.`,
    coverImage: '/images/clients/carousel/02.jpg',
    author: 'Masilo Diale',
    publishedAt: '05 August 2026',
    isFeatured: true,
    tags: ['Combo Package', 'Facilitator', 'Assessor', 'Moderator'],
  },
  {
    id: 'post-3',
    slug: 'wsp-atr-submissions-role-of-skills-development-facilitator',
    title: 'Why Every Workplace Needs a Registered Skills Development Facilitator (SDF)',
    category: 'SETA Update',
    summary:
      'How certified SDFs unlock mandatory grants (up to 20% of SDL) and drive corporate B-BBEE skills development scorecard points.',
    content: `### Maximising Your Skills Development Levy (SDL) Returns

Appointing a qualified SDF allows organisations to submit their Workplace Skills Plan (WSP) and Annual Training Report (ATR) by the annual 30 April deadline. 

Ndzalama's 5-Day SDF Programme covers SAQA Unit Standards 114924, 15218, 15217, 15232, and 15227, equipping candidates to interface directly with all 21 SETAs.`,
    coverImage: '/images/clients/carousel/04.jpg',
    author: 'Innocent Mabunda',
    publishedAt: '28 July 2026',
    isFeatured: false,
    tags: ['SDF', 'WSP/ATR', 'SETA Grants', 'Corporate Training'],
  },
];

// ----------------------------------------------------------------------------
// FULL ACADEMIC QUALIFICATIONS & MODULES
// ----------------------------------------------------------------------------
export interface CourseModuleItem {
  code: string;
  title: string;
  category: 'KM' | 'PM' | 'WM' | 'US';
  credits: number;
  description: string;
  duration?: string;
  unitStandardId?: string;
}

export interface DetailedCourse {
  id: string;
  slug: string;
  code: string;
  saqaId?: string;
  qctoCode?: string;
  title: string;
  category: 'Occupational Certificates' | 'Skills Programmes' | 'Short Courses' | 'OD-ETDP NC';
  framework: 'Legacy NQF Unit Standards' | 'QCTO Occupational Certificate' | 'Skills Programme';
  nqfLevel: number;
  credits: number;
  duration: string;
  price: number;
  shortDesc: string;
  fullDesc: string;
  image: string;
  targetAudience: string[];
  unitStandards: string[];
  modules: CourseModuleItem[];
}

export const detailedCourses: DetailedCourse[] = [
  {
    id: 'course-odetdp-50334',
    slug: 'odetp',
    code: '50334',
    saqaId: '50334',
    title: 'National Certificate: OD-ETDP (Full Qualification)',
    category: 'OD-ETDP NC',
    framework: 'Legacy NQF Unit Standards',
    nqfLevel: 5,
    credits: 126,
    duration: '12 Months (Blended / RPL)',
    price: 26600,
    shortDesc: 'The flagship National Certificate in Occupationally Directed Education Training and Development Practices.',
    fullDesc:
      'This premier qualification empowers practitioners to design, facilitate, assess, and moderate learning in workplaces and training institutions. It combines all foundational unit standards into an audit-ready Portfolio of Evidence.',
    image: '/images/clients/carousel/05.jpg',
    targetAudience: ['Training Managers', 'Corporate Trainers', 'Lecturers', 'HR Professionals', 'SDF Consultants'],
    unitStandards: ['117871 (Facilitator)', '115753 (Assessor)', '115759 (Moderator)', '114924 (SDF)', '123401 (Course Design)'],
    modules: [
      { code: 'US-117871', title: 'Facilitate learning using a variety of given methodologies', category: 'US', credits: 10, duration: '3 Days', unitStandardId: '117871', description: 'Plan, prepare, execute and evaluate interactive adult training sessions.' },
      { code: 'US-115753', title: 'Conduct outcomes-based assessment', category: 'US', credits: 15, duration: '2 Days', unitStandardId: '115753', description: 'Design assessment tools, evaluate learner evidence, and declare competency.' },
      { code: 'US-115759', title: 'Conduct moderation of outcomes-based assessments', category: 'US', credits: 10, duration: '2 Days', unitStandardId: '115759', description: 'Perform internal moderation, sample assessments, and maintain QA records.' },
      { code: 'US-114924', title: 'Demonstrate understanding of the outcomes-based education framework', category: 'US', credits: 5, duration: '2 Days', unitStandardId: '114924', description: 'Understand NQF, SAQA, and national education legislation.' },
      { code: 'US-123401', title: 'Design and develop outcomes-based learning programmes', category: 'US', credits: 15, duration: '4 Days', unitStandardId: '123401', description: 'Curriculum development and learning resource creation.' },
      { code: 'US-15221', title: 'Provide mentorship and coaching in the workplace', category: 'US', credits: 15, duration: '3 Days', unitStandardId: '15221', description: 'Workplace guidance and individual development support.' },
    ],
  },
  {
    id: 'course-oc-tdp-101321',
    slug: 'training-development-practitioner',
    code: '101321',
    saqaId: '101321',
    qctoCode: '242401001',
    title: 'Occupational Certificate: Training & Development Practitioner',
    category: 'Occupational Certificates',
    framework: 'QCTO Occupational Certificate',
    nqfLevel: 5,
    credits: 190,
    duration: '12 Months',
    price: 28500,
    shortDesc: 'Modern QCTO occupational certificate for professional learning practitioners.',
    fullDesc:
      'Designed to produce fully rounded ETD professionals capable of managing corporate training, developing materials, facilitating workplace learning, and assessing competence in line with the new QCTO curriculum.',
    image: '/images/clients/carousel/01.jpg',
    targetAudience: ['Occupational Trainers', 'Corporate HRD Specialists', 'TVET Instructors', 'SETA Practitioners'],
    unitStandards: ['KM-01 to KM-07', 'PM-01 to PM-03', 'WM-01 to WM-02'],
    modules: [
      { code: 'KM-01', title: 'Foundations of Education, Training and Development', category: 'KM', credits: 12, description: 'Adult learning theories, legislative context, and ethics in training.' },
      { code: 'KM-02', title: 'Learning Programme Design & Methodologies', category: 'KM', credits: 16, description: 'Designing interactive courseware, blended learning, and assessment instruments.' },
      { code: 'KM-03', title: 'Facilitation Methods and Classroom Dynamics', category: 'KM', credits: 14, description: 'Techniques for group management, multimedia tools, and inclusive learning.' },
      { code: 'KM-04', title: 'Assessment and Moderation Quality Systems', category: 'KM', credits: 18, description: 'Formative/summative assessment, moderation sampling, and remediation.' },
      { code: 'PM-01', title: 'Design and Deliver Facilitated Learning Sessions', category: 'PM', credits: 24, description: 'Practical simulated facilitation recordings and peer reviews.' },
      { code: 'PM-02', title: 'Conduct Formative and Summative Workplace Assessments', category: 'PM', credits: 20, description: 'Assessing simulated candidates against national standards.' },
      { code: 'WM-01', title: 'Workplace Training Delivery Logbook', category: 'WM', credits: 40, description: 'Facilitating real workplace interventions verified by an accredited mentor.' },
      { code: 'WM-02', title: 'Workplace Assessment Portfolio', category: 'WM', credits: 46, description: 'Conducting assessments within a registered host employer facility.' },
    ],
  },
  {
    id: 'course-facilitator-117871',
    slug: 'facilitator',
    code: '117871',
    saqaId: '117871',
    title: 'Training Facilitator (US 117871)',
    category: 'Short Courses',
    framework: 'Legacy NQF Unit Standards',
    nqfLevel: 5,
    credits: 10,
    duration: '3 Days Contact / 5 Days Distance',
    price: 2800,
    shortDesc: 'Acquire practical facilitation skills and register as an accredited ETD facilitator.',
    fullDesc:
      'This intensive course prepares you to facilitate outcomes-based learning across corporate and institutional environments. Covers planning, delivery, interactive group dynamics, and learner engagement.',
    image: '/images/clients/carousel/01.jpg',
    targetAudience: ['Aspiring Trainers', 'Subject Matter Experts', 'Team Leaders', 'Coaches'],
    unitStandards: ['117871'],
    modules: [
      { code: 'US-117871-01', title: 'Plan and prepare for facilitation', category: 'US', credits: 3, description: 'Setting learning objectives, prepping venue and multimedia aids.' },
      { code: 'US-117871-02', title: 'Facilitate learning and manage group dynamics', category: 'US', credits: 4, description: 'Interactive facilitation, managing difficult participants, adult learning.' },
      { code: 'US-117871-03', title: 'Evaluate learning and facilitation performance', category: 'US', credits: 3, description: 'Reviewing session feedback and creating post-training reports.' },
    ],
  },
  {
    id: 'course-assessor-115753',
    slug: 'assessor',
    code: '115753',
    saqaId: '115753',
    title: 'Assessor Training (US 115753)',
    category: 'Short Courses',
    framework: 'Legacy NQF Unit Standards',
    nqfLevel: 5,
    credits: 15,
    duration: '2 Days Contact / 4 Days Distance',
    price: 2800,
    shortDesc: 'Learn to conduct competency assessments and register with any SETA as an Assessor.',
    fullDesc:
      'Covers all facets of outcomes-based assessment, designing valid instruments, collecting naturally occurring evidence, applying scoring rubrics, and providing actionable feedback.',
    image: '/images/clients/carousel/02.jpg',
    targetAudience: ['Qualified Facilitators', 'Technical Supervisors', 'Examiners', 'HR Officers'],
    unitStandards: ['115753'],
    modules: [
      { code: 'US-115753-01', title: 'Prepare for assessment against unit standards', category: 'US', credits: 4, description: 'Understanding assessment guides, candidate pre-briefings.' },
      { code: 'US-115753-02', title: 'Conduct assessment and evaluate evidence', category: 'US', credits: 6, description: 'VACS principles (Valid, Authentic, Current, Sufficient).' },
      { code: 'US-115753-03', title: 'Provide feedback and document results', category: 'US', credits: 5, description: 'Post-assessment debrief, C/NYC declaration, and SETA reporting.' },
    ],
  },
  {
    id: 'course-moderator-115759',
    slug: 'moderator',
    code: '115759',
    saqaId: '115759',
    title: 'Moderator Training (US 115759)',
    category: 'Short Courses',
    framework: 'Legacy NQF Unit Standards',
    nqfLevel: 6,
    credits: 10,
    duration: '2 Days Contact / 4 Days Distance',
    price: 2800,
    shortDesc: 'Master assessment moderation, quality assurance, and SETA verification standards.',
    fullDesc:
      'Learn how to evaluate assessment instruments, conduct 10%–20% moderation sampling, uphold assessment integrity, and prepare audit-ready records for SETA verification visits.',
    image: '/images/clients/carousel/03.jpg',
    targetAudience: ['Registered Assessors', 'Academic Heads', 'QA Managers', 'Principal Trainers'],
    unitStandards: ['115759'],
    modules: [
      { code: 'US-115759-01', title: 'Plan and prepare for moderation', category: 'US', credits: 3, description: 'Establishing moderation sampling strategies and checklists.' },
      { code: 'US-115759-02', title: 'Conduct moderation and review assessor decisions', category: 'US', credits: 4, description: 'Checking compliance with VACS principles and fairness.' },
      { code: 'US-115759-03', title: 'Advise and support assessors and report findings', category: 'US', credits: 3, description: 'Compiling formal moderation reports for SETA verification.' },
    ],
  },
  {
    id: 'course-sdf-package',
    slug: 'sdf',
    code: 'SDF-PKG',
    saqaId: '114924-PKG',
    title: 'Skills Development Facilitator (SDF)',
    category: 'Skills Programmes',
    framework: 'Skills Programme',
    nqfLevel: 5,
    credits: 25,
    duration: '4 Days Contact + Workshop',
    price: 6000,
    shortDesc: 'Manage your organisation’s skills development strategy, WSP/ATR and SETA grants.',
    fullDesc:
      'Master the legislative requirements of the Skills Development Act. Learn how to draft Workplace Skills Plans (WSP), Annual Training Reports (ATR), claim mandatory grants, and optimize B-BBEE scorecard points.',
    image: '/images/clients/carousel/04.jpg',
    targetAudience: ['HR Managers', 'SDF Officers', 'Transformation Specialists', 'Consultants'],
    unitStandards: ['114924', '15218', '15217', '15232', '15227'],
    modules: [
      { code: 'US-114924', title: 'OBE Framework & NQF legislation', category: 'US', credits: 5, description: 'South African skills legislative landscape.' },
      { code: 'US-15218', title: 'Conduct skills audits and training needs analyses', category: 'US', credits: 5, description: 'Identifying workplace competency gaps.' },
      { code: 'US-15217', title: 'Develop and submit Workplace Skills Plan (WSP)', category: 'US', credits: 5, description: 'Compiling annual training budgets and plan submissions.' },
      { code: 'US-15232', title: 'Coordinate skills development interventions', category: 'US', credits: 5, description: 'Provider selection and learnership management.' },
      { code: 'US-15227', title: 'Compile Annual Training Report (ATR)', category: 'US', credits: 5, description: 'Reconciling actual training for SETA levy rebates.' },
    ],
  },
  {
    id: 'course-ecd-97542',
    slug: 'ecd',
    code: '97542',
    saqaId: '97542',
    title: 'Early Childhood Development (ECD) Practitioner',
    category: 'Occupational Certificates',
    framework: 'QCTO Occupational Certificate',
    nqfLevel: 4,
    credits: 131,
    duration: '6–12 Months',
    price: 18500,
    shortDesc: 'Professional care, stimulation, and early learning for children birth to age 5.',
    fullDesc:
      'Equips early learning practitioners to provide quality holistic development for young children, manage ECD centres, and implement play-based learning curriculums.',
    image: '/images/clients/carousel/06.jpg',
    targetAudience: ['ECD Teachers', 'Daycare Owners', 'Community Educators'],
    unitStandards: ['KM-01 to KM-04', 'PM-01 to PM-03', 'WM-01'],
    modules: [
      { code: 'ECD-KM-01', title: 'Child Development Principles (0-5 Years)', category: 'KM', credits: 16, description: 'Physical, cognitive, social, and emotional milestones.' },
      { code: 'ECD-PM-01', title: 'Facilitate Play-Based Learning Activities', category: 'PM', credits: 24, description: 'Creating daily stimulation routines.' },
      { code: 'ECD-WM-01', title: 'Workplace ECD Centre Logbook', category: 'WM', credits: 40, description: 'Practical supervised hours in a registered ECD facility.' },
    ],
  },
];

// ----------------------------------------------------------------------------
// COHORT INTAKE SCHEDULES (Polokwane, Gauteng, Tzaneen, Western Cape, Virtual)
// ----------------------------------------------------------------------------
export interface CohortSchedule {
  id: string;
  courseId: string;
  courseTitle: string;
  code: string;
  startDate: string;
  endDate: string;
  location: 'Polokwane' | 'Gauteng (Kempton Park)' | 'Tzaneen' | 'Western Cape (Wellington)' | 'Virtual Campus';
  deliveryMode: 'Contact Classroom' | 'Virtual Live' | 'Blended Hybrid';
  capacity: number;
  enrolledCount: number;
  facilitator: string;
}

export const cohortSchedules: CohortSchedule[] = [
  {
    id: 'sched-1',
    courseId: 'course-facilitator-117871',
    courseTitle: 'Facilitator Training',
    code: 'FAC-2026-Q3-PLK',
    startDate: '08 Sep 2026',
    endDate: '12 Sep 2026',
    location: 'Polokwane',
    deliveryMode: 'Contact Classroom',
    capacity: 20,
    enrolledCount: 14,
    facilitator: 'Masilo Diale',
  },
  {
    id: 'sched-2',
    courseId: 'course-assessor-115753',
    courseTitle: 'Assessor Training',
    code: 'ASS-2026-Q3-TZN',
    startDate: '15 Sep 2026',
    endDate: '18 Sep 2026',
    location: 'Tzaneen',
    deliveryMode: 'Contact Classroom',
    capacity: 20,
    enrolledCount: 18,
    facilitator: 'Innocent Mabunda',
  },
  {
    id: 'sched-3',
    courseId: 'course-moderator-115759',
    courseTitle: 'Moderator Training',
    code: 'MOD-2026-Q3-JHB',
    startDate: '22 Sep 2026',
    endDate: '25 Sep 2026',
    location: 'Gauteng (Kempton Park)',
    deliveryMode: 'Contact Classroom',
    capacity: 15,
    enrolledCount: 9,
    facilitator: 'Ferdie Wevell',
  },
  {
    id: 'sched-4',
    courseId: 'course-sdf-package',
    courseTitle: 'Skills Development Facilitator (SDF)',
    code: 'SDF-2026-Q4-VRT',
    startDate: '05 Oct 2026',
    endDate: '09 Oct 2026',
    location: 'Virtual Campus',
    deliveryMode: 'Virtual Live',
    capacity: 25,
    enrolledCount: 21,
    facilitator: 'Sanette Wevell',
  },
  {
    id: 'sched-5',
    courseId: 'course-odetdp-50334',
    courseTitle: 'National Certificate: OD-ETDP 50334',
    code: 'ODETDP-2026-IN2',
    startDate: '12 Oct 2026',
    endDate: '30 Nov 2027',
    location: 'Polokwane',
    deliveryMode: 'Blended Hybrid',
    capacity: 25,
    enrolledCount: 16,
    facilitator: 'Masilo Diale',
  },
];

// ----------------------------------------------------------------------------
// LMIS: APPLICATIONS & LEARNER PIPELINE
// ----------------------------------------------------------------------------
export interface LearnerApplication {
  id: string;
  appNumber: string;
  applicantName: string;
  email: string;
  phone: string;
  idNumber: string;
  courseTitle: string;
  preferredCampus: string;
  fundingType: 'Self-Funded' | 'Corporate Sponsored' | 'SETA Grant';
  employerName?: string;
  status: 'submitted' | 'under_review' | 'documents_verified' | 'invoiced' | 'accepted_enrolled';
  submittedAt: string;
  documents: {
    idCard: boolean;
    matric: boolean;
    cv: boolean;
    popiaSigned: boolean;
  };
}

export const initialApplications: LearnerApplication[] = [
  {
    id: 'app-001',
    appNumber: 'NDZ-APP-2026-0042',
    applicantName: 'Aphiwe Mokoena',
    email: 'aphiwe.mokoena@gmail.com',
    phone: '082 334 9918',
    idNumber: '9405125890082',
    courseTitle: 'Early Childhood Development (ECD)',
    preferredCampus: 'Tzaneen',
    fundingType: 'Self-Funded',
    status: 'submitted',
    submittedAt: '18 Aug 2026',
    documents: { idCard: true, matric: true, cv: true, popiaSigned: true },
  },
  {
    id: 'app-002',
    appNumber: 'NDZ-APP-2026-0043',
    applicantName: 'Tshepo Sithole',
    email: 'tshepo.s@transnet.net',
    phone: '071 902 4431',
    idNumber: '8803155120087',
    courseTitle: 'Assessor Training (US 115753)',
    preferredCampus: 'Gauteng (Kempton Park)',
    fundingType: 'Corporate Sponsored',
    employerName: 'Transnet Rail',
    status: 'under_review',
    submittedAt: '17 Aug 2026',
    documents: { idCard: true, matric: true, cv: true, popiaSigned: true },
  },
  {
    id: 'app-003',
    appNumber: 'NDZ-APP-2026-0044',
    applicantName: 'Nandi Mahlangu',
    email: 'nandi.m@gmail.com',
    phone: '076 112 0098',
    idNumber: '9208220980084',
    courseTitle: 'Facilitator Training (US 117871)',
    preferredCampus: 'Polokwane',
    fundingType: 'SETA Grant',
    employerName: 'Dept of Correctional Services',
    status: 'documents_verified',
    submittedAt: '15 Aug 2026',
    documents: { idCard: true, matric: true, cv: true, popiaSigned: true },
  },
  {
    id: 'app-004',
    appNumber: 'NDZ-APP-2026-0045',
    applicantName: 'Mandla Khumalo',
    email: 'mandla.khumalo@outlook.com',
    phone: '083 456 7890',
    idNumber: '8511045230089',
    courseTitle: 'Occupational Certificate: Training & Development Practitioner',
    preferredCampus: 'Polokwane',
    fundingType: 'Self-Funded',
    status: 'invoiced',
    submittedAt: '12 Aug 2026',
    documents: { idCard: true, matric: true, cv: true, popiaSigned: true },
  },
];

// ----------------------------------------------------------------------------
// LMS: ENROLLED COURSES & LEARNER PROGRESS (FOR LERATO NDLOVU)
// ----------------------------------------------------------------------------
export interface LearnerEnrolledCourse {
  enrollmentId: string;
  courseId: string;
  courseTitle: string;
  code: string;
  progressPercentage: number;
  status: 'In Training' | 'PoE Uploaded' | 'Assessed - Competent' | 'Certified';
  currentModule: string;
  facilitator: string;
  nextDeadline: string;
  certificateNumber?: string;
  verificationHash?: string;
}

export const learnerEnrolledCourses: LearnerEnrolledCourse[] = [
  {
    enrollmentId: 'enr-01',
    courseId: 'course-facilitator-117871',
    courseTitle: 'Facilitator Training (US 117871)',
    code: 'FAC-2026-Q2-PLK',
    progressPercentage: 100,
    status: 'Certified',
    currentModule: 'Completed & Moderated',
    facilitator: 'Masilo Diale',
    nextDeadline: 'Completed',
    certificateNumber: 'NDZ-CERT-2026-8831',
    verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },
  {
    enrollmentId: 'enr-02',
    courseId: 'course-assessor-115753',
    courseTitle: 'Assessor Training (US 115753)',
    code: 'ASS-2026-Q3-TZN',
    progressPercentage: 75,
    status: 'PoE Uploaded',
    currentModule: 'US-115753-03: Assess Evidence & Provide Feedback',
    facilitator: 'Innocent Mabunda',
    nextDeadline: 'Assessor Review: 22 Aug 2026',
  },
  {
    enrollmentId: 'enr-03',
    courseId: 'course-oc-tdp-101321',
    courseTitle: 'OC: Training & Development Practitioner',
    code: 'TDP-2026-Y1',
    progressPercentage: 35,
    status: 'In Training',
    currentModule: 'KM-03: Facilitation Methods and Classroom Dynamics',
    facilitator: 'Sanette Wevell',
    nextDeadline: 'KM-03 Assignment: 30 Aug 2026',
  },
];

// ----------------------------------------------------------------------------
// ASSESSOR WORKBENCH QUEUE (FOR INNOCENT MABUNDA)
// ----------------------------------------------------------------------------
export interface AssessorQueueItem {
  submissionId: string;
  learnerName: string;
  learnerIdNumber: string;
  courseTitle: string;
  moduleCode: string;
  unitStandardId: string;
  submittedAt: string;
  attemptNumber: number;
  files: string[];
  status: 'Awaiting Assessment' | 'Assessed - Competent' | 'Remediation Required';
  score?: number;
  assessorNotes?: string;
}

export const initialAssessorQueue: AssessorQueueItem[] = [
  {
    submissionId: 'sub-101',
    learnerName: 'Lerato Ndlovu',
    learnerIdNumber: '9308145220083',
    courseTitle: 'Assessor Training (US 115753)',
    moduleCode: 'US-115753-02',
    unitStandardId: '115753',
    submittedAt: '17 Aug 2026, 14:20',
    attemptNumber: 1,
    files: ['PoE_LeratoNdlovu_Assessor_SectionA.pdf', 'Learner_Evidence_Simulated_Session.mp4'],
    status: 'Awaiting Assessment',
  },
  {
    submissionId: 'sub-102',
    learnerName: 'Mandla Khumalo',
    learnerIdNumber: '8511045230089',
    courseTitle: 'Facilitator Training (US 117871)',
    moduleCode: 'US-117871-01',
    unitStandardId: '117871',
    submittedAt: '16 Aug 2026, 09:45',
    attemptNumber: 1,
    files: ['PoE_Mandla_FacilitationPlan.pdf'],
    status: 'Awaiting Assessment',
  },
  {
    submissionId: 'sub-103',
    learnerName: 'Nandi Mahlangu',
    learnerIdNumber: '9208220980084',
    courseTitle: 'Facilitator Training (US 117871)',
    moduleCode: 'US-117871-02',
    unitStandardId: '117871',
    submittedAt: '14 Aug 2026, 16:10',
    attemptNumber: 2,
    files: ['PoE_Nandi_Facilitator_Remediation_V2.pdf'],
    status: 'Assessed - Competent',
    score: 88,
    assessorNotes: 'Candidate adequately demonstrated handling difficult classroom dynamics.',
  },
];

// ----------------------------------------------------------------------------
// MODERATOR SAMPLING QUEUE (FOR FERDIE WEVELL)
// ----------------------------------------------------------------------------
export interface ModeratorQueueItem {
  id: string;
  submissionId: string;
  learnerName: string;
  courseTitle: string;
  assessorName: string;
  assessorDecision: 'Competent' | 'Not Yet Competent';
  score: number;
  sampledReason: 'Random 10% Batch' | 'Remediation Review' | 'Borderline Score';
  moderationStatus: 'Pending Moderation' | 'Upheld' | 'Overturned';
  moderatorNotes?: string;
}

export const initialModeratorQueue: ModeratorQueueItem[] = [
  {
    id: 'mod-01',
    submissionId: 'sub-103',
    learnerName: 'Nandi Mahlangu',
    courseTitle: 'Facilitator Training (US 117871)',
    assessorName: 'Innocent Mabunda',
    assessorDecision: 'Competent',
    score: 88,
    sampledReason: 'Random 10% Batch',
    moderationStatus: 'Pending Moderation',
  },
  {
    id: 'mod-02',
    submissionId: 'sub-098',
    learnerName: 'Sipho Zuma',
    courseTitle: 'Assessor Training (US 115753)',
    assessorName: 'Innocent Mabunda',
    assessorDecision: 'Competent',
    score: 92,
    sampledReason: 'Random 10% Batch',
    moderationStatus: 'Upheld',
    moderatorNotes: 'Evaluation strictly conforms to ETDP SETA guidelines and evidence rules.',
  },
];

// ----------------------------------------------------------------------------
// VERIFIABLE CERTIFICATES (FOR PUBLIC /verify PORTAL)
// ----------------------------------------------------------------------------
export interface VerifiableCertificate {
  certificateNumber: string;
  verificationHash: string;
  learnerName: string;
  idNumberMasked: string;
  qualificationTitle: string;
  saqaId: string;
  nqfLevel: number;
  credits: number;
  issueDate: string;
  setaEndorsementRef: string;
  accreditationNumber: string;
  status: 'VALID_ACCREDITED' | 'REVOKED' | 'EXPIRED';
}

export const verifiableCertificates: VerifiableCertificate[] = [
  {
    certificateNumber: 'NDZ-CERT-2026-8831',
    verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    learnerName: 'Lerato Ndlovu',
    idNumberMasked: '930814****083',
    qualificationTitle: 'Facilitator Training (US 117871)',
    saqaId: '117871',
    nqfLevel: 5,
    credits: 10,
    issueDate: '10 July 2026',
    setaEndorsementRef: 'ETDP-BATCH-2026-07-881',
    accreditationNumber: 'ETDP0204',
    status: 'VALID_ACCREDITED',
  },
  {
    certificateNumber: 'NDZ-CERT-2026-4412',
    verificationHash: 'a7c9d54298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852c912',
    learnerName: 'Kagiso Mphahlele',
    idNumberMasked: '890422****085',
    qualificationTitle: 'National Certificate: OD-ETDP (Full Qualification)',
    saqaId: '50334',
    nqfLevel: 5,
    credits: 126,
    issueDate: '15 May 2026',
    setaEndorsementRef: 'ETDP-BATCH-2026-05-312',
    accreditationNumber: 'ETDP0204',
    status: 'VALID_ACCREDITED',
  },
];

// ----------------------------------------------------------------------------
// LMIS: STAFF & FACULTY ROSTER
// ----------------------------------------------------------------------------
export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Facilitator' | 'Registered Assessor' | 'Lead Moderator' | 'Mentor' | 'Registrar' | 'Executive Director';
  setaRegNumber?: string;
  specialization: string;
  location: string;
  activeCohorts: number;
  assignedLearners: number;
  status: 'Active' | 'On Leave' | 'Contractor';
  avatar: string;
}

export const initialStaffMembers: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Masilo Diale',
    email: 'masilo@ndzalama.org.za',
    phone: '015 5900 730',
    role: 'Facilitator',
    setaRegNumber: 'ETDP-FAC-2009-418',
    specialization: 'Adult Learning & ETD Facilitation',
    location: 'Polokwane Head Office',
    activeCohorts: 3,
    assignedLearners: 44,
    status: 'Active',
    avatar: 'MD',
  },
  {
    id: 'staff-2',
    name: 'Innocent Mabunda',
    email: 'innocent@ndzalama.org.za',
    phone: '015 5900 731',
    role: 'Registered Assessor',
    setaRegNumber: 'ETDP-ASS-8812',
    specialization: 'Outcomes-Based Assessment & PoE Evaluation',
    location: 'Tzaneen Training Venue',
    activeCohorts: 4,
    assignedLearners: 62,
    status: 'Active',
    avatar: 'IM',
  },
  {
    id: 'staff-3',
    name: 'Ferdie Wevell',
    email: 'ferdie@ndzalama.org.za',
    phone: '083 4545 405',
    role: 'Lead Moderator',
    setaRegNumber: 'ETDP-MOD-4419',
    specialization: 'Internal Moderation & SETA Quality Assurance',
    location: 'Gauteng (Kempton Park)',
    activeCohorts: 5,
    assignedLearners: 85,
    status: 'Active',
    avatar: 'FW',
  },
  {
    id: 'staff-4',
    name: 'Sanette Wevell',
    email: 'sanette@ndzalama.org.za',
    phone: '083 4545 405',
    role: 'Mentor',
    specialization: 'Occupational Coaching & Host Employer Supervision',
    location: 'Gauteng & Polokwane',
    activeCohorts: 2,
    assignedLearners: 28,
    status: 'Active',
    avatar: 'SW',
  },
  {
    id: 'staff-5',
    name: 'Sarah Dlamini',
    email: 'registrar@ndzalama.org.za',
    phone: '015 5900 735',
    role: 'Registrar',
    specialization: 'SETA NLRD Logistics & Learner Dossiers',
    location: 'Polokwane Head Office',
    activeCohorts: 6,
    assignedLearners: 120,
    status: 'Active',
    avatar: 'SD',
  },
];

// ----------------------------------------------------------------------------
// LMIS: ASSESSMENTS, QUIZZES & PoE MATRIX
// ----------------------------------------------------------------------------
export interface MasterAssessment {
  id: string;
  code: string;
  title: string;
  courseTitle: string;
  type: 'Formative Quiz' | 'Summative PoE' | 'Workplace Logbook' | 'Practical Demonstration';
  totalMarks: number;
  passPercentage: number;
  submissionsCount: number;
  pendingGradingCount: number;
  assessor: string;
  dueDate: string;
  status: 'Open' | 'Grading' | 'Moderation' | 'Closed';
}

export const initialMasterAssessments: MasterAssessment[] = [
  {
    id: 'asm-1',
    code: 'US117871-F1',
    title: 'Facilitation Principles Knowledge Quiz',
    courseTitle: 'Facilitator Training (US 117871)',
    type: 'Formative Quiz',
    totalMarks: 50,
    passPercentage: 70,
    submissionsCount: 14,
    pendingGradingCount: 0,
    assessor: 'Masilo Diale',
    dueDate: '10 Sep 2026',
    status: 'Closed',
  },
  {
    id: 'asm-2',
    code: 'US115753-S1',
    title: 'Summative Assessment & PoE Dossier',
    courseTitle: 'Assessor Training (US 115753)',
    type: 'Summative PoE',
    totalMarks: 100,
    passPercentage: 80,
    submissionsCount: 18,
    pendingGradingCount: 4,
    assessor: 'Innocent Mabunda',
    dueDate: '25 Sep 2026',
    status: 'Grading',
  },
  {
    id: 'asm-3',
    code: 'US115759-M1',
    title: 'Moderation Sampling & QA Report Submission',
    courseTitle: 'Moderator Training (US 115759)',
    type: 'Summative PoE',
    totalMarks: 100,
    passPercentage: 80,
    submissionsCount: 9,
    pendingGradingCount: 2,
    assessor: 'Ferdie Wevell',
    dueDate: '30 Sep 2026',
    status: 'Open',
  },
  {
    id: 'asm-4',
    code: 'KM03-QZ',
    title: 'Classroom Dynamics & Adult Pedagogy Quiz',
    courseTitle: 'OC: Training & Development Practitioner',
    type: 'Formative Quiz',
    totalMarks: 40,
    passPercentage: 75,
    submissionsCount: 16,
    pendingGradingCount: 1,
    assessor: 'Sanette Wevell',
    dueDate: '15 Oct 2026',
    status: 'Open',
  },
];

// ----------------------------------------------------------------------------
// LMIS: LEARNER PROGRESS TRACKING MATRIX
// ----------------------------------------------------------------------------
export interface LearnerProgressRecord {
  id: string;
  learnerName: string;
  idNumber: string;
  courseTitle: string;
  cohortCode: string;
  progressPercent: number;
  formativeStatus: 'Completed' | 'In Progress' | 'Overdue';
  poeStatus: 'Not Uploaded' | 'Under Review' | 'Competent' | 'Remediation';
  attendanceRate: number;
  certificationStatus: 'In Training' | 'Ready for SETA Upload' | 'Certified';
}

export const initialLearnerProgressRecords: LearnerProgressRecord[] = [
  {
    id: 'prog-1',
    learnerName: 'Lerato Ndlovu',
    idNumber: '9308145220083',
    courseTitle: 'Assessor Training (US 115753)',
    cohortCode: 'ASS-2026-Q3-TZN',
    progressPercent: 75,
    formativeStatus: 'Completed',
    poeStatus: 'Under Review',
    attendanceRate: 100,
    certificationStatus: 'In Training',
  },
  {
    id: 'prog-2',
    learnerName: 'Mandla Khumalo',
    idNumber: '8511045230089',
    courseTitle: 'Facilitator Training (US 117871)',
    cohortCode: 'FAC-2026-Q3-PLK',
    progressPercent: 50,
    formativeStatus: 'Completed',
    poeStatus: 'Not Uploaded',
    attendanceRate: 95,
    certificationStatus: 'In Training',
  },
  {
    id: 'prog-3',
    learnerName: 'Nandi Mahlangu',
    idNumber: '9208220980084',
    courseTitle: 'Facilitator Training (US 117871)',
    cohortCode: 'FAC-2026-Q2-PLK',
    progressPercent: 100,
    formativeStatus: 'Completed',
    poeStatus: 'Competent',
    attendanceRate: 100,
    certificationStatus: 'Ready for SETA Upload',
  },
  {
    id: 'prog-4',
    learnerName: 'Tshepo Sithole',
    idNumber: '8803155120087',
    courseTitle: 'Assessor Training (US 115753)',
    cohortCode: 'ASS-2026-Q3-TZN',
    progressPercent: 30,
    formativeStatus: 'In Progress',
    poeStatus: 'Not Uploaded',
    attendanceRate: 85,
    certificationStatus: 'In Training',
  },
];

// ----------------------------------------------------------------------------
// LMIS: COMMUNICATION & CIRCULAR BROADCASTS
// ----------------------------------------------------------------------------
export interface CommunicationBroadcast {
  id: string;
  title: string;
  targetAudience: 'All Active Learners' | 'Facilitators & Assessors' | 'Q3 Cohorts' | 'SETA Registered Candidates';
  channel: 'Email + SMS' | 'Portal Announcement' | 'SMS Blast';
  sentBy: string;
  sentAt: string;
  status: 'Delivered' | 'Scheduled' | 'Draft';
  recipientCount: number;
  content: string;
}

export const initialCommunicationBroadcasts: CommunicationBroadcast[] = [
  {
    id: 'comm-1',
    title: 'Upcoming PoE Submission Deadline — Q3 Assessor Cohort',
    targetAudience: 'Q3 Cohorts',
    channel: 'Email + SMS',
    sentBy: 'Sarah Dlamini (Registrar)',
    sentAt: '18 Aug 2026, 09:30',
    status: 'Delivered',
    recipientCount: 18,
    content: 'Reminder: All candidate portfolios for Unit Standard 115753 must be submitted to the LMS by 25 August 2026 for assessment by Innocent Mabunda.',
  },
  {
    id: 'comm-2',
    title: 'ETDP SETA Quality Assurance & Moderation Schedule',
    targetAudience: 'Facilitators & Assessors',
    channel: 'Portal Announcement',
    sentBy: 'Ferdie Wevell (Lead Moderator)',
    sentAt: '12 Aug 2026, 14:15',
    status: 'Delivered',
    recipientCount: 8,
    content: 'Internal moderation batch sampling for Q2 completions will commence on 28 August. Ensure all marksheets and evidence declarations are locked.',
  },
  {
    id: 'comm-3',
    title: 'Important: QCTO Occupational Certificate Migration Notice',
    targetAudience: 'All Active Learners',
    channel: 'Email + SMS',
    sentBy: 'Basani Baloyi (Director)',
    sentAt: '05 Aug 2026, 11:00',
    status: 'Delivered',
    recipientCount: 142,
    content: 'Information circular regarding the transition of legacy unit standard programmes to occupational qualifications and recognition of prior learning (RPL) pathways.',
  },
];

// ----------------------------------------------------------------------------
// LMS: INTERACTIVE QUIZ ENGINE QUESTIONS
// ----------------------------------------------------------------------------
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const sampleQuizQuestions: Record<string, QuizQuestion[]> = {
  'course-assessor-115753': [
    {
      id: 1,
      question: 'What are the 4 fundamental VACS principles of assessment evidence?',
      options: [
        'Valid, Authentic, Current, Sufficient',
        'Verifiable, Accurate, Comprehensive, Standardized',
        'Visual, Auditory, Conceptual, Structured',
        'Valuable, Actionable, Certified, Scored',
      ],
      correctIndex: 0,
      explanation: 'In outcomes-based assessment, evidence must be Valid (matches unit standard), Authentic (learner’s own work), Current (relevant timeframe), and Sufficient (covers all range statements).',
    },
    {
      id: 2,
      question: 'When should an assessor conduct pre-assessment planning with a candidate?',
      options: [
        'Only after the candidate fails the assessment',
        'Before any assessment commences to agree on context, tools, and special needs',
        'At the conclusion of the moderation audit',
        'During the final SETA verification interview',
      ],
      correctIndex: 1,
      explanation: 'Pre-assessment briefings ensure procedural fairness, transparent criteria, and psychological safety before evidence gathering begins.',
    },
    {
      id: 3,
      question: 'What is the required outcome if a candidate demonstrates competence in 9 out of 10 specific outcomes?',
      options: [
        'Competent with merit',
        'Not Yet Competent (NYC) with focused remediation on the outstanding outcome',
        'Automatic qualification certificate issuance',
        'Referral to external appeal tribunal',
      ],
      correctIndex: 1,
      explanation: 'Outcomes-based assessments are criterion-referenced. All specific outcomes and assessment criteria must be satisfied to declare full Competence (C).',
    },
    {
      id: 4,
      question: 'Which entity is legally responsible for verifying assessment and moderation decisions before national certification?',
      options: [
        'The Department of Labour only',
        'The relevant Education and Training Quality Assurance (ETQA) / SETA / QCTO',
        'The candidate employer finance department',
        'The local municipality education board',
      ],
      correctIndex: 1,
      explanation: 'The accredited SETA (e.g. ETDP SETA for Ndzalama) or QCTO conducts external verification visits to endorse assessment outcomes for NLRD registration.',
    },
  ],
  'course-facilitator-117871': [
    {
      id: 1,
      question: 'Which adult learning principle emphasizes that adult learners draw upon accumulated life experience?',
      options: [
        'Pedagogy principle',
        'Andragogy (Knowles concept)',
        'Behaviorist conditioning',
        'Rote memorization',
      ],
      correctIndex: 1,
      explanation: 'Andragogy recognizes that adults are self-directed, goal-oriented, and bring valuable prior experiential knowledge to the learning room.',
    },
    {
      id: 2,
      question: 'What is the primary purpose of an icebreaker activity in workshop facilitation?',
      options: [
        'To fill leftover time before lunch',
        'To establish rapport, lower anxiety, and align group energy with training objectives',
        'To conduct summative examination scoring',
        'To fulfill administrative compliance audits',
      ],
      correctIndex: 1,
      explanation: 'Interactive icebreakers establish safe learning climates, encourage vocal participation, and build community in the classroom.',
    },
  ],
};

