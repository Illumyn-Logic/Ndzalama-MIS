'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  FaGraduationCap, 
  FaLaptop, 
  FaChartLine,
  FaCertificate,
  FaCheckCircle,
  FaArrowRight,
  FaBook,
  FaVideo,
  FaClipboardCheck,
  FaAward,
  FaShieldAlt,
  FaMobileAlt,
  FaCloudUploadAlt
} from 'react-icons/fa';

const features = [
  {
    icon: FaLaptop,
    title: 'Learn Anywhere, Anytime',
    description: 'Access your course materials 24/7 from any device with an internet connection.',
  },
  {
    icon: FaBook,
    title: 'Comprehensive Materials',
    description: 'Digital learner guides, workbooks, videos, and interactive assessments all in one place.',
  },
  {
    icon: FaCloudUploadAlt,
    title: 'Digital PoE Submission',
    description: 'Submit your Portfolio of Evidence directly to your assessor with real-time tracking.',
  },
  {
    icon: FaChartLine,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with detailed analytics and completion metrics.',
  },
  {
    icon: FaVideo,
    title: 'Multimedia Content',
    description: 'Engage with video tutorials, presentations, and interactive learning modules.',
  },
  {
    icon: FaMobileAlt,
    title: 'Mobile Responsive',
    description: 'Study on your smartphone or tablet with our fully responsive design.',
  },
  {
    icon: FaAward,
    title: 'Digital Certificates',
    description: 'Receive blockchain-verified certificates upon successful course completion.',
  },
  {
    icon: FaShieldAlt,
    title: 'Secure & Compliant',
    description: 'POPIA-compliant platform with enterprise-grade security for your data.',
  },
];

const benefits = [
  'SETA-accredited qualifications aligned with NQF standards',
  'Direct communication with facilitators and assessors',
  'Automated invoice and payment management',
  'NLRD-compliant learner profiles',
  'Real-time notifications and reminders',
  'Download certificates and transcripts instantly',
];

export default function LearnAboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#006600] via-[#004d00] to-[#03367A] text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#84ba3f] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#03367A] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#84ba3f]/20 text-[#84ba3f] text-sm font-semibold tracking-wide uppercase">
              About Our Learning Platform
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Modern Learning for <span className="text-[#84ba3f]">Today's Workforce</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Ndzalama's Learning Management System (LMS) is designed to make accredited training 
              accessible, engaging, and effective for South African learners.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-[#16171d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-[#84ba3f]/10 text-[#006600] dark:text-[#84ba3f] text-sm font-semibold tracking-wide uppercase">
                Our Mission
              </span>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
                Empowering Learners Through Technology
              </h2>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                We believe that quality education should be accessible to everyone. Our LMS platform 
                removes barriers to learning by providing a seamless, user-friendly experience that 
                puts learners first.
              </p>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Whether you're upskilling for a promotion, changing careers, or pursuing a new 
                qualification, our platform gives you the tools and flexibility to succeed on your own terms.
              </p>

              <div className="flex items-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors"
                >
                  Get Started
                  <FaArrowRight className="text-sm" aria-hidden="true" />
                </Link>
                <Link
                  href="/learn/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-slate-300 dark:border-[#2e303a] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#0a0a0a] transition-colors"
                >
                  Browse Courses
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/backgrounds/hero-02.jpg"
                  alt="Students learning online"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#006600]/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50 dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-[#84ba3f]/10 text-[#006600] dark:text-[#84ba3f] text-sm font-semibold tracking-wide uppercase">
              Platform Features
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Our LMS is packed with features designed to enhance your learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-slate-200 dark:border-[#2e303a] bg-white dark:bg-[#16171d] hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-[#84ba3f]/10 flex items-center justify-center mb-4">
                  <Icon className="text-2xl text-[#84ba3f]" aria-hidden="true" />
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

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-[#16171d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/backgrounds/hero-02.jpg"
                  alt="Dashboard preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#03367A]/80 to-transparent" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-[#84ba3f]/10 text-[#006600] dark:text-[#84ba3f] text-sm font-semibold tracking-wide uppercase">
                Key Benefits
              </span>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
                Why Choose Our LMS?
              </h2>
              
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#84ba3f] mt-1 shrink-0" aria-hidden="true" />
                    <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#006600] to-[#03367A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <FaGraduationCap className="text-5xl text-[#84ba3f] mx-auto mb-4" aria-hidden="true" />
              <p className="text-4xl font-extrabold mb-2">5,000+</p>
              <p className="text-white/80">Learners Trained</p>
            </div>
            <div>
              <FaCertificate className="text-5xl text-[#84ba3f] mx-auto mb-4" aria-hidden="true" />
              <p className="text-4xl font-extrabold mb-2">98%</p>
              <p className="text-white/80">Completion Rate</p>
            </div>
            <div>
              <FaBook className="text-5xl text-[#84ba3f] mx-auto mb-4" aria-hidden="true" />
              <p className="text-4xl font-extrabold mb-2">50+</p>
              <p className="text-white/80">Courses Available</p>
            </div>
            <div>
              <FaAward className="text-5xl text-[#84ba3f] mx-auto mb-4" aria-hidden="true" />
              <p className="text-4xl font-extrabold mb-2">15+</p>
              <p className="text-white/80">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50 dark:bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaGraduationCap className="text-5xl text-[#84ba3f] mx-auto mb-6" aria-hidden="true" />
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of South African learners who have advanced their careers through 
            our platform. Get started today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-lg"
            >
              Create Your Account
              <FaArrowRight className="text-sm" aria-hidden="true" />
            </Link>
            
            <Link
              href="/learn/courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 border-slate-300 dark:border-[#2e303a] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#0a0a0a] transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
