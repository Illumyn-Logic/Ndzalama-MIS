export interface AccreditationService {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// Sourced from legacy "Our Services > Accreditation" mega-menu (docs/_/inspo/*.html)
export const accreditationServices: AccreditationService[] = [
  {
    id: 1,
    title: 'Become an Accredited Training Provider',
    description:
      'We guide organisations through the full SETA/QCTO accreditation journey — from application readiness to quality management system (QMS) development — so you can legally deliver accredited training.',
    icon: '🏛️',
  },
  {
    id: 2,
    title: 'TVET College Registration',
    description:
      'Support for TVET colleges seeking registration with the Department of Higher Education and Training (DHET), including documentation, compliance checks and submission guidance.',
    icon: '🎓',
  },
  {
    id: 3,
    title: 'SETA Registration',
    description:
      'Assistance for organisations becoming SETA-registered, covering the requirements, evidence and processes needed to achieve and maintain registration.',
    icon: '📋',
  },
];

export interface AwardingBody {
  id: number;
  name: string;
  logo: string;
}

export const awardingBodies: AwardingBody[] = [
  ...Array.from({ length: 11 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');

    return {
      id: index + 1,
      name: `Partner and accreditation logo ${number}`,
      logo: `/images/clients/awards/${number}.png`,
    };
  }),
];
