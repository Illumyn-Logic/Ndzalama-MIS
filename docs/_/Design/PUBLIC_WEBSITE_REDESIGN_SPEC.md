# Ndzalama Training - Public Website Redesign Specification

**Document Version:** 1.0.0  
**Date:** October 10, 2026  
**Focus:** Public Website Experience (`/`, `/about`, `/courses`, etc.)  
**Excludes:** Admin dashboards and Learner LMS (separate specifications)

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Brand Identity](#2-brand-identity)
3. [Homepage Redesign](#3-homepage-redesign)
4. [Navigation & Mega Menu](#4-navigation--mega-menu)
5. [Course Catalogue](#5-course-catalogue)
6. [Course Detail Pages](#6-course-detail-pages)
7. [Dual-Audience Paths](#7-dual-audience-paths)
8. [Component Library](#8-component-library)
9. [Responsive Design](#9-responsive-design)
10. [Implementation Checklist](#10-implementation-checklist)

---

## 1. Design Philosophy

### Core Principles

**"Building Skills. Transforming Futures."**

The Ndzalama public website must convey:
- **Trust & Credibility:** 20+ years of accredited training experience
- **Clarity & Accessibility:** Clear paths for individuals vs. businesses
- **Professionalism:** Industry-aligned, QCTO/SETA compliant
- **Growth & Transformation:** Visual metaphors of progression and development

### Visual Language

- **Natural & Grounded:** Deep forest greens representing growth and stability
- **Vibrant & Energetic:** Lime green accents representing transformation and opportunity
- **Clean & Modern:** Contemporary sans-serif typography, generous white space
- **Purposeful:** Every element serves user goals (browse, enroll, inquire)

---

## 2. Brand Identity

### 2.1 Color Palette

#### Primary Brand Colors

```css
/* Deep Forest Green - Authority, Trust, Stability */
--brand-primary: #1B3B1B;
--brand-primary-light: #2D5D2D;
--brand-primary-dark: #0F1F0F;

/* Vibrant Leaf Green - Growth, Energy, Action */
--brand-secondary: #7BC62D;
--brand-secondary-light: #9DD857;
--brand-secondary-dark: #5FA020;

/* Pale Sage - Calm, Professional, Supportive */
--brand-neutral: #E8F0E8;
--brand-neutral-light: #F5F9F5;
--brand-neutral-dark: #D0E0D0;
```

#### Usage Guidelines

| Element | Color | Hex Code | Use Case |
|---------|-------|----------|----------|
| **Top Navigation Bar** | Primary | `#1B3B1B` | Main header background |
| **Hero Backgrounds** | Primary | `#1B3B1B` | Full-width hero sections |
| **Footer** | Primary Dark | `#0F1F0F` | Site footer |
| **Primary CTAs** | Secondary | `#7BC62D` | "Enrol Now", "Get Started" |
| **Link Hovers** | Secondary | `#7BC62D` | Interactive states |
| **Button Hovers** | Secondary Dark | `#5FA020` | CTA hover states |
| **Section Backgrounds** | Neutral | `#E8F0E8` | Alternating content blocks |
| **Cards/Modules** | Neutral Light | `#F5F9F5` | Course cards, info boxes |

#### Typography Colors

```css
--text-primary: #222222;      /* Headings, body text */
--text-secondary: #4A4F57;    /* Subheadings, supporting text */
--text-muted: #666666;        /* Captions, meta info */
--text-light: #9CA3AF;        /* Disabled, placeholders */
```

### 2.2 Typography

**Font Family:** Inter (Google Fonts)

```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

#### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| **Hero H1** | 60px / 3.75rem | 700 Bold | 1.1 | -0.02em |
| **Section H2** | 36px / 2.25rem | 700 Bold | 1.2 | -0.01em |
| **Card H3** | 24px / 1.5rem | 600 Semibold | 1.3 | Normal |
| **Body Large** | 18px / 1.125rem | 400 Regular | 1.6 | Normal |
| **Body** | 16px / 1rem | 400 Regular | 1.6 | Normal |
| **Small** | 14px / 0.875rem | 400 Regular | 1.5 | Normal |
| **Label/Meta** | 12px / 0.75rem | 600 Semibold | 1.4 | 0.05em |

#### Mobile Adjustments

```css
/* Mobile (< 768px) */
Hero H1: 36px / 2.25rem
Section H2: 28px / 1.75rem
Card H3: 20px / 1.25rem
```

### 2.3 Spacing System

**Base Unit:** 4px

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-24: 6rem;    /* 96px */
```

**Component Spacing:**
- Section padding (vertical): `space-16` (64px desktop), `space-8` (32px mobile)
- Card padding: `space-6` (24px)
- Button padding: `space-4 space-6` (16px vertical, 24px horizontal)

### 2.4 Border Radius

```css
--radius-sm: 0.25rem;   /* 4px - small elements */
--radius-md: 0.5rem;    /* 8px - cards */
--radius-lg: 0.75rem;   /* 12px - modals */
--radius-xl: 1rem;      /* 16px - large cards */
--radius-full: 9999px;  /* Pills, badges, buttons */
```

---

## 3. Homepage Redesign

### 3.1 Hero Section

**Goal:** Immediate credibility and clear value proposition

#### Structure

```
┌─────────────────────────────────────────────────────────┐
│ [BACKGROUND: Deep Forest Green #1B3B1B with photo overlay]│
│                                                           │
│  BADGE: "SAQA & QCTO Accredited Training"               │
│                                                           │
│  H1: Building Skills. Transforming Futures.              │
│                                                           │
│  DESCRIPTION:                                            │
│  With over 20 years of experience, Ndzalama Training     │
│  delivers accredited occupational qualifications,        │
│  skills programmes and workplace training that equip     │
│  individuals and organisations with practical,           │
│  industry-relevant skills for long-term success.        │
│                                                           │
│  FEATURE BADGES:                                         │
│  ✓ NQF-aligned qualifications                           │
│  ✓ ETDP SETA accredited                                 │
│  ✓ Nationwide delivery                                   │
│                                                           │
│  [CTA: Explore Courses] [CTA: Book Training]            │
│                                                           │
│  STAT CARDS:                                             │
│  [5,000+ Learners] [6+ Programmes] [20+ Years]          │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

#### Visual Elements

1. **Background Photo:**
   - Professional training environment or workplace scene
   - Dark gradient overlay: `bg-gradient-to-r from-brand-primary/90 via-brand-primary-dark/80 to-[#03367A]/70`
   - Ensures text readability

2. **Decorative Elements:**
   - Large semi-transparent circle (top-right): `bg-brand-secondary/20`
   - Small circle (bottom-left): `bg-white/5`
   - Creates depth without distraction

3. **Badge Component:**
```tsx
<span className="inline-block px-4 py-1.5 rounded-full 
                 bg-brand-secondary/20 text-brand-secondary 
                 text-sm font-semibold tracking-wide uppercase">
  SAQA & QCTO Accredited Training
</span>
```

4. **Stat Cards:**
```tsx
<div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
  <span className="text-brand-secondary text-xl">{icon}</span>
  <span className="text-2xl font-bold text-white">{value}</span>
  <span className="text-xs text-white/60 uppercase">{label}</span>
</div>
```

### 3.2 "How Can We Help You?" Section

**Goal:** Immediate path segmentation for different user types

#### Layout (Side-by-Side)

```
┌─────────────────────────────────────────────────────────┐
│                                                           │
│  H2: How Can We Help You?                                │
│                                                           │
│  ┌────────────────────────┐  ┌────────────────────────┐ │
│  │ 👤 I'm an Individual    │  │ 💼 I'm a Business      │ │
│  │                         │  │                        │ │
│  │ Start your career,      │  │ Partner with us to     │ │
│  │ upskill or gain        │  │ develop your workforce │ │
│  │ nationally recognised   │  │ through customised,    │ │
│  │ qualifications.        │  │ accredited training.   │ │
│  │                         │  │                        │ │
│  │ [Browse Courses]       │  │ [Corporate Solutions]  │ │
│  │ [Training Schedule]    │  │ [Request Proposal]     │ │
│  │ [Enrol Online]         │  │ [Speak to Consultant]  │ │
│  │                         │  │                        │ │
│  └────────────────────────┘  └────────────────────────┘ │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

#### Component Structure

```tsx
<section className="py-16 bg-white">
  <Container>
    <SectionTitle 
      title="How Can We Help You?" 
      centered 
    />
    
    <div className="grid md:grid-cols-2 gap-8 mt-12">
      {/* Individual Path */}
      <PathCard
        icon="👤"
        heading="I'm an Individual"
        description="Start your career, upskill or gain nationally 
                     recognised qualifications."
        actions={[
          { label: 'Browse Courses', href: '/courses', variant: 'primary' },
          { label: 'Training Schedule', href: '/schedules', variant: 'secondary' },
          { label: 'Enrol Online', href: '/register', variant: 'secondary' }
        ]}
      />
      
      {/* Business Path */}
      <PathCard
        icon="💼"
        heading="I'm a Business"
        description="Partner with us to develop your workforce through 
                     customised, accredited training solutions."
        actions={[
          { label: 'Corporate Solutions', href: '/corporate', variant: 'primary' },
          { label: 'Request Proposal', href: '/request-proposal', variant: 'secondary' },
          { label: 'Speak to a Consultant', href: '/contact', variant: 'secondary' }
        ]}
      />
    </div>
  </Container>
</section>
```

### 3.3 Training Delivery Options

**Goal:** Clearly communicate flexible delivery modes

#### Badge Component

```tsx
<DeliveryBadges 
  modes={['in-person', 'virtual', 'on-site', 'online']} 
/>
```

#### Visual Design

```
┌──────────────────────────────────────────────┐
│ Training Delivery Options                     │
│                                               │
│ [🏢 In-Person] [💻 Virtual] [📍 On-Site]    │
│ [🌐 Online Self-Paced]                       │
│                                               │
└──────────────────────────────────────────────┘
```

**Badge Styles:**
```tsx
const deliveryBadges = {
  'in-person': {
    icon: '🏢',
    label: 'In-Person',
    color: 'bg-brand-primary text-white'
  },
  'virtual': {
    icon: '💻',
    label: 'Virtual',
    color: 'bg-blue-600 text-white'
  },
  'on-site': {
    icon: '📍',
    label: 'On-Site (We Come to You)',
    color: 'bg-orange-600 text-white'
  },
  'online': {
    icon: '🌐',
    label: 'Online Self-Paced',
    color: 'bg-purple-600 text-white'
  }
};
```

### 3.4 Featured Courses Section

**Current State:** Generic "Our Courses" section  
**New Design:** Category-organized showcase

```
┌─────────────────────────────────────────────────────────┐
│ Explore Our Accredited Programmes                        │
│                                                           │
│ TABS: [Occupational Certificates] [Skills Programmes]    │
│       [Short Courses] [First Aid]                       │
│                                                           │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│ │ Course     │ │ Course     │ │ Course     │          │
│ │ Card 1     │ │ Card 2     │ │ Card 3     │          │
│ └────────────┘ └────────────┘ └────────────┘          │
│                                                           │
│ [View All Courses]                                       │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 3.5 Why Choose Ndzalama

**Visual Treatment:** Icon + Heading + Description cards

```
┌─────────────────────────────────────────────────────────┐
│ Why Choose Ndzalama Training?                            │
│                                                           │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│ │ 🏅 20+ Years  │  │ 🎓 SAQA & QCTO│  │ 👨‍🏫 Expert   │  │
│ │ Experience    │  │ Accredited    │  │ Facilitators │  │
│ │              │  │              │  │              │  │
│ │ Description  │  │ Description  │  │ Description  │  │
│ └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                           │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│ │ 📋 SETA      │  │ 💼 Industry   │  │ ✅ Proven    │  │
│ │ Compliance   │  │ Aligned       │  │ Outcomes     │  │
│ └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 3.6 Accreditation & Partner Logos

**Current:** Basic logo strip  
**New Design:** Organized with context

```
┌─────────────────────────────────────────────────────────┐
│ Trusted Learning Partners                                │
│                                                           │
│ "Working with organisations that strengthen learning     │
│  and skills development."                                │
│                                                           │
│ [ETDP SETA] [QCTO] [SAQA] [W&R SETA] [Services SETA]   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Background:** Pale Sage (`#E8F0E8` or `#F5F9F5`)

---

## 4. Navigation & Mega Menu

### 4.1 Top Contact Bar

**Background:** Deep Forest Green (`#1B3B1B`)  
**Text:** White with Vibrant Leaf Green hovers (`#7BC62D`)

```
┌─────────────────────────────────────────────────────────┐
│ ✉ headoffice@ndzalama.org.za  │  ☎ +(27) 15-590-732   │
│ 💬 WhatsApp Us                 │  [FB] [IG] [TW] [LI]  │
└─────────────────────────────────────────────────────────┘
```

**Mobile:** Hide contact bar, show only on tablets and larger

### 4.2 Main Navigation

```
┌─────────────────────────────────────────────────────────┐
│ [LOGO]  Home | About ▾ | Courses ▾ | Updates | Verify  │
│         Accreditation ▾ | Contact    [Student Portal →] │
└─────────────────────────────────────────────────────────┘
```

**Styling:**
- Background: White
- Border-bottom: 1px solid #e5e4e7
- Logo: 160px width (auto height)
- Link color: `#222222`
- Active/Hover: `#7BC62D`
- CTA Button: `bg-brand-secondary`, rounded-full

### 4.3 Courses Mega Menu

**Trigger:** Hover or click on "Courses"  
**Layout:** Multi-column dropdown organized by SETA/QCTO categories

```
┌────────────────────────────────────────────────────────────────┐
│ OCCUPATIONAL CERTIFICATES                                       │
│                                                                 │
│ Education & Training                                           │
│ › Training and Development Practitioner  [OC-101321]           │
│ › Occupational Trainer  [OC-97154]                            │
│ › ECD Practitioner  [OC-97542]                                │
│                                                                 │
│ Health & Safety                                                │
│ › Occupational Health & Safety Officer  [OC-121929]           │
│ › Occupational Health & Safety Assistant  [OC-121930]         │
│                                                                 │
├─────────────────────────────────────────────────────────────── │
│ QCTO SKILLS PROGRAMMES                                         │
│                                                                 │
│ Learning & Development                                         │
│ › Learning & Development Facilitator  [SP-220319]             │
│ › Assessment Practitioner  [SP-220320]                        │
│ › Moderator  [SP-220321]                                      │
│ › Skills Development Facilitation Practitioner  [SP-220322]   │
│ › Workplace-based Practitioner  [SP-220322]                   │
│ › Assistant Life Coach  [SP-211001]                           │
│                                                                 │
│ Business & Entrepreneurship                                    │
│ › Workplace Preparation  [SP-201201]                          │
│ › Workplace Essential Skills  [SP-211009]                     │
│ › New Venture Creation  [SP-211010]                           │
│                                                                 │
├─────────────────────────────────────────────────────────────── │
│ FIRST AID PROGRAMMES                                           │
│                                                                 │
│ › Basic Emergency First Aid Responder  [SP-230801]            │
│ › Intermediate Emergency First Aid Responder  [SP-230802]     │
│ › Advanced Emergency First Aid Responder  [SP-230803]         │
│                                                                 │
├─────────────────────────────────────────────────────────────── │
│ [View All Courses →]                                           │
└────────────────────────────────────────────────────────────────┘
```

**Design Specs:**
- Width: 800px (desktop)
- Background: White
- Border: 1px solid #e5e4e7
- Border-radius: 12px
- Box-shadow: `0 10px 40px rgba(0, 0, 0, 0.1)`
- Padding: 32px
- Category headings: 10px uppercase, bold, `#7BC62D`
- Subcategory headings: 14px semibold, `#222222`
- Course links: 14px regular, `#4A4F57`, hover `#7BC62D`
- Programme codes: 12px, `#666666`

**Interaction:**
- Desktop: Open on hover, stay open while mouse inside
- Mobile: Accordion-style tap to expand

---

## 5. Course Catalogue

### 5.1 Course Listing Page (`/courses`)

#### Filter Sidebar

```
┌─────────────────┐
│ Filter Courses   │
│                  │
│ Category         │
│ ☐ Occupational   │
│ ☐ Skills Prog.   │
│ ☐ Short Courses  │
│ ☐ First Aid      │
│                  │
│ NQF Level        │
│ ☐ Level 4        │
│ ☐ Level 5        │
│ ☐ Level 6        │
│                  │
│ Delivery Mode    │
│ ☐ In-Person      │
│ ☐ Virtual        │
│ ☐ On-Site        │
│ ☐ Online         │
│                  │
│ Duration         │
│ ☐ < 3 months     │
│ ☐ 3-6 months     │
│ ☐ 6-12 months    │
│ ☐ 12+ months     │
│                  │
│ [Apply Filters]  │
│ [Reset]          │
└─────────────────┘
```

#### Course Grid

```
┌────────────────────────────────────────────────────────┐
│ Browse Accredited Training Programmes                   │
│                                                          │
│ [Search: Enter course name or code...]  [Sort: ▾]      │
│                                                          │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│ │ Course   │ │ Course   │ │ Course   │ │ Course   │  │
│ │ Card     │ │ Card     │ │ Card     │ │ Card     │  │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                          │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│ │ Course   │ │ Course   │ │ Course   │ │ Course   │  │
│ │ Card     │ │ Card     │ │ Card     │ │ Card     │  │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                          │
│ [Load More]                                             │
│                                                          │
└────────────────────────────────────────────────────────┘
```

### 5.2 Course Card Component

**Required Information Display:**

```
┌─────────────────────────────────────────┐
│ [BADGE: QCTO SKILLS PROGRAMME]          │
│                                          │
│ [Delivery Mode Badges: 🏢 💻]          │
│                                          │
│ Learning & Development Facilitator       │
│                                          │
│ Programme Code: SP-220319                │
│ NQF Level: 5  │  Credits: 59            │
│ Duration: 6 months                       │
│                                          │
│ Brief description of the programme...    │
│                                          │
│ [Learn More →]                           │
│                                          │
└─────────────────────────────────────────┘
```

**Component Structure:**
```tsx
<CourseCard>
  <CategoryBadge category="QCTO Skills Programme" />
  <DeliveryBadges modes={['in-person', 'virtual']} />
  <CourseTitle>{course.title}</CourseTitle>
  <CourseMetadata 
    code={course.code}
    nqfLevel={course.nqfLevel}
    credits={course.credits}
    duration={course.duration}
  />
  <CourseDescription>{course.summary}</CourseDescription>
  <CTAButton href={`/courses/${course.slug}`}>
    Learn More →
  </CTAButton>
</CourseCard>
```

**Styling:**
- Background: White or `#F5F9F5`
- Border: 1px solid `#e5e4e7`
- Border-radius: 12px
- Padding: 24px
- Hover: Lift effect (shadow increase, slight translate-y)

---

## 6. Course Detail Pages

### 6.1 Course Hero Section

```
┌─────────────────────────────────────────────────────────┐
│ [BREADCRUMB: Home > Courses > Training Dev Practitioner] │
│                                                           │
│ [BADGE: OCCUPATIONAL CERTIFICATE]                        │
│ [Delivery Badges: 🏢 💻 📍]                             │
│                                                           │
│ Occupational Certificate:                                │
│ Training and Development Practitioner                     │
│                                                           │
│ Programme Code: OC-101321  │  NQF Level: 5               │
│ Credits: 190  │  Duration: 12-18 months                  │
│                                                           │
│ [Download Outline PDF] [SAQA Qualification Link]         │
│ [Enquire] [Enrol Now]                                    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Course Content Tabs

```
┌─────────────────────────────────────────────────────────┐
│ [Overview] [Modules] [Requirements] [Career Paths]       │
│ [Assessment] [Pricing]                                   │
│                                                           │
│ ═══════════════════════════════════════════════════════ │
│                                                           │
│ [TAB CONTENT APPEARS HERE]                               │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 6.3 Module Breakdown (KM / PM / WEM)

**Visual Hierarchy:**

```
┌─────────────────────────────────────────────────────────┐
│ Programme Structure                                       │
│                                                           │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ 📚 Knowledge Modules (KM)                           ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ KM-01: Foundation of Education and Training         │ │
│ │ Credits: 30  │  Notional Hours: 300                 │ │
│ │                                                      │ │
│ │ Topics:                                             │ │
│ │ • Topic 1: Introduction to ETD                      │ │
│ │ • Topic 2: Learning Theories                        │ │
│ │ • Topic 3: Adult Learning                           │ │
│ │                                                      │ │
│ │ [View Module Details]                               │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ KM-02: Learning Programme Design                    │ │
│ │ Credits: 28  │  Notional Hours: 280                 │ │
│ │ ...                                                  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ 🛠️ Practical Modules (PM)                           ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ PM-01: Facilitation Practice                        │ │
│ │ ...                                                  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ 💼 Work Experience Modules (WEM)                    ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ WEM-01: Workplace Integration                       │ │
│ │ ...                                                  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Color Coding:**
- Knowledge Modules: Blue accent (`#3B82F6`)
- Practical Modules: Orange accent (`#F97316`)
- Work Experience: Purple accent (`#9333EA`)

### 6.4 Entry Requirements Section

```
┌─────────────────────────────────────────────────────────┐
│ Entry Requirements                                        │
│                                                           │
│ To qualify for this programme, learners must have:       │
│                                                           │
│ ✓ National Senior Certificate (NSC) or equivalent        │
│ ✓ NQF Level 4 qualification in related field             │
│ ✓ 2+ years experience in training/facilitation           │
│   (preferred but not essential)                          │
│                                                           │
│ Recognition of Prior Learning (RPL):                     │
│ Learners with relevant experience but without formal     │
│ qualifications may apply through our RPL process.        │
│                                                           │
│ [Learn About RPL] [Check Your Eligibility]               │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 6.5 Career Opportunities Section

```
┌─────────────────────────────────────────────────────────┐
│ Career Paths & Opportunities                             │
│                                                           │
│ Upon successful completion, learners can work as:        │
│                                                           │
│ 🎯 Training and Development Practitioner                 │
│ 🎯 Learning and Development Specialist                   │
│ 🎯 Corporate Trainer                                     │
│ 🎯 Skills Development Facilitator                        │
│ 🎯 Workplace Coach/Mentor                                │
│                                                           │
│ Potential Employers:                                     │
│ • Corporate training departments                         │
│ • Private training providers                             │
│ • SETA organisations                                     │
│ • Educational institutions                               │
│ • Consulting firms                                       │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 6.6 CTA Section (Bottom of Page)

```
┌─────────────────────────────────────────────────────────┐
│                                                           │
│  Ready to Start Your Learning Journey?                   │
│                                                           │
│  Next Intake: January 2027  │  Venue: Polokwane & Online│
│                                                           │
│  [Enrol Now] [Request More Information] [Download PDF]   │
│                                                           │
│  Questions? Call us: +(27) 15-590-732 or                 │
│  email: headoffice@ndzalama.org.za                       │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Styling:**
- Background: Pale Sage gradient (`#E8F0E8` to `#F5F9F5`)
- Border-top: 2px solid `#7BC62D`
- Padding: 64px vertical
- Centered content

---

## 7. Dual-Audience Paths

### 7.1 Individual Learner Journey

**Key Pages:**
1. `/` - Homepage (Hero + How Can We Help)
2. `/courses` - Browse catalogue
3. `/courses/[slug]` - Course detail
4. `/schedules` - Training calendar
5. `/register` - Create account & enroll

**Navigation Highlights:**
- "Browse Courses" → `/courses`
- "Training Schedule" → `/schedules`
- "Enrol Online" → `/register`
- "Student Portal" → `/learn` (if logged in) or `/login`

### 7.2 Business/Corporate Journey

**Key Pages:**
1. `/` - Homepage (Business path card)
2. `/corporate` - Corporate solutions overview
3. `/request-proposal` - Quote request form
4. `/contact` - Consultant contact

**New Page Required:** `/corporate`

```
┌─────────────────────────────────────────────────────────┐
│ Corporate Training Solutions                             │
│                                                           │
│ Customised, Accredited Training for Your Workforce       │
│                                                           │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│ │ B-BBEE     │ │ SDL & WSP  │ │ On-Site    │          │
│ │ Compliance │ │ Support    │ │ Training   │          │
│ └────────────┘ └────────────┘ └────────────┘          │
│                                                           │
│ Our Services:                                            │
│ • Customised Training Programmes                         │
│ • SETA Grant Applications                                │
│ • Workplace Skills Plans (WSP)                           │
│ • Annual Training Reports (ATR)                          │
│ • Skills Development Facilitation                        │
│ • RPL Assessment & Verification                          │
│                                                           │
│ [Request a Proposal] [Schedule Consultation]             │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 8. Component Library

### 8.1 Button Components

#### Primary Button
```tsx
<button className="px-6 py-3 rounded-full font-semibold 
                   bg-brand-secondary text-white 
                   hover:bg-brand-secondary-dark 
                   transition-colors shadow-sm">
  Enrol Now
</button>
```

#### Secondary Button
```tsx
<button className="px-6 py-3 rounded-full font-semibold 
                   border-2 border-brand-secondary 
                   text-brand-secondary 
                   hover:bg-brand-secondary hover:text-white 
                   transition-colors">
  Learn More
</button>
```

#### Outline Button
```tsx
<button className="px-6 py-3 rounded-full font-semibold 
                   border border-gray-300 text-text-primary 
                   hover:bg-gray-50 
                   transition-colors">
  Download PDF
</button>
```

### 8.2 Badge Components

#### Category Badge
```tsx
<span className="inline-block px-3 py-1 rounded-full 
                 text-xs font-bold uppercase tracking-wider 
                 bg-brand-secondary/10 text-brand-secondary">
  QCTO Skills Programme
</span>
```

#### Delivery Badge
```tsx
<span className="inline-flex items-center gap-1.5 px-3 py-1 
                 rounded-full text-xs font-semibold 
                 bg-blue-600 text-white">
  <span>💻</span> Virtual
</span>
```

### 8.3 Card Components

#### Info Card
```tsx
<div className="bg-white rounded-xl p-6 
                border border-gray-200 
                hover:shadow-lg transition-shadow">
  {/* Card content */}
</div>
```

#### Feature Card
```tsx
<div className="bg-brand-neutral-light rounded-xl p-8 
                text-center">
  <div className="text-4xl mb-4">{icon}</div>
  <h3 className="text-xl font-semibold mb-2">{title}</h3>
  <p className="text-text-secondary">{description}</p>
</div>
```

### 8.4 Section Components

#### Section Container
```tsx
<section className="py-16 md:py-24">
  <Container>
    {/* Section content */}
  </Container>
</section>
```

#### Alternating Background Sections
```tsx
// White section
<section className="py-16 bg-white">

// Sage section  
<section className="py-16 bg-brand-neutral">

// Primary section
<section className="py-16 bg-brand-primary text-white">
```

---

## 9. Responsive Design

### 9.1 Breakpoints

```css
/* Tailwind default breakpoints */
sm: 640px    /* Small tablets, large phones */
md: 768px    /* Tablets */
lg: 1024px   /* Desktops */
xl: 1280px   /* Large desktops */
2xl: 1536px  /* Extra large screens */
```

### 9.2 Mobile Adjustments

**Navigation:**
- Top contact bar: Hidden on mobile
- Hamburger menu: Visible below `lg` (1024px)
- Mega menu: Converts to accordion

**Hero Section:**
- Font sizes scale down (60px → 36px)
- Stat cards: Stack vertically (2 columns)
- Decorative circles: Hidden or reduced

**Dual-Audience Cards:**
- Stack vertically on mobile
- Full width on tablets and below

**Course Grid:**
- 1 column: Mobile (< 640px)
- 2 columns: Tablet (640px - 1024px)
- 3-4 columns: Desktop (> 1024px)

**Spacing:**
- Section padding: 32px mobile, 64px desktop
- Card padding: 16px mobile, 24px desktop

### 9.3 Touch Targets

Minimum touch target size: **44x44px**

```css
/* Ensure buttons are tappable */
.mobile-touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

---

## 10. Implementation Checklist

### Phase 1: Design System (Complete)
- [x] Create Tailwind config
- [x] Define color tokens
- [x] Load Inter font
- [x] Update CSS variables
- [ ] Update all component colors

### Phase 2: Homepage Redesign
- [ ] Update hero section
  - [ ] New tagline and copy
  - [ ] Background photo with overlay
  - [ ] Stat cards component
- [ ] Add "How Can We Help You?" section
  - [ ] Individual path card
  - [ ] Business path card
- [ ] Add training delivery badges
- [ ] Update featured courses section
- [ ] Update "Why Choose Ndzalama" section
- [ ] Improve partner logo strip

### Phase 3: Navigation Updates
- [ ] Update top contact bar colors
- [ ] Reorganize mega menu by SETA/QCTO categories
- [ ] Add programme codes to menu items
- [ ] Mobile mega menu accordion

### Phase 4: Course Catalogue
- [ ] Add filter sidebar
- [ ] Update course cards
  - [ ] Category badges
  - [ ] Delivery mode badges
  - [ ] Programme codes
  - [ ] NQF level, credits, duration
- [ ] Add search functionality
- [ ] Add sort options

### Phase 5: Course Detail Pages
- [ ] Update course hero section
- [ ] Add tabbed content layout
- [ ] Create module breakdown component
  - [ ] KM/PM/WEM visual hierarchy
  - [ ] Expandable module details
- [ ] Add entry requirements section
- [ ] Add career opportunities section
- [ ] Add download buttons (PDF outline, SAQA link)
- [ ] Add bottom CTA section

### Phase 6: New Pages
- [ ] Create `/corporate` page
- [ ] Create `/request-proposal` form
- [ ] Create `/schedules` page

### Phase 7: Mobile Optimization
- [ ] Test all pages on mobile devices
- [ ] Optimize touch targets
- [ ] Test hamburger menu
- [ ] Test accordion mega menu
- [ ] Optimize images for mobile

### Phase 8: Testing & QA
- [ ] Cross-browser testing
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance testing (Lighthouse)
- [ ] SEO optimization
- [ ] Form validation testing

---

## Appendix A: Color Usage Examples

### Homepage Hero
```tsx
<section className="relative overflow-hidden bg-brand-primary text-white">
  {/* Background photo */}
  <div className="absolute inset-0">
    <Image src="/hero-bg.jpg" fill />
    <div className="absolute inset-0 bg-gradient-to-r 
                    from-brand-primary/90 via-brand-primary-dark/80" />
  </div>
  
  {/* Content */}
  <div className="relative z-10">
    <span className="px-4 py-1.5 rounded-full 
                     bg-brand-secondary/20 text-brand-secondary">
      SAQA & QCTO Accredited
    </span>
    
    <h1 className="text-6xl font-bold">
      Building Skills. 
      <span className="text-brand-secondary">Transforming Futures.</span>
    </h1>
  </div>
</section>
```

### Course Card
```tsx
<div className="bg-white border border-gray-200 rounded-xl p-6 
                hover:shadow-lg transition-shadow">
  <span className="inline-block px-3 py-1 rounded-full text-xs 
                   font-bold uppercase bg-brand-secondary/10 
                   text-brand-secondary">
    QCTO Skills Programme
  </span>
  
  <h3 className="text-xl font-semibold text-text-primary mt-4">
    Learning & Development Facilitator
  </h3>
  
  <div className="text-sm text-text-muted mt-2">
    Programme Code: SP-220319 | NQF Level: 5 | Credits: 59
  </div>
  
  <button className="mt-6 px-6 py-3 rounded-full font-semibold 
                     bg-brand-secondary text-white 
                     hover:bg-brand-secondary-dark">
    Learn More →
  </button>
</div>
```

---

## Document Changelog

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-10-10 | 1.0.0 | Initial public website redesign specification | AI Engineer |

---

**END OF SPECIFICATION**
