# Ndzalama Training – Public Website & MIS

> A modern, role‑based Education, Training and Development Management System for Ndzalama Training (PTY) LTD.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-(coming%20soon)-3ECF8E?logo=supabase)
![License](https://img.shields.io/badge/License-Proprietary-red)

---

## 📖 Overview

Ndzalama Training is a fully accredited education, training and development provider (ETDP SETA – ETDP0204). This project delivers a modern, responsive, and scalable platform that will eventually serve:

- **Public Website** – Marketing, course listings, and lead generation.
- **LMS (Learning Management System)** – Facilitator dashboards, learner progress, and course delivery.
- **LMIS / MIS** – Admin dashboard for managing bookings, clients, accreditation, and reporting.

**Current Phase:** Phase 1 – Public Website (hardcoded data, ready for Supabase integration).

---

## 🎯 Mission & Vision

**Mission:** To be the preferred provider of quality lifelong education, training, development, facilitation and consultancy services in Limpopo and neighbouring provinces.

**Vision:** We achieve this through high‑quality learning programmes, fair assessment practices, and nationally recognised credits/qualifications.

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite 6, React Router 7 |
| **Styling** | Tailwind CSS 4 (with custom dark‑mode variables) |
| **Forms** | React Hook Form 7 |
| **Backend** | Supabase (PostgreSQL) – *to be integrated in Phase 2* |
| **Hosting** | Vercel / Netlify (frontend) + Supabase (backend) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/ndzalama-mis.git
cd ndzalama-mis

# 2. Install dependencies
npm install

# 3. Copy environment variables (add your Supabase keys later)
cp .env.example .env

# 4. Start the development server
npm run dev

Available Scripts
Command	Description
npm run dev	Start Vite development server
npm run build	Build for production
npm run preview	Preview production build locally
npm run lint	Run ESLint
📂 Project Structure
text
ndzalama-mis/
├── public/
│   └── images/                  # Static images (logos, course visuals)
├── src/
│   ├── components/
│   │   ├── layout/              # Header, Footer, Layout wrapper
│   │   ├── ui/                  # Reusable components (Button, Container, etc.)
│   │   └── common/              # CourseCard, TestimonialCard
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── Apply.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   └── ThankYou.jsx
│   ├── data/                    # Hardcoded content (replace with Supabase later)
│   │   ├── courses.js
│   │   ├── schedules.js
│   │   ├── testimonials.js
│   │   ├── navLinks.js
│   │   └── siteContent.js
│   ├── hooks/                   # Custom React hooks (e.g., useCourse)
│   ├── lib/                     # Supabase client (future)
│   ├── styles/
│   │   └── index.css            # Tailwind + custom variables
│   ├── App.jsx
│   └── main.jsx
├── docs/                        # 📄 Reference documents (see below)
│   ├── organisation/
│   ├── courses/
│   ├── forms/
│   ├── pricing/
│   └── schedules/
├── .env.example
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
📚 Documentation & Content
All business documents (PDFs, brochures, forms, price lists, schedules) are stored in the docs/ folder for easy reference. This ensures that:

Content creators and developers have a single source of truth.

Data migration to Supabase is accurate and complete.

The team can track which documents have been digitised.

Docs Folder Index
Folder	Contents
docs/organisation/	Company profile, accreditation certificates, director details
docs/courses/	Full brochures for each course (Facilitator, Assessor, Moderator, SDF, Coaching, Course Design, ODETDP)
docs/forms/	Booking form, learner registration form, SAQA lookup table
docs/pricing/	Price lists for 2025/2026 (individual, combo, full qualification)
docs/schedules/	Training schedules (dates, locations)
When updating content: Always update the docs/ folder first, then mirror changes in the src/data/ files.

🗺️ Roadmap
✅ Phase 1 – Public Website (Current)
Project setup with Vite + React + Tailwind

Hardcoded content structure (data files)

All public pages (Home, Courses, Course Detail, Apply, Contact, About)

Booking form with validation and console logging

Responsive design with dark‑mode support

Finalise content from PDFs (schedules, prices, testimonials)

Design review and polish

🚧 Phase 2 – LMS (Next)
Integrate Supabase (authentication, real‑time data)

Replace hardcoded data with Supabase queries

Booking form writes to clients and bookings tables

Admin dashboard for managing bookings & schedules

Facilitator dashboard with learner lists

🚧 Phase 3 – LMIS / MIS (Future)
Client lifecycle management

Accreditation tracking (clients applying for SETA accreditation)

Full reporting and analytics

Payment integration

🧑‍💻 Development Guidelines
Adding a New Course
Add the course details to src/data/courses.js.

Add corresponding schedules to src/data/schedules.js.

Ensure the slug is unique and matches the expected URL.

(Optional) Add a brochure PDF to docs/courses/.

Styling Conventions
Use Tailwind classes directly in components.

Keep custom CSS in src/styles/index.css for global variables and overrides.

Follow the existing design tokens (colors, fonts, spacing).

Form Handling
Use React Hook Form for all forms.

Validate required fields (name, email, phone, schedule).

Log submissions to the console (Phase 1). In Phase 2, these will be sent to Supabase.

📦 Deployment
Build for Production
bash
npm run build
The dist/ folder will contain the production assets.

Environment Variables
Copy .env.example to .env and fill in your Supabase credentials (when ready):

text
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
🤝 Contributing
Fork the repo.

Create a feature branch (git checkout -b feature/amazing-feature).

Commit your changes (git commit -m 'Add some amazing feature').

Push to the branch (git push origin feature/amazing-feature).

Open a Pull Request.

📄 License
This project is proprietary and confidential to Ndzalama Training (PTY) LTD. Unauthorised copying, distribution, or use is strictly prohibited.

📞 Contact
Office	Address	Contact
Polokwane (Head Office)	46 Platinum Street, Ladine, 0699	Masilo Diale / Innocent Mabunda / Ferdie Wevell
Tel: 015 5900 730/1/2/3/4/5
Cell: 076 5004 593 / 066 4832 441
Gauteng	133 Plane Road, Hermon Building, Spartan, 1619	Sanette Wevell / Ferdie Wevell
Tel: 015 5900 735
Cell: 083 4545 405
Western Cape	4 Simonsberg street, Wellington, 7654	Jonathan Peters / Linden-Lee Peters
Cell: 083 4124 852 / 083 4629 904
General	–	Email: info@ndzalama.org.za
Website: www.ndzalama.org.za
🙌 Acknowledgements
All content and intellectual property belong to Ndzalama Training (PTY) LTD.

Designed and developed with ❤️ by the internal development team.

Last Updated: June 2026

text

---

## 📝 How to Use This Documentation

1. **Create the `docs/` folder** in your project root and place all PDFs into the subfolders as shown above.
2. **Add the `README.md`** to your project root.
3. **Optionally, create a `docs/README.md`** that indexes all the documents with brief descriptions (I can write that too if you like).
4. **Commit everything** to your repository.

---

## 🧠 Additional Advice for Managing Documents

- **Version control:** Keep PDFs in Git. They don't change often, and it's useful to track history.
- **Naming convention:** Use a consistent pattern (e.g., `[Category] - [Title] - [Year].pdf`) so files sort logically.
- **Markdown index:** In `docs/README.md`, list each file with a short description. This makes it easy for new developers to find what they need.
- **Keep it lean:** Once you've migrated all data to Supabase, you can archive old PDFs. But for Phase 1, they're essential.

---