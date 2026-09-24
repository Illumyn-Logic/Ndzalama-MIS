import Link from 'next/link';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export function LearnFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-[#0a0a0a] border-t border-slate-200 dark:border-[#2e303a] mt-auto">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#006600] dark:text-[#84ba3f] mb-4">
              Contact Polokwane HQ
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#84ba3f] mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  04 Annecke Street, Premier Park,<br />
                  Tzaneen, 0850
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-[#84ba3f] shrink-0" aria-hidden="true" />
                <a href="tel:+27155900732" className="hover:text-[#84ba3f] transition-colors">
                  +(27) 15-5900-732
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-[#84ba3f] shrink-0" aria-hidden="true" />
                <a
                  href="https://api.whatsapp.com/send?phone=27664832441"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#84ba3f] transition-colors"
                >
                  +27 66 483 2441
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#84ba3f] shrink-0" aria-hidden="true" />
                <a
                  href="mailto:headoffice@ndzalama.org.za"
                  className="hover:text-[#84ba3f] transition-colors"
                >
                  headoffice@ndzalama.org.za
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#006600] dark:text-[#84ba3f] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/learn" className="hover:text-[#84ba3f] transition-colors">
                  LMS Home
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-[#84ba3f] transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/learn/about" className="hover:text-[#84ba3f] transition-colors">
                  About Ndzalama
                </Link>
              </li>
              <li>
                <Link href="/learn/about" className="hover:text-[#84ba3f] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-[#84ba3f] transition-colors">
                  Verify Certificate
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#84ba3f] transition-colors">
                  Main Website
                </Link>
              </li>
            </ul>
          </div>

          {/* Accreditation & Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#006600] dark:text-[#84ba3f] mb-4">
              Accreditation
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 mb-6">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#84ba3f]" aria-hidden="true" />
                ETDP SETA Accredited (ETDP0204)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#84ba3f]" aria-hidden="true" />
                QCTO Registered Provider
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#84ba3f]" aria-hidden="true" />
                SAQA Aligned Programmes
              </li>
            </ul>

            <h4 className="text-sm font-bold uppercase tracking-wider text-[#006600] dark:text-[#84ba3f] mb-3">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/ndzalamatraining.co.za"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-[#84ba3f] hover:text-white transition-all text-slate-600 dark:text-slate-400"
              >
                <FaFacebookF className="text-sm" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-[#84ba3f] hover:text-white transition-all text-slate-600 dark:text-slate-400"
              >
                <FaInstagram className="text-sm" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-[#84ba3f] hover:text-white transition-all text-slate-600 dark:text-slate-400"
              >
                <FaTwitter className="text-sm" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-[#84ba3f] hover:text-white transition-all text-slate-600 dark:text-slate-400"
              >
                <FaLinkedinIn className="text-sm" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 dark:border-[#2e303a] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            &copy; {currentYear} Ndzalama Training Institute. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#84ba3f] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link href="/terms-of-use" className="hover:text-[#84ba3f] transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
