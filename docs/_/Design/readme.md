Ndzalama Training: Master Website Redesign & LMIS Functional Specification & Change Request
Document Version: 2.2.0

Target Audience: Development Team, UI/UX Designers, and System Architects

Scope: Public Portal, Front-End UI/UX, and LMIS (Learning Management Information System) Backlog

1. Brand Identity & Design System
   Color Palette & UI Mapping
   Primary Brand Color (Deep Forest Green): #1B3B1B (Dominant)

UI Usage: Hero sections, main landing page headers, top navigation bars, footer backgrounds, and primary branding elements. Paired with pure white typography.

Secondary / Accent Color (Vibrant Leaf / Lime Green): #7BC62D (Accent)

UI Usage: Primary Call-to-Action (CTA) buttons, active navigation states, course progress indicators, and interactive highlights.

Supporting / Neutral Tint (Soft Mint / Pale Sage): #E8F0E8 (Background Containers)

UI Usage: Alternating section backgrounds, module content cards, and container boxes for structured information hierarchy.

Typography & Contrast:

Headings/Headers: Clean, modern bold sans-serif.

Body Text: Dark Charcoal/Black (#222222) on light backgrounds; Pure White (#FFFFFF) on Deep Forest Green backgrounds.

2. Front-End Website Architecture & Layout Requirements
   Homepage Structure
   Hero Section & Tagline:

Tagline: Building Skills. Transforming Futures.

Description: Highlighting over 20 years of experience delivering accredited occupational qualifications, skills programmes, and workplace training.

Dual-Audience User Journey ("How Can We Help You?"):

Individual Learners: Access to browse courses, view the upcoming training schedule, and complete an online enrolment form.

Businesses/Corporate Clients: Access to partner solutions, corporate custom packages, proposal requests, and consultation bookings.

Training Delivery Options Display: Clearly highlight that courses are available In-person, In-person & Virtual, On-site (we come to you), and Online.

Course Category Navigation (Mega-Menu Dropdowns):

Organized clearly into categories such as Occupational Certificates (ETDPSETA, HWSETA), QCTO Skills Programmes, First Aid, and Services SETA qualifications.

Course Detail Pages Layout:

Structured with clear metadata: Label/Type (e.g., QCTO Skills Programme), Course Name, Programme Number (SP- / OC-), NQF Level, Credits, and Duration.

Comprehensive curriculum breakdown split into Knowledge Modules (KM), Practical Modules (PM), and Work Experience Modules (WEM).

Clear calls to action: Download Outline, SAQA Qualification Link, and Enquire/Enrol Online.

3. LMIS & Back-End Functional Requirements (Change Request Backlog)
   The following core requirements and user feedback items must be fully integrated into the Ndzalama Learning Management & Information System (LMIS):
4. Enrolment & Data Integrity
   Smart Drop-Down Fields: Implement strict drop-down lists on the learner enrolment spreadsheets and forms (e.g., StatsSA area codes), modeled after the data integrity and field reliability standards of legacy AIMS configurations.

Student Number Standardization: Use the learner's official South African ID number as their primary system student number to eliminate duplicate profiles and streamline identification.

Multi-Course Enrollment Support: The LMIS architecture must natively support scenarios where a single learner enrolls in multiple concurrent or sequential courses with Ndzalama.

2. Digital Learner Folders & Hybrid Assessment Storage
   Individual Folder Profiles: Every learner must have a dedicated profile or digital folder within the LMIS to store digital copies, scans, or uploads of formative assessments (quizzes, case studies, workbooks).

Hybrid / Pen-and-Paper Support: System must accommodate older generation learners who prefer traditional "pen & paper" assessments by allowing administrators and facilitators to upload scanned assessment files directly into the learner's digital profile folder.

QCTO Verification & Cleanup Workflow: Once a learner's assessments are verified by the QCTO, the system must allow staff to securely email the final verified records to the learner before safely purging or deleting local temporary copies.

3. Digital Grading Color Codes
   Color-Coded Digital Pens: Online assessment marking and annotation interfaces must enforce the strict grading pen-color hierarchy:

Learner Submissions: Black pen (#000000)

Assessor Review: Red pen (#FF0000) — Note: Ndzalama assessors on Assessor/Moderator courses use Orange pens (#FF6600); option to standardize on Orange throughout for operational ease.

Internal Moderator: Green pen (#008000)

External Moderator: Purple pen (#800080)

4. Automated Communication & Certification Workflow
   Progress Tracking & Notifications: Implement an automated communication system to trigger progress letters or result notifications post-assessment.

Certificate Collection Alerts: In the event that QCTO certificates are dispatched directly to Training Providers (TPs), the LMIS must feature an automated trigger to broadcast both an Email and SMS notification to learners alerting them that their certificates are ready for collection.
