'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaFacebookF,
  FaTimes,
  FaComments,
} from 'react-icons/fa';

export function ContactBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded contact card */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <h3 className="text-sm font-bold text-brand-primary dark:text-brand-secondary mb-4 uppercase tracking-wide">
            Get In Touch
          </h3>
          
          <div className="space-y-3">
            <a
              href="mailto:headoffice@ndzalama.org.za"
              className="flex items-center gap-3 p-2 hover:bg-brand-neutral dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center bg-brand-secondary/10 text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                <FaEnvelope aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-text-primary dark:text-gray-300">Email Us</p>
                <p className="text-[10px] text-text-muted truncate">headoffice@ndzalama.org.za</p>
              </div>
            </a>

            <a
              href="tel:+27155900732"
              className="flex items-center gap-3 p-2 hover:bg-brand-neutral dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center bg-brand-secondary/10 text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                <FaPhone aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-text-primary dark:text-gray-300">Call Us</p>
                <p className="text-[10px] text-text-muted">+(27) 15-5900-732</p>
              </div>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=27664832441"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 hover:bg-brand-neutral dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center bg-brand-secondary/10 text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                <FaWhatsapp aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-text-primary dark:text-gray-300">WhatsApp</p>
                <p className="text-[10px] text-text-muted">+27 66 483 2441</p>
              </div>
            </a>
          </div>

          <div className="mt-4 pt-4 border-t border-[#e5e4e7] dark:border-[#2e303a]">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted mb-2">Follow Us</p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/ndzalamatraining.co.za"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-colors"
              >
                <FaFacebookF className="text-xs" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-colors"
              >
                <FaFacebookF className="text-xs" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-8 w-8 items-center justify-center bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-colors"
              >
                <FaFacebookF className="text-xs" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-colors"
              >
                <FaFacebookF className="text-xs" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-14 w-14 items-center justify-center bg-brand-secondary text-white shadow-2xl hover:bg-brand-secondary-dark transition-all duration-200',
          isOpen && 'bg-gray-600 hover:bg-gray-700'
        )}
        aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <FaTimes className="text-xl" aria-hidden="true" />
        ) : (
          <FaComments className="text-xl" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
