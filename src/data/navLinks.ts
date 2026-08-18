export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Accreditation Services', href: '/accreditation-services' },
  { label: 'Apply', href: '/apply' },
  { label: 'Contact', href: '/contact' },
];
