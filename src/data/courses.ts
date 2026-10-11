export type CourseCategory =
  | 'Occupational Certificates'
  | 'Skills Programmes'
  | 'Short Courses'
  | 'Legacy / Non-Accredited';

export type SETA = 'ETDP SETA' | 'Services SETA' | 'HWSETA' | 'Non-SETA';

export interface Course {
  id: number;
  code: string; // e.g., "OC-97154", "SP-220319"
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  image: string;
  category: CourseCategory;
  seta: SETA;
  accredited: boolean;
}

export const courses: Course[] = [
  // ETDP SETA - Occupational Certificates
  {
    id: 1,
    code: 'OC-97154',
    slug: 'adult-education-training-developer',
    title: 'Adult Education and Training Developer',
    shortDesc: 'ETDP SETA accredited occupational certificate for adult education practitioners.',
    fullDesc:
      'This occupational certificate prepares practitioners to design, develop, and deliver adult education and training programmes in compliance with SAQA and QCTO standards.',
    duration: '12 Months',
    image: '/images/courses/placeholder-etdp.jpg',
    category: 'Occupational Certificates',
    seta: 'ETDP SETA',
    accredited: true,
  },
  {
    id: 2,
    code: 'OC-101321',
    slug: 'training-development-practitioner',
    title: 'Training and Development Practitioner',
    shortDesc: 'Full occupational certificate for training and development professionals.',
    fullDesc:
      'The Occupational Certificate: Training and Development Practitioner prepares you for a career in the education, training and development sector, covering all core competencies required by SAQA and the QCTO.',
    duration: '12 Months',
    image: '/images/courses/placeholder-etdp.jpg',
    category: 'Occupational Certificates',
    seta: 'ETDP SETA',
    accredited: true,
  },
  {
    id: 3,
    code: 'OC-97542',
    slug: 'skills-development-facilitator',
    title: 'Skills Development Facilitator',
    shortDesc: 'Manage organisational skills development strategy and compliance.',
    fullDesc:
      'This occupational certificate equips you to act as a registered Skills Development Facilitator (SDF). Covers WSP/ATR submissions, SETA relationships, and skills planning within the South African legislative framework.',
    duration: '12 Months',
    image: '/images/courses/placeholder-etdp.jpg',
    category: 'Occupational Certificates',
    seta: 'ETDP SETA',
    accredited: true,
  },

  // ETDP SETA - Skills Programmes
  {
    id: 4,
    code: 'SP-220319',
    slug: 'workplace-coaching-mentoring',
    title: 'Workplace Coaching and Mentoring',
    shortDesc: 'Develop coaching and mentoring skills in workplace contexts.',
    fullDesc:
      'This skills programme equips you with practical coaching and mentoring skills to support performance improvement and professional growth in organisational settings.',
    duration: '3 Months',
    image: '/images/courses/placeholder-etdp.jpg',
    category: 'Skills Programmes',
    seta: 'ETDP SETA',
    accredited: true,
  },
  {
    id: 5,
    code: 'SP-220320',
    slug: 'facilitate-learning',
    title: 'Facilitate Learning',
    shortDesc: 'Foundational facilitation skills for training practitioners.',
    fullDesc:
      'This skills programme covers the essential competencies required to facilitate learning in various contexts. Aligned with SAQA unit standards and prepares you for facilitator registration.',
    duration: '2 Months',
    image: '/images/courses/placeholder-etdp.jpg',
    category: 'Skills Programmes',
    seta: 'ETDP SETA',
    accredited: true,
  },
  {
    id: 6,
    code: 'SP-220321',
    slug: 'conduct-outcomes-based-assessment',
    title: 'Conduct Outcomes-Based Assessment',
    shortDesc: 'Learn to assess candidates in workplace and training contexts.',
    fullDesc:
      'Become a registered assessor with this SAQA-accredited skills programme. Covers all aspects of conducting competence-based assessments in occupational contexts.',
    duration: '2 Months',
    image: '/images/courses/placeholder-etdp.jpg',
    category: 'Skills Programmes',
    seta: 'ETDP SETA',
    accredited: true,
  },
  {
    id: 7,
    code: 'SP-220322',
    slug: 'moderate-outcomes-based-assessment',
    title: 'Moderate Outcomes-Based Assessment',
    shortDesc: 'Quality assurance for assessment practices.',
    fullDesc:
      'This skills programme prepares you to moderate assessment processes and outcomes. Learn to evaluate assessment instruments and validate assessment decisions.',
    duration: '2 Months',
    image: '/images/courses/placeholder-etdp.jpg',
    category: 'Skills Programmes',
    seta: 'ETDP SETA',
    accredited: true,
  },
  {
    id: 8,
    code: 'SP-211001',
    slug: 'design-develop-learning-programmes',
    title: 'Design and Develop Learning Programmes',
    shortDesc: 'Create effective training programmes aligned to business needs.',
    fullDesc:
      'This skills programme covers the systematic design and development of learning programmes that meet organisational and regulatory requirements.',
    duration: '3 Months',
    image: '/images/courses/placeholder-etdp.jpg',
    category: 'Skills Programmes',
    seta: 'ETDP SETA',
    accredited: true,
  },

  // Services SETA - Skills Programmes
  {
    id: 9,
    code: 'SP-201201',
    slug: 'customer-service',
    title: 'Customer Service Excellence',
    shortDesc: 'Deliver exceptional customer service in any industry.',
    fullDesc:
      'This Services SETA accredited skills programme equips you with the knowledge and skills to provide excellent customer service across various service industry contexts.',
    duration: '2 Months',
    image: '/images/courses/placeholder-services.jpg',
    category: 'Skills Programmes',
    seta: 'Services SETA',
    accredited: true,
  },
  {
    id: 10,
    code: 'SP-211009',
    slug: 'project-management-fundamentals',
    title: 'Project Management Fundamentals',
    shortDesc: 'Essential project management skills for service professionals.',
    fullDesc:
      'Learn the fundamentals of project management in service industry contexts. Covers planning, execution, monitoring, and closure of projects.',
    duration: '3 Months',
    image: '/images/courses/placeholder-services.jpg',
    category: 'Skills Programmes',
    seta: 'Services SETA',
    accredited: true,
  },
  {
    id: 11,
    code: 'SP-211010',
    slug: 'team-leadership',
    title: 'Team Leadership',
    shortDesc: 'Lead and manage teams effectively in service environments.',
    fullDesc:
      'This skills programme develops your ability to lead teams, manage performance, and drive results in service industry settings.',
    duration: '2 Months',
    image: '/images/courses/placeholder-services.jpg',
    category: 'Skills Programmes',
    seta: 'Services SETA',
    accredited: true,
  },

  // HWSETA - Occupational Certificates
  {
    id: 12,
    code: 'OC-121929',
    slug: 'early-childhood-development-practitioner',
    title: 'Early Childhood Development Practitioner',
    shortDesc: 'Care and education for children from birth to age 4.',
    fullDesc:
      'This HWSETA occupational certificate prepares practitioners to provide quality care and education to young children. Covers child development, learning facilitation, and ECD centre operations.',
    duration: '18 Months',
    image: '/images/courses/placeholder-hwseta.jpg',
    category: 'Occupational Certificates',
    seta: 'HWSETA',
    accredited: true,
  },
  {
    id: 13,
    code: 'OC-121930',
    slug: 'social-auxiliary-worker',
    title: 'Social Auxiliary Worker',
    shortDesc: 'Support social workers in community development.',
    fullDesc:
      'This occupational certificate prepares you to work as a Social Auxiliary Worker, providing support services under the supervision of qualified social workers.',
    duration: '18 Months',
    image: '/images/courses/placeholder-hwseta.jpg',
    category: 'Occupational Certificates',
    seta: 'HWSETA',
    accredited: true,
  },

  // HWSETA - Skills Programmes
  {
    id: 14,
    code: 'SP-230801',
    slug: 'home-based-care',
    title: 'Home-Based Care',
    shortDesc: 'Provide quality care in home and community settings.',
    fullDesc:
      'This skills programme prepares you to provide home-based care services to individuals and families in community settings.',
    duration: '3 Months',
    image: '/images/courses/placeholder-hwseta.jpg',
    category: 'Skills Programmes',
    seta: 'HWSETA',
    accredited: true,
  },
  {
    id: 15,
    code: 'SP-230802',
    slug: 'community-development',
    title: 'Community Development',
    shortDesc: 'Drive positive change in communities.',
    fullDesc:
      'Learn to plan and implement community development initiatives that address social needs and promote sustainable development.',
    duration: '3 Months',
    image: '/images/courses/placeholder-hwseta.jpg',
    category: 'Skills Programmes',
    seta: 'HWSETA',
    accredited: true,
  },
  {
    id: 16,
    code: 'SP-230803',
    slug: 'child-youth-care',
    title: 'Child and Youth Care',
    shortDesc: 'Support the development and wellbeing of children and youth.',
    fullDesc:
      'This skills programme equips you to provide care and developmental support to children and youth in various settings.',
    duration: '3 Months',
    image: '/images/courses/placeholder-hwseta.jpg',
    category: 'Skills Programmes',
    seta: 'HWSETA',
    accredited: true,
  },

  // Legacy / Non-Accredited Courses
  {
    id: 17,
    code: 'LEGACY-001',
    slug: 'facilitator-training-legacy',
    title: 'Facilitator Training (Legacy)',
    shortDesc: 'Short course for aspiring facilitators.',
    fullDesc:
      'This legacy short course provides foundational facilitation skills. While not SETA-accredited, it offers practical training for those entering the facilitation field.',
    duration: '5 Days',
    image: '/images/courses/placeholder-legacy.jpg',
    category: 'Short Courses',
    seta: 'Non-SETA',
    accredited: false,
  },
  {
    id: 18,
    code: 'LEGACY-002',
    slug: 'assessor-training-legacy',
    title: 'Assessor Training (Legacy)',
    shortDesc: 'Short course for workplace assessors.',
    fullDesc:
      'This legacy short course covers basic assessment practices in workplace contexts. Not SETA-accredited but provides practical assessment skills.',
    duration: '4 Days',
    image: '/images/courses/placeholder-legacy.jpg',
    category: 'Short Courses',
    seta: 'Non-SETA',
    accredited: false,
  },
  {
    id: 19,
    code: 'LEGACY-003',
    slug: 'moderator-training-legacy',
    title: 'Moderator Training (Legacy)',
    shortDesc: 'Short course for assessment moderators.',
    fullDesc:
      'This legacy short course introduces moderation practices for assessment quality assurance. Not SETA-accredited but offers practical moderation knowledge.',
    duration: '4 Days',
    image: '/images/courses/placeholder-legacy.jpg',
    category: 'Short Courses',
    seta: 'Non-SETA',
    accredited: false,
  },
  {
    id: 20,
    code: 'NONAC-001',
    slug: 'leadership-development',
    title: 'Leadership Development',
    shortDesc: 'Non-accredited leadership training for managers.',
    fullDesc:
      'This non-accredited course develops essential leadership and management skills for supervisors and managers across industries.',
    duration: '3 Days',
    image: '/images/courses/placeholder-legacy.jpg',
    category: 'Legacy / Non-Accredited',
    seta: 'Non-SETA',
    accredited: false,
  },
];
