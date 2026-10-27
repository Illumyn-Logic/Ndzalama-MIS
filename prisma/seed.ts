import { PrismaClient, UserRole, Gender, EquityGroup, CitizenStatus, SocioEconomicStatus, DisabilityType, AssessmentKind, ModuleType, QualificationStatus, ResourceKind, InvoiceStatus, PaymentProvider, PaymentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function upsertCurriculum() {
  const qualification = await prisma.qualification.upsert({
    where: { saqaId: '101321' },
    update: { title: 'Occupational Certificate: Training and Development Practitioner', nqfLevel: 5, credits: 190, status: QualificationStatus.ACTIVE, isActive: true },
    create: {
      code: '101321', saqaId: '101321', slug: '101321-training-and-development-practitioner',
      title: 'Occupational Certificate: Training and Development Practitioner', nqfLevel: 5, credits: 190,
      status: QualificationStatus.ACTIVE, framework: 'QCTO_OCCUPATIONAL_CERTIFICATE', durationMonths: 24,
      shortDescription: 'Occupational Certificate: Training and Development Practitioner',
      fullDescription: 'A QCTO occupational qualification for training and development practitioners.', price: 0,
    },
  });

  const moduleDefinitions = [
    ['KM-01', 'Foundation of Education and Training', 25, 250],
    ['KM-02', 'Learning Programme Design', 25, 250],
    ['KM-03', 'Organisational Learning and Development Needs Analysis', 30, 300],
    ['KM-04', 'Facilitation of Learning in Occupational Contexts', 30, 300],
    ['KM-05', 'Assessment of Learning', 25, 250],
    ['KM-06', 'Evaluation of Learning Programmes', 25, 250],
    ['KM-07', 'Training and Development Administration', 30, 300],
  ] as const;

  for (const [code, title, credits, notionalHours] of moduleDefinitions) {
    const curriculumModule = await prisma.courseModule.upsert({
      where: { code },
      update: { moduleCode: code, title, credits, notionalHours, type: ModuleType.KNOWLEDGE, category: 'KNOWLEDGE_MODULE', orderIndex: Number(code.slice(-2)) },
      create: { qualificationId: qualification.id, code, moduleCode: code, title, credits, notionalHours, type: ModuleType.KNOWLEDGE, category: 'KNOWLEDGE_MODULE', orderIndex: Number(code.slice(-2)) },
    });

    for (let topicIndex = 1; topicIndex <= 2; topicIndex += 1) {
      const topic = await prisma.topic.upsert({
        where: { moduleId_title: { moduleId: curriculumModule.id, title: `${title} Topic ${topicIndex}` } },
        update: { order: topicIndex },
        create: { moduleId: curriculumModule.id, title: `${title} Topic ${topicIndex}`, order: topicIndex },
      });
      for (let lessonIndex = 1; lessonIndex <= 2; lessonIndex += 1) {
        const lessonTitle = `${topic.title} Lesson ${lessonIndex}`;
        const existingLesson = await prisma.lesson.findFirst({ where: { topicId: topic.id, title: lessonTitle } });
        const lesson = existingLesson
          ? await prisma.lesson.update({ where: { id: existingLesson.id }, data: { orderIndex: lessonIndex, durationMinutes: 45 } })
          : await prisma.lesson.create({ data: { moduleId: curriculumModule.id, topicId: topic.id, title: lessonTitle, slug: `${curriculumModule.code}-${topicIndex}-${lessonIndex}`.toLowerCase(), orderIndex: lessonIndex, durationMinutes: 45, resourceUrls: [] } });
        await prisma.lessonResource.deleteMany({ where: { lessonId: lesson.id } });
        await prisma.lessonResource.createMany({ data: [
          { lessonId: lesson.id, kind: ResourceKind.PDF, label: `${lessonTitle} guide`, url: 'https://example.com/ndzalama/curriculum-guide.pdf' },
          { lessonId: lesson.id, kind: ResourceKind.VIDEO, label: `${lessonTitle} briefing`, url: 'https://example.com/ndzalama/briefing-video' },
        ] });
      }
    }

    const assessmentDefinitions: Array<[AssessmentKind, string, number]> = [
      [AssessmentKind.FORMATIVE, `${code} knowledge check`, 1],
      [AssessmentKind.SUMMATIVE, `${code} portfolio task`, 2],
    ];
    for (const [kind, taskTitle, order] of assessmentDefinitions) {
      const existingTask = await prisma.assessmentTask.findFirst({ where: { moduleId: curriculumModule.id, title: taskTitle } });
      if (existingTask) await prisma.assessmentTask.update({ where: { id: existingTask.id }, data: { kind, order, maxMarks: 100, totalMarks: 100, instructions: `Complete the ${kind.toLowerCase()} assessment for ${title}.` } });
      else await prisma.assessmentTask.create({ data: { moduleId: curriculumModule.id, title: taskTitle, kind, order, maxMarks: 100, totalMarks: 100, instructions: `Complete the ${kind.toLowerCase()} assessment for ${title}.`, rubricCriteria: {} } });
    }
    console.log(`✅ Upserted curriculum module ${code} | ${title}`);
  }
  console.log(`✅ Seeded qualification SAQA 101321 | ${moduleDefinitions.length} KM modules`);
}

async function upsertEcdCurriculum() {
  const title = 'Occupational Certificate: Early Childhood Development Practitioner';
  const description = 'The purpose of the SAQA Qualification 97542: Occupational Certificate: Early Childhood Development Practitioner qualification is to prepare a learner to operate as an Early Childhood Development Practitioner. An Early Childhood Development Practitioner plans and prepares early childhood activities, facilitates and mediates learning, observes and assesses the progress of children, and reflects on learning in an inclusive, play-based environment to support holistic development of children in different centre-based or non-centre-based settings.';
  const qualification = await prisma.qualification.upsert({
    where: { saqaId: '97542' },
    update: {
      title, nqfLevel: 4, credits: 131, accreditation: 'QCTO', durationMonths: 12,
      durationValue: 12, durationUnit: 'MONTHS', deliveryMode: 'PART_TIME',
      shortDescription: 'Prepare to operate as an Early Childhood Development Practitioner.',
      fullDescription: description,
      entryRequirements: ['National Certificate Vocational (NCV) at NQF level 3', 'Any other NQF Level 3 qualification as a minimum'],
      targetAudience: ['People entering or continuing in early childhood development, including employed, under-employed and school leavers', 'Practitioners seeking entry-level recognition', 'Practitioners seeking employment opportunities within the Department of Basic Education', 'People interested in establishing early childhood centres or sites', 'Child-minders', 'Crèche staff', 'Playgroup and pre-school staff', 'Special Education Needs support staff', 'Au pairs'],
      benefits: ['Learner support via MS Teams, email, phone or facilitator appointments', 'Study guide covers the Portfolio of Evidence questions', 'Portfolio of Evidence demonstrates workplace application of acquired knowledge and skills'],
      status: QualificationStatus.ACTIVE, isActive: true,
    },
    create: {
      code: '97542', saqaId: '97542', slug: '97542-early-childhood-development-practitioner',
      title, framework: 'QCTO_OCCUPATIONAL_CERTIFICATE', accreditation: 'QCTO', nqfLevel: 4, credits: 131,
      durationMonths: 12, durationValue: 12, durationUnit: 'MONTHS', deliveryMode: 'PART_TIME',
      shortDescription: 'Prepare to operate as an Early Childhood Development Practitioner.',
      fullDescription: description,
      entryRequirements: ['National Certificate Vocational (NCV) at NQF level 3', 'Any other NQF Level 3 qualification as a minimum'],
      targetAudience: ['People entering or continuing in early childhood development, including employed, under-employed and school leavers', 'Practitioners seeking entry-level recognition', 'Practitioners seeking employment opportunities within the Department of Basic Education', 'People interested in establishing early childhood centres or sites', 'Child-minders', 'Crèche staff', 'Playgroup and pre-school staff', 'Special Education Needs support staff', 'Au pairs'],
      benefits: ['Learner support via MS Teams, email, phone or facilitator appointments', 'Study guide covers the Portfolio of Evidence questions', 'Portfolio of Evidence demonstrates workplace application of acquired knowledge and skills'],
      status: QualificationStatus.ACTIVE, isActive: true, price: 0,
    },
  });

  const sampleModules = [
    { moduleCode: 'SAMPLE-01', code: '97542-SAMPLE-01', title: 'Planning and preparing early childhood activities' },
    { moduleCode: 'SAMPLE-02', code: '97542-SAMPLE-02', title: 'Observing and supporting holistic child development' },
  ];
  for (const [index, definition] of sampleModules.entries()) {
    const curriculumModule = await prisma.courseModule.upsert({
      where: { code: definition.code },
      update: { qualificationId: qualification.id, moduleCode: definition.moduleCode, title: definition.title, orderIndex: index + 1 },
      create: { qualificationId: qualification.id, moduleCode: definition.moduleCode, code: definition.code, title: definition.title, credits: 0, notionalHours: 0, type: ModuleType.KNOWLEDGE, category: 'KNOWLEDGE_MODULE', orderIndex: index + 1 },
    });
    const topicTitle = index === 0 ? 'Inclusive play-based learning' : 'Observation and reflection';
    const topic = await prisma.topic.upsert({ where: { moduleId_title: { moduleId: curriculumModule.id, title: topicTitle } }, update: { order: 1 }, create: { moduleId: curriculumModule.id, title: topicTitle, order: 1 } });
    const lessonTitle = index === 0 ? 'Preparing an age-appropriate play activity' : 'Recording observations to support development';
    const existingLesson = await prisma.lesson.findFirst({ where: { topicId: topic.id, title: lessonTitle } });
    if (existingLesson) await prisma.lesson.update({ where: { id: existingLesson.id }, data: { orderIndex: 1, durationMinutes: 45 } });
    else await prisma.lesson.create({ data: { moduleId: curriculumModule.id, topicId: topic.id, title: lessonTitle, slug: `97542-sample-${index + 1}`, orderIndex: 1, durationMinutes: 45, resourceUrls: [] } });
  }

  const fisaTitle = '97542 integrated FISA portfolio';
  const fisaModule = await prisma.courseModule.findUniqueOrThrow({ where: { code: '97542-SAMPLE-01' }, select: { id: true } });
  const existingFisa = await prisma.assessmentTask.findFirst({ where: { moduleId: fisaModule.id, title: fisaTitle } });
  if (existingFisa) await prisma.assessmentTask.update({ where: { id: existingFisa.id }, data: { kind: AssessmentKind.FISA, instructions: 'Submit evidence demonstrating integrated workplace competence as an Early Childhood Development Practitioner.' } });
  else await prisma.assessmentTask.create({ data: { moduleId: fisaModule.id, title: fisaTitle, kind: AssessmentKind.FISA, instructions: 'Submit evidence demonstrating integrated workplace competence as an Early Childhood Development Practitioner.', maxMarks: 100, totalMarks: 100, order: 1, rubricCriteria: {} } });
  console.log('✅ Seeded qualification SAQA 97542 | 2 sample modules | 1 FISA');
}

async function main() {
  console.log('🌱 Starting Ndzalama MIS Seed...\n');
  
  const sharedPassword = 'Ndzalama@2026!';
  const passwordHash = await bcrypt.hash(sharedPassword, 12);

  const usersToSeed = [
    // 1. Staff (No student numbers)
    { email: 'superadmin@ndzalama.org.za', orgEmail: 'superadmin@ndzalama.org.za', role: 'SUPER_ADMIN' as UserRole, firstName: 'Kabelo', lastName: 'Matlala', govId: '8501010000088', studentNumber: null },
    { email: 'facilitator@ndzalama.org.za', orgEmail: 'facilitator@ndzalama.org.za', role: 'FACILITATOR' as UserRole, firstName: 'Sarah', lastName: 'Mokoena', govId: '9001010000088', studentNumber: null },
    { email: 'assessor@ndzalama.org.za', orgEmail: 'assessor@ndzalama.org.za', role: 'ASSESSOR' as UserRole, firstName: 'David', lastName: 'Nkosi', govId: '8801010000088', studentNumber: null },
    
    // 2. Learners (Personal Gmail + Org Student Email + Student Number + Gov ID)
    { email: 'thabo.molefe@gmail.com', orgEmail: '202600001@ndzalama.org.za', role: 'LEARNER' as UserRole, firstName: 'Thabo', lastName: 'Molefe', govId: '9501010000081', studentNumber: '202600001' },
    { email: 'lerato.ndlovu@gmail.com', orgEmail: '202600002@ndzalama.org.za', role: 'LEARNER' as UserRole, firstName: 'Lerato', lastName: 'Ndlovu', govId: '9601010000082', studentNumber: '202600002' },
  ];

  for (const u of usersToSeed) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        orgEmail: u.orgEmail,
        profile: {
          update: {
            firstName: u.firstName,
            lastName: u.lastName,
            idNumber: u.govId,
            idOrPassportNumber: u.govId,
            studentNumber: u.studentNumber,
            dateOfBirth: new Date('1990-01-01'),
            gender: Gender.PREFER_NOT_TO_SAY,
            equity: EquityGroup.OTHER,
            citizenStatus: CitizenStatus.SA_CITIZEN,
            disability: DisabilityType.NONE,
            socioEconomicStatus: SocioEconomicStatus.EMPLOYED,
            homeLanguage: 'English',
            phone: '0820000000',
            alternativePhone: '0820000000',
            streetAddress: '123 Ndzalama Training St',
            suburbCity: 'Polokwane',
            province: 'Limpopo',
            postalCode: '0700',
            isUrban: true,
            nationality: 'South Africa',
            highestQualification: 'Not specified',
          }
        }
      },
      create: {
        email: u.email,
        orgEmail: u.orgEmail,
        passwordHash,
        role: u.role,
        isActive: true,
        profile: {
          create: {
            firstName: u.firstName,
            lastName: u.lastName,
            idNumber: u.govId,
            idOrPassportNumber: u.govId,
            studentNumber: u.studentNumber,
            phone: '0820000000',
            dateOfBirth: new Date('1990-01-01'),
            gender: Gender.PREFER_NOT_TO_SAY,
            equity: EquityGroup.OTHER,
            citizenStatus: CitizenStatus.SA_CITIZEN,
            homeLanguage: 'English',
            nationality: 'South Africa',
            socioEconomicStatus: SocioEconomicStatus.EMPLOYED,
            disability: DisabilityType.NONE,
            streetAddress: '123 Ndzalama Training St',
            suburbCity: 'Polokwane',
            province: 'Limpopo',
            postalCode: '0700',
            highestQualification: 'Not specified',
          },
        },
      },
    });
    console.log(`✅ Upserted ${u.role.padEnd(12)} | ${u.email} ${u.orgEmail && u.orgEmail !== u.email ? `(${u.orgEmail})` : ''}`);
  }

  const sampleLearner = await prisma.user.findUniqueOrThrow({
    where: { email: 'thabo.molefe@gmail.com' },
    select: { id: true },
  });
  const sampleInvoice = await prisma.invoice.upsert({
    where: { number: 'NDZ-SEED-INV-2026-001' },
    update: {
      userId: sampleLearner.id,
      lineItems: [{ description: 'Schema hardening sample invoice', amount: 1450 }],
      amountDue: 1450,
      status: InvoiceStatus.DRAFT,
    },
    create: {
      number: 'NDZ-SEED-INV-2026-001',
      userId: sampleLearner.id,
      lineItems: [{ description: 'Schema hardening sample invoice', amount: 1450 }],
      amountDue: 1450,
      status: InvoiceStatus.DRAFT,
    },
  });
  const samplePaymentRef = 'ndzalama-seed-payment-2026-001';
  const existingSamplePayment = await prisma.payment.findFirst({
    where: { provider: PaymentProvider.MANUAL_EFT, providerRef: samplePaymentRef },
  });
  const samplePaymentData = {
    invoiceId: sampleInvoice.id,
    provider: PaymentProvider.MANUAL_EFT,
    providerRef: samplePaymentRef,
    amount: 1450,
    status: PaymentStatus.PENDING,
  };
  if (existingSamplePayment) {
    await prisma.payment.update({ where: { id: existingSamplePayment.id }, data: samplePaymentData });
  } else {
    await prisma.payment.create({ data: samplePaymentData });
  }
  console.log(`✅ Seeded draft invoice ${sampleInvoice.number} with pending manual EFT payment`);

  await upsertCurriculum();
  await upsertEcdCurriculum();

  console.log('\n🎉 Seeding complete!');
  console.log('🔑 Shared Password for all users: Ndzalama@2026!\n');
}

main()
  .catch((e) => { console.error('❌ Seeding failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });