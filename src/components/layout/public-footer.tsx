import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaArrowRight,
} from 'react-icons/fa';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Ndzalama', href: '/about' },
  { label: 'Why Choose Us', href: '/why-choose-us' },
  { label: 'Accreditation Services', href: '/accreditation-services' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use', href: '/terms-of-use' },
  { label: 'Contact Us', href: '/contact' },
];

const courseLinks = [
  { label: 'Facilitator Training', href: '/courses/facilitator' },
  { label: 'Assessor Training', href: '/courses/assessor' },
  { label: 'Moderator Training', href: '/courses/moderator' },
  { label: 'Skills Development Facilitator', href: '/courses/sdf' },
  { label: 'OD-ETDP Qualification', href: '/courses/odetp' },
  { label: 'Early Childhood Development', href: '/courses/ecd' },
];

export function PublicFooter() {
  return (
    <footer className="bg-[#111] text-gray-300 mt-auto">
      {/* Main footer content */}
      <div className="border-b border-white/10 py-14">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand column */}
            <div>
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/images/brand/logo.png"
                  alt="Ndzalama Training"
                  width={160}
                  height={48}
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                A SAQA-accredited institution delivering quality education, training
                and development across South Africa.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/ndzalamatraining.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 bg-white/10 flex items-center justify-center hover:bg-brand-secondary transition-colors"
                >
                  <FaFacebookF className="text-sm" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 bg-white/10 flex items-center justify-center hover:bg-brand-secondary transition-colors"
                >
                  <FaInstagram className="text-sm" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-9 h-9 bg-white/10 flex items-center justify-center hover:bg-brand-secondary transition-colors"
                >
                  <FaTwitter className="text-sm" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-9 h-9 bg-white/10 flex items-center justify-center hover:bg-brand-secondary transition-colors"
                >
                  <FaLinkedinIn className="text-sm" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h6 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
                Navigation
              </h6>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-secondary transition-colors group"
                    >
                      <FaArrowRight
                        className="text-xs text-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/learn"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-secondary transition-colors group"
                  >
                    <FaArrowRight
                      className="text-xs text-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                    Learn Online
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-400 transition-colors"
                  >
                    Staff Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h6 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
                Our Courses
              </h6>
              <ul className="space-y-2.5">
                {courseLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-secondary transition-colors group"
                    >
                      <FaArrowRight
                        className="text-xs text-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h6 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
                Contact Us
              </h6>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt
                    className="text-brand-secondary mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-gray-400">
                    04 Annecke Street, Premier Park,<br />
                    Tzaneen, 0850
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhone className="text-brand-secondary shrink-0" aria-hidden="true" />
                  <a
                    href="tel:+27155900732"
                    className="text-sm text-gray-400 hover:text-brand-secondary transition-colors"
                  >
                    +(27) 15-5900-732
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaWhatsapp className="text-brand-secondary shrink-0" aria-hidden="true" />
                  <a
                    href="https://api.whatsapp.com/send?phone=27664832441"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-brand-secondary transition-colors"
                  >
                    +27 66 483 2441
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-brand-secondary shrink-0" aria-hidden="true" />
                  <a
                    href="mailto:headoffice@ndzalama.org.za"
                    className="text-sm text-gray-400 hover:text-brand-secondary transition-colors"
                  >
                    headoffice@ndzalama.org.za
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="py-5">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Ndzalama Training Institute. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-brand-secondary transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms-of-use" className="hover:text-brand-secondary transition-colors">
              Terms of Use
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/learn" className="hover:text-brand-secondary transition-colors">
              Learn Online
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
