'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';

const inputClass =
  'mt-1 w-full px-4 py-2.5 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#333] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#84ba3f] focus:border-transparent placeholder:text-gray-400';

const labelClass = 'block text-sm font-medium text-[#333] dark:text-white';

const SA_PROVINCES = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape',
] as const;

interface FormData {
  full_name: string;
  age: string;
  province: string;
  address: string;
  town_city: string;
  highest_education: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    full_name: '',
    age: '',
    province: '',
    address: '',
    town_city: '',
    highest_education: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const next: FormErrors = {};

    if (!form.full_name.trim()) next.full_name = 'Full name is required.';

    const ageNum = parseInt(form.age, 10);
    if (!form.age.trim()) next.age = 'Age is required.';
    else if (isNaN(ageNum) || ageNum < 16 || ageNum > 99)
      next.age = 'Please enter a valid age (16–99).';

    if (!form.province) next.province = 'Please select a province.';
    if (!form.address.trim()) next.address = 'Address is required.';
    if (!form.town_city.trim()) next.town_city = 'Town / City is required.';
    if (!form.highest_education.trim())
      next.highest_education = 'Highest education is required.';

    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email address.';

    if (!form.phone.trim()) next.phone = 'Phone number is required.';

    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 8)
      next.password = 'Password must be at least 8 characters.';

    if (!form.confirm_password) next.confirm_password = 'Please confirm your password.';
    else if (form.password !== form.confirm_password)
      next.confirm_password = 'Passwords do not match.';

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // TODO: wire up to API route / server action
    await new Promise((res) => setTimeout(res, 600));
    router.push('/login');
  }

  function field(
    id: keyof FormData,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement>,
  ) {
    return (
      <div>
        <label htmlFor={id} className={labelClass}>
          {label} <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id={id}
          name={id}
          value={form[id]}
          onChange={handleChange}
          className={inputClass}
          aria-describedby={errors[id] ? `${id}-error` : undefined}
          {...props}
        />
        {errors[id] && (
          <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-500">
            {errors[id]}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] py-12 px-4">
      <Container className="max-w-lg w-full">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/images/brand/logo.png"
              alt="Ndzalama Training"
              width={160}
              height={48}
              className="h-14 w-auto object-contain mx-auto"
              priority
            />
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[#333] dark:text-white">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-[#666] dark:text-gray-400">
            Register to access the Student Portal and submit your application.
          </p>
        </div>

        <div className="bg-white dark:bg-[#16171d] rounded-2xl shadow-sm border border-slate-200 dark:border-[#2e303a] p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* ── Personal Details ───────────────────────────── */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#006600] dark:text-[#84ba3f] mb-3">
                Personal Details
              </p>
              <div className="space-y-4">
                {field('full_name', 'Full Name', {
                  type: 'text',
                  autoComplete: 'name',
                  placeholder: 'e.g. Thabo Nkosi',
                })}

                {field('age', 'Age', {
                  type: 'number',
                  min: '16',
                  max: '99',
                  placeholder: 'e.g. 28',
                })}

                {/* Province */}
                <div>
                  <label htmlFor="province" className={labelClass}>
                    Province <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="province"
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    className={inputClass}
                    aria-describedby={errors.province ? 'province-error' : undefined}
                  >
                    <option value="">— Select Province —</option>
                    {SA_PROVINCES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {errors.province && (
                    <p id="province-error" role="alert" className="mt-1 text-xs text-red-500">
                      {errors.province}
                    </p>
                  )}
                </div>

                {field('address', 'Address', {
                  type: 'text',
                  autoComplete: 'street-address',
                  placeholder: 'Street address',
                })}

                {field('town_city', 'Town / City', {
                  type: 'text',
                  autoComplete: 'address-level2',
                  placeholder: 'e.g. Polokwane',
                })}

                {field('highest_education', 'Highest Education', {
                  type: 'text',
                  placeholder: 'e.g. Matric, Diploma, Degree…',
                })}
              </div>
            </div>

            {/* ── Contact Information ────────────────────────── */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#006600] dark:text-[#84ba3f] mb-3">
                Contact Information
              </p>
              <div className="space-y-4">
                {field('email', 'Email', {
                  type: 'email',
                  autoComplete: 'email',
                  placeholder: 'you@example.com',
                })}

                {field('phone', 'Phone', {
                  type: 'tel',
                  autoComplete: 'tel',
                  placeholder: '+27 ...',
                })}
              </div>
            </div>

            {/* ── Password ───────────────────────────────────── */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#006600] dark:text-[#84ba3f] mb-3">
                Password
              </p>
              {field('password', 'Password', {
                type: 'password',
                autoComplete: 'new-password',
                placeholder: 'Min. 8 characters',
              })}
              {field('confirm_password', 'Confirm Password', {
                type: 'password',
                autoComplete: 'new-password',
                placeholder: 'Re-enter your password',
              })}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg font-semibold bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {submitting ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-[#666] dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-[#84ba3f] font-medium hover:underline">
              Student Portal
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
