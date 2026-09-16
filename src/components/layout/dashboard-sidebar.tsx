'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemoAuth } from '@/context/demo-auth-context';
import { type UserRole } from '@/lib/offline-data';
import { cn } from '@/lib/utils';
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaCalendarAlt,
  FaShieldAlt,
  FaFileExport,
  FaTasks,
  FaCheckDouble,
  FaChalkboardTeacher,
  FaCertificate,
  FaFileUpload,
  FaHome,
  FaCog,
  FaGraduationCap,
  FaFileSignature,
  FaChartLine,
  FaComments,
  FaChartPie,
  FaUsersCog,
  FaQuestionCircle,
  FaReceipt,
  FaIdCard,
} from 'react-icons/fa';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const roleNavigations: Record<UserRole, { title: string; subtitle: string; items: NavItem[] }> = {
  visitor: {
    title: 'Public Portal',
    subtitle: 'Ndzalama Training',
    items: [
      { label: 'Website Home', href: '/', icon: <FaHome aria-hidden="true" /> },
      { label: 'Browse Courses', href: '/courses', icon: <FaBook aria-hidden="true" /> },
      { label: 'Latest Updates', href: '/posts', icon: <FaClipboardList aria-hidden="true" /> },
      { label: 'Verify Credential', href: '/verify', icon: <FaCertificate aria-hidden="true" /> },
      { label: 'Apply Now', href: '/apply', icon: <FaUserGraduate aria-hidden="true" /> },
    ],
  },
  learner: {
    title: 'Learner LMS',
    subtitle: 'Candidate Workspace',
    items: [
      { label: 'My Learning Journey', href: '/dashboard/learner', icon: <FaTachometerAlt aria-hidden="true" /> },
      { label: 'Interactive Lessons', href: '/dashboard/learner?tab=lessons', icon: <FaBook aria-hidden="true" /> },
      { label: 'Quizzes & Knowledge', href: '/dashboard/learner?tab=quiz', icon: <FaQuestionCircle aria-hidden="true" /> },
      { label: 'Portfolio (PoE)', href: '/dashboard/learner?tab=poe', icon: <FaFileUpload aria-hidden="true" /> },
      { label: 'Results & Feedback', href: '/dashboard/learner?tab=results', icon: <FaCheckDouble aria-hidden="true" /> },
      { label: 'Certificates', href: '/dashboard/learner?tab=certificates', icon: <FaCertificate aria-hidden="true" /> },
      { label: 'NLRD Master Profile', href: '/dashboard/learner?tab=profile', icon: <FaIdCard aria-hidden="true" /> },
      { label: 'Billing & Invoices', href: '/dashboard/learner?tab=billing', icon: <FaReceipt aria-hidden="true" /> },
    ],
  },
  facilitator: {
    title: 'Facilitator Portal',
    subtitle: 'Classroom & Cohorts',
    items: [
      { label: 'Facilitator Overview', href: '/dashboard/facilitator', icon: <FaTachometerAlt aria-hidden="true" /> },
      { label: 'Attendance Register', href: '/dashboard/facilitator#attendance', icon: <FaChalkboardTeacher aria-hidden="true" /> },
      { label: 'Active Cohorts', href: '/dashboard/facilitator#cohorts', icon: <FaCalendarAlt aria-hidden="true" /> },
      { label: 'Class Materials', href: '/dashboard/facilitator#resources', icon: <FaBook aria-hidden="true" /> },
      { label: 'Learner Rosters', href: '/dashboard/facilitator#learners', icon: <FaUserGraduate aria-hidden="true" /> },
    ],
  },
  assessor: {
    title: 'Assessor Workbench',
    subtitle: 'Competency Evaluation',
    items: [
      { label: 'Assessment Queue', href: '/dashboard/assessor', icon: <FaTasks aria-hidden="true" /> },
      { label: 'PoE Evaluations', href: '/dashboard/assessor#queue', icon: <FaClipboardList aria-hidden="true" /> },
      { label: 'Scoring Rubrics', href: '/dashboard/assessor#rubrics', icon: <FaCheckDouble aria-hidden="true" /> },
      { label: 'Remediation Plans', href: '/dashboard/assessor#remediation', icon: <FaShieldAlt aria-hidden="true" /> },
      { label: 'Completed Reviews', href: '/dashboard/assessor#history', icon: <FaCertificate aria-hidden="true" /> },
    ],
  },
  moderator: {
    title: 'Moderator QA Portal',
    subtitle: 'Quality Assurance',
    items: [
      { label: 'Moderation Queue', href: '/dashboard/moderator', icon: <FaShieldAlt aria-hidden="true" /> },
      { label: '10% Cohort Samples', href: '/dashboard/moderator#samples', icon: <FaCheckDouble aria-hidden="true" /> },
      { label: 'QA Compliance Reports', href: '/dashboard/moderator#reports', icon: <FaFileExport aria-hidden="true" /> },
      { label: 'SETA Verification Prep', href: '/dashboard/moderator#seta', icon: <FaCertificate aria-hidden="true" /> },
    ],
  },
  sme_mentor: {
    title: 'Host Employer Portal',
    subtitle: 'Workplace Mentorship',
    items: [
      { label: 'Mentor Dashboard', href: '/dashboard/admin', icon: <FaTachometerAlt aria-hidden="true" /> },
      { label: 'Logbook Sign-Offs', href: '/dashboard/admin?tab=progress', icon: <FaClipboardList aria-hidden="true" /> },
      { label: 'Placed Learners', href: '/dashboard/admin?tab=progress', icon: <FaUserGraduate aria-hidden="true" /> },
    ],
  },
  admin: {
    title: 'LMIS Operations',
    subtitle: 'Registrar & Admin',
    items: [
      { label: 'Dashboard Hub', href: '/dashboard/admin?tab=overview', icon: <FaTachometerAlt aria-hidden="true" /> },
      { label: 'Programs & Quals', href: '/dashboard/admin?tab=programs', icon: <FaGraduationCap aria-hidden="true" /> },
      { label: 'Courses & Lessons', href: '/dashboard/admin?tab=courses', icon: <FaBook aria-hidden="true" /> },
      { label: 'Manage Staff', href: '/dashboard/admin?tab=staff', icon: <FaChalkboardTeacher aria-hidden="true" /> },
      { label: 'Manage Applications', href: '/dashboard/admin?tab=applications', icon: <FaFileSignature aria-hidden="true" /> },
      { label: 'Assessments & Quizzes', href: '/dashboard/admin?tab=quizzes', icon: <FaTasks aria-hidden="true" /> },
      { label: 'Learner Progress', href: '/dashboard/admin?tab=progress', icon: <FaChartLine aria-hidden="true" /> },
      { label: 'Communication', href: '/dashboard/admin?tab=communication', icon: <FaComments aria-hidden="true" /> },
      { label: 'Reports & Analytics', href: '/dashboard/admin?tab=reports', icon: <FaChartPie aria-hidden="true" /> },
      { label: 'System Settings', href: '/dashboard/admin?tab=settings', icon: <FaCog aria-hidden="true" /> },
    ],
  },
  super_admin: {
    title: 'Executive Portal',
    subtitle: 'Director Governance',
    items: [
      { label: 'Executive Dashboard', href: '/dashboard/admin?tab=overview', icon: <FaTachometerAlt aria-hidden="true" /> },
      { label: 'Programs & Quals', href: '/dashboard/admin?tab=programs', icon: <FaGraduationCap aria-hidden="true" /> },
      { label: 'Courses & Lessons', href: '/dashboard/admin?tab=courses', icon: <FaBook aria-hidden="true" /> },
      { label: 'Manage Staff', href: '/dashboard/admin?tab=staff', icon: <FaChalkboardTeacher aria-hidden="true" /> },
      { label: 'Manage Applications', href: '/dashboard/admin?tab=applications', icon: <FaFileSignature aria-hidden="true" /> },
      { label: 'Assessments & Quizzes', href: '/dashboard/admin?tab=quizzes', icon: <FaTasks aria-hidden="true" /> },
      { label: 'Learner Progress', href: '/dashboard/admin?tab=progress', icon: <FaChartLine aria-hidden="true" /> },
      { label: 'Communication', href: '/dashboard/admin?tab=communication', icon: <FaComments aria-hidden="true" /> },
      { label: 'Reports & Analytics', href: '/dashboard/admin?tab=reports', icon: <FaChartPie aria-hidden="true" /> },
      { label: 'System Settings', href: '/dashboard/admin?tab=settings', icon: <FaCog aria-hidden="true" /> },
    ],
  },
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { currentRole, currentUser } = useDemoAuth();

  const config = roleNavigations[currentRole] || roleNavigations.admin;

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-72 bg-[#03367A] text-white shadow-2xl hidden lg:flex flex-col">
      {/* Brand Header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#84ba3f] to-[#006600] text-lg font-extrabold text-white shadow-md">
          N
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d8ebbe]">
            {config.subtitle}
          </p>
          <h2 className="text-base font-bold text-white leading-tight">
            {config.title}
          </h2>
        </div>
      </div>

      {/* User Persona Profile Strip */}
      <div className="mx-3 mt-4 p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#84ba3f] text-white text-sm font-bold flex items-center justify-center shrink-0 shadow">
          {currentUser.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
          <p className="text-[11px] text-sky-200/80 truncate">{currentUser.title}</p>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto" aria-label="Dashboard navigation">
        {config.items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all',
                isActive
                  ? 'bg-white/15 text-white shadow-inner ring-1 ring-white/20'
                  : 'text-sky-100/80 hover:bg-white/5 hover:text-white'
              )}
            >
              <span className="text-sm shrink-0 text-[#84ba3f]">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* System Status Footer */}
      <div className="m-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm text-xs">
        <div className="flex items-center justify-between">
          <span className="text-sky-200/80">Accreditation</span>
          <span className="font-mono font-bold text-[#84ba3f]">ETDP0204</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sky-200/80">System Mode</span>
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Offline Local DB
          </span>
        </div>
      </div>
    </aside>
  );
}
