export type CourseCategory =
  | 'Occupational Certificates'
  | 'Skills Programmes'
  | 'First Aid Programmes'
  | 'Skill Builder Courses'
  | 'Legacy Qualifications';

export type CourseProvider =
  | 'ETDP SETA'
  | 'Services SETA'
  | 'HWSETA'
  | 'Skill Builder'
  | 'Legacy Unit Standards';
export type CourseDelivery = 'Scheduled training' | 'Self-paced';

export interface Course {
  id: number;
  code: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  image: string;
  category: CourseCategory;
  seta: CourseProvider;
  accredited: boolean;
  delivery?: CourseDelivery;
  note?: string;
}

const course = (
  id: number,
  code: string,
  slug: string,
  title: string,
  category: CourseCategory,
  seta: CourseProvider,
  description: string,
  options: {
    accredited?: boolean;
    delivery?: CourseDelivery;
    duration?: string;
    note?: string;
  } = {},
): Course => ({
  id,
  code,
  slug,
  title,
  shortDesc: description,
  fullDesc: description,
  duration: options.duration ?? 'Contact us for upcoming dates',
  image: '/images/clients/carousel/01.jpg',
  category,
  seta,
  accredited: options.accredited ?? true,
  delivery: options.delivery ?? 'Scheduled training',
  note: options.note,
});

export const courses: Course[] = [
  course(1, 'OC-97154', 'occupational-trainer', 'Occupational Trainer', 'Occupational Certificates', 'ETDP SETA', 'Occupational Certificate for people who plan, deliver, and evaluate workplace learning.'),
  course(2, 'OC-101321', 'training-development-practitioner', 'Training and Development Practitioner', 'Occupational Certificates', 'ETDP SETA', 'Occupational Certificate for practitioners who develop and coordinate workplace learning.'),
  course(3, 'OC-97542', 'ecd-practitioner', 'Early Childhood Development Practitioner', 'Occupational Certificates', 'ETDP SETA', 'Occupational Certificate at NQF Level 4 with 131 credits.', { note: 'NQF Level 4 · 131 credits' }),
  course(4, 'SP-220319', 'learning-development-facilitator', 'Learning and Development Facilitator', 'Skills Programmes', 'ETDP SETA', 'Skills Programme for facilitating learning and supporting learner development.'),
  course(5, 'SP-220320', 'assessment-practitioner', 'Assessment Practitioner', 'Skills Programmes', 'ETDP SETA', 'Skills Programme for planning and conducting outcomes-based assessments.'),
  course(6, 'SP-220321', 'skills-development-facilitation-practitioner', 'Skills Development Facilitation Practitioner', 'Skills Programmes', 'ETDP SETA', 'Skills Programme for coordinating organisational skills development.'),
  course(7, 'SP-220322', 'workplace-based-practitioner', 'Workplace-based Practitioner Programme', 'Skills Programmes', 'ETDP SETA', 'Skills Programme for supporting structured workplace-based learning.', { note: 'Verified 14 May 2026' }),
  course(8, 'SP-211001', 'assistant-life-coach', 'Assistant Life Coach', 'Skills Programmes', 'ETDP SETA', 'Skills Programme introducing practical coaching skills for personal and workplace development.'),
  course(9, 'SP-201201', 'workplace-preparation', 'Workplace Preparation', 'Skills Programmes', 'Services SETA', 'Skills Programme focused on preparation for entering and contributing to the workplace.'),
  course(10, 'SP-211009', 'workplace-essential-skills', 'Workplace Essential Skills', 'Skills Programmes', 'Services SETA', 'Skills Programme developing essential communication, teamwork, and workplace practices.'),
  course(11, 'SP-2110010', 'new-venture-creation', 'New Venture Creation', 'Skills Programmes', 'Services SETA', 'Skills Programme introducing the foundations of planning and starting a new venture.'),
  course(12, 'OC-121929', 'occupational-health-safety-officer', 'Occupational Health and Safety Officer', 'Occupational Certificates', 'HWSETA', 'Occupational Certificate for health and safety practice in the workplace.'),
  course(13, 'OC-121930', 'occupational-health-safety-assistant', 'Occupational Health and Safety Assistant', 'Occupational Certificates', 'HWSETA', 'Occupational Certificate for supporting occupational health and safety operations.'),
  course(14, 'SP-230801', 'basic-emergency-first-aid-responder', 'Basic Emergency First Aid Responder', 'First Aid Programmes', 'HWSETA', 'First Aid Programme covering foundational emergency response.'),
  course(15, 'SP-230802', 'intermediate-emergency-first-aid-responder', 'Intermediate Emergency First Aid Responder', 'First Aid Programmes', 'HWSETA', 'First Aid Programme developing intermediate emergency response skills.'),
  course(16, 'SP-230803', 'advanced-emergency-first-aid-responder', 'Advanced Emergency First Aid Responder', 'First Aid Programmes', 'HWSETA', 'First Aid Programme for advanced emergency response.'),
  course(17, 'SKILL-BUILDER-001', 'intro-to-ai-for-work', 'Introduction to AI for Work', 'Skill Builder Courses', 'Skill Builder', 'A practical self-paced introduction to using AI tools thoughtfully in everyday work.', { accredited: false, delivery: 'Self-paced', duration: 'Self-paced' }),
  course(18, 'SKILL-BUILDER-002', 'write-a-job-ready-cv', 'Write a Job-Ready CV', 'Skill Builder Courses', 'Skill Builder', 'A self-paced course for creating a clear, tailored CV and preparing for job applications.', { accredited: false, delivery: 'Self-paced', duration: 'Self-paced' }),
  course(19, 'SKILL-BUILDER-003', 'digital-workplace-essentials', 'Digital Workplace Essentials', 'Skill Builder Courses', 'Skill Builder', 'Build confidence with everyday digital tools, online communication, and safe work practices.', { accredited: false, delivery: 'Self-paced', duration: 'Self-paced' }),
  course(20, 'US-117871', 'legacy-facilitator-unit-standard', 'Facilitate Learning (Unit Standard 117871)', 'Legacy Qualifications', 'Legacy Unit Standards', 'Legacy unit-standard training in planning and facilitating outcomes-based learning.'),
  course(21, 'US-115753', 'legacy-assessor-unit-standard', 'Conduct Assessments (Unit Standard 115753)', 'Legacy Qualifications', 'Legacy Unit Standards', 'Legacy unit-standard training in conducting outcomes-based assessments.'),
  course(22, 'US-115759', 'legacy-moderator-unit-standard', 'Conduct Moderation (Unit Standard 115759)', 'Legacy Qualifications', 'Legacy Unit Standards', 'Legacy unit-standard training in moderation and assessment quality assurance.'),
];
