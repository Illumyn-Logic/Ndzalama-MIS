'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Container } from '@/components/ui/container';
import {
  FaLock,
  FaEnvelope,
  FaSignInAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowLeft,
} from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const registered = searchParams.get('registered');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const role = session.user.role;
      // Route to appropriate dashboard based on role
      if (role === 'LEARNER') {
        router.push('/learn/dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  }, [status, session, router]);

  // Show loading while checking auth
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#84ba3f] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError('Invalid email or password.');
        setSubmitting(false);
        return;
      }

      // Let the dashboard/middleware determine the user's role.
      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0a] py-12 px-4">
      <Container className="max-w-md w-full">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <FaArrowLeft aria-hidden="true" />
            Back
          </button>
        </div>

        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#84ba3f]/15 text-[#4c7a1f] dark:text-[#84ba3f] text-xs font-bold uppercase tracking-wider mb-2">
            <FaShieldAlt aria-hidden="true" />
            Ndzalama Single Sign-On
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Learner & Staff Portal
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Sign in to access your modules, submit PoEs, or manage applications.
          </p>
        </div>

        <div className="bg-white dark:bg-[#16171d] rounded-3xl shadow-xl border border-slate-200 dark:border-[#2e303a] p-8 space-y-5">

          {/* Success message after registration */}
          {registered === 'true' && (
            <div
              role="alert"
              className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 p-4 rounded-xl text-sm font-medium text-center flex items-center justify-center gap-2 border border-emerald-200 dark:border-emerald-800"
            >
              <FaCheckCircle aria-hidden="true" />
              Registration successful! Please sign in to continue.
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-xs font-medium text-center"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1"
              >
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
                  aria-hidden="true"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={submitting}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#84ba3f] disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-[#84ba3f] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <FaLock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
                  aria-hidden="true"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  disabled={submitting}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#84ba3f] disabled:opacity-60"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FaSignInAlt aria-hidden="true" />

              {submitting
                ? 'Authenticating…'
                : 'Sign In to Portal'}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center space-y-1.5 text-xs text-slate-500">
            <p>
              Don&apos;t have an account yet?{' '}
              <Link
                href="/register"
                className="text-[#84ba3f] font-bold hover:underline"
              >
                Register & Apply Now
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
