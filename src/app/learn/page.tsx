'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaGraduationCap, 
  FaChartLine, 
  FaCertificate, 
  FaLaptop,
  FaCheckCircle,
  FaArrowRight,
  FaBook,
  FaVideo,
  FaClipboardCheck,
  FaAward
} from 'react-icons/fa';

export default function LearnHomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect authenticated learners to their dashboard
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'LEARNER') {
      router.push('/learn/dashboard');
    }
  }, [status, session, router]);

  // Show loading state while checking auth
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

  // If learner is authenticated, they'll be redirected above
  // This content is only shown to guests
  const benefits = [
    {
      icon: FaLaptop,
      title: '24/7 Access',
      description: 'Study at your own pace, anytime, anywhere with full online access to your course materials.'
    },
    {
      icon: FaBook,
      title: 'Comprehensive Materials',
      description: 'Learner guides, workbooks, videos, and assessments all in one centralized platform.'
    },
    {
      icon: FaClipboardCheck,
      title: 'Digital PoE Submission',
      description: 'Submit your Portfolio of Evidence directly to your assessor with instant tracking.'
    },
    {
      icon: FaAward,
      title: 'Verified Certificates',
      description: 'Receive blockchain-verified digital certificates upon successful completion.'
    }
  ];

  const features = [
    'Interactive course modules with multimedia content',
    'Real-time progress tracking and analytics',
    'Direct communication with facilitators and assessors',
    'Automated invoice and payment management',
    'NLRD-compliant learner profile (enter once, use everywhere)',
    'Mobile-responsive design for learning on any device'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#006600] via-[#004d00] to-[#03367A] text-white">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#84ba3f] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#03367A] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#84ba3f]/20 text-[#84ba3f] text-sm font-semibold tracking-wide uppercase">
                Ndzalama Learning Portal
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Learn, Grow, and <span className="text-[#84ba3f]">Excel</span>
              </h1>
              
              <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                Access your accredited training programmes online. Track your progress, submit assignments, 
                and earn SAQA-recognized certificates—all in one powerful learning management system.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-lg"
                >
                  <FaGraduationCap aria-hidden="true" />
                  Get Started Now
                </Link>
                
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base border-2 border-white/40 text-white hover:bg-white/10 transition-colors"
                >
                  Sign In to Dashboard
                  <FaArrowRight className="text-sm" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#84ba3f]" aria-hidden="true" />
                  <span>ETDP SETA Accredited</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#84ba3f]" aria-hidden="true" />
                  <span>QCTO Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#84ba3f]" aria-hidden="true" />
                  <span>NQF Aligned</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/images/backgrounds/hero-02.jpg"
                  alt="Students learning online"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#006600]/60 to-transparent" />
              </div>
              
              {/* Floating stats cards */}
              <div className="absolute top-10 -left-6 bg-white dark:bg-[#16171d] rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#84ba3f]/20 flex items-center justify-center">
                    <FaGraduationCap className="text-[#84ba3f] text-xl" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">5,000+</p>
                    <p className="text-xs text-slate-500">Learners Trained</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 -right-6 bg-white dark:bg-[#16171d] rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#03367A]/20 flex items-center justify-center">
                    <FaCertificate className="text-[#03367A] text-xl" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">98%</p>
                    <p className="text-xs text-slate-500">Completion Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-[#84ba3f]/10 text-[#006600] dark:text-[#84ba3f] text-sm font-semibold tracking-wide uppercase">
              Why Choose Our LMS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              A comprehensive learning platform designed for South African learners and aligned with SETA requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl border border-slate-200 dark:border-[#2e303a] bg-slate-50 dark:bg-[#16171d] hover:border-[#84ba3f] hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-[#84ba3f]/10 flex items-center justify-center mb-4 group-hover:bg-[#84ba3f] transition-colors">
                  <Icon className="text-2xl text-[#84ba3f] group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section className="py-20 bg-slate-50 dark:bg-[#16171d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-[#84ba3f]/10 text-[#006600] dark:text-[#84ba3f] text-sm font-semibold tracking-wide uppercase">
                Platform Features
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
                Built for Modern Learning
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Our learning management system combines cutting-edge technology with learner-focused design, 
                making it easier than ever to complete your qualifications.
              </p>

              <ul className="space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#84ba3f] mt-1 shrink-0" aria-hidden="true" />
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-[#2e303a]">
                <Image
                  src="/images/backgrounds/hero-02.jpg"
                  alt="LMS Dashboard Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#03367A]/80 via-[#006600]/40 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto">
                      <FaVideo className="text-4xl text-white" aria-hidden="true" />
                    </div>
                    <p className="text-white font-semibold">Watch Demo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#006600] to-[#03367A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaGraduationCap className="text-5xl text-[#84ba3f] mx-auto mb-6" aria-hidden="true" />
          
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of South African learners who have advanced their careers through 
            our accredited training programmes. Registration takes less than 5 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-lg"
            >
              Create Your Account
              <FaArrowRight className="text-sm" aria-hidden="true" />
            </Link>
            
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              Browse Courses
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/70">
            Already have an account?{' '}
            <Link href="/login" className="text-[#84ba3f] font-semibold hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
