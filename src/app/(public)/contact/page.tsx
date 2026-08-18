import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ndzalama Training.',
};

export default function ContactPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionTitle title="Get in Touch" subtitle="We'd love to hear from you" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#333] dark:text-white">
                Address
              </h3>
              <p className="mt-1 text-[#666] dark:text-gray-400">
                04 Annecke street, Premier Park, TZN, 00850
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#333] dark:text-white">
                Phone
              </h3>
              <p className="mt-1 text-[#666] dark:text-gray-400">
                <a
                  href="tel:+27155900732"
                  className="hover:text-[#84ba3f] transition-colors"
                >
                  +(27) 15-5900-732
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#333] dark:text-white">
                Email
              </h3>
              <p className="mt-1 text-[#666] dark:text-gray-400">
                <a
                  href="mailto:headoffice@ndzalama.org.za"
                  className="hover:text-[#84ba3f] transition-colors"
                >
                  headoffice@ndzalama.org.za
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#333] dark:text-white">
                WhatsApp
              </h3>
              <p className="mt-1 text-[#666] dark:text-gray-400">
                <a
                  href="https://api.whatsapp.com/send?phone=27664832441"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#84ba3f] transition-colors"
                >
                  Chat with us on WhatsApp
                </a>
              </p>
            </div>
          </div>

          {/* Contact form (client interaction handled with native form) */}
          <form className="space-y-4" action="#" method="POST">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-[#333] dark:text-white"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                className="mt-1 w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-[#333] dark:text-white"
              >
                Your Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                className="mt-1 w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-[#333] dark:text-white"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="How can we help?"
                className="mt-1 w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
