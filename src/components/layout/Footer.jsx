import { Container } from '../ui/Container';

export const Footer = () => {
  return (
    <footer className="bg-[#f9f9f9] dark:bg-[#1f2028] border-t border-[#e5e4e7] dark:border-[#2e303a] mt-auto">
      <Container className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-[#006600] dark:text-[#84ba3f]">Ndzalama Training</h3>
            <p className="mt-2 text-sm text-[#666] dark:text-gray-400">
              04 Annecke street, Premier Park, TZN, 00850
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#333] dark:text-white">Contact</h4>
            <p className="mt-2 text-sm text-[#666] dark:text-gray-400">
              <a href="tel:+27155900732" className="hover:text-[#84ba3f]">+(27) 15-5900-732</a>
            </p>
            <p className="text-sm text-[#666] dark:text-gray-400">
              <a href="mailto:headoffice@ndzalama.org.za" className="hover:text-[#84ba3f]">
                headoffice@ndzalama.org.za
              </a>
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#333] dark:text-white">Follow Us</h4>
            <div className="mt-2 flex justify-center md:justify-start gap-4">
              <a href="#" className="text-[#666] dark:text-gray-400 hover:text-[#84ba3f]">FB</a>
              <a href="#" className="text-[#666] dark:text-gray-400 hover:text-[#84ba3f]">IG</a>
              <a href="#" className="text-[#666] dark:text-gray-400 hover:text-[#84ba3f]">LI</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-[#e5e4e7] dark:border-[#2e303a] text-center text-sm text-[#666] dark:text-gray-400">
          © {new Date().getFullYear()} Ndzalama Training. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};