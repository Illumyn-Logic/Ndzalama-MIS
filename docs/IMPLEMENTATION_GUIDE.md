# Ndzalama Training MIS - Implementation Guide

**Document Purpose:** Standalone guide for implementing UI redesign and LMIS functional enhancements  
**Last Updated:** October 10, 2026  
**Project Context:** See `PROJECT_SCAN_2026-10-10.md` for complete codebase analysis

---

## Quick Reference

### Current vs Required Brand Colors

| Element | Current Color | Required Color | Hex Code |
|---------|--------------|----------------|----------|
| Primary (Backgrounds, Nav) | Dark Green | Deep Forest Green | `#1B3B1B` |
| Secondary (CTAs, Hover) | Lime Green | Vibrant Leaf Green | `#7BC62D` |
| Neutral (Sections) | Soft Mint | Pale Sage | `#E8F0E8` |
| Body Text | Dark Gray | Dark Neutral | `#222222` |

### Old Colors to Replace

```css
/* FIND AND REPLACE THESE: */
#006600  →  #1B3B1B  (Primary)
#84ba3f  →  #7BC62D  (Accent)
#eef6df  →  #E8F0E8  (Neutral)
#333     →  #222222  (Text)
```

---

## Phase 1: Design System Update (2 Days)

### Objective
Update the entire application to use new brand colors and modern typography.

### Prerequisites
- Next.js 16 with Tailwind CSS v4
- Existing project uses inline Tailwind theming (no config file)
- Colors currently hard-coded in components

---

## Step-by-Step Implementation

### Task 1.1: Create Tailwind Configuration File

**File:** `tailwind.config.ts` (create new)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - Ndzalama Training
        brand: {
          primary: '#1B3B1B',      // Deep Forest Green
          'primary-light': '#2D5D2D',
          'primary-dark': '#0F1F0F',
          secondary: '#7BC62D',    // Vibrant Leaf Green
          'secondary-light': '#9DD857',
          'secondary-dark': '#5FA020',
          neutral: '#E8F0E8',      // Pale Sage
          'neutral-light': '#F5F9F5',
          'neutral-dark': '#D0E0D0',
        },
        // Semantic Colors
        text: {
          primary: '#222222',
          secondary: '#4A4F57',
          muted: '#666666',
          light: '#9CA3AF',
        },
        // Assessment Digital Pen Colors
        assessment: {
          learner: '#000000',       // Black
          assessor: '#FF0000',      // Red
          'assessor-alt': '#FF6600', // Orange
          moderator: '#008000',     // Green
          'external-mod': '#800080', // Purple
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'var(--font-geist-mono)',
          '"Geist Mono"',
          'ui-monospace',
          'Consolas',
          'monospace',
        ],
      },
      borderRadius: {
        'sm': '0.125rem',
        'md': '0.25rem',
        'lg': '0.375rem',
        'xl': '0.5rem',
        '2xl': '0.625rem',
        '3xl': '0.75rem',
        '4xl': '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
```

**Verification:**
```bash
# Test Tailwind config is valid
npx tailwindcss --help
```

---

### Task 1.2: Update Global CSS Variables

**File:** `src/app/globals.css`

**Current state:**
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

**Update to:**
```css
@import "tailwindcss";

:root {
  /* Brand Colors */
  --brand-primary: #1B3B1B;
  --brand-primary-light: #2D5D2D;
  --brand-primary-dark: #0F1F0F;
  --brand-secondary: #7BC62D;
  --brand-secondary-light: #9DD857;
  --brand-secondary-dark: #5FA020;
  --brand-neutral: #E8F0E8;
  --brand-neutral-light: #F5F9F5;
  --brand-neutral-dark: #D0E0D0;
  
  /* Semantic Colors */
  --text-primary: #222222;
  --text-secondary: #4A4F57;
  --text-muted: #666666;
  
  /* Background */
  --background: #ffffff;
  --foreground: var(--text-primary);
  
  /* Assessment Colors */
  --assessment-learner: #000000;
  --assessment-assessor: #FF0000;
  --assessment-assessor-alt: #FF6600;
  --assessment-moderator: #008000;
  --assessment-external: #800080;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);

  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.375rem;
  --radius-xl: 0.5rem;
  --radius-2xl: 0.625rem;
  --radius-3xl: 0.75rem;
  --radius-4xl: 1rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), Arial, Helvetica, sans-serif;
}

/* Custom Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

---

### Task 1.3: Load Modern Font (Inter)

**File:** `src/app/layout.tsx`

**Add after imports:**
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
```

**Update `<html>` tag:**
```tsx
<html lang="en" className={inter.variable}>
```

**Alternative (if using local fonts):**
```typescript
import localFont from 'next/font/local';

const inter = localFont({
  src: [
    {
      path: '../fonts/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});
```

---

### Task 1.4: Update Component Color References

#### Priority Components (Update First)

**1. Public Header** (`src/components/layout/public-header.tsx`)

**Search for:**
```tsx
bg-[#006600]
text-[#84ba3f]
hover:text-[#84ba3f]
bg-[#84ba3f]
hover:bg-[#6ea032]
text-[#006600]
```

**Replace with:**
```tsx
bg-brand-primary          // or bg-[var(--brand-primary)]
text-brand-secondary      // or text-[var(--brand-secondary)]
hover:text-brand-secondary
bg-brand-secondary
hover:bg-brand-secondary-dark
text-brand-primary
```

**Specific replacements in `public-header.tsx`:**

Line ~158: Top bar
```tsx
// OLD
<div className="bg-[#006600] text-white text-sm py-2 hidden md:block">

// NEW
<div className="bg-brand-primary text-white text-sm py-2 hidden md:block">
```

Line ~166-172: Contact links
```tsx
// OLD
className="flex items-center gap-2 hover:text-[#84ba3f] transition-colors"

// NEW
className="flex items-center gap-2 hover:text-brand-secondary transition-colors"
```

Line ~248-252: Nav links
```tsx
// OLD
className={cn(
  'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded transition-colors hover:text-[#84ba3f]',
  isActive ? 'text-[#84ba3f]' : 'text-[#333] dark:text-gray-300',
)}

// NEW
className={cn(
  'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded transition-colors hover:text-brand-secondary',
  isActive ? 'text-brand-secondary' : 'text-text-primary dark:text-gray-300',
)}
```

Line ~340-343: CTA button
```tsx
// OLD
className="px-5 py-2 text-sm font-semibold rounded-full bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-sm"

// NEW
className="px-5 py-2 text-sm font-semibold rounded-full bg-brand-secondary text-white hover:bg-brand-secondary-dark transition-colors shadow-sm"
```

---

**2. Homepage** (`src/app/(public)/page.tsx`)

Line ~39-40: Hero section
```tsx
// OLD
className="relative overflow-hidden bg-[#006600] text-white"

// NEW
className="relative overflow-hidden bg-brand-primary text-white"
```

Line ~50: Gradient overlay
```tsx
// OLD
<div className="absolute inset-0 bg-gradient-to-r from-[#006600]/90 via-[#004d00]/80 to-[#03367A]/70" />

// NEW
<div className="absolute inset-0 bg-gradient-to-r from-brand-primary/90 via-brand-primary-dark/80 to-[#03367A]/70" />
```

Line ~55-56: Decorative elements
```tsx
// OLD
className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#84ba3f]/20 pointer-events-none z-10"

// NEW
className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-secondary/20 pointer-events-none z-10"
```

Line ~67: Badge
```tsx
// OLD
className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#84ba3f]/20 text-[#84ba3f] text-sm font-semibold tracking-wide uppercase"

// NEW
className="inline-block mb-4 px-4 py-1.5 rounded-full bg-brand-secondary/20 text-brand-secondary text-sm font-semibold tracking-wide uppercase"
```

Line ~72: Heading accent
```tsx
// OLD
<span className="text-[#84ba3f]">Ndzalama</span>

// NEW
<span className="text-brand-secondary">Ndzalama</span>
```

Line ~85: Check icons
```tsx
// OLD
<FaCheckCircle className="text-[#84ba3f]" />

// NEW
<FaCheckCircle className="text-brand-secondary" />
```

Line ~95-100: CTA buttons
```tsx
// OLD
className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors"

// NEW
className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-brand-secondary text-white hover:bg-brand-secondary-dark transition-colors"
```

Line ~117: Stat card icon
```tsx
// OLD
<span className="text-[#84ba3f] text-xl">{icon}</span>

// NEW
<span className="text-brand-secondary text-xl">{icon}</span>
```

Line ~130: Partner section background
```tsx
// OLD
<section className="border-b border-[#e5e4e7] bg-[#f9f9f9] py-10">

// NEW
<section className="border-b border-[#e5e4e7] bg-brand-neutral-light py-10">
```

Line ~137: Section tag
```tsx
// OLD
className="text-xs font-semibold uppercase tracking-[0.2em] text-[#84ba3f]"

// NEW
className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary"
```

Line ~210: Accreditation teaser background
```tsx
// OLD
className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center rounded-3xl bg-[#eef6df] dark:bg-[#1a2415] p-8 md:p-12"

// NEW
className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center rounded-3xl bg-brand-neutral dark:bg-[#1a2415] p-8 md:p-12"
```

---

**3. Dashboard Components**

Search all dashboard files for these patterns and replace:

```bash
# In src/components/layout/
# In src/app/(dashboard)/
# In src/app/admin/

# Find
bg-[#84ba3f]
text-[#84ba3f]
hover:bg-[#84ba3f]
border-[#84ba3f]

# Replace with
bg-brand-secondary
text-brand-secondary
hover:bg-brand-secondary
border-brand-secondary
```

---

### Task 1.5: Update Button Components

**File:** `src/components/ui/button.tsx`

If this file exists, update color variants:

```tsx
const buttonVariants = {
  primary: 'bg-brand-secondary text-white hover:bg-brand-secondary-dark',
  secondary: 'border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white',
  outline: 'border border-gray-300 text-text-primary hover:bg-gray-50',
  ghost: 'text-text-primary hover:bg-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};
```

---

### Task 1.6: Create Utility Helper for Brand Colors

**File:** `src/lib/brand-colors.ts` (create new)

```typescript
/**
 * Brand color utilities for Ndzalama Training
 * Use these when you need programmatic access to brand colors
 */

export const brandColors = {
  primary: {
    base: '#1B3B1B',
    light: '#2D5D2D',
    dark: '#0F1F0F',
  },
  secondary: {
    base: '#7BC62D',
    light: '#9DD857',
    dark: '#5FA020',
  },
  neutral: {
    base: '#E8F0E8',
    light: '#F5F9F5',
    dark: '#D0E0D0',
  },
  text: {
    primary: '#222222',
    secondary: '#4A4F57',
    muted: '#666666',
  },
  assessment: {
    learner: '#000000',
    assessor: '#FF0000',
    assessorAlt: '#FF6600',
    moderator: '#008000',
    externalModerator: '#800080',
  },
} as const;

export type BrandColorKey = keyof typeof brandColors;

/**
 * Get CSS variable name for a brand color
 */
export function getBrandColorVar(category: string, variant: string = 'base'): string {
  return `var(--brand-${category}${variant !== 'base' ? `-${variant}` : ''})`;
}

/**
 * Get Tailwind class for a brand color
 */
export function getBrandColorClass(
  type: 'bg' | 'text' | 'border',
  category: 'primary' | 'secondary' | 'neutral',
  variant?: 'light' | 'dark'
): string {
  const variantSuffix = variant ? `-${variant}` : '';
  return `${type}-brand-${category}${variantSuffix}`;
}
```

---

### Task 1.7: Update Theme Toggle (if exists)

If you have dark mode toggle, ensure it respects new colors:

```tsx
// In theme provider or toggle component
const themes = {
  light: {
    background: '#ffffff',
    foreground: brandColors.text.primary,
    primary: brandColors.primary.base,
    secondary: brandColors.secondary.base,
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#ededed',
    primary: brandColors.primary.light,
    secondary: brandColors.secondary.light,
  },
};
```

---

### Task 1.8: Update Marketing Copy

**File:** `src/app/(public)/page.tsx`

Line ~67-69: Update tagline badge
```tsx
// OLD
<span className="...">SAQA Accredited Training</span>

// NEW  
<span className="...">Building Skills. Transforming Futures.</span>
```

Line ~70-74: Update hero heading
```tsx
// OLD
<h1 className="text-4xl md:text-6xl font-bold leading-tight">
  Welcome to{' '}
  <span className="text-brand-secondary">Ndzalama</span>{' '}
  Training
</h1>

// KEEP (already good, just update color as per Task 1.4)
```

Line ~75-79: Update hero description
```tsx
// OLD
<p className="mt-5 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
  We make your dreams come true — professional, accredited training
  programmes that empower individuals and organisations across South Africa.
</p>

// NEW
<p className="mt-5 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
  With over 20 years of experience, we deliver accredited occupational qualifications,
  skills programmes, and workplace training that transform careers and organizations.
</p>
```

Line ~112: Update stat value
```tsx
// OLD
{ icon: <FaCalendarAlt />, value: '10+', label: 'Years of Experience' },

// NEW
{ icon: <FaCalendarAlt />, value: '20+', label: 'Years of Experience' },
```

---

### Task 1.9: Testing Checklist

After all color updates, test these scenarios:

**Visual Testing:**
- [ ] Homepage renders with new green tones
- [ ] Navigation bar uses Deep Forest Green (#1B3B1B)
- [ ] All buttons use Vibrant Leaf Green (#7BC62D)
- [ ] Hover states darken appropriately
- [ ] Section backgrounds use Pale Sage (#E8F0E8)
- [ ] Text is readable (contrast check)

**Component Testing:**
```bash
# Check all pages load without errors
- Visit /
- Visit /about
- Visit /courses
- Visit /login
- Visit /learn (if logged in)
- Visit /admin (if admin)
```

**Accessibility Testing:**
```bash
# Install axe DevTools browser extension
# Run accessibility audit on:
- Homepage
- Course listing
- Dashboard
```

**Contrast Ratios (WCAG AA):**
- [ ] Text on primary background: min 4.5:1
- [ ] Button text on secondary: min 4.5:1
- [ ] Link hover states: min 3:1

**Browser Testing:**
- [ ] Chrome/Edge (Windows)
- [ ] Firefox (Windows)
- [ ] Safari (if available)
- [ ] Mobile Chrome (responsive mode)

---

### Task 1.10: Build and Deploy

```bash
# Clear Next.js cache
Remove-Item -Recurse -Force .next

# Verify build succeeds
npm run build

# Test production build locally
npm run start

# Check for console errors
# Verify all colors render correctly

# If using Vercel, push to branch
git add .
git commit -m "feat: Update brand colors and design system"
git push origin feature/design-system-update

# Merge to main after review
```

---

## Color Migration Reference Sheet

### Component Color Mapping

| Component | Element | Old Color | New Color | Tailwind Class |
|-----------|---------|-----------|-----------|----------------|
| PublicHeader | Top bar bg | `#006600` | `#1B3B1B` | `bg-brand-primary` |
| PublicHeader | Link hover | `#84ba3f` | `#7BC62D` | `text-brand-secondary` |
| Button | Primary bg | `#84ba3f` | `#7BC62D` | `bg-brand-secondary` |
| Button | Primary hover | `#6ea032` | `#5FA020` | `hover:bg-brand-secondary-dark` |
| Hero | Background | `#006600` | `#1B3B1B` | `bg-brand-primary` |
| Hero | Accent text | `#84ba3f` | `#7BC62D` | `text-brand-secondary` |
| Section | Alt bg | `#eef6df` | `#E8F0E8` | `bg-brand-neutral` |
| Section | Alt bg light | `#f9f9f9` | `#F5F9F5` | `bg-brand-neutral-light` |
| Text | Primary | `#333` | `#222222` | `text-text-primary` |
| Text | Secondary | `#666` | `#4A4F57` | `text-text-secondary` |

---

## Files Modified in Phase 1

**Created:**
1. `tailwind.config.ts`
2. `src/lib/brand-colors.ts`

**Modified:**
1. `src/app/globals.css`
2. `src/app/layout.tsx`
3. `src/components/layout/public-header.tsx`
4. `src/components/layout/public-footer.tsx`
5. `src/app/(public)/page.tsx`
6. `src/app/(public)/about/page.tsx`
7. `src/app/(public)/courses/page.tsx`
8. `src/components/common/course-card.tsx`
9. `src/components/ui/button.tsx`
10. `src/components/layout/dashboard-header.tsx`
11. `src/components/layout/dashboard-sidebar.tsx`
12. All dashboard page files (admin, facilitator, assessor, moderator)

**Verification Script:**
```bash
# Count color references (should be 0 after migration)
grep -r "#006600" src/
grep -r "#84ba3f" src/
grep -r "bg-\[#" src/ | wc -l
```

---

## Common Issues and Solutions

### Issue 1: Tailwind not recognizing custom colors

**Solution:**
```bash
# Restart dev server
# Ctrl+C to stop
npm run dev
```

### Issue 2: CSS variables not working

**Check:**
- CSS variables defined in `:root`
- No typos in variable names
- Using `var(--variable-name)` syntax

### Issue 3: Colors look different in production

**Check:**
- `npm run build` succeeded
- No Tailwind purge issues
- CSS file loaded in production

### Issue 4: Dark mode colors wrong

**Solution:**
Update dark mode section in `globals.css`:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --brand-primary: #2D5D2D;  /* Lighter for dark mode */
    --brand-secondary: #9DD857;
  }
}
```

---

## Next Phase Preview

After Phase 1 is complete and merged, Phase 2 will focus on:

1. **Dual-Audience Paths:** Add "How Can We Help You?" section
2. **Training Delivery Badges:** In-person, Virtual, On-site, Online indicators
3. **Mega-Menu Reorganization:** Group by SETA/QCTO categories
4. **Course Metadata Display:** Show Programme Code, NQF Level, Credits
5. **Module Breakdown UI:** KM/PM/WEM visual hierarchy

---

## Document Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2026-10-10 | 1.0.0 | Initial implementation guide |

---

**END OF GUIDE**
