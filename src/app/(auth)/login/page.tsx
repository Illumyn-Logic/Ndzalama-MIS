import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = { title: 'Student Portal | Ndzalama' };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <Container className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#006600] dark:text-[#84ba3f]">
            Ndzalama
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[#333] dark:text-white">
            Student Portal
          </h1>
        </div>
        <div className="bg-white dark:bg-[#16171d] rounded-2xl shadow-sm border border-slate-200 dark:border-[#2e303a] p-8 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#333] dark:text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#333] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-[#333] dark:text-white">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-[#84ba3f] hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#333] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors"
          >
            Sign In
          </button>
          <p className="text-center text-sm text-[#666] dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#84ba3f] font-medium hover:underline">
              Register
            </Link>
          </p>
          <p className="text-center text-sm text-[#666] dark:text-gray-400">
              Want to apply for a course?{' '}
              <Link href="/register" className="text-[#84ba3f] font-medium hover:underline">
              Apply Now
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
