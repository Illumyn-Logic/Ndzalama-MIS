'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaTimes,
  FaCommentDots,
} from 'react-icons/fa';

interface ContactBubbleProps {
  /** Show bubble when scrolled (header contact bar hidden) */
  show: boolean;
}

export function ContactBubble({ show }: ContactBubbleProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-40 transition-all duration-300',
        show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none',
      )}
    >
      {/* Expanded contact options */}
      {expanded && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-[#1f2028] border-2 border-brand-primary shadow-2xl p-4 w-64 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-bold text-brand-primary dark:text-brand-secondary">
              Get In Touch
            </h3>
            <button
              onClick={() => setExpanded(false)}
              className="text-gray-400 hover:text-brand-secondary transition-colors"
              aria-label="Close contact options"
            >
              <FaTimes className="text-sm" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-2">
            {/* Email */}
            <a
              href="mailto:headoffice@ndzalama.org.za"
              className="flex items-center gap-3 p-2 hover:bg-brand-secondary/10 transition-colors group"
            >
              <div className="flex h-8 w-8 items-center justify-center bg-brand-primary text-white group-hover:bg-brand-secondary transition-colors">
                <FaEnvelope className="text-sm" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-text-primary dark:text-gray-300">
                  Email Us
                </p>
                <p className="text-[10px] text-text-muted truncate">
                  headoffice@ndzalama.org.za
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+27155900732"
              className="flex items-center gap-3 p-2 hover:bg-brand-secondary/10 transition-colors group"
            >
              <div className="flex h-8 w-8 items-center justify-center bg-brand-primary text-white group-hover:bg-brand-secondary transition-colors">
                <FaPhone className="text-sm" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-text-primary dark:text-gray-300">
                  Call Us
                </p>
                <p className="text-[10px] text-text-muted">+(27) 15-5900-732</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://api.whatsapp.com/send?phone=27664832441"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 hover:bg-brand-secondary/10 transition-colors group"
            >
              <div className="flex h-8 w-8 items-center justify-center bg-[#25D366] text-white group-hover:bg-[#1ebe57] transition-colors">
                <FaWhatsapp className="text-sm" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-text-primary dark:text-gray-300">
                  WhatsApp
                </p>
                <p className="text-[10px] text-text-muted">Chat with us</p>
              </div>
            </a>

            {/* Social media */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">
                Follow Us
              </p>
              <div className="flex items-center gap-2">
                {[
                  {
                    href: 'https://www.facebook.com/ndzalamatraining.co.za',
                    label: 'Facebook',
                    Icon: FaFacebookF,
                    color: 'hover:bg-[#1877f2]',
                  },
                  { href: '#', label: 'Instagram', Icon: FaInstagram, color: 'hover:bg-[#e4405f]' },
                  { href: '#', label: 'Twitter', Icon: FaTwitter, color: 'hover:bg-[#1da1f2]' },
                  { href: '#', label: 'LinkedIn', Icon: FaLinkedinIn, color: 'hover:bg-[#0a66c2]' },
                ].map(({ href, label, Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={href !== '#' ? '_blank' : undefined}
                    rel={href !== '#' ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-gray-300 hover:text-white transition-colors',
                      color,
                    )}
                  >
                    <Icon className="text-sm" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main bubble button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          'flex h-14 w-14 items-center justify-center bg-brand-secondary text-white shadow-lg hover:bg-brand-secondary-dark transition-all duration-200 hover:scale-110',
          expanded && 'bg-brand-primary hover:bg-brand-primary-dark',
        )}
        aria-label={expanded ? 'Close contact options' : 'Open contact options'}
        aria-expanded={expanded}
      >
        {expanded ? (
          <FaTimes className="text-xl" aria-hidden="true" />
        ) : (
          <FaCommentDots className="text-xl" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
