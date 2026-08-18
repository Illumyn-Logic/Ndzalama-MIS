export type CourseCategory =
  | 'Occupational Certificates'
  | 'Skills Programmes'
  | 'Short Courses'
  | 'OD-ETDP NC';

export interface Course {
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  image: string;
  category: CourseCategory;
}

export const courses: Course[] = [
  {
    id: 1,
    slug: 'facilitator',
    title: 'Facilitator Training',
    shortDesc: 'Become a certified facilitator with Ndzalama.',
    fullDesc:
      'This comprehensive course equips you with the skills to facilitate learning in any environment. Aligned with SAQA unit standards, it prepares you for registration as a qualified facilitator.',
    duration: '5 Days',
    image: '/images/clients/carousel/01.jpg',
    category: 'Short Courses',
  },
  {
    id: 2,
    slug: 'assessor',
    title: 'Assessor Training',
    shortDesc: 'Learn to assess candidates in the workplace.',
    fullDesc:
      'Become a registered assessor with our SAQA-accredited programme. This course covers all aspects of conducting competence-based assessments in occupational contexts.',
    duration: '4 Days',
    image: '/images/clients/carousel/02.jpg',
    category: 'Short Courses',
  },
  {
    id: 3,
    slug: 'moderator',
    title: 'Moderator Training',
    shortDesc: 'Ensure quality in assessment practices.',
    fullDesc:
      'This programme prepares you to moderate assessment processes and outcomes. You will learn to evaluate assessment instruments and validate assessment decisions.',
    duration: '4 Days',
    image: '/images/clients/carousel/03.jpg',
    category: 'Short Courses',
  },
  {
    id: 4,
    slug: 'sdf',
    title: 'Skills Development Facilitator (SDF)',
    shortDesc: "Manage your organisation's skills development strategy.",
    fullDesc:
      'Gain the knowledge and skills to act as a registered SDF. This course covers WSP/ATR submissions, SETA relationships, and skills planning within the South African legislative framework.',
    duration: '5 Days',
    image: '/images/clients/carousel/04.jpg',
    category: 'Skills Programmes',
  },
  {
    id: 5,
    slug: 'odetp',
    title: 'OD-ETDP Qualification',
    shortDesc: 'Full occupational qualification for training practitioners.',
    fullDesc:
      'The Occupational Certificate: Training and Development Practitioner (ODETP) is a full qualification for those working in the education, training and development field.',
    duration: '12 Months',
    image: '/images/clients/carousel/05.jpg',
    category: 'OD-ETDP NC',
  },
  {
    id: 6,
    slug: 'ecd',
    title: 'Early Childhood Development (ECD)',
    shortDesc: 'Care and education for children from birth to age 9.',
    fullDesc:
      'This programme prepares practitioners to provide quality care and education to young children. It covers child development, learning facilitation, and ECD centre management.',
    duration: '6 Months',
    image: '/images/clients/carousel/06.jpg',
    category: 'Occupational Certificates',
  },
  {
    id: 7,
    slug: 'training-development-practitioner',
    title: 'Training & Development Practitioner',
    shortDesc: 'Occupational certificate for ETD professionals.',
    fullDesc:
      'This occupational certificate prepares you for a career in the education, training and development sector, covering all core competencies required by SAQA.',
    duration: '12 Months',
    image: '/images/clients/carousel/01.jpg',
    category: 'Occupational Certificates',
  },
  {
    id: 8,
    slug: 'coaching-mentoring',
    title: 'Coaching & Mentoring',
    shortDesc: 'Develop coaching and mentoring skills in the workplace.',
    fullDesc:
      'This programme equips you with practical coaching and mentoring skills to support performance and professional growth in organisational contexts.',
    duration: '3 Days',
    image: '/images/clients/carousel/02.jpg',
    category: 'Short Courses',
  },
];
