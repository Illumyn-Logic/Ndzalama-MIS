import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ndzalama Training.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero: Canopy Header */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#102e14] via-[#163f1b] to-[#0c2210] text-white dark:from-[#061408] dark:via-[#091f0c] dark:to-[#040e05] py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(123,198,45,0.15),transparent_60%)]" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 bg-black/25 backdrop-blur-xs border border-white/20 text-xs font-semibold uppercase tracking-[0.22em] text-white/95">
              <span className="h-2 w-2 rounded-full bg-[#efa936] shadow-xs shadow-amber-400" aria-hidden="true" />
              <span>Get In Touch</span>
              <span className="text-white/30">|</span>
              <span className="text-white/80">Support &amp; Enquiries</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              We&apos;d Love to Hear From You
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
              Reach out to our team in Tzaneen for course registrations, SETA compliance advice, corporate group bookings, or accreditation guidance.
            </p>
          </div>
        </Container>
      </section>

      {/* Flush 4-Block Strip */}
      <div className="grid h-2.5 grid-cols-4 gap-0 shadow-xs" aria-hidden="true">
        <span className="bg-[#efa936]" />
        <span className="bg-[#249c9b]" />
        <span className="bg-[#ed704c]" />
        <span className="bg-[#6b6570]" />
      </div>

      <section className="py-16 bg-slate-50 dark:bg-[#0b1a0b] min-h-screen">
        <Container>
          <SectionTitle title="Contact Ndzalama" subtitle="Our team is ready to assist your professional journey" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#122415] border border-slate-200 dark:border-white/10 shadow-sm">
                <h3 className="text-lg font-bold text-[#222] dark:text-white">
                  Head Office
                </h3>
                <p className="mt-1 text-[#666] dark:text-gray-300">
                  04 Annecke street, Premier Park, Tzaneen, 0850
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-[#122415] border border-slate-200 dark:border-white/10 shadow-sm">
                <h3 className="text-lg font-bold text-[#222] dark:text-white">
                  Telephone
                </h3>
                <p className="mt-1 text-[#666] dark:text-gray-300">
                  <a
                    href="tel:+27155900732"
                    className="hover:text-brand-secondary transition-colors font-medium"
                  >
                    +(27) 15-5900-732
                  </a>
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-[#122415] border border-slate-200 dark:border-white/10 shadow-sm">
                <h3 className="text-lg font-bold text-[#222] dark:text-white">
                  Email
                </h3>
                <p className="mt-1 text-[#666] dark:text-gray-300">
                  <a
                    href="mailto:headoffice@ndzalama.org.za"
                    className="hover:text-brand-secondary transition-colors font-medium"
                  >
                    headoffice@ndzalama.org.za
                  </a>
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-[#122415] border border-slate-200 dark:border-white/10 shadow-sm">
                <h3 className="text-lg font-bold text-[#222] dark:text-white">
                  WhatsApp Support
                </h3>
                <p className="mt-1 text-[#666] dark:text-gray-300">
                  <a
                    href="https://api.whatsapp.com/send?phone=27664832441"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-secondary transition-colors font-medium"
                  >
                    Chat with us on WhatsApp &rarr;
                  </a>
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="p-8 rounded-2xl bg-white dark:bg-[#122415] border border-slate-200 dark:border-white/10 shadow-md">
              <h3 className="text-xl font-bold text-[#222] dark:text-white mb-6">
                Send a Message
              </h3>
              <form className="space-y-4" action="#" method="POST">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-[#333] dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 dark:border-white/15 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-[#333] dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-[#333] dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 dark:border-white/15 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-[#333] dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-[#333] dark:text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="How can we help?"
                    className="mt-1.5 w-full px-4 py-2.5 border border-slate-200 dark:border-white/15 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-[#333] dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold bg-brand-primary text-white hover:bg-brand-primary-light transition-colors shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
