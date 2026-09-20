import { PrismaClient, UserRole, Gender, EquityGroup, CitizenStatus, SocioEconomicStatus, DisabilityType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

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
            idOrPassportNumber: u.govId, // ✅ FIXED: Mapped to correct schema field
            studentNumber: u.studentNumber,
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
            idOrPassportNumber: u.govId, // ✅ FIXED: Mapped to correct schema field
            studentNumber: u.studentNumber,
            phone: '0820000000',
            dateOfBirth: new Date('1990-01-01'),
            gender: 'PREFER_NOT_TO_SAY' as Gender,
            equity: 'OTHER' as EquityGroup,
            citizenStatus: 'SA_CITIZEN' as CitizenStatus,
            homeLanguage: 'English',
            socioEconomicStatus: 'EMPLOYED' as SocioEconomicStatus,
            disability: 'NONE' as DisabilityType,
            streetAddress: '123 Ndzalama Training St',
            suburbCity: 'Polokwane',
            province: 'Limpopo',
            postalCode: '0700',
          },
        },
      },
    });
    console.log(`✅ Upserted ${u.role.padEnd(12)} | ${u.email} ${u.orgEmail && u.orgEmail !== u.email ? `(${u.orgEmail})` : ''}`);
  }

  console.log('\n🎉 Seeding complete!');
  console.log('🔑 Shared Password for all users: Ndzalama@2026!\n');
}

main()
  .catch((e) => { console.error('❌ Seeding failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });