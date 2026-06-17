import { Container } from '../components/ui/Container';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';

export const Contact = () => (
    <section className="py-16">
        <Container>
            <SectionTitle title="Get in Touch" subtitle="We'd love to hear from you" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-[#333] dark:text-white">Address</h3>
                            <p className="mt-1 text-[#666] dark:text-gray-400">04 Annecke street, Premier Park, TZN, 00850</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-[#333] dark:text-white">Phone</h3>
                            <p className="mt-1 text-[#666] dark:text-gray-400">
                                <a href="tel:+27155900732" className="hover:text-[#84ba3f]">+(27) 15-5900-732</a>
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-[#333] dark:text-white">Email</h3>
                            <p className="mt-1 text-[#666] dark:text-gray-400">
                                <a href="mailto:headoffice@ndzalama.org.za" className="hover:text-[#84ba3f]">headoffice@ndzalama.org.za</a>
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-[#333] dark:text-white">WhatsApp</h3>
                            <p className="mt-1 text-[#666] dark:text-gray-400">
                                <a href="https://api.whatsapp.com/send?phone=27664832441" target="_blank" rel="noopener noreferrer" className="hover:text-[#84ba3f]">
                                    Chat with us
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Simple contact form (just UI) */}
                    <form className="space-y-4">
                        <input placeholder="Your Name" className="w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white" />
                        <input placeholder="Your Email" type="email" className="w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white" />
                        <textarea placeholder="Your Message" rows="4" className="w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white" />
                        <Button className="w-full">Send Message</Button>
                    </form>
                </div>
            </div>
        </Container>
    </section>
);