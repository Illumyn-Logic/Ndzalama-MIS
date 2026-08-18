'use client';

import { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { courses } from '@/data/courses';

/* ─── shared style tokens ─────────────────────────────────────────── */
const inputClass =
  'mt-1 w-full px-4 py-2.5 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#84ba3f] focus:border-transparent placeholder:text-gray-400';

const labelClass = 'block text-sm font-medium text-[#333] dark:text-white';

const sectionHeadingClass =
  'text-xs font-bold uppercase tracking-[0.18em] text-[#006600] dark:text-[#84ba3f] mb-4 pb-2 border-b border-[#e5e4e7] dark:border-[#2e303a]';

/* ─── form state type ─────────────────────────────────────────────── */
interface ApplicationFormData {
  /* INFORMATION I — personal */
  full_name: string;
  age: string;
  address: string;
  town_city: string;
  province: string;
  education: string;

  /* INFORMATION II — course preferences */
  course: string;
  attendance: string;
  qualifications_experience: string;
  workshop_date: string;

  /* attachments */
  application_form: File | null;
  cert_personal_docs: File | null;

  /* contact */
  email: string;
  phone: string;

  /* notice / comments */
  comments: string;
}

const provinces = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape',
];

const attendanceOptions = [
  'Full Time',
  'Distance Based',
  'Consulting',
  'Not Sure Yet',
];

const qualExpOptions = [
  'No Qualifications – No Experience',
  'No Qualifications – Experienced',
  'Qualified – No Experience',
  'Qualified & Experienced',
  'Highly Qualified – No Experience',
  'No Qualifications – Highly Experienced',
  'Highly Qualified & Highly Experienced',
];

const COMMENT_MAX = 1000;

/* ─── field error display ─────────────────────────────────────────── */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-500">
      {message}
    </p>
  );
}

/* ─── file input ──────────────────────────────────────────────────── */
interface FileFieldProps {
  id: string;
  label: string;
  required?: boolean;
  accept?: string;
  value: File | null;
  errorId?: string;
  onChange: (file: File | null) => void;
}

function FileField({ id, label, required, accept, value, errorId, onChange }: FileFieldProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}{' '}
        {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </label>
      <div className="mt-1 flex items-center gap-3">
        <input
          ref={ref}
          id={id}
          type="file"
          accept={accept ?? '.pdf,.doc,.docx,.jpg,.png'}
          className="sr-only"
          aria-describedby={errorId}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="px-4 py-2 text-sm rounded-lg border border-[#e5e4e7] dark:border-[#2e303a] bg-white dark:bg-[#16171d] text-[#333] dark:text-gray-300 hover:border-[#84ba3f] hover:text-[#84ba3f] transition-colors"
        >
          {value ? 'Change file' : 'Choose file'}
        </button>
        <span className="text-sm text-[#666] dark:text-gray-400 truncate max-w-[220px]">
          {value ? value.name : 'No file chosen'}
        </span>
      </div>
    </div>
  );
}

/* ─── main component ──────────────────────────────────────────────── */
export function ApplyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get('course') ?? '';

  const [form, setForm] = useState<ApplicationFormData>({
    full_name: '',
    age: '',
    address: '',
    town_city: '',
    province: '',
    education: '',
    course: courseSlug,
    attendance: '',
    qualifications_experience: '',
    workshop_date: '',
    application_form: null,
    cert_personal_docs: null,
    email: '',
    phone: '',
    comments: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  function set<K extends keyof ApplicationFormData>(key: K, value: ApplicationFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleText(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    set(name as keyof ApplicationFormData, value as never);
    if (name === 'comments') setCharCount(value.length);
  }

  function validate(): boolean {
    const next: typeof errors = {};

    // Info I
    if (!form.full_name.trim()) next.full_name = 'Full name is required.';
    if (!form.age.trim()) next.age = 'Age is required.';
    else if (isNaN(Number(form.age)) || Number(form.age) < 16 || Number(form.age) > 99)
      next.age = 'Enter a valid age (16–99).';
    if (!form.address.trim()) next.address = 'Address is required.';
    if (!form.town_city.trim()) next.town_city = 'Town / City is required.';
    if (!form.province) next.province = 'Please select a province.';
    if (!form.education.trim()) next.education = 'Highest education level is required.';

    // Info II
    if (!form.course) next.course = 'Please select a course.';
    if (!form.attendance) next.attendance = 'Please select an attendance type.';
    if (!form.qualifications_experience)
      next.qualifications_experience = 'Please select your qualifications & experience level.';

    // Contact
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email address.';
    if (!form.phone.trim()) next.phone = 'Phone number is required.';

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      // Scroll to first error
      const el = document.querySelector('[role="alert"]');
      if (el) (el as HTMLElement).closest('div')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSubmitting(true);
    // TODO: wire up to API route / server action with FormData for file uploads
    await new Promise((res) => setTimeout(res, 800));
    router.push('/thank-you');
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-3xl mx-auto"
      encType="multipart/form-data"
    >
      {/* Sign-in nudge for returning users */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-3 rounded-xl bg-[#f0f7e6] dark:bg-[#1a2415] border border-[#84ba3f]/30 px-5 py-3">
        <p className="text-sm text-[#4a4f57] dark:text-gray-300">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#84ba3f] hover:underline">
            Student Portal
          </Link>{' '}
          to pre-fill your details.
        </p>
        <p className="text-sm text-[#4a4f57] dark:text-gray-300">
          New here?{' '}
          <Link
            href={`/register${form.course ? `?course=${form.course}` : ''}`}
            className="font-semibold text-[#6b7280] dark:text-gray-400 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>

      <div className="space-y-10">
        {/* ── SECTION I: Personal information ── */}
        <section aria-labelledby="section-info1">
          <h2 id="section-info1" className={sectionHeadingClass}>
            Information I — Personal Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full name */}
            <div className="sm:col-span-2">
              <label htmlFor="full_name" className={labelClass}>
                Full Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                autoComplete="name"
                value={form.full_name}
                onChange={handleText}
                className={inputClass}
                aria-describedby={errors.full_name ? 'full-name-error' : undefined}
              />
              <FieldError id="full-name-error" message={errors.full_name} />
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className={labelClass}>
                Age <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min={16}
                max={99}
                value={form.age}
                onChange={handleText}
                className={inputClass}
                aria-describedby={errors.age ? 'age-error' : undefined}
              />
              <FieldError id="age-error" message={errors.age} />
            </div>

            {/* Province */}
            <div>
              <label htmlFor="province" className={labelClass}>
                Province <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <select
                id="province"
                name="province"
                value={form.province}
                onChange={handleText}
                className={inputClass}
                aria-describedby={errors.province ? 'province-error' : undefined}
              >
                <option value="">— Select Province —</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <FieldError id="province-error" message={errors.province} />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label htmlFor="address" className={labelClass}>
                Address <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                value={form.address}
                onChange={handleText}
                className={inputClass}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              <FieldError id="address-error" message={errors.address} />
            </div>

            {/* Town / City */}
            <div>
              <label htmlFor="town_city" className={labelClass}>
                Town / City <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="town_city"
                name="town_city"
                type="text"
                autoComplete="address-level2"
                value={form.town_city}
                onChange={handleText}
                className={inputClass}
                aria-describedby={errors.town_city ? 'town-error' : undefined}
              />
              <FieldError id="town-error" message={errors.town_city} />
            </div>

            {/* Education */}
            <div>
              <label htmlFor="education" className={labelClass}>
                Highest Education <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="education"
                name="education"
                type="text"
                placeholder="e.g. Matric, Diploma, Degree"
                value={form.education}
                onChange={handleText}
                className={inputClass}
                aria-describedby={errors.education ? 'education-error' : undefined}
              />
              <FieldError id="education-error" message={errors.education} />
            </div>
          </div>
        </section>

        {/* ── SECTION II: Course information ── */}
        <section aria-labelledby="section-info2">
          <h2 id="section-info2" className={sectionHeadingClass}>
            Information II — Course Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Course */}
            <div className="sm:col-span-2">
              <label htmlFor="course" className={labelClass}>
                Course <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <select
                id="course"
                name="course"
                value={form.course}
                onChange={handleText}
                className={inputClass}
                aria-describedby={errors.course ? 'course-error' : undefined}
              >
                <option value="">— Please Select Option —</option>
                {courses.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))}
              </select>
              <FieldError id="course-error" message={errors.course} />
            </div>

            {/* Attendance */}
            <div>
              <label htmlFor="attendance" className={labelClass}>
                Attendance <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <select
                id="attendance"
                name="attendance"
                value={form.attendance}
                onChange={handleText}
                className={inputClass}
                aria-describedby={errors.attendance ? 'attendance-error' : undefined}
              >
                <option value="">— Please Select Option —</option>
                {attendanceOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <FieldError id="attendance-error" message={errors.attendance} />
            </div>

            {/* Qualifications & Experience */}
            <div>
              <label htmlFor="qualifications_experience" className={labelClass}>
                Qualifications & Experience <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <select
                id="qualifications_experience"
                name="qualifications_experience"
                value={form.qualifications_experience}
                onChange={handleText}
                className={inputClass}
                aria-describedby={errors.qualifications_experience ? 'qual-exp-error' : undefined}
              >
                <option value="">— Please Select Option —</option>
                {qualExpOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <FieldError id="qual-exp-error" message={errors.qualifications_experience} />
            </div>

            {/* Workshop date */}
            <div>
              <label htmlFor="workshop_date" className={labelClass}>
                Preferred Workshop Date{' '}
                <span className="text-[#999] font-normal">(optional)</span>
              </label>
              <input
                id="workshop_date"
                name="workshop_date"
                type="date"
                value={form.workshop_date}
                onChange={handleText}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* ── SECTION: Attachments ── */}
        <section aria-labelledby="section-attachments">
          <h2 id="section-attachments" className={sectionHeadingClass}>
            Attachments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FileField
              id="application_form"
              label="Attach Application Form"
              accept=".pdf,.doc,.docx"
              value={form.application_form}
              onChange={(f) => set('application_form', f)}
            />
            <FileField
              id="cert_personal_docs"
              label="Attach Certificates / Personal Docs"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              value={form.cert_personal_docs}
              onChange={(f) => set('cert_personal_docs', f)}
            />
          </div>
          <p className="mt-2 text-xs text-[#999]">
            Accepted formats: PDF, DOC, DOCX, JPG, PNG. Max 10 MB per file.
          </p>
        </section>

        {/* ── SECTION: Contact information ── */}
        <section aria-labelledby="section-contact">
          <h2 id="section-contact" className={sectionHeadingClass}>
            Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleText}
                className={inputClass}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              <FieldError id="email-error" message={errors.email} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+27 ..."
                value={form.phone}
                onChange={handleText}
                className={inputClass}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              <FieldError id="phone-error" message={errors.phone} />
            </div>
          </div>
        </section>

        {/* ── SECTION: Notice / Comments ── */}
        <section aria-labelledby="section-comments">
          <h2 id="section-comments" className={sectionHeadingClass}>
            Notice / Comments / Questions
          </h2>
          <div>
            <label htmlFor="comments" className={labelClass}>
              Comments{' '}
              <span className="text-[#999] font-normal">(optional)</span>
            </label>
            <textarea
              id="comments"
              name="comments"
              rows={4}
              maxLength={COMMENT_MAX}
              value={form.comments}
              onChange={handleText}
              placeholder="Any questions, special requirements or additional information…"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-right text-[#999]">
              {COMMENT_MAX - charCount} characters remaining
            </p>
          </div>
        </section>

        {/* ── Submit ── */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl font-semibold text-base bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          >
            {submitting ? 'Submitting application…' : 'Submit Application'}
          </button>
          <p className="mt-3 text-xs text-center text-[#999]">
            By submitting you agree to our{' '}
            <Link href="/privacy-policy" className="text-[#84ba3f] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </form>
  );
}
