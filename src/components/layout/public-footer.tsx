import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/ui/theme-toggle';
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
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use', href: '/terms-of-use' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Verify Certificate', href: '/verify' },
  { label: 'Learn Online', href: '/learn' },
];

const courseCategories = [
  { label: 'ETDP SETA', href: '/courses?provider=etdp-seta' },
  { label: 'Services SETA', href: '/courses?provider=services-seta' },
  { label: 'HWSETA', href: '/courses?provider=hwseta' },
  { label: 'Skill Builder', href: '/courses?provider=skill-builder' },
  { label: 'Legacy Unit Standards', href: '/courses?provider=legacy' },
  { label: 'View All Courses', href: '/courses' },
];

export function PublicFooter() {
  return (
    <footer className="mt-auto bg-[#111] text-gray-300 dark:bg-[#071407] dark:text-[#d3dfd0]">
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
              <div className="inline-flex items-center gap-0 overflow-hidden border border-white/20 shadow-xs">
                {[
                  { href: 'https://www.facebook.com/ndzalamatraining.co.za', label: 'Facebook', Icon: FaFacebookF, bg: 'bg-[#efa936] hover:bg-[#df9926]' },
                  { href: '#', label: 'Instagram', Icon: FaInstagram, bg: 'bg-[#249c9b] hover:bg-[#1e8887]' },
                  { href: '#', label: 'Twitter', Icon: FaTwitter, bg: 'bg-[#ed704c] hover:bg-[#d85e3a]' },
                  { href: '#', label: 'LinkedIn', Icon: FaLinkedinIn, bg: 'bg-[#6b6570] hover:bg-[#58535d]' },
                ].map(({ href, label, Icon, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target={href !== '#' ? '_blank' : undefined}
                    rel={href !== '#' ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className={`flex h-9 w-9 items-center justify-center text-white text-sm transition-colors hover:brightness-110 ${bg}`}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h6 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
                Quick Links
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
              </ul>
            </div>

            {/* Course Categories */}
            <div>
              <h6 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
                Course Categories
              </h6>
              <ul className="space-y-2.5">
                {courseCategories.map((link) => (
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
            <ThemeToggle />
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
