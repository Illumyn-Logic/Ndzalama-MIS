import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../../data/navLinks';
import { Container } from '../ui/Container';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white dark:bg-[#16171d] border-b border-[#e5e4e7] dark:border-[#2e303a]">
            <Container className="py-4 flex items-center justify-between">
                <NavLink to="/" className="text-2xl font-bold text-[#006600] dark:text-[#84ba3f]">
                    Ndzalama
                </NavLink>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.href}
                            to={link.href}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors hover:text-[#84ba3f] ${isActive ? 'text-[#84ba3f]' : 'text-[#333] dark:text-gray-300'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-[#333] dark:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                    </svg>
                </button>
            </Container>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden border-t border-[#e5e4e7] dark:border-[#2e303a] py-4">
                    <Container className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.href}
                                to={link.href}
                                className={({ isActive }) =>
                                    `block py-2 text-sm font-medium transition-colors hover:text-[#84ba3f] ${isActive ? 'text-[#84ba3f]' : 'text-[#333] dark:text-gray-300'
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </Container>
                </div>
            )}
        </header>
    );
};