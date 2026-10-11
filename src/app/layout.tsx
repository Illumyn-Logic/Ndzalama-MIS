import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthSessionProvider } from '@/context/session-provider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Ndzalama Training',
    default: 'Ndzalama Training — SAQA & QCTO Accredited ETD Provider',
  },
  description:
    'Ndzalama Training offers SAQA-accredited programmes in facilitation, assessment, moderation, SDF, ECD and more. ETDP SETA Accredited: ETDP0204.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0a0a0a] text-text-primary dark:text-white">
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}